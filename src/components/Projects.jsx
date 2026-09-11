import React, { useState, useMemo, useCallback, memo } from 'react';
import { ExternalLink, Play, Search, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ALL_PROJECTS } from '../data/projectsData';

// Custom inline SVG icon for GitHub
const GithubIcon = memo((props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
));

const ProjectCard = memo(({ project, onOpenSandboxDemo, onOpenCaseStudy, btnTryDemo, btnVisit, btnGitHub, lang }) => {
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((centerY - y) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;
    
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('');
    setGlare(prev => ({ ...prev, opacity: 0 }));
  }, []);

  const description = (lang === 'en' && project.descEn) ? project.descEn : project.desc;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? 'transform 0.05s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-pastel-peach/50 dark:border-slate-700/80 hover:border-pastel-blue dark:hover:border-sky-500 rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 shadow-pastel-sm hover:shadow-pastel-md group transform-gpu-safe"
    >
      {/* Holographic Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-10"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(56, 189, 248, 0.18) 0%, rgba(254, 240, 138, 0.1) 40%, transparent 75%)`,
        }}
      />
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[10px] sm:text-[11px] font-bold font-space uppercase tracking-wider text-pastel-blue-dark dark:text-sky-300 bg-pastel-blue/60 dark:bg-sky-950/60 py-1 px-2.5 sm:px-3 rounded-full border border-pastel-blue/80 dark:border-sky-800">
            {project.role}
          </span>
          {project.badge && (
            <span className="text-[10px] font-bold font-space uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-pastel-yellow/90 dark:bg-amber-950/60 py-0.5 sm:py-1 px-2 sm:px-2.5 rounded-full border border-pastel-yellow-hover dark:border-amber-800 shadow-pastel-sm flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-space font-bold text-pastel-navy dark:text-white mb-2 leading-snug group-hover:text-pastel-blue-dark dark:group-hover:text-sky-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-pastel-navy/70 dark:text-slate-300 leading-relaxed mb-4 sm:mb-5">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-5 sm:mb-6">
          {project.tech.map((tItem, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold text-pastel-navy/60 dark:text-slate-300 bg-pastel-bg dark:bg-slate-900 border border-pastel-navy/10 dark:border-slate-700 py-0.5 px-2 rounded-lg"
            >
              {tItem}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-pastel-peach/30 dark:border-slate-700/60 mt-auto">
        <button
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-blue-dark dark:text-sky-300 bg-pastel-blue/40 dark:bg-sky-950/60 hover:bg-pastel-blue/70 dark:hover:bg-sky-900 border border-pastel-blue-dark/30 dark:border-sky-800 py-2 px-3 sm:px-3.5 rounded-xl transition-all hover:scale-105 min-h-[40px]"
          title="Lihat Diagram Arsitektur & Case Study"
        >
          <Layers className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{lang === 'en' ? 'Architecture' : 'Arsitektur'}</span>
        </button>

        {project.demoTab && (
          <button
            onClick={() => onOpenSandboxDemo(project.demoTab)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pastel-navy bg-pastel-yellow hover:bg-pastel-yellow-hover border border-pastel-yellow-hover py-2 px-3 sm:px-3.5 rounded-xl shadow-pastel-sm transition-all hover:scale-105 min-h-[40px]"
          >
            <Play className="w-3.5 h-3.5 fill-pastel-navy flex-shrink-0" />
            <span>{btnTryDemo}</span>
          </button>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-pastel-green/40 dark:bg-emerald-950/60 hover:bg-pastel-green/80 dark:hover:bg-emerald-900 border border-pastel-green border-emerald-600/30 dark:border-emerald-700 py-2 px-3 sm:px-3.5 rounded-xl transition-colors min-h-[40px]"
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{btnVisit}</span>
          </a>
        )}

        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-pastel-navy/80 dark:text-slate-300 hover:text-pastel-navy dark:hover:text-white bg-pastel-bg dark:bg-slate-900 hover:bg-pastel-peach/40 dark:hover:bg-slate-700 border border-pastel-navy/15 dark:border-slate-700 py-2 px-3 rounded-xl transition-colors ml-auto min-h-[40px]"
          >
            <GithubIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{btnGitHub}</span>
          </a>
        )}
      </div>
    </div>
  );
});

function Projects({ onSelectSandboxTab }) {
  const { t, lang, setSelectedProjectForModal, playSound } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts and definitions memoized
  const categories = useMemo(() => [
    { id: 'all', label: t.projects.categories.all, count: ALL_PROJECTS.length },
    { id: 'ai', label: t.projects.categories.ai, count: ALL_PROJECTS.filter(p => p.category === 'ai').length },
    { id: 'fullstack', label: t.projects.categories.fullstack, count: ALL_PROJECTS.filter(p => p.category === 'fullstack').length },
    { id: 'cybersec', label: t.projects.categories.cybersec, count: ALL_PROJECTS.filter(p => p.category === 'cybersec').length },
    { id: 'org', label: t.projects.categories.org, count: ALL_PROJECTS.filter(p => p.category === 'org').length },
  ], [t.projects.categories]);

  // Filtered projects computed efficiently via useMemo
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_PROJECTS.filter(project => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const desc = (lang === 'en' && project.descEn) ? project.descEn : project.desc;
      return (
        project.title.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        project.tech.some(tItem => tItem.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery, lang]);

  const handleOpenSandbox = useCallback((tabId) => {
    if (onSelectSandboxTab) {
      onSelectSandboxTab(tabId);
    }
    const sandboxEl = document.getElementById('simulator');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onSelectSandboxTab]);

  return (
    <section id="proyek" className="py-16 sm:py-20 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto scroll-mt-12 content-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b-2 border-pastel-peach/30 dark:border-slate-800 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pastel-yellow/80 dark:bg-amber-400/20 border border-pastel-yellow-hover dark:border-amber-400/40 text-pastel-navy dark:text-amber-300 font-bold text-[11px] uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-pastel-blue-dark dark:text-amber-400" />
              <span>{t.projects.badgeVerified}</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-space text-pastel-navy dark:text-white inline-block relative">
            {t.projects.title}
            <span className="absolute bottom-1 sm:bottom-1.5 left-0 w-1/2 h-2.5 sm:h-3 bg-pastel-yellow/60 dark:bg-amber-400/30 -z-10 rounded-full"></span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-pastel-navy/70 dark:text-slate-300 mt-2 max-w-xl leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-pastel-peach dark:border-slate-700 focus:border-pastel-blue-dark dark:focus:border-sky-400 outline-none font-semibold text-xs md:text-sm text-pastel-navy dark:text-white bg-white dark:bg-slate-800 shadow-pastel-sm transition-colors min-h-[44px]"
          />
          <Search className="w-4 h-4 text-pastel-navy/40 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              playSound('tab');
            }}
            className={`flex items-center gap-1.5 sm:gap-2 py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold font-space transition-all duration-200 border-2 min-h-[40px] ${
              activeCategory === cat.id
                ? 'bg-pastel-yellow dark:bg-amber-400 text-pastel-navy border-pastel-yellow-hover shadow-pastel-sm scale-105'
                : 'bg-white dark:bg-slate-800 border-pastel-peach/50 dark:border-slate-700 text-pastel-navy/70 dark:text-slate-300 hover:bg-pastel-peach/20 dark:hover:bg-slate-750 hover:text-pastel-navy dark:hover:text-white'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              activeCategory === cat.id ? 'bg-pastel-navy/10 text-pastel-navy' : 'bg-pastel-bg dark:bg-slate-900 text-pastel-navy/50 dark:text-slate-400'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
        {filteredProjects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard
              project={project}
              onOpenSandboxDemo={handleOpenSandbox}
              onOpenCaseStudy={(proj) => {
                playSound('modal');
                setSelectedProjectForModal(proj);
              }}
              btnTryDemo={t.projects.btnTryDemo}
              btnVisit={t.projects.btnVisit}
              btnGitHub={t.projects.btnGitHub}
              lang={lang}
            />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-800 border-2 border-dashed border-pastel-peach dark:border-slate-700 rounded-3xl mt-4">
          <span className="block text-2xl mb-2">🔍</span>
          <h4 className="font-space font-bold text-pastel-navy dark:text-white text-base sm:text-lg mb-1">{t.projects.noMatchTitle}</h4>
          <p className="text-xs sm:text-sm text-pastel-navy/60 dark:text-slate-400">{t.projects.noMatchDesc}</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-4 text-xs font-bold text-pastel-blue-dark dark:text-sky-400 hover:underline min-h-[44px] inline-flex items-center"
          >
            {t.projects.btnReset}
          </button>
        </div>
      )}
    </section>
  );
}

export default memo(Projects);
