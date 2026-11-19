import React, { useState } from 'react';

interface MobileLightMarketingWebsiteProps {
  onToggleTheme: () => void;
  lang: 'en' | 'si';
  onToggleLang: (lang: 'en' | 'si') => void;
  onFutureStageAction: (label: string) => void;
}

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrA7_rZ3ABV6yE4doz6kFiRiGfPGv2xtF9lnpJ7hdRh3BipsZ2ijO2rKVq3ub9uFm-dmD7EgE-7J7KtIU1J0kTkgZUsqVQ2mnW5PDeu2KCXBxOv6XCTmabZtAEzg_BGR_BTdAnHkxI_rrb1nS7k2-lISNQ4RaPqGS2xvXDnfCU1DNqQvh9ECrQheZJ0pGOPEYE2mZbGuHTdhrEfu48ynixn_w20CE4mqMB3iXCK-bs5H4RtkXF2vJiNDDQ';

const APEX_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAXOjcWEzKZhkGG1le2S5vuehs5TQWD0HglZhCjv9inlVsCllEi3BZ_QbCCVVjKrDHsnTKU3fuv4JkrCkyJnFNL5walhG2IuR0sqHNOE-nEvsKPy12ff5T3QpduUr1iALt-3soai8ysREnsKZ6j6v9lxjalxwaZOKEJQxzpnEPKda14pxcBsxAKrngUvXwJCy7sj-Be35kKzcUDuKDL4sXGlQmivjU0r_DI9N3rcso';

const SYNERGY_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh3CFtquT4bh53GlQ_bW0dwWTLnT_onqmaOAwVWC62LNd12YLrcaTGCrIvmnrxKknkPSGhKG_gl9dpTi5wf7ASiAbr0AiHPnLA9abgSd6Rha3JitfR7BFJBCP3hTyNVdbmeK8oCI6TeIH0GGEtYz4Hp1yKeH6Coqw7FYDqT2nuDLw2NpR7Ey-DPYTpFulNouMjNAptx_E8eRbIBqpo39RGxc4mo_yII00axr-w6Y';

const ROTARY_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCMtLHax-3ROUM-gB_Xco8ZW0dmYJiDbx0BztLFz8tKVTOxBO-H2AadJ4_syf6VJGP8QslSWzZjx4pNyDa_uhxhkFuZ0dN3wcAIe_IeUyjbVVrdYVBmXKymDsrEMFQAbBmcPUPSd5DjCww6zHVGNSEv2aLwCfjvtnOKxROVLepeYaf0PW9SCRllfKS8N0da7LZlytAzgBJszXFhtipE4w-_Hozu6rpIKxZ1XLJX-fQ';

const KUSAL_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD2OJJM3mpeGCBlBQVp6Psl7rBy1RF9rkskbEvwGCW6cIXYZg5jFGOGlZZvQrsdd_vRsw3a2zFwhIVVCv2N2aMJZTlYuSzti2FPfghsjiKUvtY4QW3Pto6ib3TPze3RkkYi20dwlpi0H7eK_vgBQyZ7elBzzAIkrxqWt7Yakbz7NbyAMr6T4utF__1oa99JwFLBjGCG4jl6MUlO0z2jksLnSdtbZ5oSCu8SSBRLF4I';

const PILLARS = [
  {
    icon: 'domain',
    iconBg: 'bg-[#d7e3ff] text-[#001b3f]',
    title: 'Multi-Tenant Academy Isolation',
    subtitle: 'apex-maths.mindbridge.lk',
    subtitleColor: 'text-[#005ab6] font-medium',
    description:
      'Independent white-labeled portal subdomains, custom automated student barcode IDs, role-restricted faculty portals, and separate financial ledgers for each master educator.',
  },
  {
    icon: 'smart_display',
    iconBg: 'bg-[#e1e7ff] text-[#005ab6]',
    title: 'Ultra-Low Latency DRM Stream',
    subtitle: 'Dynamic Student Watermarking',
    subtitleColor: 'text-[#414754]',
    description:
      "Military-grade encrypted video delivery preventing screen captures and rip tools. Dynamic animated overlays display the viewer's NIC and mobile number across all frames.",
  },
  {
    icon: 'fact_check',
    iconBg: 'bg-[#e1e7ff] text-[#005ab6]',
    title: 'Anti-Cheat Timed Exams',
    subtitle: 'Cryptographic QR Receipts',
    subtitleColor: 'text-[#414754]',
    description:
      'Strict question timers with randomized answer pools, focus-loss tab detection, and verifiable cryptographic digital certificates generated upon submission.',
  },
  {
    icon: 'receipt_long',
    iconBg: 'bg-[#e1e7ff] text-[#005ab6]',
    title: 'Dual-Staff Slip Auditing',
    subtitle: 'AI Bank Slip OCR & WhatsApp Alerts',
    subtitleColor: 'text-[#414754]',
    description:
      'Instant bank deposit slip verification with duplicate detection, two-tier assistant approval workflows, and automated WhatsApp payment receipts to parents.',
  },
];

