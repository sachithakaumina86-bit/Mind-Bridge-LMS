# MINDBRIDGE LMS — STAGE 03: STUDENT PORTAL & LEARNING
# REFERENCE AUDIT REPORT

**Date:** Stage 03 — Step 01 (Reference Audit & Development Planning)  
**Scope:** Read-only audit of all uploaded Google Stitch HTML interfaces and matching PNG screenshots for `Step_03_Student_Portal_and_Learning`.  
**Authoritative Source Rule:** Only the 72 uploaded Google Stitch files (36 HTML + 36 PNG) are used as UI references. No external templates, prior-stage designs, or invented screens are included.

---

## 1. Executive Summary

| Metric | Count | Notes |
| --- | --- | --- |
| **Total Uploaded Reference Files** | **72** | 100% 1-to-1 matched pairs |
| **Total HTML Reference Files** | **36** | All stored under `/public/assets/aistudio/` |
| **Total PNG Screenshot Files** | **36** | All stored under `/public/assets/aistudio/` |
| **Distinct Core Student Portal Screens** | **8** | Full Light/Dark & Desktop/Mobile coverage |
| **Screens with Dual Desktop Dark Variants** | **4** | Hub, Video Player, Exam Player, Assignment Portal |
| **Broken / Unstyled Screenshot Captures** | **1** | Assignment Portal Desktop Dark (`_1_1__screen`) |
| **Header / Nav Anomaly Findings** | **4** | Detailed in Section 5 & `STUDENT_PORTAL_MISSING_REFERENCES.md` |

---

## 2. Existing Project Structure Review (Read-Only)

Inspection of the current workspace confirms:
- **Frontend Stack:** React + TypeScript + Vite + Tailwind CSS v4 (`@import "tailwindcss";` in `/src/index.css`).
- **Source Layout:**
  - `/src/App.tsx` — Main application shell and view routing (Stage 01 public website + Stage 02 auth/onboarding/Super Admin).
  - `/src/components/` — Modular UI components (no `/src/pages` directory exists yet).
  - `/src/context/` — Includes `AuthContext.tsx` (Firebase Auth + verified session + `VerifiedTenantMembership`).
  - `/src/lib/` — Firebase initialization and API helpers.
  - `/src/services/` — Service layer for backend calls.
- **Backend Foundation (Stage 03 Auth & Backend):**
  - `/netlify/functions/` — Server-side Firebase ID token verification, `verify-session.ts`, student registration, teacher/institute onboarding, and multi-origin CORS.
  - `/supabase/migrations/202611180001_initial_auth_and_tenant_schema.sql` — Reviewed and hardened initial auth/tenant schema (not yet executed).

All completed Stage 01, Stage 02, and Stage 03 Auth & Backend files remain untouched during this audit.

---

## 3. Complete 1-to-1 File Matching Audit (72 Files)

Every uploaded HTML file has an exact matching PNG screenshot:

### Screen 1: Universal Student Portal / Multi-Academy Hub (5 HTML + 5 PNG)
1. **Desktop Dark (Primary Pair)**
   - HTML: `mindbridge_lms_universal_student_portal_multi_academy_hub_1__code_bccaaff9.html`
   - PNG: `mindbridge_lms_universal_student_portal_multi_academy_hub_1__screen_14c2a1b6.png`
2. **Desktop Light (Primary Pair)**
   - HTML: `mindbridge_lms_universal_student_portal_multi_academy_hub_2__code_36470437.html`
   - PNG: `mindbridge_lms_universal_student_portal_multi_academy_hub_2__screen_8f39c50e.png`
3. **Desktop Dark (Alternate — Oceanic Midnight)**
   - HTML: `mindbridge_lms_universal_student_portal_hub_dark_mode_web__code_ec98b1da.html`
   - PNG: `mindbridge_lms_universal_student_portal_hub_dark_mode_web__screen_e58ce773.png`
4. **Mobile Light**
   - HTML: `mindbridge_lms_universal_student_portal_hub_mobile__code_6c6dfc20.html`
   - PNG: `mindbridge_lms_universal_student_portal_hub_mobile__screen_e357ff2a.png`
5. **Mobile Dark**
   - HTML: `mindbridge_lms_universal_student_portal_hub_dark_mode_mobile__code_d2905379.html`
   - PNG: `mindbridge_lms_universal_student_portal_hub_dark_mode_mobile__screen_c7a7f202.png`

