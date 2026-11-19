import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
import { getFirebaseAuth } from '../lib/firebase';
import { resolveBackendEndpoint } from '../services/authService';

export interface VerifiedTenantMembership {
  tenantId: string;
  tenantName: string;
  subdomain: string;
  role: string;
  status: string;
}

export interface VerifiedSessionProfile {
  userId: string;
  firebaseUid: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  memberships: VerifiedTenantMembership[];
}

export interface AuthContextValue {
  firebaseUser: User | null;
  verifiedProfile: VerifiedSessionProfile | null;
  isLoading: boolean;
  isFirebaseReady: boolean;
  sessionError: string | null;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  refreshBackendSession: () => Promise<VerifiedSessionProfile | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [verifiedProfile, setVerifiedProfile] = useState<VerifiedSessionProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const getIdToken = useCallback(async (forceRefresh = false): Promise<string | null> => {
    const auth = getFirebaseAuth();
    const currentUser = auth?.currentUser;
    if (!currentUser) return null;
    try {
      return await currentUser.getIdToken(forceRefresh);
    } catch {
      return null;
    }
  }, []);

  const logVerifySessionDiagnostics = useCallback(
    (details: {
      viteApiBaseUrl: string | undefined;
      endpoint: string | null;
      origin: string;
      method: string;
      headers: Record<string, string>;
      body: string | null;
      status?: number;
      error?: unknown;
    }) => {
      const sanitizedHeaders = {
        ...details.headers,
        ...(details.headers.Authorization
          ? {
              Authorization: `Bearer <redacted len=${Math.max(0, details.headers.Authorization.length - 7)}>`,
            }
          : {}),
      };

      console.group('[AuthContext] /verify-session diagnostics');
      console.log('VITE_API_BASE_URL:', details.viteApiBaseUrl ?? '<unset>');
      console.log('Resolved endpoint:', details.endpoint ?? '<null>');
      console.log('Window origin:', details.origin);
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
    },
    []
  );

  const refreshBackendSession = useCallback(async (): Promise<VerifiedSessionProfile | null> => {
    const token = await getIdToken(true);
    if (!token) {
      setVerifiedProfile(null);
      return null;
    }

    const viteApiBaseUrl = import.meta.env?.VITE_API_BASE_URL;
    const endpoint = resolveBackendEndpoint('/verify-session');
    const origin = typeof window !== 'undefined' ? window.location.origin : '<non-browser>';
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    if (!endpoint) {
      logVerifySessionDiagnostics({
        viteApiBaseUrl,
        endpoint,
        origin,
        method: 'POST',
        headers,
        body: null,
      });
      setVerifiedProfile(null);
      return null;
    }

    try {
      logVerifySessionDiagnostics({
        viteApiBaseUrl,
        endpoint,
        origin,
        method: 'POST',
        headers,
        body: null,
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
      });

      if (response.status === 401) {
        // Expired or revoked session: clear verified profile
        logVerifySessionDiagnostics({
          viteApiBaseUrl,
          endpoint,
          origin,
          method: 'POST',
          headers,
          body: null,
          status: response.status,
        });
        setVerifiedProfile(null);
        setSessionError('Your session has expired. Please sign in again.');
        return null;
      }

      if (!response.ok) {
        logVerifySessionDiagnostics({
          viteApiBaseUrl,
          endpoint,
          origin,
          method: 'POST',
          headers,
          body: null,
          status: response.status,
        });
        setVerifiedProfile(null);
        return null;
      }

      const data = (await response.json()) as { session?: VerifiedSessionProfile };
      const profile = data.session ?? null;
      setVerifiedProfile(profile);
      setSessionError(null);
      return profile;
    } catch (error) {
      logVerifySessionDiagnostics({
        viteApiBaseUrl,
        endpoint,
        origin,
        method: 'POST',
        headers,
        body: null,
        error,
      });
      setVerifiedProfile(null);
      setSessionError(
        'Unable to reach the backend session verification service. Please verify VITE_API_BASE_URL and CORS ALLOWED_ORIGIN.'
      );
      return null;
    }
  }, [getIdToken, logVerifySessionDiagnostics]);

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (auth) {
      await firebaseSignOut(auth);
    }
    setFirebaseUser(null);
    setVerifiedProfile(null);
    setSessionError(null);
  }, []);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setIsFirebaseReady(false);
      setIsLoading(false);
      return;
    }

    setIsFirebaseReady(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (!user) {
        setVerifiedProfile(null);
        setSessionError(null);
        setIsLoading(false);
        return;
      }

      await refreshBackendSession();
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [refreshBackendSession]);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        verifiedProfile,
        isLoading,
        isFirebaseReady,
        sessionError,
        getIdToken,
        refreshBackendSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
