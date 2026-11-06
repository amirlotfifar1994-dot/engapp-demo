# SceneSpeak — Five worlds. Your words.

[Open the public demo](https://amirlotfifar1994-dot.github.io/engapp-demo/)

A redesigned five-lesson showcase, updated **3 November 2026** from application commit `1394fe5810e7beb847a0ac304a28a89672839961`.

| Sample | Lesson | Details | Included |
| --- | --- | ---: | --- |
| 01 | Garden Gathering · ID 5 | 324 | Six detail faces, nested discovery, six first-person characters |
| 02 | Café Conversation · ID 2 | 127 | Five connected locations, 18 close-up images |
| 03 | Park · ID 10003 | 116 | Reconstructed close-ups and granular learning |
| 04 | Home · ID 10004 | 258 | Rooms, people, objects and nested details |
| 05 | Museum · ID 10010 | 211 | Four connected viewpoints |

The garden is the featured first lesson. The other four were retained because they have the strongest combination of detailed source content, reconstruction work and integration evidence among the reviewed published scenes. A detail count is not a quality certification. Selection notes are in [CURATION.md](CURATION.md).

All five include **Explore, Learn, Practice, Speak, Talk and Listening**, with A1–C1 content. Learning uses the current shared glass cards: a small initial view, then separate learning pages, child details and inline audio. The current listening preview/resume fix is included.

The entrance is specific to this small collection; lesson controllers come from the application. Stable lesson IDs and progress semantics are preserved. All five learning packs load on demand; the entrance does not parse full lesson or native scene data. No account, payment, server, source books or unselected lesson content is included. Online account/AI features are unavailable; browser speech and recording depend on the device and microphone permission. Images include AI reconstructions whose fine details can differ from the overview.

Serve the folder with any static HTTP server, or use **Node 24**:

```sh
node scripts/serve.mjs
node --test tests/*.test.mjs
node scripts/audit-public.mjs
```

The local server also tests the `/engapp-demo/` project path used by GitHub Pages. There is no installation or build step for visitors. The service worker caches the application shell; scene assets are cached when visited. Offline acceptance is recorded separately in [REVIEW.md](REVIEW.md).

For the repository maintainer, update from an application checkout:

```sh
node scripts/build-from-source.mjs ../engapp
node scripts/finalize.mjs ../engapp
```

The export selects five packs, projects their catalog, preserves the demo entrance, removes unselected scene datasets and regenerates public hashes. Review before publishing; do not copy the private repository wholesale. Browser review scripts accept `PLAYWRIGHT_MODULE`, `CHROME_EXECUTABLE` and `DEMO_BASE_URL`.

© Amirmohammad Lotfifar. All rights reserved. Published for demonstration only; no license to copy, reuse or redistribute is granted.

The demo uses `demo-glass.css` for translucent lesson surfaces: the photograph remains visible behind a softly blurred background, while text and icons stay fully opaque. A reduced-transparency preference and a fallback for browsers without background blur are included.

Performance follow-up reviewed **6 November 2026**: on-demand packs, shared in-flight loads, cheaper readiness checks, visible-marker projection, temporary mobile rendering resolution and bounded runtime caching. The original source images remain intact. Measurements, reproduction commands and limits are in [PERFORMANCE.md](PERFORMANCE.md).

Native Garden/Cafe retries and context recovery also release their previous GPU resources and cancel obsolete image work. A dedicated browser review checks resource ownership through retries, Cafe Walk, actual context restoration and teardown.
