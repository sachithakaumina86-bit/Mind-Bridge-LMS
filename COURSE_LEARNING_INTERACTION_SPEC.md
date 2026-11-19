# MINDBRIDGE LMS — STAGE 03: PHASE 2
# SCREEN 3: COURSE LEARNING EXPERIENCE / VIDEO PLAYER — INTERACTION SPECIFICATION

This specification distinguishes strictly between **UI behavior supported by the uploaded Stitch references**, **functionality requiring future backend APIs**, and **missing/ambiguous requirements**.

---

## 1. UI Behavior Supported by Stitch References (Frontend State)

| Interaction | Desktop Primary (`_1` / `_2`) | Mobile Light | Mobile Dark |
| :--- | :--- | :--- | :--- |
| **Workspace Sub-Tabs** | Switch between `Overview & Key Concepts`, `LaTeX Derivations & Proofs`, `Handout PDF Reader`, `Student Discussion` | Switch between `Syllabus`, `Key Moments`, `Smart Notes`, `Tutes` | Switch between `Curriculum`, `Socratic AI`, `Formulas` |
| **Right Sidebar Tabs** | Switch between `Curriculum` and `AI Copilot v2.5` (also triggered by `Ask Copilot` button) | N/A (inline tabs) | N/A (segmented control + docked AI bar) |
| **Theater Mode & Drawer** | Toggle Theater Mode (expand player column) and toggle Curriculum Drawer visibility | Fullscreen toggle | Fullscreen toggle |
| **Autoplay Next** | Toggle `Autoplay Next` checkbox | — | — |
| **Module Accordion** | Expand/collapse course modules in Curriculum list | Scrollable module list | Scrollable lesson list |
| **Lesson Selection** | Click unlocked lesson or Prev/Next chevrons to switch active lesson state | Tap unlocked module/lesson | Tap unlocked lesson |
| **Video Player Controls (UI)** | Play/Pause state toggle, ±10s seek UI, Scrubber position, Speed selector (`0.75x–2x`), Quality selector, Subtitles toggle, Fullscreen API trigger | Play/Pause, ±10s, Speed cycle (`1.0x–2.0x`), Audio Track toggle, Fullscreen | Play/Pause, ±10s, Speed cycle (`1.0x–2.0x`), Fullscreen |
| **Timestamp Jump** | Click synchronized timestamp card to update player timecode state | Tap Key Moment card to seek | — |
| **PDF Reader Controls** | Page increment/decrement and Zoom In/Out UI state | Download trigger | Download trigger |

---

## 2. Functionality Requiring Future Backend APIs (Must NOT Be Faked)

The following capabilities are visible in the Stitch references but require backend APIs/storage not yet provisioned in Stage 03:
1. **Course & Lesson Catalog API:** Fetching real enrolled courses, modules, lessons, durations, lock rules, and video stream URLs scoped to `activeTenant`.
2. **DRM / Signed Video Streaming:** Delivering actual authenticated video streams (e.g., signed HLS/DASH or unlisted video embed tokens) and dynamic server-issued watermarks.
3. **Watch-Time & Completion Persistence:** Recording watch-time telemetry (`80%` completion threshold), saving `Mark as Complete`, and unlocking subsequent gated lessons.
4. **Handout PDF Storage & Signed Downloads:** Serving real tenant-scoped PDF files and watermarked downloads.
5. **Student Discussion / Q&A Persistence:** Reading and posting real lesson comments and instructor replies.
6. **Smart Notes Persistence:** Saving and loading timestamp-linked personal notes per student/lesson.
7. **Socratic AI / Gemini Copilot Inference:** Sending student doubts (and optional photo attachments) to a server-side Gemini API route grounded in the lesson syllabus.
8. **Concept Check Quiz & Live Q&A Room:** Launching the 5-Question Concept Check and joining the Tutor Live Q&A Room.

---

## 3. Navigation & Safe Fallback Behavior

- **Back to Course Hub / `arrow_back`:** Returns to `/student/hub` (Screen 1 — Multi-Academy Hub).
- **Missing Linked Destinations:** Topbar/footer/card links to unreferenced screens (`Notes & HW` standalone page, `Q&A` standalone forum, `Transcript & Ranks`, `Technical Support`, `Notifications Center`, `Book 1-on-1 Office Hour`) must trigger the existing safe `StageNoticeToast` without inventing substitute screens.
- **No Fake Video Player / No Fake Data:** Until backend course/video APIs are connected, the video player viewport and lesson workspace must present honest awaiting-stream / no-course-loaded states scoped to `verifiedProfile` and `activeTenant`, rather than hardcoding fake courses or simulating fake playback progress as real production data.
