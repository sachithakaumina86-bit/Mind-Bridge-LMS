# MINDBRIDGE LMS — STAGE 03: STUDENT PORTAL & LEARNING
# SCREEN INVENTORY

This inventory documents all **8 core Student Portal screens** identified across the **72 uploaded Google Stitch reference files** (36 HTML + 36 PNG), including theme/viewport coverage, reusable UI components, and visible user interactions.

---

## 1. Master Screen & Variant Coverage Matrix

| # | Screen Name | Desktop Light | Desktop Dark (Primary) | Desktop Dark (Oceanic Midnight Alt) | Mobile Light | Mobile Dark | Total Files (HTML + PNG) |
| :-: | :--- | :-: | :-: | :-: | :-: | :-: | :-: |
| 1 | **Universal Student Portal / Multi-Academy Hub** | Yes (`_2`) | Yes (`_1`) | Yes (`_dark_mode_web`) | Yes | Yes | **10** (5 + 5) |
| 2 | **Student Empty Hub (No Active Courses)** | Yes | Yes | — | Yes | Yes | **8** (4 + 4) |
| 3 | **Course Learning Experience / Video Player** | Yes (`_2`) | Yes (`_1`) | Yes (`_dark_mode_web`) | Yes | Yes | **10** (5 + 5) |
| 4 | **Online Examination & Anti-Cheat Quiz Player** | Yes (`_1` MCQ) | Yes (`_2` MCQ) | Yes (`_dark_mode_web` Essay) | Yes (MCQ) | Yes (Essay) | **10** (5 + 5) |
| 5 | **Exam Submission Receipt & Score Breakdown** | Yes | Yes (`_1_1`) | — | Yes | Yes | **8** (4 + 4) |
| 6 | **Student Assignment Portal & Submission** | Yes | Yes (`_1_1`*) | Yes (`_dark_mode_web`) | Yes | Yes | **10** (5 + 5) |
| 7 | **AI Learning Assistant / Socratic Study Companion** | Yes | Yes | — | Yes | Yes | **8** (4 + 4) |
| 8 | **Student Profile & Performance Gradebook** | Yes (`_1`) | Yes (`_2`) | — | Yes | Yes | **8** (4 + 4) |
| | **TOTAL** | **8** | **8** | **4** | **8** | **8** | **72** (36 + 36) |

*\*Note: Screen 6 Desktop Dark (`_1_1`) PNG screenshot rendered unstyled, though its HTML file is intact.*

---

## 2. Detailed Screen Specifications

### Screen 1: Universal Student Portal / Multi-Academy Hub
- **Purpose:** Primary authenticated landing dashboard for enrolled students across one or more academies/tenants.
- **Key Sections & Components:**
  - Multi-Academy Switcher dropdown/pill (switching between enrolled institutes/teachers).
  - Live Broadcast / Upcoming Class Countdown banner with join CTA.
  - Quick Resume Learning card (last watched lesson + progress bar).
  - Enrolled Courses grid with progress rings and next-lesson triggers.
  - Pending Homework & Upcoming Quizzes summary list.
  - Tuition / Payment Standing card (verified status, monthly slip status).
  - Gemini / Socratic AI Copilot quick-launch card.
  - *(Oceanic Midnight Alt only):* NFC Gate Pass card and Socratic AI Mini-Lab widget.
- **Visible Interactions:** Switch academy tenant, resume course, join live class, open AI tutor, navigate via sidebar / mobile bottom nav, toggle Light/Dark theme.

### Screen 2: Student Empty Hub (No Active Courses)
- **Purpose:** Zero-state dashboard for newly registered students who have not yet enrolled in any courses or academies.
- **Key Sections & Components:**
  - Empty-state hero illustration/icon with onboarding message.
  - Primary CTAs: Browse Academies / Enter Enrollment Key / Redeem Invite Code.
  - Getting-started checklist / onboarding steps.
- **Visible Interactions:** Enter academy/class invite code, navigate to academy discovery, open profile/settings.

### Screen 3: Course Learning Experience / Video Player
- **Purpose:** Core lesson playback and study workspace for recorded/live DRM-protected classes.
- **Key Sections & Components:**
  - 16:9 DRM-watermarked video player with custom controls (play/pause, ±10s seek, playback speed `1.25x`, quality `1080p DRM`, chapter selector, fullscreen).
  - Lesson metadata header (unit, instructor badge, CDN peering status, bookmark).
  - Content sub-tabs:
    - *Primary Pair:* `Overview`, `LaTeX Proofs`, `Handout PDF`, `Discussion`.
    - *Oceanic Midnight Alt:* `Lesson Brief & Syllabus Map`, `Tute Delivery Tracking` (waybill status + PDF backup), `Sinhala Math Terms (බහුභාෂා පාරිභාෂික ශබ්ද)`.
  - Right sidebar / Mobile tabs: `Curriculum / Playlist` (completed, active, locked lessons with quiz/checkpoint gates) and `AI Socratic Companion` (timestamp-synced Q&A).
  - Sticky lesson completion / next-lesson bar.
