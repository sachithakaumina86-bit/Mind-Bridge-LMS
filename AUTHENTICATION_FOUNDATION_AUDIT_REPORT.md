# MindBridge LMS — Authentication Foundation Audit Report

**Audit Type:** Read-Only Technical Audit  
**Scope:** Firebase Authentication, Supabase Integration, Netlify Functions Backend, Security Posture, and Core Auth/Onboarding Flows  
**Project Preservation:** Zero project files, UI components, routes, or configurations were modified during this audit.

---

## 1. Executive Summary

MindBridge LMS currently has a **complete, Stitch-faithful frontend UI and non-simulated integration boundary** for Stage 01 (`/`) and Stage 02 (`/login`, `/super-admin/login`, `/register/student`, `/apply/academy`). However, **live authentication, database persistence, and server-side authorization are not yet operational** because:

1. The `firebase` Web SDK is not yet installed or initialized, and real `VITE_FIREBASE_*` credentials have not been supplied.
2. No Supabase PostgreSQL schema, migrations, RLS policies, or server-side client exist in the repository yet.
3. No `netlify/functions/` directory or deployed Netlify Functions backend exists yet, and `VITE_API_BASE_URL` is intentionally optional/unset.

No security shortcuts (hardcoded credentials, fake login success, `localStorage` role trust, or exposed service-role keys) exist in the codebase.

---

## 2. Firebase Authentication Audit

| Audit Item | Status | Evidence |
| --- | --- | --- |
| Firebase SDK installation & initialization | **NOT IMPLEMENTED** | `package.json` does not include `firebase`. No Firebase initialization module exists in `src/`. |
| `VITE_FIREBASE_*` environment variable references | **IMPLEMENTED AND VERIFIED** | `.env.example` defines `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID`. `src/services/authService.ts` (`getAuthIntegrationStatus`) inspects all four keys without exposing secrets. |
| Email/Password authentication integration | **BLOCKED BY EXTERNAL CONFIGURATION** | `signInWithCredentials` and `signInSuperAdminWithCredentials` in `src/services/authService.ts` validate inputs and check `VITE_FIREBASE_*`, returning `FIREBASE_NOT_CONFIGURED` until real Firebase Web credentials and SDK calls are connected. |
| Auth state persistence & session handling | **NOT IMPLEMENTED** | No `onAuthStateChanged` listener or Auth Context provider exists yet. |
| Login & Logout implementation | **PARTIALLY IMPLEMENTED** | Login UI and client validation are implemented in `src/components/auth/LoginPage.tsx`. Live Firebase `signInWithEmailAndPassword` and `signOut` are not yet implemented. |
| Firebase ID token retrieval & refresh | **NOT IMPLEMENTED** | No `user.getIdToken(true)` call exists yet (requires `firebase` SDK initialization). |
| Authentication error handling | **IMPLEMENTED AND VERIFIED** | Field-level validation errors and structured integration-boundary error banners (`role="alert"`) are implemented in `LoginPage.tsx`, `StudentRegistrationPage.tsx`, and `TeacherOnboardingPage.tsx`. |
| Standard Login vs. Super Admin Login separation | **IMPLEMENTED AND VERIFIED** | `src/App.tsx` renders `<LoginPage mode="standard" />` at `/login` and `<LoginPage mode="super_admin" />` at `/super-admin/login`. |
| `/super-admin/login` dedicated flow | **IMPLEMENTED AND VERIFIED** | `LoginPage.tsx` calls `signInSuperAdminWithCredentials` exclusively when `mode === 'super_admin'`. |
| Super Admin Email & Password only | **IMPLEMENTED AND VERIFIED** | In `super_admin` mode, `LoginPage.tsx` enforces `type="email"` + `validateEmail`, hides role-selection tabs/pills, hides public SSO buttons, and hides registration links. |

---

## 3. Supabase Integration Audit

| Audit Item | Status | Evidence |
| --- | --- | --- |
| Supabase client initialization | **NOT IMPLEMENTED** | `@supabase/supabase-js` is not installed in `package.json`; no Supabase client file exists in the workspace. |
| Environment variable requirements | **PARTIALLY IMPLEMENTED** | Server-side variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) are documented in `SUPER_ADMIN_PROVISIONING_GUIDE.md` and intentionally excluded from frontend `.env.example`. |
| Database connection readiness | **BLOCKED BY EXTERNAL CONFIGURATION** | No live Supabase project URL or backend service-role connection has been configured. |
| User profile & `firebase_uid` mapping | **NOT IMPLEMENTED** | Target `public.users` schema with `firebase_uid` is documented in `SUPER_ADMIN_PROVISIONING_GUIDE.md`, but no SQL migration files exist in the repo yet. |
| Role & tenant membership data model | **NOT IMPLEMENTED** | No SQL migrations for `users`, `tenants`, `tenant_memberships`, or `onboarding_applications` exist in the repository yet. |
| Super Admin role verification requirements | **PARTIALLY IMPLEMENTED** | Documented in `SUPER_ADMIN_PROVISIONING_GUIDE.md` and enforced as a boundary check in `signInSuperAdminWithCredentials`, but the live database query is not yet implemented. |
| Row Level Security (RLS) status | **NOT IMPLEMENTED** | Pending Supabase schema and migration creation. |
| Tenant isolation database policies | **NOT IMPLEMENTED** | Pending Supabase schema and RLS policy creation. |
| Missing migrations / database objects | **NOT IMPLEMENTED** | No `supabase/migrations/` directory exists in the workspace root. |

