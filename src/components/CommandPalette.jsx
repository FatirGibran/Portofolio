import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import {
  Search, Terminal, CornerDownLeft, X,
  Moon, Sun, Volume2, VolumeX, Globe, FolderGit2, Play, ExternalLink,
  Cpu, User
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ALL_PROJECTS } from '../data/projectsData';

function CommandPalette() {
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
    { id: 'simulator', title: lang === 'id' ? 'Interactive Sandbox Demo' : 'Interactive Sandbox Demo', category: 'Navigasi', icon: <Play className="w-4 h-4" />, action: () => scrollTo('simulator') },
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
      id: 'lang',
      title: lang === 'id' ? 'Switch to English Language' : 'Ganti ke Bahasa Indonesia',
      category: 'Aksi Sistem',
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      action: () => { toggleLang(); }
    },
  ], [isDark, lang, soundEnabled, toggleTheme, toggleSound, toggleLang, setIsCommandPaletteOpen]);

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

  const allSearchable = useMemo(() => {
    return [...quickActionItems, ...navigationItems, ...projectItems];
  }, [quickActionItems, navigationItems, projectItems]);

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
          { type: 'output', text: '  about        - Profil, jabatan HMIF & background Fatir' },
          { type: 'output', text: '  skills       - Ringkasan keahlian Full-Stack & Edge AI' },
          { type: 'output', text: '  projects     - Daftar portofolio proyek unggulan' },
          { type: 'output', text: '  ping         - Cek status latensi edge node' },
          { type: 'output', text: '  contact      - Informasi kontak & media sosial resmi' },
          { type: 'output', text: '  sudo hire    - [RECRUITER] Buka jalur prioritas recruitment' },
          { type: 'output', text: '  theme        - Toggle antara Dark Mode / Light Mode' },
          { type: 'output', text: '  clear        - Bersihkan riwayat layar terminal' }
        );
        break;

      case 'about':
        newHistory.push(
          { type: 'output', text: 'Nama     : Fatir Gibran' },
          { type: 'output', text: 'Role     : Chairman of HMIF | Full-Stack & Edge AI Engineer' },
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

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border-2 border-pastel-yellow dark:border-amber-400/60 rounded-3xl shadow-pastel-lg overflow-hidden flex flex-col max-h-[82vh] z-10">
        {/* Header Tabs & Close */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-pastel-peach/30 dark:border-slate-800 bg-pastel-bg/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setMode('search'); playSound('tab'); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold font-space transition-all ${
                mode === 'search'
                  ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy shadow-pastel-sm'
                  : 'text-pastel-navy/60 dark:text-slate-400 hover:text-pastel-navy dark:hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Quick Finder</span>
            </button>

            <button
              onClick={() => { setMode('terminal'); playSound('tab'); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold font-space transition-all ${
                mode === 'terminal'
                  ? 'bg-pastel-blue-dark dark:bg-sky-500 text-white shadow-pastel-sm'
                  : 'text-pastel-navy/60 dark:text-slate-400 hover:text-pastel-navy dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Cyber Terminal</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold text-pastel-navy/40 dark:text-slate-500 bg-pastel-bg dark:bg-slate-800 px-2 py-0.5 rounded border border-pastel-navy/10 dark:border-slate-700">
              ESC to close
            </span>
            <button
              onClick={() => {
                setIsCommandPaletteOpen(false);
                playSound('click');
              }}
              className="p-1.5 rounded-full hover:bg-pastel-peach/40 dark:hover:bg-slate-800 text-pastel-navy dark:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SEARCH MODE */}
        {mode === 'search' && (
          <div className="flex flex-col flex-1 overflow-hidden" onKeyDown={handleKeyDownList}>
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-pastel-peach/20 dark:border-slate-800">
              <Search className="w-5 h-5 text-pastel-blue-dark dark:text-sky-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={lang === 'id' ? 'Cari proyek, navigasi, atau aksi (ketik untuk filter)...' : 'Search projects, sections, or actions...'}
                className="w-full bg-transparent text-sm sm:text-base font-space text-pastel-navy dark:text-white placeholder-pastel-navy/40 dark:placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5">
              {filteredItems.length === 0 ? (
                <div className="text-center py-10 text-xs sm:text-sm text-pastel-navy/60 dark:text-slate-400 font-mono">
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
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-pastel-blue/60 dark:bg-sky-950/70 border border-pastel-blue-dark/40 dark:border-sky-500/50 shadow-pastel-sm translate-x-1'
                          : 'hover:bg-pastel-peach/20 dark:hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-white dark:bg-slate-800 text-pastel-blue-dark dark:text-sky-400' : 'bg-pastel-bg dark:bg-slate-800 text-pastel-navy/70 dark:text-slate-400'}`}>
                          {item.icon}
                        </div>
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-bold font-space text-pastel-navy dark:text-white truncate">
                            {item.title}
                          </div>
                          {item.subtitle && (
                            <div className="text-[11px] text-pastel-navy/60 dark:text-slate-400 truncate">
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-pastel-navy/50 dark:text-slate-500 bg-white/70 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-pastel-navy/10 dark:border-slate-700">
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-pastel-blue-dark dark:text-sky-400" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-5 py-2.5 bg-pastel-bg/40 dark:bg-slate-950/40 border-t border-pastel-peach/20 dark:border-slate-800 flex items-center justify-between text-[11px] text-pastel-navy/50 dark:text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigasi</span>
                <span>↵ Pilih</span>
              </div>
              <div>
                Mode Terminal: <kbd className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-pastel-navy/20 dark:border-slate-700 font-bold">Tab</kbd>
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
