import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu, Hand, Play, RotateCcw, Monitor, Sparkles, Columns, ZoomIn, EyeOff, Edit3,
  ShoppingBag, BookOpen, ShieldCheck, MapPin, Search, Check, X, ShieldAlert,
  Activity, Eye, Volume2, VolumeX, Download, FileText, Lock, Key, RefreshCw,
  Terminal, ArrowRight, Zap, Award
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Sandbox({ activeTab, setActiveTab, triggerGlobalEffect }) {
  const { t, lang } = usePortfolio();

  // Web Audio chime helper for realistic interactive feedback
  const playChime = (type = 'success') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (type === 'warn') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);
      }

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // Browser autoplay policy might block audio
    }
  };

  // ==========================================
  // TAB 1: POSTURELENS STATE
  // ==========================================
  const [postureAngle, setPostureAngle] = useState(8);
  const [sensitivity, setSensitivity] = useState('balanced');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [postureLog, setPostureLog] = useState(
    lang === 'en' ? '🟢 Optimal Upright Posture. Spine aligned.' : '🟢 Postur Optimal. Tulang belakang sejajar.'
  );

  const sensitivityThresholds = {
    strict: 10,
    balanced: 14,
    relaxed: 18,
  };

  const threshold = sensitivityThresholds[sensitivity];
  const isSlouching = postureAngle > threshold;
  const postureScore = Math.max(50, Math.min(100, Math.round(100 - (postureAngle > threshold ? (postureAngle - threshold) * 3 : 0))));

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setPostureAngle(0);
    setPostureLog(lang === 'en' ? '🎯 Calibrating 3-second upright baseline...' : '🎯 Mengkalibrasi posisi tegak 3-detik...');
    setTimeout(() => {
      setIsCalibrating(false);
      setPostureLog(lang === 'en' ? '✅ Calibration complete! Baseline 0° saved to IndexedDB.' : '✅ Kalibrasi selesai! Baseline 0° tersimpan di browser IndexedDB.');
      if (!isAudioMuted) playChime('success');
    }, 1200);
  };

  const handleAngleSlider = (val) => {
    setPostureAngle(val);
    if (val > threshold) {
      setPostureLog(
        lang === 'en'
          ? `⚠️ Slouch Warning! Neck inclination ${val}° exceeds ${threshold}° threshold.`
          : `⚠️ Peringatan Bungkuk! Inklinasi leher ${val}° melampaui batas toleransi ${threshold}°.`
      );
      if (!isAudioMuted) playChime('warn');
    } else {
      setPostureLog(
        lang === 'en'
          ? `🟢 Good Posture. Neck inclination ${val}° is within healthy range.`
          : `🟢 Postur Baik. Inklinasi leher ${val}° dalam zona aman.`
      );
    }
  };

  // ==========================================
  // TAB 2: EL_GESTUR_V2 STATE
  // ==========================================
  const [logs, setLogs] = useState([
    { text: '[SYSTEM] Initializing GPU Pipeline (MPS Support)...', type: 'info' },
    { text: '[SYSTEM] Loading YOLOv8 weights "yolov8n.pt"... OK', type: 'info' },
    { text: '[SYSTEM] DeepSORT Tracker initialized.', type: 'info' },
    { text: '[SYSTEM] MediaPipe Landmark Classifier (21 Joints) loaded.', type: 'info' },
    { text: '[SYSTEM] CORE READY. Awaiting simulation inputs.', type: 'success' }
  ]);
  const canvasRef = useRef(null);
  const terminalRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [trails, setTrails] = useState([]);
  const [activeCmd, setActiveCmd] = useState('');

  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { text: `[${timestamp}] ${text}`, type }]);
  };

  useEffect(() => {
    if (activeTab === 'el_gestur' && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

  useEffect(() => {
    if (activeTab !== 'el_gestur') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId;
    let localTrails = [...trails];

    const render = () => {
      ctx.fillStyle = 'rgba(250, 246, 238, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (localTrails.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(localTrails[0].x, localTrails[0].y);
        for (let i = 1; i < localTrails.length; i++) {
          ctx.lineTo(localTrails[i].x, localTrails[i].y);
        }
        ctx.stroke();
      }

      if (localTrails.length > 0 && !isDrawing) {
        localTrails.shift();
      }
      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [trails, isDrawing, activeTab]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartX(x);
    setTrails([{ x, y }]);
    addLog(`Pointer Down (X: ${Math.round(x)}, Y: ${Math.round(y)})`, 'info');
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTrails(prev => {
      const next = [...prev, { x, y }];
      if (next.length > 25) next.shift();
      return next;
    });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const diffX = endX - startX;

    addLog(`Pointer Up. Delta X: ${Math.round(diffX)}`, 'info');
    if (Math.abs(diffX) > 60) {
      if (diffX > 0) {
        addLog(lang === 'en' ? 'Gesture: Swipe Right (Prev Slide)' : 'Gestur: Swipe Kanan (Slide Sebelumnya)', 'action');
      } else {
        addLog(lang === 'en' ? 'Gesture: Swipe Left (Next Slide)' : 'Gestur: Swipe Kiri (Slide Berikutnya)', 'action');
      }
      playChime('success');
    }
  };

  const runCommand = (cmd) => {
    setActiveCmd(cmd);
    triggerGlobalEffect(cmd, addLog);
    playChime('success');
  };

  const elCommands = [
    { id: 'pena', label: 'aktifkan pena', icon: <Edit3 className="w-4 h-4" /> },
    { id: 'konfeti', label: 'tampilkan konfeti', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'hitam', label: 'layar hitam', icon: <EyeOff className="w-4 h-4" /> },
    { id: 'tirai', label: 'buka tirai', icon: <Columns className="w-4 h-4" /> },
    { id: 'zoom', label: 'zoom fit', icon: <ZoomIn className="w-4 h-4" /> },
    { id: 'normal', label: 'kembali normal', icon: <RotateCcw className="w-4 h-4" /> },
  ];

  // ==========================================
  // TAB 3: VIBEDOC STATE
  // ==========================================
  const [rawIdea, setRawIdea] = useState(
    lang === 'en'
      ? 'Smart student split-bill web app with physical receipt OCR and instant QRIS payment integration'
      : 'Platform split-bill cerdas untuk mahasiswa dengan OCR struk belanjaan dan QRIS payment instant'
  );
  const [isGeneratingVibe, setIsGeneratingVibe] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const presets = [
    { label: 'Split-Bill OCR', idea: lang === 'en' ? 'Smart student split-bill web app with receipt OCR' : 'Aplikasi split-bill cerdas mahasiswa dengan OCR struk belanjaan dan QRIS payment' },
    { label: 'AI Study Planner', idea: lang === 'en' ? 'Automated Informatics study scheduler with spaced repetition' : 'Web dashboard otomatis penjadwal belajar kurikulum S1 Informatika dengan spaced repetition' },
    { label: 'Security Audit', idea: lang === 'en' ? 'Python CLI scanner for open ports, chmod permissions, and firewall' : 'CLI tool Python untuk memindai port terbuka, izin berkas chmod, dan audit firewall server Linux' },
  ];

  const handleGenerateVibe = () => {
    setIsGeneratingVibe(true);
    setGeneratedDoc('');
    setTimeout(() => {
      const markdown = `# Architecture Specification: ${rawIdea.slice(0, 35)}...

> Generated by **VibeDoc Engine** in 0.84s (Token estimate: ~1,240 tokens)

---

## 1. System Overview & Core Objectives
- **Product Goal**: Streamline raw concept to executable, type-safe architecture without context drift.
- **Target Audience**: Software engineers and computer science students.
- **Architectural Paradigm**: Modular Decoupled Monorepo, 100% Type-Safe.

---

## 2. Recommended Tech Stack
| Layer | Tech Selection | Rationale |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) + Tailwind CSS v4 | SSR + SPA with optimal rendering speed |
| **Backend** | FastAPI (Python 3.11+) | Asynchronous, built-in Pydantic schema validation |
| **Database** | PostgreSQL + Supabase | Relational integrity with real-time broadcast |
| **AI / OCR Core** | Google Gemini 2.5 Flash SDK | Token-efficient multimodal vision processing |

---

## 3. Data Schema (Core Entity)
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'member'
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total_amount NUMERIC(12, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING'
);
\`\`\`

---

## 4. Implementation Checklist (Phase 1 MVP)
- [x] Initial scaffold repository & setup environment variables (.env.example)
- [x] Database migration & Supabase RLS security rules
- [x] Route Handler API endpoints with standardized JSON response
- [x] Client UI components with mobile-first responsive design
`;
      setGeneratedDoc(markdown);
      setIsGeneratingVibe(false);
      playChime('success');
    }, 900);
  };

  const handleCopyDoc = () => {
    navigator.clipboard.writeText(generatedDoc);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // ==========================================
  // TAB 4: VAULTSENTINEL STATE
  // ==========================================
  const [cpuMetric, setCpuMetric] = useState(24);
  const [ramMetric, setRamMetric] = useState(48);
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [passphrase, setPassphrase] = useState('sentinel-vault-key-2026');
  const [backupManifest, setBackupManifest] = useState(null);

  const handleTriggerBackup = () => {
    setIsBackupRunning(true);
    setTimeout(() => {
      setBackupManifest({
        timestamp: new Date().toISOString(),
        backupType: 'Incremental (SHA-256)',
        filesScanned: 142,
        filesEncrypted: 4,
        encryption: 'AES-128-CBC (Fernet) + PBKDF2HMAC (100k iters)',
        hashDigest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        status: 'SUCCESS'
      });
      setIsBackupRunning(false);
      playChime('success');
    }, 1100);
  };

  const handleSimulateLoad = () => {
    setCpuMetric(89);
    setRamMetric(78);
    playChime('warn');
    setTimeout(() => {
      setCpuMetric(28);
      setRamMetric(49);
    }, 3500);
  };

  const handleDownloadReport = () => {
    const reportText = `# VaultSentinel System Health & Backup Audit Report
Generated: ${new Date().toLocaleString()}
Host: localhost (macOS / Linux Container)
Code Coverage: 95.84% (83 Passing Unit Tests)

## Metrics Summary
- CPU Utilization: ${cpuMetric}%
- Memory Allocation: ${ramMetric}%
- Disk Health: HEALTHY (Normal I/O)

## Encryption Manifest
- Algorithm: AES-128 Fernet + PBKDF2HMAC
- Status: Secure & Verified
`;
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vaultsentinel-report-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ==========================================
  // TAB 5: SALIN GAYA STATE
  // ==========================================
  const [weight, setWeight] = useState(2);
  const [distance, setDistance] = useState('purwokerto');
  const [payMethod, setPayMethod] = useState('snap');
  const [orderStatus, setOrderStatus] = useState('idle');
  const [payLog, setPayLog] = useState('');

  const distanceCosts = {
    purwokerto: { label: 'Purwokerto (Lokal)', cost: 5000 },
    bandung: { label: 'Bandung (Jawa Barat)', cost: 15000 },
    jakarta: { label: 'Jakarta (Jabodetabek)', cost: 20000 },
    surabaya: { label: 'Surabaya (Jawa Timur)', cost: 25000 },
  };

  const itemPrice = 85000;
  const shippingCost = weight * distanceCosts[distance].cost;
  const totalCost = itemPrice + shippingCost;

  const handlePay = () => {
    setOrderStatus('paying');
    setPayLog(lang === 'en' ? 'Generating Midtrans snap token...' : 'Menyiapkan snap token Midtrans...');
    setTimeout(() => {
      setPayLog(lang === 'en' ? 'Connecting to Bank Gateway API...' : 'Menghubungkan ke API Bank Gateway...');
    }, 600);
  };

  const handlePaySuccess = () => {
    setPayLog(lang === 'en' ? 'Payment Verified! Syncing order to Firebase RTDB...' : 'Pembayaran Diterima! Sinkronisasi pesanan ke Firebase RTDB...');
    setTimeout(() => {
      setOrderStatus('paid');
      setPayLog('');
      playChime('success');
    }, 800);
  };

  // ==========================================
  // TAB 6: LIBRARYPRO STATE
  // ==========================================
  const [libraryRole, setLibraryRole] = useState('gate');
  const [fuzzyQuery, setFuzzyQuery] = useState('');
  const [borrowRequests, setBorrowRequests] = useState([
    { id: 1, name: 'Maruf', book: 'Refactoring 2nd Edition', date: '11 Sept 2026', status: 'Pending' },
    { id: 2, name: 'Gibran', book: 'Computer Networks & Security', date: '10 Sept 2026', status: 'Pending' }
  ]);
  const [bookList, setBookList] = useState([
    { id: 101, title: 'Clean Code: Handbook of Agile Craft', stock: 3, rating: 4.8 },
    { id: 102, title: 'Refactoring 2nd Edition', stock: 1, rating: 4.9 },
    { id: 103, title: 'Computer Networks & Security', stock: 2, rating: 4.7 }
  ]);
  const [memberMessage, setMemberMessage] = useState('');

  const filteredBooks = bookList.filter(book => {
    const q = fuzzyQuery.toLowerCase().trim();
    if (!q) return true;
    if (book.title.toLowerCase().includes(q)) return true;
    let bIdx = 0;
    for (let char of q) {
      bIdx = book.title.toLowerCase().indexOf(char, bIdx);
      if (bIdx === -1) return false;
      bIdx++;
    }
    return true;
  });

  const handleApproveRequest = (id, bookTitle) => {
    setBorrowRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
    setBookList(prev => prev.map(b => b.title === bookTitle ? { ...b, stock: Math.max(0, b.stock - 1) } : b));
    playChime('success');
  };

  const handleRejectRequest = (id) => {
    setBorrowRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
    playChime('warn');
  };

  const handleMemberBorrow = (bookTitle, stock) => {
    if (stock <= 0) {
      setMemberMessage(lang === 'en' ? 'Sorry, this book is currently out of stock!' : 'Maaf, stok buku ini sedang kosong!');
      playChime('warn');
      return;
    }
    const newId = borrowRequests.length + 1;
    setBorrowRequests(prev => [
      ...prev,
      { id: newId, name: 'Fatir Gibran', book: bookTitle, date: 'Hari Ini', status: 'Pending' }
    ]);
    setMemberMessage(
      lang === 'en'
        ? `Loan request for "${bookTitle}" submitted to Admin!`
        : `Permintaan pinjam "${bookTitle}" berhasil diajukan ke Admin!`
    );
    playChime('success');
    setTimeout(() => setMemberMessage(''), 3000);
  };

  return (
    <section id="simulator" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      {/* Header */}
      <div className="text-center md:text-left mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-yellow/80 dark:bg-amber-400/20 border border-pastel-yellow-hover dark:border-amber-400/40 text-pastel-navy dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-amber-600" />
          <span>{t.sandbox.badge}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-space text-pastel-navy dark:text-white inline-block relative">
          {t.sandbox.title}
          <span className="absolute bottom-1.5 left-0 w-1/2 h-3 bg-pastel-yellow/60 dark:bg-amber-400/30 -z-10 rounded-full"></span>
        </h2>
        <p className="text-sm md:text-base text-pastel-navy/70 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
          {t.sandbox.subtitle}
        </p>
      </div>

      {/* 6 Tabs Switcher */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {[
          { id: 'posturelens', label: t.sandbox.tabs.posturelens, icon: <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> },
          { id: 'el_gestur', label: t.sandbox.tabs.el_gestur, icon: <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400" /> },
          { id: 'vibedoc', label: t.sandbox.tabs.vibedoc, icon: <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" /> },
          { id: 'vaultsentinel', label: t.sandbox.tabs.vaultsentinel, icon: <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" /> },
          { id: 'salin_gaya', label: t.sandbox.tabs.salin_gaya, icon: <ShoppingBag className="w-4 h-4 text-rose-500 dark:text-rose-400" /> },
          { id: 'library_pro', label: t.sandbox.tabs.library_pro, icon: <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-2xl font-bold font-space text-xs md:text-sm border-2 transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy border-pastel-yellow-hover shadow-pastel-sm scale-105'
                : 'bg-white dark:bg-slate-800 border-pastel-peach/50 dark:border-slate-700 text-pastel-navy/70 dark:text-slate-300 hover:bg-pastel-peach/20 dark:hover:bg-slate-750 hover:text-pastel-navy dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Sandbox Card Frame */}
      <div className="bg-white dark:bg-slate-800 border-2 border-pastel-blue dark:border-slate-700 rounded-3xl overflow-hidden shadow-pastel-lg min-h-[460px] flex flex-col justify-between">
        
        {/* =========================================================
            DEMO 1: POSTURELENS (ON-DEVICE AI ERGONOMICS MONITOR)
            ========================================================= */}
        {activeTab === 'posturelens' && (
          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-pastel-peach/30 dark:border-slate-700">
                <div>
                  <h3 className="text-xl font-bold font-space text-pastel-navy dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    PostureLens — Real-Time Ergonomics AI
                  </h3>
                  <p className="text-xs text-pastel-navy/60 dark:text-slate-400 mt-0.5">
                    100% On-Device MediaPipe Pose & Web Audio API (Zero video frames leave your device)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAudioMuted(!isAudioMuted)}
                    className="p-2 rounded-xl border border-pastel-navy/15 dark:border-slate-700 bg-pastel-bg dark:bg-slate-900 text-pastel-navy dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 hover:bg-pastel-peach/30 dark:hover:bg-slate-800 transition-colors"
                  >
                    {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    <span>{isAudioMuted ? 'Muted' : 'Audio Chime ON'}</span>
                  </button>
                  <button
                    onClick={handleCalibrate}
                    disabled={isCalibrating}
                    className="bg-pastel-yellow dark:bg-amber-400 hover:bg-pastel-yellow-hover text-pastel-navy font-bold text-xs py-2 px-3.5 rounded-xl shadow-pastel-sm transition-all"
                  >
                    {isCalibrating ? 'Calibrating...' : '🎯 Kalibrasi 0° (Upright)'}
                  </button>
                </div>
              </div>

              {/* Grid Sensor */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 bg-pastel-bg dark:bg-slate-900 border-2 border-dashed border-pastel-blue/60 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[220px]">
                  <div className="relative w-36 h-40 flex items-center justify-center">
                    <div
                      style={{
                        transform: `rotate(${postureAngle}deg)`,
                        transformOrigin: 'bottom center',
                        transition: 'transform 0.2s ease-out'
                      }}
                      className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-pastel-sm ${
                        isSlouching ? 'bg-red-100 dark:bg-red-950/60 border-red-500' : 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500'
                      }`}
                    >
                      <Eye className={`w-6 h-6 ${isSlouching ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}`} />
                    </div>

                    <div
                      style={{
                        transform: `rotate(${Math.round(postureAngle * 0.7)}deg)`,
                        transformOrigin: 'bottom center',
                        transition: 'transform 0.2s ease-out'
                      }}
                      className={`absolute bottom-4 w-2 h-20 rounded-full ${
                        isSlouching ? 'bg-red-400 dark:bg-red-500' : 'bg-emerald-500'
                      }`}
                    ></div>
                  </div>

                  <div className="mt-2 text-center">
                    <span className={`inline-block font-space font-extrabold text-sm py-1 px-3 rounded-full ${
                      isSlouching ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    }`}>
                      {isSlouching ? `BUNGKUK / SLOUCH (θ = ${postureAngle}° > ${threshold}°)` : `TEGAK / OPTIMAL (θ = ${postureAngle}°)`}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-6 flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-wider">
                        {lang === 'en' ? 'Simulated Neck Inclination Angle (θ)' : 'Simulasi Sudut Inklinasi Leher (θ)'}
                      </span>
                      <span className="font-space font-extrabold text-sm text-pastel-blue-dark dark:text-sky-400">{postureAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="35"
                      value={postureAngle}
                      onChange={(e) => handleAngleSlider(parseInt(e.target.value))}
                      className="w-full h-2.5 bg-pastel-blue dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pastel-blue-dark dark:accent-sky-400"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-pastel-navy/40 dark:text-slate-500 mt-1">
                      <span>-5° (Reclining)</span>
                      <span>{threshold}° (Threshold)</span>
                      <span>35° (Severe Slouch)</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      {lang === 'en' ? 'Ergonomic Sensitivity Tolerance' : 'Mode Sensitivitas Ergonomis'}
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'strict', label: 'Strict (±10°)' },
                        { id: 'balanced', label: 'Balanced (±14°)' },
                        { id: 'relaxed', label: 'Relaxed (±18°)' },
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSensitivity(s.id)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold font-space border transition-colors ${
                            sensitivity === s.id
                              ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy border-pastel-yellow-hover shadow-pastel-sm'
                              : 'bg-pastel-bg dark:bg-slate-900 border-pastel-navy/10 dark:border-slate-700 text-pastel-navy/70 dark:text-slate-300 hover:bg-pastel-peach/30 dark:hover:bg-slate-800'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-pastel-bg dark:bg-slate-900 border border-pastel-navy/10 dark:border-slate-700">
                      <span className="block text-[10px] font-bold text-pastel-navy/40 dark:text-slate-400 uppercase">Daily Posture Score</span>
                      <span className="font-space font-extrabold text-lg text-pastel-blue-dark dark:text-sky-400">{postureScore}%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-pastel-bg dark:bg-slate-900 border border-pastel-navy/10 dark:border-slate-700">
                      <span className="block text-[10px] font-bold text-pastel-navy/40 dark:text-slate-400 uppercase">20-20-20 Eye Break</span>
                      <span className="font-space font-extrabold text-lg text-emerald-600 dark:text-emerald-400">18m 42s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-pastel-bg dark:bg-slate-900 border border-pastel-navy/10 dark:border-slate-700 text-xs font-bold text-pastel-navy/80 dark:text-slate-300 flex items-center justify-between">
              <span>{postureLog}</span>
              <span className="text-[10px] font-mono uppercase text-pastel-navy/40 dark:text-slate-500">// IndexedDB Persistent Engine</span>
            </div>
          </div>
        )}

        {/* =========================================================
            DEMO 2: EL_GESTUR_V2 SIMULATOR
            ========================================================= */}
        {activeTab === 'el_gestur' && (
          <div className="flex flex-col h-full justify-between flex-grow">
            <div className="bg-pastel-blue/30 dark:bg-slate-900 border-b-2 border-pastel-blue dark:border-slate-700 px-6 py-4 flex justify-between items-center">
              <span className="text-pastel-navy dark:text-slate-200 font-bold font-space text-sm">el_gestur_v2 // Computer Vision & Voice Engine</span>
              <span className="text-xs font-bold text-pastel-blue-dark dark:text-sky-400 bg-pastel-blue/80 dark:bg-sky-950 py-1 px-3 rounded-full border border-pastel-blue dark:border-sky-800">One Euro Filter: ACTIVE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 flex-grow">
              <div className="bg-[#121622] p-5 h-64 md:h-72 overflow-y-auto font-mono text-xs text-emerald-400 scanlines" ref={terminalRef}>
                {logs.map((log, idx) => (
                  <div key={idx} className="mb-2">
                    <span className="text-sky-400 mr-2">&gt;</span>
                    {log.type === 'success' && <span className="text-emerald-300 font-bold">{log.text}</span>}
                    {log.type === 'action' && <span className="text-amber-300 font-bold">{log.text}</span>}
                    {log.type === 'info' && <span>{log.text}</span>}
                  </div>
                ))}
              </div>

              <div className="bg-pastel-bg dark:bg-slate-900 p-5 flex flex-col items-center justify-center relative border-t-2 md:border-t-0 md:border-l-2 border-pastel-blue dark:border-slate-700">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="w-full h-48 border-2 border-dashed border-pastel-blue/40 dark:border-slate-700 rounded-2xl bg-white/60 dark:bg-slate-800/60 cursor-crosshair touch-none"
                />
                {!isDrawing && trails.length === 0 && (
                  <div className="absolute pointer-events-none text-center flex flex-col items-center gap-2 max-w-[80%]">
                    <Hand className="w-8 h-8 text-pastel-blue-dark dark:text-sky-400 animate-bounce-soft" />
                    <span className="text-xs font-bold text-pastel-navy/40 dark:text-slate-400">
                      {lang === 'en'
                        ? 'Click & drag mouse horizontally to trigger slide swipes, or move around for glowing laser trail.'
                        : 'Klik & seret mouse ke kiri/kanan untuk simulasi swipe slide, atau gerakkan kursor untuk laser trail.'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-pastel-peach/20 dark:bg-slate-900/60 border-t-2 border-pastel-blue dark:border-slate-700 p-6">
              <span className="block text-[11px] font-bold font-space uppercase text-pastel-navy/60 dark:text-slate-400 tracking-wider mb-3">
                {lang === 'en' ? 'Voice Commands HUD Simulation' : 'Simulasi Perintah Suara (Voice Commands HUD)'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {elCommands.map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={() => runCommand(cmd.id)}
                    className={`flex items-center justify-between gap-2 p-3 rounded-xl border text-xs font-bold font-space transition-all duration-200 transform active:scale-95 ${
                      activeCmd === cmd.id
                        ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy border-pastel-yellow-hover shadow-pastel-sm'
                        : 'bg-white dark:bg-slate-800 border-pastel-blue/50 dark:border-slate-700 text-pastel-navy/80 dark:text-slate-300 hover:bg-pastel-blue/30 dark:hover:bg-slate-750'
                    }`}
                  >
                    <span>{cmd.label}</span>
                    {cmd.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            DEMO 3: VIBEDOC (AI ARCHITECTURE GENERATOR)
            ========================================================= */}
        {activeTab === 'vibedoc' && (
          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-pastel-peach/30 dark:border-slate-700">
                <div>
                  <h3 className="text-xl font-bold font-space text-pastel-navy dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    VibeDoc — AI Architecture Spec Generator in 30s
                  </h3>
                  <p className="text-xs text-pastel-navy/60 dark:text-slate-400 mt-0.5">
                    {lang === 'en'
                      ? 'Compress architecture planning from hours to under 1 second with token-dense LLM structuring'
                      : 'Memotong waktu perencanaan dari berjam-jam menjadi kurang dari 1 detik dengan context-dense prompt structuring'}
                  </p>
                </div>
                <span className="text-xs font-bold font-space bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 py-1 px-3 rounded-full border border-purple-300 dark:border-purple-800">
                  Gemini 2.5 Flash SDK
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold text-pastel-navy/50 dark:text-slate-400">
                  {lang === 'en' ? 'Quick Ideas:' : 'Coba Ide Cepat:'}
                </span>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setRawIdea(p.idea)}
                    className="text-xs font-bold bg-pastel-bg dark:bg-slate-900 hover:bg-pastel-peach/40 dark:hover:bg-slate-800 border border-pastel-navy/15 dark:border-slate-700 text-pastel-navy/80 dark:text-slate-300 py-1 px-3 rounded-xl transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  value={rawIdea}
                  onChange={(e) => setRawIdea(e.target.value)}
                  placeholder="Ketik ide produk atau sistem yang ingin diarsiteki..."
                  className="flex-grow p-3.5 rounded-2xl border-2 border-pastel-peach dark:border-slate-700 focus:border-purple-400 outline-none font-semibold text-sm text-pastel-navy dark:text-white bg-pastel-bg/50 dark:bg-slate-900"
                />
                <button
                  onClick={handleGenerateVibe}
                  disabled={isGeneratingVibe}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-pastel-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGeneratingVibe ? 'Architecting...' : 'Generate Spec'}</span>
                </button>
              </div>

              {generatedDoc && (
                <div className="bg-[#121622] rounded-2xl p-5 border border-purple-400/30 text-emerald-300 font-mono text-xs max-h-72 overflow-y-auto relative">
                  <div className="flex justify-between items-center pb-2 mb-3 border-b border-white/10">
                    <span className="text-[11px] text-sky-300 font-bold uppercase tracking-wider">// SPEC PREVIEW (READY FOR CURSOR/ANTIGRAVITY)</span>
                    <button
                      onClick={handleCopyDoc}
                      className="bg-purple-500/30 hover:bg-purple-500/50 border border-purple-400/50 text-purple-200 text-xs font-bold py-1 px-3 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Tersalin!' : 'Copy Markdown'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed">{generatedDoc}</pre>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-pastel-peach/30 dark:border-slate-700 flex justify-between items-center text-xs font-semibold text-pastel-navy/50 dark:text-slate-400">
              <span>Token Density Efficiency: ~1,240 tokens</span>
              <span>100% LLM Agent Context Window Compatible</span>
            </div>
          </div>
        )}

        {/* =========================================================
            DEMO 4: VAULTSENTINEL (OFFLINE ENCRYPTED BACKUP)
            ========================================================= */}
        {activeTab === 'vaultsentinel' && (
          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-pastel-peach/30 dark:border-slate-700">
                <div>
                  <h3 className="text-xl font-bold font-space text-pastel-navy dark:text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    VaultSentinel — Offline Encrypted Backup Automation
                  </h3>
                  <p className="text-xs text-pastel-navy/60 dark:text-slate-400 mt-0.5">
                    Python 3.10+, FastAPI, AES-128 Fernet + PBKDF2HMAC (100k iters), SHA-256 Incremental Hashing
                  </p>
                </div>
                <button
                  onClick={handleDownloadReport}
                  className="bg-white dark:bg-slate-900 border-2 border-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 text-amber-900 dark:text-amber-300 font-bold text-xs py-2 px-3.5 rounded-xl shadow-pastel-sm flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Export Report (.md)' : 'Ekspor Laporan (.md)'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-pastel-bg dark:bg-slate-900 p-4 rounded-2xl border border-pastel-navy/10 dark:border-slate-700 text-center">
                  <span className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase mb-1">CPU Load Metric</span>
                  <span className={`font-space font-extrabold text-2xl ${cpuMetric > 80 ? 'text-red-600 animate-pulse' : 'text-pastel-blue-dark dark:text-sky-400'}`}>
                    {cpuMetric}%
                  </span>
                  <div className="w-full bg-white dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden border border-pastel-navy/5 dark:border-slate-700">
                    <div className={`h-full ${cpuMetric > 80 ? 'bg-red-500' : 'bg-pastel-blue-dark dark:bg-sky-400'}`} style={{ width: `${cpuMetric}%` }}></div>
                  </div>
                </div>

                <div className="bg-pastel-bg dark:bg-slate-900 p-4 rounded-2xl border border-pastel-navy/10 dark:border-slate-700 text-center">
                  <span className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase mb-1">RAM Allocated</span>
                  <span className="font-space font-extrabold text-2xl text-amber-600 dark:text-amber-400">{ramMetric}%</span>
                  <div className="w-full bg-white dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden border border-pastel-navy/5 dark:border-slate-700">
                    <div className="h-full bg-amber-500" style={{ width: `${ramMetric}%` }}></div>
                  </div>
                </div>

                <div className="bg-pastel-bg dark:bg-slate-900 p-4 rounded-2xl border border-pastel-navy/10 dark:border-slate-700 text-center">
                  <span className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase mb-1">Automated Test Coverage</span>
                  <span className="font-space font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">95.84%</span>
                  <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-1.5">83/83 Pytest Passing</span>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 border-2 border-pastel-peach/70 dark:border-slate-700 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-wider mb-1">PBKDF2 Salt Passphrase</label>
                  <input
                    type="password"
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-pastel-navy/20 dark:border-slate-700 font-mono text-xs text-pastel-navy dark:text-white bg-pastel-bg dark:bg-slate-800"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSimulateLoad}
                    className="flex-1 sm:flex-initial bg-pastel-bg dark:bg-slate-800 hover:bg-pastel-peach/40 border border-pastel-navy/15 dark:border-slate-700 text-pastel-navy dark:text-slate-200 font-bold text-xs py-3 px-4 rounded-xl transition-colors"
                  >
                    Simulasi Stress Test
                  </button>
                  <button
                    onClick={handleTriggerBackup}
                    disabled={isBackupRunning}
                    className="flex-1 sm:flex-initial bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-pastel-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isBackupRunning ? 'animate-spin' : ''}`} />
                    <span>{isBackupRunning ? 'Mencadangkan...' : 'Jalankan Backup'}</span>
                  </button>
                </div>
              </div>

              {backupManifest && (
                <div className="mt-4 p-4 rounded-xl bg-[#121622] text-emerald-400 font-mono text-xs">
                  <div className="text-sky-300 font-bold mb-1">// BACKUP COMPLETED TO .vault_manifest.json</div>
                  <div>Status: <span className="text-emerald-300 font-bold">{backupManifest.status}</span></div>
                  <div>Files Scanned: {backupManifest.filesScanned} | Encrypted: {backupManifest.filesEncrypted}</div>
                  <div>Encryption: {backupManifest.encryption}</div>
                  <div className="truncate text-gray-400">SHA-256 Digest: {backupManifest.hashDigest}</div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-pastel-peach/30 dark:border-slate-700 flex justify-between items-center text-xs font-semibold text-pastel-navy/50 dark:text-slate-400">
              <span>Claymorphism 3D Dashboard Ready</span>
              <span>100% Offline-First Architecture</span>
            </div>
          </div>
        )}

        {/* =========================================================
            DEMO 5: SALIN GAYA (LOGISTICS & PAYMENT GATEWAY)
            ========================================================= */}
        {activeTab === 'salin_gaya' && (
          <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-5">
                <h3 className="text-xl font-bold font-space text-pastel-navy dark:text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-pastel-pink" />
                  Kalkulator Logistik & Order Thrifting
                </h3>

                <div>
                  <label className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Apparel Weight (kg):' : 'Berat Pakaian (kg):'}{' '}
                    <span className="text-pastel-blue-dark dark:text-sky-400 font-space text-sm font-extrabold">{weight} kg</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-pastel-blue dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pastel-blue-dark dark:accent-sky-400"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-pastel-navy/40 dark:text-slate-500 mt-1">
                    <span>1 kg</span>
                    <span>5 kg</span>
                    <span>10 kg</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Shipping Destination' : 'Tujuan Wilayah Pengiriman'}
                  </label>
                  <select
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full p-3 rounded-xl border-2 border-pastel-peach dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold text-sm text-pastel-navy dark:text-white"
                  >
                    {Object.entries(distanceCosts).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.label} - Rp{val.cost.toLocaleString('id-ID')}/kg
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Payment Method' : 'Metode Pembayaran'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPayMethod('snap')}
                      className={`py-2.5 px-3 rounded-xl border-2 font-bold text-xs font-space transition-colors ${
                        payMethod === 'snap'
                          ? 'bg-pastel-blue/50 dark:bg-sky-950 border-pastel-blue-dark dark:border-sky-400 text-pastel-blue-dark dark:text-sky-300'
                          : 'bg-white dark:bg-slate-900 border-pastel-peach/50 dark:border-slate-700 text-pastel-navy/70 dark:text-slate-300 hover:bg-pastel-peach/20'
                      }`}
                    >
                      Midtrans SNAP
                    </button>
                    <button
                      onClick={() => setPayMethod('qris')}
                      className={`py-2.5 px-3 rounded-xl border-2 font-bold text-xs font-space transition-colors ${
                        payMethod === 'qris'
                          ? 'bg-pastel-pink/30 dark:bg-rose-950 border-pastel-pink dark:border-rose-400 text-pastel-pink dark:text-rose-300'
                          : 'bg-white dark:bg-slate-900 border-pastel-peach/50 dark:border-slate-700 text-pastel-navy/70 dark:text-slate-300 hover:bg-pastel-peach/20'
                      }`}
                    >
                      QRIS Manual
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-pastel-bg dark:bg-slate-900 border-2 border-pastel-peach/60 dark:border-slate-700 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-pastel-navy/40 dark:text-slate-500 uppercase tracking-wider mb-3">// ORDER SUMMARY</span>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2 dark:text-slate-200">
                    <span>1x Custom Flannel Grade A</span>
                    <span>Rp{itemPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2 border-b border-dashed border-pastel-navy/10 dark:border-slate-700 pb-2 dark:text-slate-200">
                    <span>Ongkir ({weight}kg x {distanceCosts[distance].label})</span>
                    <span>Rp{shippingCost.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-extrabold text-pastel-navy dark:text-white mt-4">
                    <span>TOTAL TAGIHAN</span>
                    <span className="text-pastel-blue-dark dark:text-sky-400 font-space">Rp{totalCost.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center justify-center min-h-[130px] border border-dashed border-pastel-peach/80 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 p-4">
                  {orderStatus === 'idle' && (
                    <div className="text-center w-full">
                      <button
                        onClick={handlePay}
                        className="w-full bg-pastel-pink dark:bg-rose-500 hover:bg-pastel-pink/80 text-pastel-navy dark:text-white font-bold py-3 rounded-xl shadow-pastel-sm transition-all"
                      >
                        {lang === 'en' ? 'Pay Now' : 'Bayar Sekarang'}
                      </button>
                    </div>
                  )}

                  {orderStatus === 'paying' && (
                    <div className="text-center w-full flex flex-col items-center">
                      {payLog && <p className="text-xs font-mono text-pastel-navy/70 dark:text-slate-300 mb-3 animate-pulse">{payLog}</p>}
                      {payMethod === 'snap' ? (
                        <div className="border border-pastel-blue dark:border-sky-700 rounded-xl p-3 bg-pastel-blue/10 dark:bg-sky-950/40 w-full">
                          <span className="block text-xs font-bold text-pastel-blue-dark dark:text-sky-300 mb-2">Popup SNAP Simulator</span>
                          <button
                            onClick={handlePaySuccess}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-5 rounded-lg transition-colors"
                          >
                            Simulasikan Sukses Transfer
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="bg-white border-2 border-pastel-navy p-1.5 rounded-lg w-20 h-20 flex flex-col items-center justify-center text-[9px] font-bold">
                            <span className="text-red-600 font-extrabold">QRIS</span>
                            <div className="grid grid-cols-3 gap-0.5 w-14 h-14 bg-gray-200">
                              <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                              <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
                              <div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div>
                            </div>
                          </div>
                          <button
                            onClick={handlePaySuccess}
                            className="bg-pastel-yellow dark:bg-amber-400 border border-pastel-yellow-hover text-pastel-navy font-bold text-xs py-1.5 px-4 rounded-lg shadow-pastel-sm hover:scale-105 transition-transform"
                          >
                            Simulasikan Bayar QRIS
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {orderStatus === 'paid' && (
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center p-2.5 bg-pastel-green dark:bg-emerald-950 rounded-full mb-2">
                        <Check className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      </span>
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-space">
                        {lang === 'en' ? 'PAID! Order successfully recorded in Firebase.' : 'LUNAS! Order Berhasil Dicatat di Firebase.'}
                      </p>
                      <button
                        onClick={() => setOrderStatus('idle')}
                        className="text-[10px] font-bold text-pastel-navy/40 dark:text-slate-400 hover:text-pastel-navy dark:hover:text-white mt-2 underline block mx-auto"
                      >
                        Reset Simulator
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            DEMO 6: LIBRARYPRO (MVC ARCH & FUZZY SEARCH)
            ========================================================= */}
        {activeTab === 'library_pro' && (
          <div className="flex flex-col justify-between flex-grow h-full">
            {libraryRole === 'gate' && (
              <div className="flex flex-col items-center justify-center flex-grow p-10 text-center bg-pastel-bg dark:bg-slate-900">
                <BookOpen className="w-14 h-14 text-pastel-blue-dark dark:text-sky-400 mb-3 animate-bounce-soft" />
                <h3 className="text-2xl font-bold font-space text-pastel-navy dark:text-white mb-1.5">Portal LibraryPro & Organisasi</h3>
                <p className="text-xs md:text-sm text-pastel-navy/60 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
                  Refleksi Java MVC Web Architecture & HMIF Executive Portal. Pilih peran untuk mencoba simulasi sirkulasi buku.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-md">
                  <button
                    onClick={() => setLibraryRole('admin')}
                    className="flex-1 bg-white dark:bg-slate-800 border-2 border-pastel-yellow dark:border-amber-400/50 hover:bg-pastel-yellow dark:hover:bg-amber-400 text-pastel-navy dark:text-slate-200 dark:hover:text-pastel-navy font-bold py-3 px-5 rounded-2xl shadow-pastel-sm transition-all"
                  >
                    Masuk Pustakawan (Admin)
                  </button>
                  <button
                    onClick={() => setLibraryRole('anggota')}
                    className="flex-1 bg-white dark:bg-slate-800 border-2 border-pastel-blue dark:border-sky-500/50 hover:bg-pastel-blue dark:hover:bg-sky-500 text-pastel-navy dark:text-slate-200 dark:hover:text-white font-bold py-3 px-5 rounded-2xl shadow-pastel-sm transition-all"
                  >
                    Masuk Anggota (Member)
                  </button>
                </div>
              </div>
            )}

            {libraryRole === 'admin' && (
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-5 border-b border-pastel-peach/30 dark:border-slate-700 pb-3">
                    <span className="text-sm font-bold font-space text-pastel-navy dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5 text-pastel-blue-dark dark:text-sky-400" />
                      Dashboard Pustakawan (Admin MVC)
                    </span>
                    <button
                      onClick={() => setLibraryRole('gate')}
                      className="text-xs font-bold text-pastel-navy/50 dark:text-slate-400 hover:text-pastel-navy dark:hover:text-white underline"
                    >
                      Kembali ke Portal
                    </button>
                  </div>

                  <h4 className="text-xs font-bold font-space uppercase text-pastel-navy/50 dark:text-slate-400 tracking-wider mb-3">// Validasi Peminjaman Pending</h4>
                  
                  <div className="flex flex-col gap-3">
                    {borrowRequests.filter(req => req.status === 'Pending').length === 0 ? (
                      <div className="p-6 border border-dashed border-pastel-blue/40 dark:border-slate-700 bg-pastel-bg dark:bg-slate-900 rounded-xl text-center">
                        <span className="text-xs font-semibold text-pastel-navy/40 dark:text-slate-400">Tidak ada pengajuan pinjaman pending saat ini!</span>
                      </div>
                    ) : (
                      borrowRequests.map(req => (
                        <div key={req.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3.5 border border-pastel-peach dark:border-slate-700 bg-pastel-peach/10 dark:bg-slate-900/60 rounded-2xl gap-3">
                          <div>
                            <span className="block text-[11px] font-bold text-pastel-navy/40 dark:text-slate-400 font-mono">ID: #{req.id} | Tanggal: {req.date}</span>
                            <span className="block text-xs md:text-sm font-bold text-pastel-navy dark:text-slate-200">{req.name} <span className="font-normal text-pastel-navy/60 dark:text-slate-400">meminjam</span> "{req.book}"</span>
                          </div>
                          
                          {req.status === 'Pending' ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApproveRequest(req.id, req.book)}
                                className="flex items-center gap-1 bg-pastel-green dark:bg-emerald-900 border border-emerald-600/30 text-emerald-800 dark:text-emerald-200 font-bold text-xs py-1.5 px-3.5 rounded-xl hover:bg-emerald-200 transition-colors"
                              >
                                <Check className="w-3.5 h-3.5" /> Setujui
                              </button>
                              <button
                                onClick={() => handleRejectRequest(req.id)}
                                className="flex items-center gap-1 bg-pastel-pink dark:bg-rose-900 border border-red-400/30 text-red-700 dark:text-rose-200 font-bold text-xs py-1.5 px-3.5 rounded-xl hover:bg-red-200 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" /> Tolak
                              </button>
                            </div>
                          ) : (
                            <span className={`text-xs font-bold py-1 px-3 rounded-full ${
                              req.status === 'Approved' ? 'bg-pastel-green/80 text-emerald-800' : 'bg-pastel-pink/80 text-red-700'
                            }`}>
                              {req.status}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-pastel-peach/30 dark:border-slate-700 pt-3 flex justify-between items-center text-xs font-semibold text-pastel-navy/50 dark:text-slate-400">
                  <span>Stok Buku "Refactoring": {bookList.find(b => b.id === 102).stock} exp</span>
                  <span>*Persetujuan Admin langsung memotong stok di basis data MySQL.</span>
                </div>
              </div>
            )}

            {libraryRole === 'anggota' && (
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-center mb-4 border-b border-pastel-peach/30 dark:border-slate-700 pb-3">
                    <span className="text-sm font-bold font-space text-pastel-navy dark:text-white flex items-center gap-1.5">
                      <BookOpen className="w-5 h-5 text-pastel-blue-dark dark:text-sky-400" />
                      Dashboard Anggota Perpustakaan
                    </span>
                    <button
                      onClick={() => setLibraryRole('gate')}
                      className="text-xs font-bold text-pastel-navy/50 dark:text-slate-400 hover:text-pastel-navy dark:hover:text-white underline"
                    >
                      Kembali ke Portal
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      {lang === 'en' ? 'Fuzzy Search Catalog (Typo-Tolerant)' : 'Fuzzy Search Katalog (Toleransi Typo Levenshtein)'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fuzzyQuery}
                        onChange={(e) => setFuzzyQuery(e.target.value)}
                        placeholder={lang === 'en' ? "Try typing 'codo', 'cln', 'refa'..." : "Coba ketik 'codo', 'cln', 'refa', 'comp'..."}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-pastel-blue dark:border-slate-700 focus:border-pastel-blue-dark dark:focus:border-sky-400 outline-none font-semibold text-xs md:text-sm text-pastel-navy dark:text-white bg-white dark:bg-slate-900"
                      />
                      <Search className="w-4 h-4 text-pastel-navy/40 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {memberMessage && (
                    <div className="mb-3 p-2.5 bg-pastel-green/70 dark:bg-emerald-950 border border-emerald-600/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-space animate-pulse rounded-xl">
                      {memberMessage}
                    </div>
                  )}

                  <div className="flex flex-col gap-2.5">
                    {filteredBooks.map(book => (
                      <div key={book.id} className="flex justify-between items-center p-3 border border-pastel-blue/40 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl">
                        <div>
                          <span className="block font-bold text-pastel-navy dark:text-white text-xs md:text-sm">{book.title}</span>
                          <span className="text-[11px] text-pastel-navy/50 dark:text-slate-400 font-semibold">Stok: {book.stock} exp | Rating: ⭐ {book.rating}</span>
                        </div>
                        <button
                          onClick={() => handleMemberBorrow(book.title, book.stock)}
                          disabled={book.stock <= 0}
                          className={`py-1.5 px-3.5 rounded-lg font-bold text-xs transition-colors shadow-pastel-sm ${
                            book.stock > 0
                              ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy hover:scale-105'
                              : 'bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {book.stock > 0 ? (lang === 'en' ? 'Borrow Book' : 'Ajukan Pinjam') : (lang === 'en' ? 'Out of Stock' : 'Stok Habis')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-pastel-peach/30 dark:border-slate-700 pt-3 flex justify-between items-center text-xs font-semibold text-pastel-navy/40 dark:text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-pastel-blue-dark dark:text-sky-400" /> Geolocation: Telkom University Purwokerto</span>
                  <span>Denda: Rp0</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

function Copy(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
