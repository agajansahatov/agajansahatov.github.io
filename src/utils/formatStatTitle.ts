import type { LanguageCode } from '../types/preferences';

const STAT_NUMBER_LOCALES: Record<LanguageCode, string> = {
	en: 'en-US',
	tk: 'en-US',
	tr: 'tr-TR',
	zh: 'zh-CN',
	ru: 'ru-RU',
};

/**
 * Rounds down to allowed stat milestones:
 * 10–90 (step 10), 100–900 (step 100), 1000+ (step 1000).
 */
export function roundDownToStatMilestone(value: number): number {
	if (value < 10) {
		return 10;
	}

	if (value < 100) {
		return Math.floor(value / 10) * 10;
	}

	if (value < 1000) {
		return Math.floor(value / 100) * 100;
	}

	return Math.floor(value / 1000) * 1000;
}

export function formatStatTitle(
	value: number,
	language: LanguageCode,
	useExactValue = false,
): string {
	const displayNumber = useExactValue
		? value
		: roundDownToStatMilestone(value);
	return `${displayNumber.toLocaleString(STAT_NUMBER_LOCALES[language])}+`;
}
