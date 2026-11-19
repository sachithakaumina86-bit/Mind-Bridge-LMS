# MindBridge LMS — Super Admin Login Implementation Report

## 1. Dedicated Route & Entry Point
- **Route:** `/super-admin/login`
- **Entry Point:** Far-right user icon (`Account Portal`) in the Main Public Website (`/`) header.
- **Separation from Standard Login:** Standard Students, Teachers, and Tenant Admins continue to use `/login`, which remains completely separate and unchanged.

## 2. Reused Approved Google Stitch Reference
Per user clarification and the Strict UI Reference Rule, `/super-admin/login` reuses the exact approved Google Stitch Login interface (`LoginPage.tsx` with `mode="super_admin"`), preserving all layouts, colors, typography, spacing, light/dark modes, and responsive behavior:
- Desktop Light: `mindbridge_lms_split_screen_login_authentication__code_d9bcdbde.html`
- Desktop Dark: `mindbridge_lms_split_screen_login_authentication_dark_mode_1_1__code_1da31781.html`
- Mobile Light: `mindbridge_lms_split_screen_login_authentication_mobile__code_a0555618.html`
- Mobile Dark: `mindbridge_lms_split_screen_login_authentication_dark_mode_mobile__code_e8745f11.html`

### Super Admin Mode Adaptations (Within Approved Layout)
- Accepts **Super Admin Email and Password only** (`type="email"` with strict email validation).
- Hides all Student, Teacher, and Tenant Admin role-selection tabs/pills.
- Hides public SSO buttons (`SL Education ID`, `Tenant QR Key`) and public registration links (`Create Student Account`, `Onboard Institute`).
- Includes a link back to `/login` for standard users.

## 3. Authentication & Authorization Status
- **Status:** **Not Yet Operational** (UI & integration boundary ready; live end-to-end verification pending).
- **Integration Boundary:** `signInSuperAdminWithCredentials` in `/src/services/authService.ts`:
  - Validates Super Admin email and password.
  - Checks for real Firebase Web credentials (`VITE_FIREBASE_*`) and the deployed Netlify Functions backend (`VITE_API_BASE_URL` -> `/verify-super-admin`).
  - Never trusts frontend role selection or `localStorage`.
  - Never creates fake credentials or simulates successful login.

## 4. Remaining Backend & Deployment Dependencies
- [ ] Supply real Firebase Web SDK credentials (`VITE_FIREBASE_*`).
- [ ] Deploy the Netlify Functions backend (`POST /.netlify/functions/verify-super-admin`) with Firebase Admin SDK and `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Set `VITE_API_BASE_URL` to the deployed Netlify Functions base URL.
- [ ] Provision the first Super Admin account in Firebase Auth and assign `role = 'super_admin'` in Supabase PostgreSQL (see `SUPER_ADMIN_PROVISIONING_GUIDE.md`).
- [ ] Execute live end-to-end positive (`super_admin`) and negative (`403 Forbidden` for non-Super Admin) authentication tests.
