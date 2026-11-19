import React, { useState } from 'react';
import type { VerifiedSessionProfile } from '../../context/AuthContext';

interface StudentEmptyHubProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  profile: VerifiedSessionProfile;
  onActionNotice: (label: string) => void;
  onSignOut: () => Promise<void>;
  onNavigate: (path: string) => void;
}

const MINDBRIDGE_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrA7_rZ3ABV6yE4doz6kFiRiGfPGv2xtF9lnpJ7hdRh3BipsZ2ijO2rKVq3ub9uFm-dmD7EgE-7J7KtIU1J0kTkgZUsqVQ2mnW5PDeu2KCXBxOv6XCTmabZtAEzg_BGR_BTdAnHkxI_rrb1nS7k2-lISNQ4RaPqGS2xvXDnfCU1DNqQvh9ECrQheZJ0pGOPEYE2mZbGuHTdhrEfu48ynixn_w20CE4mqMB3iXCK-bs5H4RtkXF2vJiNDDQ';

export const StudentEmptyHub: React.FC<StudentEmptyHubProps> = ({
  theme,
  onToggleTheme,
  profile,
  onActionNotice,
  onSignOut,
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteFeedback, setInviteFeedback] = useState<string | null>(null);
  const [depositModalOpen, setDepositModalOpen] = useState(false);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    setInviteFeedback(
      'Course invitation code redemption requires the enrollment backend endpoint, which is not yet provisioned in Phase 1.'
    );
  };

  return (
    <div
      className={
        isDark
          ? 'min-h-screen bg-[#0d1322] text-[#dde2f8] font-display-jakarta antialiased flex flex-col'
          : 'min-h-screen bg-[#faf8ff] text-[#101b34] font-inter antialiased flex flex-col'
      }
    >
      {/* ===================== DESKTOP HEADER (lg+) ===================== */}
      <header
        className={
          isDark
            ? 'hidden lg:block fixed top-0 left-0 right-0 z-50 bg-[#0d1322]/90 backdrop-blur-xl border-b border-[#2f3445]/40 shadow-[0_4px_24px_rgba(8,14,29,0.5)]'
            : 'hidden lg:block fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#c1c6d6] shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
        }
      >
        <div className="h-16 lg:h-20 w-full px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 text-left"
            >
              <img
                alt="MindBridge LMS Education Logo"
                className="h-8 w-auto object-contain"
                src={MINDBRIDGE_LOGO_URL}
              />
              <div className="flex flex-col">
                <span className="font-display-jakarta text-[16px] font-bold leading-none">
                  MindBridge LMS
                </span>
                {isDark && (
                  <span className="text-[10px] text-[#a4c8ff] uppercase tracking-widest leading-tight">
                    LMS Enterprise
                  </span>
                )}
              </div>
            </button>

            <nav className="hidden xl:flex items-center gap-1">
              <span
                aria-current="page"
                className={
                  isDark
                    ? 'px-4 py-2 rounded-lg bg-[#191f2f] text-[#a4c8ff] text-[14px] font-bold shadow-[inset_0_0_0_1px_rgba(56,152,255,0.25)]'
                    : 'px-4 py-1.5 rounded-lg bg-[#0072e4] text-white text-[14px] font-semibold shadow-sm'
                }
              >
                Student Portal
              </span>
              {[
                { label: 'My Courses', notice: 'My Enrolled Courses / Catalog' },
                { label: 'Invoices & Slips', notice: 'Bank Slips & Tuition Payment Portal' },
                { label: 'Support', notice: 'Academic Support / Tickets' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onActionNotice(item.notice)}
                  className={
                    isDark
                      ? 'px-4 py-2 rounded-lg text-[14px] font-semibold text-[#c0c7d5] hover:text-white hover:bg-[#242a3a] transition-colors'
                      : 'px-4 py-1.5 rounded-lg text-[14px] font-semibold text-[#414754] hover:bg-[#e1e7ff] hover:text-[#101b34] transition-colors'
                  }
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Light/Dark Theme"
              className={
                isDark
                  ? 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191f2f] hover:bg-[#242a3a] text-[#dde2f8] text-xs font-semibold transition-colors'
                  : 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#e1e7ff] text-[#101b34] text-xs font-semibold transition-colors'
              }
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              type="button"
              onClick={() => onActionNotice('Notifications Center')}
              aria-label="Notifications"
              className={
                isDark
                  ? 'p-2 rounded-lg text-[#c0c7d5] hover:bg-[#242a3a] transition-colors'
                  : 'p-2 rounded-full text-[#414754] hover:bg-[#e1e7ff] transition-colors'
              }
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>

            <div
              className={
                isDark
                  ? 'flex items-center gap-3 pl-3 border-l border-[#2f3445]/50'
                  : 'flex items-center gap-3 pl-3 border-l border-[#c1c6d6]'
              }
            >
              <div className="hidden xl:flex flex-col text-right">
                <span className="text-[13px] font-semibold leading-tight">{profile.fullName}</span>
                <span
                  className={
                    isDark ? 'text-[10px] text-[#c0c7d5]' : 'text-[10px] text-[#005ab6] font-medium'
                  }
                >
                  {profile.email}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSignOut()}
                title="Sign Out"
                aria-label="Sign Out"
                className={
                  isDark
                    ? 'w-8 h-8 rounded-full bg-[#a4c8ff] text-[#00315e] flex items-center justify-center shrink-0'
                    : 'w-8 h-8 rounded-full bg-[#005ab6] text-white flex items-center justify-center shrink-0 shadow-sm'
                }
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== MOBILE HEADER (<lg) ===================== */}
      {/* Anomaly 2B Handling: Contradictory Stitch mobile headers ("Anti Cheat Lockout" / "Account Pending Verification") are NOT reproduced, and no desktop title is substituted. Mobile header title remains unresolved pending user clarification. */}
      <header
        className={
          isDark
            ? 'lg:hidden fixed top-0 inset-x-0 z-50 bg-[#0d1322]/90 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(7,11,20,0.45)]'
            : 'lg:hidden fixed top-0 inset-x-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
        }
      >
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              aria-label="Go back"
              className={
                isDark
                  ? 'w-10 h-10 rounded-lg flex items-center justify-center text-[#c0c7d5] hover:bg-[#191f2f]'
                  : 'w-10 h-10 rounded-lg flex items-center justify-center text-[#101b34] hover:bg-[#e1e7ff]'
              }
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <img
              alt="MindBridge LMS Education Logo"
              className="h-8 w-auto object-contain"
              src={MINDBRIDGE_LOGO_URL}
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Light/Dark Theme"
              className={
                isDark
                  ? 'w-10 h-10 rounded-lg flex items-center justify-center text-[#c0c7d5] hover:bg-[#191f2f]'
                  : 'w-10 h-10 rounded-lg flex items-center justify-center text-[#101b34] hover:bg-[#e1e7ff]'
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onSignOut()}
              aria-label="Sign Out"
              className={
                isDark
                  ? 'w-8 h-8 rounded-full bg-[#a4c8ff] text-[#00315e] flex items-center justify-center'
                  : 'w-8 h-8 rounded-full bg-[#005ab6] text-white flex items-center justify-center'
              }
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="flex-1 w-full pt-20 lg:pt-24 pb-12 px-4 lg:px-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
        {/* Welcome & Identity Header */}
        <section
          className={
            isDark
              ? 'flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#151b2b] p-5 lg:p-6 rounded-xl shadow-md'
              : 'flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-white p-5 lg:p-6 rounded-xl shadow-sm'
          }
        >
          <div className="space-y-1">
            <span
              className={
                isDark
                  ? 'inline-block px-2.5 py-0.5 rounded-full bg-[#3898ff]/15 text-[#a4c8ff] text-[10px] font-bold uppercase tracking-wider'
                  : 'inline-block px-2.5 py-0.5 rounded-full bg-[#005ab6]/10 text-[#005ab6] text-[11px] font-semibold uppercase tracking-wide'
              }
            >
              Student Workspace
            </span>
            <h1 className="font-display-jakarta text-[24px] lg:text-[32px] font-bold tracking-tight">
              My Learning Hub
            </h1>
            <p className={isDark ? 'text-[13px] text-[#c0c7d5]' : 'text-[14px] text-[#414754]'}>
              Welcome, <strong className={isDark ? 'text-white' : 'text-[#101b34]'}>{profile.fullName}</strong>{' '}
              • {profile.email}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div
              className={
                isDark
                  ? 'px-3.5 py-2 rounded-lg bg-[#242a3a] text-[#dde2f8] text-[13px] font-semibold flex items-center gap-2'
                  : 'px-3.5 py-2 rounded-lg bg-[#f2f3ff] text-[#101b34] text-[13px] font-semibold flex items-center gap-2'
              }
            >
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
              <span>All Registered Academies</span>
              <span
                className={
                  isDark
                    ? 'px-2 py-0.5 rounded-full bg-[#93000a] text-[#ffdad6] text-[10px] font-bold'
                    : 'px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold'
                }
              >
                0 Active
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setInviteFeedback(null);
                setInviteModalOpen(true);
              }}
              className={
                isDark
                  ? 'px-4 py-2 rounded-lg bg-[#2f3445] hover:bg-[#33394a] text-[#a4c8ff] text-[13px] font-semibold flex items-center gap-1.5 transition-colors'
                  : 'px-4 py-2 rounded-lg bg-[#e1e7ff] hover:bg-[#d9e2ff] text-[#005ab6] text-[13px] font-semibold flex items-center gap-1.5 transition-colors'
              }
            >
              <span className="material-symbols-outlined text-[18px]">key</span>
              <span>Enter Code</span>
            </button>
          </div>
        </section>

        {/* Primary Empty State Card */}
        <section
          className={
            isDark
              ? 'relative w-full rounded-2xl bg-[#151b2b] p-6 sm:p-12 overflow-hidden shadow-xl text-center'
              : 'relative w-full rounded-2xl bg-white shadow-md overflow-hidden text-center'
          }
          style={!isDark ? { borderTopRightRadius: '36px' } : undefined}
        >
          {!isDark && (
            <div className="h-2 w-full bg-gradient-to-r from-[#005ab6] via-[#0072e4] to-[#ffb952]" />
          )}
          <div className="p-6 sm:p-10 flex flex-col items-center max-w-3xl mx-auto">
            <div
              className={
                isDark
                  ? 'w-24 h-24 rounded-2xl bg-[#191f2f] flex items-center justify-center shadow-2xl mb-4'
                  : 'w-24 h-24 rounded-2xl bg-[#f2f3ff] flex items-center justify-center shadow-sm mb-4'
              }
            >
              <span
                className={
                  isDark
                    ? 'material-symbols-outlined text-[48px] text-[#a4c8ff]'
                    : 'material-symbols-outlined text-[48px] text-[#005ab6]'
                }
              >
                school
              </span>
            </div>

            <span
              className={
                isDark
                  ? 'px-3 py-1 rounded-full bg-[#2f3445] text-[#ffb95f] text-[10px] font-bold uppercase tracking-widest mb-4'
                  : 'px-3 py-1 rounded-full bg-[#e1e7ff] text-[#005ab6] font-mono text-[10px] font-bold uppercase tracking-widest mb-4'
              }
            >
              Status: Fresh Session
            </span>

            <h2 className="font-display-jakarta text-[22px] sm:text-[28px] font-bold tracking-tight">
              You are not enrolled in any courses yet
            </h2>
            <p
              className={
                isDark
                  ? 'text-[14px] sm:text-[16px] text-[#c0c7d5] mt-3 max-w-xl leading-relaxed'
                  : 'text-[14px] sm:text-[16px] text-[#414754] mt-3 max-w-xl leading-relaxed'
              }
            >
              Join an academy or enter a course invitation code provided by your tuition master to
              access weekly live interactive streams, tute delivery packages, and unlisted
              high-yield recordings.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7 w-full max-w-xl">
              <button
                type="button"
                onClick={() => onActionNotice('Academy Storefront / Browse Academies')}
                className={
                  isDark
                    ? 'w-full sm:w-auto px-6 py-3 rounded-lg bg-[#3898ff] hover:bg-[#a4c8ff] text-[#002f5b] text-[14px] font-bold flex items-center justify-center gap-2 shadow-lg transition-all'
                    : 'w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0072e4] hover:bg-[#005ab6] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-md transition-all'
                }
              >
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span>Browse Academy Storefront</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setInviteFeedback(null);
                  setInviteModalOpen(true);
                }}
                className={
                  isDark
                    ? 'w-full sm:w-auto px-6 py-3 rounded-lg bg-[#242a3a] hover:bg-[#33394a] text-[#dde2f8] text-[14px] font-semibold flex items-center justify-center gap-2 transition-all'
                    : 'w-full sm:w-auto px-6 py-3 rounded-lg bg-[#f2f3ff] hover:bg-[#e1e7ff] text-[#005ab6] text-[14px] font-semibold flex items-center justify-center gap-2 transition-all'
                }
              >
                <span className="material-symbols-outlined text-[20px]">dialpad</span>
                <span>Enter Course Invite Code</span>
              </button>
            </div>

            {/* Offline Bank Deposit Slip Sub-prompt */}
            <div
              className={
                isDark
                  ? 'mt-6 flex flex-wrap items-center justify-center gap-1.5 text-[12px] text-[#c0c7d5]'
                  : 'mt-6 flex flex-wrap items-center justify-center gap-1.5 text-[12px] text-[#414754]'
              }
            >
              <span>Already transferred tuition fees through a bank counter or CDM?</span>
              <button
                type="button"
                onClick={() => setDepositModalOpen(true)}
                className={
                  isDark
                    ? 'text-[#a4c8ff] font-semibold hover:underline inline-flex items-center gap-1'
                    : 'text-[#005ab6] font-semibold hover:underline inline-flex items-center gap-1'
                }
              >
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Upload Offline Bank Deposit Slip</span>
              </button>
            </div>
          </div>

          {/* Guarantee Footer Strip */}
          <div
            className={
              isDark
                ? 'border-t border-[#2f3445]/40 px-6 py-3 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#c0c7d5]'
                : 'bg-[#f2f3ff] px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#414754]'
            }
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#3898ff]">security</span>
              Protected via MindBridge Cloud Campus
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">bolt</span>
              Instant LMS Provisioning
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                local_shipping
              </span>
              Island-wide Tute Courier
            </span>
          </div>
        </section>

        {/* 3-Step Quick-Start Roadmap */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span
                className={
                  isDark
                    ? 'text-[10px] uppercase tracking-widest text-[#a4c8ff] font-bold'
                    : 'text-[11px] uppercase tracking-wider text-[#005ab6] font-bold'
                }
              >
                Onboarding Walkthrough
              </span>
              <h2 className="font-display-jakarta text-[20px] font-semibold">
                How to activate your A/L courses in 3 steps
              </h2>
            </div>
            <span className={isDark ? 'text-[12px] text-[#c0c7d5]' : 'text-[12px] text-[#414754]'}>
              Standard turnaround: Under 15 minutes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                icon: 'school',
                title: 'Find Your Academy & Subject',
                desc: 'Choose your Combined Maths, Physics, or Chemistry Master from your academy branch portal and filter by your target examination year.',
              },
              {
                num: '02',
                icon: 'payments',
                title: 'Pay Tuition via Bank Transfer',
                desc: 'Direct cash deposit to BOC, Commercial Bank, or Sampath Bank accounts. Upload a clear photograph or screenshot of your transaction receipt slip.',
              },
              {
                num: '03',
                icon: 'smart_display',
                title: 'Instant Lesson & Video Access',
                desc: 'Once verified by your academy administrative team, stream secure 1080p recorded archives, attend live sessions, and track postal tute delivery.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className={
                  isDark
                    ? 'bg-[#151b2b] p-6 rounded-xl shadow-md'
                    : 'bg-white p-6 rounded-xl shadow-sm'
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={
                      isDark
                        ? 'w-11 h-11 rounded-xl bg-[#191f2f] text-[#a4c8ff] flex items-center justify-center'
                        : 'w-11 h-11 rounded-xl bg-[#eaedff] text-[#005ab6] flex items-center justify-center'
                    }
                  >
                    <span className="material-symbols-outlined text-[24px]">{step.icon}</span>
                  </div>
                  <span className="font-display-jakarta text-[24px] font-black opacity-25">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display-jakarta text-[16px] font-semibold mb-1.5">
                  {step.title}
                </h3>
                <p
                  className={
                    isDark
                      ? 'text-[13px] text-[#c0c7d5] leading-relaxed'
                      : 'text-[13px] text-[#414754] leading-relaxed'
                  }
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Offline Deposit Support Banner */}
        <section
          className={
            isDark
              ? 'rounded-2xl bg-[#191f2f] p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4'
              : 'rounded-xl bg-[#f2f3ff] p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4'
          }
        >
          <div className="flex items-start gap-4">
            <div
              className={
                isDark
                  ? 'w-12 h-12 rounded-xl bg-[#2f3445] text-[#a4c8ff] flex items-center justify-center shrink-0'
                  : 'w-12 h-12 rounded-xl bg-[#a06900] text-white flex items-center justify-center shrink-0'
              }
            >
              <span className="material-symbols-outlined text-[26px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-display-jakarta text-[17px] font-bold">
                Have you already made an offline bank or CDM deposit?
              </h3>
              <p
                className={
                  isDark
                    ? 'text-[13px] text-[#c0c7d5] mt-1 max-w-2xl'
                    : 'text-[13px] text-[#414754] mt-1 max-w-2xl'
                }
              >
                Bank slip verifications are cleared manually by tenant audit personnel between 8:00
                AM and 9:00 PM daily. Check your audit queue status or contact support.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setDepositModalOpen(true)}
              className={
                isDark
                  ? 'px-4 py-2.5 rounded-lg bg-[#2f3445] hover:bg-[#33394a] text-[#dde2f8] text-[13px] font-semibold flex items-center gap-2'
                  : 'px-4 py-2.5 rounded-lg bg-white hover:bg-[#e1e7ff] text-[#101b34] text-[13px] font-semibold shadow-sm flex items-center gap-2'
              }
            >
              <span className="material-symbols-outlined text-[18px]">manage_search</span>
              <span>Track Deposit Slip Audit</span>
            </button>
          </div>
        </section>
      </main>

      {/* MODAL: Course Invite Code */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={
              isDark
                ? 'bg-[#151b2b] border border-[#2f3445] rounded-2xl max-w-md w-full p-6 shadow-2xl'
                : 'bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl'
            }
          >
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3898ff] text-[22px]">key</span>
                <h3 className="font-display-jakarta text-[16px] font-bold">
                  Enter Course Invitation Code
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInviteModalOpen(false)}
                aria-label="Close modal"
                className="p-1 rounded-full opacity-70 hover:opacity-100"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-[13px] opacity-80 mb-4">
              Enter the 8-character token provided on your tuition master&apos;s admission receipt
              or SMS notification.
            </p>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="e.g. APX-2026-MTH"
                required
                className={
                  isDark
                    ? 'w-full px-4 py-2.5 rounded-lg bg-[#080e1d] border border-[#2f3445] text-white font-mono font-bold tracking-widest text-center uppercase focus:outline-none focus:border-[#3898ff]'
                    : 'w-full px-4 py-2.5 rounded-lg bg-[#f2f3ff] border border-[#c1c6d6] text-[#101b34] font-mono font-bold tracking-widest text-center uppercase focus:outline-none focus:border-[#005ab6]'
                }
              />
              {inviteFeedback && (
                <div className="p-3 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[12px]">
                  {inviteFeedback}
                </div>
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className={
                    isDark
                      ? 'px-4 py-2 rounded-lg bg-[#242a3a] text-[#dde2f8] text-[13px] font-semibold'
                      : 'px-4 py-2 rounded-lg bg-[#eaedff] text-[#101b34] text-[13px] font-semibold'
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={
                    isDark
                      ? 'px-5 py-2 rounded-lg bg-[#3898ff] text-[#002f5b] text-[13px] font-bold'
                      : 'px-5 py-2 rounded-lg bg-[#005ab6] text-white text-[13px] font-semibold'
                  }
                >
                  Activate Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Offline Deposit Slip Notice */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className={
              isDark
                ? 'bg-[#151b2b] border border-[#2f3445] rounded-2xl max-w-md w-full p-6 shadow-2xl'
                : 'bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl'
            }
          >
            <div className="flex items-center justify-between pb-3">
              <h3 className="font-display-jakarta text-[16px] font-bold">
                Offline Bank Deposit Slip Audit
              </h3>
              <button
                type="button"
                onClick={() => setDepositModalOpen(false)}
                aria-label="Close modal"
                className="p-1 rounded-full opacity-70 hover:opacity-100"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-[13px] opacity-80 mb-5">
              Bank Slip &amp; Tuition Payment Portal upload workflows are not yet provisioned in
              Phase 1 (missing Stitch reference screen and backend storage endpoint).
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDepositModalOpen(false)}
                className={
                  isDark
                    ? 'px-5 py-2 rounded-lg bg-[#3898ff] text-[#002f5b] text-[13px] font-bold'
                    : 'px-5 py-2 rounded-lg bg-[#005ab6] text-white text-[13px] font-semibold'
                }
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
