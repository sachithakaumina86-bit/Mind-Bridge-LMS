import React, { useState } from 'react';
import {
  evaluatePasswordStrength,
  registerUniversalStudent,
  validateEmail,
  validateSriLankanMobile,
} from '../../services/authService';

interface StudentRegistrationPageProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate: (path: string) => void;
}

const LOGO_SRC = '/assets/aistudio/Blue_and_Gold_Learning_Emblem_fd28f21b.png';

const ACADEMIC_STREAMS = [
  'G.C.E. A/L — Combined Mathematics',
  'G.C.E. A/L — Biological Science',
  'G.C.E. A/L — Commerce',
  'G.C.E. A/L — Engineering / Bio Technology',
  'G.C.E. A/L — Arts',
  'G.C.E. O/L — Ordinary Level',
  'Undergraduate / Professional',
];

export const StudentRegistrationPage: React.FC<StudentRegistrationPageProps> = ({
  theme,
  onToggleTheme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';

  // Form state matching Stitch Universal Student Registration fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [academicStream, setAcademicStream] = useState(ACADEMIC_STREAMS[0]);
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'si' | 'ta'>('en');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  // Mobile-specific fields present in the Mobile Stitch design
  const [sinhalaName, setSinhalaName] = useState('');
  const [nicOrBirthCert, setNicOrBirthCert] = useState('');
  const [schoolAndDistrict, setSchoolAndDistrict] = useState('');
  const [targetExamYear, setTargetExamYear] = useState('2026 A/L');
  const [guardianName, setGuardianName] = useState('');
  const [guardianWhatsApp, setGuardianWhatsApp] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<{
    code?: string;
    message: string;
    details?: string;
  } | null>(null);

  const strength = evaluatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }
    if (!validateEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!validateSriLankanMobile(mobile)) {
      nextErrors.mobile = 'Enter a valid Sri Lankan mobile number (e.g. 77 123 4567).';
    }
    if (!strength.isStrong) {
      nextErrors.password = 'Password must satisfy all 4 security requirements below.';
    }
    if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!acceptedTerms) {
      nextErrors.acceptedTerms =
        'You must agree to the MindBridge Terms of Service & PDPA Privacy Policy.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = await registerUniversalStudent({
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        academicStream,
        preferredLanguage,
        password,
        confirmPassword,
        acceptedTerms,
        whatsappOptIn,
        sinhalaName: sinhalaName.trim() || undefined,
        nicOrBirthCert: nicOrBirthCert.trim() || undefined,
        schoolAndDistrict: schoolAndDistrict.trim() || undefined,
        targetExamYear,
        guardianName: guardianName.trim() || undefined,
        guardianWhatsApp: guardianWhatsApp.trim() || undefined,
      });

      if (!result.ok) {
        setServerError({ code: result.code, message: result.message, details: result.details });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${
        isDark ? 'bg-[#080d1a] text-[#e2e8f0]' : 'bg-[#f4f7fb] text-[#0c1a3a]'
      }`}
    >
      {/* Fixed Header */}
      <header
        className={`sticky top-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between border-b backdrop-blur-xl ${
          isDark
            ? 'bg-[#0b1121]/90 border-slate-800/80'
            : 'bg-white/90 border-slate-200/80'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            aria-label="Back to website"
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left"
          >
            <img src={LOGO_SRC} alt="MindBridge LMS Logo" className="h-8 md:h-9 w-auto" />
            <div className="flex flex-col">
              <span className="font-extrabold text-sm md:text-base leading-none">
                MindBridge LMS
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                  isDark ? 'text-sky-400' : 'text-[#005ab6]'
                }`}
              >
                Universal Student Pass
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-amber-400'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
              isDark
                ? 'bg-slate-800 text-white hover:bg-slate-700'
                : 'bg-[#005ab6] text-white hover:bg-[#004896]'
            }`}
          >
            Sign In
          </button>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Hero Title */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 bg-[#005ab6]/10 text-[#005ab6] dark:bg-sky-500/15 dark:text-sky-300">
            <span className="material-symbols-outlined text-[14px]">verified_user</span>
            Universal Student Registration • Multi-Tenant Learner Pass
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Create Your Global Student Account
          </h1>
          <p className="text-sm opacity-75 mt-1.5 max-w-2xl">
            Register once with MindBridge LMS and enroll in any verified Sri Lankan tuition master
            or institute while keeping each academy&apos;s classes, invoices, and progress strictly
            separated.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left 8 Cols: Registration Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className={`lg:col-span-8 rounded-2xl p-5 md:p-8 border space-y-6 ${
              isDark
                ? 'bg-[#0f172a] border-slate-800 shadow-2xl'
                : 'bg-white border-slate-200/90 shadow-md shadow-slate-200/50'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#005ab6] dark:text-sky-400">
                  Step 1 of 1 • Global Identity
                </span>
                <h2 className="text-lg font-bold mt-0.5">Personal &amp; Academic Credentials</h2>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  isDark
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                Student Role Only
              </span>
            </div>

            {serverError && (
              <div
                role="alert"
                className={`p-4 rounded-xl border text-xs space-y-1 ${
                  serverError.code === 'FIREBASE_NOT_CONFIGURED' ||
                  serverError.code === 'BACKEND_API_NOT_CONFIGURED'
                    ? isDark
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                    : isDark
                      ? 'bg-red-950/40 border-red-500/40 text-red-200'
                      : 'bg-red-50 border-red-300 text-red-900'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">
                    {serverError.code === 'FIREBASE_NOT_CONFIGURED' ||
                    serverError.code === 'BACKEND_API_NOT_CONFIGURED'
                      ? 'info'
                      : 'error'}
                  </span>
                  <span>
                    {serverError.code === 'FIREBASE_NOT_CONFIGURED' ||
                    serverError.code === 'BACKEND_API_NOT_CONFIGURED'
                      ? 'Live Backend & Firebase Integration Required'
                      : serverError.code === 'NETWORK_ERROR'
                        ? 'Backend Connection Error'
                        : 'Registration Failed'}
                  </span>
                </div>
                <p>{serverError.message}</p>
                {serverError.details && <p className="opacity-80">{serverError.details}</p>}
              </div>
            )}

            {/* Personal Credentials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="reg-fullname" className="block text-xs font-bold mb-1.5">
                  Full Name (English / Latin) *
                </label>
                <input
                  id="reg-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="e.g. Kavindu Nirmal Perera"
                  className={`w-full h-11 rounded-xl border px-3.5 text-sm focus:outline-none ${
                    errors.fullName
                      ? 'border-red-500'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 focus:border-sky-400'
                        : 'bg-slate-50 border-slate-300 focus:border-[#005ab6]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-xs font-bold mb-1.5">
                  Email Address *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="kavindu@student.lk"
                  className={`w-full h-11 rounded-xl border px-3.5 text-sm focus:outline-none ${
                    errors.email
                      ? 'border-red-500'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 focus:border-sky-400'
                        : 'bg-slate-50 border-slate-300 focus:border-[#005ab6]'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="reg-mobile" className="block text-xs font-bold mb-1.5">
                  Sri Lankan Mobile / WhatsApp *
                </label>
                <div
                  className={`flex items-center h-11 rounded-xl border px-3 ${
                    errors.mobile
                      ? 'border-red-500'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 focus-within:border-sky-400'
                        : 'bg-slate-50 border-slate-300 focus-within:border-[#005ab6]'
                  }`}
                >
                  <span className="text-xs font-bold opacity-80 pr-2 mr-2 border-r border-slate-300 dark:border-slate-700">
                    🇱🇰 +94
                  </span>
                  <input
                    id="reg-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      setErrors((prev) => ({ ...prev, mobile: '' }));
                    }}
                    placeholder="77 123 4567"
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                </div>
                {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label htmlFor="reg-stream" className="block text-xs font-bold mb-1.5">
                  Academic Stream / Level
                </label>
                <select
                  id="reg-stream"
                  value={academicStream}
                  onChange={(e) => setAcademicStream(e.target.value)}
                  className={`w-full h-11 rounded-xl border px-3 text-sm focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  {ACADEMIC_STREAMS.map((stream) => (
                    <option key={stream} value={stream}>
                      {stream}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-bold mb-1.5">
                  Preferred UI &amp; Learning Language
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'en', label: 'English' },
                      { id: 'si', label: 'සිංහල' },
                      { id: 'ta', label: 'தமிழ்' },
                    ] as const
                  ).map((langOpt) => (
                    <button
                      key={langOpt.id}
                      type="button"
                      onClick={() => setPreferredLanguage(langOpt.id)}
                      className={`h-11 rounded-xl border text-xs font-bold transition-colors ${
                        preferredLanguage === langOpt.id
                          ? 'bg-[#005ab6] text-white border-[#005ab6]'
                          : isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-300'
                            : 'bg-slate-50 border-slate-300 text-slate-700'
                      }`}
                    >
                      {langOpt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile-only Additional Candidate Fields (from Mobile Stitch Reference) */}
            <div className="md:hidden space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-[#005ab6] dark:text-sky-400">
                Optional Candidate &amp; Guardian Details
              </div>
              <input
                type="text"
                value={sinhalaName}
                onChange={(e) => setSinhalaName(e.target.value)}
                placeholder="Name in Sinhala (Optional)"
                className={`w-full h-11 rounded-xl border px-3 text-sm ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={nicOrBirthCert}
                  onChange={(e) => setNicOrBirthCert(e.target.value)}
                  placeholder="NIC / BC No."
                  className={`w-full h-11 rounded-xl border px-3 text-sm ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                />
                <select
                  value={targetExamYear}
                  onChange={(e) => setTargetExamYear(e.target.value)}
                  className={`w-full h-11 rounded-xl border px-3 text-sm ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <option value="2025 A/L">2025 A/L</option>
                  <option value="2026 A/L">2026 A/L</option>
                  <option value="2027 A/L">2027 A/L</option>
                </select>
              </div>
              <input
                type="text"
                value={schoolAndDistrict}
                onChange={(e) => setSchoolAndDistrict(e.target.value)}
                placeholder="School & District (e.g. Royal College, Colombo)"
                className={`w-full h-11 rounded-xl border px-3 text-sm ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="Parent / Guardian Name"
                  className={`w-full h-11 rounded-xl border px-3 text-sm ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                />
                <input
                  type="tel"
                  value={guardianWhatsApp}
                  onChange={(e) => setGuardianWhatsApp(e.target.value)}
                  placeholder="Guardian WhatsApp"
                  className={`w-full h-11 rounded-xl border px-3 text-sm ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
            </div>

            {/* Password & 4-Rule Strength Meter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div>
                <label htmlFor="reg-password" className="block text-xs font-bold mb-1.5">
                  Create Password *
                </label>
                <div
                  className={`flex items-center h-11 rounded-xl border px-3.5 ${
                    errors.password
                      ? 'border-red-500'
                      : isDark
                        ? 'bg-slate-900 border-slate-700'
                        : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    placeholder="Create a strong password"
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="opacity-70 ml-2 flex items-center"
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-confirm-password" className="block text-xs font-bold mb-1.5">
                  Confirm Password *
                </label>
                <input
                  id="reg-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  placeholder="Re-enter password"
                  className={`w-full h-11 rounded-xl border px-3.5 text-sm focus:outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : isDark
                        ? 'bg-slate-900 border-slate-700'
                        : 'bg-slate-50 border-slate-300'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Interactive 4-Rule Password Strength Meter */}
              <div className="md:col-span-2 space-y-2">
                <div className="grid grid-cols-4 gap-1.5 h-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`rounded-full transition-colors ${
                        strength.score >= level
                          ? strength.score === 4
                            ? 'bg-emerald-500'
                            : strength.score >= 2
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          : isDark
                            ? 'bg-slate-800'
                            : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  {[
                    { ok: strength.hasMinLength, label: 'Min 8 characters' },
                    { ok: strength.hasNumber, label: '1 number' },
                    { ok: strength.hasUppercase, label: '1 uppercase letter' },
                    { ok: strength.hasSymbol, label: '1 special symbol' },
                  ].map((rule) => (
                    <span
                      key={rule.label}
                      className={`flex items-center gap-1 font-semibold ${
                        rule.ok ? 'text-emerald-500' : 'opacity-60'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {rule.ok ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      {rule.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2.5 pt-2">
              <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, acceptedTerms: '' }));
                  }}
                  className="mt-0.5 accent-[#005ab6]"
                />
                <span>
                  I agree to the MindBridge LMS Terms of Service and Sri Lanka PDPA Act No. 9 of
                  2022 Privacy Policy.
                </span>
              </label>
              {errors.acceptedTerms && (
                <p className="text-xs text-red-500">{errors.acceptedTerms}</p>
              )}

              <label className="flex items-start gap-2.5 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={(e) => setWhatsappOptIn(e.target.checked)}
                  className="mt-0.5 accent-[#005ab6]"
                />
                <span>
                  Receive class schedule reminders and bank slip verification updates via WhatsApp.
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-[#005ab6] hover:bg-[#004896] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <span>
                  {isSubmitting
                    ? 'Validating Registration...'
                    : 'Complete Registration & Enter Student Hub'}
                </span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <p className="text-center text-xs opacity-75">
                Already have a MindBridge Student Pass?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/login')}
                  className="font-bold text-[#005ab6] dark:text-sky-400 hover:underline"
                >
                  Sign In Here
                </button>
              </p>
            </div>
          </form>

          {/* Right 4 Cols: Universal Account Benefits & PDPA Vault */}
          <aside className="lg:col-span-4 space-y-5">
            <div
              className={`rounded-2xl p-6 border space-y-4 ${
                isDark
                  ? 'bg-[#0f172a] border-slate-800'
                  : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 text-[#005ab6] dark:text-sky-400">
                <span className="material-symbols-outlined text-[22px]">hub</span>
                <h3 className="font-bold text-base">Why a Single Universal Account?</h3>
              </div>
              <ul className="space-y-3 text-xs leading-relaxed opacity-85">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-500 text-[18px] shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>One Global Identity:</strong> Use the same login across Combined
                    Maths, Physics, Chemistry, and any other verified academy.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-500 text-[18px] shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Strict Tenant Separation:</strong> Your enrollments, bank slips, and
                    exam marks remain isolated per academy.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-500 text-[18px] shrink-0">
                    check_circle
                  </span>
                  <span>
                    <strong>Student-Only Scope:</strong> Student registration never creates a
                    teacher workspace or institute tenant.
                  </span>
                </li>
              </ul>
            </div>

            <div
              className={`rounded-2xl p-6 border space-y-3 ${
                isDark
                  ? 'bg-[#0c1428] border-slate-800'
                  : 'bg-[#eef4ff] border-blue-200/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#005ab6] dark:text-sky-400 text-[22px]">
                  shield_lock
                </span>
                <h3 className="font-bold text-sm">PDPA Compliant Vault</h3>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                Protected under Sri Lanka Personal Data Protection Act No. 9 of 2022. Passwords are
                never stored in browser storage and are verified via Firebase Authentication.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
