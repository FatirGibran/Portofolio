import React, { memo } from 'react';
import { Sparkles, Shield, Cpu, Award, Zap, Code2 } from 'lucide-react';
import { STORY_TICKER_ITEMS } from '../data/storyTickerData';

const iconMap = {
  Zap: <Zap className="w-3.5 h-3.5 text-amber-500" />,
  Cpu: <Cpu className="w-3.5 h-3.5 text-sky-400" />,
  Award: <Award className="w-3.5 h-3.5 text-amber-500" />,
  Shield: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5 text-pink-400" />,
  Code2: <Code2 className="w-3.5 h-3.5 text-indigo-400" />,
};

function StoryTicker() {
  const displayItems = [...STORY_TICKER_ITEMS, ...STORY_TICKER_ITEMS];

  return (
    <div className="relative w-full overflow-hidden py-3 bg-white/40 dark:bg-slate-900/50 backdrop-blur-md border-y border-pastel-peach/40 dark:border-slate-800 my-6">
      {/* Left/Right Gradient Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-pastel-bg dark:from-slate-900 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-pastel-bg dark:from-slate-900 to-transparent z-10" />

      {/* Infinite scrolling track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 mx-4 sm:mx-6 text-xs sm:text-sm font-bold font-space text-pastel-navy/80 dark:text-slate-300 whitespace-nowrap group"
          >
            <span className="p-1 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-pastel-navy/10 dark:border-slate-700 group-hover:scale-110 transition-transform">
              {iconMap[item.iconName]}
            </span>
            <span>{item.text}</span>
            <span className="text-pastel-peach-dark dark:text-slate-700 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(StoryTicker);
