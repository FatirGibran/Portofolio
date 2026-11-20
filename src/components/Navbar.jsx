import React, { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, Sun, Moon, Globe, Search, Volume2, VolumeX } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// The Monolithic Node - Insignia FG (Direction A)
const InsigniaFG = memo(({ className = "w-8 h-8" }) => (
  <div className={`relative flex items-center justify-center ${className} group`}>
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform-gpu transition-transform duration-200 group-hover:scale-105">
      {/* Precision Squircle Frame */}
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="9"
        className="fill-slate-900 dark:fill-white stroke-slate-800 dark:stroke-slate-200"
        strokeWidth="1.2"
      />
      {/* Geometric Interlocking FG Monogram Paths */}
      <path
        d="M11 11H23M11 11V25M11 18H20"
        className="stroke-white dark:stroke-slate-900"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 21V25H18"
        className="stroke-white dark:stroke-slate-900"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Electric Cobalt Precision Telemetry Node */}
      <circle cx="25" cy="11" r="2.2" fill="#0066FF" />
    </svg>
  </div>
));

// Map nav item to Odyssey scene
const NAV_TO_SCENE_MAP = {
  tentang: '01',
  proyek: '04',
  keterampilan: '03',
  kontak: '07',
};

function Navbar() {
  const {
    isDark,
    toggleTheme,
    lang,
    toggleLang,
    soundEnabled,
    toggleSound,
    playSound,
    setIsCommandPaletteOpen,
    experienceMode,
    toggleExperienceMode,
    odysseyScene,
    goToScene,
    t
  } = usePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'tentang', label: t.nav.about, sceneId: '01' },
    { id: 'proyek', label: t.nav.projects, sceneId: '04' },
    { id: 'keterampilan', label: t.nav.skills, sceneId: '03' },
    { id: 'kontak', label: t.nav.contact, sceneId: '07' },
  ];

  // Compute active navigation highlight
  const activeNavId = useMemo(() => {
    if (experienceMode === 'odyssey') {
      if (odysseyScene === '01' || odysseyScene === '02') return 'tentang';
      if (odysseyScene === '04') return 'proyek';
      if (odysseyScene === '03') return 'keterampilan';
      if (odysseyScene === '05' || odysseyScene === '06' || odysseyScene === '07') return 'kontak';
      return 'hero';
    }
    return activeSection;
  }, [experienceMode, odysseyScene, activeSection]);

  // Throttled scroll listener using requestAnimationFrame to track section & scroll percentage
  useEffect(() => {
    if (experienceMode === 'odyssey') return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

          // Calculate total scroll percentage
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, currentProgress)));

          const sections = ['hero', 'tentang', 'proyek', 'keterampilan', 'kontak'];
          let current = 'hero';
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el && window.scrollY >= el.offsetTop - 220) {
              current = section;
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [experienceMode]);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = useCallback(
    (id) => {
      playSound('tab');
      setIsOpen(false);

      if (experienceMode === 'odyssey') {
        const targetScene = NAV_TO_SCENE_MAP[id] || '00';
        goToScene(targetScene);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [experienceMode, goToScene, playSound]
  );

  const handleBrandClick = useCallback(
    (e) => {
      e.preventDefault();
      setIsOpen(false);
      playSound('click');
      if (experienceMode === 'odyssey') {
        goToScene('00');
      } else {
        const el = document.getElementById('hero');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [experienceMode, goToScene, playSound]
  );

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[100] bg-blue-600 dark:bg-blue-500 transition-all duration-75 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-2xl border transition-all duration-300 will-change-transform ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#090D16]/90 backdrop-blur-xl shadow-lg border-slate-200/80 dark:border-slate-800/80 py-2 px-3.5 sm:px-5'
            : 'bg-white/70 dark:bg-[#090D16]/70 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 py-2 px-3.5 sm:px-5'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Brand Logo - The Monolithic Node */}
          <a
            href="#hero"
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 group min-h-[40px]"
          >
            <InsigniaFG className="w-8 h-8 flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="tracking-tight font-space font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-none">
                Fatir Gibran
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-[#43D9E8] leading-tight tracking-wider uppercase mt-0.5">
                CS • Systems & AI
              </span>
            </div>
          </a>

          {/* Active Odyssey Scene Indicator Pill */}
          {experienceMode === 'odyssey' && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#43D9E8]/10 border border-[#43D9E8]/30 text-[10px] font-mono font-bold text-[#43D9E8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#43D9E8] animate-pulse" />
              <span>SCENE {odysseyScene}</span>
            </div>
          )}

          {/* Desktop Navigation Links - Segmented Rail */}
          <ul className="hidden md:flex items-center p-1 bg-slate-100/80 dark:bg-[#11131B]/90 rounded-xl border border-slate-200/60 dark:border-[#C9D0DF]/15">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`font-semibold text-xs lg:text-sm transition-all duration-150 py-1.5 px-3 lg:px-3.5 rounded-lg flex items-center gap-1.5 min-h-[34px] ${
                    activeNavId === item.id
                      ? 'text-slate-950 dark:text-white bg-white dark:bg-[#151D35] font-bold shadow-sm border border-slate-200/50 dark:border-[#43D9E8]/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right Tools: Quick Search & Unified Settings */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* Cmd+K Quick Search / Terminal Trigger */}
            <button
              onClick={() => {
                setIsCommandPaletteOpen(true);
                playSound('modal');
              }}
              title="Command Palette & Terminal (Cmd + K)"
              className="flex items-center gap-1.5 h-8 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-[#111624]/80 text-xs font-medium font-space text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#161D2E] transition-all shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="font-mono text-[11px]">Cmd+K</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5" />

            {/* Sound FX Toggle Button */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Matikan Efek Suara' : 'Aktifkan Efek Suara'}
              className="flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-[#111624]/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#161D2E] transition-all shadow-sm"
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => {
                playSound('tab');
                toggleLang();
              }}
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              className="flex items-center justify-center gap-1 h-8 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-[#111624]/80 text-xs font-bold font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#161D2E] transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={() => {
                playSound('toggle');
                toggleTheme();
              }}
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
              className="flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-[#111624]/80 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-[#161D2E] transition-all shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              )}
            </button>

            {/* Odyssey Mode Launcher */}
            <button
              onClick={toggleExperienceMode}
              title={experienceMode === 'odyssey' ? t.nav.modeDirect : t.nav.modeOdyssey}
              className="hidden lg:flex items-center gap-1.5 h-8 px-2.5 rounded-xl border border-blue-500/40 dark:border-sky-500/40 bg-blue-50/80 dark:bg-sky-950/50 text-[11px] font-space font-bold text-blue-700 dark:text-sky-300 hover:bg-blue-100 dark:hover:bg-sky-900/60 transition-colors shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-sky-400 animate-pulse" />
              <span>{experienceMode === 'odyssey' ? 'DIRECT' : 'ODYSSEY'}</span>
            </button>
          </div>

          {/* Mobile Viewport: ONLY Theme Toggle + Hamburger Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                playSound('toggle');
                toggleTheme();
              }}
              title={isDark ? 'Mode Terang' : 'Mode Gelap'}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-amber-400"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => {
                setIsOpen(!isOpen);
                playSound('click');
              }}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white/98 dark:bg-[#090D16]/98 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl transition-all duration-200 mt-1">
            <ul className="flex flex-col gap-1 text-left mb-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`block py-2.5 px-3.5 rounded-xl font-bold text-sm transition-colors min-h-[44px] flex items-center justify-between ${
                      activeNavId === item.id
                        ? 'text-white dark:text-slate-950 bg-slate-900 dark:bg-white font-bold shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#11131B]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeNavId === item.id && (
                      <span className="text-xs font-mono opacity-60">•</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Drawer Bottom Utility Section */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  toggleExperienceMode();
                }}
                className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm min-h-[44px]"
              >
                <span>✨ {experienceMode === 'odyssey' ? 'Mode Portofolio Lengkap' : "The Builder's Odyssey"}</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsCommandPaletteOpen(true);
                  playSound('modal');
                }}
                className="inline-flex items-center justify-center gap-2 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs py-3 rounded-xl shadow-sm min-h-[44px]"
              >
                <Search className="w-4 h-4" />
                <span>Command Palette (Cmd+K)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* Mobile Audio Toggle */}
                <button
                  onClick={toggleSound}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111624] text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[42px]"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Audio ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                      <span>Audio OFF</span>
                    </>
                  )}
                </button>

                {/* Mobile Language Switcher */}
                <button
                  onClick={() => {
                    playSound('tab');
                    toggleLang();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111624] text-xs font-bold text-slate-700 dark:text-slate-300 min-h-[42px]"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Bahasa: {lang.toUpperCase()}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default memo(Navbar);
