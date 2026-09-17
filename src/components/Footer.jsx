import React, { memo } from 'react';
import { Mail, Heart } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Custom inline SVG icons for social media brands
const GithubIcon = memo((props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
));

const LinkedinIcon = memo((props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
));

const InstagramIcon = memo((props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
));

function Footer() {
  const { t } = usePortfolio();

  const socialLinks = [
    { icon: <Mail className="w-5 h-5 flex-shrink-0" />, label: 'Email', href: 'mailto:fatirgibrann@gmail.com', bg: 'hover:bg-pastel-pink hover:border-pastel-pink dark:hover:bg-rose-950' },
    { icon: <LinkedinIcon className="w-5 h-5 flex-shrink-0" />, label: 'LinkedIn', href: 'http://www.linkedin.com/in/FatirGibran', bg: 'hover:bg-pastel-blue hover:border-pastel-blue dark:hover:bg-sky-950' },
    { icon: <GithubIcon className="w-5 h-5 flex-shrink-0" />, label: 'GitHub', href: 'https://github.com/Fatirrr08', bg: 'hover:bg-pastel-yellow hover:border-pastel-yellow-hover dark:hover:bg-amber-950' },
    { icon: <InstagramIcon className="w-5 h-5 flex-shrink-0" />, label: 'Instagram', href: 'https://instagram.com/spicytir', bg: 'hover:bg-pastel-peach hover:border-pastel-peach dark:hover:bg-orange-950' }
  ];

  return (
    <footer id="kontak" className="bg-white dark:bg-slate-900 border-t-2 border-pastel-peach/60 dark:border-slate-800 py-14 sm:py-16 px-4 sm:px-8 md:px-12 text-center mt-16 sm:mt-20 relative z-20 content-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-space text-pastel-navy dark:text-white mb-3 sm:mb-4 inline-block relative">
          {t.footer.title}
          <span className="absolute bottom-1 left-0 w-1/2 h-2 bg-pastel-pink/60 dark:bg-rose-500/30 -z-10 rounded-full"></span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-pastel-navy/70 dark:text-slate-300 max-w-lg leading-relaxed mb-8 sm:mb-10">
          {t.footer.pitch}
        </p>

        {/* Social Grid with minimum 44px touch targets */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-pastel-navy/10 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-2xl font-bold font-space text-xs sm:text-sm text-pastel-navy dark:text-slate-200 shadow-pastel-sm transition-all duration-200 transform hover:-translate-y-0.5 min-h-[44px] ${link.bg}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Bottom Credits */}
        <div className="w-full pt-6 sm:pt-8 border-t border-pastel-peach/40 dark:border-slate-800 text-xs font-semibold text-pastel-navy/40 dark:text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 justify-center">
            <span>{t.footer.madeWith}</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 fill-rose-400" />
            <span>{t.footer.by} &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="font-space uppercase tracking-wider text-xs opacity-70">
            Telkom University Purwokerto • Informatics Engineering
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
