# MindBridge LMS — Stage 03.2 Supabase Migration Pre-Execution Review Report

**Migration File:** `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql`  
**Audit Mode:** Strict Read-Only Review (No SQL executed; no files modified)

---

## 1. Database Schema Review

| Check | Status | SQL Reference & Explanation |
| --- | --- | --- |
| Nine confirmed roles; no Cashier role | **VERIFIED** | Lines 9–24: `public.app_role` defines exactly `super_admin`, `tenant_owner`, `tenant_admin`, `admin_manager`, `teacher`, `assistant`, `content_manager`, `accountant`, `student`. No Cashier role exists. |
| Status enums (`account_status`, `tenant_status`, `onboarding_status`) | **VERIFIED** | Lines 27–49: `account_status` (`active`, `suspended`, `disabled`), `tenant_status` (`pending`, `active`, `suspended`, `archived`), `onboarding_status` (`pending_review`, `approved`, `rejected`). |
| `public.users` table | **VERIFIED** | Lines 65–78: UUID PK (`gen_random_uuid()`), `firebase_uid TEXT NOT NULL UNIQUE`, `email TEXT NOT NULL UNIQUE`, `preferred_language CHECK ('en','si','ta')`, `role DEFAULT 'student'`, `status DEFAULT 'active'`, `created_at`/`updated_at` with trigger, indexes on `firebase_uid` and `role`. |
| `public.tenants` table | **VERIFIED** | Lines 91–100: UUID PK, `subdomain TEXT NOT NULL UNIQUE` with regex `CHECK`, `tenant_type CHECK ('individual','institute')`, `owner_user_id` FK -> `public.users(id) ON DELETE RESTRICT`, `status DEFAULT 'pending'`, indexes on `subdomain` and `status`. |
| `public.tenant_memberships` table | **VERIFIED** | Lines 113–123: UUID PK, `user_id` FK -> `public.users(id) ON DELETE CASCADE`, `tenant_id` FK -> `public.tenants(id) ON DELETE CASCADE`, `role CHECK (role <> 'super_admin')`, `UNIQUE (user_id, tenant_id)` supporting one global student across multiple tenants. |
| `public.onboarding_applications` table | **VERIFIED** | Lines 136–152: UUID PK, `applicant_user_id` FK -> `public.users(id) ON DELETE RESTRICT`, `proposed_subdomain` regex `CHECK`, `subjects TEXT[]`, `document_metadata JSONB`, `status DEFAULT 'pending_review'`, `reviewed_by` FK -> `public.users(id) ON DELETE SET NULL`. |

---

## 2. Existing Database Compatibility Review

| Check | Status | SQL Reference & Explanation |
| --- | --- | --- |
| `CREATE TYPE` / `CREATE TABLE` / `CREATE INDEX` idempotency | **VERIFIED** | All enums use `IF NOT EXISTS (SELECT 1 FROM pg_type ...)`, all tables use `CREATE TABLE IF NOT EXISTS`, all indexes use `CREATE INDEX IF NOT EXISTS`. |
| `DROP` statements & destructive risk | **VERIFIED** | Zero `DROP TABLE`, `DROP TYPE`, `TRUNCATE`, or `DELETE` statements. Only `DROP TRIGGER IF EXISTS` and `DROP POLICY IF EXISTS` are used for idempotent re-creation. |
| Rerunnability | **VERIFIED** | Safely rerunnable on an empty or matching schema without data loss. |
| Pre-existing conflicting tables in target Supabase DB | **BLOCKED BY EXTERNAL DATABASE INSPECTION** | Cannot inspect the live target Supabase project locally. If `public.users` or `public.tenants` already exist with incompatible column definitions, `CREATE TABLE IF NOT EXISTS` will skip them silently; pre-execution inspection is required. |

---

## 3. Row Level Security (RLS) Review

| Check | Status | SQL Reference & Explanation |
| --- | --- | --- |
| `ENABLE` & `FORCE ROW LEVEL SECURITY` | **VERIFIED** | Lines 171–179: Enabled and forced on all 4 tables (`users`, `tenants`, `tenant_memberships`, `onboarding_applications`). |
| Direct client write revocation | **VERIFIED** | Lines 182–185: `REVOKE INSERT, UPDATE, DELETE` from `anon, authenticated` on all 4 tables. |
| Cross-tenant isolation & default deny | **VERIFIED** | Zero direct client `SELECT`/`INSERT`/`UPDATE`/`DELETE` policies on `users`, `tenant_memberships`, or `onboarding_applications`. Only `public_read_active_tenants` (`SELECT` on `tenants WHERE status = 'active'`) is permitted publicly. |
| Service-role backend-only boundary | **VERIFIED** | All privileged reads/writes occur exclusively in Netlify Functions using `SUPABASE_SERVICE_ROLE_KEY`. |
| Live RLS enforcement test | **NOT VERIFIED** | Requires live execution against Supabase using the `anon` key after migration. |

---

## 4. Backend Compatibility Review (Including Stage 03.1)

| Backend Function | Status | Verification Details |
| --- | --- | --- |
| `netlify/functions/verify-session.ts` | **VERIFIED** | Queries `users(id, firebase_uid, email, full_name, role, status)` and `tenant_memberships(role, status, tenants(id, name, subdomain, status))`. FK `tenant_memberships.tenant_id -> tenants.id` enables PostgREST relationship join; Stage 03.1 flattening maps exact columns to `{ tenantId, tenantName, subdomain, role, status }`. |
| `netlify/functions/verify-super-admin.ts` | **VERIFIED** | Queries `users(id, firebase_uid, email, full_name, role, status)` and checks `status === 'active'` and `role === 'super_admin'`. Matches `public.users` and `public.app_role` exactly. |
| `netlify/functions/register-student.ts` | **VERIFIED** | Inserts `firebase_uid`, `email`, `full_name`, `mobile`, `academic_stream`, `preferred_language`, `whatsapp_opt_in`, `role: 'student'`, `status: 'active'` into `public.users`. Matches all columns and constraints exactly. |
| `netlify/functions/submit-onboarding.ts` | **VERIFIED** | Queries `users(id, status)` and inserts `applicant_user_id`, `tenant_type`, `academy_name`, `proposed_subdomain`, `subjects`, `contact_person`, `nic_or_br`, `whatsapp`, `document_metadata`, `status: 'pending_review'` into `public.onboarding_applications`. Matches all columns and constraints exactly. |

---

## 5. Security Risks Review

| Risk Category | Status | Assessment |
| --- | --- | --- |
| Cross-tenant data leakage / overly permissive policies | **VERIFIED** | Deny-by-default RLS prevents direct client access to user, membership, or onboarding tables. |
| Recursive RLS risks | **VERIFIED** | Zero recursive subqueries in RLS policies. |
| `SECURITY DEFINER` functions | **VERIFIED** | No `SECURITY DEFINER` functions exist in the migration. |
| `search_path` on `public.set_updated_at()` | **ISSUE FOUND** | Lines 52–60: `public.set_updated_at()` is `SECURITY INVOKER` (low risk), but omits `SET search_path = ''`. Non-blocking, but worth adding in a future hardening migration if desired. |
| Unnecessary public grants | **VERIFIED** | Direct `INSERT`/`UPDATE`/`DELETE` explicitly revoked from `anon, authenticated`; only `SELECT` on active tenants is exposed. |

---

## Final Recommendation

**SAFE TO PROCEED TO CONTROLLED MIGRATION** (after completing the pre-execution database existence checks in `STAGE_03_2_MIGRATION_EXECUTION_CHECKLIST.md`).
