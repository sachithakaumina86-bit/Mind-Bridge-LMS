# MINDBRIDGE LMS — STAGE 03: PHASE 2
# SCREEN 3: COURSE LEARNING EXPERIENCE / VIDEO PLAYER — MISSING REFERENCES & AMBIGUITIES

---

## 1. Missing Linked Screens (Referenced in Screen 3, Not Uploaded)

| # | Referenced Destination | Where Referenced in Screen 3 | Status |
| :-: | :--- | :--- | :--- |
| 1 | **Course Syllabus / Enrolled Courses List** | Desktop `Curriculum` / `arrow_back` (`data-path="course-syllabus"`) | Missing |
| 2 | **Standalone Notes & Homework Page** | Desktop topbar `Notes & HW` (`data-path="lesson-resources"`) | Missing |
| 3 | **Standalone Discussion Forum** | Desktop topbar `Q&A` (`data-path="discussion-forum"`) | Missing |
| 4 | **5-Question Concept Check Modal/Screen** | Desktop sticky bottom bar (`5-Question Concept Check`) | Missing |
| 5 | **Tutor Live Q&A Room** | Desktop Curriculum sidebar (`Join` button) | Missing |
| 6 | **Book 1-on-1 Office Hour** | Desktop Instructor card link | Missing |
| 7 | **Technical Support Desk** | Desktop footer (`Technical Support`) | Missing |
| 8 | **Notifications Center** | Mobile Light & Mobile Dark headers | Missing |

*Per project rules, none of these screens will be invented; their triggers will preserve safe notice behavior.*

---

## 2. Reference Ambiguities Requiring User Confirmation Before Phase 2 Implementation

1. **Desktop Dark vs. Desktop Light Control Differences:**
   - Desktop Dark (`_1`) uses `<select>` dropdowns for Playback Speed and Video Quality and omits the floating DRM watermark scrim over the video canvas/PDF.
   - Desktop Light (`_2`) uses button/pill controls for Speed/Quality and includes the floating DRM watermark scrim.
   - **Question:** Should we preserve each theme's exact reference-specific controls (as done for Mobile Bottom Nav in Phase 1), or standardize both Desktop Light and Dark to use the interactive `<select>` controls?
2. **Mobile Dark Secondary Tabs (`Socratic AI` and `Formulas`):**
   - In Mobile Dark (`...video_player_dark_mode_mobile__code_0f63733a.html`), the 3-tab segmented control (`Curriculum`, `Socratic AI`, `Formulas`) has active tab styling JS, but only the `Curriculum` tab body is populated in the HTML; `Socratic AI` and `Formulas` tab panel bodies are not authored in the Stitch HTML.
   - **Question:** For Mobile Dark `Socratic AI` and `Formulas` tabs, should we display clean awaiting-content / backend-pending panel states without inventing unreferenced layouts?
3. **Route Entry Behavior for `Courses` Nav Item:**
   - Since there is no uploaded Stitch reference for a **My Enrolled Courses / Course Catalog** list screen, clicking `Courses` in the Hub Sidebar or Mobile Bottom Nav currently shows a missing-screen notice.
   - **Question:** Should clicking `Courses` (or a dedicated `/student/course` route) open **Screen 3 (Course Learning Experience / Video Player)** directly, or keep `Courses` on the notice until a Course Catalog reference is supplied?
