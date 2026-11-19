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

  let body: Record<string, unknown>;
  try {
    body = event.body ? (JSON.parse(event.body) as Record<string, unknown>) : {};
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON request body.' }, origin);
  }

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const mobile = typeof body.mobile === 'string' ? body.mobile.trim() : null;
  const academicStream = typeof body.academicStream === 'string' ? body.academicStream.trim() : null;
  const preferredLanguage =
    body.preferredLanguage === 'si' || body.preferredLanguage === 'ta'
      ? body.preferredLanguage
      : 'en';
  const whatsappOptIn = Boolean(body.whatsappOptIn);

  if (!fullName || fullName.length < 2) {
    return jsonResponse(400, { error: 'Valid fullName is required.' }, origin);
  }

  try {
    const decoded = await verifyFirebaseIdToken(token);
    if (!decoded.email) {
      return jsonResponse(400, { error: 'Verified Firebase email is required.' }, origin);
    }

    const supabase = getSupabaseAdmin();

    // Prevent duplicate/conflicting records; never allow client-provided roles.
    const { data: existing, error: existingError } = await supabase
      .from('users')
      .select('id, firebase_uid, email, full_name, role, status')
      .eq('firebase_uid', decoded.uid)
      .maybeSingle();

    if (existingError) {
      return jsonResponse(500, { error: 'Unable to check existing user profile.' }, origin);
    }

    if (existing) {
      return jsonResponse(200, { user: existing, alreadyRegistered: true }, origin);
    }

    const { data: created, error: insertError } = await supabase
      .from('users')
      .insert({
        firebase_uid: decoded.uid,
        email: decoded.email.toLowerCase(),
        full_name: fullName,
        mobile,
        academic_stream: academicStream,
        preferred_language: preferredLanguage,
        whatsapp_opt_in: whatsappOptIn,
        role: 'student', // Strictly enforced server-side
        status: 'active',
      })
      .select('id, firebase_uid, email, full_name, role, status')
      .single();

    if (insertError) {
      return jsonResponse(409, { error: 'Unable to create student profile (duplicate or conflict).' }, origin);
    }

    return jsonResponse(201, { user: created }, origin);
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg === 'MISSING_FIREBASE_ADMIN_ENV' || msg === 'MISSING_SUPABASE_ADMIN_ENV') {
      return jsonResponse(503, { error: 'Backend registration service is not configured.' }, origin);
    }
    return jsonResponse(401, { error: 'Invalid or expired authentication token.' }, origin);
  }
};
