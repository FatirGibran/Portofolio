import React, { memo } from 'react';
import { User, GraduationCap, MapPin, CheckCircle, Code, Award, Shield, Cpu, Terminal, Users } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CAREER_TIMELINE_DATA } from '../data/timelineData';

function About() {
  const { t } = usePortfolio();

  const stats = [
    { icon: <User className="w-4 sm:w-5 h-4 sm:h-5 text-pastel-blue-dark dark:text-sky-400" />, label: t.about.statName, val: 'Fatir Gibran' },
    { icon: <Award className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 dark:text-amber-400" />, label: t.about.statLead, val: 'Chairman HMIF (2025/2026)' },
    { icon: <Code className="w-4 sm:w-5 h-4 sm:h-5 text-pastel-blue-dark dark:text-sky-400" />, label: t.about.statRole, val: 'Full-Stack & Edge AI Engineer' },
    { icon: <GraduationCap className="w-4 sm:w-5 h-4 sm:h-5 text-pastel-blue-dark dark:text-sky-400" />, label: t.about.statEdu, val: 'S1 Teknik Informatika' },
    { icon: <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-pastel-blue-dark dark:text-sky-400" />, label: t.about.statLoc, val: 'Telkom University Purwokerto' },
  ];

  return (
    <section id="tentang" className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-space text-pastel-navy dark:text-white inline-block relative">
          {t.about.title}
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-blue/60 dark:bg-sky-500/30 -z-10 rounded-full"></span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-pastel-navy/60 dark:text-slate-400 mt-2">
          {t.about.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Stats Card */}
        <div className="md:col-span-5 bg-white dark:bg-slate-800 border-2 border-pastel-peach dark:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-pastel-md hover:shadow-pastel-lg transition-all duration-200 transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b-2 border-pastel-peach/40 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-pastel-yellow dark:bg-amber-400 border border-pastel-yellow-hover"></span>
              <span className="text-[11px] sm:text-xs font-bold font-space uppercase text-pastel-navy/60 dark:text-slate-400 tracking-wider">
                {t.about.badgeIdentity}
              </span>
            </div>
            <span className="text-[10px] font-bold bg-pastel-yellow/80 dark:bg-amber-400/20 border border-pastel-yellow-hover dark:border-amber-400/40 text-pastel-navy dark:text-amber-300 py-0.5 px-2.5 rounded-full">
              Executive Board
            </span>
          </div>

          <ul className="flex flex-col gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <li key={i} className="flex gap-3 sm:gap-4 items-start">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-pastel-peach/40 dark:bg-slate-700/50 mt-0.5 shadow-pastel-sm flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <span className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-xs sm:text-sm font-bold text-pastel-navy dark:text-slate-200 leading-snug">{stat.val}</span>
                </div>
              </li>
            ))}
            <li className="flex gap-3 sm:gap-4 items-start pt-2">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-pastel-green/50 dark:bg-emerald-900/40 mt-0.5 shadow-pastel-sm flex-shrink-0">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <span className="block text-xs font-bold text-pastel-navy/50 dark:text-slate-400 uppercase tracking-wider">{t.about.statStatus}</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-space bg-pastel-green/70 dark:bg-emerald-950/70 border border-emerald-500/30 py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-full inline-block mt-0.5">
                  {t.about.badgeStatus}
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Narrative & 4 Pillars */}
        <div className="md:col-span-7 flex flex-col gap-5 sm:gap-6">
          <div className="bg-white dark:bg-slate-800 border-2 border-pastel-blue dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-pastel-sm flex flex-col gap-3.5 sm:gap-4">
            <p className="text-sm sm:text-base md:text-lg text-pastel-navy/80 dark:text-slate-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
            <p className="text-xs sm:text-sm md:text-base text-pastel-navy/75 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
            <p className="text-xs sm:text-sm md:text-base text-pastel-navy/75 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p3 }} />
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-pastel-blue/40 dark:bg-sky-950/40 border border-pastel-blue/80 dark:border-sky-800 rounded-2xl p-3 text-center shadow-pastel-sm">
              <Cpu className="w-5 sm:w-6 h-5 sm:h-6 text-pastel-blue-dark dark:text-sky-400 mx-auto mb-1" />
              <span className="block font-bold text-[11px] sm:text-xs text-pastel-navy dark:text-slate-200">{t.about.pillarAI}</span>
            </div>
            <div className="bg-pastel-yellow/50 dark:bg-amber-950/40 border border-pastel-yellow/80 dark:border-amber-800 rounded-2xl p-3 text-center shadow-pastel-sm">
              <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-amber-700 dark:text-amber-400 mx-auto mb-1" />
              <span className="block font-bold text-[11px] sm:text-xs text-pastel-navy dark:text-slate-200">{t.about.pillarSec}</span>
            </div>
            <div className="bg-pastel-green/50 dark:bg-emerald-950/40 border border-pastel-green/80 dark:border-emerald-800 rounded-2xl p-3 text-center shadow-pastel-sm">
              <Terminal className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
              <span className="block font-bold text-[11px] sm:text-xs text-pastel-navy dark:text-slate-200">{t.about.pillarFull}</span>
            </div>
            <div className="bg-pastel-purple/50 dark:bg-purple-950/40 border border-pastel-purple/80 dark:border-purple-800 rounded-2xl p-3 text-center shadow-pastel-sm">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-700 dark:text-purple-400 mx-auto mb-1" />
              <span className="block font-bold text-[11px] sm:text-xs text-pastel-navy dark:text-slate-200">{t.about.pillarLead}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Career Timeline & Evolution */}
      <div className="mt-14 pt-10 border-t-2 border-pastel-peach/40 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pastel-blue-dark dark:text-sky-400">
              Perjalanan Belajar
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-space font-extrabold text-pastel-navy dark:text-white mt-1">
              Dari Semester 1 sampai Sekarang
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-pastel-navy/50 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-pastel-navy/10 dark:border-slate-700">
            2023 → 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">
          {CAREER_TIMELINE_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/80 dark:bg-slate-800/80 border-2 ${item.borderColor} rounded-3xl p-5 sm:p-6 shadow-pastel-sm hover:shadow-pastel-md transition-all duration-200 transform hover:-translate-y-1 relative group`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-extrabold py-1 px-2.5 rounded-xl border ${item.badgeColor}`}>
                  {item.year}
                </span>
                <span className="text-[10px] font-bold uppercase text-pastel-navy/40 dark:text-slate-500 font-mono">
                  {item.phase}
                </span>
              </div>
              <h4 className={`text-base font-space font-bold text-pastel-navy dark:text-white mb-1.5 ${item.hoverText} transition-colors`}>
                {item.title}
              </h4>
              <p className="text-xs text-pastel-navy/70 dark:text-slate-300 leading-relaxed mb-3">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono font-bold text-pastel-navy/60 dark:text-slate-400 bg-pastel-bg dark:bg-slate-900 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(About);