### Screen 2: Student Empty Hub — No Active Courses (4 HTML + 4 PNG)
6. **Desktop Light**
   - HTML: `mindbridge_lms_student_empty_hub_no_active_courses_light_mode__code_ce3b8004.html`
   - PNG: `mindbridge_lms_student_empty_hub_no_active_courses_light_mode__screen_b7d4a0df.png`
7. **Desktop Dark**
   - HTML: `mindbridge_lms_student_empty_hub_no_active_courses_dark_mode__code_e24ad127.html`
   - PNG: `mindbridge_lms_student_empty_hub_no_active_courses_dark_mode__screen_d69859c0.png`
8. **Mobile Light**
   - HTML: `mindbridge_lms_student_empty_hub_no_active_courses_light_mode_mobile__code_1dba7052.html`
   - PNG: `mindbridge_lms_student_empty_hub_no_active_courses_light_mode_mobile__screen_7bb8170e.png`
9. **Mobile Dark**
   - HTML: `mindbridge_lms_student_empty_hub_no_active_courses_dark_mode_mobile__code_8f834af4.html`
   - PNG: `mindbridge_lms_student_empty_hub_no_active_courses_dark_mode_mobile__screen_93d26be9.png`

### Screen 3: Course Learning Experience / Video Player (5 HTML + 5 PNG)
10. **Desktop Dark (Primary Pair — `web_standard` topbar)**
    - HTML: `mindbridge_lms_course_learning_experience_video_player_1__code_3bffc785.html`
    - PNG: `mindbridge_lms_course_learning_experience_video_player_1__screen_ba16029f.png`
11. **Desktop Light (Primary Pair — `web_standard` topbar)**
    - HTML: `mindbridge_lms_course_learning_experience_video_player_2__code_8d1fdb0f.html`
    - PNG: `mindbridge_lms_course_learning_experience_video_player_2__screen_08da06a5.png`
12. **Desktop Dark (Alternate — Oceanic Midnight `web_dashboard` sidebar)**
    - HTML: `mindbridge_lms_course_learning_video_player_dark_mode_web__code_6ceb2700.html`
    - PNG: `mindbridge_lms_course_learning_video_player_dark_mode_web__screen_354bf971.png`
13. **Mobile Light**
    - HTML: `mindbridge_lms_course_learning_video_player_mobile__code_af72db55.html`
    - PNG: `mindbridge_lms_course_learning_video_player_mobile__screen_f15b617c.png`
14. **Mobile Dark**
    - HTML: `mindbridge_lms_course_learning_video_player_dark_mode_mobile__code_0f63733a.html`
    - PNG: `mindbridge_lms_course_learning_video_player_dark_mode_mobile__screen_7b237c13.png`

### Screen 4: Online Examination & Anti-Cheat Quiz Player (5 HTML + 5 PNG)
15. **Desktop Light (Primary Pair — MCQ Paper 1 + Webcam PIP)**
    - HTML: `mindbridge_lms_online_examination_anti_cheat_quiz_player_1__code_3ae3422d.html`
    - PNG: `mindbridge_lms_online_examination_anti_cheat_quiz_player_1__screen_02399d23.png`
16. **Desktop Dark (Primary Pair — MCQ Paper 1, Browser Anti-Cheat Controls, No Webcam PIP)**
    - HTML: `mindbridge_lms_online_examination_anti_cheat_quiz_player_2__code_a8e96074.html`
    - PNG: `mindbridge_lms_online_examination_anti_cheat_quiz_player_2__screen_398be07f.png`
17. **Desktop Dark (Alternate — Oceanic Midnight Sidebar, Essay Paper II + LaTeX Canvas + OCR)**
    - HTML: `mindbridge_lms_online_examination_quiz_player_dark_mode_web__code_1ae9a478.html`
    - PNG: `mindbridge_lms_online_examination_quiz_player_dark_mode_web__screen_f98d26fb.png`
18. **Mobile Light (MCQ Paper 1)**
    - HTML: `mindbridge_lms_online_examination_quiz_player_mobile__code_2c248b4e.html`
    - PNG: `mindbridge_lms_online_examination_quiz_player_mobile__screen_3bb354f3.png`
19. **Mobile Dark (Essay Paper II + Scratchpad + Camera Upload)**
    - HTML: `mindbridge_lms_online_examination_quiz_player_dark_mode_mobile__code_4437bbfa.html`
    - PNG: `mindbridge_lms_online_examination_quiz_player_dark_mode_mobile__screen_19227d19.png`

