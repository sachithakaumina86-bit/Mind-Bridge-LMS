import React, { useState } from 'react';

interface DesktopMarketingWebsiteProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: 'en' | 'si';
  onToggleLang: (lang: 'en' | 'si') => void;
  onFutureStageAction: (label: string) => void;
}

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrA7_rZ3ABV6yE4doz6kFiRiGfPGv2xtF9lnpJ7hdRh3BipsZ2ijO2rKVq3ub9uFm-dmD7EgE-7J7KtIU1J0kTkgZUsqVQ2mnW5PDeu2KCXBxOv6XCTmabZtAEzg_BGR_BTdAnHkxI_rrb1nS7k2-lISNQ4RaPqGS2xvXDnfCU1DNqQvh9ECrQheZJ0pGOPEYE2mZbGuHTdhrEfu48ynixn_w20CE4mqMB3iXCK-bs5H4RtkXF2vJiNDDQ';

const HERO_LESSON_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC7b5_0DWIRl2YaVEFLVpd2q0SVeKyH83xK8akC9nEJw02FzoNDx9IzRCMF0ORpUthu6gHH7C1GIJli0XVp4FMeAAdjJ2iJ7mIwajIjF5edU1KGLL7pvuwbHDIevEP6RTxGKELTRlFFlhRmryDG5Fo4ldQy5bhXHhuWZdz9gxpQb4c2PWt22XW9KYbPjvhn1L5NE84Ly_NFqvJpgQHEOs1JWYdoLBBM_BScmcBIjLo';

