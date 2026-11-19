# MindBridge LMS — Backend API Configuration Status

## 1. Root Cause Analysis
`VITE_API_BASE_URL` was previously referenced in `/.env.example` and `/src/services/authService.ts` as a required backend API base URL for:
- Server-side Firebase ID token verification and authoritative role resolution (`/login`)
- Global student profile persistence in Supabase PostgreSQL (`/register/student`)
- Teacher / Institute onboarding application submission and draft persistence (`/apply/academy`)

Because the production **Netlify Functions** backend has not yet been deployed, its production URL is not yet available.

## 2. Configuration Correction Applied
- **No Fake URLs or Mocks**: No placeholder, invented, or unrelated external URL was added, and no fake API or simulated backend responses were introduced.
- **Optional in Frontend Development**: `VITE_API_BASE_URL` is now explicitly optional in `/.env.example` and `/src/services/authService.ts`.
- **Graceful Handling Without Crashing**:
  - Added `getBackendApiConfig()` and `resolveBackendEndpoint(path)` in `/src/services/authService.ts`.
  - When `VITE_API_BASE_URL` is unset or empty, the application loads and operates cleanly without runtime errors, and backend-dependent submissions return a structured `BACKEND_API_NOT_CONFIGURED` status instead of throwing or faking success.
- **Firebase & UI Unchanged**: Existing Firebase configuration placeholders and all Stitch UI components remain untouched.

## 3. Frontend-Only vs. Backend-Dependent Functionality

### Frontend-Only Functionality (Works Without `VITE_API_BASE_URL`)
- Official Main Public Marketing Website (`/`) — Desktop & Mobile, Light & Dark modes, EN/SI language toggle.
- Client-side route navigation (`/`, `/login`, `/register/student`, `/apply/academy`).
- All form interactions, password visibility toggles, 4-rule password strength evaluation, email/mobile/subdomain format validation, subject chip selection, live subdomain routing preview, and local file selection list.

### Backend-Dependent Functionality (Requires Deployed Netlify Functions Backend)
| Feature | Route | Backend Responsibility |
| --- | --- | --- |
| Session & Role Verification | `/login` | Verify Firebase ID token via Netlify Function and resolve authoritative user role & tenant memberships from Supabase PostgreSQL. |
| Global Student Account Sync | `/register/student` | Persist global student profile (`student` role only) in Supabase PostgreSQL after Firebase Auth user creation. |
| Teacher / Institute Onboarding Submission | `/apply/academy` | Persist onboarding application with status `pending_review` and upload verification documents for Super Admin review (Approve/Reject). |
| Onboarding Draft Persistence | `/apply/academy` | Save and resume server-side onboarding drafts. |

## 4. Netlify Functions Compatibility & Remaining Requirements
1. Deploy the approved **Netlify Functions** backend connected to Supabase PostgreSQL.
2. Set `VITE_API_BASE_URL` in the deployment environment to the real Netlify Functions base URL (e.g., `https://<deployed-site>.netlify.app/.netlify/functions`).
3. Supply real Firebase Web SDK credentials (`VITE_FIREBASE_*`) when enabling live authentication.
