import { useContext } from 'react';
import { PortfolioContext } from './PortfolioContext';

/**
 * Custom hook to access global Portfolio context state and operations.
 * @typedef {Object} PortfolioContextType
 * @property {string} theme - Current theme ('light' | 'dark')
 * @property {boolean} isDark - True if active theme is dark
 * @property {() => void} toggleTheme - Toggle between light and dark
 * @property {string} lang - Active language ('id' | 'en')
 * @property {() => void} toggleLang - Toggle between ID and EN
 * @property {boolean} soundEnabled - True if sound effects are unmuted
 * @property {() => void} toggleSound - Toggle sound on/off
 * @property {(type?: string) => void} playSound - Play procedural audio chime
 * @property {boolean} isCommandPaletteOpen - True if Cmd+K palette is open
 * @property {(isOpen: boolean | ((prev: boolean) => boolean)) => void} setIsCommandPaletteOpen
 * @property {Object|null} selectedProjectForModal - Currently selected project or null
 * @property {(project: Object|null) => void} setSelectedProjectForModal
 * @property {Object} t - Translated strings dictionary
 *
 * @returns {PortfolioContextType}
 */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
