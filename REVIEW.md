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
