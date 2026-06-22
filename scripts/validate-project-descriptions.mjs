import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const translationsPath = path.join(__dirname, '../src/i18n/translations.ts');
const content = fs.readFileSync(translationsPath, 'utf8');

const ids = [
	'xcargo',
	'game-hub',
	'sada',
	'home-guardian',
	'uds',
	'abms',
	'circle',
	'utopia',
];
const locales = ['tk', 'en', 'zh', 'tr', 'ru'];

const localeRe = /^\s*(tk|en|zh|tr|ru):\s*\{/gm;
const matches = [...content.matchAll(localeRe)];

const countHanzi = (text) => (text.match(/[\u4e00-\u9fff]/g) ?? []).length;

const violations = [];

for (const match of matches) {
	const locale = match[1];
	const start = match.index;
	const next = matches.find((m) => m.index > start);
	const block = content.slice(start, next?.index ?? content.length);
	const tpStart = block.indexOf('topProjects: [');
	if (tpStart === -1) continue;

	const tpBlock = block.slice(tpStart);

	for (const id of ids) {
		const escapedId = id.replace(/-/g, '\\-');
		const re = new RegExp(
			`id: '${escapedId}'[\\s\\S]*?description:\\s*\\n\\s*'((?:\\\\'|[^'])*)'`,
			'm',
		);
		const m = tpBlock.match(re);
		if (!m) {
			violations.push({ locale, id, error: 'description not found' });
			continue;
		}

		const desc = m[1].replace(/\\'/g, "'");
		const len = desc.length;
		const hanzi = countHanzi(desc);

		if (locale === 'zh') {
			if (hanzi < 30 || hanzi > 40) {
				violations.push({
					locale,
					id,
					hanzi,
					len,
					desc: desc.slice(0, 80),
				});
			}
		} else if (len > 130) {
			violations.push({ locale, id, len, desc: desc.slice(0, 80) });
		}
	}
}

if (violations.length > 0) {
	console.error('Project description validation failed:\n');
	for (const v of violations) {
		if (v.error) {
			console.error(`  [${v.locale}] ${v.id}: ${v.error}`);
		} else if (v.hanzi !== undefined) {
			console.error(
				`  [${v.locale}] ${v.id}: hanzi=${v.hanzi} (expected 30–40), len=${v.len}`,
			);
			console.error(`    ${v.desc}...`);
		} else {
			console.error(`  [${v.locale}] ${v.id}: len=${v.len} (max 130)`);
			console.error(`    ${v.desc}...`);
		}
	}
	process.exit(1);
}

console.log(
	`All ${locales.length * ids.length} project descriptions pass length limits.`,
);
