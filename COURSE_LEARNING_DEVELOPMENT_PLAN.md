# MINDBRIDGE LMS — STAGE 03: PHASE 2
# SCREEN 3: COURSE LEARNING EXPERIENCE / VIDEO PLAYER — DEVELOPMENT PLAN

**Status:** Proposed Plan — Pending User Approval & Clarification  
**Constraint:** Read-only audit phase. No code, routes, AuthContext, or database changes have been made.

---

## 1. Architectural Integration Plan

1. **Preserve Phase 1 & Earlier Stages:** Keep Stage 01, Stage 02, `AuthContext.tsx`, Netlify Functions, Supabase migrations, and Phase 1 Hubs completely intact.
2. **Modular Component Structure under `/src/components/student/course/`:**
   - `CourseLearningPage.tsx` — Top-level Screen 3 container integrating `AuthContext` (`verifiedProfile`, `activeTenant`), theme, and responsive switching.
   - `CoursePlayerHeader.tsx` — Desktop `web_standard` topbar (with back-to-hub, academy badge, lesson breadcrumb, batch progress bar, 4-item nav, theater/drawer toggles, theme toggle, profile) + Mobile Light/Dark headers.
   - `VideoPlayerStage.tsx` — 16:9 video player shell with Stitch-faithful controls (Play/Pause, ±10s, Scrubber, Speed, Quality, Audio track, Subtitles, Fullscreen) and honest awaiting-stream state when no backend video URL is bound.
   - `CourseWorkspaceTabs.tsx` — Responsive below-player tabs:
     - Desktop: `Overview & Key Concepts`, `LaTeX Derivations & Proofs`, `Handout PDF Reader`, `Student Discussion`.
     - Mobile Light: `Syllabus`, `Key Moments`, `Smart Notes`, `Tutes`.
     - Mobile Dark: `Curriculum`, `Socratic AI`, `Formulas` + docked Socratic input bar.
   - `CourseCurriculumSidebar.tsx` — Desktop right-hand 2-tab card (`Curriculum` + `AI Copilot v2.5`) and Instructor Note card.
   - `CourseCompletionBar.tsx` — Desktop sticky bottom progress & action bar (`5-Question Concept Check`, `Mark as Complete & Next Lesson`).
3. **Routing Integration:**
   - Add `/student/course` (or `/student/learn`) route in `App.tsx` and wire `StudentPortalPage.tsx` so clicking `Courses` in the Hub or Mobile Bottom Nav can open Screen 3 safely behind the `verifiedProfile` gate.

---

## 2. Recommended First Implementation Task (Phase 2 — Step 02)

1. Implement **`CourseLearningPage.tsx`**, **`CoursePlayerHeader.tsx`**, and **`VideoPlayerStage.tsx`** with full 4-variant parity (Desktop Light, Desktop Dark, Mobile Light, Mobile Dark) and wire `/student/course` into `StudentPortalPage.tsx` and `App.tsx`.
2. Follow immediately with **`CourseWorkspaceTabs.tsx`**, **`CourseCurriculumSidebar.tsx`**, and **`CourseCompletionBar.tsx`**, then run `compile_applet` and `lint_applet` and deliver the Phase 2 Implementation Report.
