import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';
import {
	FAVICON_APPLE_TOUCH_SIZES,
	FAVICON_COLORS,
	FAVICON_INITIALS,
	FAVICON_PNG_SIZES,
} from './favicon-config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const sourceSize = 512;

function buildAvatarSvg(size) {
	const { accent, warning, foregroundStrong } = FAVICON_COLORS;
	const fontSize = Math.round(size * 0.43);
	const letterSpacing = size * 0.02;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${FAVICON_INITIALS} avatar">
  <defs>
    <linearGradient id="avatar-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent}" />
      <stop offset="100%" stop-color="${warning}" />
    </linearGradient>
  </defs>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="url(#avatar-gradient)" />
  <text
    x="50%"
    y="50%"
    fill="${foregroundStrong}"
    font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    font-size="${fontSize}"
    font-weight="700"
    letter-spacing="${letterSpacing}"
    text-anchor="middle"
    dominant-baseline="central"
  >${FAVICON_INITIALS}</text>
</svg>`;
}

async function renderPng(size) {
	const svg = buildAvatarSvg(sourceSize);

	return sharp(Buffer.from(svg))
		.resize(size, size)
		.png()
		.toBuffer();
}

async function main() {
	const svg = buildAvatarSvg(sourceSize);
	writeFileSync(join(publicDir, 'favicon.svg'), svg, 'utf8');

	const pngBySize = new Map();

	for (const size of FAVICON_PNG_SIZES) {
		const png = await renderPng(size);
		pngBySize.set(size, png);
		writeFileSync(join(publicDir, `favicon-${size}x${size}.png`), png);
	}

	const ico = await toIco([
		pngBySize.get(16),
		pngBySize.get(32),
		pngBySize.get(48),
	]);
	writeFileSync(join(publicDir, 'favicon.ico'), ico);

	for (const [fileName, size] of Object.entries(FAVICON_APPLE_TOUCH_SIZES)) {
		const png = await renderPng(size);
		writeFileSync(join(publicDir, fileName), png);
	}

	console.log(`Generated favicon assets for "${FAVICON_INITIALS}" in ${publicDir}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
