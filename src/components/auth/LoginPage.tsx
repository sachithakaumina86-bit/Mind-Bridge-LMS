import React, { useState } from 'react';
import {
  LoginRoleTab,
  requestPasswordReset,
  signInSuperAdminWithCredentials,
  signInWithCredentials,
  validateEmail,
} from '../../services/authService';

interface LoginPageProps {
  mode?: 'standard' | 'super_admin';
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: 'en' | 'si';
  onToggleLang: (lang: 'en' | 'si') => void;
  onNavigate: (path: string) => void;
  onFutureStageAction: (label: string) => void;
}

const LOGO_SRC = '/assets/aistudio/Blue_and_Gold_Learning_Emblem_fd28f21b.png';

export const LoginPage: React.FC<LoginPageProps> = ({
  mode = 'standard',
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  onNavigate,
  onFutureStageAction,
}) => {
  const isSuperAdmin = mode === 'super_admin';
  const [showNotice, setShowNotice] = useState(true);
  const [roleTab, setRoleTab] = useState<LoginRoleTab>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const [fieldErrors, setFieldErrors] = useState<{
    identifier?: string;
    password?: string;
    resetEmail?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<{ message: string; details?: string } | null>(
    null
  );

  const roleBadgeLabel =
    roleTab === 'student'
      ? 'Learner'
      : roleTab === 'teacher'
        ? 'Teacher / Staff'
        : roleTab === 'super_admin'
          ? 'Super Admin'
          : 'Tenant Admin';

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const errors: { identifier?: string; password?: string } = {};

    if (isSuperAdmin) {
      if (!validateEmail(identifier)) {
        errors.identifier = 'Please enter a valid Super Admin email address.';
      }
    } else if (!identifier.trim()) {
      errors.identifier = 'Please enter your Email, Student ID, NIC, or Mobile number.';
    } else if (identifier.includes('@') && !validateEmail(identifier)) {
      errors.identifier = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = isSuperAdmin
        ? await signInSuperAdminWithCredentials({
            email: identifier.trim(),
            password,
          })
        : await signInWithCredentials({
            identifier: identifier.trim(),
            password,
            roleHint: roleTab,
            rememberDevice,
          });
      if (!result.ok) {
        setServerError({ message: result.message, details: result.details });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validateEmail(resetEmail)) {
      setFieldErrors({ resetEmail: 'Please enter a valid registered email address.' });
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const result = await requestPasswordReset({ email: resetEmail.trim() });
      if (!result.ok) {
        setServerError({ message: result.message, details: result.details });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* ==================== DESKTOP LOGIN (LIGHT & DARK) ==================== */}
      <div
        className={`hidden md:flex flex-col min-h-screen font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${
          isDark
            ? 'bg-[#080d1a] text-[#e2e8f0]'
            : 'bg-[#f4f7fb] text-[#0c1a3a]'
        }`}
      >
        {/* Fixed Header */}
        <header
          className={`sticky top-0 z-50 h-16 px-8 flex items-center justify-between border-b backdrop-blur-xl ${
            isDark
              ? 'bg-[#0b1121]/90 border-slate-800/80'
              : 'bg-white/90 border-slate-200/80'
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 text-left"
          >
            <img
              src={LOGO_SRC}
              alt="MindBridge LMS Logo"
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none">
                MindBridge LMS
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-widest mt-0.5 ${
                  isDark ? 'text-sky-400' : 'text-[#005ab6]'
                }`}
              >
                Multi-Tenant Education Gateway
              </span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <div
              className={`flex items-center rounded-lg p-0.5 border text-xs font-semibold ${
                isDark
                  ? 'bg-slate-900 border-slate-700'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lang === 'en'
                    ? isDark
                      ? 'bg-[#1a73e8] text-white'
                      : 'bg-white text-[#005ab6] shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('si')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  lang === 'si'
                    ? isDark
                      ? 'bg-[#1a73e8] text-white'
                      : 'bg-white text-[#005ab6] shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                සිංහල
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onFutureStageAction('Help & Support')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isDark
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Help &amp; Support
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isDark
                  ? 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'bg-[#005ab6] text-white hover:bg-[#004896]'
              }`}
            >
              Back to Website
            </button>
          </div>
        </header>

        {/* Dismissible Regional Notice Strip */}
        {showNotice && (
          <div
            className={`px-8 py-2 text-xs flex items-center justify-between border-b ${
              isDark
                ? 'bg-[#0f172a] border-slate-800 text-slate-300'
                : 'bg-[#eaf2ff] border-blue-200/70 text-[#0b2a5b]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">Sri Lanka Standard Time (GMT+5:30)</span>
              <span className="opacity-70">•</span>
              <span>
                Colombo Edge Node (SL-Zone 01) active • TLS 1.3 &amp; PDPA Act No. 9 of 2022 Protected
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowNotice(false)}
              aria-label="Dismiss notice"
              className="opacity-70 hover:opacity-100 flex items-center"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* Main 2-Column Split Screen */}
        <main className="flex-1 grid grid-cols-12 max-w-[1440px] w-full mx-auto px-8 py-8 gap-8 items-stretch">
          {/* Left Column: Brand Prestige Showcase */}
          <section
            className={`col-span-6 rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden border ${
              isDark
                ? 'bg-gradient-to-br from-[#0e1930] via-[#0c1428] to-[#080d1a] border-slate-800/90'
                : 'bg-gradient-to-br from-[#003b7a] via-[#0050a3] to-[#00295c] text-white border-[#00458f]'
            }`}
          >
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-sky-200 border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Multi-Tenant Learning Grid
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/10 text-sky-100">
                  SL-Zone 01
                </span>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-2.5 border border-white/15 flex items-center justify-center">
                  <img
                    src={LOGO_SRC}
                    alt="MindBridge Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-sky-200 font-bold">
                    Official Access Portal
                  </p>
                  <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mt-1">
                    One Bridge. Many Learning Journeys.
                  </h1>
                </div>
              </div>

              <p className="text-sm text-sky-100/85 leading-relaxed max-w-lg">
                Sign in with your universal MindBridge credentials to access verified Sri Lankan
                academies, live streams, DRM-protected recordings, and direct bank slip verification
                records.
              </p>

              {/* 3 Feature Badges */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/8 border border-white/10">
                  <span className="material-symbols-outlined text-sky-300 text-[22px] mt-0.5">
                    verified_user
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Single Global Student Account
                    </h3>
                    <p className="text-xs text-sky-100/75">
                      One verified identity works across all enrolled tuition masters and institutes
                      with strict tenant data isolation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/8 border border-white/10">
                  <span className="material-symbols-outlined text-emerald-300 text-[22px] mt-0.5">
                    shield_lock
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Server-Verified Role Authorization
                    </h3>
                    <p className="text-xs text-sky-100/75">
                      Session tokens and tenant memberships are validated server-side against
                      PostgreSQL records.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/8 border border-white/10">
                  <span className="material-symbols-outlined text-amber-300 text-[22px] mt-0.5">
                    translate
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Trilingual National Infrastructure
                    </h3>
                    <p className="text-xs text-sky-100/75">
                      Native Sinhala, Tamil, and English academic workflows optimized for Dialog,
                      SLT-Mobitel, and Hutch networks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metrics & PDPA */}
            <div className="relative z-10 pt-8 mt-6 border-t border-white/15 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-extrabold text-white">140+</div>
                  <div className="text-[11px] text-sky-200/80">Verified Academies</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-300">99.98%</div>
                  <div className="text-[11px] text-sky-200/80">Stream Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-amber-300">420K+</div>
                  <div className="text-[11px] text-sky-200/80">Active Learners</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-sky-200/75">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">gavel</span>
                  PDPA Act No. 9 of 2022 Compliant
                </span>
                <span>ISO/IEC 27001 Aligned</span>
              </div>
            </div>
          </section>

          {/* Right Column: Secure Access Terminal */}
          <section
            className={`col-span-6 rounded-2xl p-8 lg:p-10 border flex flex-col justify-between ${
              isDark
                ? 'bg-[#0f172a] border-slate-800 shadow-2xl'
                : 'bg-white border-slate-200/90 shadow-lg shadow-slate-200/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-sky-400' : 'text-[#005ab6]'
                    }`}
                  >
                    {isSuperAdmin ? 'Restricted Super Admin Terminal' : 'Secure Access Terminal'}
                  </span>
                  <h2 className="text-2xl font-extrabold tracking-tight mt-0.5">
                    {isForgotMode
                      ? 'Reset Account Password'
                      : isSuperAdmin
                        ? 'Super Admin Sign In'
                        : 'Welcome Back'}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    isDark
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  256-bit TLS
                </span>
              </div>

              {!isForgotMode ? (
                <>
                  {/* 3-Tab Role Selector (Standard Login Only) */}
                  {!isSuperAdmin && (
                    <div
                      className={`grid grid-cols-3 gap-1.5 p-1 rounded-xl mb-6 ${
                        isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100'
                      }`}
                    >
                      {(
                        [
                          { id: 'student', label: 'Learner / Student', icon: 'school' },
                          { id: 'teacher', label: 'Teacher / Staff', icon: 'co_present' },
                          { id: 'admin', label: 'Tenant Admin', icon: 'admin_panel_settings' },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setRoleTab(tab.id)}
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-bold transition-all ${
                            roleTab === tab.id
                              ? isDark
                                ? 'bg-[#1a73e8] text-white shadow-sm'
                                : 'bg-white text-[#005ab6] shadow-sm'
                              : isDark
                                ? 'text-slate-400 hover:text-slate-200'
                                : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                          <span className="truncate">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Integration / Server Error Banner */}
                  {serverError && (
                    <div
                      role="alert"
                      className={`mb-5 p-4 rounded-xl border text-xs space-y-1 ${
                        isDark
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                          : 'bg-amber-50 border-amber-300 text-amber-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold">
                        <span className="material-symbols-outlined text-[18px]">info</span>
                        <span>Authentication Integration Required</span>
                      </div>
                      <p>{serverError.message}</p>
                      {serverError.details && (
                        <p className="opacity-80 font-mono text-[11px]">{serverError.details}</p>
                      )}
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="desktop-login-id"
                          className="text-xs font-bold tracking-wide"
                        >
                          {isSuperAdmin
                            ? 'Super Admin Email Address'
                            : 'Email Address or Student / Staff ID'}
                        </label>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            isDark
                              ? 'bg-sky-500/15 text-sky-300'
                              : 'bg-blue-50 text-[#005ab6]'
                          }`}
                        >
                          {isSuperAdmin ? 'Super Admin Only' : roleBadgeLabel}
                        </span>
                      </div>
                      <div
                        className={`flex items-center rounded-xl border px-3.5 h-12 transition-colors ${
                          fieldErrors.identifier
                            ? 'border-red-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 focus-within:border-sky-400'
                              : 'bg-slate-50 border-slate-300 focus-within:border-[#005ab6]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px] opacity-60 mr-2.5">
                          mail
                        </span>
                        <input
                          id="desktop-login-id"
                          type={isSuperAdmin ? 'email' : 'text'}
                          value={identifier}
                          onChange={(e) => {
                            setIdentifier(e.target.value);
                            setFieldErrors((prev) => ({ ...prev, identifier: undefined }));
                          }}
                          placeholder={
                            isSuperAdmin
                              ? 'superadmin@yourdomain.lk'
                              : 'e.g. kavindu@student.lk or 200612345678'
                          }
                          autoComplete={isSuperAdmin ? 'email' : 'username'}
                          className="w-full bg-transparent text-sm focus:outline-none"
                        />
                      </div>
                      {fieldErrors.identifier && (
                        <p className="text-xs text-red-500 mt-1">{fieldErrors.identifier}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="desktop-login-password"
                          className="text-xs font-bold tracking-wide"
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotMode(true);
                            setServerError(null);
                            setFieldErrors({});
                          }}
                          className={`text-xs font-semibold hover:underline ${
                            isDark ? 'text-sky-400' : 'text-[#005ab6]'
                          }`}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div
                        className={`flex items-center rounded-xl border px-3.5 h-12 transition-colors ${
                          fieldErrors.password
                            ? 'border-red-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 focus-within:border-sky-400'
                              : 'bg-slate-50 border-slate-300 focus-within:border-[#005ab6]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px] opacity-60 mr-2.5">
                          lock
                        </span>
                        <input
                          id="desktop-login-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setFieldErrors((prev) => ({ ...prev, password: undefined }));
                          }}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          className="w-full bg-transparent text-sm focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="opacity-70 hover:opacity-100 ml-2 flex items-center"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {fieldErrors.password && (
                        <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberDevice}
                          onChange={(e) => setRememberDevice(e.target.checked)}
                          className="rounded border-slate-400 accent-[#005ab6]"
                        />
                        <span>Remember this device</span>
                      </label>
                      <span className="text-[11px] opacity-70 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Colombo Node
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-[#005ab6] hover:bg-[#004896] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">
                            progress_activity
                          </span>
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Portal</span>
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* SSO Divider & Options (Standard Login Only) */}
                  {!isSuperAdmin && (
                    <>
                      <div className="my-5 flex items-center gap-3">
                        <div
                          className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
                        />
                        <span className="text-[11px] uppercase tracking-wider opacity-60 font-semibold">
                          Institutional &amp; Fast Access
                        </span>
                        <div
                          className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => onFutureStageAction('SL Education ID SSO')}
                          className={`h-10 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 hover:bg-slate-800'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[17px]">badge</span>
                          SL Education ID
                        </button>
                        <button
                          type="button"
                          onClick={() => onFutureStageAction('Tenant QR Key')}
                          className={`h-10 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 hover:bg-slate-800'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[17px]">qr_code_2</span>
                          Tenant QR Key
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                /* Forgot Password Flow */
                <form onSubmit={handleResetSubmit} noValidate className="space-y-4">
                  <p className="text-sm opacity-80">
                    Enter your registered MindBridge email address. Once live Firebase
                    Authentication is connected, a secure password reset link will be sent to your
                    inbox.
                  </p>

                  {serverError && (
                    <div
                      role="alert"
                      className={`p-4 rounded-xl border text-xs space-y-1 ${
                        isDark
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                          : 'bg-amber-50 border-amber-300 text-amber-900'
                      }`}
                    >
                      <div className="font-bold">{serverError.message}</div>
                      {serverError.details && (
                        <div className="opacity-80 font-mono text-[11px]">
                          {serverError.details}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="desktop-reset-email"
                      className="block text-xs font-bold mb-1.5"
                    >
                      Registered Email Address
                    </label>
                    <input
                      id="desktop-reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        setFieldErrors({});
                      }}
                      placeholder="name@example.lk"
                      className={`w-full h-12 rounded-xl border px-3.5 text-sm focus:outline-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 focus:border-sky-400'
                          : 'bg-slate-50 border-slate-300 focus:border-[#005ab6]'
                      }`}
                    />
                    {fieldErrors.resetEmail && (
                      <p className="text-xs text-red-500 mt-1">{fieldErrors.resetEmail}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(false);
                        setServerError(null);
                        setFieldErrors({});
                      }}
                      className={`h-11 px-4 rounded-xl border text-xs font-bold ${
                        isDark
                          ? 'border-slate-700 hover:bg-slate-800'
                          : 'border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Back to Login
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-11 rounded-xl bg-[#005ab6] hover:bg-[#004896] text-white text-xs font-bold"
                    >
                      {isSubmitting ? 'Processing...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Registration Links & Helper Card */}
            <div className="pt-6 mt-6 border-t border-slate-200/70 dark:border-slate-800 space-y-3">
              {!isSuperAdmin ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => onNavigate('/register/student')}
                      className={`font-bold hover:underline flex items-center gap-1 ${
                        isDark ? 'text-sky-400' : 'text-[#005ab6]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">person_add</span>
                      Create Student Account
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('/apply/academy')}
                      className={`font-bold hover:underline flex items-center gap-1 ${
                        isDark ? 'text-amber-400' : 'text-[#8a5a00]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">apartment</span>
                      Onboard Institute / Teacher
                    </button>
                  </div>
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center justify-between ${
                      isDark ? 'bg-slate-900/90 text-slate-300' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>
                      <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                        First time here?
                      </strong>{' '}
                      One global student account works across all MindBridge academies.
                    </span>
                  </div>
                </>
              ) : (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center justify-between gap-2 ${
                    isDark ? 'bg-slate-900/90 text-slate-300' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                      Standard User?
                    </strong>{' '}
                    Students, Teachers, and Tenant Admins must sign in via the standard portal.
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/login')}
                    className={`shrink-0 font-bold hover:underline ${
                      isDark ? 'text-sky-400' : 'text-[#005ab6]'
                    }`}
                  >
                    Standard Login
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Regional CDN Footer Bar */}
        <footer
          className={`px-8 py-3 text-[11px] flex items-center justify-between border-t ${
            isDark
              ? 'bg-[#0b1121] border-slate-800 text-slate-400'
              : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <span>© 2025 MindBridge Education Technologies (Pvt) Ltd. Sri Lanka.</span>
          <span>Colombo Edge CDN • Zero-Trust Multi-Tenant Gateway</span>
        </footer>
      </div>

      {/* ==================== MOBILE LOGIN (LIGHT & DARK) ==================== */}
      <div
        className={`flex md:hidden flex-col min-h-screen font-['Plus_Jakarta_Sans',sans-serif] ${
          isDark ? 'bg-[#0b1121] text-[#e2e8f0]' : 'bg-[#faf8ff] text-[#101b34]'
        }`}
      >
        {/* Mobile Header */}
        <header
          className={`sticky top-0 z-50 h-16 px-4 flex items-center justify-between border-b backdrop-blur-xl ${
            isDark
              ? 'bg-[#0b1121]/90 border-slate-800'
              : 'bg-[#faf8ff]/90 border-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              aria-label="Back to website"
              className="w-10 h-10 rounded-lg flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <img src={LOGO_SRC} alt="MindBridge LMS" className="h-7 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight">MindBridge</span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isDark ? 'text-sky-400' : 'text-[#005ab6]'
                }`}
              >
                {isDark ? 'A/L 2026 Batch Active' : 'Authentication Login'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <span
              className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                isDark
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-[#e1e7ff] text-[#005ab6]'
              }`}
            >
              <span className="material-symbols-outlined text-[12px]">lock</span>
              SSL
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 space-y-4 pb-10">
          {/* Trust / Welcome Card */}
          <div
            className={`rounded-2xl p-4 border ${
              isDark
                ? 'bg-[#151d32] border-slate-800'
                : 'bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
              <span className={isDark ? 'text-sky-400' : 'text-[#005ab6]'}>
                Colombo Gateway • SL-Zone 01
              </span>
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Verified
              </span>
            </div>
            <h1 className="text-xl font-extrabold">
              {isForgotMode
                ? 'Reset Password'
                : isSuperAdmin
                  ? 'Super Admin Sign In'
                  : 'Access Campus'}
            </h1>
            <p className="text-xs opacity-75 mt-0.5">
              {isSuperAdmin
                ? 'Restricted platform administrator access. Email and password only.'
                : 'Sign in with your MindBridge Learner, Teacher, or Admin credentials.'}
            </p>
          </div>

          {/* Role Pills (Standard Login Only) */}
          {!isForgotMode && !isSuperAdmin && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(
                [
                  { id: 'student', label: 'Student Portal' },
                  { id: 'teacher', label: 'Teacher / Tutor' },
                  { id: 'admin', label: 'Tenant Admin' },
                ] as const
              ).map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setRoleTab(pill.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    roleTab === pill.id
                      ? 'bg-[#005ab6] text-white shadow-sm'
                      : isDark
                        ? 'bg-[#151d32] text-slate-300 border border-slate-800'
                        : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          )}

          {/* Error Banner */}
          {serverError && (
            <div
              role="alert"
              className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                isDark
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <div className="font-bold">{serverError.message}</div>
              {serverError.details && (
                <div className="opacity-80 font-mono text-[11px]">{serverError.details}</div>
              )}
            </div>
          )}

          {/* Mobile Form Card */}
          <div
            className={`rounded-2xl p-4 border ${
              isDark
                ? 'bg-[#151d32] border-slate-800'
                : 'bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            {!isForgotMode ? (
              <form onSubmit={handleLoginSubmit} noValidate className="space-y-3.5">
                <div>
                  <label htmlFor="mobile-login-id" className="block text-xs font-bold mb-1">
                    {isSuperAdmin
                      ? 'Super Admin Email Address'
                      : 'Student ID / Email / NIC / Mobile'}
                  </label>
                  <input
                    id="mobile-login-id"
                    type={isSuperAdmin ? 'email' : 'text'}
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, identifier: undefined }));
                    }}
                    placeholder={
                      isSuperAdmin ? 'superadmin@yourdomain.lk' : 'e.g. kavindu@student.lk'
                    }
                    className={`w-full h-11 rounded-xl border px-3 text-sm focus:outline-none ${
                      fieldErrors.identifier
                        ? 'border-red-500'
                        : isDark
                          ? 'bg-[#0b1121] border-slate-700'
                          : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                  {fieldErrors.identifier && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.identifier}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="mobile-login-password" className="text-xs font-bold">
                      Security Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setServerError(null);
                      }}
                      className={`text-xs font-semibold ${
                        isDark ? 'text-sky-400' : 'text-[#005ab6]'
                      }`}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div
                    className={`flex items-center h-11 rounded-xl border px-3 ${
                      fieldErrors.password
                        ? 'border-red-500'
                        : isDark
                          ? 'bg-[#0b1121] border-slate-700'
                          : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <input
                      id="mobile-login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFieldErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="Enter password"
                      className="w-full bg-transparent text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="opacity-70 ml-2 flex items-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
                  )}
                </div>

                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="accent-[#005ab6]"
                  />
                  <span>Keep me verified on this device</span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 rounded-xl bg-[#005ab6] text-white font-bold text-sm flex items-center justify-center gap-1.5"
                >
                  <span>{isSubmitting ? 'Verifying...' : 'Sign In to MindBridge'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} noValidate className="space-y-3">
                <label htmlFor="mobile-reset-email" className="block text-xs font-bold">
                  Registered Email Address
                </label>
                <input
                  id="mobile-reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@example.lk"
                  className={`w-full h-11 rounded-xl border px-3 text-sm ${
                    isDark ? 'bg-[#0b1121] border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                />
                {fieldErrors.resetEmail && (
                  <p className="text-xs text-red-500">{fieldErrors.resetEmail}</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(false)}
                    className="flex-1 h-10 rounded-xl border text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-[#005ab6] text-white text-xs font-bold"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Registration Links Card (Standard Login Only) */}
          {!isSuperAdmin && (
            <div
              className={`rounded-2xl p-4 border space-y-2.5 ${
                isDark
                  ? 'bg-[#151d32] border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="text-xs font-bold opacity-80">New to MindBridge LMS?</div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onNavigate('/register/student')}
                  className="h-10 rounded-xl bg-[#005ab6]/10 text-[#005ab6] dark:text-sky-400 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">person_add</span>
                  Register Student
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/apply/academy')}
                  className="h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">apartment</span>
                  Register Academy
                </button>
              </div>
            </div>
          )}

          {/* SL-CERT Footnote */}
          <p className="text-center text-[11px] opacity-60 pt-2">
            SL-CERT ISO/IEC 27001 • PDPA Act No. 9 of 2022 Protected
          </p>
        </main>
      </div>
    </div>
  );
};
