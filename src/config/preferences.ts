import type {
	LanguageCode,
	LanguagePreferenceOption,
	PreferenceOption,
	ThemeMode,
} from '../types/preferences';

export const STORAGE_KEYS = {
	language: 'agajansahatovportfolio:language',
	themeMode: 'agajansahatovportfolio:theme-mode',
} as const;

export const DEFAULT_LANGUAGE_CODE: LanguageCode = 'en';
export const DEFAULT_THEME_MODE: ThemeMode = 'system';

export const GEOLOCATION_API_URL = 'https://api.country.is/' as const;

export const LANGUAGE_OPTIONS: readonly LanguagePreferenceOption[] = [
	{ value: 'tk', labelKey: 'turkmen', nativeLabel: 'Türkmen' },
	{ value: 'tr', labelKey: 'turkish', nativeLabel: 'Türkçe' },
	{ value: 'en', labelKey: 'english', nativeLabel: 'English' },
	{ value: 'zh', labelKey: 'chinese', nativeLabel: '中文' },
	{ value: 'ru', labelKey: 'russian', nativeLabel: 'Русский' },
] as const;

export const THEME_OPTIONS: readonly PreferenceOption<ThemeMode>[] = [
	{ value: 'system', labelKey: 'system' },
	{ value: 'light', labelKey: 'light' },
	{ value: 'dark', labelKey: 'dark' },
] as const;

export const SUPPORTED_LANGUAGE_CODES = LANGUAGE_OPTIONS.map(
	(option) => option.value,
);

export const COUNTRY_LANGUAGE_MAP: Partial<Record<string, LanguageCode>> = {
	TM: 'tk',
	TR: 'tr',
	CN: 'zh',
	RU: 'ru',
} as const;

export const CIS_RUSSIAN_COUNTRY_CODES = [
	'AM',
	'AZ',
	'BY',
	'KZ',
	'KG',
	'MD',
	'TJ',
	'UZ',
] as const;
