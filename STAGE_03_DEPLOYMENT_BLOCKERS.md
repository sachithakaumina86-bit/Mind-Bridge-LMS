# MindBridge LMS — Stage 03 Deployment Blockers

This document lists every external dependency and local finding that currently blocks live end-to-end authentication and production deployment.

## 1. External Configuration Blockers (`BLOCKED BY EXTERNAL SETUP`)

1. **Firebase Console Email/Password Provider Verification**
   - **Blocker:** Cannot verify locally whether Email/Password authentication is enabled in the target Firebase project.
   - **Action Required:** Confirm **Authentication -> Sign-in method -> Email/Password** is enabled in Firebase Console.

2. **Supabase PostgreSQL Migration Not Yet Executed**
   - **Blocker:** `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql` has not been applied to the live Supabase database.
   - **Action Required:** Review and execute the migration against the confirmed MindBridge Supabase project.

3. **Netlify Functions Backend Not Yet Deployed**
   - **Blocker:** `netlify/functions/verify-session.ts`, `verify-super-admin.ts`, `register-student.ts`, and `submit-onboarding.ts` exist locally but are not deployed to Netlify.
   - **Action Required:** Deploy the repository to Netlify with `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ALLOWED_ORIGIN=https://mindbridgelms0.netlify.app,https://mindbridge-lms.ai.studio`.

4. **Frontend `VITE_API_BASE_URL` Unset**
   - **Blocker:** Intentionally optional during frontend development; required for live backend verification.
   - **Action Required:** After Netlify deployment, set `VITE_API_BASE_URL` to the production Netlify Functions base URL.

5. **First Super Admin Account Not Provisioned**
   - **Blocker:** No Super Admin user exists in Firebase Auth or `public.users` (`role = 'super_admin'`).
   - **Action Required:** Provision manually following `SUPER_ADMIN_PROVISIONING_GUIDE.md` after Step 2.

## 2. Local Code Findings (`ISSUE FOUND` — Non-Blocking for Deployment Prep)

1. **`verify-session` Membership Response Shape Mismatch**
   - **Location:** `netlify/functions/verify-session.ts` (line 42) vs. `src/context/AuthContext.tsx` (lines 6–12).
   - **Detail:** Supabase returns `{ role, status, tenants: { id, name, subdomain, status } }` per row, whereas `VerifiedTenantMembership` in `AuthContext.tsx` expects `{ tenantId, tenantName, subdomain, role, status }`.
   - **Impact:** Does not affect security or token verification, but should be mapped in `verify-session.ts` before Stage 04 dashboards consume `verifiedProfile.memberships`.
