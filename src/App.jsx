import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Sandbox from './components/Sandbox';
import Keterampilan from './components/Keterampilan';
import Footer from './components/Footer';
import SpatialStage3D from './components/SpatialStage3D';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import StoryTicker from './components/StoryTicker';
import BackToTop from './components/BackToTop';
import ClickRipple from './components/ClickRipple';
import { PortfolioProvider } from './context/PortfolioContext';

function PortfolioApp() {
  const [sandboxTab, setSandboxTab] = useState('posturelens');

  const triggerGlobalEffect = (effect, addLog) => {
    if (addLog) {
      addLog(`Perintah sistem [${effect}] dieksekusi dalam mode presisi.`, 'info');
    }
  };

  return (
    <div className="relative min-h-screen bg-canvas-light dark:bg-canvas-dark text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white font-sans transition-colors duration-300 antialiased">
      {/* Accessibility: Skip to main content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:font-space focus:font-bold focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        Lewati ke Konten Utama
      </a>

      {/* 3D WebGL Persistent Spatial Canvas (Optimized background) */}
      <SpatialStage3D />

      {/* Site Structure Layer */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <StoryTicker />
        <About />

        {/* Projects Gallery */}
        <div>
          <Projects onSelectSandboxTab={setSandboxTab} />
        </div>

        {/* Interactive Testing Sandbox (6 Demos) */}
        <Sandbox
          activeTab={sandboxTab}
          setActiveTab={setSandboxTab}
          triggerGlobalEffect={triggerGlobalEffect}
        />

        <Keterampilan />
        <Footer />
      </div>

      {/* Global Interactive Cyber Command Palette & Terminal (Cmd + K) */}
      <CommandPalette triggerGlobalEffect={triggerGlobalEffect} />

      {/* Project Architectural Case Study Deep-Dive Modal */}
      <ProjectModal />

      {/* Smooth Scroll Back To Top Button */}
      <BackToTop />

      {/* Subtle Interactive Click Ripple Wave */}
      <ClickRipple />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
