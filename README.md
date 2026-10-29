# SceneSpeak — Five Updated Demo Lessons

[Open the demo](https://amirlotfifar1994-dot.github.io/engapp-demo/)

Updated from the current application on 2026-10-29. The demo contains exactly five ready lessons:

- Lesson 1: Garden Gathering — the updated six-face 360° garden (stable lesson ID 5).
- Lesson 2: Two Women Laughing at a Café Table (ID 2).
- Park in 360° (ID 10003).
- Home in 360° (ID 10004).
- Museum in 360° (ID 10010), including its four connected viewpoints.

Explore, Learn, Practice, Listening, Speak and Talk retain the current app behavior. Browser speech support varies; account, cloud sync, AI services and purchases require the private backend. This public repository contains no backend or source books.

Serve this folder with a static HTTP server. No installation or build step is needed. Run repository checks with Node 24: `node --test tests/*.test.mjs`.

The service worker uses a fresh demo release cache. Previously installed copies update when the new worker activates. Only the selected lesson packs and their required image assets are included.

© Amirmohammad Lotfifar. All rights reserved. Published for demonstration only; no license to copy, reuse or redistribute is granted.
