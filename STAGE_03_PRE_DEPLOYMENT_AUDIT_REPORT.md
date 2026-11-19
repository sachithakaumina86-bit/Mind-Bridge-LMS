# MindBridge LMS — Stage 03 Pre-Deployment Verification Audit Report

**Audit Mode:** Strict Read-Only Verification  
**Scope:** Firebase Web SDK, Supabase Migration & RLS, Netlify Functions Backend, Frontend Routing & CTA Rules, Environment & Deployment Readiness  
**Project Integrity:** Zero existing files were modified, deleted, or overwritten.

---

## A. Firebase Web SDK Verification

| Check | Status | Evidence (File & Reference) |
| --- | --- | --- |
| Firebase SDK dependency installed | **VERIFIED** | `package.json` includes `firebase` (installed in Stage 03). |
| Safe singleton initialization (`getApps()`) | **VERIFIED** | `src/lib/firebase.ts` (`getFirebaseApp`, `getFirebaseAuth`) caches instances and uses `getApps().length > 0 ? getApp() : initializeApp(config)`. |
| Environment variable names & usage | **VERIFIED** | `src/lib/firebase.ts` reads `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`. |
| `AuthContext` & session lifecycle | **VERIFIED** | `src/context/AuthContext.tsx` (`AuthProvider`, `useAuth`) observes `onAuthStateChanged`, refreshes ID tokens, syncs `/verify-session`, handles `401` expiry, and exposes `signOut`. Wrapped in `src/main.tsx`. |
| Email/Password login, registration, reset, sign-out | **VERIFIED** | `src/services/authService.ts` implements `signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, `sendPasswordResetEmail`, `setPersistence`, and `signOut`. |
| Firebase ID token retrieval & refresh | **VERIFIED** | `src/context/AuthContext.tsx` (`getIdToken(forceRefresh)`) and `src/services/authService.ts` (`getIdToken(true)`). |
| Graceful error handling when unconfigured | **VERIFIED** | `getFirebaseAuth()` returns `null`; `authService.ts` returns structured `FIREBASE_NOT_CONFIGURED` responses without crashing or mocking success. |
| Live Firebase Console Email/Password provider enabled | **BLOCKED BY EXTERNAL SETUP** | Cannot be verified locally; requires checking Firebase Console -> Authentication -> Sign-in method. |

---

## B. Supabase Database & RLS Verification

**Migration File:** `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql`

| Check | Status | Evidence (File & Reference) |
| --- | --- | --- |
| Additive & idempotent SQL | **VERIFIED** | Uses `CREATE EXTENSION IF NOT EXISTS`, guarded `DO $$ ... IF NOT EXISTS (SELECT 1 FROM pg_type ...)` enum creation, `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `DROP TRIGGER IF EXISTS`, `DROP POLICY IF EXISTS`. |
| Tables, enums, constraints, indexes, FKs | **VERIFIED** | Defines `app_role` (9 confirmed roles; no Cashier role), `account_status`, `tenant_status`, `onboarding_status`, and tables `public.users`, `public.tenants`, `public.tenant_memberships`, `public.onboarding_applications` with UUID PKs, FKs, `UNIQUE` constraints, regex subdomain checks, and `updated_at` triggers. |
| RLS enabled & forced | **VERIFIED** | `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY` applied to all 4 tables. |
| Direct client write revocation | **VERIFIED** | `REVOKE INSERT, UPDATE, DELETE` from `anon, authenticated` on all 4 tables. Only `public_read_active_tenants` (`SELECT` where `status = 'active'`) is allowed publicly. |
| No assumption of pre-existing custom tables/data | **VERIFIED** | Self-contained initial schema; references only `pgcrypto` and tables created within the same migration. |
| Live migration execution against Supabase | **BLOCKED BY EXTERNAL SETUP** | Not executed per Stage 03 stop condition; requires manual execution against the confirmed Supabase project. |

---

## C. Netlify Functions Backend Verification

**Configuration:** `netlify.toml` (`functions = "netlify/functions"`, `node_bundler = "esbuild"`)

