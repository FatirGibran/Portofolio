import React, { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, Sun, Moon, Globe, Search, Volume2, VolumeX } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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
    t
  } = usePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'tentang', label: t.nav.about },
    { id: 'proyek', label: t.nav.projects },
    { id: 'simulator', label: t.nav.demos },
    { id: 'keterampilan', label: t.nav.skills },
    { id: 'kontak', label: t.nav.contact },
  ];

  // Throttled scroll listener using requestAnimationFrame to track section & scroll percentage
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

          // Calculate total scroll percentage
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, currentProgress)));

          const sections = ['hero', 'tentang', 'proyek', 'simulator', 'keterampilan', 'kontak'];
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
  }, []);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = useCallback((id) => {
    playSound('tab');
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [playSound]);

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[100] bg-blue-600 dark:bg-blue-500 transition-all duration-75 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-full border transition-all duration-300 will-change-transform ${
          isScrolled
            ? 'bg-white/85 dark:bg-[#0E131F]/85 backdrop-blur-xl shadow-lg border-slate-200/80 dark:border-slate-800 py-2 px-3 sm:px-5'
            : 'bg-white/60 dark:bg-[#0E131F]/60 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 py-2.5 px-3 sm:px-5'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={() => {
              setIsOpen(false);
              playSound('click');
            }}
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white group min-h-[40px]"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider shadow-sm group-hover:scale-105 transition-transform">
              FG
            </div>
            <span className="tracking-tight font-space font-extrabold whitespace-nowrap">Fatir Gibran</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`font-semibold text-xs lg:text-sm transition-all duration-150 py-1.5 px-3 sm:px-3.5 rounded-full flex items-center gap-1.5 min-h-[36px] ${
                    activeSection === item.id
                      ? 'text-white dark:text-slate-950 bg-slate-900 dark:bg-white font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.id === 'simulator' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Tools: Cmd+K, Sound, Lang, & Theme Toggle */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Cmd+K Quick Search / Terminal Trigger */}
            <button
              onClick={() => {
                setIsCommandPaletteOpen(true);
                playSound('modal');
              }}
              title="Command Palette & Terminal (Cmd + K)"
              className="flex items-center gap-1.5 h-8 sm:h-9 px-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 text-xs font-medium font-space text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline-block font-mono text-[11px]">Cmd+K</span>
            </button>

            {/* Sound FX Toggle Button */}
            <button
              onClick={() => {
                toggleSound();
              }}
              title={soundEnabled ? 'Matikan Efek Suara' : 'Aktifkan Efek Suara'}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
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
              className="flex items-center justify-center gap-1 h-8 sm:h-9 px-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 text-xs font-bold font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
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
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              )}
            </button>

            {/* Mobile Menu Button (Accessible 44x44px target) */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                playSound('click');
              }}
              className="md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-2xl transition-all duration-200">
            <ul className="flex flex-col gap-2 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`block py-2.5 px-4 rounded-xl font-bold text-sm transition-colors min-h-[44px] flex items-center justify-center ${
                      activeSection === item.id
                        ? 'text-white dark:text-slate-950 bg-slate-900 dark:bg-white font-bold shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}

              <li className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsCommandPaletteOpen(true);
                    playSound('modal');
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold text-xs py-3 rounded-xl shadow-sm min-h-[44px]"
                >
                  <Search className="w-4 h-4" />
                  <span>Command Palette (Cmd+K)</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default memo(Navbar);
