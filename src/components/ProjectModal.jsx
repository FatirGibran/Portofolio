import React, { useEffect, memo } from 'react';
import {
  X, ExternalLink, Play, Sparkles, ShieldCheck, GitBranch,
  Layers, CheckCircle2, ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Project Architecture & Engineering Insights Dictionary
const CASE_STUDIES = {
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

function ProjectModal() {
  const {
    selectedProjectForModal,
    setSelectedProjectForModal,
    playSound,
    lang,
  } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProjectForModal) {
        setSelectedProjectForModal(null);
        playSound('click');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectForModal, setSelectedProjectForModal, playSound]);

  if (!selectedProjectForModal) return null;

  const project = selectedProjectForModal;
  const caseStudy = CASE_STUDIES[project.id] || {
    pipeline: [
      { step: 'Input Layer', desc: 'Data Collection & UI Triggers' },
      { step: 'Core Processing', desc: 'State Management & Logic Flow' },
      { step: 'Integration', desc: 'API / Database Synchronization' },
      { step: 'UI Presentation', desc: 'Reactive Component Render' }
    ],
    challenges: 'Mengoptimalkan performa rendering dan efisiensi query agar latensi tetap rendah pada berbagai perangkat.',
    solution: 'Penerapan arsitektur modular, caching lokal cerdas, dan component memoization untuk memastikan 60 FPS fluid UI.',
    metrics: [
      { label: 'Quality Score', val: 'A+' },
      { label: 'Responsive', val: 'Mobile-First' },
      { label: 'Architecture', val: 'Modular Clean' },
    ]
  };

  const description = (lang === 'en' && project.descEn) ? project.descEn : project.desc;

  const handleOpenSandbox = () => {
    setSelectedProjectForModal(null);
    playSound('tab');
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => {
          setSelectedProjectForModal(null);
          playSound('click');
        }}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border-2 border-pastel-yellow dark:border-amber-400/60 rounded-3xl shadow-pastel-lg overflow-hidden flex flex-col my-auto z-10 max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pastel-peach/30 dark:border-slate-800 bg-pastel-bg/60 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-space uppercase tracking-wider text-pastel-blue-dark dark:text-sky-300 bg-pastel-blue/60 dark:bg-sky-950/60 py-1 px-3 rounded-full border border-pastel-blue/80 dark:border-sky-800">
              {project.role}
            </span>
            {project.badge && (
              <span className="text-[11px] font-bold font-space uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-pastel-yellow/90 dark:bg-amber-950/60 py-1 px-2.5 rounded-full border border-pastel-yellow-hover dark:border-amber-800 shadow-pastel-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                {project.badge}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setSelectedProjectForModal(null);
              playSound('click');
            }}
            className="p-1.5 rounded-full hover:bg-pastel-peach/40 dark:hover:bg-slate-800 text-pastel-navy dark:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Project Title & Overview */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-space font-extrabold text-pastel-navy dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-pastel-navy/80 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          <div className="bg-pastel-bg/70 dark:bg-slate-950/50 p-4 sm:p-5 rounded-2xl border border-pastel-peach/50 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-pastel-blue-dark dark:text-sky-400" />
              <h4 className="text-xs font-bold font-space uppercase tracking-wider text-pastel-navy dark:text-slate-300">
                Arsitektur & Alur Data (System Pipeline)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {caseStudy.pipeline.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-pastel-navy/10 dark:border-slate-700 relative flex flex-col justify-between"
                >
                  <div className="text-[10px] font-mono font-bold text-pastel-blue-dark dark:text-sky-400 mb-1">
                    0{idx + 1}. STEP
                  </div>
                  <div className="text-xs font-bold font-space text-pastel-navy dark:text-white leading-tight">
                    {item.step}
                  </div>
                  <div className="text-[10px] text-pastel-navy/60 dark:text-slate-400 mt-1">
                    {item.desc}
                  </div>
                  {idx < 3 && (
                    <ArrowRight className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-pastel-navy/30 dark:text-slate-600 z-10 bg-white dark:bg-slate-900 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {caseStudy.metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-pastel-yellow/30 dark:bg-amber-950/20 p-3.5 rounded-2xl border border-pastel-yellow dark:border-amber-900/50 text-center"
              >
                <div className="text-lg sm:text-xl font-space font-extrabold text-pastel-navy dark:text-amber-300">
                  {m.val}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-pastel-navy/60 dark:text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-rose-50/70 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/40">
              <div className="font-bold font-space text-rose-700 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Tantangan Rekayasa</span>
              </div>
              <p className="text-pastel-navy/70 dark:text-slate-300 leading-relaxed">
                {caseStudy.challenges}
              </p>
            </div>

            <div className="bg-emerald-50/70 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/40">
              <div className="font-bold font-space text-emerald-700 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solusi & Hasil</span>
              </div>
              <p className="text-pastel-navy/70 dark:text-slate-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack List */}
          <div>
            <div className="text-xs font-bold font-space uppercase tracking-wider text-pastel-navy/60 dark:text-slate-400 mb-2">
              Teknologi yang Digunakan
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tItem, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold text-pastel-navy dark:text-slate-200 bg-pastel-bg dark:bg-slate-800 border border-pastel-navy/15 dark:border-slate-700 py-1 px-2.5 rounded-xl shadow-pastel-sm"
                >
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-pastel-peach/30 dark:border-slate-800 bg-pastel-bg/50 dark:bg-slate-950/40">
          <div>
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-navy dark:text-slate-200 hover:text-pastel-blue-dark dark:hover:text-sky-400 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                <span>Lihat Kode di GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {project.demoTab && (
              <button
                onClick={() => handleOpenSandbox(project.demoTab)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-navy bg-pastel-yellow hover:bg-pastel-yellow-hover border border-pastel-yellow-hover py-2 px-4 rounded-xl shadow-pastel-sm transition-transform hover:scale-105"
              >
                <Play className="w-3 h-3 fill-pastel-navy" />
                <span>Uji di Sandbox Demo</span>
              </button>
            )}

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-blue-dark dark:text-sky-400 bg-pastel-blue/60 dark:bg-sky-950/70 border border-pastel-blue-dark/40 py-2 px-4 rounded-xl shadow-pastel-sm transition-transform hover:scale-105"
              >
                <span>Kunjungi Web Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectModal);
