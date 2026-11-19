# MindBridge LMS — Netlify Functions API Reference

**Configuration:** `netlify.toml` (`functions = "netlify/functions"`, `node_bundler = "esbuild"`)  
**Deployment Status:** Authored locally; **NOT YET DEPLOYED** to Netlify.

## Shared Infrastructure (`netlify/functions/_shared/`)
- `http.ts`: Safe CORS headers (`ALLOWED_ORIGIN`), JSON response builder with `Cache-Control: no-store`, `OPTIONS`/`POST` method enforcement, and `Authorization: Bearer <token>` extraction.
- `firebaseAdmin.ts`: Singleton Firebase Admin SDK initializer using `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`, verifying ID tokens with revocation checks (`verifyIdToken(token, true)`).
- `supabaseAdmin.ts`: Server-side Supabase client using `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## Endpoints
| Endpoint | Method | Auth Header | Purpose |
| --- | --- | --- | --- |
| `/.netlify/functions/verify-session` | `POST` | `Bearer <Firebase ID Token>` | Verifies Firebase token, loads authoritative `public.users` record and active `tenant_memberships`. |
| `/.netlify/functions/verify-super-admin` | `POST` | `Bearer <Firebase ID Token>` | Verifies Firebase token and strictly enforces `role === 'super_admin'` and `status === 'active'` in Supabase; returns `403` otherwise. |
| `/.netlify/functions/register-student` | `POST` | `Bearer <Firebase ID Token>` | Creates or returns the global `public.users` profile with server-enforced `role = 'student'`. |
| `/.netlify/functions/submit-onboarding` | `POST` | `Bearer <Firebase ID Token>` | Validates applicant & fields and inserts into `onboarding_applications` with `status = 'pending_review'` (never creates a tenant). |
