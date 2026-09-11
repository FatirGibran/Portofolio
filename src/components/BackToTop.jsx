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
      className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-pastel-yellow dark:border-amber-400/50 text-pastel-navy dark:text-amber-300 shadow-pastel-md hover:shadow-pastel-lg hover:scale-110 active:scale-95 hover:ring-4 hover:ring-pastel-yellow/30 dark:hover:ring-amber-400/20 focus:outline-none focus:ring-4 focus:ring-pastel-blue/40 transition-all duration-200 animate-bounce-soft group"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}

export default memo(BackToTop);
