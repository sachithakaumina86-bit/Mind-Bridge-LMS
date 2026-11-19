import React, { useState, useRef, useEffect } from 'react';
import type { StudentNavPath, StudentPortalCommonProps } from './types';

interface StudentPortalShellProps extends StudentPortalCommonProps {
  children: React.ReactNode;
}

const MINDBRIDGE_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrA7_rZ3ABV6yE4doz6kFiRiGfPGv2xtF9lnpJ7hdRh3BipsZ2ijO2rKVq3ub9uFm-dmD7EgE-7J7KtIU1J0kTkgZUsqVQ2mnW5PDeu2KCXBxOv6XCTmabZtAEzg_BGR_BTdAnHkxI_rrb1nS7k2-lISNQ4RaPqGS2xvXDnfCU1DNqQvh9ECrQheZJ0pGOPEYE2mZbGuHTdhrEfu48ynixn_w20CE4mqMB3iXCK-bs5H4RtkXF2vJiNDDQ';

const DESKTOP_NAV_ITEMS: Array<{
  path: StudentNavPath;
  label: string;
  icon: string;
  badge?: { text: string; variant: 'live' | 'gemini' };
}> = [
  { path: 'overview', label: 'Overview / My Learning Hub', icon: 'grid_view' },
  { path: 'courses', label: 'My Enrolled Courses', icon: 'school' },
  {
    path: 'live-classes',
    label: 'Live Virtual Classes',
    icon: 'podium',
    badge: { text: 'LIVE', variant: 'live' },
  },
  { path: 'assignments', label: 'Assignments & Homework', icon: 'assignment' },
  { path: 'quizzes', label: 'Quizzes & Mock Exams', icon: 'quiz' },
  {
    path: 'doubt-solver',
    label: 'Doubt Solver',
    icon: 'smart_toy',
    badge: { text: 'Gemini', variant: 'gemini' },
  },
  { path: 'billing', label: 'Bank Slips & Receipts', icon: 'receipt_long' },
  { path: 'certificates', label: 'Certificates & Badges', icon: 'workspace_premium' },
  { path: 'profile', label: 'Profile & Preferences', icon: 'tune' },
];

const MOBILE_LIGHT_NAV: Array<{ path: StudentNavPath; label: string; icon: string }> = [
  { path: 'overview', label: 'Hub', icon: 'dashboard' },
  { path: 'courses', label: 'Courses', icon: 'menu_book' },
  { path: 'quizzes', label: 'Exams', icon: 'timer' },
  { path: 'assignments', label: 'Tasks', icon: 'assignment' },
  { path: 'profile', label: 'Grades', icon: 'insights' },
];

const MOBILE_DARK_NAV: Array<{ path: StudentNavPath; label: string; icon: string }> = [
  { path: 'overview', label: 'Hub', icon: 'home' },
  { path: 'doubt-solver', label: 'AI Tutor', icon: 'smart_toy' },
  { path: 'courses', label: 'Courses', icon: 'menu_book' },
  { path: 'quizzes', label: 'Exams', icon: 'assignment' },
  { path: 'profile', label: 'Profile', icon: 'account_circle' },
];