export const DesktopMarketingWebsite: React.FC<DesktopMarketingWebsiteProps> = ({
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  onFutureStageAction,
}) => {
  const [activeNav, setActiveNav] = useState<string>('home');

  const scrollToSection = (id: string, navKey: string) => {
    setActiveNav(navKey);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#faf8ff] dark:bg-[#0d1322] font-inter text-[14px] leading-[22px] text-[#101b34] dark:text-[#f1f5f9] min-h-screen antialiased">
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/90 dark:bg-[#0d1322]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(7,27,74,0.05)] dark:border-b dark:border-[#26334d]/60 dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="h-20 w-full px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 shrink-0">
            <a
              className="flex items-center gap-2 group"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('top', 'home');
              }}
            >
              <img
                alt="MindBridge LMS Education Logo"
                className="h-8 w-auto object-contain"
                src="/assets/aistudio/Blue_and_Gold_Learning_Emblem_fd28f21b.png"
              />
              <div className="flex flex-col">
                <span className="font-display-jakarta text-[16px] leading-[24px] font-semibold text-[#005ab6] dark:text-[#3898ff] tracking-tight group-hover:text-[#0072e4] dark:group-hover:text-[#d4e3ff] transition-colors">
                  MindBridge
                </span>
                <span className="text-[11px] leading-[14px] tracking-[0.04em] font-semibold text-[#414754] dark:text-[#94a3b8] uppercase hidden sm:block">
                  LMS Ecosystem
                </span>
              </div>
            </a>
          </div>

          <nav className="hidden xl:flex items-center gap-1 p-1" aria-label="Primary Navigation">
            {[
              { key: 'home', label: 'Home', target: 'top' },
              { key: 'features', label: 'Features', target: 'features' },
              { key: 'for-teachers', label: 'For Teachers', target: 'for-teachers' },
              { key: 'for-institutes', label: 'For Institutes', target: 'for-institutes' },
              { key: 'how-it-works', label: 'How It Works', target: 'how-it-works' },
              { key: 'pricing', label: 'Pricing', target: 'pricing' },
              { key: 'resources', label: 'Resources', target: 'faq' },
            ].map((item) => {
              const isActive = activeNav === item.key;
              return (
                <a
                  key={item.key}
                  href={`#${item.target}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.target, item.key);
                  }}
                  className={
                    isActive
                      ? 'px-2 py-1.5 transition-all text-[#005ab6] dark:text-[#3898ff] font-display-jakarta text-[14px] font-semibold bg-[#e1e7ff] dark:bg-[#242a3a] rounded-lg'
                      : 'text-[14px] leading-[20px] font-semibold text-[#414754] dark:text-[#94a3b8] px-2 py-1.5 rounded-lg hover:bg-[#e1e7ff] dark:hover:bg-[#242a3a] hover:text-[#101b34] dark:hover:text-[#f1f5f9] transition-all'
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-[#f2f3ff] dark:bg-[#151b2b] px-2 py-1 rounded-full shadow-[0_1px_3px_rgba(7,27,74,0.04)] dark:border dark:border-[#26334d]/60 dark:shadow-inner">
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`text-[11px] leading-[14px] tracking-[0.04em] px-1 transition-colors ${
                  lang === 'en'
                    ? 'text-[#005ab6] dark:text-[#3898ff] font-bold'
                    : 'text-[#414754] dark:text-[#94a3b8] hover:text-[#101b34] dark:hover:text-[#f1f5f9] font-semibold'
                }`}
              >
                EN
              </button>
              <span className="text-[11px] text-[#717785] dark:text-[#8a919e] px-0.5">/</span>
              <button
                type="button"
                onClick={() => onToggleLang('si')}
                className={`text-[11px] leading-[14px] tracking-[0.04em] px-1 transition-colors ${
                  lang === 'si'
                    ? 'text-[#005ab6] dark:text-[#3898ff] font-bold'
                    : 'text-[#414754] dark:text-[#94a3b8] hover:text-[#101b34] dark:hover:text-[#f1f5f9] font-semibold'
                }`}
              >
                සිං
              </button>
            </div>

            <button
              aria-label="Toggle Theme"
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#414754] dark:text-[#94a3b8] hover:bg-[#eaedff] dark:hover:bg-[#191f2f] hover:text-[#101b34] dark:hover:text-[#f1f5f9] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === 'dark' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-2 ml-1">
              <button
                type="button"
                onClick={() => onFutureStageAction('Login')}
                className="text-[14px] leading-[20px] font-semibold text-[#101b34] dark:text-[#f1f5f9] px-4 py-2 rounded-lg hover:bg-[#f2f3ff] dark:hover:bg-[#151b2b] hover:text-[#005ab6] dark:hover:text-[#3898ff] transition-all cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onFutureStageAction('Get Started')}
                className="text-[14px] leading-[20px] font-semibold text-white bg-[#0072e4] dark:bg-[#3898ff] px-4 py-2 rounded-lg hover:bg-[#005ab6] dark:hover:bg-[#005fad] transition-all shadow-[0_4px_12px_rgba(7,27,74,0.06)] dark:shadow-[0_4px_16px_rgba(56,152,255,0.25)] cursor-pointer"
              >
                Get Started
              </button>
            </div>

            <button
              type="button"
              aria-label="Account Portal"
              onClick={() => onFutureStageAction('Account Portal')}
              className="w-8 h-8 rounded-full bg-[#005ab6] dark:bg-[#3898ff]/20 dark:border dark:border-[#3898ff]/40 flex items-center justify-center shrink-0 ml-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-white dark:text-[#3898ff] text-[18px]">
                person
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="w-full pt-20 bg-[#faf8ff] dark:bg-[#0d1322]">
        <div className="flex flex-col w-full">
          {/* HERO SECTION */}
          <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#faf8ff] via-[#f2f3ff]/40 to-[#faf8ff] dark:from-[#0d1322] dark:via-[#151b2b]/50 dark:to-[#0d1322] pt-12 pb-24">
            <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#d7e3ff]/30 via-[#dbe1ff]/20 to-[#ffddb4]/30 dark:from-[#3898ff]/15 dark:via-[#ffb95f]/10 dark:to-[#4edea3]/15 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#d7e3ff]/20 dark:bg-[#3898ff]/10 rounded-full blur-2xl dark:blur-3xl pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6">
              {/* Centered Hero Copy */}
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eaedff] dark:bg-[#191f2f] dark:border dark:border-[#26334d]/70 shadow-sm mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005ab6] dark:bg-[#3898ff] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#005ab6] dark:bg-[#3898ff]" />
                  </span>
                  <span className="text-[12px] leading-[16px] text-[#101b34] dark:text-[#f1f5f9] font-semibold tracking-wide">
                    Next-Generation Multi-Tenant EdTech Platform 🇱🇰 Sri Lanka &amp; Beyond
                  </span>
                </div>

                <h1 className="font-display-jakarta text-[44px] leading-[52px] font-extrabold tracking-[-0.02em] text-[#101b34] dark:text-[#f1f5f9] mb-4">
                  Your Teaching. Your Courses. <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005ab6] via-[#0072e4] to-[#4d5c8e] dark:from-[#3898ff] dark:via-[#d4e3ff] dark:to-[#ffb95f]">
                    One Powerful Learning Platform.
                  </span>
                </h1>

                <p className="text-[16px] leading-[26px] text-[#414754] dark:text-[#94a3b8] max-w-2xl mb-8">
                  Create, brand, and scale your independent digital academy. MindBridge empowers
                  individual teachers, tuition masters, and educational institutes with isolated
                  branded storefronts, AI tutoring, and seamless student management.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                  <button
                    type="button"
                    onClick={() => onFutureStageAction('Get Started Free')}
                    className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-[#005ab6] dark:bg-[#3898ff] text-white text-[14px] leading-[20px] font-semibold shadow-lg shadow-[#005ab6]/20 dark:shadow-[#3898ff]/25 hover:bg-[#0072e4] dark:hover:bg-[#005fad] transition-all group cursor-pointer"
                  >
                    <span>Get Started Free</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <a
                    className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-white dark:bg-[#151b2b] text-[#101b34] dark:text-[#f1f5f9] dark:border dark:border-[#26334d]/80 text-[14px] leading-[20px] font-semibold shadow-sm hover:bg-[#eaedff] dark:hover:bg-[#191f2f] transition-all"
                    href="#for-teachers"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('for-teachers', 'for-teachers');
                    }}
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#005ab6] dark:text-[#3898ff]">
                      play_circle
                    </span>
                    <span>Watch 2-Min Tour</span>
                  </a>
                </div>

                {/* Trust Metric Pills */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] leading-[14px] tracking-[0.04em] font-semibold text-[#414754] dark:text-[#94a3b8]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#005ab6] dark:text-[#3898ff]">
                      storefront
                    </span>{' '}
                    Dedicated Branded Storefronts
                  </span>
                  <span className="text-[#c1c6d6] dark:text-[#26334d]">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#7f5300] dark:text-[#4edea3]">
                      receipt_long
                    </span>{' '}
                    Manual LKR Bank Slip Verification
                  </span>
                  <span className="text-[#c1c6d6] dark:text-[#26334d]">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#4d5c8e] dark:text-[#ffb95f]">
                      auto_awesome
                    </span>{' '}
                    Google Gemini™ AI Enabled
                  </span>
                  <span className="text-[#c1c6d6] dark:text-[#26334d]">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#005ab6] dark:text-[#3898ff]">
                      translate
                    </span>{' '}
                    Sinhala &amp; English Ready
                  </span>
                </div>
              </div>

              {/* Hero Interactive Preview Canvas */}
              <div className="relative w-full rounded-2xl bg-white dark:bg-[#151b2b] dark:border dark:border-[#26334d]/80 shadow-xl dark:shadow-2xl overflow-hidden p-4 sm:p-6">
                {/* Mock Top App Bar */}
                <div className="flex items-center justify-between mb-4 bg-[#f2f3ff]/60 dark:bg-[#080e1d]/80 dark:border dark:border-[#26334d]/60 rounded-xl px-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ba1a1a]/70 dark:bg-[#ffb4ab]/70" />
                      <span className="w-3 h-3 rounded-full bg-[#ffb952] dark:bg-[#ffb95f]" />
                      <span className="w-3 h-3 rounded-full bg-[#b5c5fd] dark:bg-[#4edea3]" />
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-[#191f2f] px-3 py-1 rounded-md text-[#414754] dark:text-[#94a3b8] text-[11px] leading-[14px] font-semibold shadow-xs dark:border dark:border-[#26334d]/50">
                      <span className="material-symbols-outlined text-[16px] text-[#005ab6] dark:text-[#3898ff]">
                        lock
                      </span>
                      <span>al-physics.mindbridge.lk/admin</span>
                      <span className="text-xs text-[#717785] dark:text-[#3898ff] ml-1 font-mono">
                        LIVE TENANT
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d7e3ff] dark:bg-[#3898ff]/15 dark:border dark:border-[#3898ff]/30 text-[#001b3f] dark:text-[#3898ff] text-[11px] leading-[14px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005ab6] dark:bg-[#3898ff] animate-pulse" />{' '}
                      Production Hub
                    </span>
                  </div>
                </div>

                {/* Dashboard Content Grid Inside Mock */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left 8 cols */}
                  <div className="lg:col-span-8 flex flex-col gap-4">
                    {/* Metric Ribbons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-4 rounded-xl bg-[#f2f3ff] dark:bg-[#191f2f] dark:border dark:border-[#26334d]/60 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[#414754] dark:text-[#94a3b8] mb-2">
                          <span className="text-[12px] leading-[16px] font-medium">
                            Total Enrolled
                          </span>
                          <span className="material-symbols-outlined text-[20px] text-[#005ab6] dark:text-[#3898ff]">
                            group
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display-jakarta text-[32px] leading-[40px] text-[#101b34] dark:text-[#f1f5f9] font-bold tracking-tight">
                            1,420
                          </span>
                          <span className="text-[11px] text-[#4d5c8e] dark:text-[#ffb95f] font-semibold">
                            +18% this mo
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#f2f3ff] dark:bg-[#191f2f] dark:border dark:border-[#26334d]/60 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[#414754] dark:text-[#94a3b8] mb-2">
                          <span className="text-[12px] leading-[16px] font-medium">
                            Direct Slip Volume
                          </span>
                          <span className="material-symbols-outlined text-[20px] text-[#7f5300] dark:text-[#4edea3]">
                            payments
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display-jakarta text-[32px] leading-[40px] text-[#101b34] dark:text-[#f1f5f9] font-bold tracking-tight">
                            Rs. 840,000
                          </span>
                          <span className="text-[11px] text-[#414754] dark:text-[#94a3b8]">
                            LKR
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#f2f3ff] dark:bg-[#191f2f] dark:border dark:border-[#26334d]/60 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[#414754] dark:text-[#94a3b8] mb-2">
                          <span className="text-[12px] leading-[16px] font-medium">
                            Lesson Completion
                          </span>
                          <span className="material-symbols-outlined text-[20px] text-[#4d5c8e] dark:text-[#ffb95f]">
                            trending_up
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display-jakarta text-[32px] leading-[40px] text-[#101b34] dark:text-[#f1f5f9] font-bold tracking-tight">
                            98.4%
                          </span>
                          <span className="text-[11px] text-[#005ab6] dark:text-[#3898ff] font-semibold">
                            Active cohorts
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Live Class Countdown Card */}
                    <div className="p-4 sm:p-6 rounded-xl bg-[#e1e7ff] dark:bg-[#242a3a] dark:border dark:border-[#26334d]/70 rounded-tr-[24px] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#005ab6] dark:bg-[#3898ff] text-white flex items-center justify-center shrink-0 shadow-md dark:shadow-[#3898ff]/20">
                          <span className="material-symbols-outlined text-[26px]">sensors</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#ffdad6] dark:bg-[#ffb4ab]/20 text-[#93000a] dark:text-[#ffb4ab] dark:border dark:border-[#ffb4ab]/30">
                              Live Broadcast Scheduled
                            </span>
                            <span className="text-[12px] text-[#414754] dark:text-[#94a3b8]">
                              Zoom Engine Direct Link
                            </span>
                          </div>
                          <h4 className="font-display-jakarta text-[20px] leading-[28px] font-semibold text-[#101b34] dark:text-[#f1f5f9]">
                            A/L Combined Mathematics 2025 Revision
                          </h4>
                          <p className="text-[12px] text-[#414754] dark:text-[#94a3b8]">
                            Unit 4: Complex Numbers &amp; Matrices • 342 Students Waiting
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                        <div className="bg-white dark:bg-[#080e1d] px-3 py-1.5 rounded-lg text-center shadow-xs dark:border dark:border-[#26334d]/60">
                          <span className="font-display-jakarta text-[20px] leading-[28px] text-[#005ab6] dark:text-[#3898ff] font-bold">
                            45
                          </span>
                          <span className="block text-[11px] text-[#414754] dark:text-[#94a3b8] uppercase font-semibold">
                            Mins
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onFutureStageAction('Live Classroom Preview')}
                          className="px-4 py-2 bg-[#005ab6] dark:bg-[#3898ff] text-white text-[12px] font-semibold rounded-lg hover:bg-[#0072e4] dark:hover:bg-[#005fad] shadow-xs cursor-pointer"
                        >
                          Launch Room
                        </button>
                      </div>
                    </div>

                    {/* Pending Bank Slip Verifications Queue Mock */}
                    <div className="p-4 rounded-xl bg-[#f2f3ff] dark:bg-[#191f2f] dark:border dark:border-[#26334d]/60 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-display-jakarta text-[16px] font-semibold text-[#101b34] dark:text-[#f1f5f9] flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#7f5300] dark:text-[#4edea3] text-[20px]">
                            assignment_turned_in
                          </span>
                          Recent Student Bank Slips (Manual Verification)
                        </span>
                        <span className="text-[11px] text-[#005ab6] dark:text-[#3898ff] font-semibold">
                          View All (14 Pending)
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <div className="min-w-[500px] flex flex-col gap-1.5 pt-1">
                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#151b2b] dark:border dark:border-[#26334d]/50 text-[12px] text-[#101b34] dark:text-[#f1f5f9] shadow-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#dbe1ff] dark:bg-[#ffb95f]/20 text-[#041847] dark:text-[#ffb95f] dark:border dark:border-[#ffb95f]/30 flex items-center justify-center font-bold text-xs">
                                KN
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">Kavinda N. Perera</span>
                                <span className="text-[#414754] dark:text-[#94a3b8] text-[11px]">
                                  BOC Transfer • Ref #TX88102
                                </span>
                              </div>
                            </div>
                            <span className="font-mono font-semibold">Rs. 3,500</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#b5c5fd] dark:bg-[#ffb95f]/15 text-[#041847] dark:text-[#ffb95f] dark:border dark:border-[#ffb95f]/30 text-xs font-medium">
                              Slip Attached
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => onFutureStageAction('Bank Slip Verification')}
                                className="px-2.5 py-1 rounded bg-[#005ab6] dark:bg-[#3898ff] text-white text-[11px] font-semibold cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                aria-label="Reject slip"
                                onClick={() => onFutureStageAction('Bank Slip Verification')}
                                className="p-1 text-[#414754] dark:text-[#94a3b8] hover:text-[#ba1a1a] dark:hover:text-[#ffb4ab] cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#151b2b] dark:border dark:border-[#26334d]/50 text-[12px] text-[#101b34] dark:text-[#f1f5f9] shadow-xs">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#d7e3ff] dark:bg-[#3898ff]/20 text-[#001b3f] dark:text-[#3898ff] dark:border dark:border-[#3898ff]/30 flex items-center justify-center font-bold text-xs">
                                DS
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">Dinuki Senanayake</span>
                                <span className="text-[#414754] dark:text-[#94a3b8] text-[11px]">
                                  Commercial Bank Slip • Ref #CB4401
                                </span>
                              </div>
                            </div>
                            <span className="font-mono font-semibold">Rs. 4,200</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#b5c5fd] dark:bg-[#ffb95f]/15 text-[#041847] dark:text-[#ffb95f] dark:border dark:border-[#ffb95f]/30 text-xs font-medium">
                              WhatsApp Proof
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => onFutureStageAction('Bank Slip Verification')}
                                className="px-2.5 py-1 rounded bg-[#005ab6] dark:bg-[#3898ff] text-white text-[11px] font-semibold cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                aria-label="Reject slip"
                                onClick={() => onFutureStageAction('Bank Slip Verification')}
                                className="p-1 text-[#414754] dark:text-[#94a3b8] hover:text-[#ba1a1a] dark:hover:text-[#ffb4ab] cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right 4 cols: Student Portal Preview & AI Tutor */}
                  <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="p-4 rounded-xl bg-[#f2f3ff] dark:bg-[#191f2f] dark:border dark:border-[#26334d]/60 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#414754] dark:text-[#94a3b8]">
                            Student Portal View
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-[#717785] dark:text-[#8a919e]">
                            devices
                          </span>
                        </div>

                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#25304a] dark:bg-[#080e1d] mb-3 flex items-center justify-center dark:border dark:border-[#26334d]/60">
                          <img
                            className="w-full h-full object-cover opacity-80 dark:opacity-75"
                            alt="Digital classroom lesson video preview"
                            src={HERO_LESSON_IMG}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#25304a]/80 dark:from-[#080e1d]/90 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-semibold">
                            <span className="truncate">04. Rotational Motion Masterclass</span>
                            <span className="bg-[#005ab6]/80 dark:bg-[#3898ff]/90 px-1.5 py-0.5 rounded text-[10px]">
                              Unlisted Stream
                            </span>
                          </div>
                          <div className="absolute w-10 h-10 rounded-full bg-[#005ab6]/90 dark:bg-[#3898ff] text-white flex items-center justify-center shadow-lg">
                            <span className="material-symbols-outlined text-[22px]">
                              play_arrow
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                          <div className="flex justify-between text-[11px] text-[#414754] dark:text-[#94a3b8]">
                            <span>Course Progress</span>
                            <span className="font-bold text-[#005ab6] dark:text-[#3898ff]">
                              78%
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#d9e2ff] dark:bg-[#2f3445] overflow-hidden">
                            <div
                              className="h-full bg-[#005ab6] dark:bg-[#3898ff] rounded-full"
                              style={{ width: '78%' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-[#151b2b] dark:border dark:border-[#26334d]/60 shadow-sm flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#4d5c8e] dark:text-[#ffb95f] text-[20px]">
                            smart_toy
                          </span>
                          <span className="text-[12px] font-bold text-[#101b34] dark:text-[#f1f5f9]">
                            Gemini™ Bilingual Tutor
                          </span>
                        </div>
                        <div className="p-2 rounded bg-[#f2f3ff] dark:bg-[#191f2f] text-[12px] text-[#414754] dark:text-[#94a3b8] italic dark:border dark:border-[#26334d]/40">
                          &ldquo;ප්‍රශ්නය 12 සාකච්ඡා කරමුද? ඔබට angular momentum සමීකරණය නැවත
                          මතක් කරන්නද?&rdquo;
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#717785] dark:text-[#94a3b8]">
                          <span>Dual Script Unicode</span>
                          <span className="text-[#005ab6] dark:text-[#3898ff] font-medium">
                            Instant AI Feedback
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* UNIFIED ARCHITECTURE */}
          <section className="w-full py-20 bg-[#f2f3ff] dark:bg-[#151b2b] dark:border-y dark:border-[#26334d]/40 relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                <span className="text-[14px] text-[#005ab6] dark:text-[#3898ff] uppercase tracking-widest mb-2 font-bold">
                  Unified Architecture
                </span>
                <h2 className="font-display-jakarta text-[32px] leading-[40px] font-bold tracking-[-0.015em] text-[#101b34] dark:text-[#f1f5f9] mb-2">
                  One Bridge. Many Learning Journeys.
                </h2>
                <p className="text-[16px] leading-[26px] text-[#414754] dark:text-[#94a3b8]">
                  Complete data sovereignty for educators. Unified, frictionless access for learners
                  across Sri Lanka.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                <div className="p-6 rounded-xl bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/70 shadow-sm flex flex-col justify-between hover:shadow-md dark:hover:border-[#3898ff]/50 transition-all relative">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#d7e3ff] dark:bg-[#3898ff]/15 dark:border dark:border-[#3898ff]/30 text-[#001b3f] dark:text-[#3898ff] flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-[24px]">apartment</span>
                    </div>
                    <h3 className="font-display-jakarta text-[20px] leading-[28px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-1">
                      Isolated Academy Storefront
                    </h3>
                    <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mb-4">
                      Your independent domain (e.g.{' '}
                      <span className="font-mono text-xs bg-[#eaedff] dark:bg-[#080e1d] dark:border dark:border-[#26334d]/60 dark:text-[#3898ff] px-1.5 py-0.5 rounded">
                        maths.mindbridge.lk
                      </span>
                      ), fully customized with your color scheme, banners, unlisted YouTube streams,
                      and manual fee rules.
                    </p>
                  </div>
                  <div className="pt-3 dark:border-t dark:border-[#26334d]/40 flex items-center justify-between text-[11px] text-[#005ab6] dark:text-[#3898ff]">
                    <span className="font-bold">Zero Tenant Contamination</span>
                    <span className="material-symbols-outlined text-[16px]">
                      domain_verification
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white dark:bg-[#191f2f] dark:border dark:border-[#3898ff] shadow-sm dark:shadow-lg dark:shadow-[#3898ff]/10 flex flex-col justify-between hover:shadow-md transition-all relative border-t-4 border-t-[#005ab6] dark:border-t-[#3898ff]">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#005ab6] dark:bg-[#3898ff] text-white flex items-center justify-center mb-4 dark:shadow-md dark:shadow-[#3898ff]/30">
                      <span className="material-symbols-outlined text-[24px]">hub</span>
                    </div>
                    <h3 className="font-display-jakarta text-[20px] leading-[28px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-1">
                      The MindBridge Core Engine
                    </h3>
                    <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mb-4">
                      Powers multi-tenant routing, bank slip verification queues, anti-cheat test
                      timers, Gemini AI quota distribution, and automated grade calculations without
                      manual engineering overhead.
                    </p>
                  </div>
                  <div className="pt-3 dark:border-t dark:border-[#26334d]/40 flex items-center justify-between text-[11px] text-[#101b34] dark:text-[#f1f5f9] font-semibold">
                    <span>High-Availability Cloud</span>
                    <span className="material-symbols-outlined text-[16px] text-[#7f5300] dark:text-[#4edea3]">
                      speed
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/70 shadow-sm flex flex-col justify-between hover:shadow-md dark:hover:border-[#ffb95f]/50 transition-all relative">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#dbe1ff] dark:bg-[#ffb95f]/15 dark:border dark:border-[#ffb95f]/30 text-[#041847] dark:text-[#ffb95f] flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-[24px]">school</span>
                    </div>
                    <h3 className="font-display-jakarta text-[20px] leading-[28px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-1">
                      Single Universal Learner Pass
                    </h3>
                    <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mb-4">
                      Students sign in once. Using our swift <strong>Tenant Switcher</strong>{' '}
                      dropdown, they toggle between their Physics Masterclass, Chemistry Academy,
                      and English Institute without losing context.
                    </p>
                  </div>
                  <div className="pt-3 dark:border-t dark:border-[#26334d]/40 flex items-center justify-between text-[11px] text-[#4d5c8e] dark:text-[#ffb95f] font-bold">
                    <span>One Login • Many Tutors</span>
                    <span className="material-symbols-outlined text-[16px]">switch_account</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DUAL VALUE PROPOSITIONS: TEACHERS VS INSTITUTES */}
          <section className="w-full py-24 bg-[#faf8ff] dark:bg-[#0d1322]" id="for-teachers">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <div>
                  <span className="text-[14px] text-[#005ab6] dark:text-[#3898ff] uppercase tracking-widest font-bold">
                    Tailored Operating Models
                  </span>
                  <h2 className="font-display-jakarta text-[32px] leading-[40px] font-bold tracking-[-0.015em] text-[#101b34] dark:text-[#f1f5f9] mt-2">
                    Built for Individual Tutors and Scaled Academies Alike.
                  </h2>
                </div>
                <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] max-w-md">
                  Whether you are an independent master with 100 students or a premier tuition
                  network with 5,000 learners, choose your ideal operational baseline.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Col 1: For Individual Teachers */}
                <div className="p-8 rounded-2xl bg-[#f2f3ff] dark:bg-[#151b2b] dark:border dark:border-[#26334d]/70 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d7e3ff]/30 dark:bg-[#3898ff]/10 rounded-bl-[64px] pointer-events-none" />
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d7e3ff] dark:bg-[#3898ff]/15 dark:border dark:border-[#3898ff]/30 text-[#001b3f] dark:text-[#3898ff] text-[11px] font-bold mb-4">
                      <span className="material-symbols-outlined text-[16px]">person_outline</span>{' '}
                      For Individual Teachers &amp; Tuition Masters
                    </div>
                    <h3 className="font-display-jakarta text-[24px] leading-[32px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-2">
                      Zero tech headaches. Full ownership of your brand and revenue.
                    </h3>
                    <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mb-6">
                      Deliver high-definition recorded tutorials and live scheduled streams directly
                      to your verified cohort. Keep 100% of course fees with manual bank transfer
                      approvals.
                    </p>
                    <ul className="flex flex-col gap-2 mb-6">
                      {[
                        'Embed unlisted YouTube video playlists with protected playback controls.',
                        'Direct LKR bank slip approval via browser or WhatsApp notification link.',
                        'AI-generated Sinhala & English practice quizzes with single-click import.',
                        'Live class sync with Zoom and Google Meet integration links.',
                      ].map((text) => (
                        <li key={text} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[#005ab6] dark:text-[#3898ff] text-[20px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span className="text-[14px] leading-[22px] text-[#101b34] dark:text-[#f1f5f9]">
                            {text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 dark:border-t dark:border-[#26334d]/40 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onFutureStageAction('Solo Educator Onboarding')}
                      className="text-[14px] font-bold text-[#005ab6] dark:text-[#3898ff] group-hover:underline cursor-pointer"
                    >
                      Get Started as Solo Educator →
                    </button>
                    <span className="text-[11px] text-[#414754] dark:text-[#94a3b8]">
                      Instant Provisioning
                    </span>
                  </div>
                </div>

                {/* Col 2: For Institutes & Academies */}
                <div
                  id="for-institutes"
                  className="p-8 rounded-2xl bg-[#e1e7ff] dark:bg-[#191f2f] dark:border dark:border-[#26334d]/70 shadow-sm flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#dbe1ff]/40 dark:bg-[#ffb95f]/10 rounded-bl-[64px] pointer-events-none" />
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b5c5fd] dark:bg-[#ffb95f]/15 dark:border dark:border-[#ffb95f]/30 text-[#405081] dark:text-[#ffb95f] text-[11px] font-bold mb-4">
                      <span className="material-symbols-outlined text-[16px]">domain</span> For
                      Institutes &amp; Educational Academies
                    </div>
                    <h3 className="font-display-jakarta text-[24px] leading-[32px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-2">
                      Multi-staff governance, audited finances, and scalable faculty branches.
                    </h3>
                    <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mb-6">
                      Manage diverse academic streams—A/L Science, Commerce, Arts, or Professional
                      IT. Delegate course administration to staff without surrendering super-admin
                      control.
                    </p>
                    <ul className="flex flex-col gap-2 mb-6">
                      {[
                        'Multi-instructor management with granular administrative roles (2 staff included baseline).',
                        'Multi-course categorization (A/L Batches, Grade 11 O/L, Foundation diplomas).',
                        'Bulk student data exports, institutional financial ledgers, and audit logs.',
                        'Custom branded completion certificates with verifiable unique hash QR codes.',
                      ].map((text) => (
                        <li key={text} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[#4d5c8e] dark:text-[#ffb95f] text-[20px] shrink-0 mt-0.5">
                            verified
                          </span>
                          <span className="text-[14px] leading-[22px] text-[#101b34] dark:text-[#f1f5f9]">
                            {text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 dark:border-t dark:border-[#26334d]/40 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onFutureStageAction('Institute Onboarding Application')}
                      className="text-[14px] font-bold text-[#4d5c8e] dark:text-[#ffb95f] group-hover:underline cursor-pointer"
                    >
                      Request Institute Onboarding →
                    </button>
                    <span className="text-[11px] text-[#414754] dark:text-[#94a3b8]">
                      SLA &amp; Migration Support
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CORE PLATFORM CAPABILITIES GRID (6 DEEP FEATURE CARDS) */}
          <section
            className="w-full py-20 bg-[#f2f3ff] dark:bg-[#151b2b] dark:border-y dark:border-[#26334d]/40"
            id="features"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                <span className="text-[14px] text-[#005ab6] dark:text-[#3898ff] uppercase tracking-widest font-bold">
                  Purpose-Built Modules
                </span>
                <h2 className="font-display-jakarta text-[32px] leading-[40px] font-bold tracking-[-0.015em] text-[#101b34] dark:text-[#f1f5f9] mb-2">
                  Everything You Need to Run an Academic Powerhouse.
                </h2>
                <p className="text-[16px] leading-[26px] text-[#414754] dark:text-[#94a3b8]">
                  Engineered to overcome common South Asian e-learning pitfalls: slow connectivity,
                  high gateway fees, and complex software configurations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'video_settings',
                    title: '1. Protected Course Builder',
                    desc: '7-step guided syllabus creation. Organise modules into recorded video, structured assignments, revision workshops, and downloadable theory notes. Integrates auto-embed unlisted YouTube streaming safely.',
                    tag: 'Modular Syllabi',
                    accent: 'primary',
                  },
                  {
                    icon: 'local_library',
                    title: '2. Distraction-Free Learner Hub',
                    desc: 'Cinema-mode video player, interactive secure PDF reader with teacher-governed download permissions, personal lesson notes, and student Q&A discussion threads directly beneath every topic.',
                    tag: 'High Retention UI',
                    accent: 'primary',
                  },
                  {
                    icon: 'quiz',
                    title: '3. Assessment & Anti-Cheat Exam Engine',
                    desc: 'Conduct timed trial papers and quizzes. Supports MCQ, Short Answer, and Matching matrices. Equipped with autosaving timers and window-blur detection to discourage illicit tab switching.',
                    tag: 'Automated Grading',
                    accent: 'primary',
                  },
                  {
                    icon: 'psychology',
                    title: '4. AI Tutor (Google Gemini™)',
                    desc: 'Bilingual Sinhala and English AI study companion for round-the-clock student doubt clearance. Features Bring-Your-Own-Key (BYOK) setup for tutors with smart fallback quota safeguards.',
                    tag: 'Bilingual NLP Engine',
                    accent: 'secondary',
                  },
                  {
                    icon: 'account_balance',
                    title: '5. Zero-Commission LKR Slip Billing',
                    desc: 'Avoid high payment gateway deductions. Students upload ATM receipts, CDM vouchers, or mobile banking screenshots. Your admin team approves enrollments with a single button.',
                    tag: '100% Retained Revenue',
                    accent: 'tertiary',
                  },
                  {
                    icon: 'military_tech',
                    title: '6. Certifications & Learning Streaks',
                    desc: 'Issue teacher-authorized PDF certificates upon course mastery. Inspire cohort momentum through continuous study streaks, opt-in leaderboard rankings, and celebratory milestone awards.',
                    tag: 'Institutional Credibility',
                    accent: 'tertiary',
                  },
                ].map((card) => {
                  const iconColor =
                    card.accent === 'secondary'
                      ? 'text-[#4d5c8e] dark:text-[#ffb95f] dark:bg-[#ffb95f]/15 dark:border-[#ffb95f]/30'
                      : card.accent === 'tertiary'
                        ? 'text-[#7f5300] dark:text-[#4edea3] dark:bg-[#4edea3]/15 dark:border-[#4edea3]/30'
                        : 'text-[#005ab6] dark:text-[#3898ff] dark:bg-[#3898ff]/15 dark:border-[#3898ff]/30';
                  const tagColor =
                    card.accent === 'secondary'
                      ? 'text-[#4d5c8e] dark:text-[#ffb95f]'
                      : card.accent === 'tertiary'
                        ? 'text-[#7f5300] dark:text-[#4edea3]'
                        : 'text-[#005ab6] dark:text-[#3898ff]';

                  return (
                    <div
                      key={card.title}
                      className="p-6 rounded-xl bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div>
                        <div
                          className={`w-12 h-12 rounded-lg bg-[#e1e7ff] dark:border flex items-center justify-center mb-4 ${iconColor}`}
                        >
                          <span className="material-symbols-outlined text-[24px]">{card.icon}</span>
                        </div>
                        <h3 className="font-display-jakarta text-[16px] leading-[24px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-2">
                          {card.title}
                        </h3>
                        <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mb-4">
                          {card.desc}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${tagColor}`}
                      >
                        <span>{card.tag}</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="w-full py-24 bg-[#faf8ff] dark:bg-[#0d1322]" id="how-it-works">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
                <span className="text-[14px] text-[#005ab6] dark:text-[#3898ff] uppercase tracking-widest font-bold">
                  Execution Pathway
                </span>
                <h2 className="font-display-jakarta text-[32px] leading-[40px] font-bold tracking-[-0.015em] text-[#101b34] dark:text-[#f1f5f9] mb-2">
                  From Setup to First Class in Four Decisive Steps
                </h2>
                <p className="text-[16px] leading-[26px] text-[#414754] dark:text-[#94a3b8]">
                  Simple onboarding designed for busy teachers and institute administrators.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {[
                  {
                    num: '01',
                    icon: 'how_to_reg',
                    title: 'Apply & Configure',
                    desc: 'Register as an Individual Tutor or Institute. The MindBridge Super Admin verifies identity and instantly generates your isolated workspace.',
                    foot: 'Fast Approval • Zero Setup Fee',
                    badgeClass:
                      'bg-[#d7e3ff] text-[#001b3f] dark:bg-[#3898ff]/20 dark:border dark:border-[#3898ff]/30 dark:text-[#3898ff]',
                  },
                  {
                    num: '02',
                    icon: 'palette',
                    title: 'Build Your Academy',
                    desc: 'Upload your custom logo, apply your theme, attach unlisted YouTube videos, structure lesson worksheets, and schedule recurring Zoom sessions.',
                    foot: '7-Step Course Wizard',
                    badgeClass:
                      'bg-[#d7e3ff] text-[#001b3f] dark:bg-[#3898ff]/20 dark:border dark:border-[#3898ff]/30 dark:text-[#3898ff]',
                  },
                  {
                    num: '03',
                    icon: 'fact_check',
                    title: 'Enroll & Verify',
                    desc: 'Students join your tenant portal and upload their bank slip or WhatsApp receipt. Your administration marks the payment active in one click.',
                    foot: 'Zero Gateway Deductions',
                    badgeClass:
                      'bg-[#ffddb4] text-[#291800] dark:bg-[#4edea3]/20 dark:border dark:border-[#4edea3]/30 dark:text-[#4edea3]',
                  },
                  {
                    num: '04',
                    icon: 'rocket_launch',
                    title: 'Teach & Accelerate',
                    desc: 'Broadcast live lectures, trigger anti-cheat exams, monitor cohort progress, and let bilingual Gemini AI guide students through tough questions.',
                    foot: 'Automated Completion Badges',
                    badgeClass:
                      'bg-[#dbe1ff] text-[#041847] dark:bg-[#ffb95f]/20 dark:border dark:border-[#ffb95f]/30 dark:text-[#ffb95f]',
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="p-6 rounded-xl bg-[#f2f3ff] dark:bg-[#151b2b] dark:border dark:border-[#26334d]/60 shadow-sm flex flex-col justify-between relative group hover:bg-[#e1e7ff] dark:hover:bg-[#191f2f] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display-jakarta text-[44px] leading-[52px] text-[#005ab6]/30 dark:text-[#3898ff]/30 font-extrabold">
                          {step.num}
                        </span>
                        <span className={`p-2 rounded-lg ${step.badgeClass}`}>
                          <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                        </span>
                      </div>
                      <h3 className="font-display-jakarta text-[16px] leading-[24px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[12px] leading-[18px] text-[#414754] dark:text-[#94a3b8]">
                        {step.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-[#c1c6d6]/30 dark:border-[#26334d]/50 text-[11px] font-semibold text-[#414754] dark:text-[#94a3b8]">
                      {step.foot}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MULTI-TENANT DATA SOVEREIGNTY */}
          <section className="w-full py-20 bg-[#f2f3ff] dark:bg-[#151b2b] dark:border-y dark:border-[#26334d]/40">
            <div className="max-w-7xl mx-auto px-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/70 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-[#005ab6] dark:text-[#3898ff] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <span className="material-symbols-outlined text-[18px]">gite</span> Multi-Tenant
                    Data Sovereignty
                  </div>
                  <h2 className="font-display-jakarta text-[24px] leading-[32px] font-semibold text-[#101b34] dark:text-[#f1f5f9] mb-2">
                    Your Content Stays Yours. Zero Cross-Selling to Other Institutes.
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mb-4">
                    Unlike public aggregation marketplaces that advertise competing tutors right
                    next to your lessons, MindBridge operates on strict enterprise multi-tenancy.
                    Your students see only your institute, your announcements, and your designated
                    faculty.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] leading-[18px] text-[#101b34] dark:text-[#f1f5f9]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#005ab6] dark:text-[#3898ff] text-[18px]">
                        lock
                      </span>
                      <span>Encrypted Gemini API Key Vault (BYOK)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#005ab6] dark:text-[#3898ff] text-[18px]">
                        database
                      </span>
                      <span>Tenant Row-Level Database Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#005ab6] dark:text-[#3898ff] text-[18px]">
                        shield
                      </span>
                      <span>Personal Data Protection Act (PDPA) Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#005ab6] dark:text-[#3898ff] text-[18px]">
                        vpn_lock
                      </span>
                      <span>Strict Anti-Scraping Video Safeguards</span>
                    </div>
                  </div>
                </div>

                {/* Database Isolation Layer Diagram */}
                <div className="p-4 rounded-xl bg-[#f2f3ff] dark:bg-[#151b2b] dark:border dark:border-[#26334d]/60 w-full lg:w-96 flex flex-col gap-3">
                  <span className="text-[12px] font-bold text-[#101b34] dark:text-[#f1f5f9]">
                    Database Isolation Layer
                  </span>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/50 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#005ab6] dark:bg-[#3898ff]" />
                      <span className="text-[11px] text-[#101b34] dark:text-[#f1f5f9] font-semibold">
                        Institute Tenant A
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#414754] dark:text-[#3898ff]">
                      Isolated Schema
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/50 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4d5c8e] dark:bg-[#ffb95f]" />
                      <span className="text-[11px] text-[#101b34] dark:text-[#f1f5f9] font-semibold">
                        Independent Tutor B
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#414754] dark:text-[#ffb95f]">
                      Isolated Schema
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/50 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#7f5300] dark:bg-[#4edea3]" />
                      <span className="text-[11px] text-[#101b34] dark:text-[#f1f5f9] font-semibold">
                        Corporate Academy C
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#414754] dark:text-[#4edea3]">
                      Isolated Schema
                    </span>
                  </div>
                  <div className="text-center text-[11px] text-[#717785] dark:text-[#94a3b8] pt-1">
                    Global Switcher Engine • Zero Data Leaks
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="w-full py-24 bg-[#faf8ff] dark:bg-[#0d1322]" id="pricing">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                <span className="text-[14px] text-[#005ab6] dark:text-[#3898ff] uppercase tracking-widest font-bold">
                  Predictable Investment
                </span>
                <h2 className="font-display-jakarta text-[32px] leading-[40px] font-bold tracking-[-0.015em] text-[#101b34] dark:text-[#f1f5f9] mb-2">
                  Simple, Predictable Platform Subscription
                </h2>
                <p className="text-[16px] leading-[26px] text-[#414754] dark:text-[#94a3b8]">
                  No percentage cuts. No per-transaction penalties. 100% of student course fees flow
                  straight into your bank account.
                </p>
              </div>

              <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/80 shadow-lg dark:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#7f5300] dark:bg-[#4edea3] text-white dark:text-[#003824] px-4 py-1.5 rounded-bl-xl text-[11px] font-bold uppercase tracking-wider">
                  Super Admin Configured
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-2">
                  <div>
                    <h3 className="font-display-jakarta text-[24px] leading-[32px] font-semibold text-[#101b34] dark:text-[#f1f5f9]">
                      Standard Tenant Plan
                    </h3>
                    <p className="text-[14px] text-[#414754] dark:text-[#94a3b8]">
                      Complete LMS access for Individual Tutors and Institute Academies
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display-jakarta text-[44px] leading-[52px] text-[#005ab6] dark:text-[#3898ff] font-bold">
                        Custom
                      </span>
                      <span className="text-[14px] font-semibold text-[#414754] dark:text-[#94a3b8]">
                        / configured tier
                      </span>
                    </div>
                    <span className="text-[12px] text-[#414754] dark:text-[#94a3b8]">
                      Billed in Sri Lankan Rupees (LKR / Rs.)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    'Dedicated Subdomain & Branded Portal',
                    'Unlimited Course Modules & Quizzes',
                    'Manual Bank Slip Verification Engine',
                    'Up to 2 Staff Administrative Seats',
                    'Google Gemini™ AI Bilingual Tutor (BYOK)',
                    'Zero Student Transaction Commissions',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#005ab6] dark:text-[#3898ff] text-[20px]">
                        check
                      </span>
                      <span className="text-[14px] text-[#101b34] dark:text-[#f1f5f9]">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#f2f3ff] dark:bg-[#151b2b] dark:border dark:border-[#26334d]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#7f5300] dark:text-[#4edea3] text-[24px]">
                      verified_user
                    </span>
                    <span className="text-[12px] text-[#101b34] dark:text-[#f1f5f9] font-medium">
                      Ready to discuss your student capacity and custom rollout timeline?
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onFutureStageAction('Consult Platform Administrator')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#005ab6] dark:bg-[#3898ff] text-white text-[12px] font-semibold text-center hover:bg-[#0072e4] dark:hover:bg-[#005fad] transition-all cursor-pointer"
                  >
                    Consult Platform Administrator
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ ACCORDION */}
          <section
            className="w-full py-20 bg-[#f2f3ff] dark:bg-[#151b2b] dark:border-y dark:border-[#26334d]/40"
            id="faq"
          >
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="text-[14px] text-[#005ab6] dark:text-[#3898ff] uppercase tracking-widest font-bold">
                  Frequently Asked Questions
                </span>
                <h2 className="font-display-jakarta text-[32px] leading-[40px] font-bold tracking-[-0.015em] text-[#101b34] dark:text-[#f1f5f9] mt-2">
                  Clear Answers to Common Operations Questions
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  {
                    q: 'How does the student login work across multiple different institutes?',
                    a: 'A student registers once on MindBridge. When they enroll in your courses, they access your isolated portal. Through the unified Tenant Switcher, they can effortlessly toggle between different educators without logging out or juggling duplicate passwords.',
                    defaultOpen: true,
                  },
                  {
                    q: 'How does manual LKR bank transfer slip verification operate?',
                    a: 'Students submit payment receipts via image upload (BOC, Sampath, Commercial Bank, CDM deposits, or online banking slips). Your admin dashboard highlights unverified deposits, allowing your finance team to approve access or request clarification in seconds.',
                    defaultOpen: false,
                  },
                  {
                    q: 'Is Sinhala Unicode rendering supported across exams and notes?',
                    a: 'Yes, completely. The typography system includes Noto Sans Sinhala natively. Sinhala questions, mathematical formulas, and explanations render cleanly with zero font clipping across mobile and desktop screens.',
                    defaultOpen: false,
                  },
                  {
                    q: 'Do I need my own Google Gemini API key for the AI assistant?',
                    a: 'MindBridge features a Bring-Your-Own-Key (BYOK) model. You can plug in your Google Gemini AI key directly into your tenant settings, granting you total control over usage limits, costs, and customized prompt parameters.',
                    defaultOpen: false,
                  },
                  {
                    q: 'Can I add multiple staff members to help check bank slips?',
                    a: 'Yes. The standard tenant subscription permits up to two dedicated staff members baseline who can be assigned restricted roles (such as Slip Verifier or Question Bank Editor) without exposing your full business analytics.',
                    defaultOpen: false,
                  },
                ].map((faq) => (
                  <details
                    key={faq.q}
                    open={faq.defaultOpen}
                    className="group p-4 rounded-xl bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/60 shadow-sm [&>summary::-webkit-details-marker]:hidden cursor-pointer"
                  >
                    <summary className="flex items-center justify-between font-display-jakarta text-[16px] font-semibold text-[#101b34] dark:text-[#f1f5f9] list-none">
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-[20px] text-[#005ab6] dark:text-[#3898ff] group-open:rotate-180 transition-transform">
                        expand_more
                      </span>
                    </summary>
                    <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] mt-2 pt-2 border-t border-[#c1c6d6]/20 dark:border-[#26334d]/40">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA BANNER */}
          <section className="w-full py-20 bg-[#faf8ff] dark:bg-[#0d1322]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative rounded-3xl bg-[#25304a] dark:bg-[#151b2b] dark:border dark:border-[#26334d]/80 text-[#eef0ff] dark:text-[#f1f5f9] p-8 sm:p-16 overflow-hidden shadow-2xl">
                <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#005ab6]/20 dark:bg-[#3898ff]/10 blur-3xl pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#7f5300]/20 dark:bg-[#ffb95f]/10 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#ffddb4] dark:bg-[#ffb95f]/20 dark:border dark:border-[#ffb95f]/40 text-[#291800] dark:text-[#ffb95f] flex items-center justify-center mb-4 shadow-lg">
                    <span className="material-symbols-outlined text-[32px]">school</span>
                  </div>
                  <h2 className="font-display-jakarta text-[32px] sm:text-[44px] leading-[40px] sm:leading-[52px] text-[#eef0ff] dark:text-[#f1f5f9] font-extrabold tracking-tight mb-4">
                    Ready to Bridge the Future of Education in Sri Lanka?
                  </h2>
                  <p className="text-[16px] leading-[26px] text-[#eef0ff]/80 dark:text-[#94a3b8] mb-8 max-w-2xl">
                    Join the teachers and educational institutes taking full ownership of their
                    digital brand, student community, and instructional content.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => onFutureStageAction('Launch Your Institute Today')}
                      className="px-8 h-12 rounded-lg bg-[#005ab6] dark:bg-[#3898ff] text-white text-[14px] font-semibold flex items-center justify-center shadow-lg dark:shadow-[#3898ff]/25 hover:bg-[#0072e4] dark:hover:bg-[#005fad] transition-all cursor-pointer"
                    >
                      Launch Your Institute Today
                    </button>
                    <a
                      className="px-8 h-12 rounded-lg bg-[#eef0ff]/10 dark:bg-[#191f2f] text-[#eef0ff] dark:text-[#f1f5f9] dark:border dark:border-[#26334d]/80 hover:bg-[#eef0ff]/20 dark:hover:bg-[#242a3a] text-[14px] font-semibold flex items-center justify-center transition-all"
                      href="#features"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('features', 'features');
                      }}
                    >
                      Schedule Platform Demo
                    </a>
                  </div>
                  <span className="text-[11px] text-[#eef0ff]/60 dark:text-[#94a3b8]">
                    No credit card required • Fast application review by MindBridge Super Admin
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#f2f3ff] dark:bg-[#151b2b] mt-8 dark:mt-0 dark:border-t dark:border-[#26334d]/60 shadow-[0_-1px_6px_rgba(7,27,74,0.02)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="lg:col-span-2 flex flex-col gap-4 pr-4">
              <div className="flex items-center gap-2">
                <img
                  alt="MindBridge LMS Education Logo"
                  className="h-8 w-auto object-contain"
                  src={LOGO_URL}
                />
                <span className="font-display-jakarta text-[16px] font-semibold text-[#005ab6] dark:text-[#3898ff] tracking-tight">
                  MindBridge LMS
                </span>
              </div>
              <p className="text-[14px] leading-[22px] text-[#414754] dark:text-[#94a3b8] max-w-sm">
                Empowering Sri Lankan schools, higher education institutes, and enterprise academies
                with unified learning management, automated grading, and localized billing
                workflows.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#191f2f] dark:border dark:border-[#26334d]/60 rounded-lg shadow-[0_1px_3px_rgba(7,27,74,0.04)] w-fit">
                <span className="material-symbols-outlined text-[#7f5300] dark:text-[#4edea3] text-[20px]">
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#101b34] dark:text-[#f1f5f9] font-semibold">
                    National Readiness Verified
                  </span>
                  <span className="text-[12px] text-[#414754] dark:text-[#94a3b8]">
                    Dual Currency (LKR / Rs.) &amp; Unicode Compliant
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-semibold text-[#101b34] dark:text-[#f1f5f9] uppercase tracking-wider mb-1">
                Solutions
              </span>
              {[
                { label: 'Individual Educators', target: 'for-teachers' },
                { label: 'Private Institutes & Tuition', target: 'for-institutes' },
                { label: 'Schools & Colleges', target: 'for-institutes' },
                { label: 'Corporate Academies', target: 'for-institutes' },
                { label: 'Virtual Classrooms & Exams', target: 'features' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={`#${link.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.target, link.target);
                  }}
                  className="text-[14px] text-[#414754] dark:text-[#94a3b8] hover:text-[#005ab6] dark:hover:text-[#3898ff] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-semibold text-[#101b34] dark:text-[#f1f5f9] uppercase tracking-wider mb-1">
                Product &amp; Access
              </span>
              {[
                { label: 'Core LMS Engine', target: 'features' },
                { label: 'Architecture & Security', target: 'how-it-works' },
                { label: 'Pricing Plans (LKR)', target: 'pricing' },
                { label: 'Release Notes', target: 'faq' },
                { label: 'API & Integrations', target: 'faq' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={`#${link.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.target, link.target);
                  }}
                  className="text-[14px] text-[#414754] dark:text-[#94a3b8] hover:text-[#005ab6] dark:hover:text-[#3898ff] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-semibold text-[#101b34] dark:text-[#f1f5f9] uppercase tracking-wider mb-1">
                Legal &amp; Trust
              </span>
              {[
                'Data Protection Policy',
                'Terms of Service',
                'Multi-Tenant SLA',
                'Sinhala Localization Specs',
                'Support Center',
              ].map((label) => (
                <a
                  key={label}
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('faq', 'resources');
                  }}
                  className="text-[14px] text-[#414754] dark:text-[#94a3b8] hover:text-[#005ab6] dark:hover:text-[#3898ff] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 dark:border-t dark:border-[#26334d]/40">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <span className="text-[12px] text-[#414754] dark:text-[#94a3b8]">
                © 2025 MindBridge Learning Technologies (Pvt) Ltd. All rights reserved.
              </span>
              <span className="hidden sm:inline text-[12px] text-[#c1c6d6] dark:text-[#26334d]">
                •
              </span>
              <span className="text-[12px] text-[#414754] dark:text-[#94a3b8]">
                Learn • Manage • Achieve
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#414754] dark:text-[#94a3b8]">
                <span className="material-symbols-outlined text-[18px] text-[#7f5300] dark:text-[#4edea3]">
                  shield
                </span>
                <span className="text-[11px] font-semibold">Bank-Grade Data Privacy</span>
              </div>
              <div className="flex items-center gap-1 text-[#414754] dark:text-[#94a3b8]">
                <span className="material-symbols-outlined text-[18px] text-[#005ab6] dark:text-[#3898ff]">
                  public
                </span>
                <span className="text-[11px] font-semibold">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
