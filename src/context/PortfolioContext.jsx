import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

import { playSynthesizedChime } from '../utils/audio';

const PortfolioContext = createContext();

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
        t,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