---

## 4. Netlify Functions Backend Audit

| Audit Item | Status | Evidence |
| --- | --- | --- |
| Netlify Functions directory (`netlify/functions/`) | **NOT IMPLEMENTED** | Workspace root listing confirms no `netlify/` directory and no `netlify.toml` exist. |
| Existing API endpoints | **NOT IMPLEMENTED** | No serverless function endpoints exist in the repository yet. |
| Server-side Firebase ID token verification | **NOT IMPLEMENTED** | `firebase-admin` is not installed and no token-verification handler exists yet. |
| `/verify-super-admin` endpoint | **NOT IMPLEMENTED** | Referenced as the target path in `resolveBackendEndpoint('/verify-super-admin')` in `src/services/authService.ts`, but the Netlify Function itself has not been created or deployed. |
| Authoritative Supabase `super_admin` check | **NOT IMPLEMENTED** | Pending Netlify Function + Supabase PostgreSQL implementation. |
| Server-side authorization enforcement | **NOT IMPLEMENTED** | Pending backend implementation. |
| CORS, error handling & env validation | **NOT IMPLEMENTED** | Pending Netlify Functions implementation. |
| `VITE_API_BASE_URL` optionality | **IMPLEMENTED AND VERIFIED** | `.env.example` marks `VITE_API_BASE_URL` as optional during frontend development. `getBackendApiConfig()` and `resolveBackendEndpoint()` in `src/services/authService.ts` return `null` cleanly when unset without crashing or inventing a URL. |

---

## 5. Security Audit

| Security Check | Status | Evidence / Assessment |
| --- | --- | --- |
| Frontend-only role authorization | **IMPLEMENTED AND VERIFIED** | No protected dashboards or role-based route bypasses exist; role tabs on `/login` are UI hints only and cannot grant access. |
| `localStorage`-based role trust | **IMPLEMENTED AND VERIFIED** | Zero `localStorage` or `sessionStorage` usage for roles, tokens, or passwords across `src/`. |
| Hardcoded credentials | **IMPLEMENTED AND VERIFIED** | Zero hardcoded emails, passwords, or demo accounts exist anywhere in the codebase. |
| Exposed service-role keys / private keys | **IMPLEMENTED AND VERIFIED** | No `SUPABASE_SERVICE_ROLE_KEY`, Firebase Admin private keys, or secrets exist in `.env.example` or `src/`. |
| Missing server-side authorization | **NOT IMPLEMENTED** | Confirmed gap: backend endpoints do not exist yet, so server-side authorization cannot be enforced until the Netlify Functions layer is built. |
| Missing tenant isolation | **NOT IMPLEMENTED** | Confirmed gap: database tables and RLS policies do not exist yet. |
| Insecure API access | **NOT APPLICABLE** | No live API calls are currently dispatched from the frontend. |
| Incorrect authentication redirects | **IMPLEMENTED AND VERIFIED** | No fake post-login redirects exist; `/` stays on the Main Public Website, `/login` stays on standard login, and `/super-admin/login` stays on Super Admin login. |

---

## 6. Standard Login Flow Status

- **Route:** `/login` — **IMPLEMENTED AND VERIFIED** (Stitch Desktop Light/Dark & Mobile Light/Dark).
- **Client Validation & UX:** **IMPLEMENTED AND VERIFIED** (identifier/password validation, password visibility toggle, inline forgot-password form, loading/error states).
- **Live Firebase Auth & Backend Role Routing:** **BLOCKED BY EXTERNAL CONFIGURATION** (requires `firebase` SDK, `VITE_FIREBASE_*`, and deployed Netlify Functions backend to verify tokens and route to role-appropriate dashboards).

---

## 7. Super Admin Login Flow Status