### Screen 5: Exam Submission Receipt & Score Breakdown (4 HTML + 4 PNG)
20. **Desktop Light**
    - HTML: `mindbridge_lms_exam_submission_receipt_score_breakdown__code_ea3f512d.html`
    - PNG: `mindbridge_lms_exam_submission_receipt_score_breakdown__screen_5bfce868.png`
21. **Desktop Dark**
    - HTML: `mindbridge_lms_exam_submission_receipt_score_breakdown_dark_mode_1_1__code_fe43c6c0.html`
    - PNG: `mindbridge_lms_exam_submission_receipt_score_breakdown_dark_mode_1_1__screen_d8927f82.png`
22. **Mobile Light**
    - HTML: `mindbridge_lms_exam_submission_receipt_score_breakdown_light_mode_mobile__code_e9c075ce.html`
    - PNG: `mindbridge_lms_exam_submission_receipt_score_breakdown_light_mode_mobile__screen_4512a1c1.png`
23. **Mobile Dark**
    - HTML: `mindbridge_lms_exam_submission_receipt_score_breakdown_dark_mode_mobile__code_efb90a6b.html`
    - PNG: `mindbridge_lms_exam_submission_receipt_score_breakdown_dark_mode_mobile__screen_e6f3d20f.png`

### Screen 6: Student Assignment Portal & Submission Experience (5 HTML + 5 PNG)
24. **Desktop Light (Primary Pair)**
    - HTML: `mindbridge_lms_student_assignment_portal_submission_experience__code_7fa729c9.html`
    - PNG: `mindbridge_lms_student_assignment_portal_submission_experience__screen_dbedf547.png`
25. **Desktop Dark (Primary Pair — Broken Screenshot Capture)**
    - HTML: `mindbridge_lms_student_assignment_portal_submission_dark_mode_1_1__code_b35d1c33.html`
    - PNG: `mindbridge_lms_student_assignment_portal_submission_dark_mode_1_1__screen_bf7d7416.png` *(unstyled render in PNG; HTML contains full Tailwind styling)*
