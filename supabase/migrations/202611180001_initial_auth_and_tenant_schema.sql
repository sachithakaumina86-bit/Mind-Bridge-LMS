-- ============================================================================
-- MindBridge LMS — Stage 03 Initial Authentication & Multi-Tenant Schema
-- Additive, idempotent PostgreSQL migration for Supabase
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Confirmed Role Enum (Explicitly excludes any Cashier role)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM (
      'super_admin',
      'tenant_owner',
      'tenant_admin',
      'admin_manager',
      'teacher',
      'assistant',
      'content_manager',
      'accountant',
      'student'
    );
  END IF;
END
$$;

-- 2. Status Enums
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_status') THEN
    CREATE TYPE public.account_status AS ENUM ('active', 'suspended', 'disabled');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tenant_status') THEN
    CREATE TYPE public.tenant_status AS ENUM ('pending', 'active', 'suspended', 'archived');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'onboarding_status') THEN
    CREATE TYPE public.onboarding_status AS ENUM ('pending_review', 'approved', 'rejected');
  END IF;
END
$$;

-- 3. Updated-at trigger helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- TABLE: public.users (Global Identity mapped to Firebase UID)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  mobile TEXT,
  academic_stream TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'si', 'ta')),
  role public.app_role NOT NULL DEFAULT 'student',
  status public.account_status NOT NULL DEFAULT 'active',
  whatsapp_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON public.users (firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- TABLE: public.tenants (Approved Academies / Institutes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subdomain TEXT NOT NULL UNIQUE CHECK (subdomain ~ '^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])?$'),
  tenant_type TEXT NOT NULL CHECK (tenant_type IN ('individual', 'institute')),
  owner_user_id UUID REFERENCES public.users (id) ON DELETE RESTRICT,
  status public.tenant_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON public.tenants (subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON public.tenants (status);

DROP TRIGGER IF EXISTS trg_tenants_updated_at ON public.tenants;
CREATE TRIGGER trg_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- TABLE: public.tenant_memberships (Global User <-> Multi-Tenant Permissions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tenant_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants (id) ON DELETE CASCADE,
  role public.app_role NOT NULL CHECK (role <> 'super_admin'),
  status public.account_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, tenant_id)
);

CREATE INDEX IF NOT EXISTS idx_tenant_memberships_user_id ON public.tenant_memberships (user_id);
CREATE INDEX IF NOT EXISTS idx_tenant_memberships_tenant_id ON public.tenant_memberships (tenant_id);

DROP TRIGGER IF EXISTS trg_tenant_memberships_updated_at ON public.tenant_memberships;
CREATE TRIGGER trg_tenant_memberships_updated_at
  BEFORE UPDATE ON public.tenant_memberships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- TABLE: public.onboarding_applications (Teacher / Institute Review Queue)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.onboarding_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_user_id UUID NOT NULL REFERENCES public.users (id) ON DELETE RESTRICT,
  tenant_type TEXT NOT NULL CHECK (tenant_type IN ('individual', 'institute')),
  academy_name TEXT NOT NULL,
  proposed_subdomain TEXT NOT NULL CHECK (proposed_subdomain ~ '^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])?$'),
  subjects TEXT[] NOT NULL DEFAULT '{}',
  contact_person TEXT NOT NULL,
  nic_or_br TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  document_metadata JSONB NOT NULL DEFAULT '[]'::jsonb,
  status public.onboarding_status NOT NULL DEFAULT 'pending_review',
  reviewed_by UUID REFERENCES public.users (id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_applicant_user_id ON public.onboarding_applications (applicant_user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_status ON public.onboarding_applications (status);
CREATE INDEX IF NOT EXISTS idx_onboarding_subdomain ON public.onboarding_applications (proposed_subdomain);

DROP TRIGGER IF EXISTS trg_onboarding_applications_updated_at ON public.onboarding_applications;
CREATE TRIGGER trg_onboarding_applications_updated_at
  BEFORE UPDATE ON public.onboarding_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) — Deny by Default, Server-Authoritative Writes
-- ============================================================================
-- All privileged operations (role assignment, Super Admin verification,
-- onboarding approval, tenant provisioning) are executed exclusively by
-- verified Netlify Functions using SUPABASE_SERVICE_ROLE_KEY.
-- Direct browser/anon/authenticated client access is denied by default.

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_applications ENABLE ROW LEVEL SECURITY;

-- Force RLS even for table owners where appropriate (service_role bypasses RLS in Supabase)
ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE public.tenants FORCE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_memberships FORCE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_applications FORCE ROW LEVEL SECURITY;

-- Explicitly revoke direct write privileges from anon and authenticated roles
REVOKE INSERT, UPDATE, DELETE ON public.users FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.tenants FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.tenant_memberships FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.onboarding_applications FROM anon, authenticated;

-- Public read of active tenants only (for future public academy directory/storefront resolution)
DROP POLICY IF EXISTS "public_read_active_tenants" ON public.tenants;
CREATE POLICY "public_read_active_tenants"
  ON public.tenants
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- No direct client SELECT/INSERT/UPDATE/DELETE policies on users, tenant_memberships,
-- or onboarding_applications: all access must pass through verified Netlify Functions
-- that validate Firebase ID tokens and enforce tenant isolation server-side.
