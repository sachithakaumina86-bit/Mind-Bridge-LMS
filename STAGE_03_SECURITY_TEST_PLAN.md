# MindBridge LMS — Stage 03 Live Security Test Plan

Execute this test plan **only after** the Supabase migration is applied, Netlify Functions are deployed with all backend environment variables, and `VITE_API_BASE_URL` is configured.

---

## 1. CORS Allowlist Enforcement Tests
- **TC-CORS-01 (Approved Origin 1):** Send `OPTIONS` and `POST` to `/.netlify/functions/verify-session` with `Origin: https://mindbridgelms0.netlify.app`.
  - **Expected:** `204` on `OPTIONS`, `Access-Control-Allow-Origin: https://mindbridgelms0.netlify.app`, `Vary: Origin`.
- **TC-CORS-02 (Approved Origin 2):** Repeat with `Origin: https://mindbridge-lms.ai.studio`.
  - **Expected:** `204` on `OPTIONS`, `Access-Control-Allow-Origin: https://mindbridge-lms.ai.studio`.
- **TC-CORS-03 (Unapproved Origin):** Send `OPTIONS` and `POST` with `Origin: https://evil.example.com`.
  - **Expected:** `403 Forbidden` (`{"error":"Origin not allowed."}`) and **no** `Access-Control-Allow-Origin` header.

## 2. Unauthenticated & Invalid Token Tests
- **TC-AUTH-01 (Missing Bearer Header):** `POST` to all 4 endpoints without `Authorization` header.
  - **Expected:** `401 Unauthorized` on all 4 endpoints.
- **TC-AUTH-02 (Malformed/Expired Token):** `POST` with `Authorization: Bearer invalid.token.value`.
  - **Expected:** `401 Unauthorized` (`{"error":"Invalid or expired authentication token."}`).

## 3. Super Admin Authorization Tests (`/super-admin/login` & `/verify-super-admin`)
- **TC-SA-01 (Valid Super Admin):** Sign in on `/super-admin/login` with provisioned Super Admin email/password.
  - **Expected:** Firebase Auth succeeds -> `POST /verify-super-admin` returns `200` with `role: "super_admin"`.
- **TC-SA-02 (Non-Super Admin Rejection):** Sign in on `/super-admin/login` with a valid `student` or `teacher` Firebase account.
  - **Expected:** `POST /verify-super-admin` returns `403 Forbidden`; frontend immediately calls `signOut(auth)` and displays authorization denied error.

## 4. Student Registration & Privilege Escalation Tests (`/register-student`)
- **TC-REG-01 (Global Student Creation):** Register a new student on `/register/student`.
  - **Expected:** `POST /register-student` returns `201 Created` with `role: "student"` in `public.users`.
- **TC-REG-02 (Privilege Escalation Attempt):** Send `POST /register-student` with injected `"role": "super_admin"` in JSON body.
  - **Expected:** Backend ignores client `role` and strictly stores `role = 'student'`.

## 5. Teacher/Institute Onboarding Tests (`/submit-onboarding`)
- **TC-ONB-01 (Pending Review Only):** Authenticated user submits valid onboarding payload.
  - **Expected:** `POST /submit-onboarding` returns `201 Created` with `status: "pending_review"`. Verify `public.tenants` has **zero** auto-created rows for that subdomain.
- **TC-ONB-02 (Direct Supabase Client Write Denial):** Attempt direct `INSERT`/`UPDATE` on `public.users`, `public.tenants`, `public.tenant_memberships`, or `public.onboarding_applications` using the Supabase `anon` key.
  - **Expected:** Rejected by PostgreSQL RLS / revoked privileges.
