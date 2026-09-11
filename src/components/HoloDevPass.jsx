import React, { useState, useRef, useCallback, memo } from 'react';
import {
  RotateCw, Maximize2, Check, Copy, Wifi, ShieldCheck,
  Cpu, Sparkles, ExternalLink, X
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

function HoloDevPass({ isModal = false }) {
  const { playSound } = usePortfolio();
  const cardRef = useRef(null);

  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isNfcActive, setIsNfcActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [foilStyle, setFoilStyle] = useState('prism'); // 'prism' | 'gold' | 'matrix'
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // 3D Tilt calculation based on cursor position over card
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    // Subtle max rotation +/- 16 degrees
    const rX = ((y - centerY) / centerY) * -16;
    const rY = ((x - centerX) / centerX) * 16;

    setRotX(rX);
    setRotY(rY);
    setGlare({ x: percentX, y: percentY, opacity: 0.75 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Return to resting position
    setRotX(0);
    setRotY(0);
    setGlare(prev => ({ ...prev, opacity: 0 }));
  }, []);

  const toggleFlip = (e) => {
    if (e) e.stopPropagation();
    playSound('tab');
    setIsFlipped(prev => !prev);
  };

  const triggerNfcTap = (e) => {
    if (e) e.stopPropagation();
    playSound('success');
    setIsNfcActive(true);
    setTimeout(() => setIsNfcActive(false), 2400);
  };

  const copyVCard = (e) => {
    if (e) e.stopPropagation();
    playSound('click');
    navigator.clipboard.writeText('fatirgibran08@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Holographic Foil Gradients
  const foilGradients = {
    prism: 'linear-gradient(115deg, transparent 15%, rgba(255,255,255,0.6) 35%, rgba(56,189,248,0.5) 48%, rgba(236,72,153,0.5) 55%, rgba(250,204,21,0.5) 62%, transparent 85%)',
    gold: 'linear-gradient(115deg, transparent 15%, rgba(254,240,138,0.7) 35%, rgba(234,179,8,0.6) 50%, rgba(254,240,138,0.8) 65%, transparent 85%)',
    matrix: 'linear-gradient(115deg, transparent 15%, rgba(110,231,183,0.6) 35%, rgba(16,185,129,0.7) 50%, rgba(52,211,153,0.6) 65%, transparent 85%)',
  };

  return (
    <>
      <div className="relative flex flex-col items-center">
        {/* Interactive Top Actions */}
        <div className="flex items-center gap-2 mb-3 z-10">
          <button
            onClick={toggleFlip}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-space bg-white/90 dark:bg-slate-800/90 border border-pastel-peach dark:border-slate-700 text-pastel-navy dark:text-slate-200 shadow-pastel-sm hover:scale-105 active:scale-95 transition-all"
            title="Balik Kartu 3D"
          >
            <RotateCw className={`w-3.5 h-3.5 text-pastel-blue-dark dark:text-sky-400 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? 'Lihat Depan' : 'Balik Kartu (3D)'}</span>
          </button>

          {!isModal && (
            <button
              onClick={() => {
                playSound('modal');
                setIsFullscreenOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-space bg-white/90 dark:bg-slate-800/90 border border-pastel-yellow dark:border-amber-400/40 text-pastel-navy dark:text-slate-200 shadow-pastel-sm hover:scale-105 active:scale-95 transition-all"
              title="Perbesar Tampilan 3D"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Inspeksi Penuh</span>
            </button>
          )}
        </div>

        {/* Lanyard Strap Decor */}
        <div className="w-16 h-4 bg-gradient-to-r from-pastel-blue via-pastel-blue-dark to-pastel-blue rounded-t-md border-x border-t border-pastel-blue-dark/40 shadow-inner flex items-center justify-center -mb-0.5 z-10">
          <div className="w-6 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full border border-slate-400"></div>
        </div>

        {/* 3D Perspective Card Container */}
        <div
          style={{ perspective: '1200px' }}
          className="relative select-none"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY + (isFlipped ? 180 : 0)}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="w-72 sm:w-80 h-[430px] sm:h-[450px] relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing transform-gpu"
          >
            {/* Holographic Prismatic Foil Glare Overlay */}
            <div
              style={{
                backgroundImage: foilGradients[foilStyle],
                backgroundPosition: `${glare.x}% ${glare.y}%`,
                backgroundSize: '250% 250%',
                opacity: glare.opacity,
                transform: 'translateZ(1px)',
              }}
              className="absolute inset-0 rounded-3xl pointer-events-none z-30 mix-blend-color-dodge transition-opacity duration-300"
            />

            {/* Specular Radial Spotlight */}
            <div
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
                opacity: glare.opacity,
                transform: 'translateZ(2px)',
              }}
              className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300"
            />

            {/* ============================================================== */}
            {/* FRONT FACE (Identity & Leadership) */}
            {/* ============================================================== */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-white via-[#FDFBF7] to-[#F3ECE0] dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border-2 border-pastel-yellow dark:border-amber-400/40 p-5 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Header & Security Chip */}
              <div>
                <div className="flex items-center justify-between border-b border-pastel-navy/10 dark:border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-pastel-yellow dark:bg-amber-400/20 border border-amber-400 flex items-center justify-center shadow-pastel-sm">
                      <Sparkles className="w-4 h-4 text-pastel-navy dark:text-amber-300" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-space font-extrabold uppercase tracking-widest text-pastel-navy/50 dark:text-slate-400">
                        HMIF VERIFIED PASS
                      </span>
                      <span className="block text-xs font-mono font-bold text-pastel-blue-dark dark:text-sky-400">
                        DEV // ROOT 0x7F
                      </span>
                    </div>
                  </div>

                  {/* Gold Cyber Security Chip Icon */}
                  <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-600 shadow-inner flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-[1px] bg-amber-700/60 my-auto"></div>
                    <div className="absolute inset-x-2 h-full border-x border-amber-700/50"></div>
                  </div>
                </div>

                {/* Profile Photo & Holographic Frame */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-pastel-blue-dark dark:border-sky-400 shadow-pastel-md flex-shrink-0">
                    <img
                      src="Image/fotomuka.jpg"
                      alt="Fatir Gibran"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono font-bold text-white bg-emerald-600/90 px-1 rounded">
                      ACTIVE
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-space font-extrabold text-pastel-navy dark:text-white leading-tight">
                      FATIR GIBRAN
                    </h3>
                    <p className="text-[11px] font-bold text-pastel-blue-dark dark:text-sky-300 mt-0.5">
                      Chairman of HMIF
                    </p>
                    <p className="text-[10px] text-pastel-navy/70 dark:text-slate-400 mt-0.5 font-mono">
                      Telkom University Purwokerto
                    </p>
                    <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-[9px] font-mono font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Security Clearance 05</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Skill Chips */}
              <div className="bg-white/70 dark:bg-slate-800/70 p-2.5 rounded-2xl border border-pastel-navy/10 dark:border-slate-700">
                <span className="block text-[9px] font-mono uppercase tracking-wider text-pastel-navy/50 dark:text-slate-400 mb-1.5">
                  Core Engineering Stack
                </span>
                <div className="flex flex-wrap gap-1">
                  {['React 19', 'Edge AI', 'MediaPipe', 'FastAPI', 'AES-128', 'WASM'].map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-pastel-blue/30 dark:bg-sky-950 border border-pastel-blue-dark/20 dark:border-sky-800 text-pastel-navy dark:text-sky-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* NFC Contactless Tap Section */}
              <div className="pt-2 border-t border-pastel-navy/10 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-left">
                    <span className="block text-[9px] font-mono text-pastel-navy/50 dark:text-slate-400 uppercase">
                      ID Number
                    </span>
                    <span className="text-xs font-mono font-bold text-pastel-navy dark:text-white">
                      FG-2024-TELKOM-IF
                    </span>
                  </div>
                </div>

                <button
                  onClick={triggerNfcTap}
                  className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-mono font-bold transition-all shadow-sm ${
                    isNfcActive
                      ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                      : 'bg-white dark:bg-slate-800 border-pastel-peach dark:border-slate-600 text-pastel-navy dark:text-slate-200 hover:bg-pastel-yellow/40'
                  }`}
                  title="Klik untuk simulasi tap NFC"
                >
                  <Wifi className={`w-3.5 h-3.5 ${isNfcActive ? 'animate-ping' : ''}`} />
                  <span className="text-[10px]">{isNfcActive ? 'BIP! VERIFIED' : 'TAP NFC'}</span>
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* BACK FACE (Tech Specs, Verification Barcode & Connect) */}
            {/* ============================================================== */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-[#FAF6EE] via-white to-[#F0EAE1] dark:from-slate-900 dark:via-slate-850 dark:to-slate-800 border-2 border-pastel-blue dark:border-sky-500/50 p-5 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Magnetic Stripe */}
                <div className="-mx-5 -mt-5 h-11 bg-slate-900 dark:bg-black border-b border-slate-700 flex items-center justify-between px-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  <span className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">
                    TELKOM-HMIF-CRYPTOGRAPHIC-VAULT
                  </span>
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                </div>

                {/* Back Details */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-pastel-navy/10 dark:border-slate-700 pb-1.5">
                    <span className="text-pastel-navy/60 dark:text-slate-400">STATUS:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">CERTIFIED ENGINEER</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-pastel-navy/10 dark:border-slate-700 pb-1.5">
                    <span className="text-pastel-navy/60 dark:text-slate-400">INSTITUTION:</span>
                    <span className="font-bold text-pastel-navy dark:text-white">TELKOM UNIVERSITY</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-pastel-navy/10 dark:border-slate-700 pb-1.5">
                    <span className="text-pastel-navy/60 dark:text-slate-400">LEADERSHIP:</span>
                    <span className="font-bold text-pastel-navy dark:text-white">CHAIRMAN 2024-2025</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-pastel-navy/10 dark:border-slate-700 pb-1.5">
                    <span className="text-pastel-navy/60 dark:text-slate-400">PROD SYSTEMS:</span>
                    <span className="font-bold text-pastel-blue-dark dark:text-sky-400">20+ DEPLOYED</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="mt-4 p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-pastel-navy/10 dark:border-slate-700 text-center">
                  <div className="flex justify-center items-center gap-[2px] h-9 mb-1">
                    {[3,1,4,2,1,3,1,2,4,1,2,3,1,4,2,1,3,2,1,3,4,1,2,1].map((w, i) => (
                      <div
                        key={i}
                        style={{ width: `${w * 2}px` }}
                        className="h-full bg-pastel-navy dark:bg-slate-200"
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-pastel-navy/60 dark:text-slate-400">
                    SHA256: 7F4A-99B1-FATIR-GIBRAN-OK
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-pastel-navy/10 dark:border-slate-700 flex gap-2">
                <button
                  onClick={copyVCard}
                  className="flex-1 py-2 px-3 rounded-xl bg-pastel-yellow dark:bg-amber-400 text-pastel-navy font-space font-bold text-xs flex items-center justify-center gap-1.5 shadow-pastel-sm hover:bg-pastel-yellow-hover active:scale-95 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Kontak'}</span>
                </button>

                <a
                  href="https://linkedin.com/in/fatirgibran"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('tab')}
                  className="py-2 px-3 rounded-xl bg-white dark:bg-slate-800 border border-pastel-blue-dark dark:border-sky-500 text-pastel-blue-dark dark:text-sky-300 font-space font-bold text-xs flex items-center justify-center gap-1 shadow-pastel-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Micro-Instruction */}
        <p className="text-[11px] font-mono text-pastel-navy/60 dark:text-slate-400 mt-3 text-center">
          💡 Arahkan kursor atau sentuh untuk efek 3D hologram
        </p>
      </div>

      {/* ================================================================ */}
      {/* FULLSCREEN INSPECTOR MODAL */}
      {/* ================================================================ */}
      {isFullscreenOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex flex-col justify-center items-center p-4 animate-fade-in"
          onClick={() => {
            playSound('modal');
            setIsFullscreenOpen(false);
          }}
        >
          {/* Modal Header Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between w-full max-w-md mb-4 px-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-300">Foil Finish:</span>
              {(['prism', 'gold', 'matrix']).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    playSound('click');
                    setFoilStyle(mode);
                  }}
                  className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all ${
                    foilStyle === mode
                      ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                playSound('modal');
                setIsFullscreenOpen(false);
              }}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Tutup Inspektor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Render Card inside Modal */}
          <div onClick={(e) => e.stopPropagation()}>
            <HoloDevPass isModal={true} />
          </div>
        </div>
      )}
    </>
  );
}

export default memo(HoloDevPass);
