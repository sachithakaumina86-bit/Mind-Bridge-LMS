# MindBridge LMS — Stage 03.2 Controlled Migration Execution Checklist

Use this checklist before and after manually executing `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql` in the confirmed MindBridge Supabase project.

---

## 1. Pre-Execution Checks (Manual in Supabase SQL Editor)
- [ ] Confirm you are connected to the **exact intended MindBridge LMS Supabase project** (verify Project Reference ID).
- [ ] Check whether any pre-existing tables or types collide with this migration:
  ```sql
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_name IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications');

  SELECT typname FROM pg_type
  WHERE typname IN ('app_role', 'account_status', 'tenant_status', 'onboarding_status');
  ```
- [ ] If any of those tables already exist with a different schema, **STOP** and reconcile before running the migration.
- [ ] Take a manual database backup / point-in-time snapshot if the database is non-empty.

## 2. Controlled Migration Execution
- [ ] Execute `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql` inside a single transaction in Supabase SQL Editor (or via `supabase db push` in a linked CLI environment).
- [ ] Confirm zero SQL errors or warnings.

## 3. Post-Execution Verification
- [ ] Verify all 4 tables exist (`users`, `tenants`, `tenant_memberships`, `onboarding_applications`).
- [ ] Verify `public.app_role` contains all 9 confirmed roles and **no** Cashier role.
- [ ] Verify RLS is enabled and forced on all 4 tables:
  ```sql
  SELECT relname, relrowsecurity, relforcerowsecurity
  FROM pg_class
  WHERE relname IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications');
  ```
- [ ] Verify that an unauthenticated `anon` client request attempting `INSERT` or `SELECT` on `public.users`, `public.tenant_memberships`, or `public.onboarding_applications` is rejected.
- [ ] Proceed to first-time Super Admin provisioning (`SUPER_ADMIN_PROVISIONING_GUIDE.md`) and live security testing (`STAGE_03_SECURITY_TEST_PLAN.md`).
