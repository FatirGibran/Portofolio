import React, { useState, useMemo, useCallback, memo } from 'react';
import { ExternalLink, Play, Search, Sparkles, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ALL_PROJECTS } from '../data/projectsData';
import { getCategoryCounts } from '../data/categoryConstants';

// Custom inline SVG icon for GitHub
const GithubIcon = memo((props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
));

const ProjectCard = memo(({ project, onOpenSandboxDemo, onOpenCaseStudy, btnTryDemo, btnVisit, lang }) => {
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
      className="bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/60 dark:hover:border-blue-500/60 rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md group transform-gpu-safe"
    >
      {/* Holographic Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(56, 189, 248, 0.12) 0%, transparent 65%)`,
        }}
      />
      <div>
        <div className="flex justify-between items-start gap-2 mb-3.5">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 py-0.5 px-2.5 rounded-md border border-blue-200 dark:border-blue-800/80">
            {project.role}
          </span>
          {project.badge && (
            <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 py-0.5 px-2.5 rounded-md border border-amber-200 dark:border-amber-800/80 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3" />
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-space font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tItem, idx) => (
            <span
              key={idx}
              className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 py-0.5 px-2 rounded-md"
            >
              {tItem}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
        <button
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-bold font-space text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 py-2 px-3 rounded-xl transition-all min-h-[38px]"
          title="Lihat Diagram Arsitektur & Case Study"
        >
          <Layers className="w-3.5 h-3.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
          <span>{lang === 'en' ? 'Architecture' : 'Arsitektur'}</span>
        </button>

        {project.demoTab && (
          <button
            onClick={() => onOpenSandboxDemo(project.demoTab)}
            className="inline-flex items-center gap-1.5 text-xs font-bold font-space text-white bg-blue-600 hover:bg-blue-700 py-2 px-3.5 rounded-xl shadow-sm transition-all hover:scale-105 min-h-[38px]"
          >
            <Play className="w-3.5 h-3.5 fill-white flex-shrink-0" />
            <span>{btnTryDemo}</span>
          </button>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-500/30 py-2 px-3 rounded-xl transition-colors min-h-[38px]"
          >
            <span>{btnVisit}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}

        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-xl transition-colors min-h-[38px]"
            title="Buka Repository GitHub"
            aria-label="GitHub Repository"
          >
            <GithubIcon />
          </a>
        )}
      </div>
    </div>
  );
});

function Projects({ onSelectSandboxTab }) {
  const { t, setSelectedProjectForModal, playSound, lang } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const counts = getCategoryCounts(ALL_PROJECTS);
    return [
      { id: 'all', label: t.projects.categories.all, count: counts.all },
      { id: 'ai', label: t.projects.categories.ai, count: counts.ai },
      { id: 'fullstack', label: t.projects.categories.fullstack, count: counts.fullstack },
      { id: 'cybersec', label: t.projects.categories.cybersec, count: counts.cybersec },
      { id: 'org', label: t.projects.categories.org, count: counts.org },
    ];
  }, [t]);

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((project) => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const titleMatch = project.title.toLowerCase().includes(q);
      const desc = (lang === 'en' && project.descEn) ? project.descEn : project.desc;
      const descMatch = desc.toLowerCase().includes(q);
      const roleMatch = project.role.toLowerCase().includes(q);
      const techMatch = project.tech.some(tItem => tItem.toLowerCase().includes(q));

      return titleMatch || descMatch || roleMatch || techMatch;
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

  // Landmark Projects for Bento Showcase
  const landmarkProjects = useMemo(() => {
    return [
      ALL_PROJECTS.find(p => p.id === 'posturelens'),
      ALL_PROJECTS.find(p => p.id === 'vaultsentinel'),
      ALL_PROJECTS.find(p => p.id === 'vibedoc'),
    ].filter(Boolean);
  }, []);

  return (
    <section id="proyek" className="py-20 sm:py-24 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto scroll-mt-12 content-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              {t.projects.badgeVerified}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Instant Search Bar */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-400 outline-none font-semibold text-xs md:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900/80 shadow-sm transition-colors min-h-[44px]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Landmark Featured Bento Tier (Shown when not filtering) */}
      {!searchQuery && activeCategory === 'all' && (
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              // Landmark Systems Spotlight
            </span>
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              Core Technical Showcase
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landmarkProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/70 dark:hover:border-blue-500/70 transition-all flex flex-col justify-between ${
                  idx === 0 ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold uppercase py-0.5 px-2.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      {project.role}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 py-0.5 px-2 rounded border border-emerald-500/30">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-space font-extrabold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {lang === 'en' ? project.descEn : project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tItem, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 py-0.5 px-2 rounded-md"
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      playSound('modal');
                      setSelectedProjectForModal(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-space font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 py-2.5 px-4 rounded-xl transition-all"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Deep-Dive Arsitektur</span>
                  </button>

                  {project.demoTab && (
                    <button
                      onClick={() => handleOpenSandbox(project.demoTab)}
                      className="inline-flex items-center gap-1.5 text-xs font-space font-bold text-white bg-blue-600 hover:bg-blue-700 py-2.5 px-4 rounded-xl shadow-sm transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Uji Demo Sandbox</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Directory Category Filter Pills */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                playSound('tab');
              }}
              className={`flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-space font-semibold transition-all duration-150 min-h-[38px] ${
                activeCategory === cat.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-xs font-mono px-1.5 py-0.2 rounded-md ${
                activeCategory === cat.id ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Showing {filteredProjects.length} of {ALL_PROJECTS.length} systems
        </span>
      </div>

      {/* Complete Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="p-12 text-center bg-white dark:bg-slate-900/80 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl mt-6">
          <Search className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
          <h4 className="font-space font-bold text-slate-900 dark:text-white text-base mb-1">{t.projects.noMatchTitle}</h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{t.projects.noMatchDesc}</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-4 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:underline min-h-[44px] inline-flex items-center"
          >
            {t.projects.btnReset}
          </button>
        </div>
      )}
    </section>
  );
}

export default memo(Projects);
