import React, { useState } from 'react';
import type { StudentPortalCommonProps } from './types';

export const StudentMultiAcademyHub: React.FC<StudentPortalCommonProps> = ({
  theme,
  lang,
  profile,
  activeTenant,
  onSelectTenant,
  onActionNotice,
}) => {
  const isDark = theme === 'dark';
  const [courseFilter, setCourseFilter] = useState<'theory' | 'revision' | 'paper'>('theory');
  const [copilotPrompt, setCopilotPrompt] = useState('');

  const activeName = activeTenant?.tenantName ?? 'Active Academy';
  const activeDomain = activeTenant?.subdomain
    ? `${activeTenant.subdomain}.mindbridge.lk`
    : 'mindbridge.lk';

  const handleCopilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onActionNotice('Doubt Solver (Gemini AI Study Companion)');
  };

  return (
    <div className="flex flex-col w-full">
      {/* ===================================================================== */}
      {/* DESKTOP VIEW (lg+) — Primary Light (_2) & Primary Dark (_1)           */}
      {/* ===================================================================== */}
      <div className="hidden lg:flex flex-col w-full pt-6">
        {/* Multi-Tenant Master Context Banner */}
        <section
          className={
            isDark
              ? 'w-full bg-[#151b2b] border border-[#1f283d] rounded-xl shadow-sm p-6 mb-6'
              : 'w-full bg-white rounded-xl shadow-sm p-6 mb-6'
          }
        >
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Current Tenant Identification */}
            <div className="flex items-center gap-4 min-w-0">
              <div
                className={
                  isDark
                    ? 'w-14 h-14 rounded-xl bg-[#3898ff]/20 border border-[#3898ff]/40 text-[#3898ff] flex items-center justify-center shadow-md shrink-0'
                    : 'w-14 h-14 rounded-xl bg-[#0072e4] text-white flex items-center justify-center shadow-md shrink-0'
                }
              >
                <span className="material-symbols-outlined text-[32px]">functions</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={
                      isDark
                        ? 'text-[10px] uppercase tracking-wider text-[#3898ff] font-bold px-2 py-0.5 rounded bg-[#3898ff]/10 border border-[#3898ff]/20'
                        : 'text-[11px] uppercase tracking-wider text-[#00458f] font-bold px-2 py-0.5 rounded bg-[#d7e3ff]'
                    }
                  >
                    Active Academy
                  </span>
                  <span className="opacity-50">•</span>
                  <span
                    className={
                      isDark
                        ? 'text-[11px] text-[#94a3b8] font-mono'
                        : 'text-[11px] text-[#414754] font-mono'
                    }
                  >
                    {activeDomain}
                  </span>
                  {activeTenant?.status && (
                    <>
                      <span className="opacity-50">•</span>
                      <span
                        className={
                          isDark
                            ? 'text-[11px] text-[#10b981] font-semibold uppercase'
                            : 'text-[11px] text-[#005ab6] font-semibold uppercase'
                        }
                      >
                        {activeTenant.status}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="font-display-jakarta text-[22px] font-semibold truncate mt-0.5">
                  {activeName}
                </h1>
                <p
                  className={
                    isDark
                      ? 'text-[12px] text-[#94a3b8] flex items-center gap-2'
                      : 'text-[12px] text-[#414754] flex items-center gap-2'
                  }
                >
                  <span>
                    Authenticated Learner:{' '}
                    <strong className={isDark ? 'text-[#f1f5f9]' : 'text-[#101b34]'}>
                      {profile.fullName}
                    </strong>
                  </span>
                  <span className="opacity-40">•</span>
                  <span className={isDark ? 'text-[#10b981] font-medium' : 'text-[#7f5300] font-medium'}>
                    Role: {activeTenant?.role ?? profile.role}
                  </span>
                </p>
              </div>
            </div>

            {/* Cross-Tenant Isolation Guarantee */}
            <div
              className={
                isDark
                  ? 'flex items-center gap-3 bg-[#0d1322] border border-[#1f283d] px-4 py-2.5 rounded-lg max-w-md'
                  : 'flex items-center gap-3 bg-[#f2f3ff] px-4 py-2.5 rounded-lg max-w-md'
              }
            >
              <span
                className={
                  isDark
                    ? 'material-symbols-outlined text-[#3898ff] text-[22px] shrink-0'
                    : 'material-symbols-outlined text-[#005ab6] text-[22px] shrink-0'
                }
              >
                shield_lock
              </span>
              <p
                className={
                  isDark
                    ? 'text-[11px] text-[#94a3b8] leading-snug'
                    : 'text-[11px] text-[#414754] leading-snug'
                }
              >
                <strong className={isDark ? 'text-[#f1f5f9]' : 'text-[#101b34]'}>
                  Universal Learner Pass:
                </strong>{' '}
                Enrolled across {profile.memberships.length}{' '}
                {profile.memberships.length === 1 ? 'institution' : 'independent institutions'}.
                Your progress, report cards, and bank payment slips remain 100% tenant-isolated.
              </p>
            </div>
          </div>

          {/* Academy Fast Switcher Strip */}
          <div
            className={
              isDark
                ? 'mt-4 pt-4 border-t border-[#1f283d] flex flex-col md:flex-row md:items-center justify-between gap-3'
                : 'mt-4 pt-4 border-t border-[#eaedff] flex flex-col md:flex-row md:items-center justify-between gap-3'
            }
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={
                  isDark
                    ? 'text-[10px] text-[#64748b] font-bold uppercase tracking-wider mr-1'
                    : 'text-[11px] text-[#717785] font-semibold uppercase tracking-wider mr-1'
                }
              >
                Enrolled Academies:
              </span>
              {profile.memberships.map((m) => {
                const isSelected = activeTenant?.tenantId === m.tenantId;
                return (
                  <button
                    key={m.tenantId}
                    type="button"
                    onClick={() => onSelectTenant(m.tenantId)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-[#3898ff] text-white font-semibold shadow-sm'
                          : 'bg-[#005ab6] text-white font-semibold shadow-sm'
                        : isDark
                          ? 'bg-[#1e2638] border border-[#1f283d] text-[#f1f5f9] hover:border-[#3898ff]/40'
                          : 'bg-[#eaedff] text-[#101b34] hover:bg-[#e1e7ff]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isSelected ? 'check_circle' : 'domain'}
                    </span>
                    <span>{m.tenantName}</span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => onActionNotice('Add Institute Code / QR')}
                className={
                  isDark
                    ? 'flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0d1322] border border-[#1f283d] text-[#3898ff] hover:bg-[#1e2638] text-[12px] font-medium transition-all'
                    : 'flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f2f3ff] text-[#005ab6] hover:bg-[#eaedff] text-[12px] font-medium transition-all'
                }
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>+ Add Institute Code / QR</span>
              </button>
            </div>

            <div
              className={
                isDark
                  ? 'flex items-center gap-1.5 text-[#94a3b8] text-[11px]'
                  : 'flex items-center gap-1.5 text-[#414754] text-[11px]'
              }
            >
              <span className="material-symbols-outlined text-[16px] opacity-70">translate</span>
              <span className={isDark ? 'text-[#f1f5f9] font-medium' : 'text-[#101b34] font-medium'}>
                {lang === 'si' ? 'සිංහල මාධ්‍යය සක්‍රීයයි' : 'ද්විභාෂා සක්‍රීයයි (Bilingual Active)'}
              </span>
            </div>
          </div>
        </section>

        {/* Metric Ribbon & Student Overview (4-column KPI strip) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Momentum Streak',
              value: '--',
              unit: 'Days Active',
              sub: 'Synced when lesson telemetry connects',
              icon: 'local_fire_department',
              accent: isDark
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                : 'bg-[#ffddb4] text-[#7f5300]',
            },
            {
              label: 'Weekly Watch Time',
              value: '--',
              unit: '/ 20h',
              sub: 'Recorded & live session hours',
              icon: 'timelapse',
              accent: isDark
                ? 'bg-[#3898ff]/10 border border-[#3898ff]/20 text-[#3898ff]'
                : 'bg-[#e1e7ff] text-[#005ab6]',
            },
            {
              label: 'Course Progress',
              value: '--',
              unit: 'Units',
              sub: `Scoped to ${activeName}`,
              icon: 'donut_large',
              accent: isDark
                ? 'bg-[#3898ff]/10 border border-[#3898ff]/20 text-[#3898ff]'
                : 'bg-[#e1e7ff] text-[#4d5c8e]',
            },
            {
              label: 'District Model Rank',
              value: '--',
              unit: 'Cohort',
              sub: 'Updated after graded mock exams',
              icon: 'leaderboard',
              accent: isDark
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                : 'bg-[#dbe1ff] text-[#041847]',
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className={
                isDark
                  ? 'bg-[#151b2b] border border-[#1f283d] p-4 rounded-xl shadow-sm flex items-center justify-between'
                  : 'bg-white p-4 rounded-xl shadow-sm flex items-center justify-between'
              }
            >
              <div className="min-w-0 pr-2">
                <span
                  className={
                    isDark
                      ? 'text-[10px] text-[#64748b] font-bold uppercase tracking-wider block'
                      : 'text-[11px] text-[#717785] font-semibold uppercase tracking-wider block'
                  }
                >
                  {metric.label}
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-display-jakarta text-[26px] font-bold">{metric.value}</span>
                  <span
                    className={
                      isDark ? 'text-[12px] text-[#94a3b8]' : 'text-[12px] text-[#414754]'
                    }
                  >
                    {metric.unit}
                  </span>
                </div>
                <span
                  className={
                    isDark
                      ? 'text-[11px] text-[#94a3b8] block mt-1 truncate'
                      : 'text-[11px] text-[#414754] block mt-1 truncate'
                  }
                >
                  {metric.sub}
                </span>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${metric.accent}`}
              >
                <span className="material-symbols-outlined text-[28px]">{metric.icon}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Live Lecture Broadcast Hero Card */}
        <section
          className={
            isDark
              ? 'w-full bg-[#151b2b] border border-[#1f283d] rounded-xl shadow-lg p-6 mb-8 relative overflow-hidden'
              : 'w-full bg-gradient-to-br from-white to-[#f2f3ff] rounded-xl shadow-md p-6 mb-8 relative overflow-hidden'
          }
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={
                    isDark
                      ? 'px-2.5 py-0.5 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] text-[10px] font-bold tracking-wider uppercase'
                      : 'px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold tracking-wider uppercase'
                  }
                >
                  Live Virtual Classes
                </span>
                <span className={isDark ? 'text-[11px] text-[#94a3b8]' : 'text-[11px] text-[#414754]'}>
                  {activeName}
                </span>
              </div>
              <h2 className="font-display-jakarta text-[24px] font-bold leading-snug">
                No Live Broadcast Currently Scheduled
              </h2>
              <p
                className={
                  isDark
                    ? 'text-[14px] text-[#94a3b8] mt-1.5'
                    : 'text-[14px] text-[#414754] mt-1.5'
                }
              >
                Upcoming live sessions for {activeName} will appear here automatically once
                published by your academy instructor.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => onActionNotice('Live Virtual Classes Lobby')}
                  className={
                    isDark
                      ? 'px-5 py-2.5 rounded-lg bg-[#3898ff] hover:bg-[#3898ff]/90 text-white text-[14px] font-semibold flex items-center gap-2 shadow-md transition-all'
                      : 'px-5 py-2.5 rounded-lg bg-[#005ab6] hover:bg-[#0072e4] text-white text-[14px] font-semibold flex items-center gap-2 shadow-md transition-all'
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">podium</span>
                  <span>Enter Virtual Lecture Lobby</span>
                </button>
                <button
                  type="button"
                  onClick={() => onActionNotice('Pre-Lecture Doubt Box')}
                  className={
                    isDark
                      ? 'px-4 py-2.5 rounded-lg bg-[#0d1322] hover:bg-[#1e2638] border border-[#1f283d] text-[#3898ff] text-[14px] font-semibold flex items-center gap-2 transition-colors'
                      : 'px-4 py-2.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#005ab6] text-[14px] font-semibold flex items-center gap-2 transition-colors'
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">help_center</span>
                  <span>Pre-Lecture Doubt Box</span>
                </button>
              </div>
            </div>

            {/* Countdown Widget Shell */}
            <div
              className={
                isDark
                  ? 'bg-[#0d1322] border border-[#1f283d] p-6 rounded-xl text-center flex flex-col items-center justify-center min-w-[260px]'
                  : 'bg-white p-6 rounded-xl shadow-sm text-center flex flex-col items-center justify-center min-w-[260px]'
              }
            >
              <span
                className={
                  isDark
                    ? 'text-[10px] text-[#64748b] uppercase font-bold tracking-wider'
                    : 'text-[11px] text-[#717785] uppercase font-bold tracking-wider'
                }
              >
                Next Broadcast Countdown
              </span>
              <div className="grid grid-cols-3 gap-2 my-4 text-center">
                {['Hours', 'Mins', 'Secs'].map((unit) => (
                  <div
                    key={unit}
                    className={
                      isDark
                        ? 'bg-[#151b2b] border border-[#1f283d] p-2.5 rounded-lg min-w-[64px]'
                        : 'bg-[#f2f3ff] p-2.5 rounded-lg min-w-[64px]'
                    }
                  >
                    <span className="font-mono text-[22px] font-bold block">--</span>
                    <span className="text-[10px] opacity-70 uppercase">{unit}</span>
                  </div>
                ))}
              </div>
              <span className="text-[11px] opacity-70">Awaiting schedule sync</span>
            </div>
          </div>
        </section>

        {/* Main Split Layout: Left 8 Columns & Right 4 Columns */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left 8 Columns: Courses & Milestones */}
          <div className="xl:col-span-8 flex flex-col gap-8">
            {/* Enrolled Courses Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display-jakarta text-[18px] font-semibold">
                    Active Enrolled Courses
                  </h2>
                  <p className={isDark ? 'text-[12px] text-[#94a3b8]' : 'text-[12px] text-[#414754]'}>
                    {activeName} syllabus &amp; batch modules
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {(
                    [
                      { id: 'theory', label: 'Theory' },
                      { id: 'revision', label: 'Revision' },
                      { id: 'paper', label: 'Paper Class' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCourseFilter(tab.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                        courseFilter === tab.id
                          ? isDark
                            ? 'bg-[#1e2638] border border-[#3898ff]/40 text-[#3898ff]'
                            : 'bg-white text-[#005ab6] shadow-sm'
                          : isDark
                            ? 'text-[#94a3b8] hover:bg-[#1e2638]'
                            : 'text-[#414754] hover:bg-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={
                  isDark
                    ? 'bg-[#151b2b] border border-[#1f283d] rounded-xl p-8 text-center'
                    : 'bg-white rounded-xl shadow-sm p-8 text-center'
                }
              >
                <span
                  className={
                    isDark
                      ? 'material-symbols-outlined text-[40px] text-[#3898ff] mb-2'
                      : 'material-symbols-outlined text-[40px] text-[#005ab6] mb-2'
                  }
                >
                  school
                </span>
                <h3 className="font-display-jakarta text-[16px] font-semibold">
                  No Course Modules Loaded Yet
                </h3>
                <p
                  className={
                    isDark
                      ? 'text-[13px] text-[#94a3b8] mt-1 max-w-md mx-auto'
                      : 'text-[13px] text-[#414754] mt-1 max-w-md mx-auto'
                  }
                >
                  Course enrollment records for {activeName} will appear here once the course
                  catalog and enrollment backend endpoints are connected.
                </p>
              </div>
            </div>

            {/* Recent Academic Milestones & Badges */}
            <div
              className={
                isDark
                  ? 'bg-[#151b2b] border border-[#1f283d] p-6 rounded-xl shadow-sm'
                  : 'bg-white p-6 rounded-xl shadow-sm'
              }
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      isDark
                        ? 'material-symbols-outlined text-[#3898ff] text-[24px]'
                        : 'material-symbols-outlined text-[#005ab6] text-[24px]'
                    }
                  >
                    workspace_premium
                  </span>
                  <h3 className="font-display-jakarta text-[18px] font-semibold">
                    Recent Academic Milestones &amp; Badges
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onActionNotice('Certificates & Badges')}
                  className={
                    isDark
                      ? 'text-[12px] text-[#3898ff] hover:underline font-semibold'
                      : 'text-[12px] text-[#005ab6] hover:underline font-semibold'
                  }
                >
                  View All →
                </button>
              </div>
              <p className={isDark ? 'text-[13px] text-[#94a3b8]' : 'text-[13px] text-[#414754]'}>
                Earned badges and cryptographically signed term certificates will be listed here
                after verified exam and attendance milestones.
              </p>
            </div>
          </div>

          {/* Right 4 Columns: AI Copilot, Homework Queue, Payment Standing */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            {/* Bilingual Gemini AI Academic Copilot */}
            <div
              className={
                isDark
                  ? 'bg-[#151b2b] border border-[#1f283d] p-6 rounded-xl shadow-sm'
                  : 'bg-white p-6 rounded-xl shadow-sm'
              }
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={
                      isDark
                        ? 'w-8 h-8 rounded-lg bg-[#3898ff]/20 border border-[#3898ff]/40 text-[#3898ff] flex items-center justify-center'
                        : 'w-8 h-8 rounded-lg bg-[#d7e3ff] text-[#005ab6] flex items-center justify-center'
                    }
                  >
                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  </div>
                  <div>
                    <h3 className="font-display-jakarta text-[15px] font-semibold leading-tight">
                      Gemini AI Academic Copilot
                    </h3>
                    <span
                      className={
                        isDark
                          ? 'text-[10px] text-[#3898ff] font-semibold uppercase tracking-wider'
                          : 'text-[10px] text-[#005ab6] font-semibold uppercase tracking-wider'
                      }
                    >
                      Socratic Study Companion
                    </span>
                  </div>
                </div>
              </div>
              <p
                className={
                  isDark
                    ? 'text-[12px] text-[#94a3b8] mb-3'
                    : 'text-[12px] text-[#414754] mb-3'
                }
              >
                Ask doubts in English or Sinhala (සිංහල). Step-by-step mathematical proofs and
                equation rendering.
              </p>
              <form onSubmit={handleCopilotSubmit} className="relative">
                <input
                  type="text"
                  value={copilotPrompt}
                  onChange={(e) => setCopilotPrompt(e.target.value)}
                  placeholder="Type maths question or paste equation..."
                  className={
                    isDark
                      ? 'w-full h-11 pl-4 pr-12 rounded-lg bg-[#0d1322] border border-[#1f283d] text-[#f1f5f9] text-[13px] focus:border-[#3898ff] focus:outline-none placeholder:text-[#64748b]'
                      : 'w-full h-11 pl-4 pr-12 rounded-lg bg-[#f2f3ff] border border-[#c1c6d6] text-[#101b34] text-[13px] focus:border-[#005ab6] focus:outline-none placeholder:text-[#717785]'
                  }
                />
                <button
                  type="submit"
                  aria-label="Send prompt"
                  className={
                    isDark
                      ? 'absolute right-1.5 top-1.5 w-8 h-8 rounded-lg bg-[#3898ff] hover:bg-[#3898ff]/90 text-white flex items-center justify-center'
                      : 'absolute right-1.5 top-1.5 w-8 h-8 rounded-lg bg-[#005ab6] hover:bg-[#0072e4] text-white flex items-center justify-center'
                  }
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </div>

            {/* Homework & Quizzes */}
            <div
              className={
                isDark
                  ? 'bg-[#151b2b] border border-[#1f283d] p-6 rounded-xl shadow-sm'
                  : 'bg-white p-6 rounded-xl shadow-sm'
              }
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={
                    isDark
                      ? 'material-symbols-outlined text-amber-400 text-[22px]'
                      : 'material-symbols-outlined text-[#7f5300] text-[22px]'
                  }
                >
                  assignment
                </span>
                <h3 className="font-display-jakarta text-[16px] font-semibold">
                  Homework &amp; Quizzes
                </h3>
              </div>
              <p className={isDark ? 'text-[12px] text-[#94a3b8]' : 'text-[12px] text-[#414754]'}>
                No pending assignments or timed mock quizzes are currently assigned for {activeName}
                .
              </p>
            </div>

            {/* Payment Standing */}
            <div
              className={
                isDark
                  ? 'bg-[#151b2b] border border-[#1f283d] p-6 rounded-xl shadow-sm'
                  : 'bg-white p-6 rounded-xl shadow-sm'
              }
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      isDark
                        ? 'material-symbols-outlined text-[#3898ff] text-[22px]'
                        : 'material-symbols-outlined text-[#005ab6] text-[22px]'
                    }
                  >
                    receipt_long
                  </span>
                  <h3 className="font-display-jakarta text-[16px] font-semibold">
                    Payment Standing
                  </h3>
                </div>
              </div>
              <p
                className={
                  isDark
                    ? 'text-[12px] text-[#94a3b8] mb-4'
                    : 'text-[12px] text-[#414754] mb-4'
                }
              >
                Bank deposit slip verification and monthly tuition records for {activeName} will
                sync here.
              </p>
              <button
                type="button"
                onClick={() => onActionNotice('Bank Slips & Receipts')}
                className={
                  isDark
                    ? 'w-full py-2.5 rounded-lg bg-[#1e2638] hover:bg-[#242e44] border border-[#1f283d] text-[#f1f5f9] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors'
                    : 'w-full py-2.5 rounded-lg bg-[#eaedff] hover:bg-[#e1e7ff] text-[#101b34] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors'
                }
              >
                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                <span>Upload New Deposit Slip / CDM Voucher</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE VIEW (<lg) — Primary Mobile Light & Primary Mobile Dark        */}
      {/* ===================================================================== */}
      <div className="flex lg:hidden flex-col w-full pt-4 space-y-4">
        {/* Student Identity Capsule */}
        <section
          className={
            isDark
              ? 'w-full bg-[#191f2f] rounded-xl p-4 shadow-lg'
              : 'w-full bg-white rounded-xl p-4 shadow-sm'
          }
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-display-jakarta text-[20px] font-bold truncate">
                {profile.fullName}
              </h1>
              <p className={isDark ? 'text-[12px] text-[#c0c7d5] truncate' : 'text-[12px] text-[#414754] truncate'}>
                {profile.email}
              </p>
            </div>
            <span
              className={
                isDark
                  ? 'px-2.5 py-1 rounded-full bg-[#00ab76]/20 text-[#4edea3] text-[10px] font-bold uppercase shrink-0'
                  : 'px-2.5 py-1 rounded-full bg-[#d7e3ff] text-[#00458f] text-[11px] font-bold uppercase shrink-0'
              }
            >
              {activeTenant?.status ?? 'Verified'}
            </span>
          </div>
        </section>

        {/* Mobile Multi-Academy Switcher Carousel */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <span
                className={
                  isDark
                    ? 'material-symbols-outlined text-[#3898ff] text-[20px]'
                    : 'material-symbols-outlined text-[#005ab6] text-[20px]'
                }
              >
                domain
              </span>
              <h2 className="font-display-jakarta text-[15px] font-semibold">
                Enrolled Academies ({profile.memberships.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onActionNotice('Add Academy Token')}
              className={
                isDark
                  ? 'text-[#3898ff] text-[11px] font-semibold flex items-center gap-0.5'
                  : 'text-[#005ab6] text-[11px] font-semibold flex items-center gap-0.5'
              }
            >
              <span className="material-symbols-outlined text-[15px]">add_circle</span>
              <span>Add Academy</span>
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar snap-x snap-mandatory">
            {profile.memberships.map((m) => {
              const isSelected = activeTenant?.tenantId === m.tenantId;
              return (
                <button
                  key={m.tenantId}
                  type="button"
                  onClick={() => onSelectTenant(m.tenantId)}
                  className={`snap-start shrink-0 w-[82%] text-left rounded-xl p-4 shadow-sm relative overflow-hidden ${
                    isDark
                      ? isSelected
                        ? 'bg-[#191f2f] border border-[#3898ff]'
                        : 'bg-[#151b2b] border border-[#1f283d]'
                      : isSelected
                        ? 'bg-white border-2 border-[#005ab6]'
                        : 'bg-white border border-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={
                        isSelected
                          ? isDark
                            ? 'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#3898ff]/20 text-[#3898ff]'
                            : 'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#d7e3ff] text-[#00458f]'
                          : 'text-[10px] opacity-70 uppercase'
                      }
                    >
                      {isSelected ? 'Current Academy' : m.status}
                    </span>
                  </div>
                  <h3 className="font-display-jakarta text-[15px] font-semibold truncate">
                    {m.tenantName}
                  </h3>
                  <p className="text-[11px] opacity-70 font-mono truncate mt-0.5">
                    {m.subdomain}.mindbridge.lk
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Mobile Quick Action Grid (2x2) */}
        <section className="grid grid-cols-2 gap-2.5">
          {[
            { label: 'Bank Slips', sub: 'Upload & Cleared', icon: 'receipt_long', notice: 'Bank Slips & Receipts' },
            { label: 'Homework', sub: 'Assignments', icon: 'assignment', notice: 'Assignments & Homework' },
            { label: 'Speed Quizzes', sub: 'Ranked Drills', icon: 'timer', notice: 'Quizzes & Mock Exams' },
            { label: 'Ask Tutor AI', sub: 'Sinhala / English', icon: 'psychology', notice: 'Doubt Solver' },
          ].map((tile) => (
            <button
              key={tile.label}
              type="button"
              onClick={() => onActionNotice(tile.notice)}
              className={
                isDark
                  ? 'bg-[#151b2b] border border-[#1f283d] rounded-xl p-3 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform'
                  : 'bg-white rounded-xl p-3 flex items-center gap-2.5 text-left shadow-sm active:scale-[0.98] transition-transform'
              }
            >
              <div
                className={
                  isDark
                    ? 'w-10 h-10 rounded-lg bg-[#191f2f] text-[#3898ff] flex items-center justify-center shrink-0'
                    : 'w-10 h-10 rounded-lg bg-[#d7e3ff] text-[#005ab6] flex items-center justify-center shrink-0'
                }
              >
                <span className="material-symbols-outlined text-[20px]">{tile.icon}</span>
              </div>
              <div className="min-w-0">
                <span className="font-display-jakarta text-[14px] font-semibold block truncate">
                  {tile.label}
                </span>
                <span className="text-[11px] opacity-70 block truncate">{tile.sub}</span>
              </div>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};
