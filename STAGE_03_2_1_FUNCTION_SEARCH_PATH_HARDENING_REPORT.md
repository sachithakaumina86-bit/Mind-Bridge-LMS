# MindBridge LMS — Stage 03.2.1 Function `search_path` Hardening Report

**Target File:** `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql`  
**Target Function:** `public.set_updated_at()` (Lines 52–60)  
**Audit Mode:** Strict Read-Only Investigation (No SQL executed; no files modified)

---

## 1. Current Function Definition
```sql
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
```

## 2. Security Concern
- `public.set_updated_at()` does not declare an immutable `SET search_path = ''`.
- While this function is `SECURITY INVOKER` (the default, not `SECURITY DEFINER`), leaving `search_path` mutable triggers Supabase Database Linter warning `0011_function_search_path_mutable` and deviates from PostgreSQL defense-in-depth guidelines against search-path shadowing.

## 3. Whether Hardening Is Necessary
- **Not a critical blocker**, because the function is `SECURITY INVOKER` and only sets `NEW.updated_at = NOW()`.
- **Recommended before initial migration execution**, because fixing it now eliminates the Supabase Security Advisor warning with zero runtime overhead or breaking changes.

## 4. Exact Recommended Change (For Future Authorized Edit)
```sql
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = pg_catalog.now();
  RETURN NEW;
END;
$$;
```

## 5. Qualified Object Reference Requirements
- **`NEW.updated_at`**: Trigger record attribute — resolved directly from the trigger row, unaffected by `search_path`.
- **`NOW()` -> `pg_catalog.now()`**: PostgreSQL always includes `pg_catalog` implicitly even when `search_path = ''`, so `NOW()` continues to resolve; however, explicitly qualifying `pg_catalog.now()` guarantees unambiguous resolution and adheres strictly to hardened PL/pgSQL conventions.
- No other tables, functions, operators, or types are referenced inside `public.set_updated_at()`.

## 6. Trigger Compatibility
All four triggers invoking this function already schema-qualify both the target table and the function:
1. `trg_users_updated_at` on `public.users` -> `EXECUTE FUNCTION public.set_updated_at()`
2. `trg_tenants_updated_at` on `public.tenants` -> `EXECUTE FUNCTION public.set_updated_at()`
3. `trg_tenant_memberships_updated_at` on `public.tenant_memberships` -> `EXECUTE FUNCTION public.set_updated_at()`
4. `trg_onboarding_applications_updated_at` on `public.onboarding_applications` -> `EXECUTE FUNCTION public.set_updated_at()`

**Compatibility Risk:** None. All triggers remain 100% compatible with `SET search_path = ''`.

## 7. Whether the Migration File Needs Modification
- Because the migration has **not yet been executed** against the live Supabase database, applying this 2-line hardening edit directly to `supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql` (once explicitly authorized) is cleaner than adding a separate follow-up migration.

## 8. Remaining Risks
- None for `public.set_updated_at()` once hardened.

---

## Conclusion

**HARDENING RECOMMENDED**
