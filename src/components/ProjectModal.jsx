import React, { useEffect, memo } from 'react';
import {
  X, ExternalLink, Play, Sparkles, ShieldCheck, GitBranch,
  Layers, CheckCircle2, ArrowRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

import { CASE_STUDIES } from '../data/projectCaseStudies';

function ProjectModal() {
  const {
    selectedProjectForModal,
    setSelectedProjectForModal,
    playSound,
    lang,
  } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProjectForModal) {
        setSelectedProjectForModal(null);
        playSound('click');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectForModal, setSelectedProjectForModal, playSound]);

  if (!selectedProjectForModal) return null;

  const project = selectedProjectForModal;
  const rawCaseStudy = CASE_STUDIES[project.id];

  const pipeline = (lang === 'en' && rawCaseStudy?.pipelineEn)
    ? rawCaseStudy.pipelineEn
    : (rawCaseStudy?.pipeline || [
      { step: 'Pipeline Ingestion', desc: 'Input stream and initial parameter parsing' },
      { step: 'Core Processing', desc: 'Algorithmic business execution' },
      { step: 'State & Storage', desc: 'Data persistence and state sync' },
      { step: 'Output Delivery', desc: 'Result presentation and visualization' }
    ]);

  const challenges = (lang === 'en' && rawCaseStudy?.challengesEn)
    ? rawCaseStudy.challengesEn
    : (rawCaseStudy?.challenges || 'Optimasi performa dan integritas data pada pemrosesan sistem.');

  const solution = (lang === 'en' && rawCaseStudy?.solutionEn)
    ? rawCaseStudy.solutionEn
    : (rawCaseStudy?.solution || 'Penerapan arsitektur komputasi terstruktur dan isolasi modul.');

  const metrics = rawCaseStudy?.metrics || [
    { label: 'Quality', val: 'A+' },
    { label: 'Latency', val: '<50ms' },
    { label: 'Reliability', val: '100%' },
  ];

  const labels = lang === 'en' ? {
    pipelineTitle: 'Architecture & Data Pipeline Flow',
    step: 'STEP',
    challengesTitle: 'Engineering Challenges',
    solutionTitle: 'Solution & Outcomes',
    techTitle: 'Technologies Used',
    viewGithub: 'View Code on GitHub',
    tryDemo: 'Try in Sandbox Demo',
    visitLive: 'Visit Live Site',
  } : {
    pipelineTitle: 'Arsitektur & Alur Data (System Pipeline)',
    step: 'STEP',
    challengesTitle: 'Tantangan Rekayasa',
    solutionTitle: 'Solusi & Hasil',
    techTitle: 'Teknologi yang Digunakan',
    viewGithub: 'Lihat Kode di GitHub',
    tryDemo: 'Uji di Sandbox Demo',
    visitLive: 'Kunjungi Web Live',
  };

  const description = (lang === 'en' && project.descEn) ? project.descEn : project.desc;

  const handleOpenSandbox = () => {
    setSelectedProjectForModal(null);
    playSound('tab');
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={() => {
          setSelectedProjectForModal(null);
          playSound('click');
        }}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border-2 border-pastel-yellow dark:border-amber-400/60 rounded-3xl shadow-pastel-lg overflow-hidden flex flex-col my-auto z-10 max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-pastel-peach/30 dark:border-slate-800 bg-pastel-bg/60 dark:bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-space uppercase tracking-wider text-pastel-blue-dark dark:text-sky-300 bg-pastel-blue/60 dark:bg-sky-950/60 py-1 px-3 rounded-full border border-pastel-blue/80 dark:border-sky-800">
              {project.role}
            </span>
            {project.badge && (
              <span className="text-xs font-bold font-space uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-pastel-yellow/90 dark:bg-amber-950/60 py-1 px-2.5 rounded-full border border-pastel-yellow-hover dark:border-amber-800 shadow-pastel-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                {project.badge}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setSelectedProjectForModal(null);
              playSound('click');
            }}
            className="p-1.5 rounded-full hover:bg-pastel-peach/40 dark:hover:bg-slate-800 text-pastel-navy dark:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Project Title & Overview */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-space font-extrabold text-pastel-navy dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-pastel-navy/80 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Architecture Pipeline Flow */}
          <div className="bg-pastel-bg/70 dark:bg-slate-950/50 p-4 sm:p-5 rounded-2xl border border-pastel-peach/50 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-pastel-blue-dark dark:text-sky-400" />
              <h4 className="text-xs font-bold font-space uppercase tracking-wider text-pastel-navy dark:text-slate-300">
                {labels.pipelineTitle}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {pipeline.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-pastel-navy/10 dark:border-slate-700 relative flex flex-col justify-between"
                >
                  <div className="text-xs font-mono font-bold text-pastel-blue-dark dark:text-sky-400 mb-1">
                    0{idx + 1}. {labels.step}
                  </div>
                  <div className="text-xs font-bold font-space text-pastel-navy dark:text-white leading-tight">
                    {item.step}
                  </div>
                  <div className="text-xs text-pastel-navy/70 dark:text-slate-300 mt-1 leading-normal">
                    {item.desc}
                  </div>
                  {idx < 3 && (
                    <ArrowRight className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-pastel-navy/30 dark:text-slate-600 z-10 bg-white dark:bg-slate-900 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-pastel-yellow/30 dark:bg-amber-950/20 p-3.5 rounded-2xl border border-pastel-yellow dark:border-amber-900/50 text-center"
              >
                <div className="text-lg sm:text-xl font-space font-extrabold text-pastel-navy dark:text-amber-300">
                  {m.val}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-pastel-navy/60 dark:text-slate-400">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-rose-50/70 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/40">
              <div className="font-bold font-space text-rose-700 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>{labels.challengesTitle}</span>
              </div>
              <p className="text-pastel-navy/70 dark:text-slate-300 leading-relaxed">
                {challenges}
              </p>
            </div>

            <div className="bg-emerald-50/70 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/40">
              <div className="font-bold font-space text-emerald-700 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{labels.solutionTitle}</span>
              </div>
              <p className="text-pastel-navy/70 dark:text-slate-300 leading-relaxed">
                {solution}
              </p>
            </div>
          </div>

          {/* Tech Stack List */}
          <div>
            <div className="text-xs font-bold font-space uppercase tracking-wider text-pastel-navy/60 dark:text-slate-400 mb-2">
              {labels.techTitle}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tItem, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold text-pastel-navy dark:text-slate-200 bg-pastel-bg dark:bg-slate-800 border border-pastel-navy/15 dark:border-slate-700 py-1 px-2.5 rounded-xl shadow-pastel-sm"
                >
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-pastel-peach/30 dark:border-slate-800 bg-pastel-bg/50 dark:bg-slate-950/40">
          <div>
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-navy dark:text-slate-200 hover:text-pastel-blue-dark dark:hover:text-sky-400 transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                <span>{labels.viewGithub}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {project.demoTab && (
              <button
                onClick={() => handleOpenSandbox(project.demoTab)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-navy bg-pastel-yellow hover:bg-pastel-yellow-hover border border-pastel-yellow-hover py-2 px-4 rounded-xl shadow-pastel-sm transition-transform hover:scale-105"
              >
                <Play className="w-3 h-3 fill-pastel-navy" />
                <span>{labels.tryDemo}</span>
              </button>
            )}

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-blue-dark dark:text-sky-400 bg-pastel-blue/60 dark:bg-sky-950/70 border border-pastel-blue-dark/40 py-2 px-4 rounded-xl shadow-pastel-sm transition-transform hover:scale-105"
              >
                <span>{labels.visitLive}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectModal);
