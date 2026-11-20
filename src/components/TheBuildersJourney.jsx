import React, { useState, useMemo, useCallback, memo } from 'react';
import {
  Cpu,
  Globe,
  Compass,
  ChevronRight,
  ChevronLeft,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Search,
  Zap,
  Eye,
  ArrowRight,
  Users,
  Code,
  BookOpen,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ALL_PROJECTS } from '../data/projectsData';

const GithubIcon = memo((props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
));

const CHAPTERS_LIST = [
  { id: '00', tag: 'CH.00', labelId: 'The Arrival', labelEn: 'The Arrival', icon: Compass },
  { id: '01', tag: 'CH.01', labelId: 'The Identity', labelEn: 'The Identity', icon: Code },
  { id: '02', tag: 'CH.02', labelId: 'The Evolution', labelEn: 'The Evolution', icon: BookOpen },
  { id: '03', tag: 'CH.03', labelId: 'The Mindset', labelEn: 'The Mindset', icon: Cpu },
  { id: '04', tag: 'CH.04', labelId: "The Builder's Lab", labelEn: "The Builder's Lab", icon: Layers },
  { id: '05', tag: 'CH.05', labelId: 'Beyond the Code', labelEn: 'Beyond the Code', icon: Users },
  { id: '06', tag: 'CH.06', labelId: 'The Next Frontier', labelEn: 'The Next Frontier', icon: Zap },
  { id: '07', tag: 'CH.07', labelId: 'The Connection', labelEn: 'The Connection', icon: Globe },
];

