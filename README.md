# SceneSpeak — Visual English (Demo)

**See it. Say it.** Learn English by describing pictures.

This is a small, static demo of the SceneSpeak / EngApp learning app with **6 sample lessons**.
Tap the dots on each picture to discover words, then Learn, Practice, Speak and Talk about what you see.

> نسخهٔ دموی اپ یادگیری انگلیسی با تصویر — شامل ۶ درس نمونه. نسخهٔ کامل (بیش از ۹۰ درس) در این مخزن نیست.

## Run locally

No build step. Serve the folder with any static server, for example:

```bash
npx http-server . -p 8080
```

then open <http://localhost:8080>.

The demo runs entirely in the browser. Account, sync and purchase features need the
(private) backend and are not available here; requests to `/api/*` simply fail and the app
falls back to local mode.

## Rights

© Amirmohammad Lotfifar. All rights reserved. The code, lesson content and images are
published for demonstration only; no license to copy, reuse or redistribute them is granted.
