import React, { useEffect, useState } from 'react';
import { Brain, Globe, Shield, Users, Sparkles } from 'lucide-react';

export default function Keterampilan() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const skillGroups = [
    {
      title: 'AI, Computer Vision & Edge',
      icon: <Brain className="w-5 h-5 text-pastel-blue-dark" />,
      bg: 'bg-pastel-blue/30 border-pastel-blue/80',
      skills: [
        { name: 'MediaPipe Pose & Hands (WebAssembly / WebGL)', val: 92 },
        { name: 'YOLOv8 & DeepSORT Presenter Tracking', val: 88 },
        { name: 'Gemini 2.5 Flash & Vercel AI SDK', val: 90 },
        { name: 'Computer Vision & Real-Time Frame Processing', val: 85 },
      ]
    },
    {
      title: 'Modern Web Engineering',
      icon: <Globe className="w-5 h-5 text-amber-700" />,
      bg: 'bg-pastel-yellow/35 border-pastel-yellow-hover',
      skills: [
        { name: 'Next.js 14/15 (App Router, Server Actions) & React 19', val: 92 },
        { name: 'TypeScript & Modern Tailwind CSS (v3 / v4)', val: 95 },
        { name: 'Backend Engineering (FastAPI, Flask, Java MVC)', val: 88 },
        { name: 'Database & Realtime (Supabase, Firebase, MySQL)', val: 90 },
      ]
    },
    {
      title: 'Cybersecurity & DevOps Systems',
      icon: <Shield className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-pastel-green/35 border-pastel-green',
      skills: [
        { name: 'Offline-First Cryptography (AES-128 Fernet, PBKDF2)', val: 90 },
        { name: 'SHA-256 Incremental File Hashing & Integrity', val: 92 },
        { name: 'Docker, Containerization & CI/CD Pipelines', val: 84 },
        { name: 'Computer Networks & TCP/IP Socket Programming', val: 85 },
      ]
    },
    {
      title: 'Leadership & Engineering Quality',
      icon: <Users className="w-5 h-5 text-indigo-700" />,
      bg: 'bg-pastel-purple/35 border-pastel-purple',
      skills: [
        { name: 'HMIF Leadership (Chairman Executive Board 2025/2026)', val: 95 },
        { name: 'Test-Driven Development (95.8% Coverage Pytest/Vitest)', val: 90 },
        { name: 'Vibe Coding Architecture & PRD Structuring', val: 94 },
        { name: 'Public Speaking & Technical Pitching', val: 88 },
      ]
    }
  ];

  return (
    <section id="keterampilan" className="py-20 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-12">
      <div className="text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-space text-pastel-navy inline-block relative">
          Keahlian & Tech Stack
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-green/60 -z-10 rounded-full"></span>
        </h2>
        <p className="text-sm md:text-base text-pastel-navy/60 mt-2">
          Kombinasi teknologi mutakhir yang telah saya terapkan pada proyek riil, riset mandiri, dan lomba nasional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillGroups.map((group, gIdx) => (
          <div
            key={gIdx}
            className={`border-2 rounded-3xl p-6 md:p-7 bg-white shadow-pastel-sm hover:shadow-pastel-md transition-all duration-300 transform hover:-translate-y-1 ${group.bg}`}
          >
            <h3 className="text-lg font-bold font-space text-pastel-navy flex items-center gap-2.5 pb-3.5 mb-6 border-b border-pastel-navy/10">
              {group.icon}
              {group.title}
            </h3>

            <div className="flex flex-col gap-4">
              {group.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs md:text-sm font-bold text-pastel-navy/80">
                    <span>{skill.name}</span>
                    <span className="font-mono text-pastel-blue-dark">{skill.val}%</span>
                  </div>

                  <div className="h-3 w-full bg-pastel-bg rounded-full border border-pastel-navy/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pastel-blue-dark via-amber-400 to-emerald-500 shadow-pastel-sm transition-all duration-1000 ease-out"
                      style={{ width: animate ? `${skill.val}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
