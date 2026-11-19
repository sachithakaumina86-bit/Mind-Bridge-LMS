# MindBridge LMS — Supabase Database Schema Reference

**Migration File:** `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql`  
**Execution Status:** Authored and validated locally; **NOT YET EXECUTED** against a live Supabase database.

## 1. Enums
- `public.app_role`: `super_admin`, `tenant_owner`, `tenant_admin`, `admin_manager`, `teacher`, `assistant`, `content_manager`, `accountant`, `student` (no Cashier role).
- `public.account_status`: `active`, `suspended`, `disabled`.
- `public.tenant_status`: `pending`, `active`, `suspended`, `archived`.
- `public.onboarding_status`: `pending_review`, `approved`, `rejected`.

## 2. Tables
1. **`public.users`**: Global user identity mapped via unique `firebase_uid` and `email`. Default role is `student`.
2. **`public.tenants`**: Approved academy/institute workspaces with unique regex-validated `subdomain`, `tenant_type` (`individual` | `institute`), `owner_user_id`, and `status`.
3. **`public.tenant_memberships`**: Many-to-many join between `users` and `tenants` (`UNIQUE (user_id, tenant_id)`), allowing one global student account to belong to multiple tenants with separate tenant-scoped roles (`CHECK (role <> 'super_admin')`).
4. **`public.onboarding_applications`**: Teacher/institute applications linked to `applicant_user_id`, defaulting to `status = 'pending_review'` with `reviewed_by`, `reviewed_at`, and `review_notes`.

## 3. Row Level Security (RLS)
- `ENABLE ROW LEVEL SECURITY` and `FORCE ROW LEVEL SECURITY` enabled on all 4 tables.
- Direct `INSERT`, `UPDATE`, and `DELETE` revoked from `anon` and `authenticated` roles.
- Only `public_read_active_tenants` (`SELECT` on `tenants WHERE status = 'active'`) is permitted for public reads.
- All user profile, role, membership, and onboarding operations must pass through server-side Netlify Functions using `SUPABASE_SERVICE_ROLE_KEY`.