26. **Desktop Dark (Alternate — Oceanic Midnight Sidebar, Weekly Drill #14 + OCR)**
    - HTML: `mindbridge_lms_student_assignment_portal_submission_dark_mode_web__code_8b95e13d.html`
    - PNG: `mindbridge_lms_student_assignment_portal_submission_dark_mode_web__screen_b15584eb.png`
27. **Mobile Light**
    - HTML: `mindbridge_lms_student_assignment_portal_submission_mobile__code_c8d8fe98.html`
    - PNG: `mindbridge_lms_student_assignment_portal_submission_mobile__screen_0aad7ccf.png`
28. **Mobile Dark**
    - HTML: `mindbridge_lms_student_assignment_portal_submission_dark_mode_mobile__code_9d0f8d6a.html`
    - PNG: `mindbridge_lms_student_assignment_portal_submission_dark_mode_mobile__screen_dedbeb46.png`

### Screen 7: Student AI Learning Assistant / Socratic Study Companion (4 HTML + 4 PNG)
29. **Desktop Light**
    - HTML: `mindbridge_lms_student_ai_learning_assistant_socratic_study_companion_web__code_09810d06.html`
    - PNG: `mindbridge_lms_student_ai_learning_assistant_socratic_study_companion_web__screen_d6fa5de8.png`
30. **Desktop Dark**
    - HTML: `mindbridge_lms_student_ai_learning_assistant_socratic_study_companion_dark_mode__code_0a09077b.html`
    - PNG: `mindbridge_lms_student_ai_learning_assistant_socratic_study_companion_dark_mode__screen_7f1227f1.png`
31. **Mobile Light**
    - HTML: `mindbridge_lms_student_ai_study_companion_socratic_tutor_mobile__code_75d91a05.html`
    - PNG: `mindbridge_lms_student_ai_study_companion_socratic_tutor_mobile__screen_50227604.png`
32. **Mobile Dark**
    - HTML: `mindbridge_lms_student_ai_study_companion_socratic_tutor_dark_mode_mobile__code_4ba0f397.html`
    - PNG: `mindbridge_lms_student_ai_study_companion_socratic_tutor_dark_mode_mobile__screen_1fac224d.png`

### Screen 8: Student Profile & Performance Gradebook (4 HTML + 4 PNG)
33. **Desktop Light**
    - HTML: `mindbridge_lms_student_profile_performance_gradebook_1__code_71b2c9a9.html`
    - PNG: `mindbridge_lms_student_profile_performance_gradebook_1__screen_f92162b8.png`
34. **Desktop Dark**
    - HTML: `mindbridge_lms_student_profile_performance_gradebook_2__code_e712164d.html`
    - PNG: `mindbridge_lms_student_profile_performance_gradebook_2__screen_92e52640.png`
35. **Mobile Light**
    - HTML: `mindbridge_lms_student_profile_gradebook_mobile__code_fbe46426.html`
    - PNG: `mindbridge_lms_student_profile_gradebook_mobile__screen_a9e61633.png`
36. **Mobile Dark**
    - HTML: `mindbridge_lms_student_profile_gradebook_dark_mode_mobile__code_92033f54.html`
    - PNG: `mindbridge_lms_student_profile_gradebook_dark_mode_mobile__screen_f8e4e4ef.png`

---

## 4. Design System & Architectural Observations

### A. Dual Desktop Dark Design Families (Requires Decision)
Four screens (Hub, Video Player, Exam Player, Assignment Portal) contain **two distinct Desktop Dark variants**:
1. **Primary Light/Dark Pair Family (`_1`/`_2` or `_1_1`):**
   - Uses a 9-item sidebar on the Hub, `web_standard` topbar (no sidebar) on the Video Player and Exam Player, and consistent layout parity with the Desktop Light references.
2. **Oceanic Midnight Family (`_dark_mode_web`):**
   - Uses a unified 7-item `web_dashboard` sidebar across Hub, Video Player, Exam Player, and Assignment Portal (`Dashboard / Hub`, `AI Study Companion`, `Courses & Video Player`, `Examinations & Quizzes`, `Assignments & Homework`, `Tuition & Slip History`, `Settings & Profile`).
   - Introduces distinct domain cards (e.g., NFC Gate Pass, Socratic AI Mini-Lab, Tute Delivery Tracking, Essay Paper II LaTeX/OCR mode).

### B. Mobile Navigation Pattern
- Mobile screens consistently use a fixed 5-tab bottom navigation bar:
  - **Dark Mobile (`Oceanic Midnight` style):** `Hub`, `AI Tutor`, `Courses`, `Exams`, `Profile`.
  - **Light Mobile:** `Hub`, `Courses`, `Exams`, `Tasks`, `Grades` (or `Profile`).
- Mobile headers include the MindBridge logo, active academy/course pill, notifications bell, and profile avatar.

### C. Typography, Color & Domain Patterns
- **Color Palette:** Light mode uses crisp slate/white surfaces (`#F8FAFC` / `#FFFFFF`) with deep royal/cobalt blue primary accents; Dark mode uses deep oceanic/navy surfaces (`#0B1120` / `#0F172A` / `#131C31`) with electric sky-blue (`#38BDF8` / `#2563EB`), emerald (`#10B981`), and amber (`#F59E0B`) status accents.
- **Academic & Sri Lankan A/L Context:** References include bilingual Sinhala/English math terminology, LaTeX/MathJax formulas, DRM-watermarked video overlays (`SL-LRN-89401 • AES-256 DRM`), SHA-256 cryptographic exam receipts, Colombo/Island-wide percentile ranks, and PromptXpress physical tute waybill tracking.

---

## 5. Anomalies Detected in Stitch References

1. **Broken Screenshot Capture:** `mindbridge_lms_student_assignment_portal_submission_dark_mode_1_1__screen_bf7d7416.png` captured unstyled HTML (CSS failed to load during capture). Its paired HTML file is intact.
2. **Empty Hub Mobile Header Text Mismatches:**
   - Mobile Dark header displays `"Anti Cheat Lockout"`.
   - Mobile Light header displays `"Account Pending Verification"`.
3. **Exam Receipt Mobile Light Header Text Mismatch:**
   - Header displays `"Live Exam Session"` even though the screen body is the concluded cryptographic receipt.
4. **Assignment Portal Sidebar & Top-Right Identity Anomaly (`_experience` / `_1_1`):**
   - Sidebar includes a Teacher/Student/Admin role switcher and displays `Eng. Kusal Senaratne` (the instructor) in the top-right profile slot instead of the student (`Kavindu Nirmal Perera`).
   - Assignment Mobile Dark highlights `Hub` in the bottom navigation bar instead of an Assignments/Tasks tab.

All anomalies are cataloged in `/STUDENT_PORTAL_MISSING_REFERENCES.md` for confirmation before implementation.
