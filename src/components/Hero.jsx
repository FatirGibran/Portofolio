import React, { useState, useEffect, memo } from 'react';
import { ArrowRight, Play, ShieldCheck, Code2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import HoloDevPass from './HoloDevPass';
import { STATS_CONFIG } from '../data/statsData';

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
    const { projects, coverage } = STATS_CONFIG;
    const duration = projects.duration || 1400;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setProjectCount(Math.floor(ease * projects.target));
      setCoverageVal((ease * coverage.target).toFixed(1));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setProjectCount(projects.target);
        setCoverageVal(coverage.target.toFixed(1));
      }
    };

    const animId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <header id="hero" className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center gap-12 md:gap-16 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto pt-28 sm:pt-36 pb-16">
      <div className="flex-1 text-center md:text-left w-full">
        {/* Engineering Identity & Status Badge */}
        <div className="inline-flex items-center justify-center md:justify-start gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
          <span>{t.hero.statusBadge}</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-space font-extrabold text-slate-900 dark:text-white leading-[1.08] tracking-tight mb-4">
          {t.hero.greeting} <br />
          <span className="text-blue-600 dark:text-blue-400">
            {t.hero.name}
          </span>
        </h1>
        
        <div
          aria-live="polite"
          aria-atomic="true"
          className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6 min-h-[2rem] sm:min-h-[2.2rem] flex items-center justify-center md:justify-start gap-2 font-space"
        >
          <span className="text-blue-600 dark:text-blue-400 font-mono font-bold" aria-hidden="true">&gt;</span>
          <span className="font-space font-bold text-slate-900 dark:text-white">{typedText}</span>
          <span className="w-2 h-5 bg-blue-600 dark:bg-blue-400 inline-block animate-pulse" aria-hidden="true"></span>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0 text-base sm:text-lg font-normal">
          {t.hero.bio}
        </p>
        
        {/* Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start mb-10 w-full sm:w-auto">
          <a
            href="#simulator"
            onClick={() => playSound('tab')}
            className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 sm:px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base group min-h-[48px]"
          >
            <Play className="w-4 h-4 fill-white flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>{t.hero.ctaDemos}</span>
          </a>
          <a
            href="#proyek"
            onClick={() => playSound('click')}
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold py-3.5 px-6 sm:px-8 rounded-xl shadow-sm hover:border-blue-500 dark:hover:border-blue-500/60 transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base min-h-[48px]"
          >
            <span>{t.hero.ctaProjects}</span>
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          </a>
        </div>

        {/* Quick Technical Specs Banner */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto md:mx-0 pt-6 border-t border-slate-200 dark:border-slate-800/80">
          <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <span className="block font-space font-extrabold text-xl sm:text-2xl text-blue-600 dark:text-blue-400">{projectCount}</span>
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.hero.statProjects}</span>
          </div>
          <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <span className="block font-space font-extrabold text-xl sm:text-2xl text-amber-600 dark:text-amber-400">6 Demo</span>
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.hero.statDemos}</span>
          </div>
          <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 text-center transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <span className="block font-space font-extrabold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400">{coverageVal}%</span>
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.hero.statCoverage}</span>
          </div>
        </div>
      </div>
      
      {/* Profile Area: Interactive Toggle between Photo and 3D Holographic Developer Pass */}
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {/* Interactive View Switcher Pill */}
        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 mb-5 shadow-sm">
          <button
            onClick={() => {
              playSound('click');
              setHeroView('photo');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-space font-bold transition-all ${
              heroView === 'photo'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Foto Profil
          </button>
          <button
            onClick={() => {
              playSound('tab');
              setHeroView('badge');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-space font-bold transition-all flex items-center gap-1.5 ${
              heroView === 'badge'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dev Pass 3D</span>
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
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 p-2.5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 shadow-xl group cursor-pointer transition-all duration-300 hover:border-blue-500/50"
            >
              <img
                src="Image/fotomuka.jpg"
                alt="Foto Profil Fatir Gibran"
                width="320"
                height="320"
                loading="eager"
                decoding="async"
                className="w-full h-full aspect-square object-cover object-top rounded-2xl shadow-inner group-hover:scale-[0.98] transition-transform duration-500"
                style={{ objectPosition: 'center top' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80';
                }}
              />

              <div className="absolute -bottom-2 -left-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 py-1 px-3 rounded-xl shadow-md flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>{t.hero.floatingPrivacy}</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 py-1 px-3 rounded-xl shadow-md flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{t.hero.floatingStack}</span>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('tab');
                setHeroView('badge');
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
              <span>Buka Dev Pass 3D Interaktif</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default memo(Hero);
