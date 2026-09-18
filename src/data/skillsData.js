/**
 * Technical Capability Matrix & Architecture Stack Data
 */
export const SKILL_ITEMS = Object.freeze([
  {
    groupKey: 'groupAI',
    skills: [
      { name: 'MediaPipe WASM & WebGL', badge: 'On-Device', context: 'Inferensi pose & gestur 33-titik real-time tanpa upload server' },
      { name: 'YOLOv8 & DeepSORT Tracking', badge: 'Computer Vision', context: 'Pelacakan pembicara otomatis dan deteksi objek lokal' },
      { name: 'Gemini 2.5 Flash & Vercel AI SDK', badge: 'LLM Integration', context: 'Streaming structured JSON dan semantic architecture generation' },
      { name: 'Canvas 2D/3D & Frame Processing', badge: 'Graphics Engine', context: 'Filter getaran One-Euro, pipeline video 60 FPS di browser' },
    ]
  },
  {
    groupKey: 'groupWeb',
    skills: [
      { name: 'Next.js 15 & React 19', badge: 'Production', context: 'App Router, Server Actions, partial pre-rendering & concurrent features' },
      { name: 'TypeScript & Modern Tailwind', badge: 'Design System', context: 'Strong typing, token arsitektur monokrom, dan komponen responsif' },
      { name: 'Go / Golang & FastAPI', badge: 'Backend Concurrency', context: 'High-throughput microservices, async route handlers, dan JWT' },
      { name: 'Supabase & PostgreSQL', badge: 'Database & Sync', context: 'Row-Level Security, PostgreSQL migrations, dan sync websocket realtime' },
    ]
  },
  {
    groupKey: 'groupSec',
    skills: [
      { name: 'Offline-First Cryptography', badge: 'Security', context: 'AES-128 Fernet & derivasi kunci PBKDF2 (VaultSentinel)' },
      { name: 'SHA-256 Incremental Hashing', badge: 'Data Integrity', context: 'Verifikasi integritas file lokal dan anti-tampering' },
      { name: 'Docker & Container Deployment', badge: 'DevOps', context: 'Multi-stage container builds dan isolasi lingkungan deployment' },
      { name: 'Socket Programming & TCP/IP', badge: 'Networking', context: 'Socket duplex client-server dan transmisi paket data aman' },
    ]
  },
  {
    groupKey: 'groupLead',
    skills: [
      { name: 'Chairman HMIF 2025/2026', badge: 'Leadership', context: 'Memimpin organisasi kemahasiswaan & digitalisasi birokrasi himpunan' },
      { name: 'Test-Driven Development', badge: 'Quality Assurance', context: '95.8% automated test coverage menggunakan Pytest & Vitest' },
      { name: 'System Specification & PRD', badge: 'Architecture', context: 'Penyusunan arsitektur sistem modular dan standardisasi API spec' },
      { name: 'Bilingual Technical Communication', badge: 'Communication', context: 'Dokumentasi komprehensif ID/EN dan presentasi teknis tingkat nasional' },
    ]
  }
]);
