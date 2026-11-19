# MindBridge LMS — Stage 02: Authentication & Backend Integration Status

## 1. Current Environment Status
- **Firebase Authentication (`VITE_FIREBASE_*`)**: **Not Configured** (real Firebase Web credentials have not been supplied in this stage).
- **Backend Verification & Onboarding API (`VITE_API_BASE_URL`)**: **Not Configured** (Supabase PostgreSQL backend service URL has not been supplied in this stage).

## 2. Integration Boundary Implemented
- Added environment variable placeholders to `/.env.example`:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_API_BASE_URL`
- Implemented `/src/services/authService.ts` as the typed integration boundary for:
  - `signInWithCredentials`
  - `requestPasswordReset`
  - `registerUniversalStudent`
  - `submitTeacherOnboardingApplication`

## 3. Honest Failure Behavior (No Fake Auth)
- When a user submits a valid form on `/login`, `/register/student`, or `/apply/academy`, `authService` detects the missing `VITE_FIREBASE_*` / `VITE_API_BASE_URL` configuration and returns a structured `FIREBASE_NOT_CONFIGURED` or `BACKEND_API_NOT_CONFIGURED` error.
- The UI renders a clear, honest integration-required alert banner.
- No fake authentication, no mock user sessions, no `localStorage` password storage, and no client-side role authorization exist anywhere in the codebase.
