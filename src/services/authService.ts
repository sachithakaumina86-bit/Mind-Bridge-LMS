/**
 * MindBridge LMS — Stage 03 Authentication & Backend Integration Service
 *
 * Architectural Rules:
 * 1. Firebase Authentication establishes user identity via real Firebase Web SDK calls
 *    when VITE_FIREBASE_* credentials are present.
 * 2. Supabase PostgreSQL (via Netlify Functions at VITE_API_BASE_URL) is the
 *    authoritative system of record for user profiles, roles, tenant memberships,
 *    and teacher/institute onboarding applications.
 * 3. No fake authentication, no simulated success, no localStorage password/role trust,
 *    and no client-side role authorization are permitted.
 */

import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirebaseAuth } from '../lib/firebase';

export type LoginRoleTab = 'student' | 'teacher' | 'admin' | 'super_admin';

export interface LoginPayload {
  identifier: string;
  password: string;
  roleHint: LoginRoleTab;
  rememberDevice: boolean;
}

export interface SuperAdminLoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface StudentRegistrationPayload {
  fullName: string;
  email: string;
  mobile: string;
  academicStream: string;
  preferredLanguage: 'en' | 'si' | 'ta';
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
  whatsappOptIn: boolean;
  sinhalaName?: string;
  nicOrBirthCert?: string;
  schoolAndDistrict?: string;
  targetExamYear?: string;
  targetUniversity?: string;
  guardianName?: string;
  guardianWhatsApp?: string;
}

export interface OnboardingDocumentItem {
  id: string;
  name: string;
  sizeLabel: string;
  statusLabel: string;
  file?: File;
}

export interface TeacherOnboardingPayload {
  tenantType: 'individual' | 'institute';
  academyName: string;
  subdomain: string;
  subjects: string[];
  contactPerson: string;
  nicOrBr: string;
  whatsapp: string;
  documents: OnboardingDocumentItem[];
}

export interface AuthServiceResult {
  ok: boolean;
  code:
    | 'FIREBASE_NOT_CONFIGURED'
    | 'BACKEND_API_NOT_CONFIGURED'
    | 'VALIDATION_ERROR'
    | 'AUTH_ERROR'
    | 'FORBIDDEN'
    | 'NETWORK_ERROR'
    | 'SUCCESS';
  message: string;
  details?: string;
  data?: Record<string, unknown>;
}

export interface BackendApiConfig {
  /** True only when a non-empty VITE_API_BASE_URL has been explicitly supplied. */
  configured: boolean;
  /** Trimmed base URL without trailing slash, or null when optional/unset in frontend development. */
  baseUrl: string | null;
  /** Target backend architecture: Netlify Functions + Supabase PostgreSQL. */
  architecture: 'netlify-functions';
}

export interface FirebaseConfigStatus {
  configured: boolean;
  missingKeys: string[];
  backendConfigured: boolean;
  backendApi: BackendApiConfig;
}

/**
 * Safely reads the optional VITE_API_BASE_URL environment variable.
 * Never throws when unset during frontend development and never invents a fake URL.
 */
export function getBackendApiConfig(): BackendApiConfig {
  const raw = import.meta.env?.VITE_API_BASE_URL;
  const trimmed = typeof raw === 'string' ? raw.trim().replace(/\/+$/, '') : '';
  return {
    configured: trimmed.length > 0,
    baseUrl: trimmed.length > 0 ? trimmed : null,
    architecture: 'netlify-functions',
  };
}

/**
 * Builds a Netlify Functions compatible endpoint URL only when VITE_API_BASE_URL is configured.
 * Returns null when the backend is not yet deployed so callers can handle it gracefully.
 */
