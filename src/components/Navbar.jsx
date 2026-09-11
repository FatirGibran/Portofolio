import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Play } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'tentang', label: 'Tentang' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'simulator', label: 'Live Demos' },
    { id: 'keterampilan', label: 'Keahlian' },
    { id: 'kontak', label: 'Kontak' },
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
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 rounded-full border transition-all duration-500 spring-transition-fast ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-pastel-md border-pastel-yellow/40 py-3 px-6'
          : 'bg-white/60 backdrop-blur-sm border-white/60 py-4 px-6'
      }`}
    >
      <div className="flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2.5 text-xl font-extrabold text-pastel-navy group">
          <div className="w-8 h-8 rounded-full bg-pastel-yellow flex items-center justify-center border border-pastel-yellow-hover shadow-pastel-sm group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 text-pastel-blue-dark" />
          </div>
          <span className="tracking-tight">Fatir Gibran</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`font-semibold text-sm transition-all duration-300 relative py-1.5 px-3.5 rounded-full flex items-center gap-1.5 ${
                  activeSection === item.id
                    ? 'text-pastel-blue-dark bg-pastel-blue/70 shadow-pastel-sm'
                    : 'text-pastel-navy/70 hover:text-pastel-navy hover:bg-pastel-peach/40'
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

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center">
          <a
            href="#simulator"
            className="inline-flex items-center gap-2 bg-pastel-yellow hover:bg-pastel-yellow-hover text-pastel-navy font-bold text-xs py-2 px-4 rounded-full border border-pastel-yellow-hover shadow-pastel-sm transition-all hover:scale-105"
          >
            <Play className="w-3 h-3 fill-pastel-navy" />
            <span>Coba 6 Demo</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-pastel-peach/50 text-pastel-navy transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border border-pastel-yellow/30 rounded-3xl p-6 shadow-pastel-lg transition-all duration-300 ${
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
                    ? 'text-pastel-blue-dark bg-pastel-blue/80 font-bold'
                    : 'text-pastel-navy/70 hover:text-pastel-navy hover:bg-pastel-peach/40'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#simulator"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full bg-pastel-yellow text-pastel-navy font-bold text-xs py-3 rounded-2xl shadow-pastel-sm"
            >
              <Play className="w-3.5 h-3.5 fill-pastel-navy" />
              <span>Coba 6 Demo Interaktif</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
