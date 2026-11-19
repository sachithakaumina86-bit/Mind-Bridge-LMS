import React, { useState } from 'react';

interface MobileDarkMarketingWebsiteProps {
  onToggleTheme: () => void;
  onFutureStageAction: (label: string) => void;
}

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrA7_rZ3ABV6yE4doz6kFiRiGfPGv2xtF9lnpJ7hdRh3BipsZ2ijO2rKVq3ub9uFm-dmD7EgE-7J7KtIU1J0kTkgZUsqVQ2mnW5PDeu2KCXBxOv6XCTmabZtAEzg_BGR_BTdAnHkxI_rrb1nS7k2-lISNQ4RaPqGS2xvXDnfCU1DNqQvh9ECrQheZJ0pGOPEYE2mZbGuHTdhrEfu48ynixn_w20CE4mqMB3iXCK-bs5H4RtkXF2vJiNDDQ';

const MASTERCLASS_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDYfYBq3JcrZWrbH2jfoZ948EV7xQYrxzhKqS27_FKv4ode_hmtwOTbRsDhNn1z2I5p86QgcJeglY1uMgfD3nQa-i_dWlLTbHjREWLIig5xGrWgELegGCl7pPc2qg75l3MwZuOFCuS1j86q5H6aPuL3Tl-bx_DmxPgK1JzX7n0dFeVF7Im-XdQduClcrUzXlyql3QXzjPy2r4Dl-PwD2t577uOF4XQ2jCIJbLb4hrM';