export default function TheBuildersJourney({ triggerGlobalEffect }) {
  const {
    lang,
    t,
    playSound,
    journeyChapter,
    setJourneyChapter,
    setSelectedProjectForModal,
    journeyMode,
    toggleJourneyMode,
  } = usePortfolio();

  // Active Milestone in Chapter 02 (The Evolution)
  const [selectedMilestone, setSelectedMilestone] = useState('2025');

  // Active Mindset Discipline in Chapter 03
  const [activeMindsetTab, setActiveMindsetTab] = useState('se');

  // Project Lab Search & Filter in Chapter 04
  const [labCategory, setLabCategory] = useState('all');
  const [labSearch, setLabSearch] = useState('');

  // Email Copy State in Chapter 07
  const [copiedEmail, setCopiedEmail] = useState(false);

  const currentChapterIndex = CHAPTERS_LIST.findIndex((c) => c.id === journeyChapter);
  const activeChapter = CHAPTERS_LIST[currentChapterIndex >= 0 ? currentChapterIndex : 0];

  const handleSelectChapter = useCallback(
    (id) => {
      setJourneyChapter(id);
      playSound('tab');
    },
    [setJourneyChapter, playSound]
  );

  const handleNextChapter = useCallback(() => {
    const nextIdx = (currentChapterIndex + 1) % CHAPTERS_LIST.length;
    setJourneyChapter(CHAPTERS_LIST[nextIdx].id);
    playSound('click');
    if (nextIdx === CHAPTERS_LIST.length - 1 && triggerGlobalEffect) {
      triggerGlobalEffect('confetti');
    }
  }, [currentChapterIndex, setJourneyChapter, playSound, triggerGlobalEffect]);

  const handlePrevChapter = useCallback(() => {
    const prevIdx = (currentChapterIndex - 1 + CHAPTERS_LIST.length) % CHAPTERS_LIST.length;
    setJourneyChapter(CHAPTERS_LIST[prevIdx].id);
    playSound('click');
  }, [currentChapterIndex, setJourneyChapter, playSound]);

  const handleCopyEmail = () => {
    const email = 'fatirgibrann@gmail.com';
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    playSound('success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Evolution Milestones Data (Chapter 02)
  const evolutionMilestones = {
    '2023': {
      year: '2023',
      phase: 'Semester 1 - 2 • Telkom University Purwokerto',
      title: lang === 'id' ? 'Fondasi Algoritma & Logika Komputasi' : 'Algorithmic Foundations & Systems Logic',
      desc:
        lang === 'id'
          ? 'Memulai perjalanan di S1 Teknik Informatika. Menguasai pemrograman imperatif C/C++, struktur data linier/non-linier, logika boolean, dan analisis kompleksitas Big-O.'
          : 'Began Informatics Engineering journey. Mastered C/C++ imperative programming, discrete mathematics, data structures, and Big-O computational complexity.',
      tags: ['C/C++', 'Python', 'Algorithms', 'Data Structures', 'Discrete Math'],
      metric: 'GPA: 3.8+ / Top Tier',
    },
    '2024': {
      year: '2024',
      phase: 'Semester 3 - 4 • Telkom University Purwokerto',
      title: lang === 'id' ? 'Eksplorasi Edge AI & Kriptografi Offline' : 'Edge AI Prototyping & Offline Cryptography',
      desc:
        lang === 'id'
          ? 'Mengembangkan riset On-Device AI lokal tanpa ketergantungan cloud: PostureLens (MediaPipe Pose WASM) dan el_gestur_v2 (YOLOv8 + DeepSORT). Merancang VaultSentinel dengan enkripsi AES-128 Fernet dan 95.8% automated test coverage.'
          : 'Pioneered on-device AI research with zero cloud telemetry: PostureLens (MediaPipe Pose WASM) and el_gestur_v2 (YOLOv8 + DeepSORT). Engineered VaultSentinel featuring AES-128 Fernet encryption with 95.8% automated test coverage.',
      tags: ['MediaPipe WASM', 'YOLOv8', 'AES-128 Fernet', 'PBKDF2', 'Next.js', 'FastAPI'],
      metric: '95.8% Test Coverage',
    },
    '2025': {
      year: '2025',
      phase: 'Semester 5 (Aktif) • Telkom University Purwokerto',
      title: lang === 'id' ? 'Arsitektur Produksi & 20 Sistem Rekayasa' : 'Production Systems & 20 Verified Architectures',
      desc:
        lang === 'id'
          ? 'Mengonsolidasikan portofolio 20 sistem perangkat lunak terverifikasi: arsitektur modern Next.js 15, React 19, Go microservices, database multi-tenant PostgreSQL, dan dockerized pipelines.'
          : 'Consolidated a portfolio of 20 verified software engineering systems: Next.js 15 App Router, React 19, Go microservices, multi-tenant PostgreSQL schemas, and dockerized production pipelines.',
      tags: ['Next.js 15', 'Go / Golang', 'TypeScript', 'Docker', 'PostgreSQL', '20 Systems'],
      metric: '20 Verified Repositories',
    },
    '2026': {
      year: '2026',
      phase: 'Horizon Riset Berkelanjutan',
      title: lang === 'id' ? 'Riset Komputasi Masa Depan & Local Enclaves' : 'Future Computing & Local Neural Enclaves',
      desc:
        lang === 'id'
          ? 'Mengeksplorasi eksekusi model neural di browser via WebGPU, Zero-Trust Memory Buffers, dan arsitektur data terdistribusi tahan latensi (CRDT offline mesh).'
          : 'Exploring on-device neural execution via WebGPU, zero-trust transient memory encryption, and latency-resilient peer sync topologies using CRDTs.',
      tags: ['WebGPU', 'Local Enclaves', 'Zero-Trust', 'CRDTs', 'Low Latency'],
      metric: 'Sub-50ms On-Device Target',
    },
  };

  // Engineering Mindset Structured Quadrants (Chapter 03)
  const engineeringMindset = {
    se: {
      id: 'se',
      title: lang === 'id' ? 'Software Engineering & Arsitektur' : 'Software Engineering & Architecture',
      proficiency: lang === 'id' ? 'Tingkat: Berpengalaman' : 'Proficiency: Experienced',
      understands:
        lang === 'id'
          ? 'Prinsip Clean Architecture, pemisahan tanggung jawab (separation of concerns), pola desain modular, dan pentingnya pengujian otomatis.'
          : 'Clean Architecture principles, separation of concerns, modular design patterns, and the critical role of automated test coverage.',
      workedOn:
        lang === 'id'
          ? 'Sistem backup terenkripsi VaultSentinel dengan 95.8% automated test coverage via PyTest, generator arsitektur VibeDoc, dan arsitektur Next.js 15.'
          : 'VaultSentinel encrypted local backup with 95.8% automated PyTest coverage, VibeDoc architecture spec generator, and Next.js 15 system layouts.',
      explored:
        lang === 'id'
          ? 'Trade-off antara overhead memori dan kecepatan eksekusi, perancangan antarmuka komponen yang dapat digunakan ulang tanpa re-render berlebihan.'
          : 'Trade-offs between memory overhead and execution speed, designing reusable component interfaces with zero unnecessary re-render allocations.',
      improving:
        lang === 'id'
          ? 'Pola arsitektur micro-frontend terisolasi, arsitektur event-driven, dan standarisasi kontrak API menggunakan OpenAPI / Protobuf.'
          : 'Isolated micro-frontend patterns, event-driven backends, and strict API contract standardization via OpenAPI / Protobuf.',
    },
    fullstack: {
      id: 'fullstack',
      title: lang === 'id' ? 'Modern Full-Stack Development' : 'Modern Full-Stack Development',
      proficiency: lang === 'id' ? 'Tingkat: Berpengalaman' : 'Proficiency: Experienced',
      understands:
        lang === 'id'
          ? 'Siklus hidup rendering React 19, Next.js 15 App Router, Server Components vs Client Components, dan integrasi API RESTful / WebSocket.'
          : 'React 19 concurrent lifecycle, Next.js 15 App Router, Server Components vs Client Components, and RESTful / WebSocket API integrations.',
      workedOn:
        lang === 'id'
          ? 'Platform e-commerce Salin Gaya dengan Midtrans SNAP & RajaOngkir, FocuSync Deep Work PWA dengan IndexedDB, dan portal akademik.'
          : 'Salin Gaya commercial platform with Midtrans SNAP & dynamic shipping logistics, FocuSync deep work PWA with IndexedDB, and academic portals.',
      explored:
        lang === 'id'
          ? 'Optimasi Core Web Vitals, dynamic code splitting, caching multi-tier (HTTP Cache-Control & stale-while-revalidate), dan form handling tipe aman.'
          : 'Core Web Vitals optimization, dynamic code splitting, multi-tier caching (Cache-Control & stale-while-revalidate), and type-safe form validation.',
      improving:
        lang === 'id'
          ? 'Pemanfaatan React Server Actions tingkat lanjut, optimasi streaming SSR dengan Suspense, dan orkestrasi Next.js Middleware di edge.'
          : 'Advanced React Server Actions, streaming SSR optimization with Suspense boundaries, and Next.js edge middleware orchestration.',
    },
    ai: {
      id: 'ai',
      title: lang === 'id' ? 'Artificial Intelligence & Computer Vision' : 'Artificial Intelligence & Computer Vision',
      proficiency: lang === 'id' ? 'Tingkat: Praktisi Aktif' : 'Proficiency: Practiced',
      understands:
        lang === 'id'
          ? 'Inferensi on-device lokal tanpa upload video ke server, estimasi pose 33 landmark spasial MediaPipe, tracking objek YOLOv8 + DeepSORT.'
          : 'Zero-cloud on-device local inference, MediaPipe 33-point spatial pose estimation, and YOLOv8 + DeepSORT presenter tracking.',
      workedOn:
        lang === 'id'
          ? 'PostureLens (analisis sudut bungkuk leher trigonometri 3D secara lokal) dan el_gestur_v2 (asisten presentasi hands-free dengan 9 klasifikasi gestur).'
          : 'PostureLens (3D trigonometric neck slouch vector calculation locally) and el_gestur_v2 (hands-free presentation system with 9 gesture states).',
      explored:
        lang === 'id'
          ? 'Menjaga FPS webcam stabil pada 30+ FPS di perangkat berspesifikasi standar melalui WebAssembly dan pemrosesan thread terisolasi.'
          : 'Maintaining stable 30+ FPS webcam throughput on standard consumer hardware via WebAssembly in isolated client worker threads.',
      improving:
        lang === 'id'
          ? 'Integrasi WebGPU untuk inferensi neural berakselerasi hardware langsung di browser dan pemanfaatan Small Language Models (SLMs) lokal.'
          : 'WebGPU acceleration for in-browser neural networks and evaluating local Small Language Models (SLMs) without remote API dependencies.',
    },
    cybersec: {
      id: 'cybersec',
      title: lang === 'id' ? 'Cybersecurity & Kriptografi' : 'Cybersecurity & Cryptography',
      proficiency: lang === 'id' ? 'Tingkat: Praktisi Aktif' : 'Proficiency: Practiced',
      understands:
        lang === 'id'
          ? 'Enkripsi simetris terotentikasi (Fernet / AES-128 CBC + HMAC-SHA256), derivasi kunci berbasis PBKDF2 dengan salt kriptografis, dan hashing SHA-256.'
          : 'Authenticated symmetric ciphers (Fernet / AES-128 CBC + HMAC-SHA256), PBKDF2 cryptographic salt key derivation, and incremental SHA-256 hashes.',
      workedOn:
        lang === 'id'
          ? 'VaultSentinel (sistem backup terenkripsi lokal dengan verifikasi integritas berkesinambungan) dan JARKOM-TUBES (audit paket soket TCP/IP).'
          : 'VaultSentinel (offline encrypted backup system with continuous integrity verification) and JARKOM-TUBES (TCP/IP socket packet inspection).',
      explored:
        lang === 'id'
          ? 'Mendeteksi silent data corruption pada penyimpanan lokal, mitigasi serangan timing pada verifikasi token, dan manajemen kunci aman.'
          : 'Detecting silent data corruption in local storage, timing-attack mitigation in token validation, and secure memory key handling.',
      improving:
        lang === 'id'
          ? 'Protokol enkripsi end-to-end berbasis kurva eliptik (X25519) dan arsitektur Zero-Trust untuk penyimpanan lokal transien.'
          : 'Elliptic curve end-to-end encryption protocols (X25519) and Zero-Trust architectures for transient local memory buffers.',
    },
    infra: {
      id: 'infra',
      title: lang === 'id' ? 'Infrastruktur & Sistem Terdistribusi' : 'Infrastructure & Distributed Systems',
      proficiency: lang === 'id' ? 'Tingkat: Familiar & Bertumbuh' : 'Proficiency: Familiar & Growing',
      understands:
        lang === 'id'
          ? 'Model konkurensi goroutine / channel pada Go, microservices containerized dengan Docker, dan replikasi database PostgreSQL.'
          : 'Goroutine and channel concurrency models in Go, containerized microservices via Docker, and PostgreSQL replication schemas.',
      workedOn:
        lang === 'id'
          ? 'LibraryPro (arsitektur MVC Java dengan PostgreSQL), microservices REST Go, dan konfigurasi Docker Compose terisolasi.'
          : 'LibraryPro (Java MVC architecture with PostgreSQL), Go REST microservices, and multi-container Docker Compose orchestrations.',
      explored:
        lang === 'id'
          ? 'Connection pooling pada database relasional, isolasi lingkungan kontainer, dan pengelolaan variabel lingkungan yang aman.'
          : 'Relational database connection pooling, container environment isolation, and secure secret injection paradigms.',
      improving:
        lang === 'id'
          ? 'Arsitektur data terdistribusi tahan latensi menggunakan Conflict-Free Replicated Data Types (CRDTs) dan reverse proxy Caddy / Nginx.'
          : 'Latency-resilient distributed data models using Conflict-Free Replicated Data Types (CRDTs) and high-performance reverse proxies.',
    },
  };

  // Filtered Projects for Chapter 04 (The Builder's Lab)
  const filteredLabProjects = useMemo(() => {
    return ALL_PROJECTS.filter((proj) => {
      const matchCategory = labCategory === 'all' || proj.category === labCategory;
      const q = labSearch.toLowerCase();
      const matchSearch =
        q === '' ||
        proj.title.toLowerCase().includes(q) ||
        proj.tech.some((tItem) => tItem.toLowerCase().includes(q)) ||
        proj.role.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [labCategory, labSearch]);

  return (
    <section
      id="the-builders-journey"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#090D16] text-slate-100 overflow-hidden border-t border-slate-800/80"
      aria-label="The Builder's Journey Narrative Experience"
    >
      {/* Background Architectural Geometry & Ambient Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161D2E0A_1px,transparent_1px),linear-gradient(to_bottom,#161D2E0A_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-400 text-xs font-mono font-medium tracking-wider mb-4 uppercase">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.journey?.badge || "The Builder's Journey"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space tracking-tight text-white mb-2">
            THE BUILDER’S JOURNEY
          </h2>
          <p className="text-xs sm:text-sm font-mono text-sky-400/90 tracking-wide uppercase mb-3">
            “Don’t just tell people what I can build. Let them experience how I think, build, solve, and evolve.”
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans">
            {t.journey?.subtitle ||
              'An interactive digital narrative exploring the identity, technical evolution, engineering mindset, and verified creations of Fatir Gibran.'}
          </p>

          {/* Mode Switcher: Story Mode vs Direct View */}
          <div className="mt-5 inline-flex items-center p-1 rounded-xl bg-[#111624] border border-slate-800 shadow-inner">
            <button
              onClick={() => {
                if (journeyMode !== 'story') toggleJourneyMode();
                playSound('tab');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                journeyMode === 'story'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.nav?.modeJourney || 'Story Mode'}
            </button>
            <button
              onClick={() => {
                if (journeyMode !== 'direct') toggleJourneyMode();
                playSound('tab');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                journeyMode === 'direct'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.nav?.modeDirect || 'Direct View'}
            </button>
          </div>
        </div>

        {/* Chapter HUD Navigation Dock */}
        <div className="mb-8 p-2 sm:p-2.5 rounded-2xl bg-[#111624]/90 border border-slate-800/80 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CHAPTERS_LIST.map((chapter) => {
              const Icon = chapter.icon;
              const isActive = journeyChapter === chapter.id;
              return (
                <button
                  key={chapter.id}
                  onClick={() => handleSelectChapter(chapter.id)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30 scale-[1.02]'
                      : 'bg-[#161D2E]/60 text-slate-400 hover:text-slate-200 hover:bg-[#161D2E] border border-transparent'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-sky-300 animate-ping' : 'bg-slate-600'}`} />
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-bold">{chapter.tag}</span>
                  <span className="hidden lg:inline text-[11px] opacity-80">
                    {lang === 'id' ? chapter.labelId : chapter.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Chapter Container */}
        <div className="relative rounded-3xl bg-[#111624] border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300">
          {/* Chapter Banner Header */}
          <div className="px-6 py-5 sm:px-8 sm:py-5 bg-[#161D2E]/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-blue-600/20 text-sky-400 font-mono text-xs font-bold border border-blue-500/30">
                {activeChapter.tag}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-space text-white">
                  {lang === 'id' ? activeChapter.labelId : activeChapter.labelEn}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {t.journey?.[`ch${activeChapter.id}`]?.subtitle}
                </p>
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevChapter}
                aria-label="Previous Chapter"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#111624] hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <span className="text-xs font-mono text-slate-500 px-1">
                {currentChapterIndex + 1} / {CHAPTERS_LIST.length}
              </span>
              <button
                onClick={handleNextChapter}
                aria-label="Next Chapter"
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all text-xs font-mono flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chapter Interior Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* ==============================================================
                CHAPTER 00 — THE ARRIVAL
            ============================================================== */}
            {journeyChapter === '00' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{t.journey?.ch00.hook || 'Every system begins with a question.'}</span>
                    </div>

                    <h4 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-space text-white leading-tight">
                      {t.journey?.ch00.nameIntro || "I'm Fatir Gibran."}
                    </h4>

                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
                      {t.journey?.ch00.lead ||
                        'An Informatics Engineering student, developer, and technology enthusiast who enjoys turning complex ideas into meaningful products.'}
                    </p>

                    <div className="pt-3 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSelectChapter('01')}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                      >
                        <span>{t.journey?.ch00.ctaStart || 'Start the Journey'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSelectChapter('04')}
                        className="px-6 py-3 rounded-xl bg-[#161D2E] hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono font-semibold text-xs flex items-center gap-2 transition-all"
                      >
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>{t.journey?.ch00.ctaDirect || 'Explore Directly (20 Projects)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Progressive Identity Telemetry Card */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-[#090D16] border border-slate-800/80 font-mono text-xs space-y-3 shadow-inner">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-slate-400">fatir@builder:~$ init --journey</span>
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <p>
                        <span className="text-sky-400">identity</span> : Fatir Gibran
                      </p>
                      <p>
                        <span className="text-sky-400">institution</span> : Telkom University Purwokerto
                      </p>
                      <p>
                        <span className="text-sky-400">discipline</span> : S1 Teknik Informatika (Active, Sem. 5)
                      </p>
                      <p>
                        <span className="text-sky-400">craftsmanship</span> : Full-Stack • Edge AI • Cryptography
                      </p>
                      <p>
                        <span className="text-sky-400">repositories</span> : 20 Verified Codebases on GitHub
                      </p>
                      <p>
                        <span className="text-sky-400">security_standard</span> : AES-128 Fernet + PBKDF2 (95.8% tests)
                      </p>
                      <p>
                        <span className="text-sky-400">status</span> :{' '}
                        <span className="text-emerald-400 font-bold">READY_TO_EXPLORE</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                CHAPTER 01 — THE IDENTITY
            ============================================================== */}
            {journeyChapter === '01' && (
              <div className="space-y-8 animate-fade-in">
                <div className="max-w-3xl space-y-3">
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-space text-white">
                    {lang === 'id' ? 'Sosok di Balik Kode' : 'The Person Behind the Code'}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {t.journey?.ch01.desc}
                  </p>
                </div>

                {/* 4 Pillars of Individual Craftsmanship */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-sky-400 font-bold block">PILLAR 01</span>
                    <h5 className="font-space font-bold text-base text-white">Edge AI & Vision</h5>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Inferensi visi lokal on-device via WebAssembly tanpa pengiriman frame ke server eksternal demi privasi mutlak.'
                        : 'On-device local vision inference via WebAssembly with zero frame egress to external clouds for strict privacy.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-amber-400 font-bold block">PILLAR 02</span>
                    <h5 className="font-space font-bold text-white">Keamanan & Kripto</h5>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Enkripsi terotentikasi AES-128 Fernet, derivasi kunci PBKDF2 dengan salt acak, dan verifikasi hash SHA-256.'
                        : 'Authenticated AES-128 Fernet ciphers, PBKDF2 random salt key derivation, and incremental SHA-256 hash audits.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold block">PILLAR 03</span>
                    <h5 className="font-space font-bold text-white">Modern Full-Stack</h5>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Pengembangan web reaktif Next.js 15, React 19 concurrent features, TypeScript, dan Tailwind CSS v4 efisien.'
                        : 'Reactive web development with Next.js 15, React 19 concurrent features, TypeScript, and clean Tailwind CSS v4.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-purple-400 font-bold block">PILLAR 04</span>
                    <h5 className="font-space font-bold text-white">Sistem & Backend</h5>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Layanan microservices konkurensi tinggi dengan Go (Golang), FastAPI, isolasi Docker, dan PostgreSQL.'
                        : 'High-throughput concurrency services powered by Go (Golang), FastAPI, Docker containers, and PostgreSQL.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                CHAPTER 02 — THE EVOLUTION
            ============================================================== */}
            {journeyChapter === '02' && (
              <div className="space-y-8 animate-fade-in">
                <div className="max-w-3xl">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {t.journey?.ch02.desc}
                  </p>
                </div>

                {/* Milestone Year Selectors */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['2023', '2024', '2025', '2026'].map((year) => {
                    const isSelected = selectedMilestone === year;
                    return (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedMilestone(year);
                          playSound('tab');
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-[#161D2E]/60 border-slate-800 text-slate-400 hover:bg-[#161D2E] hover:text-slate-200'
                        }`}
                      >
                        <span className="block text-2xl font-black font-space text-white">{year}</span>
                        <span className="block text-xs font-mono text-sky-400 mt-1">
                          {year === '2023'
                            ? 'Algoritma & C/C++'
                            : year === '2024'
                            ? 'Edge AI & Enkripsi'
                            : year === '2025'
                            ? '20 Sistem Produksi'
                            : 'Riset Masa Depan'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Milestone Card */}
                {evolutionMilestones[selectedMilestone] && (
                  <div className="p-6 rounded-2xl bg-[#090D16] border border-slate-800/80 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-lg font-bold font-space text-white">
                          {evolutionMilestones[selectedMilestone].title}
                        </h4>
                        <span className="text-xs font-mono text-slate-400">
                          {evolutionMilestones[selectedMilestone].phase}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                        {evolutionMilestones[selectedMilestone].metric}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 font-sans leading-relaxed">
                      {evolutionMilestones[selectedMilestone].desc}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {evolutionMilestones[selectedMilestone].tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-[#161D2E] text-slate-300 text-xs font-mono border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==============================================================
                CHAPTER 03 — THE ENGINEERING MINDSET
            ============================================================== */}
            {journeyChapter === '03' && (
              <div className="space-y-8 animate-fade-in">
                <div className="max-w-3xl">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {t.journey?.ch03.desc}
                  </p>
                </div>

                {/* 5 Disciplines Switcher */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5">
                  {Object.values(engineeringMindset).map((disc) => {
                    const isActive = activeMindsetTab === disc.id;
                    return (
                      <button
                        key={disc.id}
                        onClick={() => {
                          setActiveMindsetTab(disc.id);
                          playSound('tab');
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all ${
                          isActive
                            ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-[#161D2E]/60 border-slate-800 text-slate-400 hover:bg-[#161D2E] hover:text-slate-200'
                        }`}
                      >
                        <span className="block text-[11px] font-mono text-sky-400 line-clamp-1">{disc.proficiency.split(':')[1]}</span>
                        <span className="block text-xs font-bold font-space text-white mt-1 line-clamp-1">
                          {disc.title.split('&')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Mindset 4 Quadrants Display */}
                {engineeringMindset[activeMindsetTab] && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-slate-800/80 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-1">
                          {engineeringMindset[activeMindsetTab].proficiency}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold font-space text-white">
                          {engineeringMindset[activeMindsetTab].title}
                        </h4>
                      </div>
                    </div>

                    {/* 4 Quadrants Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-[#161D2E] border border-slate-800 space-y-1.5">
                        <span className="text-xs font-mono text-sky-400 font-bold block uppercase">
                          1. What I Understand
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          {engineeringMindset[activeMindsetTab].understands}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#161D2E] border border-slate-800 space-y-1.5">
                        <span className="text-xs font-mono text-emerald-400 font-bold block uppercase">
                          2. What I Have Worked On
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          {engineeringMindset[activeMindsetTab].workedOn}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#161D2E] border border-slate-800 space-y-1.5">
                        <span className="text-xs font-mono text-amber-400 font-bold block uppercase">
                          3. What Problems I Have Explored
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          {engineeringMindset[activeMindsetTab].explored}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#161D2E] border border-slate-800 space-y-1.5">
                        <span className="text-xs font-mono text-purple-400 font-bold block uppercase">
                          4. What I Am Currently Improving
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          {engineeringMindset[activeMindsetTab].improving}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==============================================================
                CHAPTER 04 — THE BUILDER’S LAB
            ============================================================== */}
            {journeyChapter === '04' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl">
                      {t.journey?.ch04.desc}
                    </p>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={labSearch}
                        onChange={(e) => setLabSearch(e.target.value)}
                        placeholder="Search 20 projects or tech..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#090D16] border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <select
                      value={labCategory}
                      onChange={(e) => {
                        setLabCategory(e.target.value);
                        playSound('tab');
                      }}
                      className="px-3 py-2 rounded-xl bg-[#090D16] border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                    >
                      <option value="all">All Domains ({ALL_PROJECTS.length})</option>
                      <option value="ai">AI & Vision</option>
                      <option value="fullstack">Full-Stack Web</option>
                      <option value="cybersec">CyberSec & Systems</option>
                      <option value="org">Infrastructure & Web</option>
                    </select>
                  </div>
                </div>

                {/* 20 Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLabProjects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-mono text-sky-400 font-bold">
                            SYS-{(idx + 1).toString().padStart(2, '0')}: {proj.role}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]">
                            {proj.badge}
                          </span>
                        </div>

                        <h5 className="text-lg font-bold font-space text-white group-hover:text-sky-300 transition-colors">
                          {proj.title}
                        </h5>

                        <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                          {lang === 'id' ? proj.desc : proj.descEn}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {proj.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-[#161D2E] text-slate-400 font-mono text-[10px]"
                            >
                              {tech}
                            </span>
                          ))}
                          {proj.tech.length > 4 && (
                            <span className="px-1.5 py-0.5 text-slate-500 font-mono text-[10px]">
                              +{proj.tech.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-slate-800/80">
                        <button
                          onClick={() => {
                            setSelectedProjectForModal(proj);
                            playSound('modal');
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Blueprint</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {proj.liveLink && (
                            <a
                              href={proj.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#161D2E] text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                              title="Live Site"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {proj.repoLink && (
                            <a
                              href={proj.repoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#161D2E] text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                              title="Source Code"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==============================================================
                CHAPTER 05 — BEYOND THE CODE
            ============================================================== */}
            {journeyChapter === '05' && (
              <div className="space-y-8 animate-fade-in">
                <div className="max-w-3xl">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {t.journey?.ch05.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-sky-400 font-bold block uppercase">
                      Inisiatif & Kepemimpinan Teknis
                    </span>
                    <h5 className="font-space font-bold text-base text-white">
                      Memimpin Proyek & Kolaborasi Pengembang
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Memandu arah teknis pada proyek mahasiswa, memecah arsitektur kompleks menjadi modul kerja yang terdistribusi secara teratur, dan mengawal standar kualitas kode.'
                        : 'Guiding technical direction across collaborative student initiatives, decomposing complex architectures into manageable sprints, and enforcing code quality.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold block uppercase">
                      Komunikasi & Dokumentasi Jernih
                    </span>
                    <h5 className="font-space font-bold text-base text-white">
                      Spesifikasi Teknis yang Dapat Dipahami
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Menulis dokumentasi arsitektur, diagram aliran data, dan PRD padat konteks (seperti pada VibeDoc) yang menjembatani kebutuhan teknis dan non-teknis.'
                        : 'Authoring architectural specifications, data flow diagrams, and context-dense PRDs (demonstrated in VibeDoc) that bridge technical and non-technical stakeholders.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-amber-400 font-bold block uppercase">
                      Pemecahan Masalah di Bawah Batasan
                    </span>
                    <h5 className="font-space font-bold text-base text-white">
                      Rekayasa untuk Perangkat Terbatas
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Mendesain PostureLens agar tetap berjalan 30+ FPS pada perangkat standar tanpa GPU eksternal dan tanpa pengiriman data ke server.'
                        : 'Designing PostureLens to sustain 30+ FPS on consumer hardware without external dedicated GPUs and with zero cloud server egress.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-2">
                    <span className="text-xs font-mono text-purple-400 font-bold block uppercase">
                      Kultur Belajar & Ketekunan
                    </span>
                    <h5 className="font-space font-bold text-base text-white">
                      Evolusi Berkelanjutan
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                      {lang === 'id'
                        ? 'Secara mandiri mempelajari WebGPU, model inferensi lokal, dan pengujian terotentikasi untuk terus memperdalam kapabilitas rekayasa perangkat lunak.'
                        : 'Autonomously mastering WebGPU, local neural inference models, and authenticated testing pipelines to expand software engineering frontiers.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                CHAPTER 06 — THE NEXT FRONTIER
            ============================================================== */}
            {journeyChapter === '06' && (
              <div className="space-y-8 animate-fade-in">
                <div className="max-w-3xl">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {t.journey?.ch06.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-[#090D16] border border-rose-500/30 space-y-3">
                    <span className="text-xs font-mono text-rose-400 font-bold block">HORIZON 01</span>
                    <h5 className="text-base font-bold font-space text-white">Local Neural Enclaves</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {lang === 'id'
                        ? 'Mengeksekusi model visi dan inferensi bahasa kecil langsung di browser via WebGPU tanpa streaming data atau biaya API per-token.'
                        : 'Executing vision and small language models directly in client browsers via WebGPU with zero server streaming or API token billing.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-blue-500/30 space-y-3">
                    <span className="text-xs font-mono text-sky-400 font-bold block">HORIZON 02</span>
                    <h5 className="text-base font-bold font-space text-white">Zero-Trust Local Storage</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {lang === 'id'
                        ? 'Enkripsi memori transien, logging terverifikasi tamper-evident, dan audit integritas kontinu yang memperluas prinsip VaultSentinel.'
                        : 'Transient memory encryption, tamper-evident audit logs, and continuous integrity verification extending VaultSentinel core principles.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090D16] border border-emerald-500/30 space-y-3">
                    <span className="text-xs font-mono text-emerald-400 font-bold block">HORIZON 03</span>
                    <h5 className="text-base font-bold font-space text-white">Resilient Edge Topologies</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {lang === 'id'
                        ? 'Sinkronisasi data offline-first dengan CRDTs untuk aplikasi kolaboratif berkinerja tinggi tanpa server terpusat.'
                        : 'Offline-first peer synchronizations powered by CRDTs, ensuring zero data loss across volatile network conditions.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                CHAPTER 07 — THE CONNECTION
            ============================================================== */}
            {journeyChapter === '07' && (
              <div className="space-y-8 animate-fade-in">
                <div className="max-w-3xl space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider block">
                    JOURNEY COMPLETED
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-extrabold font-space text-white">
                    {t.journey?.ch07.heading || 'Every great build starts with a conversation.'}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {t.journey?.ch07.subheading ||
                      'Whether you have a technical challenge worth solving, an opportunity for collaboration, or want to discuss systems architecture, my inbox is always open.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-3">
                      <span className="text-xs font-mono text-slate-400 block">PRIMARY DIRECT CONTACT:</span>
                      <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#161D2E] border border-slate-700">
                        <span className="font-mono text-xs sm:text-sm text-sky-300 truncate">
                          fatirgibrann@gmail.com
                        </span>
                        <button
                          onClick={handleCopyEmail}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs flex items-center gap-1.5 transition-all shrink-0"
                        >
                          {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/Fatirrr08"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#161D2E] hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-2 transition-all"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub @Fatirrr08</span>
                      </a>

                      <a
                        href="https://linkedin.com/in/FatirGibran"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#161D2E] hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs flex items-center gap-2 transition-all"
                      >
                        <Globe className="w-4 h-4" />
                        <span>LinkedIn Profile</span>
                      </a>

                      <a
                        href="mailto:fatirgibrann@gmail.com"
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Open Mail Client</span>
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-5 p-5 rounded-2xl bg-[#090D16] border border-cyan-500/30 font-mono text-xs space-y-2">
                    <span className="text-cyan-400 font-bold block mb-2">VERIFIED REPOSITORY DOSSIER</span>
                    <p className="text-slate-400">
                      Name: <span className="text-white">Fatir Gibran</span>
                    </p>
                    <p className="text-slate-400">
                      Discipline: <span className="text-white">Software & Edge AI Engineer</span>
                    </p>
                    <p className="text-slate-400">
                      Academic: <span className="text-white">Telkom Univ Purwokerto</span>
                    </p>
                    <p className="text-slate-400">
                      Production Projects: <span className="text-white">20 Verified Systems</span>
                    </p>
                    <p className="text-slate-400">
                      Verification: <span className="text-emerald-400 font-bold">100% AUTHENTIC CODE</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
