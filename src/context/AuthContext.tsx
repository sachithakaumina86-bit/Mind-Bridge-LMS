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

  const refreshBackendSession = useCallback(async (): Promise<VerifiedSessionProfile | null> => {
    const token = await getIdToken(true);
    if (!token) {
      setVerifiedProfile(null);
      return null;
    }

    const endpoint = resolveBackendEndpoint('/verify-session');
    if (!endpoint) {
      setVerifiedProfile(null);
      return null;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // Expired or revoked session: clear verified profile
        setVerifiedProfile(null);
        setSessionError('Your session has expired. Please sign in again.');
        return null;
      }

      if (!response.ok) {
        setVerifiedProfile(null);
        return null;
      }

      const data = (await response.json()) as { session?: VerifiedSessionProfile };
      const profile = data.session ?? null;
      setVerifiedProfile(profile);
      setSessionError(null);
      return profile;
    } catch {
      setVerifiedProfile(null);
      return null;
    }
  }, [getIdToken]);

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
