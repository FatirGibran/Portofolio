import React, { memo } from 'react';
import { Brain, Globe, Shield, Users } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SKILL_ITEMS } from '../data/skillsData';

function Keterampilan() {
  const { t } = usePortfolio();

  const iconMap = {
    groupAI: <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    groupWeb: <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
    groupSec: <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    groupLead: <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
  };

  return (
    <section id="keterampilan" className="py-20 sm:py-24 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto scroll-mt-12 content-auto">
      <div className="text-center md:text-left mb-10 sm:mb-14">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
          // Technical Stack & Capability Matrix
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.skills.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          {t.skills.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SKILL_ITEMS.map((group, gIdx) => (
          <div
            key={gIdx}
            className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 bg-white dark:bg-slate-900/80 shadow-sm hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200"
          >
            <h3 className="text-base sm:text-lg font-bold font-space text-slate-900 dark:text-white flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
              {iconMap[group.groupKey]}
              {t.skills[group.groupKey]}
            </h3>

            <div className="flex flex-col gap-4">
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-1 pb-3 border-b border-slate-50 dark:border-slate-800/60 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-sm font-bold font-space text-slate-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-[11px] font-mono font-semibold py-0.5 px-2 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200/80 dark:border-slate-700/80 flex-shrink-0">
                      {skill.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {skill.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Keterampilan);