export function resolveBackendEndpoint(path: string): string | null {
  const { configured, baseUrl } = getBackendApiConfig();
  if (!configured || !baseUrl) {
    return null;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function logBackendRequestDiagnostics(details: {
  label: string;
  endpoint: string | null;
  method: string;
  headers: Record<string, string>;
  body: unknown;
  status?: number;
  error?: unknown;
}): void {
  if (typeof process === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }

  const sanitizedHeaders = {
    ...details.headers,
    ...(details.headers.Authorization
      ? {
          Authorization: `Bearer <redacted len=${Math.max(0, details.headers.Authorization.length - 7)}>`,
        }
      : {}),
  };

  console.group(`[authService] ${details.label} diagnostics`);
  console.log('VITE_API_BASE_URL:', import.meta.env?.VITE_API_BASE_URL ?? '<unset>');
  console.log('Resolved endpoint:', details.endpoint ?? '<null>');
  console.log(
    'Window origin:',
    typeof window !== 'undefined' ? window.location.origin : '<non-browser>'
  );
  console.log('Method:', details.method);
  console.log('Headers:', sanitizedHeaders);
  console.log('Request body:', details.body ?? '<none>');
  if (details.status !== undefined) {
    console.log('Response status:', details.status);
  }
  if (details.error !== undefined) {
    console.warn('Fetch error:', details.error);
  }
  console.groupEnd();
}

export function getAuthIntegrationStatus(): FirebaseConfigStatus {
  const env = import.meta.env;
  const requiredFirebaseKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID',
  ] as const;

  const missingKeys = requiredFirebaseKeys.filter(
    (key) => !env[key] || String(env[key]).trim() === ''
  );

  const backendApi = getBackendApiConfig();

  return {
    configured: missingKeys.length === 0,
    missingKeys: [...missingKeys],
    backendConfigured: backendApi.configured,
    backendApi,
  };
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateSriLankanMobile(mobile: string): boolean {
  const digits = mobile.replace(/\D/g, '');
  return /^(?:7\d{8}|07\d{8}|947\d{8})$/.test(digits);
}

export function evaluatePasswordStrength(password: string) {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const score = [hasMinLength, hasNumber, hasUppercase, hasSymbol].filter(Boolean).length;

  return {
    hasMinLength,
    hasNumber,
    hasUppercase,
    hasSymbol,
    score,
    isStrong: score === 4,
  };
}

export function validateSubdomain(subdomain: string): boolean {
  return /^[a-z0-9](?:[a-z0-9-]{1,30}[a-z0-9])?$/.test(subdomain.trim().toLowerCase());
}

function mapFirebaseAuthError(err: unknown): string {
  const code =
    typeof err === 'object' && err !== null && 'code' in err
      ? String((err as { code?: unknown }).code)
      : '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email address or password.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 8 characters with uppercase, numbers, and symbols.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error while contacting Firebase Authentication.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not enabled in the Firebase Console.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Authentication settings.';
    case 'auth/invalid-api-key':
    case 'auth/app-not-authorized':
    case 'auth/configuration-not-found':
      return 'Firebase Authentication configuration is invalid or incomplete. Please check your VITE_FIREBASE_* settings.';
    default:
      if (code) {
        return `Authentication failed (${code}). Please check your credentials and try again.`;
      }
      return 'Authentication failed. Please check your credentials and try again.';
  }
}

export async function signInWithCredentials(payload: LoginPayload): Promise<AuthServiceResult> {
  if (!payload.identifier.trim() || !payload.password) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Please enter both your email and password.',
    };
  }

  if (!validateEmail(payload.identifier)) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Please sign in using your registered email address.',
    };
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    const status = getAuthIntegrationStatus();
    return {
      ok: false,
      code: 'FIREBASE_NOT_CONFIGURED',
      message:
        'Live Firebase Authentication is not yet connected. Supply real VITE_FIREBASE_* credentials in the environment to enable sign-in.',
      details: `Missing configuration keys: ${status.missingKeys.join(', ')}.`,
    };
  }

  try {
    await setPersistence(
      auth,
      payload.rememberDevice ? browserLocalPersistence : browserSessionPersistence
    );
    const credential = await signInWithEmailAndPassword(
      auth,
      payload.identifier.trim(),
      payload.password
    );
    const idToken = await credential.user.getIdToken(true);

    const endpoint = resolveBackendEndpoint('/verify-session');
    if (!endpoint) {
      return {
        ok: false,
        code: 'BACKEND_API_NOT_CONFIGURED',
        message:
          'Firebase identity verified, but the Netlify Functions backend (VITE_API_BASE_URL) is not yet deployed to resolve authoritative roles and tenant memberships.',
      };
    }

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    };
    logBackendRequestDiagnostics({
      label: '/verify-session',
      endpoint,
      method: 'POST',
      headers: requestHeaders,
      body: null,
    });

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: requestHeaders,
      });
    } catch (fetchErr) {
      logBackendRequestDiagnostics({
        label: '/verify-session',
        endpoint,
        method: 'POST',
        headers: requestHeaders,
        body: null,
        error: fetchErr,
      });
      return {
        ok: false,
        code: 'NETWORK_ERROR',
        message: 'Could not reach the backend API to verify your session.',
        details: 'Verify that VITE_API_BASE_URL is reachable and allows requests from this origin.',
      };
    }

    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
      session?: Record<string, unknown>;
    };

    if (!response.ok) {
      return {
        ok: false,
        code: response.status === 403 ? 'FORBIDDEN' : 'AUTH_ERROR',
        message: body.error || 'Backend session verification failed.',
      };
    }

    return {
      ok: true,
      code: 'SUCCESS',
      message: 'Session verified.',
      data: body.session,
    };
  } catch (err) {
    return {
      ok: false,
      code: 'AUTH_ERROR',
      message: mapFirebaseAuthError(err),
    };
  }
}

