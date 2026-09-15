/**
 * Detailed Architecture & Case Study Specifications for all 20 Projects
 * Structured with 4-step System Pipeline, Engineering Challenges, Technical Solutions, and Key Metrics.
 * Supports both Indonesian and English localizations.
 */

export const CASE_STUDIES = Object.freeze({
  posturelens: {
    pipeline: [
      { step: 'Camera Stream', desc: '1080p WebRTC Canvas Frame Capture' },
      { step: 'MediaPipe Pose WASM', desc: 'Ekstraksi 33 Titik 3D Landmark' },
      { step: 'Angle Vector Math', desc: 'Kalkulasi Trigonometri Sudut Bungkuk' },
      { step: 'Web Audio Chime', desc: 'Sintesis Audio Peringatan Zero-Latency' }
    ],
    pipelineEn: [
      { step: 'Camera Stream', desc: '1080p WebRTC Canvas Frame Capture' },
      { step: 'MediaPipe Pose WASM', desc: '33 3D Landmark Keypoints Extractor' },
      { step: 'Angle Vector Math', desc: 'Trigonometric Neck Inclination Vector' },
      { step: 'Web Audio Chime', desc: 'Zero-Latency Synthesized Alert Audio' }
    ],
    challenges: 'Menjalankan estimasi pose 3D on-device secara real-time tanpa delay dan tanpa menguras daya baterai laptop developer.',
    challengesEn: 'Running real-time on-device 3D pose estimation with zero lag while preserving laptop battery life during long coding sessions.',
    solution: 'Optimasi WebAssembly SIMD dengan requestAnimationFrame throttling (30 FPS) serta kalkulasi vektor leher lokal tanpa upload video ke server.',
    solutionEn: 'WebAssembly SIMD acceleration with requestAnimationFrame throttling (30 FPS) and local neck vector math with zero server upload.',
    metrics: [
      { label: 'Privacy', val: '100% On-Device' },
      { label: 'Inference', val: '<32ms / frame' },
      { label: 'Server Cost', val: '$0 / month' },
    ]
  },

  el_gestur_v2: {
    pipeline: [
      { step: 'Video Stream', desc: 'Feed Kamera Presenter Real-Time' },
      { step: 'YOLOv8 + DeepSORT', desc: 'Lock & Tracking Presenter Utama' },
      { step: 'MediaPipe Hands', desc: 'Klasifikasi 9 Aksi Gestur Tangan' },
      { step: 'AppleScript Bridge', desc: 'Navigasi Slide & Voice Typer OS' }
    ],
    pipelineEn: [
      { step: 'Video Stream', desc: 'Real-Time Presenter Camera Feed' },
      { step: 'YOLOv8 + DeepSORT', desc: 'Lock & Track Primary Presenter' },
      { step: 'MediaPipe Hands', desc: '9 Hand Gesture Action Classification' },
      { step: 'AppleScript Bridge', desc: 'OS Slide Navigation & Voice Typer' }
    ],
    challenges: 'Membedakan presenter utama dari audiens di latar belakang yang bergerak bebas dan mencegah salah deteksi navigasi slide.',
    challengesEn: 'Distinguishing the primary presenter from moving audience members in crowded rooms and preventing false-positive slide flips.',
    solution: 'Implementasi DeepSORT tracking bounding box untuk mengunci target presenter utama, dikombinasikan dengan threshold confidence ketat MediaPipe.',
    solutionEn: 'DeepSORT tracking ID assignment to lock the presenter bounding box paired with strict MediaPipe confidence thresholds.',
    metrics: [
      { label: 'Tracking Acc', val: '94.2%' },
      { label: 'Gestures', val: '9 Actions' },
      { label: 'Response', val: '<80ms' },
    ]
  },

  vibedoc: {
    pipeline: [
      { step: 'Idea Input', desc: 'Prompt Ide Produk & Pilihan Stack Mentah' },
      { step: 'Gemini 2.5 Flash', desc: 'Sintesis PRD Modular 7 Bab Padat Token' },
      { step: 'Mermaid.js Engine', desc: 'Rendering Diagram Alur & Entity Model' },
      { step: 'Context Exporter', desc: 'Ekspor Markdown Siap Konsumsi LLM' }
    ],
    pipelineEn: [
      { step: 'Idea Input', desc: 'Raw Product Idea Prompt & Tech Choice' },
      { step: 'Gemini 2.5 Flash', desc: '7-Section Token-Dense PRD Synthesis' },
      { step: 'Mermaid.js Engine', desc: 'Architecture Flow & Entity Rendering' },
      { step: 'Context Exporter', desc: 'LLM Context-Window Ready Markdown' }
    ],
    challenges: 'Output PRD dari AI konvensional seringkali bertele-tele dan cepat menghabiskan kuota context window pada AI coding agent (Cursor/Antigravity).',
    challengesEn: 'Generic AI PRD outputs are often verbose and consume excessive context window tokens in AI coding assistants.',
    solution: 'Prompt engineering ketat dengan formula token-density untuk menghasilkan PRD modular 7 seksi yang padat konteks teknis dan terstruktur.',
    solutionEn: 'Structured token-dense prompt engineering yielding modular 7-section specs and compact Mermaid architecture flowcharts.',
    metrics: [
      { label: 'Generation', val: '<15s' },
      { label: 'Token Efficiency', val: '+45% Density' },
      { label: 'Sections', val: '7 Structured' },
    ]
  },

  vaultsentinel: {
    pipeline: [
      { step: 'File Discovery', desc: 'Scanner Direktori Lokal Inkremental' },
      { step: 'SHA-256 Hashing', desc: 'Deteksi Duplikasi & Integritas File' },
      { step: 'AES-128 Fernet', desc: 'Enkripsi Salted PBKDF2 dengan Sandi' },
      { step: 'Encrypted Vault', desc: 'Penyimpanan Brankas Docker Terisolasi' }
    ],
    pipelineEn: [
      { step: 'File Discovery', desc: 'Incremental Local Directory Scanner' },
      { step: 'SHA-256 Hashing', desc: 'Duplicate Block & Integrity Detection' },
      { step: 'AES-128 Fernet', desc: 'PBKDF2 Salted Passphrase Encryption' },
      { step: 'Encrypted Vault', desc: 'Immutable Docker Storage Container' }
    ],
    challenges: 'Menjamin integritas data backup lokal 100% offline tanpa ketergantungan cloud namun kebal dari ancaman ransomware dan file corruption.',
    challengesEn: 'Guaranteeing local file backup integrity 100% offline without cloud dependency while safeguarding against ransomware and bit rot.',
    solution: 'Kombinasi hashing SHA-256 inkremental berbasis stream chunk agar hanya file baru yang dienkripsi, diproteksi passphrase salted PBKDF2.',
    solutionEn: 'Chunked incremental SHA-256 stream hashing ensuring only altered files are encrypted via PBKDF2-salted AES-128 Fernet.',
    metrics: [
      { label: 'Test Coverage', val: '95.8% (PyTest)' },
      { label: 'Throughput', val: '~120 MB/s' },
      { label: 'Mode', val: '100% Offline' },
    ]
  },

  focusync: {
    pipeline: [
      { step: 'QR Chamber Pairing', desc: 'Handshake Cepat Sesi Lintas Perangkat' },
      { step: 'Supabase Realtime', desc: 'Sinkronisasi State Fokus Dua Arah' },
      { step: 'Focus Lock Engine', desc: 'Web Worker Background Heartbeat' },
      { step: 'PDF Reader CDN', desc: 'Viewer Dokumen Bebas Distraksi' }
    ],
    pipelineEn: [
      { step: 'QR Chamber Pairing', desc: 'Fast Cross-Device Session Handshake' },
      { step: 'Supabase Realtime', desc: 'Bi-Directional State Synchronization' },
      { step: 'Focus Lock Engine', desc: 'Web Worker Background Heartbeat' },
      { step: 'PDF Reader CDN', desc: 'Zero-Distraction Document Viewer' }
    ],
    challenges: 'Mencegah pemutusan koneksi WebSocket ketika layar ponsel mati saat pengguna sedang fokus membaca materi di layar utama laptop.',
    challengesEn: 'Preventing WebSocket disconnects and sync drift when the mobile screen sleeps during laptop deep-work reading sessions.',
    solution: 'Implementasi Web Worker background heartbeat timer dipadukan dengan presence channel reconnect otomatis via Supabase Realtime.',
    solutionEn: 'Background Web Worker heartbeat timers paired with robust Supabase Realtime presence channel reconnection logic.',
    metrics: [
      { label: 'Sync Latency', val: '<50ms' },
      { label: 'Devices', val: '2 Synced' },
      { label: 'Focus Mode', val: '100% Offline PWA' },
    ]
  },

  'salin-gaya-web': {
    pipeline: [
      { step: 'Product Ingestion', desc: 'Upload Foto Thrift & Metadata Penjual' },
      { step: 'Gemini Vision AI', desc: 'Kurasi Kualitas & Deteksi Kondisi Pakaian' },
      { step: 'Fonnte 2FA OTP', desc: 'Verifikasi Nomor Ponsel via WhatsApp' },
      { step: 'Midtrans Snap', desc: 'Gateway Pembayaran Aman Terenkripsi' }
    ],
    pipelineEn: [
      { step: 'Product Ingestion', desc: 'Seller Upload & Apparel Metadata' },
      { step: 'Gemini Vision AI', desc: 'Quality Grading & Defect Assessment' },
      { step: 'Fonnte 2FA OTP', desc: 'Identity Verification via WhatsApp OTP' },
      { step: 'Midtrans Snap', desc: 'Encrypted Multi-Payment Gateway' }
    ],
    challenges: 'Memvalidasi kondisi nyata pakaian thrift pre-loved dan melindungi transaksi pembeli serta penjual dari risiko penipuan online.',
    challengesEn: 'Validating the authentic condition of second-hand thrift apparel and securing buyer-seller transactions against online fraud.',
    solution: 'Integrasi Gemini Vision AI untuk penilaian resolusi dan kondisi pakaian, 2FA OTP via WhatsApp Fonnte, dan webhook status Midtrans terenkripsi.',
    solutionEn: 'Automated garment inspection via Gemini Vision AI, WhatsApp OTP two-factor verification, and tamper-proof Midtrans webhooks.',
    metrics: [
      { label: 'AI Verification', val: '<3s Check' },
      { label: 'Security', val: '2FA WhatsApp' },
      { label: 'Payment', val: '100% Midtrans' },
    ]
  },

  perintis: {
    pipeline: [
      { step: 'UMKM Profile', desc: 'Input Biaya Operasional, Modal & Resep' },
      { step: 'FastAPI Engine', desc: 'Kalkulasi Dinamis HPP, BEP & Plafon KUR' },
      { step: 'Gemini AI Advisor', desc: 'Evaluasi Kelayakan & Strategi Penetrasi' },
      { step: 'Leaflet Geospatial', desc: 'Peta Interaktif Sebaran Kompetitor Lokal' }
    ],
    pipelineEn: [
      { step: 'UMKM Profile', desc: 'Operational Costs, Capital & Recipe Input' },
      { step: 'FastAPI Engine', desc: 'Dynamic COGS, BEP & Loan Ceiling Calc' },
      { step: 'Gemini AI Advisor', desc: 'Viability Evaluation & Market Strategy' },
      { step: 'Leaflet Geospatial', desc: 'Interactive Local Competitor Mapping' }
    ],
    challenges: 'Memberikan simulasi margin keuntungan dan kelayakan pinjaman KUR yang presisi sesuai standar regulasi perbankan UMKM Indonesia.',
    challengesEn: 'Providing accurate profit margin simulations and KUR loan eligibility criteria aligned with Indonesian micro-finance standards.',
    solution: 'Pemodelan formula HPP dinamis pada FastAPI, integrasi rekomendasi naratif Gemini AI, dan visualisasi pemetaan kompetitor via Leaflet.',
    solutionEn: 'Dynamic COGS/BEP calculation engine in FastAPI, narrative feasibility assessment via Gemini AI, and Leaflet competitor mapping.',
    metrics: [
      { label: 'Analysis Speed', val: '<10s' },
      { label: 'Financial Acc', val: '98.5%' },
      { label: 'Map Render', val: '60 FPS Fluid' },
    ]
  },

  fittrack: {
    pipeline: [
      { step: 'User Ingestion', desc: 'Foto Piring Makanan / Pesan Telegram' },
      { step: 'aiogram Dispatcher', desc: 'Async Webhook & State Context Handler' },
      { step: 'Vision AI Scanner', desc: 'Deteksi Kuliner Nusantara & OCR Nutrisi' },
      { step: 'Firestore Storage', desc: 'Pencatatan Kalori & Estimasi Workout MET' }
    ],
    pipelineEn: [
      { step: 'User Ingestion', desc: 'Food Photo / Telegram Chat Query' },
      { step: 'aiogram Dispatcher', desc: 'Async Webhook & State Context Handler' },
      { step: 'Vision AI Scanner', desc: 'Indonesian Cuisine Vision & Label OCR' },
      { step: 'Firestore Storage', desc: 'Daily Calorie Log & MET Workout Calc' }
    ],
    challenges: 'Mengenali jenis makanan dan memperkirakan takaran kalori masakan tradisional Indonesia yang kaya rempah dan variatif hanya dari foto kamera HP.',
    challengesEn: 'Accurately recognizing diverse traditional Indonesian dishes and portion sizes from casual smartphone food photos.',
    solution: 'Pipeline multi-stage Vision AI dengan database gizi kuliner lokal, fallback OCR tabel nutrisi kemasan, dan kalkulator pembakaran MET.',
    solutionEn: 'Vision AI classification tuned with Indonesian nutritional tables, packaging OCR fallback, and MET-based workout expenditure logs.',
    metrics: [
      { label: 'Availability', val: '24/7 Bot' },
      { label: 'Response Time', val: '<2.5s' },
      { label: 'Food Database', val: '200+ Menu' },
    ]
  },

  space_unbound: {
    pipeline: [
      { step: 'Canvas Starfield', desc: 'Animasi Partikel Bintang Multi-Layer' },
      { step: 'Lenis Smooth Scroll', desc: 'Fisika Scroll Inertial Halus 60 FPS' },
      { step: 'Dive Mind Transitions', desc: 'State Machine Tema & Narasi Game' },
      { step: 'Audio-Visual Sync', desc: 'Efek Ambient Sound & Tipografi Retro' }
    ],
    pipelineEn: [
      { step: 'Canvas Starfield', desc: 'Multi-Layer Star Particle Animation' },
      { step: 'Lenis Smooth Scroll', desc: 'Inertial Page Physics at 60 FPS' },
      { step: 'Dive Mind Transitions', desc: 'Narrative & Atmosphere State Machine' },
      { step: 'Audio-Visual Sync', desc: 'Ambient Sound FX & Retro Silkscreen' }
    ],
    challenges: 'Merender ribuan partikel bintang bergerak dan efek transisi visual naratif yang berat di browser tanpa terjadi frame drop di laptop biasa.',
    challengesEn: 'Rendering thousands of animated starry particles and intense visual theme shifts without frame drops on lower-end devices.',
    solution: 'Memisahkan rendering partikel ke Canvas 2D requestAnimationFrame di luar React DOM, dipadukan dengan akselerasi physics scroll Lenis.',
    solutionEn: 'Offloading particle rendering to a dedicated 2D Canvas loop outside the React DOM tree, synchronized with Lenis inertia scrolling.',
    metrics: [
      { label: 'FPS Stability', val: '60 FPS Solid' },
      { label: 'Lomba Award', val: 'IT FEST 2026' },
      { label: 'Bundle Size', val: '<350 KB Gzip' },
    ]
  },

  gumam: {
    pipeline: [
      { step: 'Voice Stream', desc: 'Perekaman Buffer Audio MediaRecorder' },
      { step: 'Gemini Multimodal', desc: 'Transkripsi Pidato & Ekstraksi Refleksi' },
      { step: 'Insight Synthesizer', desc: 'Penyusunan Catatan Jurnal Terstruktur' },
      { step: 'Firebase Cloud Sync', desc: 'Penyimpanan Offline IndexedDB & Firestore' }
    ],
    pipelineEn: [
      { step: 'Voice Stream', desc: 'MediaRecorder Audio Buffer Capture' },
      { step: 'Gemini Multimodal', desc: 'Speech-to-Text & Reflective Insights' },
      { step: 'Insight Synthesizer', desc: 'Structured Journal Note Synthesis' },
      { step: 'Firebase Cloud Sync', desc: 'Offline-Ready IndexedDB & Firestore' }
    ],
    challenges: 'Mengubah rekaman suara spontan bahasa Indonesia dengan intonasi santai menjadi jurnal refleksi yang tertata rapi dan kaya wawasan emosi.',
    challengesEn: 'Converting unstructured spoken voice memos in informal Indonesian into cohesive, reflective written journal entries.',
    solution: 'Memanfaatkan Gemini API multimodal audio processing untuk transkripsi akurat sekaligus ekstraksi mood, sentimen, dan ringkasan tindakan.',
    solutionEn: 'Leveraging multimodal audio capabilities of Gemini API for accurate transcription paired with emotion extraction and action points.',
    metrics: [
      { label: 'Transcribe Acc', val: '96.4%' },
      { label: 'Processing', val: '<8s' },
      { label: 'Storage', val: 'Offline-First' },
    ]
  },

  hmif_eval: {
    pipeline: [
      { step: 'Submission Portal', desc: 'Pengajuan Surat Resmi & Evaluasi Proker' },
      { step: 'WEB_SECRETARY Engine', desc: 'Algoritma Penomoran Surat Anti-Bentrok' },
      { step: 'Supabase RLS', desc: 'Hak Akses Berjenjang (BPH, Kadiv, Anggota)' },
      { step: 'KPI Aggregator', desc: 'Visualisasi Matriks Skor Kinerja Pengurus' }
    ],
    pipelineEn: [
      { step: 'Submission Portal', desc: 'Official Letter & Initiative Submissions' },
      { step: 'WEB_SECRETARY Engine', desc: 'Conflict-Free Document Numbering Lock' },
      { step: 'Supabase RLS', desc: 'Role-Based Row Security (Exec & Members)' },
      { step: 'KPI Aggregator', desc: 'Executive Member KPI Scoring Matrix' }
    ],
    challenges: 'Menghilangkan insiden bentrok nomor surat akibat pengajuan serentak antar biro serta merapikan evaluasi kinerja 100+ pengurus himpunan.',
    challengesEn: 'Eliminating duplicate official letter numbers from simultaneous departmental requests and standardizing member KPI evaluations.',
    solution: 'Mekanisme database transaction lock PostgreSQL untuk penomoran surat resmi unik otomatis (WEB_SECRETARY) dan formulasi bobot KPI.',
    solutionEn: 'PostgreSQL transaction locks for conflict-free official letter numbering (WEB_SECRETARY) and weighted KPI scoring formulas.',
    metrics: [
      { label: 'Zero Collision', val: '100% Unique' },
      { label: 'Efficiency', val: '+80% Time Saved' },
      { label: 'Users', val: '100+ Staff' },
    ]
  },

  librarypro: {
    pipeline: [
      { step: 'HTTP Interceptor', desc: 'Jakarta Servlet Filter & Auth Validation' },
      { step: 'Controller Layer', desc: 'Pola MVC Dispatched ke Business Service' },
      { step: 'DAO Service', desc: 'Prepared Statements & Levenshtein Fuzzy Search' },
      { step: 'Railway Container', desc: 'Multi-Stage Dockerfile di Cloud Hosting' }
    ],
    pipelineEn: [
      { step: 'HTTP Interceptor', desc: 'Jakarta Servlet Filter & Auth Validation' },
      { step: 'Controller Layer', desc: 'Pure MVC Dispatch to Java Business Services' },
      { step: 'DAO Service', desc: 'Prepared Statements & Fuzzy Search Engine' },
      { step: 'Railway Container', desc: 'Multi-Stage Docker Deployment on Cloud' }
    ],
    challenges: 'Merancang sistem informasi perpustakaan berbasis arsitektur Java Enterprise murni (Jakarta EE) tanpa Spring yang tetap modular dan aman dari SQL Injection.',
    challengesEn: 'Architecting a pure Jakarta EE enterprise web app without Spring framework that remains maintainable, modular, and SQLi-free.',
    solution: 'Penerapan arsitektur murni MVC dengan DAO pattern, prepared statements JDBC, algoritma pencarian fuzzy Levenshtein, dan kontainerisasi Docker.',
    solutionEn: 'Strict MVC design pattern with decoupled DAO services, parameterized JDBC statements, Levenshtein fuzzy search, and Docker containers.',
    metrics: [
      { label: 'Architecture', val: 'Pure Java MVC' },
      { label: 'Query Latency', val: '<15ms' },
      { label: 'Deployment', val: 'Docker Cloud' },
    ]
  },

  fotokitablur: {
    pipeline: [
      { step: 'Webcam Feed', desc: 'Akuisisi Frame Video Browser Lokal' },
      { step: 'MediaPipe Hands', desc: 'Pelacakan 21 Koordinat Landmark Tangan' },
      { step: 'Gesture Trigger', desc: 'Deteksi Jarak Cubit (Pinch) & Telapak Terbuka' },
      { step: 'Canvas Pixel Filter', desc: 'Manipulasi Piksel Blur & Deck Pemutar Kaset' }
    ],
    pipelineEn: [
      { step: 'Webcam Feed', desc: 'Local Browser Video Frame Acquisition' },
      { step: 'MediaPipe Hands', desc: '21 Hand Landmark Spatial Coordinates' },
      { step: 'Gesture Trigger', desc: 'Pinch Distance & Open Palm Gesture Triggers' },
      { step: 'Canvas Pixel Filter', desc: 'Real-Time Pixel Blur & Cassette Player Deck' }
    ],
    challenges: 'Menghitung manipulasi piksel blur pada canvas secara real-time berdasarkan gestur tangan tanpa membuat browser melambat.',
    challengesEn: 'Computing real-time canvas pixel blur modifications driven by hand gestures without inducing browser rendering lag.',
    solution: 'Optimasi manipulasi buffer piksel ImageData dan pembatasan frekuensi tracking landmark tangan pada kecepatan konstan 30 FPS.',
    solutionEn: 'Optimized ImageData pixel buffer processing synchronized with 30 FPS MediaPipe landmark tracking loops.',
    metrics: [
      { label: 'Frame Rate', val: '30+ FPS' },
      { label: 'Tracking Latency', val: '<40ms' },
      { label: 'Server Cost', val: '$0 Zero Server' },
    ]
  },

  exec_board: {
    pipeline: [
      { step: 'Org Data Schema', desc: 'Struktur Data Hirarki Organisasi JSON' },
      { step: 'Responsive Layout', desc: 'Grid Mobile-First Fleksibel Tailwind CSS' },
      { step: 'Division Navigator', desc: 'Filter Interaktif Biro & Departemen' },
      { step: 'Edge Delivery', desc: 'Deploy Super Ringan di Vercel CDN Global' }
    ],
    pipelineEn: [
      { step: 'Org Data Schema', desc: 'Structured JSON Organizational Hierarchy' },
      { step: 'Responsive Layout', desc: 'Mobile-First Flexible Tailwind Grid' },
      { step: 'Division Navigator', desc: 'Interactive Department & Member Filter' },
      { step: 'Edge Delivery', desc: 'Ultra-Lightweight Vercel Global Edge CDN' }
    ],
    challenges: 'Menyajikan struktur kepengurusan organisasi mahasiswa yang bertingkat banyak agar tetap nyaman dan jelas dibaca pada layar HP kecil.',
    challengesEn: 'Displaying deep, multi-tiered student organization hierarchy clearly and accessibly on small mobile screens.',
    solution: 'Desain komponen modular berbasis accordion dan card interaktif dengan zero dependencies berbobot besar.',
    solutionEn: 'Lightweight mobile-first accordion and grid components with clean micro-interactions and zero bloated libraries.',
    metrics: [
      { label: 'Lighthouse', val: '99/100' },
      { label: 'Mobile-First', val: '100% Responsive' },
      { label: 'Load Time', val: '<0.8s' },
    ]
  },

  smart_finance: {
    pipeline: [
      { step: 'Transaction Input', desc: 'Pencatatan Pemasukan & Pengeluaran' },
      { step: 'Servlet Controller', desc: 'Dispatcher Sesi Mahasiswa Aman' },
      { step: 'Transaction DAO', desc: 'Kalkulasi Saldo Berjalan di MySQL' },
      { step: 'Analytics Dashboard', desc: 'Visualisasi Grafik Kategori & Tabungan' }
    ],
    pipelineEn: [
      { step: 'Transaction Input', desc: 'Income & Expense Form Validation' },
      { step: 'Servlet Controller', desc: 'Secure Student Session Dispatcher' },
      { step: 'Transaction DAO', desc: 'Dynamic Running Balance Calc in MySQL' },
      { step: 'Analytics Dashboard', desc: 'Visual Expense Category Charts' }
    ],
    challenges: 'Menjaga keakuratan kalkulasi saldo dan validasi multi-akun mahasiswa tanpa kebocoran sesi peramban.',
    challengesEn: 'Maintaining strict transaction ledger accuracy and session boundary security across multiple student accounts.',
    solution: 'Pengelolaan session berbasis servlet aman, validasi input format mata uang, dan kalkulasi otomatis saldo berjalan via SQL queries.',
    solutionEn: 'Servlet-managed authentication sessions, robust numeric balance parsers, and dynamic visual category expense analytics.',
    metrics: [
      { label: 'Ledger Acc', val: '100% Accurate' },
      { label: 'Session Safety', val: 'Auth Protected' },
      { label: 'Query Speed', val: '<50ms' },
    ]
  },

  perpus_swing: {
    pipeline: [
      { step: 'Swing Event Bus', desc: 'Action Listener Form & Validasi Keyboard' },
      { step: 'OOP Model Layer', desc: 'Enkapsulasi, Polimorfisme & Pewarisan PBO' },
      { step: 'JDBC Connection', desc: 'Koneksi Pooling ke Database MySQL Lokal' },
      { step: 'Circulation Engine', desc: 'Kalkulasi Otomatis Denda & Status Buku' }
    ],
    pipelineEn: [
      { step: 'Swing Event Bus', desc: 'Action Listener Events & Keyboard Validation' },
      { step: 'OOP Model Layer', desc: 'PBO Encapsulation, Polymorphism & Inheritance' },
      { step: 'JDBC Connection', desc: 'Reliable Connection Pool to Local MySQL' },
      { step: 'Circulation Engine', desc: 'Auto Fine Calculation & Book Loan Status' }
    ],
    challenges: 'Memastikan aplikasi desktop transaksi sirkulasi buku tidak freeze saat query database berjalan dan menangani anomali perhitungan denda keterlambatan.',
    challengesEn: 'Preventing desktop UI freeze during database queries and accurately calculating daily library overdue fines.',
    solution: 'Penerapan prinsip OOP (Inheritance, Polymorphism, Encapsulation) dipadukan dengan connection pool JDBC tangguh dan auto-calc denda harian.',
    solutionEn: 'Separating JDBC operations from the UI loop and applying pure OOP architecture for library circulation and penalty rules.',
    metrics: [
      { label: 'Paradigm', val: 'Pure OOP Java' },
      { label: 'Trans Speed', val: '<10ms' },
      { label: 'Stability', val: 'Zero Crash' },
    ]
  },

  jarkom_tubes: {
    pipeline: [
      { step: 'TCP Handshake', desc: 'Inisialisasi Koneksi Socket Client-Server' },
      { step: 'Thread Pool Dispatcher', desc: 'Alokasi Worker Thread Per Koneksi Klien' },
      { step: 'Protocol Framing', desc: 'Enkoding Header Panjang Pesan + Payload' },
      { step: 'Mutex Message Buffer', desc: 'Broadcast Aman Antar Klien Tanpa Konflik' }
    ],
    pipelineEn: [
      { step: 'TCP Handshake', desc: 'Client-Server Socket Connection Initialization' },
      { step: 'Thread Pool Dispatcher', desc: 'Worker Thread Allocation Per Connection' },
      { step: 'Protocol Framing', desc: 'Message Length-Prefix Header + Payload Framing' },
      { step: 'Mutex Message Buffer', desc: 'Thread-Safe Broadcast to Connected Clients' }
    ],
    challenges: 'Mengatur concurrency puluhan koneksi klien socket yang mengirim pesan jaringan bersamaan tanpa terjadi race condition atau socket blocking.',
    challengesEn: 'Managing concurrent client socket streams without deadlocks, race conditions, or packet fragmentation.',
    solution: 'Implementasi multithreaded socket listener dengan queue thread-safe dan protokol framing pesan kustom (header panjang pesan + payload).',
    solutionEn: 'Worker thread pooling with thread-safe mutex message buffers and strict length-prefix packet framing protocol.',
    metrics: [
      { label: 'Concurrency', val: '50+ Clients' },
      { label: 'Packet Loss', val: '0% TCP Reliable' },
      { label: 'Latency', val: '<5ms Local' },
    ]
  },

  aka: {
    pipeline: [
      { step: 'Dataset Generator', desc: 'Sintesis Data Uji Skala Bertingkat (10 - 100,000)' },
      { step: 'Algorithmic Runners', desc: 'Eksekusi Komparatif Algoritma Rekursif vs Iteratif' },
      { step: 'Profiler Tracemalloc', desc: 'Pelacakan Alokasi Memori Heap & Kedalaman Stack' },
      { step: 'Big-O Plotter', desc: 'Pemetaan Kurva Regresi Kompleksitas Waktu & Ruang' }
    ],
    pipelineEn: [
      { step: 'Dataset Generator', desc: 'Scaled Test Data Synthesis (10 - 100,000 Elements)' },
      { step: 'Algorithmic Runners', desc: 'Comparative Recursive vs Iterative Runners' },
      { step: 'Tracemalloc Profiler', desc: 'Heap Memory Allocation & Call Stack Tracking' },
      { step: 'Big-O Plotter', desc: 'Time & Space Complexity Regression Curve Fitting' }
    ],
    challenges: 'Mengukur waktu eksekusi presisi sub-milidetik dan mendeteksi lonjakan konsumsi memori rekursif (call stack overflow) pada dataset skala besar (N > 10^4).',
    challengesEn: 'Measuring sub-millisecond execution runtime precisely and tracking recursive memory spikes (call stack depth) on large scale datasets (N > 10^4).',
    solution: 'Menggunakan time.perf_counter_ns() dengan sampling berulang 100x iterasi, modul tracemalloc untuk profiling memori heap, dan visualisasi kurva Big O empiris.',
    solutionEn: 'High-precision 100x repeated nanosecond sampling via time.perf_counter_ns(), tracemalloc memory profiling, and Big-O curve fitting.',
    metrics: [
      { label: 'Time Precision', val: 'Nanosecond' },
      { label: 'Dataset Scales', val: '10 - 100,000 N' },
      { label: 'Validation', val: 'Empirical Big-O' },
    ]
  },

  prodi_if: {
    pipeline: [
      { step: 'Syllabus Ingestion', desc: 'Parsing Data Kurikulum, SKS & Capaian Belajar' },
      { step: 'Prerequisite Graph', desc: 'Pemodelan Dependency Hubungan Antar Matakuliah' },
      { step: 'Interactive Visualizer', desc: 'Highlight Jalur Prasyarat & Peminatan Kuliah' },
      { step: 'RPS Modal Viewer', desc: 'Inspeksi Detail Silabus & Rencana Pembelajaran' }
    ],
    pipelineEn: [
      { step: 'Syllabus Ingestion', desc: 'Curriculum, Credit Units & Learning Outcome Parser' },
      { step: 'Prerequisite Graph', desc: 'Directed Course Prerequisite Dependency Resolver' },
      { step: 'Interactive Visualizer', desc: 'Prerequisite Path Highlighting & Semester Filter' },
      { step: 'RPS Modal Viewer', desc: 'Course Syllabus, Rubric & Study Plan Details' }
    ],
    challenges: 'Visualisasi keterkaitan prasyarat mata kuliah yang rumit lintas semester agar mahasiswa dapat merencanakan KRS dengan jelas tanpa risiko terhambat studi.',
    challengesEn: 'Mapping tangled multi-semester course prerequisite chains into a clear dependency visualizer for student study plans.',
    solution: 'Pemodelan graf dependency mata kuliah interaktif (DAG) dengan penanda jalur prasyarat visual otomatis dan navigasi cepat per semester.',
    solutionEn: 'Directed Acyclic Graph (DAG) data structure enabling instant prerequisite path highlighting and semester-by-semester filtering.',
    metrics: [
      { label: 'Target Users', val: 'Mahasiswa IF' },
      { label: 'Navigation', val: '<3 Clicks to RPS' },
      { label: 'Dependencies', val: 'Zero Bloat' },
    ]
  },

  portfolio_web: {
    pipeline: [
      { step: 'Three.js WebGL', desc: 'Rendering Spatial Canvas & Partikel 3D Interaktif' },
      { step: 'React 19 Engine', desc: 'Arsitektur Komponen Modular & Memoization Ketat' },
      { step: 'Web Audio Synth', desc: 'Sintesis Chime Taktil & Audio Feedback Zero-Asset' },
      { step: 'Firebase Edge CDN', desc: 'Distribusi Aset Global dengan Latensi Sub-Detik' }
    ],
    pipelineEn: [
      { step: 'Three.js WebGL', desc: 'Spatial 3D Canvas & Interactive Particles' },
      { step: 'React 19 Engine', desc: 'Modular Component Tree with Strict Memoization' },
      { step: 'Web Audio Synth', desc: 'Zero-Asset Tactile Chime & Oscillator Audio' },
      { step: 'Firebase Edge CDN', desc: 'Sub-Second Global Production Asset Delivery' }
    ],
    challenges: 'Menggabungkan grafis 3D spatial interaktif, kartu hologram holoDevPass, dan 6 live sandbox tanpa membuat browser mobile lag atau lambat dimuat.',
    challengesEn: 'Merging 3D WebGL spatial graphics, holographic DevPass physics, and 6 live sandboxes without causing mobile frame stutter or bloat.',
    solution: 'Code splitting dinamis berbasis Rollup, Web Audio API sintetis (zero asset audio mp3 eksternal), dan requestAnimationFrame throttling terukur.',
    solutionEn: 'Aggressive Rollup chunk splitting, pure mathematical Web Audio synthesizer, and optimized requestAnimationFrame hooks.',
    metrics: [
      { label: 'Build Speed', val: '<500ms (Vite 8)' },
      { label: 'Sandbox Modules', val: '6 Live Demos' },
      { label: 'Architecture', val: 'Chunked React 19' },
    ]
  }
});
