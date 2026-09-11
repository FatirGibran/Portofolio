/**
 * Static Data Repository for all 20 Projects
 * Kept outside of React component lifecycle to eliminate redundant allocations on every re-render.
 */

export const ALL_PROJECTS = Object.freeze([
  {
    id: 'posturelens',
    title: 'PostureLens 👁️⚡',
    role: 'Edge AI & Lead Dev',
    badge: 'On-Device AI',
    category: 'ai',
    demoTab: 'posturelens',
    desc: 'Real-time on-device AI posture & ergonomics health monitor untuk developer. 100% on-device privacy (WebAssembly/WebGL MediaPipe Pose), deteksi sudut bungkuk leher, Web Audio chime synthesizer, dan timer aturan 20-20-20.',
    descEn: 'Real-time on-device AI posture & ergonomics health monitor for developers. 100% on-device privacy (MediaPipe Pose WebAssembly/WebGL), 3D neck slouch angle calculation, Web Audio synthesized chime, and 20-20-20 rule timer.',
    tech: ['Next.js 14', 'MediaPipe Pose', 'WebAssembly', 'IndexedDB', 'Web Audio API', 'Framer Motion'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'el_gestur_v2',
    title: 'el_gestur_v2',
    role: 'Lead Developer',
    badge: 'Computer Vision',
    category: 'ai',
    demoTab: 'el_gestur',
    desc: 'Asisten presentasi interaktif hands-free berbasis YOLOv8 + DeepSORT untuk tracking presenter utama dan MediaPipe Hands untuk 9 klasifikasi gestur serta voice typer Bahasa Indonesia.',
    descEn: 'Hands-free interactive presentation system utilizing YOLOv8 + DeepSORT for main presenter tracking and MediaPipe Hands for 9 gesture classifications and Indonesian voice commands.',
    tech: ['Python 3.10', 'YOLOv8', 'DeepSORT', 'MediaPipe', 'Flask', 'AppleScript'],
    repoLink: 'https://github.com/aariffaqiih/el_gestur_v2'
  },
  {
    id: 'vibedoc',
    title: 'VibeDoc 📝⚡',
    role: 'Full-Stack & AI Arch',
    badge: 'Gemini 2.5 Flash',
    category: 'fullstack',
    demoTab: 'vibedoc',
    desc: 'Pengubah ide produk mentah menjadi dokumen arsitektur dan PRD 7-seksi padat konteks dalam 30 detik untuk context window LLM coding assistant (Claude, Cursor, Antigravity).',
    descEn: 'Transforms raw product ideas into token-efficient, context-dense 7-section Architecture and PRD specifications in under 30 seconds for LLM coding agents.',
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Gemini 2.5 Flash', 'Mermaid.js'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'vaultsentinel',
    title: 'VaultSentinel 🛡️',
    role: 'DevOps & CyberSec',
    badge: '95.8% Coverage',
    category: 'cybersec',
    demoTab: 'vaultsentinel',
    desc: 'Local System Health & Encrypted Backup Automation 100% offline-first. Dilengkapi hashing inkremental SHA-256, enkripsi AES-128 Fernet + PBKDF2 passphrase salt, Claymorphic dashboard, dan Docker Compose.',
    descEn: 'Local System Health & Encrypted Backup Automation 100% offline-first. Features SHA-256 incremental hashing, AES-128 Fernet + PBKDF2 passphrase encryption, Claymorphic dashboard, and Docker Compose.',
    tech: ['Python 3.10+', 'FastAPI', 'Claymorphism UI', 'AES-128 Fernet', 'PBKDF2', 'Docker'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'focusync',
    title: 'FocuSync 🎯',
    role: 'Product & Full-Stack',
    badge: 'Deep Work PWA',
    category: 'fullstack',
    desc: '"Lock Your Screen, Lock Your Phone, Unlock Your Potential." Ekosistem fokus lintas perangkat real-time untuk deep work. Dilengkapi QR Chamber pairing, PDF reader reader CDN, dan Supabase Realtime.',
    descEn: '"Lock Your Screen, Lock Your Phone, Unlock Your Potential." Real-time cross-device focus ecosystem for deep work sessions with QR Chamber pairing and Supabase Realtime presence.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Supabase Realtime', 'PDF.js'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'salin-gaya-web',
    title: 'Salin Gaya E-Commerce',
    role: 'Lead Developer',
    badge: 'Commercial Platform',
    category: 'fullstack',
    demoTab: 'salin_gaya',
    desc: 'Platform e-commerce premium thrifting terintegrasi kurasi kualitas gambar Gemini 2.5 Flash, 2FA WhatsApp Fonnte OTP, chat C2C real-time, dan pembayaran Midtrans.',
    descEn: 'Premium thrifting e-commerce platform integrated with Gemini 2.5 Flash image grading, 2FA WhatsApp Fonnte OTP, real-time C2C chat, and Midtrans payment gateway.',
    tech: ['React 18', 'Firebase RTDB', 'Gemini Flash', 'WhatsApp Gateway', 'Midtrans API'],
    repoLink: 'https://github.com/Fatirrr08/salin-gaya-web',
    liveLink: 'https://salin-gaya.web.app/'
  },
  {
    id: 'perintis',
    title: 'Perintis AI Validator 🚀',
    role: 'Full Stack Dev',
    badge: 'UMKM Platform',
    category: 'fullstack',
    desc: 'Platform validasi kelayakan ide bisnis & kalkulator finansial UMKM Indonesia berbasis FastAPI dan Gemini AI. Menyediakan kalkulator HPP resep, simulator plafon KUR, dan peta interaktif Leaflet.',
    descEn: 'Business idea validation & financial simulation platform for Indonesian MSMEs powered by FastAPI and Gemini AI with HPP calculation, KUR loan simulation, and Leaflet maps.',
    tech: ['React 19', 'FastAPI', 'Gemini AI', 'Tailwind CSS 4', 'Leaflet Map'],
    repoLink: 'https://github.com/marzhendo/Perintis'
  },
  {
    id: 'fittrack',
    title: 'FitTrack AI Telegram 🍱',
    role: 'AI & Backend Bot',
    badge: 'Telegram Bot 24/7',
    category: 'ai',
    desc: 'Asisten personal nutrisi & fitness Telegram Bot 24/7. Pemantauan nutrisi database kuliner lokal, food photo vision AI scanner, nutrition label OCR, dan estimasi kalori latihan MET-based.',
    descEn: '24/7 personal nutrition & fitness Telegram Bot assistant with Indonesian cuisine nutritional database, food photo vision AI scanner, and MET-based workout calorie tracking.',
    tech: ['Python 3.11+', 'aiogram 3.x', 'Firebase Firestore', 'Vision AI', 'Telegram API'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'space_unbound',
    title: 'A Space for the Unbound 🎮',
    role: 'Frontend Creative',
    badge: 'Lomba IT FEST 2026',
    category: 'org',
    desc: 'Fan-made immersive gaming experience showcase karya lomba Web Development IT FEST UNW 2026. Canvas animated starfield, transisi Dive Mind, Lenis smooth scroll, dan tipografi retro Silkscreen.',
    descEn: 'Fan-made immersive gaming showcase developed for IT FEST UNW 2026 Web Development competition. Features HTML5 canvas starfields, Dive Mind theme transitions, and Lenis smooth scroll.',
    tech: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas', 'Lenis Scroll'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'gumam',
    title: 'Gumam (Voice Journal PWA) 🎙️',
    role: 'Frontend & AI Dev',
    badge: 'BitsMikro VibeCode 2026',
    category: 'fullstack',
    desc: 'Voice Journal PWA karya lomba BitsMikro Innovative VibeCode 2026. Merekam audio dan langsung menghasilkan transkrip serta ringkasan terstruktur via Gemini API, terintegrasi Firebase Auth & Firestore.',
    descEn: 'Voice Journal PWA for BitsMikro Innovative VibeCode 2026 competition. Converts recorded audio directly into transcripts and structured insights via Gemini API and Firebase.',
    tech: ['Vite', 'React 18', 'TypeScript', 'Gemini API', 'Firebase Auth', 'Firestore'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'hmif_eval',
    title: 'HMIF Executive Portal & Eval 🏛️',
    role: 'Chairman & Arch',
    badge: 'HMIF 2025/2026',
    category: 'org',
    desc: 'Sistem administrasi persuratan resmi otomatis (WEB_SECRETARY) dan platform evaluasi performa kinerja KPI anggota pengurus HMIF Telkom University Purwokerto.',
    descEn: 'Official document numbering automation system (WEB_SECRETARY) and executive member KPI performance evaluation dashboard for HMIF Telkom University Purwokerto.',
    tech: ['Next.js', 'Supabase Auth & Database', 'Tailwind CSS', 'Document Automation'],
    repoLink: 'https://github.com/Fatirrr08/Web_HMIF'
  },
  {
    id: 'librarypro',
    title: 'LibraryPro Management System 📚',
    role: 'Backend & Arch',
    badge: 'MVC Java Web',
    category: 'cybersec',
    demoTab: 'library_pro',
    desc: 'Sistem Informasi Perpustakaan berbasis arsitektur MVC Java Web. Menerapkan enkapsulasi/polimorfisme OOP, MySQL relasional, pencarian katalog fuzzy Levenshtein, dan dockerization di Railway.',
    descEn: 'MVC Java Web Library Management System featuring OOP encapsulation, relational MySQL schemas, Levenshtein fuzzy search, and Railway Docker deployment.',
    tech: ['Java 17', 'Jakarta Servlet', 'JSP 3.1', 'MySQL', 'Docker', 'Railway Cloud'],
    repoLink: 'https://github.com/Fatirrr08/Library-Pro',
    liveLink: 'https://librarypro.up.railway.app/'
  },
  {
    id: 'fotokitablur',
    title: 'Foto Kita Blur 📷',
    role: 'Vision & Frontend',
    badge: 'AI Gesture Filter',
    category: 'ai',
    desc: 'Interactive AI Camera Filter berbasis MediaPipe Hand Tracking dipadukan dengan retro Cassette Player dan efek visual real-time.',
    descEn: 'Interactive AI Camera Filter powered by MediaPipe Hand Tracking combined with a retro cassette deck player and real-time visual canvas effects.',
    tech: ['HTML5 Canvas', 'MediaPipe Hands', 'JavaScript ES6', 'Audio Deck'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'exec_board',
    title: 'Executive Board Website',
    role: 'Frontend Dev',
    badge: 'Vercel Deployed',
    category: 'org',
    desc: 'Antarmuka manajemen pengawasan digital dashboard organisasi dengan visualisasi data kepengurusan terstruktur.',
    descEn: 'Digital governance oversight dashboard interface with structured organizational data visualization.',
    tech: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Responsive UI'],
    liveLink: 'https://website-executive-board.vercel.app/'
  },
  {
    id: 'smart_finance',
    title: 'smart-student-finance 🪙',
    role: 'Lead Developer',
    badge: 'Finance Tracking',
    category: 'cybersec',
    desc: 'Aplikasi pencatatan keuangan dan target tabungan mahasiswa berbasis JSP & Servlets. Menampilkan analitik chart dinamis dan otentikasi multi-akun.',
    descEn: 'Student budget and savings goal tracking web app built on Java JSP & Servlets with dynamic chart analytics and secure authentication.',
    tech: ['Java Web', 'Servlets', 'JSP', 'MySQL', 'JavaScript'],
    repoLink: 'https://github.com/Fatirrr08/smart-student-finance'
  },
  {
    id: 'perpus_swing',
    title: 'Perpus (Java Swing Desktop)',
    role: 'Desktop OOP Dev',
    badge: 'Academic Project',
    category: 'cybersec',
    desc: 'Aplikasi sirkulasi buku perpustakaan desktop berbasis GUI Java Swing terhubung langsung dengan basis data MySQL lokal.',
    descEn: 'Desktop library circulation management application built with Java Swing GUI and local MySQL relational database.',
    tech: ['Java 17', 'Java Swing GUI', 'MySQL Database', 'OOP Architecture'],
    repoLink: 'https://github.com/Fatirrr08/Perpus'
  },
  {
    id: 'jarkom_tubes',
    title: 'JARKOM-TUBES (TCP/IP Sockets)',
    role: 'Network Programmer',
    badge: 'Networks Assignment',
    category: 'cybersec',
    desc: 'Tugas besar Jaringan Komputer menerapkan socket programming TCP/IP client-server multithreaded untuk pertukaran pesan jaringan aman.',
    descEn: 'Computer Networks final project implementing multithreaded TCP/IP client-server socket programming for secure network message exchange.',
    tech: ['Python Sockets', 'TCP/IP Protocol', 'Client-Server Architecture'],
    repoLink: 'https://github.com/Fatirrr08/JARKOM-TUBES'
  },
  {
    id: 'aka',
    title: 'AKA (Analisis Kompleksitas Algoritma)',
    role: 'Algorithmic Dev',
    badge: 'Complexity Benchmark',
    category: 'cybersec',
    desc: 'Proyek analisis performa komparatif kompleksitas waktu dan ruang (Big O Notation) antara algoritma rekursif dan iteratif pada Python.',
    descEn: 'Comparative space and time complexity benchmarking analysis project (Big O Notation) between recursive and iterative algorithms in Python.',
    tech: ['Python', 'Time & Space Complexity', 'Algorithmic Benchmarking'],
    repoLink: 'https://github.com/Fatirrr08/AKA'
  },
  {
    id: 'prodi_if',
    title: 'Portal Kurikulum Prodi IF',
    role: 'Frontend Dev',
    badge: 'Campus Portal',
    category: 'org',
    desc: 'Portal web interaktif visualisasi kurikulum, rencana studi semester, dan deskripsi RPS Program Studi S1 Teknik Informatika Telkom University Purwokerto.',
    descEn: 'Interactive curriculum visualization and semester study plan portal for Informatics Engineering at Telkom University Purwokerto.',
    tech: ['HTML5', 'CSS3 Custom', 'JavaScript', 'RPS Data Parser'],
    repoLink: 'https://github.com/Fatirrr08'
  },
  {
    id: 'portfolio_web',
    title: 'Interactive Portfolio (Vite + React)',
    role: 'Lead Developer',
    badge: 'Current Site',
    category: 'fullstack',
    desc: 'Situs web portofolio personal kasual interaktif berbasis React + Vite + Tailwind CSS yang dilengkapi 6 modul Testing Sandbox terintegrasi.',
    descEn: 'Interactive casual personal portfolio website built on React + Vite + Tailwind CSS featuring 6 integrated playable Sandbox testing modules.',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Firebase Hosting'],
    repoLink: 'https://github.com/Fatirrr08/Portofolio',
    liveLink: 'https://portofolio-fatir.web.app/'
  }
]);