/**
 * Dedicated Super Admin Authentication Boundary.
 * Accepts email/password only. Never trusts frontend role selection or localStorage.
 * Requires live Firebase Authentication + server-side Netlify Function verification
 * against the authoritative Supabase `super_admin` role record.
 */
export async function signInSuperAdminWithCredentials(
  payload: SuperAdminLoginPayload
): Promise<AuthServiceResult> {
  if (!validateEmail(payload.email) || !payload.password) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Please enter a valid Super Admin email address and password.',
    };
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    const status = getAuthIntegrationStatus();
    return {
      ok: false,
      code: 'FIREBASE_NOT_CONFIGURED',
      message:
        'Super Admin login requires live Firebase Authentication (VITE_FIREBASE_*) and server-side role verification.',
      details: `Missing Firebase configuration keys: ${status.missingKeys.join(', ')}.`,
    };
  }

  const verifyEndpoint = resolveBackendEndpoint('/verify-super-admin');
  if (!verifyEndpoint) {
    return {
      ok: false,
      code: 'BACKEND_API_NOT_CONFIGURED',
      message:
        'Super Admin authorization requires the deployed Netlify Functions backend (VITE_API_BASE_URL) to verify the Firebase UID against the authoritative Supabase super_admin record.',
      details:
        'Frontend-only or localStorage-based Super Admin authorization is strictly prohibited.',
    };
  }

  try {
    await setPersistence(auth, browserSessionPersistence);
    const credential = await signInWithEmailAndPassword(
      auth,
      payload.email.trim(),
      payload.password
    );
    const idToken = await credential.user.getIdToken(true);

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    };
    logBackendRequestDiagnostics({
      label: '/verify-super-admin',
      endpoint: verifyEndpoint,
      method: 'POST',
      headers: requestHeaders,
      body: null,
    });

    let response: Response;
    try {
      response = await fetch(verifyEndpoint, {
        method: 'POST',
        headers: requestHeaders,
      });
    } catch (fetchErr) {
      logBackendRequestDiagnostics({
        label: '/verify-super-admin',
        endpoint: verifyEndpoint,
        method: 'POST',
        headers: requestHeaders,
        body: null,
        error: fetchErr,
      });
      await signOut(auth);
      return {
        ok: false,
        code: 'NETWORK_ERROR',
        message: 'Could not reach the backend API to verify Super Admin authorization.',
        details: 'Verify that VITE_API_BASE_URL is reachable and allows requests from this origin.',
      };
    }

    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
      session?: Record<string, unknown>;
    };

    if (!response.ok) {
      await signOut(auth);
      return {
        ok: false,
        code: response.status === 403 ? 'FORBIDDEN' : 'AUTH_ERROR',
        message: body.error || 'Super Admin authorization denied.',
      };
    }

    return {
      ok: true,
      code: 'SUCCESS',
      message: 'Super Admin session verified.',
      data: body.session,
    };
  } catch (err) {
    return {
      ok: false,
      code: 'AUTH_ERROR',
      message: mapFirebaseAuthError(err),
    };
  }
}

export async function requestPasswordReset(
  payload: ForgotPasswordPayload
): Promise<AuthServiceResult> {
  if (!validateEmail(payload.email)) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Please enter a valid registered email address.',
    };
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    const status = getAuthIntegrationStatus();
    return {
      ok: false,
      code: 'FIREBASE_NOT_CONFIGURED',
      message:
        'Password reset requires live Firebase Authentication configuration (VITE_FIREBASE_*).',
      details: `Missing configuration keys: ${status.missingKeys.join(', ')}.`,
    };
  }

  try {
    await sendPasswordResetEmail(auth, payload.email.trim());
    return {
      ok: true,
      code: 'SUCCESS',
      message: 'If an account exists for that email, a password reset link has been sent.',
    };
  } catch (err) {
    return {
      ok: false,
      code: 'AUTH_ERROR',
      message: mapFirebaseAuthError(err),
    };
  }
}

