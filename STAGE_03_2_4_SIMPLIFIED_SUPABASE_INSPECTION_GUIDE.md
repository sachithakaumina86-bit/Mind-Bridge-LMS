# MindBridge LMS — Simplified Supabase Database Inspection Guide

**Target Project:** `https://mxhxhrdphoqwlyykssuq.supabase.co`  
**Target Migration (Not Yet Executed):** `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql`

---

## 1. Available Connection Options Check

| Connection Type | Status in This Environment |
| --- | --- |
| Direct PostgreSQL Database Connection | **Not Available** — AI Studio cannot connect directly to your external Supabase database. |
| Supabase Management API Connection | **Not Available** — No authenticated Supabase Management API integration is connected. |
| Supabase SQL Editor (Manual One-Click Run) | **Available (Recommended & Safest)** — Runs directly inside your own Supabase dashboard without sharing any passwords or keys. |

---

## 2. Single Beginner-Friendly Inspection Script (Read-Only)

This single `SELECT`-only script checks all **9 inspection areas** at once and returns **one clean table**. It makes **zero changes** to your database.

```sql
-- MindBridge LMS — Single Read-Only Pre-Migration Inspection Script
-- Safe: SELECT statements only. Does not modify any data or schema.

SELECT '0. Connection Check' AS check_area,
       current_database() AS object_name,
       'Connected as ' || current_user || ' | Schema: ' || current_schema() AS details

UNION ALL

SELECT '1. Target Tables & Columns',
       table_name || '.' || column_name,
       data_type || ' (nullable: ' || is_nullable || ')'
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')

UNION ALL

SELECT '2. Enum Types & Values',
       t.typname,
       e.enumlabel
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
JOIN pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
  AND t.typname IN ('app_role', 'account_status', 'tenant_status', 'onboarding_status')

UNION ALL

SELECT '3. Constraints & FKs',
       rel.relname || '.' || con.conname,
       con.contype::text || ': ' || pg_catalog.pg_get_constraintdef(con.oid)
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
WHERE nsp.nspname = 'public'
  AND rel.relname IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')

UNION ALL

SELECT '4. Indexes',
       tablename || '.' || indexname,
       indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')

UNION ALL

SELECT '5. set_updated_at() Function',
       p.proname,
       'security_definer=' || p.prosecdef::text || ' | config=' || COALESCE(array_to_string(p.proconfig, ','), 'none')
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname = 'set_updated_at'

UNION ALL

SELECT '6. Triggers',
       event_object_table || '.' || trigger_name,
       action_timing || ' ' || event_manipulation
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')

UNION ALL

SELECT '7. RLS Status',
       c.relname,
       'rls_enabled=' || c.relrowsecurity::text || ' | rls_forced=' || c.relforcerowsecurity::text
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
  AND c.relname IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')

UNION ALL

SELECT '8. RLS Policies',
       tablename || '.' || policyname,
       cmd || ' for ' || array_to_string(roles, ',')
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')

UNION ALL

SELECT '9. Client Grants (anon/auth)',
       table_name || ' (' || grantee || ')',
       privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
  AND grantee IN ('anon', 'authenticated', 'PUBLIC')

ORDER BY check_area, object_name;
```

---

## 3. How to Run This in Supabase (5 Simple Steps)

1. Open your browser and log in to **Supabase Dashboard**.
2. Open your MindBridge project and confirm the URL/Project Reference ID is **`mxhxhrdphoqwlyykssuq`**.
3. In the left sidebar, click **SQL Editor**.
4. Click **New query**, paste the entire SQL script from Section 2 above, and click **Run**.
5. Copy the result rows (or take a screenshot / export as CSV/JSON) and share them here.

---

## 4. How to Interpret Your Results (Plain English)

- **Why we include `0. Connection Check`:** This guarantees the query actually ran and confirms you are connected to PostgreSQL. Seeing **0 rows total** would mean the query did not execute properly — never assume 0 rows automatically means success.
- **If ONLY `0. Connection Check` appears (1 row total):** None of the 4 MindBridge tables, 4 enums, triggers, or policies exist yet in `public`. That means your database is clean and has no naming conflicts with the initial migration.
- **If rows appear under sections `1` through `9`:** Some MindBridge tables, enums, functions, or policies already exist. **Do not run the migration yet** — paste those rows here so we can check whether they match or conflict with `202611180001_initial_auth_and_tenant_schema.sql`.

---

## 5. Next Step
Do **not** execute `202611180001_initial_auth_and_tenant_schema.sql` yet. Paste the output of the single inspection script above so we can review your actual database state and give you a clear go/no-go recommendation.
