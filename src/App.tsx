/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { DesktopMarketingWebsite } from './components/marketing/DesktopMarketingWebsite';
import { MobileDarkMarketingWebsite } from './components/marketing/MobileDarkMarketingWebsite';
import { MobileLightMarketingWebsite } from './components/marketing/MobileLightMarketingWebsite';
import { StageNoticeToast } from './components/marketing/StageNoticeToast';
import { TeacherOnboardingPage } from './components/onboarding/TeacherOnboardingPage';
import { StudentRegistrationPage } from './components/registration/StudentRegistrationPage';
import { StudentPortalPage } from './components/student/StudentPortalPage';

/**
 * MindBridge LMS — Stage 01, Stage 02 & Stage 03 (Phase 1) Route Architecture
 * - `/`                 : Official Main Public Marketing Website (Stage 01)
 * - `/login`            : Split-Screen Login Authentication (Stage 02)
 * - `/register/student` : Universal Student Registration (Stage 02)
 * - `/apply/academy`    : Teacher / Institute Onboarding Application (Stage 02)
 * - `/student`          : Student Portal Entry (Stage 03 Phase 1 — Hub / Empty Hub)
 * - `/student/hub`      : Universal Student Portal / Multi-Academy Hub (Stage 03 Phase 1)
 * - `/student/empty-hub`: Student Empty Hub (Stage 03 Phase 1)
 */
function normalizeRoute(pathname: string): string {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (
    cleaned === '/' ||
    cleaned === '/login' ||
    cleaned === '/super-admin/login' ||
    cleaned === '/register/student' ||
    cleaned === '/apply/academy' ||
    cleaned === '/student' ||
    cleaned === '/student/hub' ||
    cleaned === '/student/empty-hub'
  ) {
    return cleaned;
  }
  return '/';
}

export default function App() {
  const [route, setRoute] = useState<string>(() => normalizeRoute(window.location.pathname));
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'en' | 'si'>('en');
  const [notice, setNotice] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const navigate = useCallback((path: string) => {
    const target = normalizeRoute(path);
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    setRoute(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showStageNotice = useCallback((label: string) => {
    setNotice(
      `"${label}" belongs to a future development stage and is not active in Stage 02.`
    );
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setNotice(null);
    }, 4500);
  }, []);

  const handleMarketingAction = useCallback(
    (label: string) => {
      const lower = label.toLowerCase();
      if (lower === 'account portal' || lower.includes('super admin')) {
        navigate('/super-admin/login');
        return;
      }
      if (lower.includes('login') || lower.includes('sign in') || lower.includes('portal')) {
        navigate('/login');
        return;
      }
      if (
        lower.includes('student') ||
        lower.includes('enroll') ||
        lower.includes('register') ||
        lower.includes('learner')
      ) {
        navigate('/register/student');
        return;
      }
      if (
        lower.includes('onboard') ||
        lower.includes('institute') ||
        lower.includes('academy') ||
        lower.includes('teacher') ||
        lower.includes('get started') ||
        lower.includes('launch')
      ) {
        navigate('/apply/academy');
        return;
      }
      showStageNotice(label);
    },
    [navigate, showStageNotice]
  );

  return (
    <>
      {route === '/login' && (
        <LoginPage
          mode="standard"
          theme={theme}
          onToggleTheme={handleToggleTheme}
          lang={lang}
          onToggleLang={setLang}
          onNavigate={navigate}
          onFutureStageAction={showStageNotice}
        />
      )}

      {route === '/super-admin/login' && (
        <LoginPage
          mode="super_admin"
          theme={theme}
          onToggleTheme={handleToggleTheme}
          lang={lang}
          onToggleLang={setLang}
          onNavigate={navigate}
          onFutureStageAction={showStageNotice}
        />
      )}

      {route === '/register/student' && (
        <StudentRegistrationPage
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onNavigate={navigate}
        />
      )}

      {route === '/apply/academy' && (
        <TeacherOnboardingPage
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onNavigate={navigate}
        />
      )}

      {(route === '/student' ||
        route === '/student/hub' ||
        route === '/student/empty-hub') && (
        <StudentPortalPage
          route={route}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          lang={lang}
          onToggleLang={setLang}
          onNavigate={navigate}
          onActionNotice={showStageNotice}
        />
      )}

      {route === '/' && (
        <>
          {/* Desktop Public Marketing Website (Light & Dark) */}
          <div className="hidden md:block w-full">
            <DesktopMarketingWebsite
              theme={theme}
              onToggleTheme={handleToggleTheme}
              lang={lang}
              onToggleLang={setLang}
              onFutureStageAction={handleMarketingAction}
            />
          </div>

          {/* Mobile Public Marketing Website (Light & Dark) */}
          <div className="block md:hidden w-full">
            {theme === 'light' ? (
              <MobileLightMarketingWebsite
                onToggleTheme={handleToggleTheme}
                lang={lang}
                onToggleLang={setLang}
                onFutureStageAction={handleMarketingAction}
              />
            ) : (
              <MobileDarkMarketingWebsite
                onToggleTheme={handleToggleTheme}
                onFutureStageAction={handleMarketingAction}
              />
            )}
          </div>
        </>
      )}

      <StageNoticeToast message={notice} onDismiss={() => setNotice(null)} />
    </>
  );
}
