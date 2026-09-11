import React, { useState } from 'react';
import { Star, Folder, ExternalLink, Play, Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

// Custom inline SVG icon for GitHub
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

function ProjectCard({ project, onOpenSandboxDemo }) {
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

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? 'transform 0.05s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      className="bg-white border-2 border-pastel-peach/50 hover:border-pastel-blue rounded-3xl p-6 md:p-7 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md group"
    >
      {/* Top badges */}
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[11px] font-bold font-space uppercase tracking-wider text-pastel-blue-dark bg-pastel-blue/60 py-1 px-3 rounded-full border border-pastel-blue/80">
            {project.role}
          </span>
          {project.badge && (
            <span className="text-[10px] font-bold font-space uppercase tracking-wider text-amber-700 bg-pastel-yellow/90 py-1 px-2.5 rounded-full border border-pastel-yellow-hover shadow-pastel-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-space font-bold text-pastel-navy mb-2.5 leading-snug group-hover:text-pastel-blue-dark transition-colors">
          {project.title}
        </h3>

        <p className="text-xs md:text-sm text-pastel-navy/70 leading-relaxed mb-5">
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold text-pastel-navy/60 bg-pastel-bg border border-pastel-navy/10 py-0.5 px-2 rounded-lg"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-pastel-peach/30 mt-auto">
        {project.demoTab && (
          <button
            onClick={() => onOpenSandboxDemo(project.demoTab)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-navy bg-pastel-yellow hover:bg-pastel-yellow-hover border border-pastel-yellow-hover py-2 px-3.5 rounded-xl shadow-pastel-sm transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-pastel-navy" />
            <span>Uji Demo</span>
          </button>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-pastel-green/40 hover:bg-pastel-green/80 border border-pastel-green border-emerald-600/30 py-2 px-3.5 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Kunjungi</span>
          </a>
        )}

        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-pastel-navy/80 hover:text-pastel-navy bg-pastel-bg hover:bg-pastel-peach/40 border border-pastel-navy/15 py-2 px-3 rounded-xl transition-colors ml-auto"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects({ onSelectSandboxTab }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allProjects = [
    // 1. PostureLens (Edge AI)
    {
      id: 'posturelens',
      title: 'PostureLens 👁️⚡',
      role: 'Edge AI & Lead Dev',
      badge: 'On-Device AI',
      category: 'ai',
      demoTab: 'posturelens',
      desc: 'Real-time on-device AI posture & ergonomics health monitor untuk developer. 100% on-device privacy (WebAssembly/WebGL MediaPipe Pose), deteksi sudut bungkuk leher, Web Audio chime synthesizer, dan timer aturan 20-20-20.',
      tech: ['Next.js 14', 'MediaPipe Pose', 'WebAssembly', 'IndexedDB', 'Web Audio API', 'Framer Motion'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 2. el_gestur_v2
    {
      id: 'el_gestur_v2',
      title: 'el_gestur_v2',
      role: 'Lead Developer',
      badge: 'Computer Vision',
      category: 'ai',
      demoTab: 'el_gestur',
      desc: 'Asisten presentasi interaktif hands-free berbasis YOLOv8 + DeepSORT untuk tracking presenter utama dan MediaPipe Hands untuk 9 klasifikasi gestur serta voice typer Bahasa Indonesia.',
      tech: ['Python 3.10', 'YOLOv8', 'DeepSORT', 'MediaPipe', 'Flask', 'AppleScript'],
      repoLink: 'https://github.com/aariffaqiih/el_gestur_v2'
    },
    // 3. VibeDoc
    {
      id: 'vibedoc',
      title: 'VibeDoc 📝⚡',
      role: 'Full-Stack & AI Arch',
      badge: 'Gemini 2.5 Flash',
      category: 'fullstack',
      demoTab: 'vibedoc',
      desc: 'Pengubah ide produk mentah menjadi dokumen arsitektur dan PRD 7-seksi padat konteks dalam 30 detik untuk context window LLM coding assistant (Claude, Cursor, Antigravity).',
      tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Gemini 2.5 Flash', 'Mermaid.js'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 4. VaultSentinel (Kilas)
    {
      id: 'vaultsentinel',
      title: 'VaultSentinel 🛡️',
      role: 'DevOps & CyberSec',
      badge: '95.8% Coverage',
      category: 'cybersec',
      demoTab: 'vaultsentinel',
      desc: 'Local System Health & Encrypted Backup Automation 100% offline-first. Dilengkapi hashing inkremental SHA-256, enkripsi AES-128 Fernet + PBKDF2 passphrase salt, Claymorphic dashboard, dan Docker Compose.',
      tech: ['Python 3.10+', 'FastAPI', 'Claymorphism UI', 'AES-128 Fernet', 'PBKDF2', 'Docker'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 5. FocuSync
    {
      id: 'focusync',
      title: 'FocuSync 🎯',
      role: 'Product & Full-Stack',
      badge: 'Deep Work PWA',
      category: 'fullstack',
      desc: '"Lock Your Screen, Lock Your Phone, Unlock Your Potential." Ekosistem fokus lintas perangkat real-time untuk deep work. Dilengkapi QR Chamber pairing, PDF reader reader CDN, dan Supabase Realtime.',
      tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Supabase Realtime', 'PDF.js'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 6. salin-gaya-web
    {
      id: 'salin-gaya-web',
      title: 'Salin Gaya E-Commerce',
      role: 'Lead Developer',
      badge: 'Commercial Platform',
      category: 'fullstack',
      demoTab: 'salin_gaya',
      desc: 'Platform e-commerce premium thrifting terintegrasi kurasi kualitas gambar Gemini 2.5 Flash, 2FA WhatsApp Fonnte OTP, chat C2C real-time, dan pembayaran Midtrans.',
      tech: ['React 18', 'Firebase RTDB', 'Gemini Flash', 'WhatsApp Gateway', 'Midtrans API'],
      repoLink: 'https://github.com/Fatirrr08/salin-gaya-web',
      liveLink: 'https://salin-gaya.web.app/'
    },
    // 7. Perintis
    {
      id: 'perintis',
      title: 'Perintis AI Validator 🚀',
      role: 'Full Stack Dev',
      badge: 'UMKM Platform',
      category: 'fullstack',
      desc: 'Platform validasi kelayakan ide bisnis & kalkulator finansial UMKM Indonesia berbasis FastAPI dan Gemini AI. Menyediakan kalkulator HPP resep, simulator plafon KUR, dan peta interaktif Leaflet.',
      tech: ['React 19', 'FastAPI', 'Gemini AI', 'Tailwind CSS 4', 'Leaflet Map'],
      repoLink: 'https://github.com/marzhendo/Perintis'
    },
    // 8. FitTrack AI (GYM)
    {
      id: 'fittrack',
      title: 'FitTrack AI Telegram 🍱',
      role: 'AI & Backend Bot',
      badge: 'Telegram Bot 24/7',
      category: 'ai',
      desc: 'Asisten personal nutrisi & fitness Telegram Bot 24/7. Pemantauan nutrisi database kuliner lokal, food photo vision AI scanner, nutrition label OCR, dan estimasi kalori latihan MET-based.',
      tech: ['Python 3.11+', 'aiogram 3.x', 'Firebase Firestore', 'Vision AI', 'Telegram API'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 9. A Space for the Unbound Showcase
    {
      id: 'space_unbound',
      title: 'A Space for the Unbound 🎮',
      role: 'Frontend Creative',
      badge: 'Lomba IT FEST 2026',
      category: 'org',
      desc: 'Fan-made immersive gaming experience showcase karya lomba Web Development IT FEST UNW 2026. Canvas animated starfield, transisi Dive Mind, Lenis smooth scroll, dan tipografi retro Silkscreen.',
      tech: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas', 'Lenis Scroll'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 10. Gumam (Voice Journal PWA)
    {
      id: 'gumam',
      title: 'Gumam (Voice Journal PWA) 🎙️',
      role: 'Frontend & AI Dev',
      badge: 'BitsMikro VibeCode 2026',
      category: 'fullstack',
      desc: 'Voice Journal PWA karya lomba BitsMikro Innovative VibeCode 2026. Merekam audio dan langsung menghasilkan transkrip serta ringkasan terstruktur via Gemini API, terintegrasi Firebase Auth & Firestore.',
      tech: ['Vite', 'React 18', 'TypeScript', 'Gemini API', 'Firebase Auth', 'Firestore'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 11. HMIF Executive Board & Eval System
    {
      id: 'hmif_eval',
      title: 'HMIF Executive Portal & Eval 🏛️',
      role: 'Chairman & Arch',
      badge: 'HMIF 2025/2026',
      category: 'org',
      desc: 'Sistem administrasi persuratan resmi otomatis (WEB_SECRETARY) dan platform evaluasi performa kinerja KPI anggota pengurus HMIF Telkom University Purwokerto.',
      tech: ['Next.js', 'Supabase Auth & Database', 'Tailwind CSS', 'Document Automation'],
      repoLink: 'https://github.com/Fatirrr08/Web_HMIF'
    },
    // 12. LibraryPro
    {
      id: 'librarypro',
      title: 'LibraryPro Management System 📚',
      role: 'Backend & Arch',
      badge: 'MVC Java Web',
      category: 'cybersec',
      demoTab: 'library_pro',
      desc: 'Sistem Informasi Perpustakaan berbasis arsitektur MVC Java Web. Menerapkan enkapsulasi/polimorfisme OOP, MySQL relasional, pencarian katalog fuzzy Levenshtein, dan dockerization di Railway.',
      tech: ['Java 17', 'Jakarta Servlet', 'JSP 3.1', 'MySQL', 'Docker', 'Railway Cloud'],
      repoLink: 'https://github.com/Fatirrr08/Library-Pro',
      liveLink: 'https://librarypro.up.railway.app/'
    },
    // 13. Foto Kita Blur
    {
      id: 'fotokitablur',
      title: 'Foto Kita Blur 📷',
      role: 'Vision & Frontend',
      badge: 'AI Gesture Filter',
      category: 'ai',
      desc: 'Interactive AI Camera Filter berbasis MediaPipe Hand Tracking dipadukan dengan retro Cassette Player dan efek visual real-time.',
      tech: ['HTML5 Canvas', 'MediaPipe Hands', 'JavaScript ES6', 'Audio Deck'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 14. Executive Board Website
    {
      id: 'exec_board',
      title: 'Executive Board Website',
      role: 'Frontend Dev',
      badge: 'Vercel Deployed',
      category: 'org',
      desc: 'Antarmuka manajemen pengawasan digital dashboard organisasi dengan visualisasi data kepengurusan terstruktur.',
      tech: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Responsive UI'],
      liveLink: 'https://website-executive-board.vercel.app/'
    },
    // 15. smart-student-finance
    {
      id: 'smart_finance',
      title: 'smart-student-finance 🪙',
      role: 'Lead Developer',
      badge: 'Finance Tracking',
      category: 'cybersec',
      desc: 'Aplikasi pencatatan keuangan dan target tabungan mahasiswa berbasis JSP & Servlets. Menampilkan analitik chart dinamis dan otentikasi multi-akun.',
      tech: ['Java Web', 'Servlets', 'JSP', 'MySQL', 'JavaScript'],
      repoLink: 'https://github.com/Fatirrr08/smart-student-finance'
    },
    // 16. Perpus (Java Swing)
    {
      id: 'perpus_swing',
      title: 'Perpus (Java Swing Desktop)',
      role: 'Desktop OOP Dev',
      badge: 'Academic Project',
      category: 'cybersec',
      desc: 'Aplikasi sirkulasi buku perpustakaan desktop berbasis GUI Java Swing terhubung langsung dengan basis data MySQL lokal.',
      tech: ['Java 17', 'Java Swing GUI', 'MySQL Database', 'OOP Architecture'],
      repoLink: 'https://github.com/Fatirrr08/Perpus'
    },
    // 17. JARKOM-TUBES
    {
      id: 'jarkom_tubes',
      title: 'JARKOM-TUBES (TCP/IP Sockets)',
      role: 'Network Programmer',
      badge: 'Networks Assignment',
      category: 'cybersec',
      desc: 'Tugas besar Jaringan Komputer menerapkan socket programming TCP/IP client-server multithreaded untuk pertukaran pesan jaringan aman.',
      tech: ['Python Sockets', 'TCP/IP Protocol', 'Client-Server Architecture'],
      repoLink: 'https://github.com/Fatirrr08/JARKOM-TUBES'
    },
    // 18. AKA
    {
      id: 'aka',
      title: 'AKA (Analisis Kompleksitas Algoritma)',
      role: 'Algorithmic Dev',
      badge: 'Complexity Benchmark',
      category: 'cybersec',
      desc: 'Proyek analisis performa komparatif kompleksitas waktu dan ruang (Big O Notation) antara algoritma rekursif dan iteratif pada Python.',
      tech: ['Python', 'Time & Space Complexity', 'Algorithmic Benchmarking'],
      repoLink: 'https://github.com/Fatirrr08/AKA'
    },
    // 19. Portal Kurikulum Prodi IF
    {
      id: 'prodi_if',
      title: 'Portal Kurikulum Prodi IF',
      role: 'Frontend Dev',
      badge: 'Campus Portal',
      category: 'org',
      desc: 'Portal web interaktif visualisasi kurikulum, rencana studi semester, dan deskripsi RPS Program Studi S1 Teknik Informatika Telkom University Purwokerto.',
      tech: ['HTML5', 'CSS3 Custom', 'JavaScript', 'RPS Data Parser'],
      repoLink: 'https://github.com/Fatirrr08'
    },
    // 20. Portofolio (Personal)
    {
      id: 'portfolio_web',
      title: 'Interactive Portfolio (Vite + React)',
      role: 'Lead Developer',
      badge: 'Current Site',
      category: 'fullstack',
      desc: 'Situs web portofolio personal kasual interaktif berbasis React + Vite + Tailwind CSS yang dilengkapi 6 modul Testing Sandbox terintegrasi.',
      tech: ['React 19', 'Vite', 'Tailwind CSS', 'Firebase Hosting'],
      repoLink: 'https://github.com/Fatirrr08/Portofolio',
      liveLink: 'https://portofolio-fatir.web.app/'
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua Proyek', count: allProjects.length },
    { id: 'ai', label: 'AI, Edge & Vision', count: allProjects.filter(p => p.category === 'ai').length },
    { id: 'fullstack', label: 'Full-Stack & SaaS', count: allProjects.filter(p => p.category === 'fullstack').length },
    { id: 'cybersec', label: 'CyberSec & Systems', count: allProjects.filter(p => p.category === 'cybersec').length },
    { id: 'org', label: 'Organisasi & Lomba', count: allProjects.filter(p => p.category === 'org').length },
  ];

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      project.title.toLowerCase().includes(q) ||
      project.desc.toLowerCase().includes(q) ||
      project.tech.some(t => t.toLowerCase().includes(q))
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
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-2 border-pastel-peach/30 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-yellow/80 border border-pastel-yellow-hover text-pastel-navy font-bold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-pastel-blue-dark" />
            <span>Rekam Jejak Terverifikasi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-space text-pastel-navy inline-block relative">
            Galeri Proyek
            <span className="absolute bottom-1.5 left-0 w-1/2 h-3 bg-pastel-yellow/60 -z-10 rounded-full"></span>
          </h2>
          <p className="text-sm md:text-base text-pastel-navy/70 mt-2 max-w-xl leading-relaxed">
            Menampilkan 20 karya software engineering yang telah saya bangun: dari On-Device AI, sistem enkripsi offline, platform e-commerce, karya lomba nasional, hingga sistem administrasi organisasi himpunan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari e.g. 'Next.js', 'AI', 'Docker'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-pastel-peach focus:border-pastel-blue-dark outline-none font-semibold text-xs md:text-sm text-pastel-navy bg-white shadow-pastel-sm transition-colors"
          />
          <Search className="w-4 h-4 text-pastel-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs md:text-sm font-bold font-space transition-all duration-200 border-2 ${
              activeCategory === cat.id
                ? 'bg-pastel-yellow border-pastel-yellow-hover text-pastel-navy shadow-pastel-sm scale-105'
                : 'bg-white border-pastel-peach/50 text-pastel-navy/70 hover:bg-pastel-peach/20 hover:text-pastel-navy'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              activeCategory === cat.id ? 'bg-pastel-navy/10 text-pastel-navy' : 'bg-pastel-bg text-pastel-navy/50'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
        {filteredProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard
              project={project}
              onOpenSandboxDemo={handleOpenSandbox}
            />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-white border-2 border-dashed border-pastel-peach rounded-3xl mt-4">
          <span className="block text-2xl mb-2">🔍</span>
          <h4 className="font-space font-bold text-pastel-navy text-lg mb-1">Tidak ada proyek yang cocok</h4>
          <p className="text-xs md:text-sm text-pastel-navy/60">Coba kata kunci lain atau ubah kategori filter di atas.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-4 text-xs font-bold text-pastel-blue-dark hover:underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </section>
  );
}
