# MINDBRIDGE LMS — STAGE 03: STUDENT PORTAL & LEARNING
# MISSING REFERENCES, DUAL VARIANTS & ANOMALIES REPORT

This report documents every missing linked screen, ambiguous dual-variant design, and Stitch capture anomaly found during the read-only audit of the 72 uploaded reference files.

---

## 1. Missing Referenced Screens (Linked in Navigation, Not Uploaded)

The uploaded Stitch HTML files contain navigation links, sidebar items, or CTA buttons pointing to the following screens, which have **no HTML or PNG references** in `Step_03_Student_Portal_and_Learning`:

| # | Referenced Screen / Destination | Where Referenced | Status |
| :-: | :--- | :--- | :--- |
| 1 | **My Enrolled Courses / Course Catalog & Syllabus** | Hub sidebar (`My Courses`), Mobile nav (`Courses` list view) | Missing |
| 2 | **Live Virtual Classes Lobby** | Hub sidebar (`Live Classes`), Live Broadcast Countdown CTA | Missing |
| 3 | **Bank Slips & Receipts / Tuition Payment Portal** | Hub sidebar (`Tuition & Slip History` / `Payments`), Payment Standing card | Missing |
| 4 | **Certificates & Badges** | Hub sidebar (`Certificates`) | Missing |
| 5 | **Student Settings & Preferences** | Hub sidebar (`Settings & Profile`), Topbar profile menu | Missing |
| 6 | **Academy Storefront / Browse Academies** | Empty Hub primary CTA (`Browse Academies`) | Missing |
| 7 | **Notifications Center** | Topbar bell icon across all Desktop & Mobile screens | Missing |
| 8 | **Academic Support / Tickets** | Hub sidebar (`Support`) | Missing |

*Per project rules, none of these screens will be invented or designed without approved Google Stitch references.*

---

## 2. Dual Desktop Dark Variants (Clarification Required)

Four screens include **two different Desktop Dark designs**. Please confirm which family is authoritative for Desktop Dark Mode:

1. **Universal Student Portal / Multi-Academy Hub**
   - *Primary Pair Dark:* `...multi_academy_hub_1__code_bccaaff9.html` (9-item sidebar, matches Desktop Light `_2`).
   - *Oceanic Midnight Alt:* `...hub_dark_mode_web__code_ec98b1da.html` (7-item sidebar, adds NFC Gate Pass & Socratic AI Mini-Lab).
2. **Course Learning Experience / Video Player**
   - *Primary Pair Dark:* `...video_player_1__code_3bffc785.html` (`web_standard` topbar, 4 sub-tabs: Overview, LaTeX Proofs, Handout PDF, Discussion).
   - *Oceanic Midnight Alt:* `...video_player_dark_mode_web__code_6ceb2700.html` (7-item `web_dashboard` sidebar, adds Tute Delivery Tracking & Sinhala Math Terms).
3. **Online Examination & Anti-Cheat Quiz Player**
   - *Primary Pair Dark:* `...anti_cheat_quiz_player_2__code_a8e96074.html` (`web_standard` topbar, MCQ Paper 1, browser-only anti-cheat controls, no webcam PIP).
   - *Oceanic Midnight Alt:* `...quiz_player_dark_mode_web__code_1ae9a478.html` (7-item sidebar, Essay Paper II with LaTeX working canvas + handwritten OCR upload).
   - *Note:* Desktop Light `_1` includes a Webcam PIP on MCQ Paper 1, whereas Desktop Dark `_2` omits the Webcam PIP. Both MCQ and Essay modes can be supported if desired.
4. **Student Assignment Portal & Submission Experience**
   - *Primary Pair Dark:* `...submission_dark_mode_1_1__code_b35d1c33.html` (matches Desktop Light `_experience`).
   - *Oceanic Midnight Alt:* `...submission_dark_mode_web__code_8b95e13d.html` (7-item sidebar, Weekly Drill #14 + OCR + Historical table).

---

## 3. Stitch Reference Capture Anomalies

| # | File(s) Affected | Anomaly Observed | Recommended Handling |
| :-: | :--- | :--- | :--- |
| 1 | `...assignment_portal_submission_dark_mode_1_1__screen_bf7d7416.png` | **Broken/Unstyled Screenshot:** Tailwind CSS failed to load when Stitch captured the PNG. The paired HTML (`_code_b35d1c33.html`) has full Tailwind classes intact. | Use the intact HTML classes + Desktop Light layout parity if this variant is chosen. |
| 2 | `...empty_hub...dark_mode_mobile__code_8f834af4.html` & `...light_mode_mobile__code_1dba7052.html` | **Header Title Mismatch:** Mobile Dark header reads `"Anti Cheat Lockout"`; Mobile Light header reads `"Account Pending Verification"`. | Normalize mobile header to match the Empty Hub context (e.g., `"Student Hub"`). |
| 3 | `...exam_submission_receipt...light_mode_mobile__code_e9c075ce.html` | **Header Title Mismatch:** Mobile Light header reads `"Live Exam Session"` on a concluded exam receipt screen. | Normalize header to `"Exam Receipt"` / `"Exam Concluded & Locked"`. |
| 4 | `...assignment_portal_submission_experience__code_7fa729c9.html`, `...dark_mode_1_1__code_b35d1c33.html`, `...dark_mode_mobile__code_9d0f8d6a.html` | **Role/Identity & Nav Highlight Anomaly:** Desktop Light/Dark (`_experience` / `_1_1`) sidebar shows a Teacher/Student/Admin switcher and `Eng. Kusal Senaratne` in the top-right profile slot. Mobile Dark highlights `Hub` in the bottom nav. | Bind top-right profile to the authenticated student (`AuthContext`) and highlight the active Assignments/Tasks nav item. |
