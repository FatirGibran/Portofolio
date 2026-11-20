import React, { useState, useMemo, useCallback, useEffect, memo } from 'react';
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
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
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

const SCENES_CONFIG = [
  { id: '00', tag: 'SCENE 00', titleId: 'The Arrival', titleEn: 'The Arrival', icon: Compass },
  { id: '01', tag: 'SCENE 01', titleId: 'The Person', titleEn: 'The Person', icon: Code },
  { id: '02', tag: 'SCENE 02', titleId: 'The Journey', titleEn: 'The Journey', icon: BookOpen },
  { id: '03', tag: 'SCENE 03', titleId: 'The Mindset', titleEn: 'The Mindset', icon: Cpu },
  { id: '04', tag: 'SCENE 04', titleId: 'The Lab', titleEn: 'The Lab', icon: Layers },
  { id: '05', tag: 'SCENE 05', titleId: 'Beyond Code', titleEn: 'Beyond Code', icon: Users },
  { id: '06', tag: 'SCENE 06', titleId: 'Next Frontier', titleEn: 'Next Frontier', icon: Zap },
  { id: '07', tag: 'SCENE 07', titleId: 'The Connection', titleEn: 'The Connection', icon: Globe },
];

export default function TheBuildersOdyssey({ triggerGlobalEffect }) {
  const {
    lang,
    toggleLang,
    t,
    playSound,
    soundEnabled,
    toggleSound,
    odysseyScene,
    goToScene,
    setSelectedProjectForModal,
    toggleExperienceMode,
  } = usePortfolio();

  // Scene transition animation state
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Active Milestone in Scene 02 (The Journey)
  const [selectedMilestone, setSelectedMilestone] = useState('2025');

  // Active Mindset Tab in Scene 03 (The Mindset)
  const [activeMindsetTab, setActiveMindsetTab] = useState('se');

  // Project Lab Filter in Scene 04 (The Lab)
  const [labCategory, setLabCategory] = useState('all');
  const [labSearch, setLabSearch] = useState('');

  // Email Copy State in Scene 07 (The Connection)
  const [copiedEmail, setCopiedEmail] = useState(false);

  const currentSceneIndex = SCENES_CONFIG.findIndex((s) => s.id === odysseyScene);
  const activeSceneConfig = SCENES_CONFIG[currentSceneIndex >= 0 ? currentSceneIndex : 0];

  const handleSceneChange = useCallback(
    (targetId) => {
      if (targetId === odysseyScene || isTransitioning) return;
      setIsTransitioning(true);
      playSound('tab');
      setTimeout(() => {
        goToScene(targetId);
        setIsTransitioning(false);
      }, 220);
    },
    [odysseyScene, isTransitioning, playSound, goToScene]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = (currentSceneIndex + 1) % SCENES_CONFIG.length;
    handleSceneChange(SCENES_CONFIG[nextIdx].id);
    if (nextIdx === SCENES_CONFIG.length - 1 && triggerGlobalEffect) {
      triggerGlobalEffect('confetti');
    }
  }, [currentSceneIndex, isTransitioning, handleSceneChange, triggerGlobalEffect]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    const prevIdx = (currentSceneIndex - 1 + SCENES_CONFIG.length) % SCENES_CONFIG.length;
    handleSceneChange(SCENES_CONFIG[prevIdx].id);
  }, [currentSceneIndex, isTransitioning, handleSceneChange]);

  // Keyboard navigation support: ArrowRight (Next), ArrowLeft (Prev)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleCopyEmail = () => {
    const email = 'fatirgibrann@gmail.com';
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    playSound('success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Scene 02: Journey Milestones Data
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

  // Scene 03: Engineering Mindset 4 Quadrants
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

  // Filtered Projects for Scene 04 (The Lab)
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

  const progressPercentage = ((currentSceneIndex) / (SCENES_CONFIG.length - 1)) * 100;

  return (
    <div
      id="the-builders-odyssey"
      className="relative min-h-screen bg-[#090D16] text-slate-100 overflow-x-hidden selection:bg-blue-600 selection:text-white flex flex-col justify-between"
      aria-label="The Builder's Odyssey Narrative Experience"
    >
      {/* Background Architectural Geometry & Ambient Lighting */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#161D2E0A_1px,transparent_1px),linear-gradient(to_bottom,#161D2E0A_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Floating Odyssey HUD (Persistent across scenes) */}
      <header className="relative z-30 pt-4 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between gap-3 p-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#111624]/90 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
          {/* Brand Monogram & Scene Telemetry */}
          <button
            onClick={() => handleSceneChange('00')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            title="Return to Scene 00 (Arrival)"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-sky-400 font-space font-black text-xs group-hover:scale-105 transition-transform">
              FG
            </div>
            <div>
              <span className="block font-space font-bold text-xs sm:text-sm text-white leading-tight">
                THE BUILDER’S ODYSSEY
              </span>
              <span className="block font-mono text-[10px] text-sky-400/90 leading-none">
                {activeSceneConfig.tag} • {lang === 'id' ? activeSceneConfig.titleId : activeSceneConfig.titleEn}
              </span>
            </div>
          </button>

          {/* Stepper HUD Indicators (Scenes 00 through 07) */}
          <div className="hidden md:flex items-center gap-1 bg-[#161D2E]/70 p-1 rounded-xl border border-slate-800">
            {SCENES_CONFIG.map((sc) => {
              const isCurrent = sc.id === odysseyScene;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSceneChange(sc.id)}
                  aria-pressed={isCurrent}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#111624]'
                  }`}
                  title={`${sc.tag}: ${lang === 'id' ? sc.titleId : sc.titleEn}`}
                >
                  {sc.id}
                </button>
              );
            })}
          </div>

          {/* Utility Actions: Audio, Language, Direct View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              className="p-2 rounded-xl bg-[#161D2E] hover:bg-slate-800 border border-slate-700/60 text-slate-300 transition-colors"
              aria-label="Toggle Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={() => {
                toggleLang();
                playSound('tab');
              }}
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              className="px-2.5 py-1.5 rounded-xl bg-[#161D2E] hover:bg-slate-800 border border-slate-700/60 text-slate-300 font-mono text-xs font-bold transition-colors"
            >
              {lang.toUpperCase()}
            </button>

            {/* Direct Portfolio View Escape Hatch */}
            <button
              onClick={() => {
                toggleExperienceMode();
                playSound('click');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-mono font-semibold text-slate-200 transition-all"
              title="Switch to Classic Continuous Portfolio"
            >
              <span>{t.nav?.modeDirect || 'Classic View'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-800/60 h-1 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-sky-400 h-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(8, progressPercentage)}%` }}
          />
        </div>
      </header>

      {/* Main Narrative Stage Area */}
      <main
        className={`relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-[0.98] blur-sm' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {/* =====================================================================
            SCENE 00 — THE ARRIVAL
        ===================================================================== */}
        {odysseyScene === '00' && (
          <div className="min-h-[75vh] flex flex-col justify-center animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Portrait & Atmospheric Frame */}
              <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-3 bg-gradient-to-b from-[#161D2E] to-[#111624] border-2 border-slate-700/80 shadow-2xl group transition-all duration-500 hover:border-blue-500/60">
                  <img
                    src="Image/fotomuka.jpg"
                    alt="Fatir Gibran Portrait"
                    width="320"
                    height="320"
                    loading="eager"
                    className="w-full h-full object-cover object-top rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-xl bg-[#090D16] border border-slate-700 text-[11px] font-mono text-emerald-400 font-bold shadow-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ONLINE • S1 CS PURWOKERTO</span>
                  </div>
                </div>
              </div>

              {/* Editorial Opening Typography & Core Hook */}
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sky-400 text-xs font-mono font-medium tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.odyssey?.scene00.hook || 'Every system begins with a question.'}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-space tracking-tight text-white leading-none">
                  FATIR GIBRAN
                </h1>

                <p className="text-lg sm:text-xl font-space font-medium text-sky-400/90">
                  {t.odyssey?.scene00.tagline || 'Software Engineer • On-Device AI • Cryptography'}
                </p>

                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
                  {t.odyssey?.scene00.lead ||
                    'An interactive narrative digital experience exploring how complex abstract ideas evolve into production-ready software systems.'}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                  <button
                    onClick={() => handleSceneChange('01')}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{t.odyssey?.scene00.btnBegin || 'BEGIN THE JOURNEY'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      toggleExperienceMode();
                      playSound('click');
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#161D2E] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-mono text-xs uppercase tracking-wider transition-all"
                  >
                    <span>{t.odyssey?.scene00.btnExplore || 'EXPLORE DIRECTLY'}</span>
                  </button>
                </div>

                <span className="block text-[11px] font-mono text-slate-500 mt-4">
                  {t.odyssey?.scene00.scrollHint || 'Use arrow keys [← →] or buttons to navigate scenes'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            SCENE 01 — THE PERSON BEHIND THE CODE
        ===================================================================== */}
        {odysseyScene === '01' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block">
                {t.odyssey?.scene01.narrative || 'Before the code, there was curiosity.'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-white tracking-tight">
                {lang === 'id' ? 'Sosok di Balik Kode' : 'The Person Behind the Code'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Narrative Content */}
              <div className="md:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                <p>{t.odyssey?.scene01.p1}</p>
                <p>{t.odyssey?.scene01.p2}</p>

                <div className="pt-4">
                  <button
                    onClick={() => handleSceneChange('02')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <span>{t.odyssey?.scene01.nextCta || 'Continue to The Journey'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Pillars Card */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-[#111624] border border-slate-800 space-y-4">
                <span className="text-xs font-mono text-slate-400 font-bold block uppercase pb-3 border-b border-slate-800">
                  Four Disciplines of Craftsmanship
                </span>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#161D2E] border border-slate-800">
                    <span className="block text-xs font-mono text-sky-400 font-bold">1. Edge AI & Vision</span>
                    <span className="block text-xs text-slate-300 mt-1">Zero-cloud local inference via MediaPipe Pose & YOLOv8</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161D2E] border border-slate-800">
                    <span className="block text-xs font-mono text-amber-400 font-bold">2. Security & Cryptography</span>
                    <span className="block text-xs text-slate-300 mt-1">AES-128 Fernet cipher, PBKDF2 salt, 95.8% test coverage</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161D2E] border border-slate-800">
                    <span className="block text-xs font-mono text-emerald-400 font-bold">3. Modern Full-Stack</span>
                    <span className="block text-xs text-slate-300 mt-1">Next.js 15 App Router, React 19 concurrent, TypeScript</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161D2E] border border-slate-800">
                    <span className="block text-xs font-mono text-purple-400 font-bold">4. Systems & Infrastructure</span>
                    <span className="block text-xs text-slate-300 mt-1">Go concurrency channels, FastAPI, Docker Compose, PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            SCENE 02 — THE JOURNEY
        ===================================================================== */}
        {odysseyScene === '02' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block">
                {t.odyssey?.scene02.narrative || 'Every builder has a starting point.'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-white tracking-tight">
                {t.odyssey?.scene02.subtitle || 'Evolutionary Trajectory (2023 - 2026)'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-sans">
                {t.odyssey?.scene02.desc}
              </p>
            </div>

            {/* Interactive Timeline Milestones */}
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
                        : 'bg-[#111624] border-slate-800 text-slate-400 hover:bg-[#161D2E] hover:text-slate-200'
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

            {/* Selected Milestone Inspection Card */}
            {evolutionMilestones[selectedMilestone] && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#111624] border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xl font-bold font-space text-white">
                      {evolutionMilestones[selectedMilestone].title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      {evolutionMilestones[selectedMilestone].phase}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                    {evolutionMilestones[selectedMilestone].metric}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
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

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('03')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>{t.odyssey?.scene02.nextCta || 'Explore The Engineering Mindset'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            SCENE 03 — THE MINDSET
        ===================================================================== */}
        {odysseyScene === '03' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block">
                {t.odyssey?.scene03.narrative || 'Curiosity becomes capability through exploration.'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-white tracking-tight">
                {t.odyssey?.scene03.subtitle || 'Engineering Mindset & 5 Disciplines'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-sans">
                {t.odyssey?.scene03.desc}
              </p>
            </div>

            {/* 5 Technical Disciplines Switcher */}
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
                        : 'bg-[#111624] border-slate-800 text-slate-400 hover:bg-[#161D2E] hover:text-slate-200'
                    }`}
                  >
                    <span className="block text-[11px] font-mono text-sky-400 line-clamp-1">
                      {disc.proficiency.split(':')[1]}
                    </span>
                    <span className="block text-xs font-bold font-space text-white mt-1 line-clamp-1">
                      {disc.title.split('&')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 4 Quadrants Display */}
            {engineeringMindset[activeMindsetTab] && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#111624] border border-slate-800 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-1">
                      {engineeringMindset[activeMindsetTab].proficiency}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-space text-white">
                      {engineeringMindset[activeMindsetTab].title}
                    </h3>
                  </div>
                </div>

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

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('04')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>{t.odyssey?.scene03.nextCta || 'Visit The Builder’s Lab'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            SCENE 04 — THE LAB
        ===================================================================== */}
        {odysseyScene === '04' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block">
                  {t.odyssey?.scene04.narrative || 'Ideas become real when they are built.'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-space text-white tracking-tight">
                  {t.odyssey?.scene04.subtitle || 'Laboratory of 20 Verified Systems'}
                </h2>
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
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#111624] border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <select
                  value={labCategory}
                  onChange={(e) => {
                    setLabCategory(e.target.value);
                    playSound('tab');
                  }}
                  className="px-3 py-2 rounded-xl bg-[#111624] border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
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
                  className="p-5 rounded-2xl bg-[#111624] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono text-sky-400 font-bold">
                        SYS-{(idx + 1).toString().padStart(2, '0')}: {proj.role}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#161D2E] text-slate-300 font-mono text-[10px]">
                        {proj.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-space text-white group-hover:text-sky-300 transition-colors">
                      {proj.title}
                    </h3>

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

                  {/* Actions */}
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

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('05')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>{t.odyssey?.scene04.nextCta || 'Explore Beyond The Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            SCENE 05 — BEYOND THE CODE
        ===================================================================== */}
        {odysseyScene === '05' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block">
                {t.odyssey?.scene05.narrative || 'Engineering is also about people.'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-white tracking-tight">
                {t.odyssey?.scene05.subtitle || 'Human Dimensions, Leadership & Communication'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-sans">
                {t.odyssey?.scene05.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-sky-400 font-bold block uppercase">
                  Inisiatif & Kepemimpinan Teknis
                </span>
                <h3 className="font-space font-bold text-base text-white">
                  Memandu Kolaborasi Pengembang
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Memandu arah teknis pada proyek mahasiswa, memecah arsitektur kompleks menjadi modul kerja terdistribusi, dan mengawal standar kualitas kode.'
                    : 'Guiding technical direction across collaborative student initiatives, decomposing complex architectures into manageable sprints, and enforcing code quality.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block uppercase">
                  Komunikasi & Dokumentasi Jernih
                </span>
                <h3 className="font-space font-bold text-base text-white">
                  Spesifikasi Teknis yang Terstruktur
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Menulis dokumentasi arsitektur, diagram aliran data, dan PRD padat konteks (seperti pada VibeDoc) yang menjembatani kebutuhan teknis dan non-teknis.'
                    : 'Authoring architectural specifications, data flow diagrams, and context-dense PRDs (demonstrated in VibeDoc) that bridge technical and non-technical stakeholders.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block uppercase">
                  Pemecahan Masalah di Bawah Batasan
                </span>
                <h3 className="font-space font-bold text-base text-white">
                  Rekayasa untuk Perangkat Terbatas
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Mendesain PostureLens agar tetap berjalan 30+ FPS pada webcam standar tanpa GPU eksternal dan tanpa pengiriman data ke server.'
                    : 'Designing PostureLens to sustain 30+ FPS on consumer hardware without external dedicated GPUs and with zero cloud server egress.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-purple-400 font-bold block uppercase">
                  Kultur Belajar & Ketekunan
                </span>
                <h3 className="font-space font-bold text-base text-white">
                  Evolusi Berkelanjutan
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Secara mandiri mempelajari WebGPU, model inferensi lokal, dan pengujian terotentikasi untuk terus memperdalam kapabilitas rekayasa.'
                    : 'Autonomously mastering WebGPU, local neural inference models, and authenticated testing pipelines to expand software engineering frontiers.'}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('06')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>{t.odyssey?.scene05.nextCta || 'Advance to The Next Frontier'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            SCENE 06 — THE NEXT FRONTIER
        ===================================================================== */}
        {odysseyScene === '06' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider block">
                {t.odyssey?.scene06.narrative || 'The journey is still unfolding.'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-white tracking-tight">
                {t.odyssey?.scene06.subtitle || 'Future Research Horizons'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-sans">
                {t.odyssey?.scene06.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#111624] border border-rose-500/30 space-y-3">
                <span className="text-xs font-mono text-rose-400 font-bold block">HORIZON 01</span>
                <h3 className="text-base font-bold font-space text-white">Local Neural Enclaves</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {lang === 'id'
                    ? 'Mengeksekusi model visi dan inferensi bahasa kecil langsung di browser via WebGPU tanpa streaming data atau biaya API per-token.'
                    : 'Executing vision and small language models directly in client browsers via WebGPU with zero server streaming or API token billing.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111624] border border-blue-500/30 space-y-3">
                <span className="text-xs font-mono text-sky-400 font-bold block">HORIZON 02</span>
                <h3 className="text-base font-bold font-space text-white">Zero-Trust Local Storage</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {lang === 'id'
                    ? 'Enkripsi memori transien, logging terverifikasi tamper-evident, dan audit integritas kontinu yang memperluas prinsip VaultSentinel.'
                    : 'Transient memory encryption, tamper-evident audit logs, and continuous integrity verification extending VaultSentinel core principles.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111624] border border-emerald-500/30 space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold block">HORIZON 03</span>
                <h3 className="text-base font-bold font-space text-white">Resilient Edge Topologies</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {lang === 'id'
                    ? 'Sinkronisasi data offline-first dengan CRDTs untuk aplikasi kolaboratif berkinerja tinggi tanpa server terpusat.'
                    : 'Offline-first peer synchronizations powered by CRDTs, ensuring zero data loss across volatile network conditions.'}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('07')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>{t.odyssey?.scene06.nextCta || 'Open The Connection'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================================
            SCENE 07 — THE CONNECTION
        ===================================================================== */}
        {odysseyScene === '07' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider block">
                {t.odyssey?.scene07.narrative || 'Perhaps our next chapter starts here.'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-space text-white tracking-tight">
                {t.odyssey?.scene07.heading || 'Every great build starts with a conversation.'}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                {t.odyssey?.scene07.subheading ||
                  'Whether you are a technical recruiter, engineering leader, or fellow builder with a challenge worth solving, my inbox is always open.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="p-5 rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
                  <span className="text-xs font-mono text-slate-400 block uppercase">PRIMARY DIRECT INBOX:</span>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#161D2E] border border-slate-700">
                    <span className="font-mono text-xs sm:text-sm text-sky-300 truncate">
                      fatirgibrann@gmail.com
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs flex items-center gap-1.5 transition-all shrink-0"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? (t.odyssey?.scene07.copied || 'Copied!') : (t.odyssey?.scene07.copyEmail || 'Copy Email')}</span>
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

                <div className="pt-4 flex flex-wrap gap-3 border-t border-slate-800/80">
                  <button
                    onClick={() => handleSceneChange('00')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#161D2E] hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.odyssey?.scene07.btnRestart || 'Restart The Journey'}</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleExperienceMode();
                      playSound('click');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-xs font-mono text-sky-300 transition-all"
                  >
                    <span>{t.odyssey?.scene07.btnDirect || 'Open Classic Portfolio'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dossier Card */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-[#111624] border border-cyan-500/30 font-mono text-xs space-y-2">
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
                  Production Repositories: <span className="text-white">20 Verified Systems</span>
                </p>
                <p className="text-slate-400">
                  Verification: <span className="text-emerald-400 font-bold">100% AUTHENTIC CODE</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Scene Footer Controls */}
      <footer className="relative z-30 pb-4 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSceneIndex === 0}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all ${
                currentSceneIndex === 0
                  ? 'opacity-40 border-slate-800 cursor-not-allowed'
                  : 'bg-[#111624] border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="hidden sm:inline">Scene {odysseyScene} of 07</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-slate-500">
              Navigation: Click buttons or press [←] [→]
            </span>
          </div>

          <div>
            <button
              onClick={handleNext}
              disabled={currentSceneIndex === SCENES_CONFIG.length - 1}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all ${
                currentSceneIndex === SCENES_CONFIG.length - 1
                  ? 'opacity-40 border-slate-800 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-600/20'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
