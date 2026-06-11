import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import {
	DEFAULT_LANGUAGE,
	LANGUAGES,
	PAGE_PATHS,
	routePathForPage,
} from './seo-routes.mjs';

const distDir = resolve(process.cwd(), 'dist');

const buildRoutes = () => {
	const routes = [];
	for (const language of LANGUAGES) {
		for (const page of PAGE_PATHS) {
			routes.push(routePathForPage(language, page));
		}
	}
	return routes;
};

// Flat output so served URLs match canonical/internal links exactly:
// '/' -> index.html, '/en' -> en.html, '/en/projects' -> en/projects.html
const outputPathForRoute = (route) => {
	if (route === '/') return join(distDir, 'index.html');
	return join(distDir, `${route.replace(/^\//, '')}.html`);
};

const main = async () => {
	const routes = buildRoutes();

	const prerenderer = new Prerenderer({
		staticDir: distDir,
		renderer: new PuppeteerRenderer({
			renderAfterDocumentEvent: 'prerender-ready',
			timeout: 60000,
			headless: true,
			launchOptions: {
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
			},
		}),
	});

	await prerenderer.initialize();

	try {
		const rendered = await prerenderer.renderRoutes(routes);

		// Use originalRoute (the requested path) rather than route, which can
		// be rewritten by the client-side redirect at '/'.
		for (const { originalRoute, html } of rendered) {
			const outputPath = outputPathForRoute(originalRoute);
			await mkdir(dirname(outputPath), { recursive: true });
			await writeFile(outputPath, html, 'utf8');
		}

		// The root '/' and the SPA/crawler 404 fallback both derive from the
		// default-language home. GitHub Pages serves 404.html for unknown deep
		// links while keeping the requested URL, letting the client router
		// resolve the correct page or render the localized not-found view.
		const defaultHomeRoute = routePathForPage(DEFAULT_LANGUAGE, '');
		const defaultHome = rendered.find(
			(entry) => entry.originalRoute === defaultHomeRoute,
		);
		if (defaultHome) {
			await writeFile(join(distDir, 'index.html'), defaultHome.html, 'utf8');
			await writeFile(join(distDir, '404.html'), defaultHome.html, 'utf8');
		}

		console.log(`Prerendered ${rendered.length} routes.`);
	} finally {
		await prerenderer.destroy();
	}
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
