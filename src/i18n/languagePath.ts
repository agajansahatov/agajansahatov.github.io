import { SUPPORTED_LANGUAGE_CODES } from '../config/preferences';
import type { LanguageCode } from '../types/preferences';

export const isLanguageCode = (
	value: string | undefined,
): value is LanguageCode =>
	value !== undefined &&
	(SUPPORTED_LANGUAGE_CODES as readonly string[]).includes(value);

/**
 * Removes a leading language segment from a pathname, returning the
 * route path the app cares about (always starts with '/').
 *
 * '/en/projects' -> '/projects', '/en' -> '/', '/projects' -> '/projects'
 */
export const stripLanguagePrefix = (pathname: string): string => {
	const segments = pathname.split('/').filter(Boolean);

	if (segments.length > 0 && isLanguageCode(segments[0])) {
		const rest = segments.slice(1).join('/');
		return rest === '' ? '/' : `/${rest}`;
	}

	return pathname === '' ? '/' : pathname;
};

/**
 * Builds a language-prefixed href. Tolerates already-prefixed paths so it is
 * safe to call repeatedly. '/projects' + 'tr' -> '/tr/projects', '/' -> '/tr'.
 */
export const withLanguagePrefix = (
	path: string,
	language: LanguageCode,
): string => {
	const routePath = stripLanguagePrefix(path);
	const suffix = routePath === '/' ? '' : routePath;
	return `/${language}${suffix}`;
};

/**
 * Localizes an internal href that may carry a hash fragment, prefixing only
 * the path part. '/#services' -> '/en#services', '/contact' -> '/en/contact'.
 */
export const localizeHref = (href: string, language: LanguageCode): string => {
	const hashIndex = href.indexOf('#');
	const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
	const hash = hashIndex === -1 ? '' : href.slice(hashIndex);
	return `${withLanguagePrefix(path === '' ? '/' : path, language)}${hash}`;
};