| Check | Status | Evidence (File & Reference) |
| --- | --- | --- |
| Firebase Admin token verification & revocation check | **VERIFIED** | `netlify/functions/_shared/firebaseAdmin.ts` calls `auth.verifyIdToken(idToken, true)` (checks signature, expiry, and revocation). |
| `verify-session` endpoint | **VERIFIED** | `netlify/functions/verify-session.ts` verifies Bearer token, loads `public.users` by `firebase_uid`, checks `status === 'active'`, and loads active `tenant_memberships`. |
| `verify-session` response shape vs `AuthContext` type | **ISSUE FOUND** | `netlify/functions/verify-session.ts` returns Supabase nested `tenants(id, name, subdomain, status)` inside each membership item, while `VerifiedTenantMembership` in `src/context/AuthContext.tsx` expects flattened `{ tenantId, tenantName, subdomain, role, status }`. Non-blocking for security, but should be mapped cleanly before Stage 04 dashboard consumption. |
| `verify-super-admin` endpoint | **VERIFIED** | `netlify/functions/verify-super-admin.ts` verifies Bearer token, queries `public.users` by `firebase_uid`, and returns `403` unless `status === 'active'` and `role === 'super_admin'`. |
| `register-student` endpoint | **VERIFIED** | `netlify/functions/register-student.ts` verifies Bearer token, validates `fullName`, prevents duplicates, and strictly hardcodes `role: 'student'` server-side. |
| `submit-onboarding` endpoint | **VERIFIED** | `netlify/functions/submit-onboarding.ts` verifies Bearer token, validates fields + subdomain regex, checks active applicant in `public.users`, and inserts with `status: 'pending_review'` without creating/activating any tenant. |
| CORS allowlist & exact-origin matching | **VERIFIED** | `netlify/functions/_shared/http.ts` (`getAllowedOrigins`, `isOriginAllowed`, `getCorsHeaders`) parses comma-separated `ALLOWED_ORIGIN`, strips trailing slashes, ignores `*`, never reflects unapproved origins, and sets `Vary: Origin`. |
| `OPTIONS` & `POST` handling + `401`/`403`/`400`/`500` | **VERIFIED** | `handlePreflightOrMethod` rejects unapproved origins with `403`, returns `204` for approved `OPTIONS`, `405` for non-`POST`. Endpoints return `401` (missing/invalid token), `400` (bad JSON/fields), `403` (forbidden/inactive), `500`/`503` (sanitized server/config errors). |
| No secrets exposed to frontend bundles | **VERIFIED** | `FIREBASE_PRIVATE_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are referenced exclusively in `netlify/functions/_shared/` and never prefixed with `VITE_`. |
| Live Netlify deployment & HTTP execution | **BLOCKED BY EXTERNAL SETUP** | Functions are not yet deployed to Netlify. |

---

## D. Frontend Routing & CTA Rules Verification

| Check | Status | Evidence (File & Reference) |
| --- | --- | --- |
| Normal Login entry for Students, Teachers, Tenant Admins | **VERIFIED** | `src/App.tsx` routes `Login` -> `/login` (`<LoginPage mode="standard" />`). |
| `Get Started` routes to Teacher/Institute Onboarding | **VERIFIED** | `src/App.tsx` (`handleMarketingAction`) routes `get started`, `onboard`, `institute`, `academy`, `teacher`, `launch` -> `/apply/academy`. |
| Far-right profile icon opens dedicated Super Admin login | **VERIFIED** | `src/components/marketing/DesktopMarketingWebsite.tsx` (lines 153–162) triggers `'Account Portal'`; `src/App.tsx` routes `'account portal'` -> `/super-admin/login`. |
| Super Admin login accepts Email & Password only | **VERIFIED** | `src/components/auth/LoginPage.tsx` (`mode="super_admin"`) enforces `type="email"` + `validateEmail`, hides role tabs/pills, hides SSO buttons, and hides registration links. |
| Backend authorization determines access | **VERIFIED** | `src/services/authService.ts` calls `/verify-session` and `/verify-super-admin`; signs out immediately on `403` in `signInSuperAdminWithCredentials`. Zero `localStorage` role trust. |

---

## E. Environment & Deployment Readiness

| Variable | Classification | Current Status |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID` | Frontend Public (Required for Production) | Referenced in `src/lib/firebase.ts` & `.env.example`; live Email/Password provider status **NOT VERIFIED**. |
| `VITE_API_BASE_URL` | Frontend Public (Optional in Dev / Required for Production) | Safely optional in `src/services/authService.ts`; unset until Netlify Functions are deployed. |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Backend-Only Secret (Required for Production) | Documented in `.env.example`; **BLOCKED BY EXTERNAL SETUP** (Netlify env vars). |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Backend-Only Secret (Required for Production) | Documented in `.env.example`; **BLOCKED BY EXTERNAL SETUP** (Netlify env vars). |
| `ALLOWED_ORIGIN` | Backend-Only Config (Required for Production CORS) | Must be set in Netlify to `https://mindbridgelms0.netlify.app,https://mindbridge-lms.ai.studio`. |

---

## Final Recommendation

**READY FOR EXTERNAL DEPLOYMENT PREPARATION** (with one minor non-security DTO mapping fix noted in `verify-session` -> `AuthContext` membership flattening before Stage 04 dashboards). All core security boundaries, RLS policies, CORS allowlist rules, and Firebase/Netlify foundations are cleanly implemented locally and ready for manual Supabase migration, Netlify environment configuration, and live security testing.
