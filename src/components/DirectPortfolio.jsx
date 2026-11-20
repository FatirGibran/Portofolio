import React, { memo } from 'react';
import Hero from './Hero';
import StoryTicker from './StoryTicker';
import About from './About';
import Projects from './Projects';
import Keterampilan from './Keterampilan';
import Footer from './Footer';

function DirectPortfolio({ toggleExperienceMode }) {
  return (
    <>
      <Hero />
      <StoryTicker />
      <About />
      <Projects />
      <Keterampilan />
      <Footer />

      {/* Floating Return to Odyssey Mode Pill */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleExperienceMode}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 dark:bg-white text-white dark:text-slate-950 font-space font-bold text-xs shadow-2xl backdrop-blur-md border border-slate-700/60 dark:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>✨ Mode Odyssey</span>
        </button>
      </div>
    </>
  );
}

export default memo(DirectPortfolio);
