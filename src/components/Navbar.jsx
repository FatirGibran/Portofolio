import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Play, Sun, Moon, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar() {
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'tentang', 'proyek', 'simulator', 'keterampilan', 'kontak'];
      let current = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 220) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 rounded-full border transition-all duration-500 spring-transition-fast ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-pastel-md border-pastel-yellow/40 dark:border-slate-700/60 py-3 px-5 sm:px-6'
          : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-white/60 dark:border-slate-800/60 py-3.5 px-5 sm:px-6'
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 text-lg sm:text-xl font-extrabold text-pastel-navy dark:text-pastel-text-dark group">
          <div className="w-8 h-8 rounded-full bg-pastel-yellow dark:bg-amber-400/20 flex items-center justify-center border border-pastel-yellow-hover dark:border-amber-400/50 shadow-pastel-sm group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 text-pastel-blue-dark dark:text-amber-400" />
          </div>
          <span className="tracking-tight font-space">Fatir Gibran</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`font-semibold text-xs lg:text-sm transition-all duration-300 relative py-1.5 px-3 rounded-full flex items-center gap-1.5 ${
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

        {/* Right Tools: Language Switcher, Theme Switcher & CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Toggle (ID / EN) */}
          <button
            onClick={toggleLang}
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            className="flex items-center gap-1 py-1.5 px-2.5 rounded-full border border-pastel-navy/15 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-xs font-bold font-space text-pastel-navy dark:text-slate-200 hover:bg-pastel-peach/30 dark:hover:bg-slate-700 transition-colors shadow-pastel-sm"
          >
            <Globe className="w-3.5 h-3.5 text-pastel-blue-dark dark:text-sky-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Mode Terang' : 'Mode Gelap'}
            className="p-1.5 sm:p-2 rounded-full border border-pastel-navy/15 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-pastel-navy dark:text-amber-400 hover:bg-pastel-peach/30 dark:hover:bg-slate-700 transition-all shadow-pastel-sm"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-pastel-blue-dark" />
            )}
          </button>

          {/* CTA Sandbox Button */}
          <a
            href="#simulator"
            className="hidden sm:inline-flex items-center gap-1.5 bg-pastel-yellow dark:bg-amber-400/90 hover:bg-pastel-yellow-hover text-pastel-navy font-bold text-xs py-1.5 px-3.5 rounded-full border border-pastel-yellow-hover shadow-pastel-sm transition-all hover:scale-105"
          >
            <Play className="w-3 h-3 fill-pastel-navy" />
            <span>{t.nav.ctaDemos}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-pastel-peach/50 dark:hover:bg-slate-800 text-pastel-navy dark:text-slate-200 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-pastel-yellow/30 dark:border-slate-700 rounded-3xl p-6 shadow-pastel-lg transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-3 text-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 rounded-2xl font-bold text-sm transition-colors ${
                  activeSection === item.id
                    ? 'text-pastel-blue-dark dark:text-sky-400 bg-pastel-blue/80 dark:bg-sky-950/80 font-bold'
                    : 'text-pastel-navy/70 dark:text-slate-300 hover:text-pastel-navy dark:hover:text-white hover:bg-pastel-peach/40 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 flex flex-col gap-2">
            <a
              href="#simulator"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full bg-pastel-yellow dark:bg-amber-400 text-pastel-navy font-bold text-xs py-3 rounded-2xl shadow-pastel-sm"
            >
              <Play className="w-3.5 h-3.5 fill-pastel-navy" />
              <span>{t.nav.ctaDemos}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
