import type { Handler } from '@netlify/functions';
import { verifyFirebaseIdToken } from './_shared/firebaseAdmin';
import { extractBearerToken, handlePreflightOrMethod, jsonResponse } from './_shared/http';
import { getSupabaseAdmin } from './_shared/supabaseAdmin';

export const handler: Handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin;
  const preflight = handlePreflightOrMethod(event, 'POST');
  if (preflight) return preflight;

  const token = extractBearerToken(event);
  if (!token) {
    return jsonResponse(401, { error: 'Missing Authorization Bearer token.' }, origin);
  }

  try {
    const decoded = await verifyFirebaseIdToken(token);
    const supabase = getSupabaseAdmin();

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, firebase_uid, email, full_name, role, status')
      .eq('firebase_uid', decoded.uid)
      .maybeSingle();

    if (userError) {
      return jsonResponse(500, { error: 'Unable to resolve user profile.' }, origin);
    }

    if (!user) {
      return jsonResponse(404, { error: 'User profile not found.' }, origin);
    }

    if (user.status !== 'active') {
      return jsonResponse(403, { error: 'Account is not active.' }, origin);
    }

    const { data: memberships, error: memError } = await supabase
      .from('tenant_memberships')
      .select('role, status, tenants(id, name, subdomain, status)')
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (memError) {
      return jsonResponse(500, { error: 'Unable to resolve tenant memberships.' }, origin);
    }

    return jsonResponse(
      200,
      {
        session: {
          userId: user.id,
          firebaseUid: user.firebase_uid,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          status: user.status,
          memberships: memberships ?? [],
        },
      },
      origin
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg === 'MISSING_FIREBASE_ADMIN_ENV' || msg === 'MISSING_SUPABASE_ADMIN_ENV') {
      return jsonResponse(503, { error: 'Backend authentication service is not configured.' }, origin);
    }
    return jsonResponse(401, { error: 'Invalid or expired authentication token.' }, origin);
  }
};
