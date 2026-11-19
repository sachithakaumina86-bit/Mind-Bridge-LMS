# MINDBRIDGE LMS — STAGE 03: PHASE 2
# SCREEN 3: COURSE LEARNING EXPERIENCE / VIDEO PLAYER — SCREEN INVENTORY

This inventory documents the exact layout regions, components, and variant-specific structures across all 4 authoritative Primary Stitch references for **Screen 3 — Course Learning Experience / Video Player**.

---

## 1. Desktop Primary Pair (`_1` Dark & `_2` Light — `web_standard`)

### A. Fixed Top Header (`h-16`)
- `arrow_back` button (Return to Course Syllabus)
- MindBridge LMS logo + wordmark
- Active Academy pill badge
- Course Title & Active Lesson subtitle breadcrumb
- Batch Progress widget (label, percentage, linear progress bar)
- 4-item top navigation: `Video Player` (active), `Curriculum`, `Notes & HW`, `Q&A`
- Utility icons: `Toggle Theater Mode` (`fullscreen`), `Curriculum Drawer` (`view_sidebar`), Student Avatar (`person`)

### B. Learning Context Ribbon
- `Course Hub` back link, Module breadcrumb, Lesson title, Duration pill, Verification badge
- Action controls: `Theater Mode` toggle, `Autoplay Next` checkbox, `Handout PDF` button, `Ask Copilot` button, Previous/Next lesson chevrons

### C. Two-Column Learning Stage (`lg:grid-cols-12`)
- **Left Column (`lg:col-span-8`):**
  1. **16:9 Video Player Card:**
     - Video viewport canvas + center Play/Pause overlay button
     - Scrubber bar with buffered bar, played progress bar, thumb, chapter markers, and chapter timecode labels
     - Custom Video Control Toolbar: Play/Pause, Replay 10s, Forward 10s, Volume mute/level bar, Current/Total timecode, Dual Audio language pill (`සිංහල + ENG`), Playback Speed control, Video Quality control, Subtitles toggle, Fullscreen toggle
     - Edge CDN / Stream Status Banner
  2. **Tabbed Learning Workspace (4 Tabs):**
     - `Overview & Key Concepts`: Bilingual Lesson Synopsis, 2-column Synchronized Video Timestamps grid, Exam Tip callout
     - `LaTeX Derivations & Proofs`: Step-by-step equation cards + `Copy LaTeX` button
     - `Handout PDF Reader`: Document header, Previous/Next page controls, Zoom In/Out buttons, PDF preview canvas
     - `Student Discussion`: Question textarea + `Post Question` button + threaded student/TA comments with timestamp chips
- **Right Column (`lg:col-span-4`):**
  1. **Interactive Sidebar Card (2 Tabs):**
     - `Curriculum`: Overall Batch Progress box, collapsible Module accordions with lesson items (Completed, Active Playing with equalizer bars + `NOW` badge, Locked), Tutor Live Q&A Room card
     - `AI Copilot v2.5`: Copilot header banner, timestamped chat stream, query input + Send button + `Attach Photo` trigger
  2. **Quick Tutor Note & Instructor Verification Card:** Instructor avatar/name, quote box, Paper Bank PDF & Office Hour links

### D. Sticky Bottom Completion & Action Bar
- Current lesson watch progress indicator + completion threshold note (`Minimum 80% watch time required`)
- `5-Question Concept Check` button
- `Mark as Complete & Next Lesson` primary button

### E. Footer
- Copyright, active tenant name, stream status indicator, `Transcript & Ranks`, `Technical Support`

---

## 2. Mobile Primary Light (`...video_player_mobile__code_af72db55.html`)

- **Fixed Mobile Header (`h-16`):** MindBridge logo, Academy dropdown label, Notifications bell, Profile avatar
- **16:9 Secure Video Player:** Video viewport, DRM watermark overlay, Top HUD (`DRM L3`, Lesson title, Audio Track toggle, Speed toggle), Center Play/Pause button, Bottom scrub bar with chapter dots, ±10s skip buttons, timecode, Quality label, Fullscreen button
- **Lecture Header & Context Block:** Module/Verified pills, Lesson title, Lecturer card + Follow button, Attendance Tracker ribbon, Horizontal action pills (`Lecture PDF`, `Mark <time>`, `Ask Gemini AI`, `WhatsApp Batch`)
- **Sticky 4-Tab Bar & Panels:** `Syllabus` (module list with Completed / Playing / Locked states), `Key Moments` (clickable timestamp cards), `Smart Notes` (timestamp-linked personal note composer + saved notes), `Tutes` (downloadable PDF cards)
- **Fixed Mobile Light Bottom Nav:** `Hub`, `Courses` (active), `Exams`, `Tasks`, `Grades`

---

## 3. Mobile Primary Dark (`...video_player_dark_mode_mobile__code_0f63733a.html`)

- **Fixed Mobile Header (`h-16`):** MindBridge logo, Academy/Section label (`Courses`), Notifications bell, Profile avatar
- **Top Action Sub-bar:** `arrow_back` button, Unit/Lesson title, `1080p DRM` pill, Playback Settings button
- **16:9 Video Player Viewport:** Video viewport, DRM security badge, Center Play overlay, Bottom scrub bar, Play/Pause, ±10s skip buttons, timecode, Speed toggle, Step Sync pill, Fullscreen button
- **Lesson Details & Companion Materials Sheet:** Course/Lesson title, Lecturer credit, Bookmark button, Companion PDF download card
- **3-Tab Segmented Control:** `Curriculum`, `Socratic AI`, `Formulas`
- **Curriculum Playlist Body:** Mastery pace micro-banner (circular progress SVG) + Lesson cards (Completed, Active Playing, Locked, Exam Drill)
- **Floating Socratic Instant Query Bar:** Docked above bottom nav with current timestamp chip, text input, and Send button
- **Fixed Mobile Dark Bottom Nav:** `Hub`, `AI Tutor`, `Courses` (active), `Exams`, `Profile`
