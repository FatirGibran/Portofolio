import React, { useState, useMemo, useCallback, useEffect, useRef, memo } from 'react';
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
  RotateCcw,
  Sparkles,
  ShieldCheck,
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


// =========================================================================
// OBSIDIAN NOIR MASTER DESIGN SYSTEM SPECIFICATION
// Base: Obsidian (#08090D), Carbon (#11131B), Midnight Navy (#151D35)
// Primary: Electric Indigo (#5146E5), Ultraviolet (#963CFF), Aurora Cyan (#43D9E8)
// Premium Accents: Liquid Silver (#C9D0DF), Champagne (#D8B77A), Soft White (#F1F0F5)
// =========================================================================

const OBSIDIAN_NOIR_THEMES = {
  '00': {
    name: 'The Arrival',
    subtitle: 'The Origin of Systems',
    bgGradient: 'from-[#08090D] via-[#11131B] to-[#08090D]',
    spotlightGlow: 'rgba(67, 217, 232, 0.22)',
    auroraPrimary: '#43D9E8',
    auroraSecondary: '#5146E5',
    accentColor: '#43D9E8',
    metallicAccent: '#C9D0DF',
    badgeText: 'OBSIDIAN // 00_ORIGIN',
    tagClass: 'text-[#43D9E8] border-[#43D9E8]/30 bg-[#43D9E8]/10',
    glowClass: 'aurora-glow',
    particleTint: '#43D9E8',
    chapterNum: '00',
  },
  '01': {
    name: 'The Person',
    subtitle: 'Craft & Individual Identity',
    bgGradient: 'from-[#08090D] via-[#151D35]/60 to-[#08090D]',
    spotlightGlow: 'rgba(216, 183, 122, 0.20)',
    auroraPrimary: '#D8B77A',
    auroraSecondary: '#5146E5',
    accentColor: '#D8B77A',
    metallicAccent: '#F1F0F5',
    badgeText: 'DOSSIER // 01_IDENTITY',
    tagClass: 'text-[#D8B77A] border-[#D8B77A]/30 bg-[#D8B77A]/10',
    glowClass: 'champagne-glow',
    particleTint: '#D8B77A',
    chapterNum: '01',
  },
  '02': {
    name: 'The Journey',
    subtitle: 'Evolutionary Trajectory 2023-2026',
    bgGradient: 'from-[#08090D] via-[#151D35] to-[#08090D]',
    spotlightGlow: 'rgba(67, 217, 232, 0.24)',
    auroraPrimary: '#43D9E8',
    auroraSecondary: '#D8B77A',
    accentColor: '#43D9E8',
    metallicAccent: '#C9D0DF',
    badgeText: 'EXPEDITION // 02_TRAJECTORY',
    tagClass: 'text-[#43D9E8] border-[#43D9E8]/30 bg-[#43D9E8]/10',
    glowClass: 'aurora-glow',
    particleTint: '#43D9E8',
    chapterNum: '02',
  },
  '03': {
    name: 'The Mindset',
    subtitle: 'Engineering Cognition Matrix',
    bgGradient: 'from-[#08090D] via-[#18112C] to-[#08090D]',
    spotlightGlow: 'rgba(150, 60, 255, 0.26)',
    auroraPrimary: '#963CFF',
    auroraSecondary: '#5146E5',
    accentColor: '#963CFF',
    metallicAccent: '#C9D0DF',
    badgeText: 'MATRIX // 03_COGNITION',
    tagClass: 'text-[#963CFF] border-[#963CFF]/30 bg-[#963CFF]/10',
    glowClass: 'ultraviolet-glow',
    particleTint: '#963CFF',
    chapterNum: '03',
  },
  '04': {
    name: 'The Lab',
    subtitle: '20 Production Systems Showcase',
    bgGradient: 'from-[#08090D] via-[#0E1B24] to-[#08090D]',
    spotlightGlow: 'rgba(67, 217, 232, 0.26)',
    auroraPrimary: '#43D9E8',
    auroraSecondary: '#963CFF',
    accentColor: '#43D9E8',
    metallicAccent: '#C9D0DF',
    badgeText: 'FORGE // 04_SYSTEMS',
    tagClass: 'text-[#43D9E8] border-[#43D9E8]/30 bg-[#43D9E8]/10',
    glowClass: 'aurora-glow',
    particleTint: '#43D9E8',
    chapterNum: '04',
  },
  '05': {
    name: 'Beyond Code',
    subtitle: 'Human Leadership & Resilience',
    bgGradient: 'from-[#08090D] via-[#1C1610] to-[#08090D]',
    spotlightGlow: 'rgba(216, 183, 122, 0.24)',
    auroraPrimary: '#D8B77A',
    auroraSecondary: '#5146E5',
    accentColor: '#D8B77A',
    metallicAccent: '#F1F0F5',
    badgeText: 'ETHOS // 05_HUMAN',
    tagClass: 'text-[#D8B77A] border-[#D8B77A]/30 bg-[#D8B77A]/10',
    glowClass: 'champagne-glow',
    particleTint: '#D8B77A',
    chapterNum: '05',
  },
  '06': {
    name: 'Next Frontier',
    subtitle: 'Future Research Horizons',
    bgGradient: 'from-[#08090D] via-[#1A0E2E] to-[#08090D]',
    spotlightGlow: 'rgba(150, 60, 255, 0.26)',
    auroraPrimary: '#963CFF',
    auroraSecondary: '#43D9E8',
    accentColor: '#963CFF',
    metallicAccent: '#C9D0DF',
    badgeText: 'HORIZON // 06_RESEARCH',
    tagClass: 'text-[#963CFF] border-[#963CFF]/30 bg-[#963CFF]/10',
    glowClass: 'ultraviolet-glow',
    particleTint: '#963CFF',
    chapterNum: '06',
  },
  '07': {
    name: 'The Connection',
    subtitle: 'Direct Engineering Nexus',
    bgGradient: 'from-[#08090D] via-[#151D35] to-[#08090D]',
    spotlightGlow: 'rgba(81, 70, 229, 0.30)',
    auroraPrimary: '#5146E5',
    auroraSecondary: '#43D9E8',
    accentColor: '#5146E5',
    metallicAccent: '#F1F0F5',
    badgeText: 'CONVERGENCE // 07_SIGNAL',
    tagClass: 'text-[#43D9E8] border-[#43D9E8]/30 bg-[#43D9E8]/10',
    glowClass: 'indigo-glow',
    particleTint: '#43D9E8',
    chapterNum: '07',
  },
};

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
    t,
    playSound,
    odysseyScene,
    goToScene,
    setSelectedProjectForModal,
    toggleExperienceMode,
  } = usePortfolio();

  // Scene transition animation state & direction
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState('next'); // 'next' | 'prev'

  // Cursor-responsive lighting state
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Active Milestone in Scene 02 (The Journey)
  const [selectedMilestone, setSelectedMilestone] = useState('2025');

  // Active Mindset Tab in Scene 03 (The Mindset)
  const [activeMindsetTab, setActiveMindsetTab] = useState('se');

  // Project Lab Filter & Search in Scene 04 (The Lab)
  const [labCategory, setLabCategory] = useState('all');
  const [labSearch, setLabSearch] = useState('');

  // Email Copy State in Scene 07 (The Connection)
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Aurora Mesh Canvas Ref
  const auroraCanvasRef = useRef(null);

  const currentSceneIndex = SCENES_CONFIG.findIndex((s) => s.id === odysseyScene);
  const activeSceneConfig = SCENES_CONFIG[currentSceneIndex >= 0 ? currentSceneIndex : 0];
  const activeTheme = OBSIDIAN_NOIR_THEMES[odysseyScene] || OBSIDIAN_NOIR_THEMES['00'];

  // Smooth mouse follower throttled with requestAnimationFrame
  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setMousePos({ x, y });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Aurora Mesh Background Generator with visibility check
  useEffect(() => {
    const canvas = auroraCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let step = 0;

    const render = () => {
      // Pause drawing when tab is hidden to save GPU cycles
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      step += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Aurora Wave 1: Primary Theme Aura
      const grad1 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(step) * 120,
        height * 0.2 + Math.cos(step * 0.8) * 80,
        50,
        width * 0.3 + Math.sin(step) * 120,
        height * 0.2 + Math.cos(step * 0.8) * 80,
        width * 0.55
      );
      grad1.addColorStop(0, `${activeTheme.auroraPrimary}25`);
      grad1.addColorStop(0.5, `${activeTheme.auroraSecondary}15`);
      grad1.addColorStop(1, 'transparent');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Aurora Wave 2: Secondary Theme Aura
      const grad2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(step * 0.7) * 140,
        height * 0.65 + Math.sin(step * 0.9) * 90,
        80,
        width * 0.75 + Math.cos(step * 0.7) * 140,
        height * 0.65 + Math.sin(step * 0.9) * 90,
        width * 0.5
      );
      grad2.addColorStop(0, `${activeTheme.auroraSecondary}20`);
      grad2.addColorStop(0.6, `${activeTheme.auroraPrimary}10`);
      grad2.addColorStop(1, 'transparent');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activeTheme.auroraPrimary, activeTheme.auroraSecondary]);

  const handleSceneChange = useCallback(
    (targetId, direction = 'next') => {
      if (targetId === odysseyScene || isTransitioning) return;
      setIsTransitioning(true);
      setTransitionDir(direction);
      playSound('tab');

      setTimeout(() => {
        goToScene(targetId);
        setIsTransitioning(false);
      }, 260);
    },
    [odysseyScene, isTransitioning, playSound, goToScene]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIdx = (currentSceneIndex + 1) % SCENES_CONFIG.length;
    handleSceneChange(SCENES_CONFIG[nextIdx].id, 'next');
    if (nextIdx === SCENES_CONFIG.length - 1 && triggerGlobalEffect) {
      triggerGlobalEffect('confetti');
    }
  }, [currentSceneIndex, isTransitioning, handleSceneChange, triggerGlobalEffect]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    const prevIdx = (currentSceneIndex - 1 + SCENES_CONFIG.length) % SCENES_CONFIG.length;
    handleSceneChange(SCENES_CONFIG[prevIdx].id, 'prev');
  }, [currentSceneIndex, isTransitioning, handleSceneChange]);

  // Keyboard Navigation: Arrows & Number Keys [0-7]
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        handlePrev();
      } else if (['0', '1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        const target = `0${e.key}`;
        handleSceneChange(target, target > odysseyScene ? 'next' : 'prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleSceneChange, odysseyScene]);

  const handleCopyEmail = () => {
    const email = 'fatirgibrann@gmail.com';
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    playSound('success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Evolution Milestones
  const evolutionMilestones = {
    '2023': {
      year: '2023',
      phase: 'Semester 1 - 2 • Telkom University Purwokerto',
      epoch: 'ALGORITHMIC FOUNDATIONS',
      title: lang === 'id' ? 'Fondasi Algoritma & Logika Komputasi' : 'Algorithmic Foundations & Systems Logic',
      desc:
        lang === 'id'
          ? 'Memulai perjalanan di S1 Teknik Informatika. Menguasai pemrograman imperatif C/C++, struktur data linier/non-linier, logika boolean, dan analisis kompleksitas Big-O.'
          : 'Began Informatics Engineering journey. Mastered C/C++ imperative programming, discrete mathematics, data structures, and Big-O computational complexity.',
      tags: ['C/C++', 'Python', 'Algorithms', 'Data Structures', 'Discrete Math'],
      metric: 'GPA: 3.8+ / Top Tier',
      highlight: 'Rekayasa dasar imperatif & optimasi efisiensi memori.',
    },
    '2024': {
      year: '2024',
      phase: 'Semester 3 - 4 • Telkom University Purwokerto',
      epoch: 'EDGE AI & OFF-GRID SECURITY',
      title: lang === 'id' ? 'Eksplorasi Edge AI & Kriptografi Offline' : 'Edge AI Prototyping & Offline Cryptography',
      desc:
        lang === 'id'
          ? 'Mengembangkan riset On-Device AI lokal tanpa ketergantungan cloud: PostureLens (MediaPipe Pose WASM) dan el_gestur_v2 (YOLOv8 + DeepSORT). Merancang VaultSentinel dengan enkripsi AES-128 Fernet dan 95.8% automated test coverage.'
          : 'Pioneered on-device AI research with zero cloud telemetry: PostureLens (MediaPipe Pose WASM) and el_gestur_v2 (YOLOv8 + DeepSORT). Engineered VaultSentinel featuring AES-128 Fernet encryption with 95.8% automated test coverage.',
      tags: ['MediaPipe WASM', 'YOLOv8', 'AES-128 Fernet', 'PBKDF2', 'Next.js', 'FastAPI'],
      metric: '95.8% Test Coverage',
      highlight: 'Privasi data 100% lokal & pengujian matematis terverifikasi.',
    },
    '2025': {
      year: '2025',
      phase: 'Semester 5 (Aktif) • Telkom University Purwokerto',
      epoch: 'PRODUCTION ARCHITECTURES',
      title: lang === 'id' ? 'Arsitektur Produksi & 20 Sistem Rekayasa' : 'Production Systems & 20 Verified Architectures',
      desc:
        lang === 'id'
          ? 'Mengonsolidasikan portofolio 20 sistem perangkat lunak terverifikasi: arsitektur modern Next.js 15, React 19, Go microservices, database multi-tenant PostgreSQL, dan dockerized pipelines.'
          : 'Consolidated a portfolio of 20 verified software engineering systems: Next.js 15 App Router, React 19, Go microservices, multi-tenant PostgreSQL schemas, and dockerized production pipelines.',
      tags: ['Next.js 15', 'Go / Golang', 'TypeScript', 'Docker', 'PostgreSQL', '20 Systems'],
      metric: '20 Verified Repositories',
      highlight: 'Sistem komersial nyata, payment gateway Midtrans & zero-bloat.',
    },
    '2026': {
      year: '2026',
      phase: 'Horizon Riset Berkelanjutan',
      epoch: 'NEURAL HORIZONS',
      title: lang === 'id' ? 'Riset Komputasi Masa Depan & Local Enclaves' : 'Future Computing & Local Neural Enclaves',
      desc:
        lang === 'id'
          ? 'Mengeksplorasi eksekusi model neural di browser via WebGPU, Zero-Trust Memory Buffers, dan arsitektur data terdistribusi tahan latensi (CRDT offline mesh).'
          : 'Exploring on-device neural execution via WebGPU, zero-trust transient memory encryption, and latency-resilient peer sync topologies using CRDTs.',
      tags: ['WebGPU', 'Local Enclaves', 'Zero-Trust', 'CRDTs', 'Low Latency'],
      metric: 'Sub-50ms On-Device Target',
      highlight: 'Desentralisasi komputasi penuh tanpa ketergantungan API terpusat.',
    },
  };

  // Engineering Mindset 4 Quadrants
  const engineeringMindset = {
    se: {
      id: 'se',
      title: lang === 'id' ? 'Software Engineering & Arsitektur' : 'Software Engineering & Architecture',
      proficiency: lang === 'id' ? 'Tingkat: Berpengalaman' : 'Proficiency: Experienced',
      rationale:
        lang === 'id'
          ? 'Struktur kode harus merefleksikan domain problem, bukan ketergantungan library pihak ketiga yang mudah kadaluwarsa.'
          : 'Code structure must reflect the domain problem directly, decoupled from third-party libraries prone to rapid obsolescence.',
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
      rationale:
        lang === 'id'
          ? 'Antarmuka pengguna bukan sekadar tampilan visual, melainkan mesin state terprediksi yang menjamin waktu respon sub-100ms.'
          : 'User interfaces are predictable state machines ensuring sub-100ms perceived latency and zero layout shifting.',
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
      title: lang === 'id' ? 'Edge AI & Computer Vision' : 'Edge AI & Computer Vision',
      proficiency: lang === 'id' ? 'Tingkat: Praktisi Aktif' : 'Proficiency: Practiced',
      rationale:
        lang === 'id'
          ? 'Kecerdasan komputasi harus beroperasi di tangan pengguna (on-device), mempertahankan kedaulatan privasi tanpa rekaman cloud.'
          : 'Computational intelligence belongs on user devices, ensuring inviolable privacy without third-party cloud streaming.',
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
          : 'WebGPU acceleration for client-side model execution and deployment of quantized Small Language Models (SLMs).',
    },
    cybersec: {
      id: 'cybersec',
      title: lang === 'id' ? 'Cybersecurity & Kriptografi' : 'Cybersecurity & Cryptography',
      proficiency: lang === 'id' ? 'Tingkat: Praktisi Terfokus' : 'Proficiency: Practiced',
      rationale:
        lang === 'id'
          ? 'Keamanan bukan fitur pelengkap di akhir proyek, melainkan aksioma matematis yang dibuktikan melalui pengujian otomatis.'
          : 'Security is not an afterthought bolt-on, but a mathematical axiom verified through rigorous automated test suites.',
      understands:
        lang === 'id'
          ? 'Prinsip kriptografi simetris AES-128/256, key derivation PBKDF2 dengan salt kriptografis acak, sanitasi input, dan prinsip zero-trust.'
          : 'Symmetric encryption (AES-128/256), cryptographic salt key derivation via PBKDF2, strict input sanitization, and zero-trust primitives.',
      workedOn:
        lang === 'id'
          ? 'VaultSentinel CLI: utilitas cadangan data terenkripsi lokal dengan cipher Fernet, pemulihan hashing aman, dan 95.8% test coverage.'
          : 'VaultSentinel CLI: encrypted local backup utility with Fernet ciphers, secure hash verification, and 95.8% automated test coverage.',
      explored:
        lang === 'id'
          ? 'Manajemen kunci enkripsi lokal tanpa hardcoded secret, proteksi terhadap serangan brute force melalui iterasi hashing yang dikalibrasi.'
          : 'Transient local key lifecycle management without hardcoded secrets, and brute-force mitigation through calibrated KDF hashing iterations.',
      improving:
        lang === 'id'
          ? 'Kriptografi pasca-kuantum (PQC) dasar, otentikasi zero-knowledge proofs (ZKP), dan audit keamanan terotomatisasi pada CI/CD.'
          : 'Foundational post-quantum cryptography (PQC), zero-knowledge proof primitives, and automated CI/CD static security scanning.',
    },
    infra: {
      id: 'infra',
      title: lang === 'id' ? 'Sistem Backend & DevOps' : 'Backend Systems & DevOps',
      proficiency: lang === 'id' ? 'Tingkat: Praktisi Aktif' : 'Proficiency: Practiced',
      rationale:
        lang === 'id'
          ? 'Kehandalan sistem ditentukan oleh bagaimana layanan menangani kegagalan jaringan dan isolasi proses di lingkungan produksi.'
          : 'System resilience is measured by how gracefully services handle partition failures and runtime container isolation.',
      understands:
        lang === 'id'
          ? 'Containerization Docker, orkestrasi Docker Compose, reverse proxy Nginx, model konkurensi Go goroutine & channel, dan migrasi SQL.'
          : 'Docker containerization, Docker Compose topologies, Nginx reverse proxies, Go goroutine/channel concurrency, and SQL schema migrations.',
      workedOn:
        lang === 'id'
          ? 'Penyusunan pipeline container multi-stage untuk efisiensi image produksi, API RESTful Go / FastAPI, dan deployment Firebase.'
          : 'Multi-stage Docker build pipelines minimizing production attack surfaces, Go / FastAPI microservices, and Firebase cloud deployments.',
      explored:
        lang === 'id'
          ? 'Optimalisasi koneksi pool database PostgreSQL, penanganan graceful shutdown pada server, dan idempotensi pemrosesan webhook.'
          : 'PostgreSQL connection pool sizing, graceful daemon shutdown signals, and strict webhook replay idempotency verification.',
      improving:
        lang === 'id'
          ? 'Monitoring telemetri dengan Prometheus/Grafana, implementasi distributed tracing OpenTelemetry, dan pipeline deployment Blue/Green.'
          : 'Telemetry aggregation via Prometheus/Grafana, OpenTelemetry distributed tracing, and automated zero-downtime Blue/Green rollouts.',
    },
  };

  // Filtered project list for Scene 04 (The Lab)
  const filteredLabProjects = useMemo(() => {
    return ALL_PROJECTS.filter((proj) => {
      const matchCat = labCategory === 'all' || proj.category === labCategory;
      const matchSearch =
        labSearch.trim() === '' ||
        proj.title.toLowerCase().includes(labSearch.toLowerCase()) ||
        proj.tech.some((t) => t.toLowerCase().includes(labSearch.toLowerCase())) ||
        proj.role.toLowerCase().includes(labSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [labCategory, labSearch]);

  const spotlightProject = useMemo(() => {
    return ALL_PROJECTS.find((p) => p.id === 'posture_lens') || ALL_PROJECTS[0];
  }, []);

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-b ${activeTheme.bgGradient} text-[#F1F0F5] font-sans overflow-hidden transition-colors duration-700 select-none`}
    >
      {/* 1. Dynamic Cursor-Reactive Spotlight Field */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 650px at ${mousePos.x}% ${mousePos.y}%, ${activeTheme.spotlightGlow}, transparent 75%)`,
        }}
      />

      {/* 2. Aurora Mesh Canvas */}
      <canvas
        ref={auroraCanvasRef}
        className="pointer-events-none fixed inset-0 w-full h-full z-0 opacity-80"
      />

      {/* 3. Fine Technical Grain Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 scanline-grid opacity-30 z-0" />

      {/* =====================================================================
          MAIN SCENE CONTAINER (CINEMATIC NOIR TRANSITIONS)
      ===================================================================== */}
      <main
        className={`relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-24 sm:pt-28 pb-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isTransitioning
            ? transitionDir === 'next'
              ? 'opacity-0 -translate-x-8 scale-[0.96] blur-md'
              : 'opacity-0 translate-x-8 scale-[0.96] blur-md'
            : 'opacity-100 translate-x-0 scale-100 blur-0'
        }`}
      >
        {/* Dynamic Chapter Identity Breadcrumb Strip */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#11131B] border border-[#C9D0DF]/15 shadow-sm">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeTheme.accentColor }}
            />
            <span className="font-mono text-[11px] font-bold text-[#F1F0F5] tracking-wider">
              {activeTheme.badgeText} • {lang === 'id' ? activeSceneConfig.titleId : activeSceneConfig.titleEn}
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            CHAPTER {currentSceneIndex + 1} OF {SCENES_CONFIG.length}
          </span>
        </div>

        {/* =====================================================================
            SCENE 00 — THE ARRIVAL (OBSIDIAN NOIR OPENING)
        ===================================================================== */}
        {odysseyScene === '00' && (
          <section className="min-h-[72vh] flex flex-col justify-center animate-fade-in relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Focal Monolithic Portrait with Liquid Metallic Rim */}
              <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                <div className="relative group">
                  {/* Multi-layer Aurora Bloom Halo */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#5146E5]/40 via-[#43D9E8]/30 to-[#963CFF]/40 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Liquid Chrome Chamfered Frame */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl p-3 bg-gradient-to-b from-[#151D35] to-[#08090D] border border-[#C9D0DF]/30 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                    <picture>
                      <source srcSet="Image/fotomuka.webp" type="image/webp" />
                      <img
                        src="Image/fotomuka.jpg"
                        alt="Fatir Gibran Portrait"
                        width="384"
                        height="384"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover object-top rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80';
                        }}
                      />
                    </picture>

                    {/* Telemetry Precision Pill */}
                    <div className="absolute -bottom-3 -right-3 px-3.5 py-1.5 rounded-xl bg-[#08090D]/95 backdrop-blur-md border border-[#43D9E8]/50 text-[11px] font-mono text-[#43D9E8] font-bold shadow-2xl flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#43D9E8] animate-pulse" />
                      <span>CS • TELKOM PURWOKERTO</span>
                    </div>

                    {/* Geolocation Tag */}
                    <div className="absolute -top-3 -left-3 px-3 py-1 rounded-lg bg-[#08090D]/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#C9D0DF] font-medium">
                      LAT 7.4243° S // LON 109.2391° E
                    </div>
                  </div>
                </div>
              </div>

              {/* Monumental Liquid Silver & Aurora Typography */}
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#43D9E8]/10 border border-[#43D9E8]/30 text-[#43D9E8] text-xs font-mono font-medium tracking-wider uppercase shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#43D9E8] animate-pulse" />
                  <span>{t.odyssey?.scene00.hook || 'Every system begins with a question.'}</span>
                </div>

                {/* Monumental Headline */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-space tracking-tight leading-[0.94]">
                  <span className="liquid-chrome-text">FATIR</span> <br />
                  <span className="aurora-text">GIBRAN</span>
                </h1>

                <p className="text-lg sm:text-2xl font-space font-medium text-[#C9D0DF]">
                  {t.odyssey?.scene00.tagline ||
                    'Software Engineer • On-Device Edge AI • Cryptography'}
                </p>

                <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
                  {t.odyssey?.scene00.lead ||
                    'An interactive narrative digital experience exploring how complex abstract ideas evolve into production-ready software systems.'}
                </p>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => handleSceneChange('01', 'next')}
                    className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5146E5] via-[#43D9E8] to-[#963CFF] hover:opacity-95 text-[#08090D] font-space font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-[#5146E5]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>{t.odyssey?.scene00.btnBegin || 'BEGIN THE JOURNEY'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      toggleExperienceMode();
                      playSound('click');
                    }}
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[#C9D0DF] hover:text-white border border-[#C9D0DF]/20 font-space text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <span>{t.odyssey?.scene00.btnExplore || 'EXPLORE DIRECTLY'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[#F1F0F5] font-bold">
                      [← / →]
                    </kbd>
                    <span>Navigate Chapters</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[#F1F0F5] font-bold">
                      [0 - 7]
                    </kbd>
                    <span>Direct Jump</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SCENE 01 — THE PERSON BEHIND THE CODE (DOSSIER DE LUXE)
        ===================================================================== */}
        {odysseyScene === '01' && (
          <section className="space-y-8 animate-fade-in relative">
            <div className="max-w-4xl space-y-3">
              <span className="text-xs font-mono text-[#D8B77A] font-bold uppercase tracking-wider block">
                {t.odyssey?.scene01.narrative || 'Before the code, there was curiosity.'}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-space text-[#F1F0F5] tracking-tight">
                {lang === 'id' ? 'Sosok di Balik Kode' : 'The Person Behind the Code'}
              </h2>
            </div>

            {/* Asymmetric Editorial Magazine Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Personal Narrative & Philosophy */}
              <div className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
                <p className="first-letter:text-5xl first-letter:font-black first-letter:font-space first-letter:text-[#D8B77A] first-letter:mr-3 first-letter:float-left leading-relaxed">
                  {t.odyssey?.scene01.p1}
                </p>
                <p className="leading-relaxed">{t.odyssey?.scene01.p2}</p>

                {/* Personal Manifesto Quote Callout with Champagne Rim */}
                <div className="p-5 rounded-2xl frosted-noir border-l-4 border-[#D8B77A] space-y-2">
                  <p className="font-space italic text-sm sm:text-base text-[#F1F0F5]">
                    "Rekayasa perangkat lunak bukan tentang mengetik sintaks; melainkan tentang
                    mengeliminasi kompleksitas yang tidak perlu dan menjamin kedaulatan data
                    pengguna."
                  </p>
                  <span className="block text-xs font-mono text-[#D8B77A] font-bold">
                    — Fatir Gibran, Informatics Engineering
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSceneChange('02', 'next')}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5146E5] to-[#43D9E8] hover:opacity-90 text-[#08090D] font-space font-black text-xs uppercase tracking-wider shadow-lg shadow-[#5146E5]/30 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{t.odyssey?.scene01.nextCta || 'Continue to The Journey'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Architectural Dossier of 4 Disciplines */}
              <div className="lg:col-span-5 p-6 rounded-3xl frosted-noir shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-[#C9D0DF]/10 pb-3">
                  <span className="text-xs font-mono text-[#C9D0DF] font-bold uppercase tracking-wider">
                    Four Disciplines of Craftsmanship
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#D8B77A]/15 text-[#D8B77A] font-mono text-[10px] font-bold">
                    DOSSIER PILLARS
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-[#08090D]/60 border border-[#43D9E8]/30 space-y-1 transition-all hover:border-[#43D9E8]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#43D9E8] font-bold">
                        01 // EDGE AI & VISION
                      </span>
                      <span className="text-[10px] font-mono text-[#C9D0DF]">30+ FPS LOCAL</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">
                      Zero-cloud local inference via MediaPipe 33-point Pose WASM & YOLOv8 + DeepSORT.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#08090D]/60 border border-[#D8B77A]/30 space-y-1 transition-all hover:border-[#D8B77A]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#D8B77A] font-bold">
                        02 // SECURITY & CRYPTOGRAPHY
                      </span>
                      <span className="text-[10px] font-mono text-[#43D9E8] font-bold">
                        95.8% PYTEST
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">
                      AES-128 Fernet cipher, PBKDF2 random salt derivation, and zero-trust local vault.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#08090D]/60 border border-[#5146E5]/40 space-y-1 transition-all hover:border-[#5146E5]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#5146E5] font-bold">
                        03 // MODERN FULL-STACK
                      </span>
                      <span className="text-[10px] font-mono text-[#C9D0DF]">REACT 19 / NEXT 15</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">
                      App Router, Server Components, TypeScript strict, and mid-tier edge caching.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#08090D]/60 border border-[#963CFF]/40 space-y-1 transition-all hover:border-[#963CFF]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#963CFF] font-bold">
                        04 // SYSTEMS & INFRASTRUCTURE
                      </span>
                      <span className="text-[10px] font-mono text-[#C9D0DF]">GO / DOCKER</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">
                      High-concurrency Go channels, FastAPI microservices, and containerized schemas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SCENE 02 — THE JOURNEY (AURORA EXPEDITION TIMELINE)
        ===================================================================== */}
        {odysseyScene === '02' && (
          <section className="space-y-8 animate-fade-in relative">
            <div className="max-w-4xl space-y-2">
              <span className="text-xs font-mono text-[#43D9E8] font-bold uppercase tracking-wider block">
                {t.odyssey?.scene02.narrative || 'Every builder has a starting point.'}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-space text-[#F1F0F5] tracking-tight">
                {t.odyssey?.scene02.subtitle || 'Evolutionary Trajectory (2023 - 2026)'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-sans">
                {t.odyssey?.scene02.desc}
              </p>
            </div>

            {/* Illuminated Expedition Timeline Nodes */}
            <div className="relative py-4">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#43D9E8]/30 via-[#5146E5]/40 to-[#D8B77A]/30 -translate-y-1/2 hidden sm:block" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                {['2023', '2024', '2025', '2026'].map((year) => {
                  const isSelected = selectedMilestone === year;
                  const item = evolutionMilestones[year];
                  return (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedMilestone(year);
                        playSound('tab');
                      }}
                      className={`p-5 rounded-3xl text-left border transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#151D35] border-[#43D9E8] text-[#F1F0F5] shadow-xl shadow-[#43D9E8]/20 scale-105'
                          : 'frosted-noir text-slate-400 hover:text-white hover:border-[#C9D0DF]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl font-black font-space text-white">{year}</span>
                        <span
                          className={`w-3 h-3 rounded-full transition-transform ${
                            isSelected ? 'bg-[#43D9E8] animate-ping' : 'bg-white/20'
                          }`}
                        />
                      </div>
                      <span className="block text-[11px] font-mono text-[#43D9E8] font-bold uppercase tracking-wider">
                        {item.epoch}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Milestone Inspection Stage */}
            {evolutionMilestones[selectedMilestone] && (
              <div className="p-6 sm:p-8 rounded-3xl frosted-noir-elevated space-y-6 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C9D0DF]/10 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#D8B77A] uppercase tracking-wider block mb-1">
                      {evolutionMilestones[selectedMilestone].phase}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-space text-[#F1F0F5]">
                      {evolutionMilestones[selectedMilestone].title}
                    </h3>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-[#43D9E8]/15 border border-[#43D9E8]/30 text-[#43D9E8] font-mono text-xs font-bold shadow-sm">
                    {evolutionMilestones[selectedMilestone].metric}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed">
                  {evolutionMilestones[selectedMilestone].desc}
                </p>

                <div className="p-4 rounded-2xl bg-[#08090D]/70 border border-[#C9D0DF]/15 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#D8B77A] flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300 font-mono">
                    {evolutionMilestones[selectedMilestone].highlight}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {evolutionMilestones[selectedMilestone].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-xl bg-white/5 text-slate-300 text-xs font-mono border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('03', 'next')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5146E5] to-[#43D9E8] hover:opacity-90 text-[#08090D] font-space font-black text-xs uppercase tracking-wider shadow-lg shadow-[#5146E5]/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.odyssey?.scene02.nextCta || 'Explore The Engineering Mindset'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* =====================================================================
            SCENE 03 — THE MINDSET (ULTRAVIOLET TELEMETRY MATRIX)
        ===================================================================== */}
        {odysseyScene === '03' && (
          <section className="space-y-8 animate-fade-in relative">
            <div className="max-w-4xl space-y-2">
              <span className="text-xs font-mono text-[#963CFF] font-bold uppercase tracking-wider block">
                {t.odyssey?.scene03.narrative || 'Curiosity becomes capability through exploration.'}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-space text-[#F1F0F5] tracking-tight">
                {t.odyssey?.scene03.subtitle || 'Engineering Mindset & 5 Disciplines'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-sans">
                {t.odyssey?.scene03.desc}
              </p>
            </div>

            {/* 5 Technical Disciplines Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Object.values(engineeringMindset).map((disc) => {
                const isActive = activeMindsetTab === disc.id;
                return (
                  <button
                    key={disc.id}
                    onClick={() => {
                      setActiveMindsetTab(disc.id);
                      playSound('tab');
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
                      isActive
                        ? 'bg-[#18112C] border-[#963CFF] text-[#F1F0F5] shadow-xl shadow-[#963CFF]/25 scale-[1.02]'
                        : 'frosted-noir text-slate-400 hover:text-white hover:border-[#C9D0DF]/30'
                    }`}
                  >
                    <span className="block text-[10px] font-mono text-[#963CFF] font-bold uppercase">
                      {disc.proficiency.split(':')[1]}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold font-space text-white mt-1 line-clamp-1">
                      {disc.title.split('&')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 4 Quadrants Matrix */}
            {engineeringMindset[activeMindsetTab] && (
              <div className="p-6 sm:p-8 rounded-3xl frosted-noir-elevated space-y-6 shadow-2xl">
                <div className="border-b border-[#C9D0DF]/10 pb-4">
                  <span className="text-xs font-mono text-[#963CFF] uppercase tracking-wider block mb-1">
                    {engineeringMindset[activeMindsetTab].proficiency}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-space text-[#F1F0F5]">
                    {engineeringMindset[activeMindsetTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C9D0DF] font-mono mt-1 italic">
                    "{engineeringMindset[activeMindsetTab].rationale}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#08090D]/70 border border-[#43D9E8]/30 space-y-2">
                    <span className="text-xs font-mono text-[#43D9E8] font-bold block uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#43D9E8]" />
                      1. What I Understand
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {engineeringMindset[activeMindsetTab].understands}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#08090D]/70 border border-[#5146E5]/40 space-y-2">
                    <span className="text-xs font-mono text-[#5146E5] font-bold block uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#5146E5]" />
                      2. What I Have Built
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {engineeringMindset[activeMindsetTab].workedOn}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#08090D]/70 border border-[#D8B77A]/30 space-y-2">
                    <span className="text-xs font-mono text-[#D8B77A] font-bold block uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D8B77A]" />
                      3. What Problems I Have Explored
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {engineeringMindset[activeMindsetTab].explored}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#08090D]/70 border border-[#963CFF]/40 space-y-2">
                    <span className="text-xs font-mono text-[#963CFF] font-bold block uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#963CFF]" />
                      4. What I Am Currently Improving
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {engineeringMindset[activeMindsetTab].improving}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('04', 'next')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5146E5] to-[#43D9E8] hover:opacity-90 text-[#08090D] font-space font-black text-xs uppercase tracking-wider shadow-lg shadow-[#5146E5]/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.odyssey?.scene03.nextCta || 'Visit The Builder’s Lab'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* =====================================================================
            SCENE 04 — THE LAB (20 VERIFIED PRODUCTION SYSTEMS)
        ===================================================================== */}
        {odysseyScene === '04' && (
          <section className="space-y-8 animate-fade-in relative">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-mono text-[#43D9E8] font-bold uppercase tracking-wider block">
                  {t.odyssey?.scene04.narrative || 'Ideas become real when they are built.'}
                </span>
                <h2 className="text-4xl sm:text-5xl font-black font-space text-[#F1F0F5] tracking-tight">
                  {t.odyssey?.scene04.subtitle || 'Laboratory of 20 Verified Systems'}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm font-sans">
                  Setiap sistem diuji dan dibangun dengan arsitektur produksi nyata, bukan sekadar prototipe tiruan.
                </p>
              </div>

              {/* Real-time Search and Category Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative w-full sm:w-60">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={labSearch}
                    onChange={(e) => setLabSearch(e.target.value)}
                    placeholder="Search systems or stack..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#08090D]/80 border border-[#C9D0DF]/20 text-xs text-[#F1F0F5] placeholder-slate-500 font-mono focus:outline-none focus:border-[#43D9E8]"
                  />
                </div>

                <select
                  value={labCategory}
                  onChange={(e) => {
                    setLabCategory(e.target.value);
                    playSound('tab');
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-[#08090D]/80 border border-[#C9D0DF]/20 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#43D9E8]"
                >
                  <option value="all">All Domains ({ALL_PROJECTS.length})</option>
                  <option value="ai">AI & Vision</option>
                  <option value="fullstack">Full-Stack Web</option>
                  <option value="cybersec">CyberSec & Cryptography</option>
                  <option value="org">Infrastructure & Portals</option>
                </select>
              </div>
            </div>

            {/* Featured Hero System Spotlight */}
            {spotlightProject && labSearch === '' && labCategory === 'all' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#151D35] via-[#11131B] to-[#08090D] border-2 border-[#43D9E8]/40 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-[#43D9E8] text-[#08090D] font-mono text-[10px] font-black uppercase tracking-wider">
                  SPOTLIGHT SYSTEM
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <span className="text-xs font-mono text-[#43D9E8] font-bold">
                      {spotlightProject.badge} • {spotlightProject.role}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-space text-[#F1F0F5]">
                      {spotlightProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                      {lang === 'id' ? spotlightProject.desc : spotlightProject.descEn}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {spotlightProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-white/10 text-[#43D9E8] text-xs font-mono border border-[#43D9E8]/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-2.5 justify-center">
                    <button
                      onClick={() => {
                        setSelectedProjectForModal(spotlightProject);
                        playSound('modal');
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#43D9E8] hover:bg-[#43D9E8]/90 text-[#08090D] font-space font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#43D9E8]/30 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Inspect Blueprint</span>
                    </button>
                    {spotlightProject.liveLink && (
                      <a
                        href={spotlightProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-mono text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Launch Live System</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 20 Projects Responsive Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLabProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl frosted-noir hover:border-[#43D9E8]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono text-[#43D9E8] font-bold">
                        SYS-{(idx + 1).toString().padStart(2, '0')}: {proj.role}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 font-mono text-[10px] border border-white/10">
                        {proj.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold font-space text-[#F1F0F5] group-hover:text-[#43D9E8] transition-colors">
                      {proj.title}
                    </h4>

                    <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                      {lang === 'id' ? proj.desc : proj.descEn}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-[10px] border border-white/5"
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

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSelectedProjectForModal(proj);
                        playSound('modal');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#43D9E8] hover:text-[#43D9E8]/80 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Blueprint</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                          title="Open Live Deployment"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.repoLink && (
                        <a
                          href={proj.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                          title="View Verified GitHub Repository"
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
                onClick={() => handleSceneChange('05', 'next')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5146E5] to-[#43D9E8] hover:opacity-90 text-[#08090D] font-space font-black text-xs uppercase tracking-wider shadow-lg shadow-[#5146E5]/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.odyssey?.scene04.nextCta || 'Explore Beyond The Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* =====================================================================
            SCENE 05 — BEYOND THE CODE (CHAMPAGNE HUMAN DIMENSION)
        ===================================================================== */}
        {odysseyScene === '05' && (
          <section className="space-y-8 animate-fade-in relative">
            <div className="max-w-4xl space-y-2">
              <span className="text-xs font-mono text-[#D8B77A] font-bold uppercase tracking-wider block">
                {t.odyssey?.scene05.narrative || 'Engineering is also about people.'}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-space text-[#F1F0F5] tracking-tight">
                {t.odyssey?.scene05.subtitle || 'Human Dimensions, Leadership & Communication'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-sans">
                {t.odyssey?.scene05.desc}
              </p>
            </div>

            {/* Asymmetrical Human Dimension Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-3xl frosted-noir border border-[#D8B77A]/30 space-y-3">
                <span className="text-xs font-mono text-[#D8B77A] font-bold block uppercase">
                  01 // INISIASI & KEPEMIMPINAN TEKNIS
                </span>
                <h3 className="font-space font-bold text-xl text-[#F1F0F5]">
                  Memandu Kolaborasi Pengembang
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Memandu arah teknis pada proyek kolaboratif mahasiswa, memecah arsitektur kompleks menjadi modul kerja terdistribusi, dan mengawal standar kualitas kode.'
                    : 'Guiding technical direction across collaborative student initiatives, decomposing complex architectures into manageable sprints, and enforcing code quality.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl frosted-noir border border-[#D8B77A]/30 space-y-3">
                <span className="text-xs font-mono text-[#D8B77A] font-bold block uppercase">
                  02 // KOMUNIKASI & DOKUMENTASI JERNIH
                </span>
                <h3 className="font-space font-bold text-xl text-[#F1F0F5]">
                  Spesifikasi Teknis yang Terstruktur
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Menulis dokumentasi arsitektur, diagram aliran data, dan PRD padat konteks (seperti pada VibeDoc) yang menjembatani kebutuhan teknis dan non-teknis.'
                    : 'Authoring architectural specifications, data flow diagrams, and context-dense PRDs (demonstrated in VibeDoc) that bridge technical and non-technical stakeholders.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl frosted-noir border border-[#D8B77A]/30 space-y-3">
                <span className="text-xs font-mono text-[#D8B77A] font-bold block uppercase">
                  03 // PEMECAHAN MASALAH DI BAWAH BATASAN
                </span>
                <h3 className="font-space font-bold text-xl text-[#F1F0F5]">
                  Rekayasa untuk Perangkat Terbatas
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Mendesain PostureLens agar tetap berjalan 30+ FPS pada webcam standar tanpa GPU eksternal dan tanpa pengiriman data sensitif ke server eksternal.'
                    : 'Designing PostureLens to sustain 30+ FPS on consumer hardware without external dedicated GPUs and with zero cloud server egress.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl frosted-noir border border-[#D8B77A]/30 space-y-3">
                <span className="text-xs font-mono text-[#D8B77A] font-bold block uppercase">
                  04 // KULTUR BELAJAR & KETEKUNAN
                </span>
                <h3 className="font-space font-bold text-xl text-[#F1F0F5]">
                  Evolusi Mandiri Berkelanjutan
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {lang === 'id'
                    ? 'Secara mandiri mempelajari WebGPU, model inferensi lokal, dan pengujian terotentikasi untuk terus memperdalam kapabilitas rekayasa.'
                    : 'Autonomously mastering WebGPU, local neural inference models, and authenticated testing pipelines to expand software engineering frontiers.'}
                </p>
              </div>
            </div>

            {/* Leadership Manifesto */}
            <div className="p-6 rounded-3xl bg-[#D8B77A]/10 border border-[#D8B77A]/30 flex items-center gap-4">
              <Users className="w-8 h-8 text-[#D8B77A] flex-shrink-0" />
              <p className="text-sm sm:text-base text-[#F1F0F5] font-space italic">
                "Kualitas seorang engineer tidak diukur dari kerumitan kode yang dibuat, melainkan
                dari seberapa mudah sistem tersebut dipahami, diuji, dan dipercaya oleh manusia
                lain."
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('06', 'next')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5146E5] to-[#43D9E8] hover:opacity-90 text-[#08090D] font-space font-black text-xs uppercase tracking-wider shadow-lg shadow-[#5146E5]/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.odyssey?.scene05.nextCta || 'Advance to The Next Frontier'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* =====================================================================
            SCENE 06 — THE NEXT FRONTIER (RESEARCH HORIZONS)
        ===================================================================== */}
        {odysseyScene === '06' && (
          <section className="space-y-8 animate-fade-in relative">
            <div className="max-w-4xl space-y-2">
              <span className="text-xs font-mono text-[#963CFF] font-bold uppercase tracking-wider block">
                {t.odyssey?.scene06.narrative || 'The journey is still unfolding.'}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-space text-[#F1F0F5] tracking-tight">
                {t.odyssey?.scene06.subtitle || 'Future Research Horizons'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-sans">
                {t.odyssey?.scene06.desc}
              </p>
            </div>

            {/* 3 Research Horizons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl frosted-noir border border-[#963CFF]/30 space-y-4 hover:border-[#963CFF] transition-all">
                <span className="text-xs font-mono text-[#963CFF] font-bold block">
                  HORIZON // 01
                </span>
                <h3 className="text-xl font-bold font-space text-[#F1F0F5]">Local Neural Enclaves</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {lang === 'id'
                    ? 'Mengeksekusi model visi dan inferensi bahasa kecil langsung di browser via WebGPU tanpa streaming data atau biaya API per-token.'
                    : 'Executing vision and small language models directly in client browsers via WebGPU with zero server streaming or API token billing.'}
                </p>
                <div className="pt-2">
                  <span className="px-3 py-1 rounded-lg bg-[#963CFF]/10 text-[#963CFF] font-mono text-[10px] border border-[#963CFF]/30 block text-center">
                    WebGPU • Zero API Latency
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl frosted-noir border border-[#43D9E8]/30 space-y-4 hover:border-[#43D9E8] transition-all">
                <span className="text-xs font-mono text-[#43D9E8] font-bold block">HORIZON // 02</span>
                <h3 className="text-xl font-bold font-space text-[#F1F0F5]">Zero-Trust Local Storage</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {lang === 'id'
                    ? 'Enkripsi memori transien, logging terverifikasi tamper-evident, dan audit integritas kontinu yang memperluas prinsip VaultSentinel.'
                    : 'Transient memory encryption, tamper-evident audit logs, and continuous integrity verification extending VaultSentinel core principles.'}
                </p>
                <div className="pt-2">
                  <span className="px-3 py-1 rounded-lg bg-[#43D9E8]/10 text-[#43D9E8] font-mono text-[10px] border border-[#43D9E8]/30 block text-center">
                    Tamper-Evident • AES Integrity
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-3xl frosted-noir border border-[#5146E5]/40 space-y-4 hover:border-[#5146E5] transition-all">
                <span className="text-xs font-mono text-[#5146E5] font-bold block">
                  HORIZON // 03
                </span>
                <h3 className="text-xl font-bold font-space text-[#F1F0F5]">Resilient Edge Topologies</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {lang === 'id'
                    ? 'Sinkronisasi data offline-first dengan CRDTs untuk aplikasi kolaboratif berkinerja tinggi tanpa server terpusat.'
                    : 'Offline-first peer synchronizations powered by CRDTs, ensuring zero data loss across volatile network conditions.'}
                </p>
                <div className="pt-2">
                  <span className="px-3 py-1 rounded-lg bg-[#5146E5]/10 text-[#43D9E8] font-mono text-[10px] border border-[#5146E5]/30 block text-center">
                    Offline CRDTs • Decentralized
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSceneChange('07', 'next')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5146E5] to-[#43D9E8] hover:opacity-90 text-[#08090D] font-space font-black text-xs uppercase tracking-wider shadow-lg shadow-[#5146E5]/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.odyssey?.scene06.nextCta || 'Open The Connection'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* =====================================================================
            SCENE 07 — THE CONNECTION (MONUMENTAL CLOSING NEXUS)
        ===================================================================== */}
        {odysseyScene === '07' && (
          <section className="space-y-8 animate-fade-in relative">
            <div className="max-w-4xl space-y-3">
              <span className="text-xs font-mono text-[#43D9E8] font-bold uppercase tracking-wider block">
                {t.odyssey?.scene07.narrative || 'Perhaps our next chapter starts here.'}
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-space tracking-tight">
                <span className="liquid-chrome-text">
                  {t.odyssey?.scene07.heading || 'Every great build starts with a conversation.'}
                </span>
              </h2>
              <p className="text-base sm:text-xl text-[#C9D0DF] leading-relaxed font-sans max-w-2xl">
                {t.odyssey?.scene07.subheading ||
                  'Whether you are a technical recruiter, engineering leader, or fellow builder with a challenge worth solving, my inbox is always open.'}
              </p>
            </div>

            {/* Glowing Direct Connection Nexus Card */}
            <div className="p-6 sm:p-10 rounded-3xl frosted-noir-elevated border-2 border-[#5146E5]/50 shadow-2xl space-y-6">
              <span className="text-xs font-mono text-[#C9D0DF] block uppercase tracking-wider">
                PRIMARY DIRECT INBOX (1-CLICK COPY / MAILTO):
              </span>

              {/* Verified Direct Email Box */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#08090D]/80 border border-[#C9D0DF]/20">
                <span className="font-mono text-base sm:text-xl text-[#43D9E8] font-bold tracking-tight">
                  fatirgibrann@gmail.com
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyEmail}
                    className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#5146E5] hover:bg-[#5146E5]/90 text-white font-space font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>
                      {copiedEmail
                        ? t.odyssey?.scene07.copied || 'Copied!'
                        : t.odyssey?.scene07.copyEmail || 'Copy Email'}
                    </span>
                  </button>

                  <a
                    href="mailto:fatirgibrann@gmail.com"
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-space text-xs font-bold transition-all"
                    title="Open in Email App"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Social Channels Nexus */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/Fatirrr08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#C9D0DF] hover:text-white border border-[#C9D0DF]/20 font-mono text-xs flex items-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub @Fatirrr08</span>
                </a>

                <a
                  href="https://linkedin.com/in/fatirgibran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#C9D0DF] hover:text-white border border-[#C9D0DF]/20 font-mono text-xs flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LinkedIn /in/fatirgibran</span>
                </a>
              </div>
            </div>

            {/* Closing Journey Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  handleSceneChange('00', 'prev');
                  if (triggerGlobalEffect) triggerGlobalEffect('confetti');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-space font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.odyssey?.scene07.restart || 'RESTART THE ODYSSEY'}</span>
              </button>

              <button
                onClick={() => {
                  toggleExperienceMode();
                  playSound('toggle');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#5146E5] via-[#43D9E8] to-[#963CFF] text-[#08090D] font-space font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#5146E5]/30 transition-all"
              >
                <span>{t.odyssey?.scene07.exploreClassic || 'EXPLORE DIRECT PORTFOLIO'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================================
          BOTTOM DOCK STEPPER & KEYBOARD TELEMETRY (OBSIDIAN NOIR)
      ===================================================================== */}
      <footer className="relative z-30 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-6 pt-2">
        <div className="flex items-center justify-between gap-3 p-3 rounded-2xl frosted-noir shadow-2xl">
          {/* Previous Scene Button */}
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all"
            title="Previous Chapter [ArrowLeft]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          {/* Stepper Scene Buttons with dynamic glowing active indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SCENES_CONFIG.map((scene, idx) => {
              const isActive = scene.id === odysseyScene;
              const Icon = scene.icon;
              return (
                <button
                  key={scene.id}
                  onClick={() =>
                    handleSceneChange(scene.id, idx > currentSceneIndex ? 'next' : 'prev')
                  }
                  title={`${scene.tag}: ${lang === 'id' ? scene.titleId : scene.titleEn}`}
                  className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-mono text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#43D9E8] text-[#08090D] font-black shadow-[0_0_18px_rgba(67,217,232,0.85)] scale-110'
                      : 'bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="hidden sm:inline">{scene.id}</span>
                  <Icon className="w-4 h-4 sm:hidden" />
                </button>
              );
            })}
          </div>

          {/* Next Scene Button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#43D9E8] hover:bg-[#43D9E8]/90 text-[#08090D] text-xs font-space font-black uppercase tracking-wider transition-all shadow-md shadow-[#43D9E8]/30"
            title="Next Chapter [ArrowRight]"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
