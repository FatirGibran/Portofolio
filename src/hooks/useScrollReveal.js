import { useEffect } from 'react';

/**
 * Native IntersectionObserver-based Scroll Reveal hook.
 * Progressively reveals elements with .scroll-reveal class.
 * Respects prefers-reduced-motion and re-evaluates when mode or route changes.
 */
export function useScrollReveal(dependency) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If user prefers reduced motion, show everything immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.05,
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    };

    // Use requestAnimationFrame + slight delay to ensure React DOM has completed rendering
    const rafId = requestAnimationFrame(observeElements);
    const timer = setTimeout(observeElements, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [dependency]);
}

