// Single source of truth for build-time SEO tooling (prerender + sitemap).
// Mirrors the language codes in src/config/preferences.ts and the routes in
// src/router.tsx. Keep these in sync when routes or languages change.

export const SITE_URL = 'https://agajansahatov.github.io';

export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGES = ['en', 'tr', 'zh', 'ru', 'tk'];

// Route paths relative to the /:lang prefix. Empty string is the language home.
export const PAGE_PATHS = [
	'',
	'experience',
	'projects',
	'resume-cv',
	'expertise',
	'about',
	'contact',
	'settings',
	'pricing',
];

export const urlForPage = (language, page) =>
	`${SITE_URL}/${language}${page ? `/${page}` : ''}`;

export const routePathForPage = (language, page) =>
	`/${language}${page ? `/${page}` : ''}`;
