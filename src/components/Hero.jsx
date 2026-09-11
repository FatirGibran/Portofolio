import React, { useState, useEffect, memo } from 'react';
import { ArrowRight, Play, Award, ShieldCheck, Code2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import HoloDevPass from './HoloDevPass';

function Hero() {
  const { t, playSound } = usePortfolio();
  const roles = t.hero.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [speed, setSpeed] = useState(80);
  const [heroView, setHeroView] = useState('photo'); // 'photo' | 'badge'

  useEffect(() => {
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

  const [projectCount, setProjectCount] = useState(0);
  const [coverageVal, setCoverageVal] = useState('0.0');

  useEffect(() => {
    const duration = 1400;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setProjectCount(Math.floor(ease * 20));
      setCoverageVal((ease * 95.8).toFixed(1));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setProjectCount(20);
        setCoverageVal('95.8');
      }
    };

    const animId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <header id="hero" className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-14 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto pt-28 sm:pt-32 pb-14">
      <div className="flex-1 text-center md:text-left w-full">
        {/* Leadership & Status Badge */}
        <div className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-pastel-yellow dark:bg-amber-400/20 border border-pastel-yellow-hover dark:border-amber-400/40 text-pastel-navy dark:text-amber-300 font-bold text-xs uppercase tracking-wider mb-5 shadow-pastel-sm animate-bounce-soft">
          <Award className="w-4 h-4 text-pastel-blue-dark dark:text-amber-400 flex-shrink-0" />
          <span className="text-[11px] sm:text-xs leading-tight">{t.hero.statusBadge}</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-space text-pastel-navy dark:text-white leading-[1.15] sm:leading-[1.1] mb-4">
          {t.hero.greeting} <br />
          <span className="relative inline-block text-pastel-blue-dark dark:text-sky-400">
            {t.hero.name}
            <span className="absolute bottom-1 sm:bottom-1.5 left-0 w-full h-3 sm:h-3.5 bg-pastel-yellow/70 dark:bg-amber-400/30 -z-10 rounded-full"></span>
          </span>
        </h1>
        
        <div className="text-base sm:text-xl md:text-2xl font-semibold text-pastel-navy/75 dark:text-slate-300 mb-5 min-h-[2rem] sm:min-h-[2.2rem] flex items-center justify-center md:justify-start gap-1">
          <span className="text-pastel-navy/40 dark:text-slate-500 font-mono font-normal">&gt;</span>
          <span className="text-pastel-blue-dark dark:text-sky-400 font-space font-bold">{typedText}</span>
          <span className="animate-pulse text-pastel-blue-dark dark:text-sky-400">|</span>
        </div>
        
        <p className="text-pastel-navy/80 dark:text-slate-300 leading-relaxed mb-7 max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-lg">
          {t.hero.bio}
        </p>
        
        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start mb-8 sm:mb-10 w-full sm:w-auto">
          <a
            href="#simulator"
            onClick={() => playSound('tab')}
            className="inline-flex items-center justify-center gap-2.5 bg-pastel-yellow dark:bg-amber-400 hover:bg-pastel-yellow-hover text-pastel-navy font-extrabold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-pastel-md hover:shadow-pastel-lg transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base group min-h-[48px]"
          >
            <Play className="w-4 h-4 fill-pastel-navy group-hover:scale-110 transition-transform flex-shrink-0" />
            <span>{t.hero.ctaDemos}</span>
          </a>
          <a
            href="#proyek"
            onClick={() => playSound('click')}
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-pastel-blue dark:border-sky-500/40 text-pastel-navy dark:text-slate-100 font-bold py-3.5 sm:py-4 px-6 sm:px-7 rounded-2xl shadow-pastel-sm hover:bg-pastel-blue/30 dark:hover:bg-slate-700 transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base min-h-[48px]"
          >
            <span>{t.hero.ctaProjects}</span>
            <ArrowRight className="w-4 h-4 text-pastel-blue-dark dark:text-sky-400 flex-shrink-0" />
          </a>
        </div>

        {/* Quick Stats Banner with Animated Count-Up */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-md mx-auto md:mx-0 pt-4 border-t border-pastel-navy/10 dark:border-slate-800">
          <div className="bg-white/80 dark:bg-slate-800/80 p-2 sm:p-2.5 rounded-2xl border border-pastel-peach/60 dark:border-slate-700 text-center transition-transform hover:scale-105">
            <span className="block font-space font-extrabold text-lg sm:text-xl text-pastel-blue-dark dark:text-sky-400">{projectCount}</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-tight">{t.hero.statProjects}</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 p-2 sm:p-2.5 rounded-2xl border border-pastel-yellow/80 dark:border-amber-400/40 text-center transition-transform hover:scale-105">
            <span className="block font-space font-extrabold text-lg sm:text-xl text-amber-600 dark:text-amber-400">6 Demo</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-tight">{t.hero.statDemos}</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 p-2 sm:p-2.5 rounded-2xl border border-pastel-green/80 dark:border-emerald-500/40 text-center transition-transform hover:scale-105">
            <span className="block font-space font-extrabold text-lg sm:text-xl text-emerald-600 dark:text-emerald-400">{coverageVal}%</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-pastel-navy/60 dark:text-slate-400 uppercase tracking-tight">{t.hero.statCoverage}</span>
          </div>
        </div>
      </div>
      
      {/* Profile Area: Interactive Toggle between Photo and 3D Holographic Developer Pass */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {/* Interactive View Switcher Pill */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full border border-pastel-peach/60 dark:border-slate-700 mb-4 shadow-pastel-sm">
          <button
            onClick={() => {
              playSound('click');
              setHeroView('photo');
            }}
            className={`px-3.5 py-1 rounded-full text-xs font-space font-bold transition-all ${
              heroView === 'photo'
                ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy shadow-sm'
                : 'text-pastel-navy/60 dark:text-slate-400 hover:text-pastel-navy dark:hover:text-white'
            }`}
          >
            📷 Foto Profil
          </button>
          <button
            onClick={() => {
              playSound('tab');
              setHeroView('badge');
            }}
            className={`px-3.5 py-1 rounded-full text-xs font-space font-bold transition-all flex items-center gap-1.5 ${
              heroView === 'badge'
                ? 'bg-pastel-blue dark:bg-sky-500 text-pastel-navy dark:text-white shadow-sm'
                : 'text-pastel-navy/60 dark:text-slate-400 hover:text-pastel-navy dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>🪪 3D Developer Pass</span>
          </button>
        </div>

        {heroView === 'badge' ? (
          <div className="animate-fade-in">
            <HoloDevPass />
          </div>
        ) : (
          <div className="relative flex flex-col items-center">
            <div
              onClick={() => {
                playSound('tab');
                setHeroView('badge');
              }}
              title="Klik untuk membuka 3D Developer Pass"
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 p-2.5 sm:p-3 rounded-full bg-white dark:bg-slate-800 shadow-pastel-lg group transform-gpu-safe cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-pastel-blue dark:border-sky-500/50 animate-[spin_20s_linear_infinite] group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute -inset-2 rounded-full border border-pastel-yellow/70 dark:border-amber-400/50 animate-[spin_32s_linear_infinite_reverse]"></div>
              
              <img
                src="Image/fotomuka.jpg"
                alt="Foto Profil Fatir Gibran"
                width="320"
                height="320"
                loading="eager"
                decoding="async"
                className="w-full h-full aspect-square object-cover object-top rounded-full border-4 border-white dark:border-slate-800 shadow-inner group-hover:scale-95 transition-transform duration-500"
                style={{ objectPosition: 'center top' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80';
                }}
              />

              <div className="absolute -bottom-2 -left-2 bg-white dark:bg-slate-800 border-2 border-pastel-green dark:border-emerald-500/50 py-1 px-2.5 sm:px-3 rounded-full shadow-pastel-md flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold text-emerald-700 dark:text-emerald-400 animate-bounce-soft">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>{t.hero.floatingPrivacy}</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 border-2 border-pastel-blue dark:border-sky-500/50 py-1 px-2.5 sm:px-3 rounded-full shadow-pastel-md flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold text-pastel-blue-dark dark:text-sky-400">
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>{t.hero.floatingStack}</span>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('tab');
                setHeroView('badge');
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-pastel-blue-dark dark:text-sky-400 hover:underline cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
              <span>Coba Interaktif 3D Developer Pass ✨</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default memo(Hero);
