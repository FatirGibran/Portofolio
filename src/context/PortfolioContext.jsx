import React, { createContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

import { playSynthesizedChime } from '../utils/audio';

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  // 1. Theme State (light / dark)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('fatir_portfolio_theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // 2. Language State (id / en)
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('fatir_portfolio_lang');
      if (savedLang) return savedLang;
      return 'id';
    }
    return 'id';
  });

  // 3. Audio / Sound FX State
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem('fatir_portfolio_sound');
      return savedSound !== null ? savedSound === 'true' : true;
    }
    return true;
  });

  // 4. Global Modals State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);

  // 5. Exploration Mode ('story' | 'direct')
  const [journeyMode, setJourneyMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fatir_journey_mode');
      if (saved) return saved;
    }
    return 'story';
  });

  // 6. The Builder's Journey Chapter State ('00' through '07')
  const [journeyChapter, setJourneyChapter] = useState('00');

  const toggleJourneyMode = () => {
    setJourneyMode((prev) => {
      const next = prev === 'story' ? 'direct' : 'story';
      if (typeof window !== 'undefined') {
        localStorage.setItem('fatir_journey_mode', next);
      }
      playSound('toggle');
      return next;
    });
  };

  const jumpToJourneyChapter = (chapterId) => {
    if (chapterId) {
      setJourneyChapter(chapterId);
    }
    playSound('tab');
    if (typeof document !== 'undefined') {
      const el = document.getElementById('the-builders-journey');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Sync dark class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fatir_portfolio_theme', theme);
  }, [theme]);

  // Sync lang in localStorage
  useEffect(() => {
    localStorage.setItem('fatir_portfolio_lang', lang);
  }, [lang]);

  // Sync sound in localStorage
  useEffect(() => {
    localStorage.setItem('fatir_portfolio_sound', String(soundEnabled));
  }, [soundEnabled]);

  const playSound = (type = 'click') => {
    if (soundEnabled) {
      playSynthesizedChime(type);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) {
        playSynthesizedChime('toggle');
      }
      return next;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      playSound('toggle');
      return next;
    });
  };

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'id' ? 'en' : 'id';
      playSound('tab');
      return next;
    });
  };

  const t = translations[lang] || translations.id;

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDark: theme === 'dark',
        lang,
        setLang,
        toggleLang,
        soundEnabled,
        toggleSound,
        playSound,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        selectedProjectForModal,
        setSelectedProjectForModal,
        journeyMode,
        setJourneyMode,
        toggleJourneyMode,
        journeyChapter,
        setJourneyChapter,
        jumpToJourneyChapter,
        portfolioMode: journeyMode,
        setPortfolioMode: setJourneyMode,
        togglePortfolioMode: toggleJourneyMode,
        atlasStation: journeyChapter,
        setAtlasStation: setJourneyChapter,
        jumpToStation: jumpToJourneyChapter,
        chroniclesChapter: journeyChapter,
        setChroniclesChapter: setJourneyChapter,
        jumpToChapter: jumpToJourneyChapter,
        openSandboxTab: jumpToJourneyChapter,
        sandboxTab: journeyChapter,
        setSandboxTab: setJourneyChapter,
        t,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export { usePortfolio } from './usePortfolio';
