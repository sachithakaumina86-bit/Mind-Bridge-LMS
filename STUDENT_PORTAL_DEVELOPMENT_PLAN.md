# MINDBRIDGE LMS — STAGE 03: STUDENT PORTAL & LEARNING
# DEVELOPMENT PLAN

**Status:** Proposed Plan — Pending User Approval & Clarification of Dual-Variant Decisions  
**Constraint:** No UI code, routes, or database changes have been made yet. Implementation will strictly reproduce the approved Google Stitch HTML/PNG references while integrating with the existing Stage 03 Auth & Backend foundation.

---

## 1. Architectural Integration Strategy

1. **Preserve Existing Stages:** Keep all Stage 01 (Public Website), Stage 02 (Auth / Onboarding / Super Admin), and Stage 03 Auth & Backend files intact.
2. **Modular Student Portal Structure:** Organize new Student Portal UI under `/src/components/student/` (matching the existing `/src/components/` convention) with shared shell components (`StudentPortalShell`, `StudentSidebar`, `StudentMobileNav`, `AcademySwitcher`, `ThemeToggle`).
3. **Auth & Tenant Context Integration:**
   - Gate the Student Portal behind the existing `AuthContext` verified session (`verify-session.ts`).
   - Populate the Multi-Academy Switcher from `VerifiedTenantMembership[]` returned by `verify-session.ts`.
   - Route students with zero active course enrollments to **Screen 2 (Student Empty Hub)** and enrolled students to **Screen 1 (Universal Student Portal Hub)**.
4. **Theme & Responsive Parity:** Implement full Light Mode and Dark Mode support alongside responsive Desktop (`lg+`) and Mobile (`<lg`) layouts matching the Stitch references 1-to-1.
5. **No Invented Screens:** Navigation links pointing to screens outside the 8 uploaded Stitch references (see `STUDENT_PORTAL_MISSING_REFERENCES.md`) will either be clearly scoped as deferred placeholders or omitted until their Stitch references are supplied, per user decision.

---

## 2. Recommended Phased Implementation Sequence

### Phase 1 — Student Portal Shell, Navigation & Hubs (Recommended First Task)
- **Target Screens:**
  - Shared Responsive Shell (Desktop Sidebar + Topbar + Mobile Bottom Nav + Light/Dark Theme Switcher)
  - **Screen 1:** Universal Student Portal / Multi-Academy Hub
  - **Screen 2:** Student Empty Hub (No Active Courses)
- **Why First:** Establishes the persistent layout, theme tokens, Multi-Academy Switcher, and authenticated student routing (`Empty Hub` vs `Active Hub`) that all remaining 6 screens plug into.

### Phase 2 — Course Learning Experience & Video Player
- **Target Screen:**
  - **Screen 3:** Course Learning Experience / Video Player
- **Scope:** 16:9 DRM-watermarked video player UI, custom playback controls, lesson playlist with lock/completion states, sub-tabs (`Overview` / `LaTeX Proofs` / `Handout PDF` / `Discussion` or Oceanic Midnight `Lesson Brief` / `Tute Delivery` / `Sinhala Math Terms`), and timestamp-synced Socratic AI side panel.

### Phase 3 — Online Examination & Submission Receipt Flow
- **Target Screens:**
  - **Screen 4:** Online Examination & Anti-Cheat Quiz Player (MCQ Paper I + Essay Paper II modes)
  - **Screen 5:** Exam Submission Receipt & Score Breakdown
- **Scope:** Anti-cheat integrity bar, countdown timer, question palette, MCQ selector, Essay LaTeX scratchpad + handwritten OCR upload UI, submission transition into the cryptographic SHA-256 receipt, domain mastery bars, cognitive Bloom tiers, and question-by-question diagnostic walkthrough.

### Phase 4 — Student Assignment Portal & Submission Experience
- **Target Screen:**
  - **Screen 6:** Student Assignment Portal & Submission Experience
- **Scope:** Active assignment detail view, drag-and-drop / camera file upload with OCR clarity preview, and graded submission history table.

### Phase 5 — Socratic AI Study Companion
- **Target Screen:**
  - **Screen 7:** Student AI Learning Assistant / Socratic Study Companion
- **Scope:** Thread history sidebar, Socratic chat stream with LaTeX formatting and lesson citations, quick-prompt chips, and problem image upload composer.

### Phase 6 — Student Profile & Performance Gradebook
- **Target Screen:**
  - **Screen 8:** Student Profile & Performance Gradebook
- **Scope:** Student academic identity header, KPI summary cards, filterable multi-academy gradebook table, and performance/mastery visualizations.

### Phase 7 — Verification & QA
- Full Light/Dark and Desktop/Mobile visual verification against all 36 Stitch PNG screenshots.
- `compile_applet` and `lint_applet` verification.
- Confirmation of zero regressions to Stage 01, Stage 02, and Stage 03 Auth & Backend.

---

## 3. Pre-Implementation Decisions Needed from User

Before starting Phase 1, please confirm:
1. **Desktop Dark Design Family:** For the 4 screens with two Desktop Dark variants (Hub, Video Player, Exam Player, Assignment Portal), should we use the **Primary Light/Dark Pair (`_1`/`_2` / `_1_1`)** or the **Oceanic Midnight (`_dark_mode_web`)** variant?
2. **Anomaly Fixes:** Confirm permission to normalize the 4 minor Stitch header/identity anomalies (e.g., fixing `"Anti Cheat Lockout"` on Empty Hub Mobile Dark and showing the student's name instead of the instructor's name on Assignment Portal).
3. **Unreferenced Nav Links:** Confirm how to handle sidebar/menu links for screens not yet in this Stitch package (e.g., Tuition & Slip History, Live Classes Lobby, Certificates, Settings).
