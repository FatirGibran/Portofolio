/**
 * Project Categories List and Taxonomy
 */

export const PROJECT_CATEGORY_IDS = Object.freeze([
  'all',
  'ai',
  'fullstack',
  'cybersec',
  'org',
]);

export function getCategoryCounts(projects = []) {
  return {
    all: projects.length,
    ai: projects.filter(p => p.category === 'ai').length,
    fullstack: projects.filter(p => p.category === 'fullstack').length,
    cybersec: projects.filter(p => p.category === 'cybersec').length,
    org: projects.filter(p => p.category === 'org').length,
  };
}
