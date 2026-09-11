import React, { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, Sparkles, Play, Sun, Moon, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

function Navbar() {
  const { isDark, toggleTheme, lang, toggleLang, t } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'tentang', label: t.nav.about },
    { id: 'proyek', label: t.nav.projects },
    { id: 'simulator', label: t.nav.demos },
    { id: 'keterampilan', label: t.nav.skills },
    { id: 'kontak', label: t.nav.contact },
  ];

  // Throttled scroll listener using requestAnimationFrame to prevent scroll stutter
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

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
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-full border transition-all duration-300 spring-transition-fast will-change-transform ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-pastel-md border-pastel-yellow/40 dark:border-slate-700/60 py-2.5 px-4 sm:px-6'
          : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-white/60 dark:border-slate-800/60 py-3 px-4 sm:px-6'
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-base sm:text-xl font-extrabold text-pastel-navy dark:text-pastel-text-dark group min-h-[44px]"
        >
          <div className="w-8 h-8 rounded-full bg-pastel-yellow dark:bg-amber-400/20 flex items-center justify-center border border-pastel-yellow-hover dark:border-amber-400/50 shadow-pastel-sm group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 text-pastel-blue-dark dark:text-amber-400" />
          </div>
          <span className="tracking-tight font-space">Fatir Gibran</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`font-semibold text-xs lg:text-sm transition-all duration-200 relative py-2 px-3 rounded-full flex items-center gap-1.5 min-h-[44px] ${
                  activeSection === item.id
                    ? 'text-pastel-blue-dark dark:text-sky-400 bg-pastel-blue/70 dark:bg-sky-950/70 shadow-pastel-sm font-bold'
                    : 'text-pastel-navy/70 dark:text-slate-300 hover:text-pastel-navy dark:hover:text-white hover:bg-pastel-peach/40 dark:hover:bg-slate-800'
                }`}
              >
                {item.id === 'simulator' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Tools: Language, Theme, & CTA Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            className="flex items-center justify-center gap-1 min-h-[44px] min-w-[44px] py-1.5 px-2.5 rounded-full border border-pastel-navy/15 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-xs font-bold font-space text-pastel-navy dark:text-slate-200 hover:bg-pastel-peach/30 dark:hover:bg-slate-700 transition-colors shadow-pastel-sm"
          >
            <Globe className="w-3.5 h-3.5 text-pastel-blue-dark dark:text-sky-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            className="flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-full border border-pastel-navy/15 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-pastel-navy dark:text-amber-400 hover:bg-pastel-peach/30 dark:hover:bg-slate-700 transition-all shadow-pastel-sm"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-pastel-blue-dark" />
            )}
          </button>

          {/* CTA Sandbox Button (Desktop) */}
          <a
            href="#simulator"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('simulator');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 bg-pastel-yellow dark:bg-amber-400/90 hover:bg-pastel-yellow-hover text-pastel-navy font-bold text-xs py-2 px-3.5 rounded-full border border-pastel-yellow-hover shadow-pastel-sm transition-all hover:scale-105 min-h-[44px]"
          >
            <Play className="w-3 h-3 fill-pastel-navy" />
            <span>{t.nav.ctaDemos}</span>
          </a>

          {/* Mobile Menu Button (Accessible 44x44px target) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-full hover:bg-pastel-peach/50 dark:hover:bg-slate-800 text-pastel-navy dark:text-slate-200 transition-colors"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-pastel-yellow/30 dark:border-slate-700 rounded-3xl p-6 shadow-pastel-lg transition-all duration-300">
          <ul className="flex flex-col gap-2.5 text-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`block py-3 px-4 rounded-2xl font-bold text-sm transition-colors min-h-[44px] flex items-center justify-center ${
                    activeSection === item.id
                      ? 'text-pastel-blue-dark dark:text-sky-400 bg-pastel-blue/80 dark:bg-sky-950/80 font-bold'
                      : 'text-pastel-navy/70 dark:text-slate-300 hover:text-pastel-navy dark:hover:text-white hover:bg-pastel-peach/40 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#simulator"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('simulator');
                }}
                className="inline-flex items-center justify-center gap-2 w-full bg-pastel-yellow dark:bg-amber-400 text-pastel-navy font-bold text-xs py-3.5 rounded-2xl shadow-pastel-sm min-h-[44px]"
              >
                <Play className="w-3.5 h-3.5 fill-pastel-navy" />
                <span>{t.nav.ctaDemos}</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default memo(Navbar);
