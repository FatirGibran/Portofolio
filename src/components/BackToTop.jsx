import React, { useState, useEffect, memo } from 'react';
import { ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { playSound } = usePortfolio();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 450);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playSound('tab');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      title="Kembali ke Paling Atas"
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white/90 dark:bg-[#111624]/90 backdrop-blur-md border border-slate-200 dark:border-[#1E293B] text-slate-800 dark:text-sky-400 shadow-lg hover:border-blue-500 dark:hover:border-blue-500/60 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 group"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

export default memo(BackToTop);