export async function registerUniversalStudent(
  payload: StudentRegistrationPayload
): Promise<AuthServiceResult> {
  if (!payload.fullName.trim()) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Full name is required.' };
  }
  if (!validateEmail(payload.email)) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'A valid email address is required.' };
  }
  const strength = evaluatePasswordStrength(payload.password);
  if (!strength.isStrong) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Password must meet all 4 security criteria.',
    };
  }
  if (payload.password !== payload.confirmPassword) {
    return { ok: false, code: 'VALIDATION_ERROR', message: 'Passwords do not match.' };
  }
  if (!payload.acceptedTerms) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'You must agree to the MindBridge Terms of Service & PDPA Privacy Policy.',
    };
  }

  const auth = getFirebaseAuth();
  if (!auth) {
    return {
      ok: false,
      code: 'FIREBASE_NOT_CONFIGURED',
      message:
        'Universal Student Registration requires live Firebase Authentication (VITE_FIREBASE_*) and Supabase backend sync (VITE_API_BASE_URL).',
    };
  }

  const endpoint = resolveBackendEndpoint('/register-student');
  if (!endpoint) {
    return {
      ok: false,
      code: 'BACKEND_API_NOT_CONFIGURED',
      message:
        'The Netlify Functions backend (VITE_API_BASE_URL) must be deployed to persist the global student profile in Supabase PostgreSQL.',
    };
  }

  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      payload.email.trim(),
      payload.password
    );
    const idToken = await credential.user.getIdToken(true);

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fullName: payload.fullName.trim(),
          mobile: payload.mobile.trim(),
          academicStream: payload.academicStream,
          preferredLanguage: payload.preferredLanguage,
          whatsappOptIn: payload.whatsappOptIn,
        }),
      });
    } catch {
      return {
        ok: false,
        code: 'NETWORK_ERROR',
        message: 'Firebase account created, but could not reach the backend API to save your student profile.',
        details: 'Verify that VITE_API_BASE_URL is reachable and allows requests from this origin.',
      };
    }

    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
      user?: Record<string, unknown>;
    };

    if (!response.ok) {
      return {
        ok: false,
        code: 'AUTH_ERROR',
        message: body.error || 'Failed to persist student profile on the backend.',
      };
    }

    return {
      ok: true,
      code: 'SUCCESS',
      message: 'Global student account registered.',
      data: body.user,
    };
  } catch (err) {
    return {
      ok: false,
      code: 'AUTH_ERROR',
      message: mapFirebaseAuthError(err),
    };
  }
}

export async function submitTeacherOnboardingApplication(
  payload: TeacherOnboardingPayload
): Promise<AuthServiceResult> {
  if (!payload.academyName.trim() || !validateSubdomain(payload.subdomain)) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Please provide a valid Academy Name and Subdomain.',
    };
  }
  if (!payload.contactPerson.trim() || !payload.nicOrBr.trim()) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Official contact person and NIC/BR number are required.',
    };
  }

  const endpoint = resolveBackendEndpoint('/submit-onboarding');
  if (!endpoint) {
    return {
      ok: false,
      code: 'BACKEND_API_NOT_CONFIGURED',
      message:
        'Teacher/Institute Onboarding submission requires the deployed Netlify Functions backend (VITE_API_BASE_URL) backed by Supabase PostgreSQL.',
      details:
        'Applications are persisted with status "pending_review" for Super Admin approval or rejection. No tenant workspace is created prior to Super Admin clearance.',
    };
  }

  const auth = getFirebaseAuth();
  const currentUser = auth?.currentUser;
  if (!currentUser) {
    return {
      ok: false,
      code: 'AUTH_ERROR',
      message: 'Please sign in with your Firebase account before submitting an onboarding application.',
    };
  }

  try {
    const idToken = await currentUser.getIdToken(true);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        tenantType: payload.tenantType,
        academyName: payload.academyName.trim(),
        subdomain: payload.subdomain.trim().toLowerCase(),
        subjects: payload.subjects,
        contactPerson: payload.contactPerson.trim(),
        nicOrBr: payload.nicOrBr.trim(),
        whatsapp: payload.whatsapp.trim(),
        documents: payload.documents.map(({ id, name, sizeLabel, statusLabel }) => ({
          id,
          name,
          sizeLabel,
          statusLabel,
        })),
      }),
    });

    const body = (await response.json().catch(() => ({}))) as {
      error?: string;
      application?: Record<string, unknown>;
    };

    if (!response.ok) {
      return {
        ok: false,
        code: 'AUTH_ERROR',
        message: body.error || 'Failed to submit onboarding application.',
      };
    }

    return {
      ok: true,
      code: 'SUCCESS',
      message: 'Onboarding application submitted for Super Admin review.',
      data: body.application,
    };
  } catch {
    return {
      ok: false,
      code: 'NETWORK_ERROR',
      message: 'Network error while submitting onboarding application.',
    };
  }
}
