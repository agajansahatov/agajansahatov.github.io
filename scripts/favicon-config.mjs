import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

export const FAVICON_COLORS = {
	accent: '#ec0002',
	warning: '#fec200',
	foregroundStrong: '#11043f',
};

const portfolioSource = readFileSync(
	join(rootDir, 'src/config/portfolio.ts'),
	'utf8',
);
const legalNameMatch = portfolioSource.match(/legalName:\s*'([^']+)'/);

if (!legalNameMatch) {
	throw new Error('Could not read legalName from src/config/portfolio.ts');
}

export const FAVICON_INITIALS = legalNameMatch[1]
	.trim()
	.split(/\s+/)
	.slice(0, 2)
	.map((part) => part.charAt(0).toUpperCase())
	.join('');

export const FAVICON_PNG_SIZES = [16, 32, 48, 64, 128, 256, 512];

export const FAVICON_APPLE_TOUCH_SIZES = {
	'apple-touch-icon.png': 180,
	'apple-touch-icon-57x57.png': 57,
	'apple-touch-icon-114x114.png': 114,
	'apple-touch-icon-120x120.png': 120,
};
