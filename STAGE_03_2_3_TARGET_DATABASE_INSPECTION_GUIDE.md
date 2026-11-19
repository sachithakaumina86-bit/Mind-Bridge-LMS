# MindBridge LMS — Stage 03.2.3 Target Database Inspection Guide

Run the read-only queries in `STAGE_03_2_3_READ_ONLY_INSPECTION_QUERIES.sql` in the **Supabase SQL Editor** of your confirmed MindBridge LMS project **before** executing `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql`.

All queries are strictly read-only (`SELECT` against PostgreSQL system catalogs).

---

## Query-by-Query Interpretation Guide

### Query 1: Existing Target Tables & Columns
- **What it checks:** Whether `public.users`, `public.tenants`, `public.tenant_memberships`, or `public.onboarding_applications` already exist and what columns/types they have.
- **Why it matters:** `CREATE TABLE IF NOT EXISTS` silently skips existing tables. If a table already exists with different columns, Netlify Functions queries will fail at runtime.
- **Conflict indicator:** Any rows returned where column names, data types, or nullability differ from `202611180001_initial_auth_and_tenant_schema.sql`.
- **If conflict found:** **STOP.** Do not run the initial migration. Share the query output so a safe, additive reconciliation migration can be designed.

### Query 2: Existing Enum Types (`app_role`, `account_status`, `tenant_status`, `onboarding_status`)
- **What it checks:** Whether any of the 4 enums already exist and what labels they contain.
- **Why it matters:** The migration guards `CREATE TYPE` with `IF NOT EXISTS`. An existing `app_role` missing any of the 9 confirmed roles (or containing an unapproved `cashier` role) would not be updated automatically.
- **Conflict indicator:** Missing confirmed roles, extra unapproved roles (e.g. `cashier`), or mismatched status enum values.
- **If conflict found:** **STOP** and prepare an explicit `ALTER TYPE` reconciliation plan before migrating.

### Query 3A & 3B: Existing Constraints, Foreign Keys & Indexes
- **What it checks:** Existing PKs, FKs, `UNIQUE`/`CHECK` constraints, and indexes on the four target tables.
- **Why it matters:** Conflicting unique/check constraints or missing FKs (`tenant_memberships.tenant_id -> tenants.id`) can break PostgREST joins in `verify-session.ts`.
- **Conflict indicator:** Unexpected constraints or missing/different FK targets.
- **If conflict found:** **STOP** and reconcile constraints before applying the migration.

### Query 4: Existing `public.set_updated_at()` Function
- **What it checks:** Whether `public.set_updated_at()` already exists, whether it is `SECURITY DEFINER`, and its `proconfig` (`search_path`).
- **Why it matters:** `CREATE OR REPLACE FUNCTION` will replace an existing function of the same signature.
- **Conflict indicator:** An existing `public.set_updated_at()` used by unrelated tables with different logic.
- **If conflict found:** Review the existing function body before overwriting.

### Query 5: Existing Triggers on Target Tables
- **What it checks:** Any triggers already attached to the four target tables.
- **Why it matters:** The migration runs `DROP TRIGGER IF EXISTS trg_<table_name>_updated_at` before creating its triggers.
- **Conflict indicator:** Existing triggers with the same names performing custom logic, or duplicate `updated_at` triggers.
- **If conflict found:** Inspect trigger definitions before proceeding.

### Query 6: Existing RLS Enabled / Forced Status
- **What it checks:** `relrowsecurity` and `relforcerowsecurity` on the four target tables.
- **Why it matters:** Confirms whether RLS is currently disabled or already active on any pre-existing table.
- **Conflict indicator:** Pre-existing tables with `rls_enabled = false` holding live data.
- **If conflict found:** Verify no existing app depends on open client access before enabling `FORCE ROW LEVEL SECURITY`.

### Query 7: Existing RLS Policies
- **What it checks:** Any policies already defined on the four target tables.
- **Why it matters:** Overly permissive existing policies (e.g., `USING (true)` on `public.users`) would remain active alongside the new migration unless explicitly reviewed.
- **Conflict indicator:** Any unexpected permissive `SELECT`/`INSERT`/`UPDATE`/`DELETE` policies on `users`, `tenant_memberships`, or `onboarding_applications`.
- **If conflict found:** **STOP** and audit existing policies before proceeding.

### Query 8: Existing Grants for `anon` and `authenticated`
- **What it checks:** Table-level `SELECT`/`INSERT`/`UPDATE`/`DELETE` grants to `anon`, `authenticated`, or `PUBLIC`.
- **Why it matters:** Confirms whether direct client writes are currently granted (the migration explicitly revokes `INSERT, UPDATE, DELETE` from `anon, authenticated`).
- **Conflict indicator:** Unexpected `ALL` or write grants to `PUBLIC`.
- **If conflict found:** Document and review before migration.

### Query 9: Non-Table Object Name Collisions
- **What it checks:** Whether any view (`v`), materialized view (`m`), sequence (`S`), or index (`i`) in `public` already uses one of the target table or index names.
- **Why it matters:** A view named `public.users` will cause `CREATE TABLE IF NOT EXISTS public.users` to fail or conflict.
- **Conflict indicator:** Any row returned with `object_kind <> 'r'` for table names or unexpected `object_kind` for index names.
- **If conflict found:** **STOP** and resolve the naming collision before running the migration.

---

## Clean-State Expected Result (Empty / Fresh Database)
On a fresh MindBridge Supabase project, **Queries 1 through 9 will return 0 rows**, confirming it is safe to proceed to controlled migration execution.
