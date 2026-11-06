# Performance review — 6 November 2026

The entrance previously parsed Garden and Cafe learning packs and native scene data
before either lesson was opened. Availability checks also cloned full lesson data.
The five packs now load on demand. Concurrent requests for one lesson share a fetch;
a failed request clears pending state so it can be retried. Each caller still gets
its own defensive data copy. Native frames load scene-only data, without another
copy of the learning pack.

Garden and Cafe project only the current family of markers. Static marker metadata
is initialized once, and unchanged positions and attributes are not written again.
On small viewports, active pointer gestures temporarily cap rendering at 1.25 device
pixels per CSS pixel; release, cancellation and lost capture redraw at the normal
device ratio, capped at 2. Source images, detail textures and hotspot coordinates
are unchanged. Mobile glass blur is 8px; desktop glass and text opacity are preserved.

The worker precaches the entrance shell, rather than native data for unopened scenes.
Visited native documents and resources enter the runtime cache for offline use.
Every 16 successful writes trims this cache to the newest 240 entries. Storage
failures no longer turn a successful online response into a failed request.

## Measurements

Retained before/after traces were collected on 3 November in local headless Chrome,
with CPU throttled 4×, fresh contexts and service workers blocked. Desktop used
1280×900 at DPR 1; mobile used 390×844 at DPR 2 with touch emulation. These are single
synthetic runs, not device guarantees or a network transfer benchmark.

| Measurement | Before | Optimized |
| --- | ---: | ---: |
| Initial decoded JavaScript | 7,549,636 bytes | 1,858,097 bytes |
| Desktop entrance ready | 16,399 ms | 3,428 ms |
| Mobile entrance ready | 17,229 ms | 4,226 ms |
| Desktop longest startup task | 7,241 ms | 248 ms |
| Mobile longest startup task | 7,610 ms | 309 ms |
| Desktop drag frame interval, p95 | 200 ms | 116.7 ms |
| Mobile drag frame interval, p95 | 183.2 ms | 66.7 ms |

Initial decoded JavaScript fell by about 75%. The measured startup no longer
includes any fully loaded lesson packs. The retained traces predate the final Cafe
release redraw correction and cache-policy follow-up; current acceptance checks
below cover those changes. The drag measurement includes automated input overhead.
It does not certify smooth frame rates on real mobile hardware.

## Acceptance and reproduction

Use Node 24 and a separate Chrome/Playwright profile. Start `node scripts/serve.mjs`.
Set `PLAYWRIGHT_MODULE` to an installed Playwright module if it is not locally
resolvable, and optionally set `CHROME_EXECUTABLE` or `DEMO_BASE_URL`.

```sh
node --test tests/*.test.mjs
node scripts/audit-public.mjs
node scripts/review-browser.mjs
node scripts/review-interactions.mjs
node scripts/review-native-lifecycle.mjs
node scripts/review-offline.mjs
node scripts/review-performance.mjs
```

Browser review checks five lessons, six modes, exact-source Listening and actual
Cafe Walk navigation at desktop/mobile sizes. Interaction review checks Garden's
324 ancestor paths through DOM controls, mobile rendering restoration in both native
viewers, cancellation followed by a different lesson, and retry after a failed pack.
The ancestor-path check verifies reachability, not the visual accuracy of all anchors.
Offline review covers the visited Garden and Listening, including all six detail
faces. Speech is stubbed for activity-flow review; device voices and microphones
remain device-dependent. Screenshots and raw traces stay in ignored `review-output`.

The exporter invokes `scripts/optimize-runtime.mjs` after projecting source content,
so a later source export retains these optimizations. Finalize after exporting to
refresh content hashes and the worker release. The public scope remains five lessons.

## Native-view lifecycle follow-up

Garden and Cafe previously left programs, shaders and vertex buffers from earlier
retry attempts alive until their document was destroyed. Cafe could also finish an
obsolete image load after context recovery. Each native-view load now owns a GPU
resource scope and a cancellable image scope. Retry, context loss, failed loading
and pagehide release the scope; stale results cannot upload into a newer renderer.
Garden detail workers cancel pending image handlers on disposal. Cafe clears its
four-entry image cache on a new load, without allowing an old failure to remove a
new cache entry for the same URL. A cancelled browser image request may still be
shared internally with another image requesting that URL; stale callbacks are
suppressed regardless of the browser's network coalescing.

The native lifecycle browser review instruments real WebGL create/delete calls,
replays overlapping retries, uses `WEBGL_lose_context` to lose and restore each
context, and explicitly dispatches pagehide to test teardown. It also checks live
resources across all five Cafe locations. The ready Garden has seven textures,
one buffer, two shaders and one program; Cafe has three textures and the same
buffer/shader/program counts. Counts remain constant after retries/recovery and
are zero after teardown. These are owned-resource checks, not heap or GPU-byte
measurements and not a promise about the browser's garbage-collection timing.

Five additional unit tests cover GPU ownership and partial cleanup, image success,
network/decode cancellation, dimension validation and retry. The current suite has
21 passing tests. Evidence is in
[native lifecycle review](tests/evidence/native-lifecycle-20261106.json).
