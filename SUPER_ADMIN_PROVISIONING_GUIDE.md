# MindBridge LMS — Super Admin Account Provisioning Guide

> **Status:** Preparation Only — Super Admin login is **not yet operational**. Live Firebase Authentication (`VITE_FIREBASE_*`), the deployed Netlify Functions backend (`VITE_API_BASE_URL`), and server-side Supabase PostgreSQL role verification are required and must be tested before Super Admin access is active.

---

## 1. Access Architecture & UI Reference Notice

### Dedicated Entry & Separation of Concerns
- **Standard Users (Students, Teachers, Tenant Admins):** Must use the standard `/login` entry point. Users cannot select or self-assign the `super_admin` role on `/login`.
- **Super Admin Entry:** Designed to be accessed exclusively through a dedicated Super Admin login entry triggered from the far-right user icon on the Main Public Website (`/`), accepting **email/password credentials only** (no self-registration, no role selector, no public SSO).
- **Missing Stitch UI Reference (Reported per Strict UI Rule):** No dedicated Google Stitch HTML/screenshot design for a standalone Super Admin Login screen has been uploaded yet. No custom or invented Super Admin login UI has been created. Once you upload the approved Stitch Super Admin Login design (or confirm whether to reuse an existing approved Stitch login layout in email/password-only mode), the far-right user icon on `/` will be wired to `/super-admin/login`.

---

## 2. Required Setup & Secrets Boundary

### Frontend Environment Variables (Public / Safe for Browser)
Configured in `.env` / hosting environment (never hardcoded):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_API_BASE_URL` (Production Netlify Functions base URL, e.g. `https://<site>.netlify.app/.netlify/functions`)

### Backend Environment Variables (Netlify Functions Only — NEVER in Frontend)
Configured strictly in Netlify Site Environment Variables:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (Firebase Admin SDK service account private key)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (Authoritative server-side database access; never exposed to `VITE_*` or client bundles)

---

## 3. First-Time Firebase Account Creation

Execute these steps directly in the **Firebase Console** (never via public frontend registration):

1. Open your production Firebase project in the Firebase Console.
2. Navigate to **Authentication -> Sign-in method** and ensure **Email/Password** is enabled.
3. Navigate to **Authentication -> Users** and click **Add user**.
4. Enter your real Super Admin email address and a strong, unique password (minimum 16 characters, stored in a password manager).
5. Copy the generated **User UID** (`firebase_uid`) from the Users table.

---

## 4. Secure Role Assignment in Supabase PostgreSQL

Super Admin privileges are **never** assigned from the frontend, client claims alone, or `localStorage`. Assign the role directly in the authoritative Supabase PostgreSQL database using the SQL Editor or a one-time server-side provisioning script:

```sql
-- Execute in Supabase SQL Editor (or via authenticated admin migration)
-- Replace <FIREBASE_UID> and <SUPER_ADMIN_EMAIL> with the real values from Step 3.

INSERT INTO public.users (
  firebase_uid,
  email,
  full_name,
  role,
  status,
  created_at,
  updated_at
)
VALUES (
  '<FIREBASE_UID>',
  '<SUPER_ADMIN_EMAIL>',
  'Platform Super Administrator',
  'super_admin',
  'active',
  NOW(),
  NOW()
)
ON CONFLICT (firebase_uid)
DO UPDATE SET
  role = 'super_admin',
  status = 'active',
  updated_at = NOW();
```

**Security Guardrails:**
- Enforce a Row-Level Security (RLS) policy on `public.users` that prevents any authenticated client from inserting or updating `role = 'super_admin'`.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend.

---

## 5. Backend Verification (Netlify Functions)

When the Super Admin submits email/password credentials on the dedicated Super Admin login route:

1. **Client Authentication (Firebase Auth):** The frontend authenticates the email/password with Firebase Auth and obtains a short-lived Firebase ID Token (`user.getIdToken(true)`).
2. **Server Verification (Netlify Function, e.g. `POST /.netlify/functions/verify-super-admin`):**
   - Extracts `Authorization: Bearer <ID_TOKEN>`.
   - Verifies the token signature, expiration, and project audience using **Firebase Admin SDK** (`admin.auth().verifyIdToken(token)`).
   - Queries Supabase PostgreSQL using `firebase_uid` from the verified token (`SELECT id, role, status FROM public.users WHERE firebase_uid = $1`).
   - Rejects with `403 Forbidden` if no record exists, `status !== 'active'`, or `role !== 'super_admin'`.
   - Returns verified session metadata only when both Firebase Auth and the authoritative Supabase `super_admin` record match.
3. **No Client-Side Bypass:** Every protected Super Admin API endpoint must re-verify the Firebase ID token and Supabase `super_admin` role on every request. Never trust `localStorage`, URL parameters, or client-side state as proof of authorization.

---

## 6. First Login Procedure (After Deployment)

1. Confirm all frontend (`VITE_FIREBASE_*`, `VITE_API_BASE_URL`) and backend (`FIREBASE_*`, `SUPABASE_SERVICE_ROLE_KEY`) environment variables are configured.
2. Confirm the Super Admin user exists in Firebase Authentication and has `role = 'super_admin'` and `status = 'active'` in Supabase PostgreSQL.
3. Navigate to the Main Public Website (`/`) and click the dedicated far-right Super Admin user icon.
4. Sign in using the provisioned Super Admin email and password.
5. Verify that:
   - A valid Super Admin account succeeds and passes server-side token + role verification.
   - A standard Student, Teacher, or Tenant Admin account is rejected with `403 Forbidden` on the Super Admin login endpoint.

---

## 7. Remaining Deployment Dependencies

- [ ] Supply real Firebase Web SDK credentials (`VITE_FIREBASE_*`).
- [ ] Deploy the Netlify Functions backend with Firebase Admin SDK + Supabase service-role credentials.
- [ ] Set `VITE_API_BASE_URL` to the deployed Netlify Functions URL.
- [ ] Provision the first Super Admin user in Firebase Auth and assign `role = 'super_admin'` in Supabase PostgreSQL.
- [ ] Upload or confirm the approved Google Stitch UI design for the dedicated Super Admin login screen.
- [ ] Run end-to-end authentication and `403 Forbidden` negative authorization tests before marking Super Admin login as operational.
