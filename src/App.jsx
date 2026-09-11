import React, { useState, useEffect, useRef } from 'react';
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
import { Sparkles, Power } from 'lucide-react';
import { PortfolioProvider } from './context/PortfolioContext';

function PortfolioApp() {
  const [sandboxTab, setSandboxTab] = useState('posturelens');

  // Global Simulator states
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [isBlackoutActive, setIsBlackoutActive] = useState(false);
  const [isCurtainActive, setIsCurtainActive] = useState(false);
  const [isZoomActive, setIsZoomActive] = useState(false);

  const confettiCanvasRef = useRef(null);
  const requestRef = useRef(null);
  const particlesRef = useRef([]);

  // Laser Pointer Cursor follower
  useEffect(() => {
    if (!isLaserActive) return;

    const handleMouseMove = (e) => {
      setLaserPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLaserActive]);

  // Confetti Canvas animation loop
  useEffect(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    if (isConfettiActive) {
      canvas.style.display = 'block';
      const ctx = canvas.getContext('2d');
      
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const colors = ['#BAE6FD', '#FEF08A', '#FBCFE8', '#BBF7D0', '#E9D5FF'];
      const particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          size: Math.random() * 8 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: Math.random() * 4 + 2,
          speedX: Math.random() * 2 - 1,
          rotation: Math.random() * 360,
          rotSpeed: Math.random() * 4 - 2
        });
      }
      particlesRef.current = particles;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesRef.current.forEach(p => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotSpeed;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();

          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
        });

        requestRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(requestRef.current);
        canvas.style.display = 'none';
      };
    }
  }, [isConfettiActive]);

  const triggerGlobalEffect = (effect, addLog) => {
    switch (effect) {
      case 'pena':
        setIsLaserActive(true);
        if (addLog) addLog('Pointer Laser aktif. Gerakkan kursor! (Mati otomatis dalam 10s)', 'success');
        
        setTimeout(() => {
          setIsLaserActive(false);
          if (addLog) addLog('Pointer Laser dinonaktifkan (timeout 10s).', 'info');
        }, 10000);
        break;

      case 'konfeti':
        setIsConfettiActive(true);
        if (addLog) addLog('Memicu ledakan partikel konfeti...', 'success');
        
        setTimeout(() => {
          setIsConfettiActive(false);
          if (addLog) addLog('Animasi konfeti selesai.', 'info');
        }, 6000);
        break;

      case 'hitam':
        setIsBlackoutActive(true);
        if (addLog) addLog('Layar gelap diaktifkan. Klik "Kembalikan Layar" untuk memulihkan.', 'warning');
        break;

      case 'tirai':
        setIsCurtainActive(true);
        if (addLog) addLog('Menutup tirai sistem...', 'info');
        
        setTimeout(() => {
          setIsCurtainActive(false);
          if (addLog) addLog('Membuka tirai siber kembali...', 'success');
        }, 2200);
        break;

      case 'zoom':
        setIsZoomActive(true);
        if (addLog) addLog('Memfokuskan layout proyek utama (Zoom Fit)...', 'success');
        
        setTimeout(() => {
          setIsZoomActive(false);
          if (addLog) addLog('Fokus dikembalikan ke ukuran normal.', 'info');
        }, 2500);
        break;

      case 'normal':
        setIsLaserActive(false);
        setIsConfettiActive(false);
        setIsBlackoutActive(false);
        setIsCurtainActive(false);
        setIsZoomActive(false);
        if (addLog) addLog('Seluruh simulator efek dan gestur berhasil di-reset!', 'success');
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative min-h-screen bg-pastel-bg/80 dark:bg-slate-900/85 text-pastel-navy dark:text-slate-100 selection:bg-pastel-yellow selection:text-pastel-navy font-sans transition-colors duration-300">
      {/* 3D WebGL Persistent Spatial Canvas */}
      <SpatialStage3D
        isLaserActive={isLaserActive}
        laserPos={laserPos}
        isConfettiActive={isConfettiActive}
      />

      {/* Laser Pointer Cursor follow dot */}
      {isLaserActive && (
        <div
          style={{
            left: `${laserPos.x}px`,
            top: `${laserPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="fixed w-6 h-6 rounded-full bg-red-500/90 pointer-events-none z-[9999] shadow-[0_0_20px_rgba(239,68,68,0.9),0_0_40px_rgba(239,68,68,0.6)] mix-blend-screen"
        ></div>
      )}

      {/* Confetti Animation Canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998] hidden"
      />

      {/* Blackout Overlay */}
      <div
        className={`fixed inset-0 bg-[#121622] flex flex-col justify-center items-center z-[9990] transition-opacity duration-500 ${
          isBlackoutActive ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="text-center p-6 bg-white dark:bg-slate-800 border-4 border-pastel-yellow dark:border-amber-400 rounded-3xl max-w-sm shadow-pastel-lg">
          <h3 className="text-2xl font-space text-pastel-navy dark:text-white mb-2">[ LAYAR MATI ]</h3>
          <p className="text-sm font-bold text-pastel-navy/60 dark:text-slate-400 mb-6 font-mono">
            Perintah suara: "layar hitam" sukses dieksekusi.
          </p>
          <button
            onClick={() => {
              setIsBlackoutActive(false);
            }}
            className="inline-flex items-center gap-2 bg-pastel-blue dark:bg-sky-500 border-2 border-pastel-blue-dark text-pastel-navy font-bold py-2.5 px-6 rounded-xl hover:bg-pastel-blue/80 transition-colors shadow-pastel-sm"
          >
            <Power className="w-4 h-4" /> Kembalikan Layar
          </button>
        </div>
      </div>

      {/* Curtain split-panels overlay */}
      <div
        className={`fixed top-0 left-0 w-1/2 h-screen bg-[#FAF6EE] dark:bg-slate-950 border-r-4 border-pastel-blue-dark dark:border-sky-500 z-[9980] transition-transform duration-700 ease-in-out flex items-center justify-end pr-8 pointer-events-none ${
          isCurtainActive ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <span className="text-4xl md:text-5xl font-extrabold font-space text-pastel-navy dark:text-white">FATIR</span>
      </div>
      <div
        className={`fixed top-0 right-0 w-1/2 h-screen bg-[#FAF6EE] dark:bg-slate-950 border-l-4 border-pastel-yellow dark:border-amber-400 z-[9980] transition-transform duration-700 ease-in-out flex items-center justify-start pl-8 pointer-events-none ${
          isCurtainActive ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <span className="text-4xl md:text-5xl font-extrabold font-space text-pastel-blue-dark dark:text-sky-400">GIBRAN</span>
      </div>

      {/* Floating Sparkles decorative accent */}
      <div className="absolute top-12 right-12 pointer-events-none opacity-30 animate-pulse-soft">
        <Sparkles className="w-16 h-16 text-pastel-yellow dark:text-amber-400" />
      </div>

      {/* Site Structure Layer */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <StoryTicker />
        <About />

        {/* Projects Gallery */}
        <div
          style={{
            transform: isZoomActive ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
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
