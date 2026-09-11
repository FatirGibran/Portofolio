# Architecture & Engineering Specifications: Fatir Gibran Portfolio

This document outlines the technical architecture, design patterns, and engineering decisions implemented across the portfolio of **Fatir Gibran** (Chairman of HMIF, Full-Stack & Edge AI Engineer).

---

## 1. System Overview & Tech Stack

| Layer | Technologies | Key Responsibilities |
|---|---|---|
| **Core UI Framework** | React 19, Tailwind CSS v3 | Component architecture, responsive pastel-cyber UI, accessibility (WCAG 2.1 AA) |
| **Build & Bundler** | Vite v8.1.4, Rolldown / Terser | Hot Module Replacement (HMR <110ms), tree-shaking, code splitting, asset optimization |
| **3D & Spatial Computing** | Three.js (WebGL) | Persistent ambient spatial stage, interactive geometry, dynamic lighting, cursor tracking |
| **Tactile Audio FX** | Web Audio API (Synthesizer) | Zero-asset client-side synthesized soundscape (clicks, chirps, modal pops, NFC bips) |
| **On-Device Edge AI** | MediaPipe WASM, Canvas API | 100% private, zero-latency computer vision (PostureLens, EdgeCV) running locally in-browser |
| **Client-Side Cryptography** | Web Crypto API, CryptoJS | AES-128 symmetric encryption, SHA-256 integrity hashing without server storage |
| **Global State & i18n** | React Context API | Theme switching (Dark/Light), Bilingual dictionary (ID/EN), Command Palette, Audio state |
| **Infrastructure & Hosting** | Firebase Hosting, Google Cloud CDN | Edge caching, HTTP/2, custom apex domain DNS (`fatirgibran.my.id`), SSL termination |

---

## 2. Directory Structure

```
├── .firebase/               # Firebase hosting build cache
├── public/                  # Static assets (robots.txt, sitemap.xml, favicon, icons)
├── src/
│   ├── components/          # Modular UI components
│   │   ├── About.jsx        # Bio, leadership highlights, interactive career chronicle
│   │   ├── BackToTop.jsx    # Floating smooth scroll-to-top button with audio chime
│   │   ├── ClickRipple.jsx  # Subtle tactile click ripple wave effect
│   │   ├── CommandPalette.jsx # Cyber command terminal (Cmd+K) with interactive simulator triggers
│   │   ├── Footer.jsx       # Social links, email transmission, copyright
│   │   ├── Hero.jsx         # Dynamic role typewriter, count-up stats, 3D Pass switcher
│   │   ├── HoloDevPass.jsx  # 3D Holographic Developer Pass with cursor tilt, flip & NFC
│   │   ├── Keterampilan.jsx # Interactive skills matrix by domain
│   │   ├── Navbar.jsx       # Top sticky bar, sound toggle, lang switcher, theme toggle
│   │   ├── ProjectModal.jsx # Architecture deep-dive modal (pipeline, metrics, solutions)
│   │   ├── Projects.jsx     # Filterable project showcase with 3D card physics
│   │   ├── Sandbox.jsx      # 6 live interactive sandbox testing demos
│   │   ├── SpatialStage3D.jsx # Persistent 3D WebGL background stage
│   │   └── StoryTicker.jsx  # Continuous infinite marquee ticker
│   ├── context/
│   │   └── PortfolioContext.jsx # Global state provider (Theme, Lang, Audio, Modals)
│   ├── utils/
│   │   └── audio.js         # Singleton Web Audio API synthesizer
│   ├── App.jsx              # Main orchestrator component
│   ├── index.css            # Tailwind directives, custom keyframes, marquee animation
│   └── main.jsx             # React DOM root entrypoint
├── firebase.json            # Firebase hosting routing & cache-control headers
├── package.json             # Project dependencies and npm scripts
└── vite.config.js           # Vite build configuration and manual chunk splitting
```

---

## 3. Key Design Patterns

### 3.1 Singleton Web Audio Synthesizer
- **Problem**: Playing sound files over the network causes HTTP request latency and bandwidth consumption. Initializing new `AudioContext` instances per sound leads to memory leaks and browser context limits.
- **Solution**: Implemented a singleton `sharedAudioCtx` in `src/utils/audio.js`. All sound effects (crisp mechanical clicks, chirps, toggles, modal pops, and NFC beeps) are procedurally generated using Web Audio oscillators and exponential gain ramps, requiring 0 external MP3/WAV assets.

### 3.2 3D Holographic Tilt & Prismatic Glare
- **Problem**: Flat cards fail to evoke the tactile feeling of physical developer passes.
- **Solution**: `HoloDevPass.jsx` uses CSS 3D perspective (`1200px`) combined with normalized mouse pointer coordinates to compute dynamic `rotateX` and `rotateY` matrix rotations. A high-contrast linear gradient layer with `backgroundPosition` tied to cursor percentage simulates authentic holographic diffraction foil.

### 3.3 Zero CLS (Cumulative Layout Shift)
- All dynamic images, canvases, and widgets have explicit aspect ratios, `min-height` reservations, and CSS grid anchors to ensure 0 layout shifting during asynchronous load.
