import type { Handler } from '@netlify/functions';
import { verifyFirebaseIdToken } from './_shared/firebaseAdmin';
import { extractBearerToken, handlePreflightOrMethod, jsonResponse } from './_shared/http';
import { getSupabaseAdmin } from './_shared/supabaseAdmin';

const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])?$/;

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

  const tenantType = body.tenantType === 'institute' ? 'institute' : 'individual';
  const academyName = typeof body.academyName === 'string' ? body.academyName.trim() : '';
  const subdomain = typeof body.subdomain === 'string' ? body.subdomain.trim().toLowerCase() : '';
  const contactPerson = typeof body.contactPerson === 'string' ? body.contactPerson.trim() : '';
  const nicOrBr = typeof body.nicOrBr === 'string' ? body.nicOrBr.trim() : '';
  const whatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim() : '';
  const subjects = Array.isArray(body.subjects)
    ? body.subjects.filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
    : [];
  const documents = Array.isArray(body.documents) ? body.documents : [];

  if (!academyName || !SUBDOMAIN_REGEX.test(subdomain) || !contactPerson || !nicOrBr || !whatsapp) {
    return jsonResponse(400, { error: 'Missing or invalid onboarding application fields.' }, origin);
  }

  try {
    const decoded = await verifyFirebaseIdToken(token);
    const supabase = getSupabaseAdmin();

    const { data: applicant, error: userError } = await supabase
      .from('users')
      .select('id, status')
      .eq('firebase_uid', decoded.uid)
      .maybeSingle();

    if (userError || !applicant || applicant.status !== 'active') {
      return jsonResponse(403, { error: 'Verified active user profile is required.' }, origin);
    }

    // Strictly persists as pending_review. Never creates or activates a tenant here.
    const { data: application, error: insertError } = await supabase
      .from('onboarding_applications')
      .insert({
        applicant_user_id: applicant.id,
        tenant_type: tenantType,
        academy_name: academyName,
        proposed_subdomain: subdomain,
        subjects,
        contact_person: contactPerson,
        nic_or_br: nicOrBr,
        whatsapp,
        document_metadata: documents,
        status: 'pending_review',
      })
      .select('id, academy_name, proposed_subdomain, status, created_at')
      .single();

    if (insertError) {
      return jsonResponse(500, { error: 'Unable to submit onboarding application.' }, origin);
    }

    return jsonResponse(201, { application }, origin);
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg === 'MISSING_FIREBASE_ADMIN_ENV' || msg === 'MISSING_SUPABASE_ADMIN_ENV') {
      return jsonResponse(503, { error: 'Backend onboarding service is not configured.' }, origin);
    }
    return jsonResponse(401, { error: 'Invalid or expired authentication token.' }, origin);
  }
};
