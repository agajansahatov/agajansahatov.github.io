export type LanguageCode = 'tk' | 'tr' | 'en' | 'zh' | 'ru';

export type ThemeMode = 'system' | 'light' | 'dark';

export type ResolvedTheme = Exclude<ThemeMode, 'system'>;

export type PreferenceOption<T extends string> = {
	readonly value: T;
	readonly labelKey: string;
};

export type LanguagePreferenceOption = PreferenceOption<LanguageCode> & {
	readonly nativeLabel: string;
};
