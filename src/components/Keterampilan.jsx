import React, { useEffect, useState, memo } from 'react';
import { Brain, Globe, Shield, Users } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SKILL_ITEMS } from '../data/skillsData';

function Keterampilan() {
  const { t } = usePortfolio();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const iconMap = {
    groupAI: <Brain className="w-5 h-5 text-pastel-blue-dark dark:text-sky-400" />,
    groupWeb: <Globe className="w-5 h-5 text-amber-700 dark:text-amber-400" />,
    groupSec: <Shield className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />,
    groupLead: <Users className="w-5 h-5 text-indigo-700 dark:text-purple-400" />,
  };

  return (
    <section id="keterampilan" className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto scroll-mt-12 content-auto">
      <div className="text-center md:text-left mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-space text-pastel-navy dark:text-white inline-block relative">
          {t.skills.title}
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-green/60 dark:bg-emerald-500/30 -z-10 rounded-full"></span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-pastel-navy/60 dark:text-slate-400 mt-2">
          {t.skills.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SKILL_ITEMS.map((group, gIdx) => (
          <div
            key={gIdx}
            className={`border-2 rounded-3xl p-5 sm:p-6 md:p-7 bg-white dark:bg-slate-800 shadow-pastel-sm hover:shadow-pastel-md transition-all duration-200 transform hover:-translate-y-0.5 ${group.themeBg}`}
          >
            <h3 className="text-base sm:text-lg font-bold font-space text-pastel-navy dark:text-white flex items-center gap-2.5 pb-3.5 mb-5 sm:mb-6 border-b border-pastel-navy/10 dark:border-slate-700">
              {iconMap[group.groupKey]}
              {t.skills[group.groupKey]}
            </h3>

            <div className="flex flex-col gap-3.5 sm:gap-4">
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-pastel-navy/80 dark:text-slate-300">
                    <span className="truncate pr-2">{skill.name}</span>
                    <span className="font-mono text-pastel-blue-dark dark:text-sky-400 flex-shrink-0">{skill.val}%</span>
                  </div>

                  <div
                    role="progressbar"
                    aria-valuenow={skill.val}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name}: ${skill.val}%`}
                    className="h-2.5 sm:h-3 w-full bg-pastel-bg dark:bg-slate-900 rounded-full border border-pastel-navy/5 dark:border-slate-700 overflow-hidden"
                  >
                    <div
                      className="h-full rounded-full bg-pastel-blue-dark dark:bg-sky-500 transition-all duration-1000 ease-out will-change-transform"
                      style={{ width: animate ? `${skill.val}%` : '0%' }}
                    ></div>
                  </div>
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