export const MobileLightMarketingWebsite: React.FC<MobileLightMarketingWebsiteProps> = ({
  onToggleTheme,
  lang,
  onToggleLang,
  onFutureStageAction,
}) => {
  const [openPillar, setOpenPillar] = useState<number | null>(0);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth'>('starter');
  const [menuOpen, setMenuOpen] = useState(false);

  const togglePillar = (idx: number) => {
    setOpenPillar((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-[#faf8ff] font-inter text-[#101b34] flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#faf8ff]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(7,27,74,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <img
              alt="MindBridge LMS Education Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="font-display-jakarta text-[16px] font-semibold text-[#101b34] tracking-tight leading-none">
                MindBridge
              </span>
              <span className="text-[11px] font-semibold text-[#414754] leading-tight">
                LMS Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onToggleLang(lang === 'en' ? 'si' : 'en')}
              className="h-11 px-1.5 flex items-center gap-1 rounded-full text-[#414754] hover:text-[#005ab6] transition-colors"
            >
              <span
                className={`text-[11px] font-semibold uppercase ${
                  lang === 'en' ? 'text-[#005ab6] font-bold' : ''
                }`}
              >
                EN
              </span>
              <span className="text-[#c1c6d6] text-[12px]">/</span>
              <span
                className={`text-[11px] font-semibold ${
                  lang === 'si' ? 'text-[#005ab6] font-bold' : ''
                }`}
              >
                සිං
              </span>
            </button>

            <button
              type="button"
              aria-label="Account"
              onClick={() => onFutureStageAction('Account Portal')}
              className="w-8 h-8 rounded-full bg-[#005ab6] flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="w-11 h-11 flex items-center justify-center text-[#101b34] hover:text-[#005ab6] rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {menuOpen && (
          <div className="px-4 pb-4 pt-2 bg-[#faf8ff] border-t border-[#c1c6d6]/40 shadow-lg flex flex-col gap-2">
            <a
              href="#mobile-pillars"
              onClick={() => setMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-[14px] font-semibold text-[#101b34] hover:bg-[#eaedff]"
            >
              Engine Architecture
            </a>
            <a
              href="#mobile-academies"
              onClick={() => setMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-[14px] font-semibold text-[#101b34] hover:bg-[#eaedff]"
            >
              Master Academies
            </a>
            <a
              href="#mobile-pricing"
              onClick={() => setMenuOpen(false)}
              className="py-2 px-3 rounded-lg text-[14px] font-semibold text-[#101b34] hover:bg-[#eaedff]"
            >
              Institutional Pricing
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onToggleTheme();
              }}
              className="py-2 px-3 rounded-lg text-[14px] font-semibold text-[#005ab6] bg-[#eaedff] flex items-center justify-between"
            >
              <span>Switch to Dark Mode</span>
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            </button>
          </div>
        )}
      </header>

      <main className="flex flex-col relative w-full pt-16 pb-28 bg-[#faf8ff]">
        <div className="flex flex-col w-full">
          {/* HERO */}
          <div className="relative w-full px-4 pt-4 pb-6 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#d7e3ff]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-48 -left-16 w-52 h-52 bg-[#ffddb4]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#e1e7ff] rounded-full shadow-sm mb-4">
              <span
                className="material-symbols-outlined text-[16px] text-[#7f5300]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-[11px] font-semibold text-[#7f5300]">
                Sri Lanka&apos;s #1 Multi-Academy EdTech Engine
              </span>
            </div>

            <h1 className="font-display-jakarta text-[26px] leading-[34px] font-bold tracking-[-0.015em] text-[#101b34] mb-2">
              Empower Your Institute. <br />
              <span className="text-[#005ab6]">Elevate Every Student.</span>
            </h1>

            <p className="text-[14px] text-[#414754] mb-6 leading-relaxed">
              The authoritative cloud multi-tenant ecosystem built for tuition masters, collegiate
              institutes, and over 140,000+ island-wide A/L &amp; O/L learners.
            </p>

            <div className="flex flex-col gap-2 w-full">
              <button
                type="button"
                onClick={() => onFutureStageAction('Request Academy Demo')}
                className="h-11 w-full px-6 flex items-center justify-center gap-1 bg-[#005ab6] text-white text-[14px] font-semibold rounded-lg shadow-md hover:bg-[#0072e4] transition-all active:scale-[0.99]"
              >
                <span>Request Academy Demo</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onFutureStageAction('Explore Storefronts')}
                className="h-11 w-full px-6 flex items-center justify-center gap-1 bg-white text-[#101b34] text-[14px] font-semibold rounded-lg shadow-sm hover:bg-[#eaedff] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-[#005ab6]">
                  storefront
                </span>
                <span>Explore Storefronts</span>
              </button>
            </div>

            <div className="flex items-center gap-1 mt-4 text-[#414754] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#005ab6]">translate</span>
              <span>සිංහල සහ ඉංග්‍රීසි මාධ්‍ය ඒකාබද්ධ පද්ධතිය</span>
            </div>
          </div>

          {/* 2x2 TRUST & SCALE METRICS */}
          <section className="px-4 py-2 w-full">
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: 'groups', color: 'text-[#005ab6]', value: '140K+', label: 'Active Students' },
                { icon: 'bolt', color: 'text-[#005ab6]', value: '99.98%', label: 'Stream Uptime' },
                { icon: 'school', color: 'text-[#7f5300]', value: '350+', label: 'Master Lecturers' },
                { icon: 'security', color: 'text-[#005ab6]', value: '0%', label: 'Exam Fraud Rate' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between"
                >
                  <div
                    className={`w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center mb-2 ${m.color}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                  </div>
                  <div>
                    <span className="font-display-jakarta text-[24px] leading-[32px] text-[#101b34] font-bold tracking-tight block">
                      {m.value}
                    </span>
                    <span className="text-[11px] font-semibold text-[#414754]">{m.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CORE ARCHITECTURAL PILLARS */}
          <section id="mobile-pillars" className="px-4 pt-6 pb-4 w-full">
            <div className="mb-4">
              <div className="flex items-center gap-1 text-[#005ab6] mb-1">
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  Engine Architecture
                </span>
              </div>
              <h2 className="font-display-jakarta text-[20px] leading-[28px] font-semibold text-[#101b34]">
                Designed for Sri Lankan Education Scale
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {PILLARS.map((pillar, idx) => {
                const isOpen = openPillar === idx;
                return (
                  <button
                    key={pillar.title}
                    type="button"
                    onClick={() => togglePillar(idx)}
                    className="w-full text-left bg-white p-4 rounded-lg shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${pillar.iconBg}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {pillar.icon}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display-jakarta text-[16px] leading-[24px] font-semibold text-[#101b34]">
                            {pillar.title}
                          </h3>
                          <span className={`text-[11px] ${pillar.subtitleColor}`}>
                            {pillar.subtitle}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[#414754] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </div>
                    {isOpen && (
                      <div className="mt-2 pt-2 text-[#414754] text-[12px] leading-[18px]">
                        {pillar.description}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* MASTER ACADEMIES HORIZONTAL SNAP CAROUSEL */}
          <section id="mobile-academies" className="pt-6 pb-2 w-full">
            <div className="px-4 flex items-center justify-between mb-2">
              <div>
                <span className="text-[11px] text-[#7f5300] font-semibold uppercase tracking-wider">
                  Top Institutions
                </span>
                <h2 className="font-display-jakarta text-[20px] leading-[28px] font-semibold text-[#101b34]">
                  Master Academies on MindBridge
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#005ab6]">Swipe →</span>
            </div>

            <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scroll-smooth no-scrollbar">
              {[
                {
                  img: APEX_IMG,
                  dot: 'bg-[#ffddb4]',
                  badge: 'A/L Maths',
                  name: 'Apex Combined Mathematics',
                  tutor: 'Eng. Kusal Senaratne',
                  cred: 'Moratuwa Engineering Alumni',
                  enrolled: '28,400+ Enrolled',
                  domain: 'apex.mindbridge.lk',
                },
                {
                  img: SYNERGY_IMG,
                  dot: 'bg-[#d7e3ff]',
                  badge: 'A/L Physics',
                  name: 'Synergy Physics Academy',
                  tutor: 'Prof. Dayananda',
                  cred: 'Senior University Fellow',
                  enrolled: '19,200+ Enrolled',
                  domain: 'synergy.mindbridge.lk',
                },
                {
                  img: ROTARY_IMG,
                  dot: 'bg-[#ffddb4]',
                  badge: 'A/L Chemistry',
                  name: 'Rotary Hall Chemistry',
                  tutor: 'Dr. Asela Perera',
                  cred: 'MBBS, Chemistry Consultant',
                  enrolled: '22,100+ Enrolled',
                  domain: 'rotary.mindbridge.lk',
                },
              ].map((ac) => (
                <div
                  key={ac.domain}
                  className="snap-start shrink-0 w-[275px] bg-white rounded-lg shadow-sm overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative w-full h-32 bg-[#eaedff]">
                    <img className="w-full h-full object-cover" alt={ac.name} src={ac.img} />
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-[#041847] text-white text-[11px] font-semibold flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${ac.dot}`} />
                      {ac.badge}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display-jakarta text-[16px] font-semibold text-[#101b34] leading-snug">
                        {ac.name}
                      </h3>
                      <p className="text-[12px] font-medium text-[#414754] mt-0.5">{ac.tutor}</p>
                      <span className="text-[11px] font-semibold text-[#4d5c8e] block mt-1">
                        {ac.cred}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between bg-[#f2f3ff] px-2 py-1.5 rounded-lg">
                      <span className="text-[11px] font-semibold text-[#414754]">{ac.enrolled}</span>
                      <span className="text-[11px] text-[#005ab6] font-semibold">{ac.domain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* INTERACTIVE PRICING PREVIEW */}
          <section id="mobile-pricing" className="px-4 pt-6 pb-2 w-full">
            <div className="text-center mb-4">
              <span className="text-[11px] text-[#005ab6] font-bold uppercase tracking-wider">
                Transparent Scale
              </span>
              <h2 className="font-display-jakarta text-[20px] leading-[28px] font-semibold text-[#101b34]">
                Institutional Pricing Plans
              </h2>
              <p className="text-[12px] text-[#414754] mt-1">
                Affordable monthly tiers tailored for Sri Lankan educators.
              </p>
            </div>

            <div className="flex bg-[#eaedff] p-1 rounded-lg mb-4">
              <button
                type="button"
                onClick={() => setSelectedPlan('starter')}
                className={
                  selectedPlan === 'starter'
                    ? 'flex-1 py-1.5 text-[12px] text-[#005ab6] font-semibold bg-white rounded shadow-sm transition-all'
                    : 'flex-1 py-1.5 text-[12px] text-[#414754] font-medium transition-all'
                }
              >
                Starter Tier
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan('growth')}
                className={
                  selectedPlan === 'growth'
                    ? 'flex-1 py-1.5 text-[12px] text-[#005ab6] font-semibold bg-white rounded shadow-sm transition-all'
                    : 'flex-1 py-1.5 text-[12px] text-[#414754] font-medium transition-all'
                }
              >
                Growth Engine
              </button>
            </div>

            {selectedPlan === 'starter' ? (
              <div className="bg-white p-4 rounded-lg shadow-sm relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2 py-0.5 bg-[#eaedff] rounded-full text-[#4d5c8e] font-medium">
                    Solo Lecturer
                  </span>
                  <span className="font-display-jakarta text-[16px] text-[#005ab6] font-bold">
                    LKR 15,000
                    <span className="text-[12px] font-normal text-[#414754]">/mo</span>
                  </span>
                </div>
                <h3 className="font-display-jakarta text-[20px] font-semibold text-[#101b34] mt-1">
                  Starter Academy
                </h3>
                <p className="text-[12px] text-[#414754] mt-1 mb-4">
                  Ideal for individual masters migrating from generic video tools.
                </p>
                <div className="flex flex-col gap-1.5 mb-4">
                  {[
                    'Up to 1,500 Active Registered Students',
                    'Automated Bank Slip OCR Scanning',
                    'Full HD Dynamic DRM Video Shield',
                    'Island-wide Dialog / Mobitel SMS Gateway',
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-[#414754] text-[12px]">
                      <span className="material-symbols-outlined text-[18px] text-[#005ab6]">
                        check_circle
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onFutureStageAction('Choose Starter Plan')}
                  className="w-full h-11 bg-[#eaedff] text-[#101b34] text-[14px] font-semibold rounded-lg hover:bg-[#e1e7ff] transition-colors"
                >
                  Choose Starter Plan
                </button>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-md relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2 py-0.5 bg-[#ffddb4] text-[#291800] font-bold rounded-full">
                    Most Popular
                  </span>
                  <span className="font-display-jakarta text-[16px] text-[#005ab6] font-bold">
                    LKR 35,000
                    <span className="text-[12px] font-normal text-[#414754]">/mo</span>
                  </span>
                </div>
                <h3 className="font-display-jakarta text-[20px] font-semibold text-[#101b34] mt-1">
                  Growth Enterprise
                </h3>
                <p className="text-[12px] text-[#414754] mt-1 mb-4">
                  Powerhouse infrastructure for high-volume island institutes.
                </p>
                <div className="flex flex-col gap-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-[#101b34] text-[12px] font-medium">
                    <span className="material-symbols-outlined text-[18px] text-[#7f5300]">
                      verified
                    </span>
                    <span>Unlimited Students &amp; Multiple Lecturers</span>
                  </div>
                  {[
                    'Custom Domain (e.g., student.yourbrand.lk)',
                    'Advanced Live Exam Telemetry & Cheating AI',
                    'Dedicated Colombo Account Manager & 24/7 SLA',
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-[#414754] text-[12px]">
                      <span className="material-symbols-outlined text-[18px] text-[#005ab6]">
                        check_circle
                      </span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onFutureStageAction('Deploy Growth Engine')}
                  className="w-full h-11 bg-[#005ab6] text-white text-[14px] font-semibold rounded-lg hover:bg-[#0072e4] shadow-md transition-all"
                >
                  Deploy Growth Engine
                </button>
              </div>
            )}
          </section>

          {/* DUAL TESTIMONIAL SHOWCASE */}
          <section className="px-4 pt-6 pb-6 w-full">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#eaedff] overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Eng. Kusal Senaratne"
                    src={KUSAL_AVATAR}
                  />
                </div>
                <div>
                  <h4 className="font-display-jakarta text-[16px] font-semibold text-[#101b34]">
                    Eng. Kusal Senaratne
                  </h4>
                  <span className="text-[11px] font-semibold text-[#414754]">
                    Apex Combined Maths Founder
                  </span>
                </div>
              </div>
              <p className="text-[12px] leading-[18px] text-[#414754] italic mb-4">
                “Before MindBridge, verifying 5,000 monthly bank deposit slips took our assistants 6
                days. Today it happens in 30 seconds with zero fraud, and our live streams run
                without a stutter across rural towers.”
              </p>
              <div className="bg-[#f2f3ff] p-2 rounded-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#005ab6] shrink-0">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#101b34] font-semibold block">
                    Devinda Wickramasinghe (Island Rank 4 - 2024)
                  </span>
                  <span className="text-[11px] text-[#414754] leading-none">
                    Royal College, Colombo · Exam QR Certificate Verified
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* STICKY BOTTOM LAUNCH BAR */}
          <div className="sticky bottom-16 z-40 w-full px-4 py-2 bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ffb952] animate-ping" />
                <span className="text-[11px] text-[#101b34] font-bold truncate">
                  Launch in 48 Hours
                </span>
              </div>
              <span className="text-[11px] text-[#414754] truncate block">
                Full white-labeled onboarding
              </span>
            </div>
            <button
              type="button"
              onClick={() => onFutureStageAction('Get Started')}
              className="h-10 px-4 shrink-0 bg-[#005ab6] text-white text-[14px] font-semibold rounded-lg shadow-sm flex items-center gap-1 hover:bg-[#0072e4] active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            </button>
          </div>
        </div>
      </main>

      {/* FIXED BOTTOM TAB BAR */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 w-full z-50 pb-safe bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(7,27,74,0.06)]"
      >
        <div className="px-4 pt-1 pb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <a
              aria-current="page"
              className="w-11 h-11 flex flex-col items-center justify-center transition-colors text-[#005ab6] font-bold"
              href="#mobile-academies"
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span className="text-[11px]">Browse</span>
            </a>
            <a
              className="w-11 h-11 flex flex-col items-center justify-center text-[#414754] hover:text-[#005ab6] transition-colors"
              href="#mobile-pricing"
            >
              <span className="material-symbols-outlined text-[20px]">domain</span>
              <span className="text-[11px] font-semibold">Corporate</span>
            </a>
          </div>
          <div className="flex-1 flex justify-end">
            <button
              type="button"
              onClick={() => onFutureStageAction('Enroll Now')}
              className="h-11 px-6 flex items-center justify-center gap-1 bg-[#005ab6] text-white text-[14px] font-semibold rounded-lg shadow-[0_4px_12px_rgba(0,92,186,0.25)] hover:bg-[#0072e4] transition-all active:scale-[0.98]"
            >
              <span>Enroll Now</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
