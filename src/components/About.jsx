import React, { memo } from 'react';
import { User, GraduationCap, MapPin, CheckCircle, Code, Shield, Cpu, Terminal, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CAREER_TIMELINE_DATA } from '../data/timelineData';

function About() {
  const { t } = usePortfolio();

  const stats = [
    { icon: <User className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-sky-400" />, label: t.about.statName, val: 'Fatir Gibran' },
    { icon: <Code className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-sky-400" />, label: t.about.statRole, val: 'Software & Edge AI Engineer' },
    { icon: <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 dark:text-amber-400" />, label: t.about.statMethod, val: 'Clean Arch & 95.8% Test Coverage' },
    { icon: <GraduationCap className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-sky-400" />, label: t.about.statEdu, val: 'S1 Teknik Informatika' },
    { icon: <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-sky-400" />, label: t.about.statLoc, val: 'Telkom University Purwokerto' },
  ];

  return (
    <section id="tentang" className="py-20 sm:py-24 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto scroll-mt-12 scroll-reveal">
      <div className="text-center md:text-left mb-10 sm:mb-14">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 block mb-1">
          Profile & Engineering Foundations
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.about.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          {t.about.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Stats Card */}
        <div className="md:col-span-5 bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E293B] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-[#1E293B]">
            <span className="text-xs font-bold font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              {t.about.badgeIdentity}
            </span>
            <span className="text-xs font-mono font-semibold bg-slate-100 dark:bg-[#161D2E] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300 py-0.5 px-2.5 rounded-md">
              Verified Track
            </span>
          </div>

          <ul className="flex flex-col gap-4">
            {stats.map((stat, i) => (
              <li key={i} className="flex gap-3.5 items-start">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#161D2E] text-slate-700 dark:text-slate-300 mt-0.5 flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <span className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">{stat.val}</span>
                </div>
              </li>
            ))}
            <li className="flex gap-3.5 items-start pt-2 border-t border-slate-100 dark:border-[#1E293B]">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 mt-0.5 flex-shrink-0">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <span className="block text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.about.statStatus}</span>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-500/30 py-0.5 px-2.5 rounded-md inline-block mt-0.5">
                  {t.about.badgeStatus}
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Narrative & 4 Pillars */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
            <p dangerouslySetInnerHTML={{ __html: t.about.p3 }} />
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E293B] rounded-xl p-3.5 text-center transition-all hover:border-blue-500/60 shadow-sm">
              <Cpu className="w-5 h-5 text-blue-600 dark:text-sky-400 mx-auto mb-1.5" />
              <span className="block font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{t.about.pillarAI}</span>
            </div>
            <div className="bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E293B] rounded-xl p-3.5 text-center transition-all hover:border-amber-500/60 shadow-sm">
              <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 mx-auto mb-1.5" />
              <span className="block font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{t.about.pillarSec}</span>
            </div>
            <div className="bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E293B] rounded-xl p-3.5 text-center transition-all hover:border-emerald-500/60 shadow-sm">
              <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1.5" />
              <span className="block font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{t.about.pillarFull}</span>
            </div>
            <div className="bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E293B] rounded-xl p-3.5 text-center transition-all hover:border-purple-500/60 shadow-sm">
              <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1.5" />
              <span className="block font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{t.about.pillarSys}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Career Milestones Timeline */}
      <div className="mt-14 pt-12 border-t border-slate-200 dark:border-[#1E293B]">
        <div className="text-center md:text-left mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
            Verified Evolution
          </span>
          <h3 className="text-2xl sm:text-3xl font-space font-extrabold text-slate-900 dark:text-white">
            Milestones Rekayasa (2023 - 2026)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAREER_TIMELINE_DATA.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E293B] rounded-2xl p-6 shadow-sm hover:border-blue-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400">
                    {item.year}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#161D2E] text-slate-600 dark:text-slate-300">
                    {item.phase}
                  </span>
                </div>
                <h4 className="font-space font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-100 dark:border-[#1E293B]">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#161D2E] text-slate-600 dark:text-slate-400"
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
