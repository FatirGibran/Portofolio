/**
 * Detailed Architecture & Case Study Specifications for Projects
 */

export const CASE_STUDIES = {
  posturelens: {
    pipeline: [
      { step: 'Camera Stream', desc: '1080p Canvas Frame Capture' },
      { step: 'MediaPipe Pose WASM', desc: '33 3D Keypoints Extractor' },
      { step: 'Angle Vector Math', desc: 'Trigonometric Neck Inclination' },
      { step: 'Web Audio Chime', desc: 'Zero-latency Audio Synthesizer' }
    ],
    challenges: 'Menjalankan estimasi pose 3D secara real-time tanpa membuat CPU/GPU browser lag atau baterai laptop cepat habis.',
    solution: 'Optimasi WebAssembly SIMD + requestAnimationFrame throttling (30 FPS limit) dan komputasi trigonometri lokal tanpa server backend.',
    metrics: [
      { label: 'Privacy', val: '100% On-Device' },
      { label: 'Inference', val: '<32ms / frame' },
      { label: 'Server Cost', val: '$0 / month' },
    ]
  },
  el_gestur_v2: {
    pipeline: [
      { step: 'Video Stream', desc: 'Live Presenter Feed' },
      { step: 'YOLOv8 + DeepSORT', desc: 'Presenter Lock & Tracking' },
      { step: 'MediaPipe Hands', desc: '21 Landmark Gestures' },
      { step: 'AppleScript Bridge', desc: 'OS Slide Deck Navigation' }
    ],
    challenges: 'Membedakan gestur presenter utama dari audiens di latar belakang yang bergerak bebas di ruang seminar.',
    solution: 'Implementasi DeepSORT tracking bounding box untuk mengunci target presenter utama, dikombinasikan dengan threshold confidence MediaPipe.',
    metrics: [
      { label: 'Tracking Acc', val: '94.2%' },
      { label: 'Gestures', val: '9 Actions' },
      { label: 'Response', val: '<80ms' },
    ]
  },
  vaultsentinel: {
    pipeline: [
      { step: 'File Discovery', desc: 'Inkremental File Scanner' },
      { step: 'SHA-256 Hashing', desc: 'Duplicate Block Detection' },
      { step: 'AES-128 Fernet', desc: 'PBKDF2 Salted Encryption' },
      { step: 'Encrypted Vault', desc: 'Immutable Docker Storage' }
    ],
    challenges: 'Menjamin integritas data backup lokal tanpa ketergantungan cloud provider namun tahan dari ransomware.',
    solution: 'Kombinasi hashing SHA-256 inkremental agar hanya file baru yang dienkripsi, diproteksi passphrase salted PBKDF2.',
    metrics: [
      { label: 'Test Coverage', val: '95.8% (PyTest)' },
      { label: 'Throughput', val: '~120 MB/s' },
      { label: 'Mode', val: '100% Offline' },
    ]
  },
  vibedoc: {
    pipeline: [
      { step: 'Idea Input', desc: 'Raw Unstructured Prompt' },
      { step: 'Gemini 2.5 Flash', desc: '7-Section PRD Synthesis' },
      { step: 'Mermaid.js Engine', desc: 'Architecture Flow Generation' },
      { step: 'Markdown Exporter', desc: 'LLM Context Ready Output' }
    ],
    challenges: 'Output PRD seringkali terlalu bertele-tele dan menghabiskan token context window pada AI coding agent (Cursor/Antigravity).',
    solution: 'Prompt engineering ketat dengan token-density formula untuk menghasilkan PRD modular 7 seksi yang siap dikonsumsi LLM.',
    metrics: [
      { label: 'Generation', val: '<15s' },
      { label: 'Token Efficiency', val: '+45% Density' },
      { label: 'Sections', val: '7 Structured' },
    ]
  }
};
