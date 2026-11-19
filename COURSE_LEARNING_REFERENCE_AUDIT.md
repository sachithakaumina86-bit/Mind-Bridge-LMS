# MINDBRIDGE LMS — STAGE 03: PHASE 2
# SCREEN 3: COURSE LEARNING EXPERIENCE / VIDEO PLAYER — REFERENCE AUDIT

**Scope:** Read-only reference audit of all uploaded Google Stitch HTML interfaces and matching PNG screenshots for **Screen 3 — Course Learning Experience / Video Player** in `Step_03_Student_Portal_and_Learning`.  
**Authoritative Design Rule:** Primary Light/Dark Pair only. The Oceanic Midnight `_dark_mode_web` variant is cataloged as an alternative reference only and must NOT be used.

---

## 1. Executive Summary

| Metric | Count | Notes |
| --- | --- | --- |
| **Total Screen 3 HTML Files** | **5** | 4 Primary + 1 Oceanic Midnight Alternative |
| **Total Matching Screenshots (PNG)** | **5** | 100% 1-to-1 matched pairs (10 files total) |
| **Authoritative Primary Variants** | **4** | Desktop Light, Desktop Dark, Mobile Light, Mobile Dark |
| **Excluded Alternative Variants** | **1** | Desktop Dark Oceanic Midnight (`_dark_mode_web`) |

---

## 2. Exact Stitch Reference File Matching (10 Files)

### Authoritative Primary Pair (To Be Used)
1. **Desktop Dark (Primary — `_1`, `web_standard`)**
   - HTML: `/public/assets/aistudio/mindbridge_lms_course_learning_experience_video_player_1__code_3bffc785.html`
   - PNG: `/public/assets/aistudio/mindbridge_lms_course_learning_experience_video_player_1__screen_ba16029f.png`
2. **Desktop Light (Primary — `_2`, `web_standard`)**
   - HTML: `/public/assets/aistudio/mindbridge_lms_course_learning_experience_video_player_2__code_8d1fdb0f.html`
   - PNG: `/public/assets/aistudio/mindbridge_lms_course_learning_experience_video_player_2__screen_08da06a5.png`
3. **Mobile Light (Primary — `mobile_tab`)**
   - HTML: `/public/assets/aistudio/mindbridge_lms_course_learning_video_player_mobile__code_af72db55.html`
   - PNG: `/public/assets/aistudio/mindbridge_lms_course_learning_video_player_mobile__screen_f15b617c.png`
4. **Mobile Dark (Primary — `mobile_tab`)**
   - HTML: `/public/assets/aistudio/mindbridge_lms_course_learning_video_player_dark_mode_mobile__code_0f63733a.html`
   - PNG: `/public/assets/aistudio/mindbridge_lms_course_learning_video_player_dark_mode_mobile__screen_7b237c13.png`

### Excluded Alternative Variant (Reference Only — Do NOT Use)
5. **Desktop Dark (Oceanic Midnight — `_dark_mode_web`, `web_dashboard`)**
   - HTML: `/public/assets/aistudio/mindbridge_lms_course_learning_video_player_dark_mode_web__code_6ceb2700.html`
   - PNG: `/public/assets/aistudio/mindbridge_lms_course_learning_video_player_dark_mode_web__screen_354bf971.png`
   - *Relationship:* Uses a 7-item left sidebar (`web_dashboard`) and different below-player tabs (`Lesson Brief`, `Tute Delivery Tracking`, `Sinhala Math Terms`). Preserved as alternative reference only.

---

## 3. Existing Phase 1 Codebase Review (Read-Only)

Inspection of the completed Phase 1 Student Portal codebase identifies the following reusable components and integration points:
- **`/src/context/AuthContext.tsx`:** Provides `useAuth()`, `verifiedProfile`, `VerifiedTenantMembership[]`, `isLoading`, `sessionError`, and `signOut`. Must be reused as the sole backend-authoritative session source.
- **`/src/components/student/types.ts`:** Defines `StudentNavPath` and `StudentPortalCommonProps`. Can be extended to support course/lesson view state without breaking Phase 1.
- **`/src/components/student/StudentPortalPage.tsx`:** Controls authenticated Student Portal routing, active tenant selection (`activeTenant`), and safe missing-screen notices. Will route into Screen 3 when a course/lesson is opened.
- **`/src/components/student/StudentPortalShell.tsx`:** Note that Primary Desktop Screen 3 uses a **`web_standard` topbar shell (NO left sidebar)**, whereas Primary Mobile Screen 3 uses the **`mobile_tab` bottom navigation bar** matching Phase 1's Light/Dark mobile bottom navs (`Courses` active). Therefore, Mobile Bottom Navigation patterns can be reused, while Desktop Screen 3 requires its own `web_standard` course player header.
- **`/src/components/student/StudentMultiAcademyHub.tsx`:** Contains course/resume entry points that will link into Screen 3 once approved.

No existing files were modified during this audit.

---

## 4. Theme-Specific & Responsive Differences Observed

### Desktop Light (`_2`) vs. Desktop Dark (`_1`)
- **Surfaces & Palette:** Light uses `#faf8ff` / `#ffffff` / `#f2f3ff` with `#005ab6` primary; Dark uses `#080e1d` / `#0d1322` / `#151b2b` with `#1f283d` borders and `#3898ff` primary.
- **Speed & Quality Controls:** Desktop Dark (`_1`) uses native `<select>` dropdowns for Playback Speed (`0.75x–2x`) and Video Quality (`Auto / 1080p FHD / 720p HD`), whereas Desktop Light (`_2`) uses button/pill indicators (`1.25x`, `1080p FHD`).
- **DRM Watermark Scrim:** Desktop Light (`_2`) renders a 3-line floating DRM watermark overlay over the video canvas and a diagonal watermark on the PDF handout; Desktop Dark (`_1`) leaves the watermark slot empty.

### Mobile Light vs. Mobile Dark
- **Content Tabs:** Mobile Light uses a 4-tab underline bar (`Syllabus (5)`, `Key Moments`, `Smart Notes`, `Tutes (2)`); Mobile Dark uses a 3-tab segmented control (`Curriculum (7)`, `Socratic AI`, `Formulas`) plus a floating timestamped Socratic AI input bar docked above the bottom nav.
- **Bottom Navigation:** Mobile Light highlights `Courses` in `Hub / Courses / Exams / Tasks / Grades`; Mobile Dark highlights `Courses` in `Hub / AI Tutor / Courses / Exams / Profile`.