export const StudentPortalShell: React.FC<StudentPortalShellProps> = ({
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  profile,
  activeTenant,
  onSelectTenant,
  activeNav,
  onSelectNav,
  onActionNotice,
  onSignOut,
  children,
}) => {
  const [academyMenuOpen, setAcademyMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const academyDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        academyDropdownRef.current &&
        !academyDropdownRef.current.contains(event.target as Node)
      ) {
        setAcademyMenuOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isDark = theme === 'dark';
  const activeTenantName = activeTenant?.tenantName ?? 'No Active Academy';
  const activeTenantDomain = activeTenant?.subdomain
    ? `${activeTenant.subdomain}.mindbridge.lk`
    : 'mindbridge.lk';
  const mobileNavItems = isDark ? MOBILE_DARK_NAV : MOBILE_LIGHT_NAV;

  return (
    <div
      className={
        isDark
          ? 'min-h-screen bg-[#080e1d] text-[#f1f5f9] font-display-jakarta antialiased'
          : 'min-h-screen bg-[#faf8ff] text-[#101b34] font-inter antialiased'
      }
    >
      {/* ===================== DESKTOP HEADER (lg+) ===================== */}
      <header
        className={
          isDark
            ? 'hidden lg:block fixed top-0 left-0 right-0 z-50 bg-[#0d1322]/95 backdrop-blur-xl border-b border-[#1f283d] shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
            : 'hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(7,27,74,0.06)]'
        }
      >
        <div className="h-20 w-full px-8 flex items-center justify-between gap-6">
          {/* Left: Brand + Multi-Academy Switcher */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img
                alt="MindBridge LMS Education Logo"
                className="h-8 w-auto object-contain"
                src={MINDBRIDGE_LOGO_URL}
              />
              <div className="flex flex-col">
                <span className="font-display-jakarta text-[16px] font-semibold leading-tight tracking-tight">
                  MindBridge{' '}
                  <span className={isDark ? 'text-[#3898ff] font-bold' : 'text-[#005ab6]'}>
                    LMS
                  </span>
                </span>
                <span
                  className={
                    isDark
                      ? 'text-[10px] text-[#94a3b8] font-medium'
                      : 'text-[11px] text-[#414754] font-medium'
                  }
                >
                  Learn • Manage • Achieve
                </span>
              </div>
            </div>

            <div
              className={
                isDark ? 'h-8 w-[1px] bg-[#1f283d] mx-1' : 'h-8 w-[1px] bg-[#d9e2ff] mx-1'
              }
            />

            {/* Multi-Academy Switcher */}
            <div className="relative" ref={academyDropdownRef}>
              <button
                type="button"
                onClick={() => setAcademyMenuOpen((prev) => !prev)}
                className={
                  isDark
                    ? 'flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#151b2b] border border-[#1f283d] hover:bg-[#1e2638] transition-all text-left'
                    : 'flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-all text-left'
                }
              >
                <div
                  className={
                    isDark
                      ? 'w-7 h-7 rounded-lg bg-[#3898ff]/20 text-[#3898ff] border border-[#3898ff]/30 flex items-center justify-center'
                      : 'w-7 h-7 rounded-lg bg-[#0072e4] text-white flex items-center justify-center'
                  }
                >
                  <span className="material-symbols-outlined text-[18px]">domain</span>
                </div>
                <div className="flex flex-col">
                  <span
                    className={
                      isDark
                        ? 'text-[10px] text-[#3898ff] font-semibold uppercase tracking-wider'
                        : 'text-[11px] text-[#005ab6] font-semibold uppercase tracking-wider'
                    }
                  >
                    Active Academy
                  </span>
                  <span className="text-[14px] font-semibold flex items-center gap-1">
                    <span className="truncate max-w-[220px]">{activeTenantName}</span>
                    <span className="material-symbols-outlined text-[18px] opacity-70">
                      expand_more
                    </span>
                  </span>
                </div>
              </button>

              {academyMenuOpen && (
                <div
                  className={
                    isDark
                      ? 'absolute left-0 mt-2 w-72 rounded-xl bg-[#151b2b] border border-[#1f283d] shadow-2xl p-2 z-50'
                      : 'absolute left-0 mt-2 w-72 rounded-xl bg-white border border-[#c1c6d6]/50 shadow-xl p-2 z-50'
                  }
                >
                  <div
                    className={
                      isDark
                        ? 'px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#94a3b8] font-bold'
                        : 'px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#717785] font-semibold'
                    }
                  >
                    Verified Enrolled Academies ({profile.memberships.length})
                  </div>
                  {profile.memberships.length === 0 ? (
                    <div className="px-3 py-2 text-xs opacity-75">
                      No active academy memberships found for this account.
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {profile.memberships.map((m) => {
                        const isSelected = activeTenant?.tenantId === m.tenantId;
                        return (
                          <button
                            key={m.tenantId}
                            type="button"
                            onClick={() => {
                              onSelectTenant(m.tenantId);
                              setAcademyMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                              isSelected
                                ? isDark
                                  ? 'bg-[#3898ff]/20 text-[#3898ff] font-semibold'
                                  : 'bg-[#d7e3ff] text-[#00458f] font-semibold'
                                : isDark
                                  ? 'hover:bg-[#1e2638] text-[#f1f5f9]'
                                  : 'hover:bg-[#eaedff] text-[#101b34]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="text-sm truncate">{m.tenantName}</div>
                              <div className="text-[11px] opacity-70 font-mono truncate">
                                {m.subdomain}.mindbridge.lk
                              </div>
                            </div>
                            {isSelected && (
                              <span className="material-symbols-outlined text-[18px] shrink-0">
                                check_circle
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Theme Toggle, Language Toggle, Notifications, Student Profile */}
          <div className="flex items-center gap-4">
            {/* Light/Dark Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Light/Dark Theme"
              className={
                isDark
                  ? 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151b2b] border border-[#1f283d] hover:bg-[#1e2638] text-[#f1f5f9] text-xs font-semibold transition-colors'
                  : 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#101b34] text-xs font-semibold transition-colors'
              }
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {/* EN / සිංහල Toggle */}
            <div
              className={
                isDark
                  ? 'flex items-center rounded-lg bg-[#151b2b] border border-[#1f283d] p-1'
                  : 'flex items-center rounded-lg bg-[#f2f3ff] p-1'
              }
            >
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${
                  lang === 'en'
                    ? isDark
                      ? 'bg-[#3898ff] text-white shadow-sm'
                      : 'bg-white text-[#005ab6] shadow-sm'
                    : isDark
                      ? 'text-[#94a3b8] hover:text-white'
                      : 'text-[#414754] hover:text-[#101b34]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('si')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  lang === 'si'
                    ? isDark
                      ? 'bg-[#3898ff] text-white shadow-sm font-bold'
                      : 'bg-white text-[#005ab6] shadow-sm font-bold'
                    : isDark
                      ? 'text-[#94a3b8] hover:text-white'
                      : 'text-[#414754] hover:text-[#101b34]'
                }`}
              >
                සිංහල
              </button>
            </div>

            {/* Notifications Button (Missing Screen -> Safe Notice) */}
            <button
              type="button"
              onClick={() => onActionNotice('Notifications Center')}
              aria-label="Notifications"
              className={
                isDark
                  ? 'relative p-2 rounded-lg text-[#94a3b8] hover:bg-[#1e2638] hover:text-white transition-all border border-[#1f283d]'
                  : 'relative p-2 rounded-lg text-[#414754] hover:bg-[#eaedff] hover:text-[#101b34] transition-all'
              }
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>

            <div className={isDark ? 'h-8 w-[1px] bg-[#1f283d]' : 'h-8 w-[1px] bg-[#d9e2ff]'} />

            {/* Authenticated Student Profile & Sign Out */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2.5 text-right"
              >
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold leading-tight">
                    {profile.fullName}
                  </span>
                  <span
                    className={
                      isDark
                        ? 'text-[10px] text-[#94a3b8] font-mono'
                        : 'text-[11px] text-[#414754]'
                    }
                  >
                    {profile.email}
                  </span>
                </div>
                <div
                  className={
                    isDark
                      ? 'w-8 h-8 rounded-full bg-[#3898ff]/20 border border-[#3898ff]/40 text-[#3898ff] flex items-center justify-center'
                      : 'w-8 h-8 rounded-full bg-[#005ab6] text-white flex items-center justify-center shadow-sm'
                  }
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
              </button>

              {profileMenuOpen && (
                <div
                  className={
                    isDark
                      ? 'absolute right-0 mt-2 w-56 rounded-xl bg-[#151b2b] border border-[#1f283d] shadow-2xl p-2 z-50'
                      : 'absolute right-0 mt-2 w-56 rounded-xl bg-white border border-[#c1c6d6]/50 shadow-xl p-2 z-50'
                  }
                >
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      onSelectNav('profile', 'Profile & Preferences');
                    }}
                    className={
                      isDark
                        ? 'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#f1f5f9] hover:bg-[#1e2638]'
                        : 'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#101b34] hover:bg-[#eaedff]'
                    }
                  >
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                    <span>Profile &amp; Preferences</span>
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setProfileMenuOpen(false);
                      await onSignOut();
                    }}
                    className={
                      isDark
                        ? 'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#ef4444] hover:bg-[#1e2638]'
                        : 'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#ba1a1a] hover:bg-[#ffdad6]/40'
                    }
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===================== DESKTOP SIDEBAR (lg+) ===================== */}
      <aside
        className={
          isDark
            ? 'hidden lg:flex fixed left-0 top-0 h-full w-72 bg-[#0d1322] border-r border-[#1f283d] z-40 flex-col pt-24 pb-6'
            : 'hidden lg:flex fixed left-0 top-0 h-full w-72 bg-white z-40 flex-col pt-24 pb-6 shadow-[0_1px_8px_rgba(7,27,74,0.04)]'
        }
      >
        {/* Enrolled Tenant Card */}
        <div className="px-6 pb-4">
          <div
            className={
              isDark
                ? 'p-3 rounded-lg bg-[#151b2b] border border-[#1f283d]'
                : 'p-3 rounded-lg bg-[#f2f3ff]'
            }
          >
            <div className="flex items-center justify-between">
              <span
                className={
                  isDark
                    ? 'text-[10px] text-[#94a3b8] font-medium uppercase tracking-wider'
                    : 'text-[11px] text-[#414754] font-medium'
                }
              >
                Enrolled Tenant
              </span>
              <span
                className={
                  isDark
                    ? 'w-2 h-2 rounded-full bg-[#3898ff] animate-pulse'
                    : 'w-2 h-2 rounded-full bg-[#005ab6]'
                }
              />
            </div>
            <div className="text-[14px] font-semibold truncate mt-1">{activeTenantName}</div>
            <div
              className={
                isDark
                  ? 'text-[10px] text-[#64748b] truncate mt-1 font-mono'
                  : 'text-[10px] text-[#717785] truncate mt-1 font-mono'
              }
            >
              {activeTenantDomain}
            </div>
          </div>
        </div>

        {/* 9-Item Primary Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
          {DESKTOP_NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.path;
            return (
              <button
                key={item.path}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelectNav(item.path, item.label)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all text-[14px] ${
                  isActive
                    ? isDark
                      ? 'bg-[#3898ff] text-white font-semibold shadow-sm'
                      : 'bg-[#0072e4] text-white font-semibold shadow-[0_1px_3px_rgba(7,27,74,0.04)]'
                    : isDark
                      ? 'text-[#94a3b8] hover:bg-[#151b2b] hover:text-[#f1f5f9]'
                      : 'text-[#414754] hover:bg-[#eaedff] hover:text-[#101b34]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      !isActive && item.path === 'doubt-solver'
                        ? isDark
                          ? 'text-[#3898ff]'
                          : 'text-[#005ab6]'
                        : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge?.variant === 'live' && (
                  <span
                    className={
                      isDark
                        ? 'px-1.5 py-0.5 rounded-full bg-[#ef4444] text-white text-[10px] font-bold uppercase tracking-wider animate-pulse shrink-0'
                        : 'px-1.5 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold uppercase tracking-wider animate-pulse shrink-0'
                    }
                  >
                    {item.badge.text}
                  </span>
                )}
                {item.badge?.variant === 'gemini' && (
                  <span
                    className={
                      isDark
                        ? 'px-1.5 py-0.5 rounded-full bg-[#3898ff]/20 text-[#3898ff] border border-[#3898ff]/30 text-[10px] font-bold shrink-0'
                        : 'px-1.5 py-0.5 rounded-full bg-[#d7e3ff] text-[#00458f] text-[10px] font-bold shrink-0'
                    }
                  >
                    {item.badge.text}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Universal Learner Pass Footer */}
        <div className="px-6 pt-3">
          <div
            className={
              isDark
                ? 'p-3 rounded-lg bg-[#151b2b] border border-[#1f283d] text-center'
                : 'p-3 rounded-lg bg-[#f2f3ff] text-center'
            }
          >
            <div
              className={
                isDark
                  ? 'flex items-center justify-center gap-1 text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1'
                  : 'flex items-center justify-center gap-1 text-[#717785] text-[11px] font-semibold mb-1'
              }
            >
              <span
                className={
                  isDark
                    ? 'material-symbols-outlined text-[14px] text-[#3898ff]'
                    : 'material-symbols-outlined text-[14px]'
                }
              >
                verified_user
              </span>
              <span>Universal Learner Pass</span>
            </div>
            <div
              className={
                isDark ? 'text-[10px] text-[#94a3b8]' : 'text-[10px] text-[#414754]'
              }
            >
              Session Verified • Tenant Isolated
            </div>
          </div>
        </div>
      </aside>

      {/* ===================== MOBILE HEADER (<lg) ===================== */}
      <header
        className={
          isDark
            ? 'lg:hidden fixed top-0 inset-x-0 z-50 bg-[#080e1d]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.25)]'
            : 'lg:hidden fixed top-0 inset-x-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(7,27,74,0.05)]'
        }
      >
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <img
              alt="MindBridge LMS Education Logo"
              className="h-8 w-auto object-contain shrink-0"
              src={MINDBRIDGE_LOGO_URL}
            />
            <div className="flex flex-col min-w-0">
              <span
                className={
                  isDark
                    ? 'font-display-jakarta text-[15px] font-bold text-[#3898ff] truncate leading-tight'
                    : 'font-display-jakarta text-[15px] font-semibold text-[#101b34] truncate leading-tight'
                }
              >
                {activeTenantName}
              </span>
              <span
                className={
                  isDark
                    ? 'text-[10px] text-[#c0c7d5] leading-tight truncate'
                    : 'text-[11px] text-[#414754] uppercase tracking-wider truncate'
                }
              >
                Student Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Light/Dark Theme"
              className={
                isDark
                  ? 'w-10 h-10 flex items-center justify-center rounded-lg text-[#c0c7d5] hover:bg-[#191f2f]'
                  : 'w-10 h-10 flex items-center justify-center rounded-full text-[#101b34] hover:bg-[#e1e7ff]'
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onActionNotice('Notifications Center')}
              aria-label="Notifications"
              className={
                isDark
                  ? 'w-10 h-10 flex items-center justify-center rounded-lg text-[#c0c7d5] hover:bg-[#191f2f]'
                  : 'w-10 h-10 flex items-center justify-center rounded-full text-[#101b34] hover:bg-[#e1e7ff]'
              }
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <button
              type="button"
              onClick={() => onSignOut()}
              aria-label="Sign Out"
              title="Sign Out"
              className={
                isDark
                  ? 'w-8 h-8 rounded-full bg-[#a4c8ff] text-[#00315e] flex items-center justify-center shrink-0'
                  : 'w-8 h-8 rounded-full bg-[#005ab6] text-white flex items-center justify-center shrink-0'
              }
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===================== MAIN CONTENT AREA ===================== */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <main className="flex-1 w-full pt-16 lg:pt-20 pb-24 lg:pb-8 px-4 lg:px-8">
          {children}
        </main>

        {/* Desktop Footer */}
        <footer
          className={
            isDark
              ? 'hidden lg:block w-full bg-[#0d1322] border-t border-[#1f283d] py-4 px-8'
              : 'hidden lg:block w-full bg-white border-t border-[#c1c6d6]/40 py-4 px-8'
          }
        >
          <div
            className={
              isDark
                ? 'flex items-center justify-between text-[11px] text-[#94a3b8]'
                : 'flex items-center justify-between text-[11px] text-[#414754]'
            }
          >
            <span>
              Protected by MindBridge Universal Learner Pass • Multi-Tenant Isolated Session
            </span>
            <span className={isDark ? 'text-[#64748b]' : 'text-[#717785]'}>
              © 2025 MindBridge LMS South Asia. All rights reserved.
            </span>
          </div>
        </footer>
      </div>

      {/* ===================== MOBILE BOTTOM NAVIGATION (<lg) ===================== */}
      <nav
        aria-label="Student Portal Mobile Navigation"
        className={
          isDark
            ? 'lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#080e1d]/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.35)] border-t border-[#1f283d]'
            : 'lg:hidden fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(7,27,74,0.06)] border-t border-[#c1c6d6]/40'
        }
      >
        <div className="h-16 px-2 flex items-center justify-around">
          {mobileNavItems.map((item) => {
            const isActive = activeNav === item.path;
            return (
              <button
                key={item.path}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelectNav(item.path, item.label)}
                className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors ${
                  isActive
                    ? isDark
                      ? 'text-[#3898ff] font-bold'
                      : 'text-[#005ab6] font-bold'
                    : isDark
                      ? 'text-[#c0c7d5] hover:text-white'
                      : 'text-[#414754] hover:text-[#005ab6]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
