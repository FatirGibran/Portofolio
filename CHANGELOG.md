# Changelog: Fatir Gibran Portfolio

All notable changes to this project are documented in this file.

## [2.1.0] - 2026-09-12

### Added
- **3D Holographic Developer Pass (`HoloDevPass`)**: Physical-feel 3D credential card with dynamic cursor tilt physics, prismatic rainbow diffraction foil, 180° card flip, NFC simulation with audio, and fullscreen inspector with foil presets (*Prism, Cyber Gold, Deep Matrix*).
- **Subtle Click Ripple Wave (`ClickRipple`)**: Interactive concentric shockwave feedback on user clicks.
- **Continuous Story Ticker Marquee (`StoryTicker`)**: Seamless infinite strip highlighting key career metrics and milestones.
- **Back-to-Top Floating Button (`BackToTop`)**: Smooth scroll-to-top with procedural sound chime.
- **PWA Capabilities**: Added `public/manifest.json` with standalone display, theme color, icons, and Apple mobile web app tags.
- **Security Headers**: HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, and `Permissions-Policy` configured in `firebase.json`.
- **Smoke Test Script**: Added `scripts/smokeTest.js` to validate production bundle integrity before deployment.
- **Deep Sitemap & Social SEO**: Enhanced `public/sitemap.xml` with anchor URLs and priority weighting; added Twitter Card, Open Graph site name, and alternate locales in `index.html`.

### Changed
- **De-cluttered Layout**: Removed all repetitive chapter label badges from section headers for a clean, spacious typography layout.
- **Codebase Modularization**: Separated data structures into `src/data/` (`timelineData.js`, `storyTickerData.js`, `statsData.js`, `categoryConstants.js`, `projectCaseStudies.js`).
- **Web Audio FX Architecture**: Extracted frequency presets to `src/utils/audioConstants.js` and decoupled hook to `src/context/usePortfolio.js`.
- **Bundle Optimization**: Configured `manualChunks` in `vite.config.js` to split `vendor-three`, `vendor-react`, and `vendor-icons`.
