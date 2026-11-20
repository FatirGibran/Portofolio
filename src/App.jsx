import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { useScrollReveal } from './hooks/useScrollReveal';

// Dynamic lazy imports to split bundle and eliminate render-blocking JS
const SpatialStage3D = lazy(() => import('./components/SpatialStage3D'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const BackToTop = lazy(() => import('./components/BackToTop'));
const ClickRipple = lazy(() => import('./components/ClickRipple'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));

// Mode-specific dynamic views
const TheBuildersOdyssey = lazy(() => import('./components/TheBuildersOdyssey'));
const DirectPortfolio = lazy(() => import('./components/DirectPortfolio'));

function PortfolioApp() {
  const { experienceMode, toggleExperienceMode } = usePortfolio();
  useScrollReveal(experienceMode);

  // Interactive Presentation Effects State
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isBlackoutActive, setIsBlackoutActive] = useState(false);
  const [isCurtainActive, setIsCurtainActive] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);

  const confettiCanvasRef = useRef(null);
  const laserTimerRef = useRef(null);
  const confettiTimerRef = useRef(null);
  const curtainTimerRef = useRef(null);
  const zoomTimerRef = useRef(null);

  // Laser Pointer Cursor follower
  useEffect(() => {
    if (!isLaserActive) return;

    const handleMouseMove = (e) => {
      setLaserPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLaserActive]);

  // Keyboard shortcut to exit blackout mode
  useEffect(() => {
    if (!isBlackoutActive) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsBlackoutActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBlackoutActive]);

  // Confetti 2D Canvas Animation Loop
  useEffect(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    if (!isConfettiActive) {
      canvas.style.display = 'none';
      return;
    }

    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#38BDF8', '#FDE047', '#F472B6', '#4ADE80', '#A78BFA', '#FB923C'];
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2.5,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 5 - 2.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
      if (canvas) {
        const c = canvas.getContext('2d');
        if (c) c.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
      }
    };
  }, [isConfettiActive]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (laserTimerRef.current) clearTimeout(laserTimerRef.current);
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
      if (curtainTimerRef.current) clearTimeout(curtainTimerRef.current);
      if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
    };
  }, []);

  // Global Trigger Handler for Voice Commands and Terminal Commands
  const triggerGlobalEffect = (effect, addLog) => {
    switch (effect) {
      case 'pena':
      case 'laser':
        setIsLaserActive(true);
        if (addLog) addLog('Pointer Laser aktif. Gerakkan kursor! (Mati otomatis dalam 10s)', 'success');
        if (laserTimerRef.current) clearTimeout(laserTimerRef.current);
        laserTimerRef.current = setTimeout(() => {
          setIsLaserActive(false);
          if (addLog) addLog('Pointer Laser dinonaktifkan (timeout 10s).', 'info');
        }, 10000);
        break;

      case 'konfeti':
      case 'confetti':
        setIsConfettiActive(true);
        if (addLog) addLog('Memicu ledakan partikel konfeti...', 'success');
        if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
        confettiTimerRef.current = setTimeout(() => {
          setIsConfettiActive(false);
          if (addLog) addLog('Animasi konfeti selesai.', 'info');
        }, 4000);
        break;

      case 'hitam':
      case 'blackout':
        setIsBlackoutActive(true);
        if (addLog) addLog('Layar hitam presentasi diaktifkan. Klik layar atau tekan ESC untuk memulihkan.', 'action');
        break;

      case 'tirai':
      case 'curtain':
        setIsCurtainActive(true);
        if (addLog) addLog('Menutup tirai siber...', 'info');
        if (curtainTimerRef.current) clearTimeout(curtainTimerRef.current);
        curtainTimerRef.current = setTimeout(() => {
          setIsCurtainActive(false);
          if (addLog) addLog('Membuka tirai siber kembali...', 'success');
        }, 2200);
        break;

      case 'zoom':
        setIsZoomActive(true);
        if (addLog) addLog('Memfokuskan layout proyek utama (Zoom Fit)...', 'success');
        if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
        zoomTimerRef.current = setTimeout(() => {
          setIsZoomActive(false);
          if (addLog) addLog('Fokus dikembalikan ke ukuran normal.', 'info');
        }, 2500);
        break;

      case 'normal':
      case 'reset':
        setIsLaserActive(false);
        setIsConfettiActive(false);
        setIsBlackoutActive(false);
        setIsCurtainActive(false);
        setIsZoomActive(false);
        if (laserTimerRef.current) clearTimeout(laserTimerRef.current);
        if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
        if (curtainTimerRef.current) clearTimeout(curtainTimerRef.current);
        if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current);
        if (addLog) addLog('Seluruh simulator efek dan gestur berhasil di-reset!', 'success');
        break;

      default:
        if (addLog) addLog(`Perintah sistem [${effect}] dieksekusi.`, 'info');
        break;
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

      {/* 3D WebGL Spatial Canvas for Direct Mode & Interactive Effects */}
      {experienceMode === 'direct' && (
        <Suspense fallback={null}>
          <SpatialStage3D
            isLaserActive={isLaserActive}
            laserPos={laserPos}
            isConfettiActive={isConfettiActive}
          />
        </Suspense>
      )}

      {/* Laser Pointer Cursor follow dot */}
      {isLaserActive && (
        <div
          style={{
            left: `${laserPos.x}px`,
            top: `${laserPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="fixed w-7 h-7 rounded-full bg-red-500/90 pointer-events-none z-[9999] shadow-[0_0_20px_rgba(239,68,68,0.9),0_0_40px_rgba(239,68,68,0.6)] mix-blend-screen animate-pulse"
        >
          <div className="absolute -inset-1 rounded-full border border-red-400/60 animate-ping opacity-60" />
        </div>
      )}

      {/* Confetti 2D Fullscreen Animation Canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998] hidden"
      />

      {/* Presentation Blackout Overlay */}
      {isBlackoutActive && (
        <div
          onClick={() => setIsBlackoutActive(false)}
          className="fixed inset-0 bg-[#0B1120] z-[9990] flex flex-col items-center justify-center cursor-pointer p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="text-center p-6 bg-slate-900/95 border-2 border-slate-700 rounded-3xl max-w-sm shadow-2xl backdrop-blur-md"
          >
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block mb-2">
              [ MODE PRESENTASI: LAYAR HITAM ]
            </span>
            <p className="text-sm text-slate-300 mb-6 font-space">
              Perintah suara: "layar hitam" aktif untuk memfokuskan audiens ke presenter.
            </p>
            <button
              onClick={() => setIsBlackoutActive(false)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md text-xs font-space"
            >
              Kembalikan Layar Normal
            </button>
            <span className="block text-[10px] text-slate-500 mt-3 font-mono">
              (Tekan ESC atau klik layar untuk memulihkan)
            </span>
          </div>
        </div>
      )}

      {/* Presentation Curtain Split-Panels Overlay */}
      <div
        className={`fixed top-0 left-0 w-1/2 h-screen bg-[#FAF6EE] dark:bg-[#090D16] border-r-4 border-blue-600 dark:border-sky-500 z-[9980] transition-transform duration-700 ease-in-out flex items-center justify-end pr-8 pointer-events-none ${
          isCurtainActive ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <span className="text-4xl md:text-5xl font-extrabold font-space text-slate-900 dark:text-white">FATIR</span>
      </div>
      <div
        className={`fixed top-0 right-0 w-1/2 h-screen bg-[#FAF6EE] dark:bg-[#090D16] border-l-4 border-amber-400 dark:border-amber-400 z-[9980] transition-transform duration-700 ease-in-out flex items-center justify-start pl-8 pointer-events-none ${
          isCurtainActive ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <span className="text-4xl md:text-5xl font-extrabold font-space text-blue-600 dark:text-sky-400">GIBRAN</span>
      </div>

      {/* Site Structure Layer with interactive zoom transform */}
      <div
        className="relative z-10 origin-top"
        style={{
          transform: isZoomActive ? 'scale(1.025)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Global Unified Navigation: Always Mounted in Both Modes */}
        <Navbar />

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#08090D] text-[#43D9E8] font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#43D9E8] animate-ping mr-2.5" />
              <span>INITIALIZING OBSIDIAN NOIR ENGINE...</span>
            </div>
          }
        >
          {experienceMode === 'odyssey' ? (
            <TheBuildersOdyssey triggerGlobalEffect={triggerGlobalEffect} />
          ) : (
            <DirectPortfolio toggleExperienceMode={toggleExperienceMode} />
          )}
        </Suspense>
      </div>

      <Suspense fallback={null}>
        {/* Global Interactive Cyber Command Palette & Terminal (Cmd + K) */}
        <CommandPalette triggerGlobalEffect={triggerGlobalEffect} />

        {/* Project Architectural Case Study Deep-Dive Modal */}
        <ProjectModal />

        {/* Smooth Scroll Back To Top Button */}
        <BackToTop />

        {/* Subtle Interactive Click Ripple Wave */}
        <ClickRipple />

        {/* Precision Trailing Cursor (Desktop fine pointer only) */}
        <CustomCursor />
      </Suspense>
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
