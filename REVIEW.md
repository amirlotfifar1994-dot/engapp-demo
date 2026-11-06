# Demo review — 3 November 2026

Source application: `1394fe5810e7beb847a0ac304a28a89672839961`.

The release contains exactly five selected lessons and 1,036 registered details.
The featured garden is stable ID5. The original photo-only cafe has been replaced
by the connected 127-detail cafe lesson. Three larger panorama packs load lazily.
Other scene datasets, server code and source books are absent.

## Verified

- Nine Node tests pass: the real registry and category counts, five-level
  Listening coverage, pack/image/cache dependencies, selected panorama assets,
  absence of unselected scene datasets, one consistent content-derived release and guide-route restoration.
- The public-text audit checks169 runtime files: no detected source-book metadata,
  private provenance markers or credential-shaped secrets.
- Twelve actual Chrome/Playwright flows at1440×1000 and390×844: all five lessons
  open from the new entrance, compact details open Pattern and exact-source
  Listening, all six activity modes open, and direct Listening URLs reload under
  `/engapp-demo/`. No JavaScript errors or missing HTTP resources were recorded.
- Both viewport flows visit all four additional cafe locations using the real
  Walk navigation. No legacy introduction overlay interrupts returning home.
- Service-worker acceptance at the Pages project path: install and control;
  online Garden visit with six high-detail faces; offline native panorama reload;
  offline Listening opens. A native iframe restores its own cached document,
  rather than receiving an application fallback inside the iframe.

The concise machine-readable record is
[tests/evidence/release-20261103.json](tests/evidence/release-20261103.json).
Screenshots and transient review data remain local and are not published.

## Limits

Activity-flow speech is stubbed; actual device speech and microphone recording
quality require a compatible browser and separate device testing. Offline coverage
above is for the visited Garden, not every asset in every scene before a visit.
Individual image/anchor editorial accuracy is not exhaustively certified by these
regressions. The demo presents reviewed published source material, not a claim that
all lesson quality gates in the private project are complete.

Reproduce with Node24, the repository test commands and the portable Playwright
scripts documented in README. The static server supports both root and the GitHub
Pages project subpath; no fake accounts or purchases are created.


## Translucent-surface follow-up

`demo-glass.css` applies a 57–69% light fill and12px background blur to the lesson
cards, activity panels and readers. The dock and dark controls have separate fills
to retain their existing text colours. Inner panels avoid stacking opaque layers.
Mobile Talk retains its overview and the stationary native photograph remains
visible behind the glass below. Layout, lesson data and activity logic are unchanged.

24 initial browser views covered six modes across Garden desktop/mobile, Cafe
mobile and Museum desktop. Twelve final views rechecked Practice and Talk refinements
on Cafe mobile and Museum desktop; no page errors or horizontal overflow. The real
Chrome reduced-transparency media preference was emulated: the detail card became
97% opaque with no blur, and foreground opacity remained1. Readable-background
fallback is implemented for unsupported blur, but older engines were not certified.
Evidence: [glass surfaces](tests/evidence/glass-surfaces-20261103.json).


## Performance follow-up — 6 November 2026

All five packs now load on demand, native Garden/Cafe frames use scene-only data,
and concurrent requests share one load. Readiness checks avoid full-pack cloning.
Only the active marker family is projected. Mobile drag temporarily lowers render
resolution, restoring it on release/cancel/lost capture; Cafe's final release
redraw was corrected during acceptance. Mobile blur is 8px. Runtime caching is
bounded and storage failures preserve successful online responses.

Sixteen Node tests pass; the public runtime audit covers 172 files with no detected
leaks. Twelve fresh browser flows pass across all five lessons, both viewports and
six modes, including actual Cafe Walk and exact Listening. Garden's 324 ancestor
paths remain reachable through DOM controls. Garden and Cafe restore mobile render
ratio from 1.25 to 2 on gesture end/cancel. Cancelling a delayed Garden load and
opening Cafe keeps Cafe active when the old request finishes. A 503 pack failure
can be retried successfully. Four worker/offline checks pass after a Garden visit.
No JavaScript errors or missing resources occurred in the 12 normal browser flows.

Retained measurements show approximately 75% less initial decoded JavaScript and
shorter startup/drag pauses under 4x CPU throttling. Measurement conditions and
limits, including the earlier trace date, are in [PERFORMANCE.md](PERFORMANCE.md).
Machine-readable evidence: [performance review](tests/evidence/performance-20261106.json).
The source exporter reapplies the narrow runtime adapters and rebuilds hashes.
