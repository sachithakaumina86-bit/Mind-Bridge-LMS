import type { VerifiedSessionProfile, VerifiedTenantMembership } from '../../context/AuthContext';

export type StudentNavPath =
  | 'overview'
  | 'courses'
  | 'live-classes'
  | 'assignments'
  | 'quizzes'
  | 'doubt-solver'
  | 'billing'
  | 'certificates'
  | 'profile';

export interface StudentPortalCommonProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: 'en' | 'si';
  onToggleLang: (lang: 'en' | 'si') => void;
  profile: VerifiedSessionProfile;
  activeTenant: VerifiedTenantMembership | null;
  onSelectTenant: (tenantId: string) => void;
  activeNav: StudentNavPath;
  onSelectNav: (path: StudentNavPath, label: string) => void;
  onActionNotice: (label: string) => void;
  onSignOut: () => Promise<void>;
  onNavigate: (path: string) => void;
}
