import React, { useState } from 'react';
import { Star, Folder, ExternalLink, Play, Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Custom inline SVG icon for GitHub
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

function ProjectCard({ project, onOpenSandboxDemo, t, lang }) {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  const description = (lang === 'en' && project.descEn) ? project.descEn : project.desc;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? 'transform 0.05s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      className="bg-white dark:bg-slate-800 border-2 border-pastel-peach/50 dark:border-slate-700/80 hover:border-pastel-blue dark:hover:border-sky-500 rounded-3xl p-6 md:p-7 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md group"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[11px] font-bold font-space uppercase tracking-wider text-pastel-blue-dark dark:text-sky-300 bg-pastel-blue/60 dark:bg-sky-950/60 py-1 px-3 rounded-full border border-pastel-blue/80 dark:border-sky-800">
            {project.role}
          </span>
          {project.badge && (
            <span className="text-[10px] font-bold font-space uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-pastel-yellow/90 dark:bg-amber-950/60 py-1 px-2.5 rounded-full border border-pastel-yellow-hover dark:border-amber-800 shadow-pastel-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-space font-bold text-pastel-navy dark:text-white mb-2.5 leading-snug group-hover:text-pastel-blue-dark dark:group-hover:text-sky-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-xs md:text-sm text-pastel-navy/70 dark:text-slate-300 leading-relaxed mb-5">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((tItem, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold text-pastel-navy/60 dark:text-slate-300 bg-pastel-bg dark:bg-slate-900 border border-pastel-navy/10 dark:border-slate-700 py-0.5 px-2 rounded-lg"
            >
              {tItem}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-pastel-peach/30 dark:border-slate-700/60 mt-auto">
        {project.demoTab && (
          <button
            onClick={() => onOpenSandboxDemo(project.demoTab)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-navy bg-pastel-yellow hover:bg-pastel-yellow-hover border border-pastel-yellow-hover py-2 px-3.5 rounded-xl shadow-pastel-sm transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-pastel-navy" />
            <span>{t.projects.btnTryDemo}</span>
          </button>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-pastel-green/40 dark:bg-emerald-950/60 hover:bg-pastel-green/80 dark:hover:bg-emerald-900 border border-pastel-green border-emerald-600/30 dark:border-emerald-700 py-2 px-3.5 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t.projects.btnVisit}</span>
          </a>
        )}

        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-pastel-navy/80 dark:text-slate-300 hover:text-pastel-navy dark:hover:text-white bg-pastel-bg dark:bg-slate-900 hover:bg-pastel-peach/40 dark:hover:bg-slate-700 border border-pastel-navy/15 dark:border-slate-700 py-2 px-3 rounded-xl transition-colors ml-auto"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>{t.projects.btnGitHub}</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects({ onSelectSandboxTab }) {
  const { t, lang } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allProjects = [
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
  ];

  const categories = [
    { id: 'all', label: t.projects.categories.all, count: allProjects.length },
    { id: 'ai', label: t.projects.categories.ai, count: allProjects.filter(p => p.category === 'ai').length },
    { id: 'fullstack', label: t.projects.categories.fullstack, count: allProjects.filter(p => p.category === 'fullstack').length },
    { id: 'cybersec', label: t.projects.categories.cybersec, count: allProjects.filter(p => p.category === 'cybersec').length },
    { id: 'org', label: t.projects.categories.org, count: allProjects.filter(p => p.category === 'org').length },
  ];

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const desc = (lang === 'en' && project.descEn) ? project.descEn : project.desc;
    const matchesSearch = !q || (
      project.title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      project.tech.some(tItem => tItem.toLowerCase().includes(q))
    );
    return matchesCategory && matchesSearch;
  });

  const handleOpenSandbox = (tabId) => {
    if (onSelectSandboxTab) {
      onSelectSandboxTab(tabId);
    }
    const sandboxEl = document.getElementById('simulator');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="proyek" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-2 border-pastel-peach/30 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-yellow/80 dark:bg-amber-400/20 border border-pastel-yellow-hover dark:border-amber-400/40 text-pastel-navy dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-pastel-blue-dark dark:text-amber-400" />
            <span>{t.projects.badgeVerified}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space text-pastel-navy dark:text-white inline-block relative">
            {t.projects.title}
            <span className="absolute bottom-1.5 left-0 w-1/2 h-3 bg-pastel-yellow/60 dark:bg-amber-400/30 -z-10 rounded-full"></span>
          </h2>
          <p className="text-sm md:text-base text-pastel-navy/70 dark:text-slate-300 mt-2 max-w-xl leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-pastel-peach dark:border-slate-700 focus:border-pastel-blue-dark dark:focus:border-sky-400 outline-none font-semibold text-xs md:text-sm text-pastel-navy dark:text-white bg-white dark:bg-slate-800 shadow-pastel-sm transition-colors"
          />
          <Search className="w-4 h-4 text-pastel-navy/40 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs md:text-sm font-bold font-space transition-all duration-200 border-2 ${
              activeCategory === cat.id
                ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy border-pastel-yellow-hover shadow-pastel-sm scale-105'
                : 'bg-white dark:bg-slate-800 border-pastel-peach/50 dark:border-slate-700 text-pastel-navy/70 dark:text-slate-300 hover:bg-pastel-peach/20 dark:hover:bg-slate-750 hover:text-pastel-navy dark:hover:text-white'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              activeCategory === cat.id ? 'bg-pastel-navy/10 text-pastel-navy' : 'bg-pastel-bg dark:bg-slate-900 text-pastel-navy/50 dark:text-slate-400'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {filteredProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard
              project={project}
              onOpenSandboxDemo={handleOpenSandbox}
              t={t}
              lang={lang}
            />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-800 border-2 border-dashed border-pastel-peach dark:border-slate-700 rounded-3xl mt-4">
          <span className="block text-2xl mb-2">🔍</span>
          <h4 className="font-space font-bold text-pastel-navy dark:text-white text-lg mb-1">{t.projects.noMatchTitle}</h4>
          <p className="text-xs md:text-sm text-pastel-navy/60 dark:text-slate-400">{t.projects.noMatchDesc}</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-4 text-xs font-bold text-pastel-blue-dark dark:text-sky-400 hover:underline"
          >
            {t.projects.btnReset}
          </button>
        </div>
      )}
    </section>
  );
}
