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

  // 5. Exploration Mode ('odyssey' | 'direct')
  const [experienceMode, setExperienceMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fatir_experience_mode');
      if (saved) return saved;
    }
    return 'odyssey';
  });

  // 6. The Builder's Odyssey Active Scene ('00' through '07')
  const [odysseyScene, setOdysseyScene] = useState('00');

  const toggleExperienceMode = () => {
    setExperienceMode((prev) => {
      const next = prev === 'odyssey' ? 'direct' : 'odyssey';
      if (typeof window !== 'undefined') {
        localStorage.setItem('fatir_experience_mode', next);
      }
      playSound('toggle');
      return next;
    });
  };

  const goToScene = (sceneId) => {
    if (sceneId) {
      setOdysseyScene(sceneId);
    }
    playSound('tab');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextScene = () => {
    const scenes = ['00', '01', '02', '03', '04', '05', '06', '07'];
    const idx = scenes.indexOf(odysseyScene);
    const nextIdx = (idx + 1) % scenes.length;
    goToScene(scenes[nextIdx]);
  };

  const prevScene = () => {
    const scenes = ['00', '01', '02', '03', '04', '05', '06', '07'];
    const idx = scenes.indexOf(odysseyScene);
    const prevIdx = (idx - 1 + scenes.length) % scenes.length;
    goToScene(scenes[prevIdx]);
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
        experienceMode,
        setExperienceMode,
        toggleExperienceMode,
        odysseyScene,
        setOdysseyScene,
        goToScene,
        nextScene,
        prevScene,
        journeyMode: experienceMode,
        setJourneyMode: setExperienceMode,
        toggleJourneyMode: toggleExperienceMode,
        journeyChapter: odysseyScene,
        setJourneyChapter: setOdysseyScene,
        jumpToJourneyChapter: goToScene,
        portfolioMode: experienceMode,
        setPortfolioMode: setExperienceMode,
        togglePortfolioMode: toggleExperienceMode,
        atlasStation: odysseyScene,
        setAtlasStation: setOdysseyScene,
        jumpToStation: goToScene,
        chroniclesChapter: odysseyScene,
        setChroniclesChapter: setOdysseyScene,
        jumpToChapter: goToScene,
        openSandboxTab: goToScene,
        sandboxTab: odysseyScene,
        setSandboxTab: setOdysseyScene,
        t,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export { usePortfolio } from './usePortfolio';
