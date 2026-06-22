import { interpolate } from './interpolate';
import type { TranslationDictionary } from './translations';

const normalizePathname = (pathname: string): string => {
	const trimmed = pathname.replace(/\/+$/, '');
	return trimmed === '' ? '/' : trimmed;
};

const DESCRIPTION_BY_PATH: Record<
	string,
	(translations: TranslationDictionary, portfolioName: string) => string
> = {
	'/experience': (translations) => translations.experience.tagline,
	'/projects': (translations) => translations.projects.tagline,
	'/expertise': (translations) => translations.expertise.tagline,
	'/resume-cv': (translations) => translations.resumeCv.tagline,
	'/pricing': (translations) => translations.pricing.tagline,
	'/contact': (translations) => translations.contact.formSubtitle,
	'/about': (translations, portfolioName) =>
		interpolate(translations.about.tagline, { portfolioName }),
	'/settings': (translations) => translations.settings.subtitle,
};

export const resolveMetaDescription = (
	pathname: string,
	translations: TranslationDictionary,
	portfolioName: string,
): string => {
	const normalizedPath = normalizePathname(pathname);

	if (normalizedPath === '/') {
		return translations.explore.heroTagline;
	}

	const resolveDescription = DESCRIPTION_BY_PATH[normalizedPath];
	return resolveDescription
		? resolveDescription(translations, portfolioName)
		: translations.explore.heroTagline;
};
