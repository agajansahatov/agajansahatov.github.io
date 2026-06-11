import { writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import {
	DEFAULT_LANGUAGE,
	LANGUAGES,
	PAGE_PATHS,
	urlForPage,
} from './seo-routes.mjs';

const distDir = resolve(process.cwd(), 'dist');

const buildAlternates = (page) => {
	const links = LANGUAGES.map(
		(language) =>
			`    <xhtml:link rel="alternate" hreflang="${language}" href="${urlForPage(language, page)}" />`,
	);
	links.push(
		`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlForPage(DEFAULT_LANGUAGE, page)}" />`,
	);
	return links.join('\n');
};

const buildUrlEntries = () => {
	const entries = [];
	for (const page of PAGE_PATHS) {
		const alternates = buildAlternates(page);
		for (const language of LANGUAGES) {
			entries.push(
				`  <url>\n    <loc>${urlForPage(language, page)}</loc>\n${alternates}\n  </url>`,
			);
		}
	}
	return entries.join('\n');
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${buildUrlEntries()}
</urlset>
`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Generated sitemap.xml');