- **Route:** `/super-admin/login` — **IMPLEMENTED AND VERIFIED** (reuses approved Stitch Login interface in `mode="super_admin"`).
- **Entry Point:** Far-right user icon (`Account Portal`) in `DesktopMarketingWebsite.tsx` routes to `/super-admin/login` via `src/App.tsx` — **IMPLEMENTED AND VERIFIED**.
- **Email/Password Only & No Role Selector:** **IMPLEMENTED AND VERIFIED**.
- **Live Firebase Auth & Server-Side `super_admin` Verification:** **BLOCKED BY EXTERNAL CONFIGURATION** (not operational until Firebase SDK + `/verify-super-admin` Netlify Function + Supabase `public.users` record are deployed and tested).

---

## 8. Registration and Onboarding Status

- **Universal Student Registration (`/register/student`):**
  - Stitch UI & client validation (4-rule password strength, email, `+94` mobile, PDPA consent): **IMPLEMENTED AND VERIFIED**.
  - Global student account creation & Supabase sync: **BLOCKED BY EXTERNAL CONFIGURATION**.
- **Teacher / Institute Onboarding (`/apply/academy`):**
  - Stitch UI, tenant type selector, live subdomain preview, subject chips, document list, and Mandatory Super Admin Review Policy notice: **IMPLEMENTED AND VERIFIED**.
  - Backend submission (`pending_review`) & document storage: **BLOCKED BY EXTERNAL CONFIGURATION**.
- **No Frontend Role Self-Selection:** **IMPLEMENTED AND VERIFIED** (`super_admin` pill removed from standard login; student registration explicitly scoped to `student` role only).

---

## 9. Environment Variables Checklist

| Variable | Scope | Current Status |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY` | Frontend (Public) | Defined in `.env.example`; value **NOT SUPPLIED** |
| `VITE_FIREBASE_AUTH_DOMAIN` | Frontend (Public) | Defined in `.env.example`; value **NOT SUPPLIED** |
| `VITE_FIREBASE_PROJECT_ID` | Frontend (Public) | Defined in `.env.example`; value **NOT SUPPLIED** |
| `VITE_FIREBASE_APP_ID` | Frontend (Public) | Defined in `.env.example`; value **NOT SUPPLIED** |
| `VITE_API_BASE_URL` | Frontend (Optional in dev) | Defined in `.env.example`; unset until Netlify Functions deployment |
| `FIREBASE_PROJECT_ID` | Backend Only (Netlify) | **NOT CONFIGURED** (deployment pending) |
| `FIREBASE_CLIENT_EMAIL` | Backend Only (Netlify) | **NOT CONFIGURED** (deployment pending) |
| `FIREBASE_PRIVATE_KEY` | Backend Only (Netlify) | **NOT CONFIGURED** (deployment pending) |
| `SUPABASE_URL` | Backend Only (Netlify) | **NOT CONFIGURED** (deployment pending) |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend Only (Netlify) | **NOT CONFIGURED** (deployment pending) |

---

## 10. Missing Dependencies

- **Frontend:** `firebase` (Firebase Web SDK for Email/Password auth, `onAuthStateChanged`, and `getIdToken`).
- **Backend (Netlify Functions):** `firebase-admin`, `@supabase/supabase-js`, `@netlify/functions` (for typed serverless handlers), plus `netlify.toml` configuration.
- **Database:** Supabase SQL schema migrations (`users`, `tenants`, `tenant_memberships`, `teacher_onboarding_applications`) and Row-Level Security (RLS) policies.

---

## 11. Risks and Blockers

1. **External Configuration Blocker:** Live authentication cannot be tested until real Firebase Web credentials (`VITE_FIREBASE_*`) and a Supabase project are provisioned.
2. **Backend Absence Blocker:** Without deployed Netlify Functions (`verify-super-admin`, `verify-session`, `register-student`, `submit-onboarding`), no authoritative role verification or database persistence can occur.
3. **No Live Verification Yet:** Compilation and linting pass, but no live end-to-end authentication or `403 Forbidden` authorization tests have been executed.

---

## 12. Recommended Next Implementation Stage

**Stage 03 — Firebase Web SDK + Supabase Schema + Netlify Functions Auth Backend Foundation:**
1. Install `firebase` on the frontend and implement real Firebase Auth initialization, `AuthContext` (`onAuthStateChanged`, `getIdToken`, `signOut`), and live calls inside `src/services/authService.ts` (keeping graceful fallback when env vars are missing).
2. Create the authoritative Supabase PostgreSQL schema migrations and RLS policies (`users`, `tenants`, `tenant_memberships`, `onboarding_applications`).
3. Create the Netlify Functions backend (`netlify/functions/verify-session.ts`, `verify-super-admin.ts`, `register-student.ts`, `submit-onboarding.ts`) with Firebase Admin ID token verification, CORS, and strict server-side role checks.
4. Execute live end-to-end tests once the user supplies the Firebase and Supabase credentials and deploys the Netlify Functions.
