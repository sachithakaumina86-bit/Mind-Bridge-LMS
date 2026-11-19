import React, { useRef, useState } from 'react';
import {
  OnboardingDocumentItem,
  submitTeacherOnboardingApplication,
  validateSriLankanMobile,
  validateSubdomain,
} from '../../services/authService';

interface TeacherOnboardingPageProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigate: (path: string) => void;
}

const LOGO_SRC = '/assets/aistudio/Blue_and_Gold_Learning_Emblem_fd28f21b.png';

const AVAILABLE_SUBJECTS = [
  'A/L Combined Maths',
  'A/L Physics',
  'A/L Chemistry',
  'O/L English Medium',
  'O/L Science',
  'ICT & Computer Science',
];

export const TeacherOnboardingPage: React.FC<TeacherOnboardingPageProps> = ({
  theme,
  onToggleTheme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [tenantType, setTenantType] = useState<'individual' | 'institute'>('individual');
  const [academyName, setAcademyName] = useState('Apex Combined Mathematics Academy');
  const [subdomain, setSubdomain] = useState('apex-maths');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'A/L Combined Maths',
    'A/L Physics',
  ]);
  const [contactPerson, setContactPerson] = useState('Eng. Kusal Senaratne');
  const [nicOrBr, setNicOrBr] = useState('198714203981 / PV0029810');
  const [whatsapp, setWhatsapp] = useState('71 987 6543');

  const [documents, setDocuments] = useState<OnboardingDocumentItem[]>([
    {
      id: 'doc-1',
      name: 'National_Identity_Card_Verification_Kusal.pdf',
      sizeLabel: '2.4 MB',
      statusLabel: 'Pre-scanned Clean',
    },
    {
      id: 'doc-2',
      name: 'University_Engineering_Degree_Certificate.pdf',
      sizeLabel: '4.1 MB',
      statusLabel: 'Verified MoE / UoM',
    },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<{ message: string; details?: string } | null>(
    null
  );
  const [draftNotice, setDraftNotice] = useState<string | null>(null);

  const subdomainValid = validateSubdomain(subdomain);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((item) => item !== subject) : [...prev, subject]
    );
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const added: OnboardingDocumentItem[] = Array.from(files).map((file, idx) => ({
      id: `upload-${Date.now()}-${idx}`,
      name: file.name,
      sizeLabel: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      statusLabel: 'Ready for Review',
      file,
    }));
    setDocuments((prev) => [...prev, ...added]);
    e.target.value = '';
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleSaveDraft = () => {
    setDraftNotice(
      'Draft persistence requires a connected backend API (VITE_API_BASE_URL). Form values remain in memory for this session.'
    );
    window.setTimeout(() => setDraftNotice(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const nextErrors: Record<string, string> = {};

    if (!academyName.trim()) {
      nextErrors.academyName = 'Proposed academy name is required.';
    }
    if (!subdomainValid) {
      nextErrors.subdomain =
        'Use 3–32 lowercase letters, numbers, or hyphens (no leading/trailing hyphen).';
    }
    if (selectedSubjects.length === 0) {
      nextErrors.subjects = 'Select at least one primary academic curriculum subject.';
    }
    if (!contactPerson.trim()) {
      nextErrors.contactPerson = 'Official contact person / master teacher name is required.';
    }
    if (!nicOrBr.trim()) {
      nextErrors.nicOrBr = 'National ID (NIC) or Business Registration (BR) is required.';
    }
    if (!validateSriLankanMobile(whatsapp)) {
      nextErrors.whatsapp = 'Enter a valid Sri Lankan WhatsApp number.';
    }
    if (documents.length === 0) {
      nextErrors.documents = 'Attach at least one identity or accreditation document.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = await submitTeacherOnboardingApplication({
        tenantType,
        academyName: academyName.trim(),
        subdomain: subdomain.trim().toLowerCase(),
        subjects: selectedSubjects,
        contactPerson: contactPerson.trim(),
        nicOrBr: nicOrBr.trim(),
        whatsapp: whatsapp.trim(),
        documents,
      });
      if (!result.ok) {
        setServerError({ message: result.message, details: result.details });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif] transition-colors ${
        isDark ? 'bg-[#080e1d] text-[#dde2f8]' : 'bg-[#faf8ff] text-[#101b34]'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between border-b backdrop-blur-xl ${
          isDark
            ? 'bg-[#080e1d]/90 border-slate-800'
            : 'bg-[#faf8ff]/90 border-slate-200/80'
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
                  isDark ? 'text-[#a4c8ff]' : 'text-[#005ab6]'
                }`}
              >
                Institutional Onboarding
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
              isDark
                ? 'bg-[#191f2f] text-[#4edea3]'
                : 'bg-[#e1e7ff] text-[#005ab6]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">lock</span>
            256-bit SSL
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
              isDark
                ? 'bg-[#191f2f] border-slate-700 text-amber-400'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#005ab6] text-white hover:bg-[#004896]"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Regional Compliance & Protocol Bar */}
      <div
        className={`px-4 md:px-8 py-2.5 border-b text-xs ${
          isDark
            ? 'bg-[#151b2b] border-slate-800 text-[#c0c7d5]'
            : 'bg-[#e1e7ff]/60 border-blue-200/70 text-[#101b34]'
        }`}
      >
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LK-WP • Sri Lanka
            </span>
            <span className="opacity-60">|</span>
            <span>Dual Compliance: Sinhala Unicode &amp; MoE Verified</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-bold">
              Tenant Protocol v4.8
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#005ab6]/10 text-[#005ab6] dark:bg-[#a4c8ff]/15 dark:text-[#a4c8ff] font-bold">
              ID: LK-TEN-2025-0894B
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-[1320px] mx-auto px-4 md:px-8 py-6 md:py-8 pb-24">
        {/* 5-Step Registration Pipeline Stepper */}
        <div className="overflow-x-auto pb-3 mb-6">
          <div className="flex items-center gap-2 min-w-[640px]">
            {[
              { step: '1', title: 'Step 1: Auth', sub: 'Validated', state: 'done' },
              { step: '2', title: 'Step 2: Model', sub: 'In Progress', state: 'active' },
              { step: '3', title: 'Step 3: Identity', sub: 'Subdomain URL', state: 'pending' },
              { step: '4', title: 'Step 4: NIC & Docs', sub: 'Accreditation', state: 'pending' },
              { step: '5', title: 'Step 5: Review', sub: 'Super Admin Queue', state: 'pending' },
            ].map((item, idx) => (
              <React.Fragment key={item.step}>
                <div
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs shrink-0 ${
                    item.state === 'active'
                      ? 'bg-[#005ab6] text-white border-[#005ab6] shadow-sm'
                      : item.state === 'done'
                        ? isDark
                          ? 'bg-[#191f2f] border-emerald-500/40 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : isDark
                          ? 'bg-[#151b2b] border-slate-800 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                      item.state === 'active'
                        ? 'bg-white text-[#005ab6]'
                        : item.state === 'done'
                          ? 'bg-emerald-500 text-white'
                          : isDark
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.state === 'done' ? '✓' : item.step}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold leading-tight">{item.title}</span>
                    <span className="text-[10px] opacity-80">{item.sub}</span>
                  </div>
                </div>
                {idx < 4 && (
                  <span className="material-symbols-outlined text-[16px] opacity-40 shrink-0">
                    chevron_right
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left 8 Cols: Onboarding Application Form */}
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-8 space-y-6">
            {/* Header Card */}
            <div
              className={`rounded-2xl p-6 border ${
                isDark
                  ? 'bg-[#151b2b] border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#005ab6] dark:text-[#a4c8ff] mb-1">
                Institutional Setup • Data Isolation Guard
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Apply to Launch Your Branded Academy
              </h1>
              <p className="text-sm opacity-75 mt-1.5">
                Join hundreds of Sri Lankan educators with your own isolated portal, custom
                subdomain, and direct bank slip verification engine.
              </p>
            </div>

            {serverError && (
              <div
                role="alert"
                className={`p-4 rounded-xl border text-xs space-y-1 ${
                  isDark
                    ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  <span>Backend Onboarding Persistence Required</span>
                </div>
                <p>{serverError.message}</p>
                {serverError.details && <p className="opacity-80">{serverError.details}</p>}
              </div>
            )}

            {draftNotice && (
              <div
                className={`p-3.5 rounded-xl border text-xs ${
                  isDark
                    ? 'bg-sky-950/40 border-sky-500/40 text-sky-200'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}
              >
                {draftNotice}
              </div>
            )}

            {/* Section 1: Tenant Type Selector */}
            <section className="space-y-3">
              <h2 className="text-base font-bold flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#005ab6]/15 text-[#005ab6] dark:text-[#a4c8ff] text-xs">
                  01
                </span>
                Select Educational Model Tier
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTenantType('individual')}
                  className={`text-left rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                    tenantType === 'individual'
                      ? 'border-[#005ab6] bg-[#005ab6]/5 dark:bg-[#191f2f]'
                      : isDark
                        ? 'border-slate-800 bg-[#151b2b] opacity-80'
                        : 'border-slate-200 bg-white opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#005ab6] dark:text-[#a4c8ff] text-[24px]">
                        school
                      </span>
                      <div>
                        <h3 className="font-bold text-sm">Individual Teacher / Master</h3>
                        <span className="text-[11px] opacity-75">Solo Academic Operation</span>
                      </div>
                    </div>
                    {tenantType === 'individual' && (
                      <span className="w-5 h-5 rounded-full bg-[#005ab6] text-white flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Ideal for solo tuition masters and individual subject lecturers with up to 2
                    staff assistants and direct LKR slip verification.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTenantType('institute')}
                  className={`text-left rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                    tenantType === 'institute'
                      ? 'border-[#005ab6] bg-[#005ab6]/5 dark:bg-[#191f2f]'
                      : isDark
                        ? 'border-slate-800 bg-[#151b2b] opacity-80'
                        : 'border-slate-200 bg-white opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-amber-500 text-[24px]">
                        apartment
                      </span>
                      <div>
                        <h3 className="font-bold text-sm">Educational Institute / Academy</h3>
                        <span className="text-[11px] opacity-75">Full Campus Tier</span>
                      </div>
                    </div>
                    {tenantType === 'institute' && (
                      <span className="w-5 h-5 rounded-full bg-[#005ab6] text-white flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Tailored for multi-hall tuition institutes and academies with multi-instructor
                    delegation, branch streams, and custom domain mapping.
                  </p>
                </button>
              </div>
            </section>

            {/* Section 2: Academy Branding & Identity Details */}
            <section
              className={`rounded-2xl p-5 md:p-6 border space-y-4 ${
                isDark
                  ? 'bg-[#151b2b] border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <h2 className="text-base font-bold flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#005ab6]/15 text-[#005ab6] dark:text-[#a4c8ff] text-xs">
                  02
                </span>
                Academy Identity &amp; Subdomain
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="onb-academy-name" className="block text-xs font-bold mb-1.5">
                    Proposed Academy Name *
                  </label>
                  <input
                    id="onb-academy-name"
                    type="text"
                    value={academyName}
                    onChange={(e) => {
                      setAcademyName(e.target.value);
                      setErrors((prev) => ({ ...prev, academyName: '' }));
                    }}
                    className={`w-full h-11 rounded-xl border px-3.5 text-sm focus:outline-none ${
                      errors.academyName
                        ? 'border-red-500'
                        : isDark
                          ? 'bg-[#080e1d] border-slate-700'
                          : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                  {errors.academyName && (
                    <p className="text-xs text-red-500 mt-1">{errors.academyName}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="onb-subdomain" className="text-xs font-bold">
                      Permanent Subdomain Address *
                    </label>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        subdomainValid
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-500/15 text-red-500'
                      }`}
                    >
                      {subdomainValid ? 'Format Valid' : 'Invalid Format'}
                    </span>
                  </div>
                  <div
                    className={`flex items-center h-11 rounded-xl border px-3 font-mono text-sm ${
                      errors.subdomain
                        ? 'border-red-500'
                        : isDark
                          ? 'bg-[#080e1d] border-slate-700'
                          : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <span className="opacity-60 select-none">https://</span>
                    <input
                      id="onb-subdomain"
                      type="text"
                      value={subdomain}
                      onChange={(e) => {
                        setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                        setErrors((prev) => ({ ...prev, subdomain: '' }));
                      }}
                      className="flex-1 bg-transparent px-1 font-bold text-[#005ab6] dark:text-[#a4c8ff] focus:outline-none min-w-0"
                    />
                    <span className="opacity-60 select-none">.mindbridge.lk</span>
                  </div>
                  {errors.subdomain && (
                    <p className="text-xs text-red-500 mt-1">{errors.subdomain}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <span className="block text-xs font-bold mb-2">
                    Primary Academic Curriculum &amp; Subjects *
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SUBJECTS.map((subject) => {
                      const active = selectedSubjects.includes(subject);
                      return (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => toggleSubject(subject)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#005ab6] text-white'
                              : isDark
                                ? 'bg-[#191f2f] text-slate-300 hover:bg-slate-800'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <span>{subject}</span>
                          <span className="material-symbols-outlined text-[14px]">
                            {active ? 'check' : 'add'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.subjects && (
                    <p className="text-xs text-red-500 mt-1">{errors.subjects}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="onb-contact" className="block text-xs font-bold mb-1.5">
                    Official Contact Person / Master Teacher *
                  </label>
                  <input
                    id="onb-contact"
                    type="text"
                    value={contactPerson}
                    onChange={(e) => {
                      setContactPerson(e.target.value);
                      setErrors((prev) => ({ ...prev, contactPerson: '' }));
                    }}
                    className={`w-full h-11 rounded-xl border px-3.5 text-sm focus:outline-none ${
                      isDark ? 'bg-[#080e1d] border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                  {errors.contactPerson && (
                    <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="onb-nic" className="block text-xs font-bold mb-1.5">
                    National ID (NIC) or Business Reg (BR) *
                  </label>
                  <input
                    id="onb-nic"
                    type="text"
                    value={nicOrBr}
                    onChange={(e) => {
                      setNicOrBr(e.target.value);
                      setErrors((prev) => ({ ...prev, nicOrBr: '' }));
                    }}
                    className={`w-full h-11 rounded-xl border px-3.5 text-sm font-mono focus:outline-none ${
                      isDark ? 'bg-[#080e1d] border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                  {errors.nicOrBr && (
                    <p className="text-xs text-red-500 mt-1">{errors.nicOrBr}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="onb-whatsapp" className="block text-xs font-bold mb-1.5">
                    Official WhatsApp Support &amp; Alerts Line *
                  </label>
                  <div
                    className={`flex items-center h-11 rounded-xl border px-3 ${
                      isDark ? 'bg-[#080e1d] border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold pr-2 mr-2 border-r border-slate-300 dark:border-slate-700">
                      🇱🇰 +94
                    </span>
                    <input
                      id="onb-whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(e.target.value);
                        setErrors((prev) => ({ ...prev, whatsapp: '' }));
                      }}
                      className="flex-1 bg-transparent text-sm font-mono focus:outline-none"
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Section 3: Verification Document Upload */}
            <section
              className={`rounded-2xl p-5 md:p-6 border space-y-4 ${
                isDark
                  ? 'bg-[#151b2b] border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#005ab6]/15 text-[#005ab6] dark:text-[#a4c8ff] text-xs">
                    03
                  </span>
                  Teacher Credentials &amp; Verification Documents
                </h2>
                <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Encrypted
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileAdd}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-full rounded-xl p-6 border-2 border-dashed text-center space-y-1.5 transition-colors cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-[#080e1d]/60 hover:bg-[#191f2f]'
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[#005ab6] dark:text-[#a4c8ff] text-[28px]">
                  cloud_upload
                </span>
                <div className="text-sm font-bold">
                  Click to browse or upload compliance documents
                </div>
                <div className="text-xs opacity-65">PDF, JPG, PNG up to 10 MB per file</div>
              </button>

              {errors.documents && <p className="text-xs text-red-500">{errors.documents}</p>}

              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`rounded-xl p-3 flex items-center justify-between gap-3 ${
                      isDark ? 'bg-[#191f2f]' : 'bg-slate-50 border border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="material-symbols-outlined text-[#005ab6] dark:text-[#a4c8ff] text-[22px] shrink-0">
                        picture_as_pdf
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{doc.name}</p>
                        <p className="text-[11px] opacity-70">
                          {doc.sizeLabel} • {doc.statusLabel}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(doc.id)}
                      aria-label={`Remove ${doc.name}`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500/10 shrink-0"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Mandatory Super Admin Review Policy */}
            <section
              className={`rounded-2xl p-5 border space-y-2 ${
                isDark
                  ? 'bg-amber-950/25 border-amber-500/30'
                  : 'bg-amber-50/90 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <span className="material-symbols-outlined text-[20px]">
                  admin_panel_settings
                </span>
                <h3 className="text-sm font-bold">
                  Mandatory Super Admin Review Policy (Strict Protocol)
                </h3>
              </div>
              <p className="text-xs leading-relaxed opacity-85">
                All teacher and institute applications undergo manual Super Admin review (Approve
                or Reject) within 12–24 hours. No tenant workspace, database schema, or academy
                subdomain is created or activated prior to formal Super Admin approval.
              </p>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className={`w-full sm:w-auto px-5 h-12 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#191f2f] border-slate-700 hover:bg-slate-800'
                    : 'bg-white border-slate-300 hover:bg-slate-100'
                }`}
              >
                Save Draft Application
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 h-12 rounded-xl bg-[#005ab6] hover:bg-[#004896] disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <span>
                  {isSubmitting
                    ? 'Validating Application...'
                    : 'Submit Application for Super Admin Review'}
                </span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Right 4 Cols: Live Routing Preview & Lifecycle Blueprint */}
          <aside className="lg:col-span-4 space-y-5">
            {/* Live Subdomain Routing Preview */}
            <div
              className={`rounded-2xl p-5 border space-y-4 ${
                isDark
                  ? 'bg-[#151b2b] border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#005ab6] dark:text-[#a4c8ff]">
                  Subdomain Live Routing
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Awaiting Clearance
                </span>
              </div>
              <div
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isDark ? 'bg-[#191f2f]' : 'bg-slate-50'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-[#005ab6] text-white flex items-center justify-center font-extrabold text-lg shrink-0">
                  {(academyName.trim()[0] || 'A').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate">
                    {academyName.trim() || 'Your Academy Name'}
                  </div>
                  <div className="font-mono text-xs text-[#005ab6] dark:text-[#a4c8ff] truncate">
                    {subdomain || 'your-academy'}.mindbridge.lk
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-[#191f2f]' : 'bg-slate-50'}`}>
                  <span className="opacity-65 block text-[11px]">Target Region</span>
                  <span className="font-bold">Colombo (LK-1)</span>
                </div>
                <div className={`p-2.5 rounded-lg ${isDark ? 'bg-[#191f2f]' : 'bg-slate-50'}`}>
                  <span className="opacity-65 block text-[11px]">Tenant Status</span>
                  <span className="font-bold text-amber-500">Not Provisioned</span>
                </div>
              </div>
            </div>

            {/* Post-Submission Lifecycle Blueprint */}
            <div
              className={`rounded-2xl p-5 border space-y-3.5 ${
                isDark
                  ? 'bg-[#151b2b] border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <span className="material-symbols-outlined text-[#005ab6] dark:text-[#a4c8ff] text-[20px]">
                  account_tree
                </span>
                Lifecycle Workflow Blueprint
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#005ab6] text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                    1
                  </span>
                  <div>
                    <div className="font-bold">Verification Queue</div>
                    <p className="opacity-75">
                      Super Admin manual due diligence — Approve or Reject (12–24h SLA).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[11px] shrink-0">
                    2
                  </span>
                  <div>
                    <div className="font-bold">Tenant Provisioning</div>
                    <p className="opacity-75">
                      Triggered only after Super Admin approval: isolated schema &amp; subdomain
                      activation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[11px] shrink-0">
                    3
                  </span>
                  <div>
                    <div className="font-bold">Welcome SMS &amp; Handover</div>
                    <p className="opacity-75">
                      Master owner credentials dispatch with staff assistant allocation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MindBridge Islandwide Metrics */}
            <div
              className={`rounded-2xl p-5 border space-y-2 ${
                isDark
                  ? 'bg-[#191f2f] border-slate-800'
                  : 'bg-[#e1e7ff]/60 border-blue-200/70'
              }`}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-75">
                MindBridge Islandwide Network
              </div>
              <div className="text-lg font-extrabold">420+ Master Tutors &amp; Institutes</div>
              <p className="text-xs opacity-75">
                Operating across all 9 provinces with 99.98% classroom stream uptime.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};
