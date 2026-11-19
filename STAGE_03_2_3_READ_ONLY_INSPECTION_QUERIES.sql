-- ============================================================================
-- MindBridge LMS — Stage 03.2.3 Read-Only Target Database Inspection Queries
-- Compatible with Supabase PostgreSQL (SELECT-only catalog queries; zero DDL/DML)
-- Target Migration: supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql
-- ============================================================================

-- QUERY 1: Existing target tables and their columns
SELECT
  c.table_schema,
  c.table_name,
  c.ordinal_position,
  c.column_name,
  c.data_type,
  c.udt_name,
  c.is_nullable,
  c.column_default
FROM information_schema.columns c
WHERE c.table_schema = 'public'
  AND c.table_name IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
ORDER BY c.table_name, c.ordinal_position;

-- QUERY 2: Existing enum types (app_role, account_status, tenant_status, onboarding_status) and their values
SELECT
  n.nspname AS schema_name,
  t.typname AS enum_name,
  e.enumsortorder,
  e.enumlabel AS enum_value
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
JOIN pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
  AND t.typname IN ('app_role', 'account_status', 'tenant_status', 'onboarding_status')
ORDER BY t.typname, e.enumsortorder;

-- QUERY 3A: Existing constraints (PRIMARY KEY, UNIQUE, CHECK, FOREIGN KEY) on target tables
SELECT
  con.conname AS constraint_name,
  rel.relname AS table_name,
  con.contype AS constraint_type,
  pg_catalog.pg_get_constraintdef(con.oid) AS constraint_definition
FROM pg_constraint con
JOIN pg_class rel ON rel.oid = con.conrelid
JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
WHERE nsp.nspname = 'public'
  AND rel.relname IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
ORDER BY rel.relname, con.contype, con.conname;

-- QUERY 3B: Existing indexes on target tables
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
ORDER BY tablename, indexname;

-- QUERY 4: Existing public.set_updated_at() function definition and security configuration
SELECT
  n.nspname AS schema_name,
  p.proname AS function_name,
  p.prosecdef AS is_security_definer,
  p.proconfig AS function_config,
  pg_catalog.pg_get_functiondef(p.oid) AS function_definition
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname = 'set_updated_at';

-- QUERY 5: Existing triggers on the four target tables
SELECT
  event_object_table AS table_name,
  trigger_name,
  action_timing,
  event_manipulation,
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
ORDER BY event_object_table, trigger_name;

-- QUERY 6: Existing RLS enabled and FORCE RLS status on target tables
SELECT
  n.nspname AS schema_name,
  c.relname AS table_name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
  AND c.relname IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
ORDER BY c.relname;

-- QUERY 7: Existing RLS policies on target tables
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
ORDER BY tablename, policyname;

-- QUERY 8: Existing table grants for anon and authenticated roles on target tables
SELECT
  table_schema,
  table_name,
  grantee,
  privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND table_name IN ('users', 'tenants', 'tenant_memberships', 'onboarding_applications')
  AND grantee IN ('anon', 'authenticated', 'PUBLIC')
ORDER BY table_name, grantee, privilege_type;

-- QUERY 9: General conflict check for any non-table relations (views, sequences, etc.) sharing target names
SELECT
  n.nspname AS schema_name,
  c.relname AS object_name,
  c.relkind AS object_kind
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN (
    'users',
    'tenants',
    'tenant_memberships',
    'onboarding_applications',
    'idx_users_firebase_uid',
    'idx_users_role',
    'idx_tenants_subdomain',
    'idx_tenants_status',
    'idx_tenant_memberships_user_id',
    'idx_tenant_memberships_tenant_id',
    'idx_onboarding_applicant_user_id',
    'idx_onboarding_status',
    'idx_onboarding_subdomain'
  )
ORDER BY c.relkind, c.relname;