export const MobileDarkMarketingWebsite: React.FC<MobileDarkMarketingWebsiteProps> = ({
  onToggleTheme,
  onFutureStageAction,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#0d1322] font-display-jakarta text-[14px] leading-[22px] text-[#dde2f8] flex flex-col min-h-screen w-full overflow-x-hidden selection:bg-[#a4c8ff] selection:text-[#00315e]">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#080e1d]/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
        <div className="h-16 px-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-[#dde2f8] hover:text-[#a4c8ff] hover:bg-[#242a3a] transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="MindBridge LMS Education Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
            <span className="text-[18px] leading-[26px] text-[#dde2f8] font-bold truncate max-w-[140px]">
              Storefront Gateway
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Menu Actions"
              onClick={() => setMenuOpen((v) => !v)}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-[#c0c7d5] hover:text-[#dde2f8] hover:bg-[#242a3a] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">more_vert</span>
            </button>
            <button
              type="button"
              aria-label="Account"
              onClick={() => onFutureStageAction('Account Portal')}
              className="w-8 h-8 rounded-full bg-[#a4c8ff] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[#00315e] text-[18px]">person</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="px-4 pb-4 pt-2 bg-[#080e1d] border-t border-[#404753]/50 shadow-xl flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onToggleTheme();
              }}
              className="py-2.5 px-3 rounded-lg text-[14px] font-semibold text-[#a4c8ff] bg-[#191f2f] flex items-center justify-between"
            >
              <span>Switch to Light Mode</span>
              <span className="material-symbols-outlined text-[20px]">light_mode</span>
            </button>
          </div>
        )}
      </header>

      <main className="flex flex-col relative w-full pt-16 pb-safe bg-[#0d1322] min-h-screen">
        <div className="flex flex-col w-full pb-24">
          {/* TOP AMBIENT LUMINOUS GLOW + HERO */}
          <div className="relative w-full overflow-hidden px-3 pt-4">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#3898ff]/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Prestige Island Pill */}
            <div className="relative flex items-center justify-between bg-[#151b2b] px-4 py-1 rounded-full shadow-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
                <span className="text-[10px] leading-[14px] uppercase text-[#4edea3] tracking-[0.06em] font-bold">
                  2026/2027 A/L Active Batches
                </span>
              </div>
              <span className="text-[10px] text-[#c0c7d5] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#ffb95f]">
                  verified
                </span>{' '}
                Islandwide
              </span>
            </div>

            {/* Mobile Hero Header */}
            <div className="relative mt-4 flex flex-col gap-1">
              <h1 className="text-[26px] leading-[34px] text-[#dde2f8] font-extrabold tracking-[-0.015em]">
                The Sovereign{' '}
                <span className="bg-gradient-to-r from-[#a4c8ff] via-[#a4c8ff] to-[#ffb95f] bg-clip-text text-transparent">
                  AI LMS
                </span>{' '}
                for Sri Lanka A/L Tuition
              </h1>
              <p className="text-[14px] text-[#c0c7d5] leading-relaxed">
                Engineered for G.C.E. Advanced Level master tutors. Military-grade 1080p DRM stream
                protection, machine-vision bank slip clearance, and high-speed physical turnstile
                NFC admissions.
              </p>
            </div>

            {/* Quick CTA Stack */}
            <div className="flex flex-col gap-2 mt-4">
              <button
                type="button"
                onClick={() => onFutureStageAction('Enroll in Course Batch')}
                className="w-full flex items-center justify-center gap-1.5 bg-[#3898ff] hover:bg-[#a4c8ff] text-[#00315e] text-[16px] font-bold py-3.5 px-4 rounded-lg shadow-[0_0_20px_rgba(56,152,255,0.3)] transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">school</span>
                <span>Enroll in Course Batch</span>
              </button>
              <a
                className="w-full flex items-center justify-center gap-1.5 bg-[#00ab76]/20 text-[#6ffbbe] text-[16px] font-semibold py-3 px-4 rounded-lg hover:bg-[#00ab76]/30 transition-all active:scale-[0.98]"
                href="tel:+94719876543"
              >
                <span className="material-symbols-outlined text-[20px] text-[#4edea3]">chat</span>
                <span>WhatsApp Hotline: +94 71 987 6543</span>
              </a>
            </div>

            {/* Live Performance Metrics Scroller */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-3 px-3">
              <div className="shrink-0 flex items-center gap-2 bg-[#191f2f] px-3.5 py-2 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-[#a4c8ff] text-[18px]">group</span>
                <div>
                  <p className="text-[10px] font-bold text-[#c0c7d5] uppercase">Learners</p>
                  <p className="text-[16px] font-bold text-[#dde2f8]">48.9k+</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2 bg-[#191f2f] px-3.5 py-2 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">
                  account_balance
                </span>
                <div>
                  <p className="text-[10px] font-bold text-[#c0c7d5] uppercase">Institutes</p>
                  <p className="text-[16px] font-bold text-[#dde2f8]">18 Academies</p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2 bg-[#191f2f] px-3.5 py-2 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                  document_scanner
                </span>
                <div>
                  <p className="text-[10px] font-bold text-[#c0c7d5] uppercase">Auto-Slip OCR</p>
                  <p className="text-[16px] font-bold text-[#4edea3]">96.8% Instant</p>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURED MASTERCLASS INTERACTIVE PREVIEW */}
          <div className="mt-8 px-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-[#a4c8ff] rounded-full" />
                <h2 className="text-[18px] leading-[26px] text-[#dde2f8] font-bold">
                  Featured Masterclass
                </h2>
              </div>
              <span className="text-[10px] text-[#ffb95f] font-bold uppercase tracking-wide">
                Live Tonight
              </span>
            </div>

            <div className="relative bg-[#242a3a] rounded-xl overflow-hidden shadow-xl">
              <div className="relative w-full aspect-video bg-[#080e1d] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Combined Mathematics Masterclass livestream thumbnail"
                  src={MASTERCLASS_IMG}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242a3a] via-transparent to-black/60" />

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="flex items-center gap-1 bg-[#ffb4ab]/90 text-[#690005] text-[10px] px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> LIVE
                  </span>
                  <span className="bg-[#080e1d]/80 backdrop-blur-md text-[#a4c8ff] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">lock</span> 1080p DRM
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 bg-[#080e1d]/80 backdrop-blur-md text-[#dde2f8] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  [25 Marks Proof]
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="Play Masterclass Preview"
                    onClick={() => onFutureStageAction('Masterclass Video Preview')}
                    className="w-12 h-12 rounded-full bg-[#3898ff] text-[#00315e] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[28px] ml-0.5">play_arrow</span>
                  </button>
                </div>

                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[#c0c7d5] text-[10px]">
                  <span className="truncate text-[#dde2f8] font-semibold">
                    Pure Maths Paper II: Mechanics &amp; Rigid Bodies
                  </span>
                  <span className="text-[#4edea3] font-bold">Free Preview</span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#a4c8ff] flex items-center justify-center text-[16px] text-[#00315e] font-bold shrink-0">
                    KS
                  </div>
                  <div>
                    <h3 className="text-[16px] text-[#dde2f8] font-bold leading-tight">
                      Eng. Kusal Senaratne (B.Sc. Eng Hons)
                    </h3>
                    <p className="text-[12px] text-[#c0c7d5]">
                      Combined Mathematics Special Batch • Rotary Hall &amp; Online
                    </p>
                  </div>
                </div>

                <div className="mt-1 pt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#c0c7d5]">Batch Admission Fee</span>
                    <span className="text-[16px] text-[#ffb95f] font-extrabold">
                      Rs. 4,500{' '}
                      <span className="text-[12px] text-[#c0c7d5] font-normal">/ Month</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onFutureStageAction('Instant Admission')}
                    className="bg-[#a4c8ff] text-[#00315e] px-4 py-2 rounded-lg text-[14px] font-bold flex items-center gap-1 active:scale-95 transition-transform"
                  >
                    <span>Instant Admission</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ENGINEERING FEATURES BENTO */}
          <div className="mt-8 px-3 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase text-[#a4c8ff] font-bold tracking-widest">
                Built for Sri Lanka A/L Realities
              </span>
              <h2 className="text-[18px] leading-[26px] text-[#dde2f8] font-bold">
                Unrivaled LMS Infrastructure
              </h2>
            </div>

            {/* Feature 1: Bank Slip OCR */}
            <div className="bg-[#191f2f] rounded-xl p-4 flex flex-col gap-2 shadow-lg relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#242a3a] flex items-center justify-center text-[#a4c8ff]">
                  <span className="material-symbols-outlined text-[24px]">receipt_long</span>
                </div>
                <span className="text-[10px] bg-[#4edea3]/15 text-[#4edea3] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" /> Instant Clearance
                </span>
              </div>
              <h3 className="text-[16px] text-[#dde2f8] font-bold mt-1">
                Machine Vision Bank Slip OCR
              </h3>
              <p className="text-[14px] text-[#c0c7d5]">
                Tired of manual slip checks? Automated verification for Bank of Ceylon (BOC),
                People&apos;s Bank, Commercial Bank, and CDM slips with zero admin overhead.
              </p>
              <div className="mt-1 bg-[#080e1d] p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffb95f] text-[20px]">
                    account_balance_wallet
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] text-[#dde2f8] font-bold">Ref: #BOC-9948291</p>
                    <p className="text-[12px] text-[#c0c7d5]">Branch: Kurunegala Super</p>
                  </div>
                </div>
                <span className="bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-bold px-2 py-0.5 rounded">
                  AUTHENTICATED
                </span>
              </div>
            </div>

            {/* Feature 2: Hardware DRM */}
            <div className="bg-[#191f2f] rounded-xl p-4 flex flex-col gap-2 shadow-lg relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#242a3a] flex items-center justify-center text-[#ffb4ab]">
                  <span className="material-symbols-outlined text-[24px]">shield_lock</span>
                </div>
                <span className="text-[10px] bg-[#ffb4ab]/15 text-[#ffb4ab] px-2.5 py-1 rounded-full font-bold">
                  Anti-Screen Capture
                </span>
              </div>
              <h3 className="text-[16px] text-[#dde2f8] font-bold mt-1">
                Hardware DRM &amp; Ephemeral Watermark
              </h3>
              <p className="text-[14px] text-[#c0c7d5]">
                Protect proprietary tutor intellectual property. Dynamic student NIC, phone number,
                and IP address micro-watermarks actively disrupt Telegram and screen-recording
                leaks.
              </p>
              <div className="mt-1 bg-[#080e1d] p-2 rounded-lg flex items-center gap-2 text-[#c0c7d5] text-[12px]">
                <span className="material-symbols-outlined text-[#a4c8ff] text-[18px]">
                  verified_user
                </span>
                <span>Widevine L1 + FairPlay Encrypted Chunk HLS</span>
              </div>
            </div>

            {/* Feature 3: Socratic AI Math Solver */}
            <div className="bg-[#191f2f] rounded-xl p-4 flex flex-col gap-2 shadow-lg relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#242a3a] flex items-center justify-center text-[#ffb95f]">
                  <span className="material-symbols-outlined text-[24px]">functions</span>
                </div>
                <span className="text-[10px] bg-[#ffb95f]/15 text-[#ffb95f] px-2.5 py-1 rounded-full font-bold">
                  KaTeX Formatter
                </span>
              </div>
              <h3 className="text-[16px] text-[#dde2f8] font-bold mt-1">
                Socratic AI Math Solver &amp; Guidance
              </h3>
              <p className="text-[14px] text-[#c0c7d5]">
                Step-by-step guidance designed specifically for Sri Lankan Combined Maths and
                Physics past papers with KaTeX formula rendering and Sinhala bilingual support.
              </p>
              <div className="mt-1 bg-[#080e1d] p-2 rounded-lg flex flex-col gap-1 font-mono text-[11px] text-[#a4c8ff] overflow-x-auto">
                <span className="text-[#c0c7d5]">// KaTeX Theorem Proof Check</span>
                <span>{`\\lim_{x \\to 0} \\frac{\\sin(ax)}{x} = a \\implies f'(x) = 3x^2 + \\cos(x)`}</span>
              </div>
            </div>

            {/* Feature 4: NFC Turnstile & PromptXpress */}
            <div className="bg-[#191f2f] rounded-xl p-4 flex flex-col gap-2 shadow-lg relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#242a3a] flex items-center justify-center text-[#4edea3]">
                  <span className="material-symbols-outlined text-[24px]">contactless</span>
                </div>
                <span className="text-[10px] bg-[#4edea3]/15 text-[#4edea3] px-2.5 py-1 rounded-full font-bold">
                  Physical Hall Sync
                </span>
              </div>
              <h3 className="text-[16px] text-[#dde2f8] font-bold mt-1">
                NFC Turnstile &amp; PromptXpress Tute Delivery
              </h3>
              <p className="text-[14px] text-[#c0c7d5]">
                One QR or NFC tap grants physical entry at Colombo, Gampaha, and Kandy lecture
                halls. Integrated PromptXpress API for real-time paper delivery straight to student
                doors.
              </p>
            </div>
          </div>

          {/* PARTNER ACADEMIES ROSTER */}
          <div className="mt-8 px-3">
            <div className="flex flex-col items-center text-center mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c0c7d5]">
                Trusted by Premier Institutions
              </span>
              <h3 className="text-[18px] leading-[26px] text-[#dde2f8] font-bold mt-0.5">
                Top Sri Lankan Tuition Networks
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  icon: 'calculate',
                  iconStyle: 'bg-[#a4c8ff]/10 text-[#a4c8ff]',
                  name: 'Apex Education',
                  meta: 'Combined Maths • Colombo',
                },
                {
                  icon: 'bolt',
                  iconStyle: 'bg-[#ffb95f]/10 text-[#ffb95f]',
                  name: 'Rotary Hall',
                  meta: 'Advanced Physics • Nugegoda',
                },
                {
                  icon: 'science',
                  iconStyle: 'bg-[#4edea3]/10 text-[#4edea3]',
                  name: 'Syzygy Campus',
                  meta: 'Chemistry Masterclass • Gampaha',
                },
                {
                  icon: 'biotech',
                  iconStyle: 'bg-[#3898ff]/20 text-[#a4c8ff]',
                  name: 'Sasip Institute',
                  meta: 'Biology & ICT • Kandy',
                },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="bg-[#191f2f] p-4 rounded-xl flex flex-col items-center text-center gap-1 shadow-sm"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${partner.iconStyle}`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{partner.icon}</span>
                  </div>
                  <p className="text-[16px] font-bold text-[#dde2f8] mt-1">{partner.name}</p>
                  <p className="text-[12px] text-[#c0c7d5]">{partner.meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STUDENT TRUST TESTIMONIAL */}
          <div className="mt-8 px-3">
            <div className="bg-gradient-to-br from-[#242a3a] to-[#191f2f] rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#ffb95f]">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#c0c7d5]">
                  Island Rank 03 (2024 Physical Science)
                </span>
              </div>
              <p className="text-[14px] text-[#dde2f8] italic">
                &ldquo;MindBridge&apos;s instant BOC slip upload cleared my class admission at 11:30
                PM just 5 minutes before the live Paper Discussion. The HD stream never buffered
                even on mobile data.&rdquo;
              </p>
              <div className="mt-2 flex items-center justify-between text-[#c0c7d5] text-[10px] font-bold">
                <span className="text-[#dde2f8] font-semibold">
                  Senuka Weerakkody — Ananda College
                </span>
                <span className="text-[#4edea3]">Verified Student</span>
              </div>
            </div>
          </div>

          {/* STICKY BOTTOM QUICK-ACTION DOCK */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080e1d]/90 backdrop-blur-xl px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
            <div className="max-w-md mx-auto flex items-center gap-2">
              <a
                aria-label="WhatsApp Helpline"
                className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#00ab76]/20 text-[#4edea3] rounded-lg hover:bg-[#00ab76]/30 transition-colors"
                href="tel:+94719876543"
              >
                <span className="material-symbols-outlined text-[24px]">forum</span>
              </a>
              <button
                type="button"
                onClick={() => onFutureStageAction('Enroll in Course')}
                className="flex-1 flex items-center justify-center gap-2 bg-[#3898ff] text-[#00315e] py-3 rounded-lg text-[16px] font-bold shadow-[0_0_16px_rgba(56,152,255,0.35)] active:scale-[0.98] transition-transform"
              >
                <span>Enroll in Course</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
