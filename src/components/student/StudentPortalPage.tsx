import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StudentEmptyHub } from './StudentEmptyHub';
import { StudentMultiAcademyHub } from './StudentMultiAcademyHub';
import { StudentPortalShell } from './StudentPortalShell';
import type { StudentNavPath } from './types';

interface StudentPortalPageProps {
  route: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: 'en' | 'si';
  onToggleLang: (lang: 'en' | 'si') => void;
  onNavigate: (path: string) => void;
  onActionNotice: (label: string) => void;
}

export const StudentPortalPage: React.FC<StudentPortalPageProps> = ({
  route,
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  onNavigate,
  onActionNotice,
}) => {
  const { verifiedProfile, isLoading, isFirebaseReady, sessionError, signOut } = useAuth();
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<StudentNavPath>('overview');

  const isDark = theme === 'dark';

  const activeTenant = useMemo(() => {
    if (!verifiedProfile || verifiedProfile.memberships.length === 0) return null;
    if (selectedTenantId) {
      const found = verifiedProfile.memberships.find((m) => m.tenantId === selectedTenantId);
      if (found) return found;
    }
    return verifiedProfile.memberships[0];
  }, [verifiedProfile, selectedTenantId]);

  const handleSignOut = async () => {
    await signOut();
    onNavigate('/login');
  };

  const handleSelectNav = (path: StudentNavPath, label: string) => {
    if (path === 'overview') {
      setActiveNav('overview');
      return;
    }
    onActionNotice(label);
  };

  // Loading state while AuthContext verifies Firebase + backend session
  if (isLoading) {
    return (
      <div
        className={
          isDark
            ? 'min-h-screen bg-[#080e1d] text-[#f1f5f9] flex items-center justify-center p-6'
            : 'min-h-screen bg-[#faf8ff] text-[#101b34] flex items-center justify-center p-6'
        }
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#3898ff] border-t-transparent animate-spin" />
          <p className="text-sm font-medium opacity-80">Verifying authenticated student session...</p>
        </div>
      </div>
    );
  }

  // Backend-authoritative session gate: never grant access without verifiedProfile
  if (!verifiedProfile) {
    return (
      <div
        className={
          isDark
            ? 'min-h-screen bg-[#080e1d] text-[#f1f5f9] flex items-center justify-center p-6'
            : 'min-h-screen bg-[#faf8ff] text-[#101b34] flex items-center justify-center p-6'
        }
      >
        <div
          className={
            isDark
              ? 'max-w-md w-full bg-[#151b2b] border border-[#1f283d] rounded-2xl p-8 text-center shadow-xl space-y-4'
              : 'max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-md space-y-4'
          }
        >
          <div
            className={
              isDark
                ? 'w-14 h-14 mx-auto rounded-2xl bg-[#3898ff]/15 text-[#3898ff] flex items-center justify-center'
                : 'w-14 h-14 mx-auto rounded-2xl bg-[#d7e3ff] text-[#005ab6] flex items-center justify-center'
            }
          >
            <span className="material-symbols-outlined text-[30px]">lock</span>
          </div>
          <h1 className="font-display-jakarta text-[20px] font-bold">
            Student Authentication Required
          </h1>
          <p className={isDark ? 'text-[13px] text-[#94a3b8]' : 'text-[13px] text-[#414754]'}>
            {sessionError
              ? sessionError
              : !isFirebaseReady
                ? 'Firebase Authentication is not configured in this environment. Sign-in and backend session verification are required to access the Student Portal.'
                : 'Please sign in with your verified MindBridge student account to access your learning hub.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/login')}
              className={
                isDark
                  ? 'flex-1 py-2.5 px-4 rounded-lg bg-[#3898ff] hover:bg-[#3898ff]/90 text-white text-sm font-semibold transition-colors'
                  : 'flex-1 py-2.5 px-4 rounded-lg bg-[#005ab6] hover:bg-[#0072e4] text-white text-sm font-semibold transition-colors'
              }
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/register/student')}
              className={
                isDark
                  ? 'flex-1 py-2.5 px-4 rounded-lg bg-[#1e2638] hover:bg-[#242e44] border border-[#1f283d] text-[#f1f5f9] text-sm font-semibold transition-colors'
                  : 'flex-1 py-2.5 px-4 rounded-lg bg-[#eaedff] hover:bg-[#e1e7ff] text-[#101b34] text-sm font-semibold transition-colors'
              }
            >
              Register Student
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Screen 2: Student Empty Hub when explicitly requested or when verified memberships === 0
  const showEmptyHub =
    route === '/student/empty-hub' || verifiedProfile.memberships.length === 0;

  if (showEmptyHub) {
    return (
      <StudentEmptyHub
        theme={theme}
        onToggleTheme={onToggleTheme}
        profile={verifiedProfile}
        onActionNotice={onActionNotice}
        onSignOut={handleSignOut}
        onNavigate={onNavigate}
      />
    );
  }

  // Screen 1: Universal Student Portal / Multi-Academy Hub inside shared StudentPortalShell
  const commonProps = {
    theme,
    onToggleTheme,
    lang,
    onToggleLang,
    profile: verifiedProfile,
    activeTenant,
    onSelectTenant: setSelectedTenantId,
    activeNav,
    onSelectNav: handleSelectNav,
    onActionNotice,
    onSignOut: handleSignOut,
    onNavigate,
  };

  return (
    <StudentPortalShell {...commonProps}>
      <StudentMultiAcademyHub {...commonProps} />
    </StudentPortalShell>
  );
};
