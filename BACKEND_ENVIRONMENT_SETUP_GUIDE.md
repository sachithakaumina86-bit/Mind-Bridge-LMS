# MindBridge LMS — Backend Environment Setup Guide

## 1. Frontend Environment Variables (Public / Vite)
Configure in AI Studio / Netlify Frontend Environment:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_API_BASE_URL` *(Optional during frontend dev; set to `https://<your-site>.netlify.app/.netlify/functions` after deploying Netlify Functions)*

## 2. Backend-Only Environment Variables (Netlify Functions Only)
Configure **exclusively** in Netlify Site Settings -> Environment Variables (never prefix with `VITE_`):
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` *(Preserve `\n` line breaks)*
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGIN` *(Optional, e.g. your production frontend origin)*

## 3. Manual Setup Checklist Required Before Live Testing
1. Verify **Email/Password** sign-in is enabled in Firebase Console -> Authentication -> Sign-in method.
2. Apply `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql` to your confirmed MindBridge Supabase project.
3. Deploy the repository to Netlify with all backend environment variables configured.
4. Set `VITE_API_BASE_URL` to the deployed Netlify Functions URL.
5. Provision the first Super Admin account following `SUPER_ADMIN_PROVISIONING_GUIDE.md`.
