import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
	DEFAULT_LANGUAGE_CODE,
	SUPPORTED_LANGUAGE_CODES,
} from '../../config/preferences';
import { SITE_URL } from '../../config/site';
import { resolveDocumentTitle, resolveMetaDescription } from '../../i18n';
import { stripLanguagePrefix } from '../../i18n/languagePath';
import { useTranslation } from '../../i18n';

const MANAGED_ATTRIBUTE = 'data-seo-managed';

const upsertMetaDescription = (head: HTMLHeadElement, content: string) => {
	let element = head.querySelector<HTMLMetaElement>(
		'meta[name="description"]',
	);
	if (!element) {
		element = document.createElement('meta');
		element.setAttribute('name', 'description');
		head.appendChild(element);
	}
	element.setAttribute('content', content);
};

/**
 * Synchronizes per-page, per-language SEO head tags (title, description,
 * canonical, and hreflang alternates) with the current route. The tags are
 * written directly into the document head so that both Googlebot's JS
 * rendering and the build-time prerender capture localized markup.
 */
export const useSeo = () => {
	const { pathname } = useLocation();
	const { language, t } = useTranslation();

	useEffect(() => {
		const head = document.head;
		const routePath = stripLanguagePrefix(pathname);
		const suffix = routePath === '/' ? '' : routePath;

		document.title = resolveDocumentTitle(routePath, t);
		upsertMetaDescription(head, resolveMetaDescription(routePath, t));

		head.querySelectorAll(`[${MANAGED_ATTRIBUTE}]`).forEach((element) =>
			element.remove(),
		);

		const linkAttributes: Record<string, string>[] = [
			{ rel: 'canonical', href: `${SITE_URL}/${language}${suffix}` },
			...SUPPORTED_LANGUAGE_CODES.map((code) => ({
				rel: 'alternate',
				hreflang: code,
				href: `${SITE_URL}/${code}${suffix}`,
			})),
			{
				rel: 'alternate',
				hreflang: 'x-default',
				href: `${SITE_URL}/${DEFAULT_LANGUAGE_CODE}${suffix}`,
			},
		];

		for (const attributes of linkAttributes) {
			const element = document.createElement('link');
			element.setAttribute(MANAGED_ATTRIBUTE, '');
			for (const [name, value] of Object.entries(attributes)) {
				element.setAttribute(name, value);
			}
			head.appendChild(element);
		}

		// Signal the build-time prerenderer that head + content are ready.
		document.dispatchEvent(new Event('prerender-ready'));
	}, [language, pathname, t]);
};