- **Visible Interactions:** Play/pause/seek video, switch lesson from playlist, switch sub-tabs, download PDF handout, ask timestamp-tagged question to Socratic AI, mark lesson complete.

### Screen 4: Online Examination & Anti-Cheat Quiz Player
- **Purpose:** Timed, proctored assessment player supporting both MCQ (Paper I) and Structured Essay (Paper II) formats.
- **Key Sections & Components:**
  - Top exam bar: exam title, autosave status, live countdown timer, Formulas & Logs modal trigger, Calculator trigger, Submit Exam button.
  - Anti-cheat integrity bar: Proctor Active, Tab Focus Monitored, Fullscreen Enforced, dynamic student watermark (`SL-LRN-89401 • NIC`), and optional Webcam PIP (Desktop Light `_1`).
  - Question Navigator palette (answered, current, flagged, unanswered).
  - Question canvas:
    - *MCQ Mode (Desktop Light `_1`, Desktop Dark `_2`, Mobile Light):* LaTeX problem statement + selectable A/B/C/D/E option cards.
    - *Essay Mode (Oceanic Midnight Desktop Dark, Mobile Dark):* Multi-part structured problem, Digital Scratchpad with math symbol toolbar (`∫`, `d/dx`, `√x`, `π`, `θ`, `∞`, `Σ`, `±`), and Handwritten Work Attachment / Camera OCR upload preview.
  - Bottom controls: Flag for Review, Previous, Next, Submit.
- **Visible Interactions:** Select MCQ option or type/upload essay work, flag question, jump via question palette, open formula sheet/calculator, submit exam.

### Screen 5: Exam Submission Receipt & Score Breakdown
- **Purpose:** Post-exam cryptographic verification receipt, rank analytics, and item-by-item diagnostic review.
- **Key Sections & Components:**
  - Official Cryptographic Receipt header with SHA-256 Merkle audit hash, `Copy Hash`, and `Download Signed PDF Receipt`.
  - KPI Summary cards: Exam Score (`92/100`, Grade `A*`), District Rank (`#14 Colombo`, `98.4th %ile`), Cohort Dynamics (Class Avg / Median vs Student), Speed & Accuracy (`44 Correct`, `4 Wrong`, `2 Skipped`).
  - Domain Mastery progress bars (4 syllabus topics) + Cognitive Bloom Tiers (Foundational, Intermediate, Distinction).
  - Question Diagnostics & Step-by-Step Model Derivations: filter tabs (`All`, `Correct`, `Incorrect`, `Unanswered`, `Flagged`), question jump strip, official marking scheme, pitfall alerts, and Master Lecturer Video Explainer snippet.
  - Smart Weak-Spot Remediation card (`Launch 10-Min Speed Drill`, `Save to Revision Vault`, `Send Report Card to Parent WhatsApp`, `Full 18-pg Solution Booklet PDF`, `Return to Student Course Hub`).
- **Visible Interactions:** Copy SHA-256 hash, download PDF, filter and jump between diagnosed questions, play explainer video snippet, launch remediation drill, return to hub.

### Screen 6: Student Assignment Portal & Submission Experience
- **Purpose:** View active/past homework assignments, upload PDF/handwritten image submissions (with OCR preview), and inspect graded feedback.
- **Key Sections & Components:**
  - Active assignment detail header (due date countdown, marks weight, syllabus tag, rubric).
  - Drag-and-drop / camera file upload zone with upload progress, file preview, and OCR clarity indicator.
  - Submission history & graded assignments table/list with scores, status badges, and instructor feedback notes.
- **Visible Interactions:** Select assignment, upload/remove submission file, submit assignment, view graded feedback and rubric breakdown.

### Screen 7: Student AI Learning Assistant / Socratic Study Companion
- **Purpose:** Dedicated Socratic AI tutoring workspace grounded in the student's enrolled courses and syllabus.
- **Key Sections & Components:**
  - Left conversation history / topic threads sidebar (desktop) or drawer (mobile).
  - Active Socratic chat stream with LaTeX equation rendering, step-by-step guided hints (not direct answer dumps), and syllabus/lesson citations.
  - Prompt composer with math/equation input support, image/problem upload trigger, and suggested Socratic quick-prompts.
- **Visible Interactions:** Start new study thread, switch threads, send text/image math question, click quick-prompt chips, open cited lesson.

### Screen 8: Student Profile & Performance Gradebook
- **Purpose:** Student academic identity, multi-academy enrollment record, cumulative gradebook, and attendance/performance trends.
- **Key Sections & Components:**
  - Student profile header (name, `SL-LRN-89401`, NIC, cohort, verified badge).
  - Cumulative KPI cards (overall GPA/average, attendance rate, island/district standing, completed credits).
  - Subject/Course Gradebook table with exam/assignment breakdowns, grades, and trend indicators.
  - Academic performance charts / topic mastery breakdown.
- **Visible Interactions:** Filter gradebook by academy/term, inspect course grade breakdown, export transcript/report, access profile settings.
