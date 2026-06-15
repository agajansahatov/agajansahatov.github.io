import type { TranslationDictionary } from './translations';

const normalizePathname = (pathname: string): string => {
	const trimmed = pathname.replace(/\/+$/, '');
	return trimmed === '' ? '/' : trimmed;
};

const PAGE_TITLE_BY_PATH: Record<
	string,
	(translations: TranslationDictionary) => string
> = {
	'/experience': (translations) => translations.experience.title,
	'/expertise': (translations) => translations.expertise.title,
	'/projects': (translations) => translations.projects.title,
	'/resume-cv': (translations) => translations.resumeCv.title,
	'/pricing': (translations) => translations.pricing.title,
	'/contact': (translations) => translations.contact.title,
	'/about': (translations) => translations.about.badge,
	'/settings': (translations) => translations.settings.title,
};

export const resolveDocumentTitle = (
	pathname: string,
	translations: TranslationDictionary,
	portfolioName: string,
): string => {
	const normalizedPath = normalizePathname(pathname);

	if (normalizedPath === '/') {
		return `${portfolioName} – ${translations.documentTitle.tagline}`;
	}

	const resolvePageTitle = PAGE_TITLE_BY_PATH[normalizedPath];
	if (resolvePageTitle) {
		return `${resolvePageTitle(translations)} – ${portfolioName}`;
	}

	return `${translations.errors.notFoundTitle} – ${portfolioName}`;
};
