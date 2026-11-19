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
      return jsonResponse(500, { error: 'Unable to verify Super Admin authorization.' }, origin);
    }

    if (!user || user.status !== 'active' || user.role !== 'super_admin') {
      return jsonResponse(403, { error: 'Super Admin authorization required.' }, origin);
    }

    return jsonResponse(
      200,
      {
        session: {
          userId: user.id,
          firebaseUid: user.firebase_uid,
          email: user.email,
          fullName: user.full_name,
          role: 'super_admin',
          status: user.status,
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
