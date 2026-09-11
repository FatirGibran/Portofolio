import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Play, Award, ShieldCheck, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { t } = usePortfolio();
  const roles = t.hero.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [speed, setSpeed] = useState(80);

  useEffect(() => {
    // Reset index if role array length or content changed
    setRoleIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [t]);

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        setSpeed(35);
      }, speed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        setSpeed(75);
      }, speed);
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setIsDeleting(true);
      setSpeed(1600);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
      setSpeed(450);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, speed, roles]);

  return (
    <header id="hero" className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-14 px-6 md:px-12 max-w-6xl mx-auto pt-32 pb-16">
      <div className="flex-1 text-center md:text-left">
        {/* Leadership & Status Badge */}
        <div className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2 px-4 py-1.5 rounded-full bg-pastel-yellow dark:bg-amber-400/20 border border-pastel-yellow-hover dark:border-amber-400/40 text-pastel-navy dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-6 shadow-pastel-sm animate-bounce-soft">
          <Award className="w-4 h-4 text-pastel-blue-dark dark:text-amber-400" />
          <span>{t.hero.statusBadge}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-space text-pastel-navy dark:text-white leading-[1.1] mb-4">
          {t.hero.greeting} <br />
          <span className="relative inline-block text-pastel-blue-dark dark:text-sky-400">
            {t.hero.name}
            <span className="absolute bottom-1.5 left-0 w-full h-3.5 bg-pastel-yellow/70 dark:bg-amber-400/30 -z-10 rounded-full"></span>
          </span>
        </h1>
        
        <div className="text-lg md:text-2xl font-semibold text-pastel-navy/75 dark:text-slate-300 mb-6 min-h-[2.2rem] flex items-center justify-center md:justify-start gap-1">
          <span className="text-pastel-navy/40 dark:text-slate-500 font-mono font-normal">&gt;</span>
          <span className="text-pastel-blue-dark dark:text-sky-400 font-space font-bold">{typedText}</span>
          <span className="animate-pulse text-pastel-blue-dark dark:text-sky-400">|</span>
        </div>
        
        <p className="text-pastel-navy/80 dark:text-slate-300 leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 text-base md:text-lg">
          {t.hero.bio}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
          <a
            href="#simulator"
            className="inline-flex items-center justify-center gap-2.5 bg-pastel-yellow dark:bg-amber-400 hover:bg-pastel-yellow-hover text-pastel-navy font-extrabold py-4 px-8 rounded-2xl shadow-pastel-md hover:shadow-pastel-lg transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base group"
          >
            <Play className="w-4 h-4 fill-pastel-navy group-hover:scale-110 transition-transform" />
            <span>{t.hero.ctaDemos}</span>
          </a>
          <a
            href="#proyek"
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-pastel-blue dark:border-sky-500/40 text-pastel-navy dark:text-slate-100 font-bold py-4 px-7 rounded-2xl shadow-pastel-sm hover:bg-pastel-blue/30 dark:hover:bg-slate-700 transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base"
          >
            <span>{t.hero.ctaProjects}</span>
            <ArrowRight className="w-4 h-4 text-pastel-blue-dark dark:text-sky-400" />
          </a>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto md:mx-0 pt-4 border-t border-pastel-navy/10 dark:border-slate-800">
          <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-pastel-peach/60 dark:border-slate-700 text-center">
            <span className="block font-space font-extrabold text-xl text-pastel-blue-dark dark:text-sky-400">20</span>
            <span className="text-[11px] font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-tight">{t.hero.statProjects}</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-pastel-yellow/80 dark:border-amber-400/40 text-center">
            <span className="block font-space font-extrabold text-xl text-amber-600 dark:text-amber-400">6 Demo</span>
            <span className="text-[11px] font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-tight">{t.hero.statDemos}</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-pastel-green/80 dark:border-emerald-500/40 text-center">
            <span className="block font-space font-extrabold text-xl text-emerald-600 dark:text-emerald-400">95.8%</span>
            <span className="text-[11px] font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-tight">{t.hero.statCoverage}</span>
          </div>
        </div>
      </div>
      
      {/* Profile Photo with Floating Badges */}
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-88 md:h-88 p-3 rounded-full bg-white dark:bg-slate-800 shadow-pastel-lg group">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-pastel-blue dark:border-sky-500/50 animate-[spin_20s_linear_infinite] group-hover:scale-105 transition-transform duration-500"></div>
          <div className="absolute -inset-2.5 rounded-full border border-pastel-yellow/70 dark:border-amber-400/50 animate-[spin_32s_linear_infinite_reverse]"></div>
          
          <img
            src="Image/fotomuka.jpg"
            alt="Foto Profil Fatir Gibran"
            className="w-full h-full object-cover rounded-full border-4 border-pastel-bg dark:border-slate-900 group-hover:scale-95 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute -bottom-2 -left-2 bg-white dark:bg-slate-800 border-2 border-pastel-green dark:border-emerald-500/50 py-1.5 px-3 rounded-full shadow-pastel-md flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 animate-bounce-soft">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.hero.floatingPrivacy}</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 border-2 border-pastel-blue dark:border-sky-500/50 py-1.5 px-3 rounded-full shadow-pastel-md flex items-center gap-1.5 text-xs font-extrabold text-pastel-blue-dark dark:text-sky-400">
            <Code2 className="w-4 h-4" />
            <span>{t.hero.floatingStack}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
