import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import {
  Search, Terminal, CornerDownLeft, X,
  Moon, Sun, Volume2, VolumeX, Globe, FolderGit2, Play, ExternalLink,
  Cpu, User, Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ALL_PROJECTS } from '../data/projectsData';

function CommandPalette({ triggerGlobalEffect }) {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isDark,
    toggleTheme,
    lang,
    toggleLang,
    soundEnabled,
    toggleSound,
    playSound,
    setSelectedProjectForModal,
    jumpToChapter,
  } = usePortfolio();

  const [mode, setMode] = useState('search'); // 'search' | 'terminal'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Fatir Gibran Edge-AI OS v2.5.0 (x86_64-apple-darwin)' },
    { type: 'system', text: 'Type "help" to see available terminal commands or switch to Search tab.' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  const inputRef = useRef(null);

  const scrollTo = useCallback((id) => {
    setIsCommandPaletteOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [setIsCommandPaletteOpen]);

  // Global keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => {
          const next = !prev;
          playSound(next ? 'modal' : 'click');
          return next;
        });
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
        playSound('click');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen, playSound]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen, mode]);

  // Auto scroll terminal
  useEffect(() => {
    if (mode === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, mode]);

  // Search Results
  const navigationItems = useMemo(() => [
    { id: 'hero', title: lang === 'id' ? 'Beranda' : 'Home', category: 'Navigasi', icon: <User className="w-4 h-4" />, action: () => scrollTo('hero') },
    { id: 'tentang', title: lang === 'id' ? 'Tentang Fatir' : 'About Fatir', category: 'Navigasi', icon: <User className="w-4 h-4" />, action: () => scrollTo('tentang') },
    { id: 'proyek', title: lang === 'id' ? 'Galeri Proyek (20 Proyek)' : 'Projects Gallery (20 Projects)', category: 'Navigasi', icon: <FolderGit2 className="w-4 h-4" />, action: () => scrollTo('proyek') },
    { id: 'the-builders-journey', title: lang === 'id' ? "The Builder's Journey" : "The Builder's Journey", category: 'Navigasi', icon: <Play className="w-4 h-4" />, action: () => scrollTo('the-builders-journey') },
    { id: 'keterampilan', title: lang === 'id' ? 'Tech Stack & Keahlian' : 'Skills & Tech Stack', category: 'Navigasi', icon: <Cpu className="w-4 h-4" />, action: () => scrollTo('keterampilan') },
    { id: 'kontak', title: lang === 'id' ? 'Hubungi Fatir' : 'Contact Fatir', category: 'Navigasi', icon: <ExternalLink className="w-4 h-4" />, action: () => scrollTo('kontak') },
  ], [lang, scrollTo]);

  const quickActionItems = useMemo(() => [
    {
      id: 'theme',
      title: isDark ? (lang === 'id' ? 'Ganti ke Mode Terang' : 'Switch to Light Mode') : (lang === 'id' ? 'Ganti ke Mode Gelap' : 'Switch to Dark Mode'),
      category: 'Aksi Sistem',
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />,
      action: () => { toggleTheme(); setIsCommandPaletteOpen(false); }
    },
    {
      id: 'sound',
      title: soundEnabled ? (lang === 'id' ? 'Matikan Efek Suara' : 'Mute Sound Effects') : (lang === 'id' ? 'Aktifkan Efek Suara' : 'Unmute Sound Effects'),
      category: 'Aksi Sistem',
      icon: soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-rose-500" />,
      action: () => { toggleSound(); }
    },
    {
      id: 'pass',
      title: lang === 'id' ? 'Buka 3D Holographic Developer Pass' : 'Open 3D Holographic Developer Pass',
      category: 'Aksi Sistem',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        scrollTo('hero');
      }
    },
    {
      id: 'lang',
      title: lang === 'id' ? 'Switch to English Language' : 'Ganti ke Bahasa Indonesia',
      category: 'Aksi Sistem',
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      action: () => { toggleLang(); }
    },
  ], [isDark, lang, soundEnabled, toggleTheme, toggleSound, toggleLang, setIsCommandPaletteOpen, scrollTo]);

  const projectItems = useMemo(() => {
    return ALL_PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      title: p.title,
      subtitle: `${p.role} • ${p.tech.slice(0, 3).join(', ')}`,
      category: 'Proyek',
      icon: <FolderGit2 className="w-4 h-4 text-pastel-blue-dark dark:text-sky-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        setSelectedProjectForModal(p);
      }
    }));
  }, [setSelectedProjectForModal, setIsCommandPaletteOpen]);

  const demoItems = useMemo(() => [
    {
      id: 'journey-00',
      title: 'Journey: CH.00 The Arrival',
      subtitle: 'Opening hook & identity declaration',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-sky-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('00');
      }
    },
    {
      id: 'journey-01',
      title: 'Journey: CH.01 The Identity',
      subtitle: 'The person behind the code & core pillars',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('01');
      }
    },
    {
      id: 'journey-02',
      title: 'Journey: CH.02 The Evolution',
      subtitle: 'Academic and technical milestones (2023 - 2026)',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-blue-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('02');
      }
    },
    {
      id: 'journey-03',
      title: 'Journey: CH.03 The Mindset',
      subtitle: 'Engineering mindset across 5 core disciplines',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-purple-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('03');
      }
    },
    {
      id: 'journey-04',
      title: "Journey: CH.04 The Builder's Lab",
      subtitle: 'Showcase and directory of 20 verified systems',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-amber-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('04');
      }
    },
    {
      id: 'journey-05',
      title: 'Journey: CH.05 Beyond the Code',
      subtitle: 'Leadership, collaboration, communication & problem-solving',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-rose-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('05');
      }
    },
    {
      id: 'journey-06',
      title: 'Journey: CH.06 The Next Frontier',
      subtitle: 'WebGPU, zero-trust storage & distributed edge mesh',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('06');
      }
    },
    {
      id: 'journey-07',
      title: 'Journey: CH.07 The Connection',
      subtitle: 'Every great build starts with a conversation',
      category: "The Builder's Journey",
      icon: <Play className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setIsCommandPaletteOpen(false);
        jumpToChapter('07');
      }
    },
  ], [jumpToChapter, setIsCommandPaletteOpen]);

  const allSearchable = useMemo(() => {
    return [...demoItems, ...quickActionItems, ...navigationItems, ...projectItems];
  }, [demoItems, quickActionItems, navigationItems, projectItems]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allSearchable;
    const q = searchQuery.toLowerCase();
    return allSearchable.filter(
      item => item.title.toLowerCase().includes(q) || (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  }, [searchQuery, allSearchable]);

  const handleSelect = (item) => {
    playSound('tab');
    item.action();
  };

  // Keyboard navigation inside search list
  const handleKeyDownList = (e) => {
    if (mode !== 'search') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      playSound('click');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      playSound('click');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  // Handle Terminal execution
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playSound('click');
    const newHistory = [...terminalHistory, { type: 'input', text: `fatir@edge-ai:~$ ${terminalInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'Daftar Perintah Tersedia:' },
          { type: 'output', text: '  about        - Profil, keahlian teknis & latar belakang Fatir' },
          { type: 'output', text: '  skills       - Ringkasan keahlian Full-Stack & Edge AI' },
          { type: 'output', text: '  projects     - Daftar portofolio proyek unggulan' },
          { type: 'output', text: '  ping         - Cek status latensi edge node' },
          { type: 'output', text: '  contact      - Informasi kontak & media sosial resmi' },
          { type: 'output', text: '  confetti     - [VISUAL] Ledakan partikel konfeti di layar' },
          { type: 'output', text: '  laser        - [VISUAL] Aktifkan pointer laser merah kursor' },
          { type: 'output', text: '  curtain      - [VISUAL] Tutup & buka tirai siber' },
          { type: 'output', text: '  blackout     - [VISUAL] Simulasi layar padam' },
          { type: 'output', text: '  reset        - Reset semua efek visual simulator' },
          { type: 'output', text: '  sudo hire    - [RECRUITER] Buka jalur prioritas recruitment' },
          { type: 'output', text: '  theme        - Toggle antara Dark Mode / Light Mode' },
          { type: 'output', text: '  clear        - Bersihkan riwayat layar terminal' }
        );
        break;

      case 'about':
        newHistory.push(
          { type: 'output', text: 'Nama     : Fatir Gibran' },
          { type: 'output', text: 'Role     : Software & Edge AI Engineer | Systems Architect' },
          { type: 'output', text: 'Kampus   : Telkom University Purwokerto (Teknik Informatika)' },
          { type: 'output', text: 'Fokus    : On-Device AI, Computer Vision, Cybersecurity & Network Infrastructure' }
        );
        break;

      case 'skills':
        newHistory.push(
          { type: 'output', text: '[FRONTEND] React 19, Next.js 15, Tailwind CSS, Three.js, Vite' },
          { type: 'output', text: '[BACKEND]  FastAPI, Python, Node.js, Firebase, Supabase, Docker' },
          { type: 'output', text: '[EDGE AI]  MediaPipe, YOLOv8, DeepSORT, WebAssembly, Web Audio API' },
          { type: 'output', text: '[SECURITY] Cryptography (Fernet/AES-128, PBKDF2), Network Packet Analysis' }
        );
        break;

      case 'projects':
        newHistory.push(
          { type: 'output', text: '1. PostureLens - Real-time Ergonomics & Posture AI (100% On-Device)' },
          { type: 'output', text: '2. el_gestur_v2 - Hands-free Presentation AI (YOLOv8 + MediaPipe)' },
          { type: 'output', text: '3. VaultSentinel - Local Encrypted Backup Automation (95.8% Test Coverage)' },
          { type: 'output', text: '4. VibeDoc - Context-dense AI PRD & Architecture Generator' },
          { type: 'output', text: 'Ketik salah satu judul proyek di Search Tab untuk melihat diagram arsitektur.' }
        );
        break;

      case 'ping':
        newHistory.push(
          { type: 'output', text: 'PING fatirgibran.my.id (Singapore Edge Node): 56 data bytes' },
          { type: 'output', text: '64 bytes from sin02-edge.google.com: icmp_seq=1 ttl=118 time=14.8 ms' },
          { type: 'output', text: '64 bytes from sin02-edge.google.com: icmp_seq=2 ttl=118 time=13.2 ms' },
          { type: 'output', text: '--- fatirgibran.my.id ping statistics ---' },
          { type: 'output', text: '2 packets transmitted, 2 received, 0% packet loss, avg = 14.0ms' }
        );
        break;

      case 'contact':
        newHistory.push(
          { type: 'output', text: 'Email     : fatirgibrann@gmail.com' },
          { type: 'output', text: 'LinkedIn  : linkedin.com/in/FatirGibran' },
          { type: 'output', text: 'GitHub    : github.com/Fatirrr08' },
          { type: 'output', text: 'Instagram : @spicytir' }
        );
        break;

      case 'confetti':
      case 'konfeti':
        if (triggerGlobalEffect) triggerGlobalEffect('konfeti');
        playSound('success');
        newHistory.push({ type: 'output-highlight', text: '🎊 Confetti particle burst triggered across page!' });
        break;

      case 'laser':
      case 'pena':
        if (triggerGlobalEffect) triggerGlobalEffect('pena');
        playSound('success');
        newHistory.push({ type: 'output-highlight', text: '🔴 Red Laser Pointer active! Move your mouse (10s timer).' });
        break;

      case 'curtain':
      case 'tirai':
        if (triggerGlobalEffect) triggerGlobalEffect('tirai');
        playSound('tab');
        newHistory.push({ type: 'output-highlight', text: '🎭 FATIR GIBRAN system curtain initiated.' });
        break;

      case 'blackout':
      case 'hitam':
        if (triggerGlobalEffect) triggerGlobalEffect('hitam');
        playSound('warn');
        newHistory.push({ type: 'output-highlight', text: '🌑 Blackout mode active. Click "Kembalikan Layar" to restore.' });
        break;

      case 'zoom':
        if (triggerGlobalEffect) triggerGlobalEffect('zoom');
        playSound('tab');
        newHistory.push({ type: 'output-highlight', text: '🔍 Focused zoom fit triggered on projects gallery.' });
        break;

      case 'reset':
      case 'normal':
        if (triggerGlobalEffect) triggerGlobalEffect('normal');
        playSound('click');
        newHistory.push({ type: 'output', text: '🔄 All visual simulator effects reset to default.' });
        break;

      case 'sudo hire':
        playSound('success');
        newHistory.push(
          { type: 'output-highlight', text: '🎉 ACCESS GRANTED: Candidate profile match verified!' },
          { type: 'output-highlight', text: 'Membuka koneksi email langsung ke fatirgibrann@gmail.com...' },
          { type: 'output', text: 'Kamu dialihkan ke draft email dalam 2 detik.' }
        );
        setTimeout(() => {
          window.location.href = 'mailto:fatirgibrann@gmail.com?subject=Offer%20/%20Project%20Inquiry%20for%20Fatir%20Gibran';
        }, 1200);
        break;

      case 'theme':
        toggleTheme();
        newHistory.push({ type: 'output', text: `Tema berhasil diubah menjadi: ${!isDark ? 'Dark Mode' : 'Light Mode'}` });
        break;

      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${cmd}. Ketik "help" untuk melihat perintah yang tersedia.`
        });
        playSound('warn');
        break;
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-fade-in">
      {/* Backdrop click to close */}
      <div
        className="fixed inset-0"
        onClick={() => {
          setIsCommandPaletteOpen(false);
          playSound('click');
        }}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#090D16] border border-slate-200 dark:border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] z-10">
        {/* Header Tabs & Close */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 dark:border-[#1E293B] bg-slate-50/70 dark:bg-[#111624]/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setMode('search'); playSound('tab'); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-space transition-all ${
                mode === 'search'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Quick Finder</span>
            </button>

            <button
              onClick={() => { setMode('terminal'); playSound('tab'); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-space transition-all ${
                mode === 'terminal'
                  ? 'bg-blue-600 dark:bg-cobalt text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Cyber Terminal</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#161D2E] px-2 py-0.5 rounded border border-slate-200 dark:border-[#1E293B]">
              ESC to close
            </span>
            <button
              onClick={() => {
                setIsCommandPaletteOpen(false);
                playSound('click');
              }}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#161D2E] text-slate-500 dark:text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SEARCH MODE */}
        {mode === 'search' && (
          <div className="flex flex-col flex-1 overflow-hidden" onKeyDown={handleKeyDownList}>
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 dark:border-[#1E293B]">
              <Search className="w-5 h-5 text-blue-600 dark:text-sky-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={lang === 'id' ? 'Cari proyek, navigasi, atau aksi (ketik untuk filter)...' : 'Search projects, sections, or actions...'}
                className="w-full bg-transparent text-sm sm:text-base font-space text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5">
              {filteredItems.length === 0 ? (
                <div className="text-center py-10 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
                  Tidak ditemukan hasil untuk "{searchQuery}". Coba beralih ke tab Cyber Terminal.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-[#161D2E] border border-blue-200 dark:border-blue-500/40 shadow-sm translate-x-1'
                          : 'hover:bg-slate-50 dark:hover:bg-[#111624] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-white dark:bg-[#111624] text-blue-600 dark:text-sky-400' : 'bg-slate-100 dark:bg-[#111624] text-slate-600 dark:text-slate-400'}`}>
                          {item.icon}
                        </div>
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-bold font-space text-slate-900 dark:text-white truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#161D2E] px-2 py-0.5 rounded-md border border-slate-200 dark:border-[#1E293B]">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-5 py-2.5 bg-slate-50/70 dark:bg-[#111624]/60 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigasi</span>
                <span>↵ Pilih</span>
              </div>
              <div>
                Mode Terminal: <kbd className="bg-white dark:bg-[#161D2E] px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#1E293B] font-bold">Tab</kbd>
              </div>
            </div>
          </div>
        )}

        {/* TERMINAL MODE */}
        {mode === 'terminal' && (
          <div className="flex flex-col flex-1 bg-[#0d1117] text-[#c9d1d9] font-mono text-xs sm:text-sm p-4 overflow-hidden">
            {/* Output History */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-text">
              {terminalHistory.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line.type === 'system' && (
                    <span className="text-sky-400 font-semibold">{line.text}</span>
                  )}
                  {line.type === 'input' && (
                    <span className="text-amber-400 font-bold">{line.text}</span>
                  )}
                  {line.type === 'output' && (
                    <span className="text-emerald-300">{line.text}</span>
                  )}
                  {line.type === 'output-highlight' && (
                    <span className="text-yellow-300 font-bold">{line.text}</span>
                  )}
                  {line.type === 'error' && (
                    <span className="text-rose-400">{line.text}</span>
                  )}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-3 border-t border-slate-800 mt-2">
              <span className="text-emerald-400 font-bold flex-shrink-0 font-mono">fatir@edge-ai:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Ketik command (contoh: help, skills, ping, sudo hire)..."
                className="w-full bg-transparent text-emerald-300 placeholder-slate-600 focus:outline-none font-mono text-xs sm:text-sm"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CommandPalette);
