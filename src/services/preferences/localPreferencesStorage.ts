import {
	DEFAULT_THEME_MODE,
	STORAGE_KEYS,
	SUPPORTED_LANGUAGE_CODES,
	THEME_OPTIONS,
} from '../../config/preferences';
import type { LanguageCode, ThemeMode } from '../../types/preferences';

export interface PreferencesStoragePort {
	readLanguage(): LanguageCode | null;
	writeLanguage(language: LanguageCode): void;
	readThemeMode(): ThemeMode;
	writeThemeMode(themeMode: ThemeMode): void;
}

export class LocalPreferencesStorage implements PreferencesStoragePort {
	readLanguage(): LanguageCode | null {
		if (!this.canUseLocalStorage()) return null;

		const value = localStorage.getItem(STORAGE_KEYS.language);
		return this.isLanguageCode(value) ? value : null;
	}

	writeLanguage(language: LanguageCode): void {
		if (!this.canUseLocalStorage()) return;
		localStorage.setItem(STORAGE_KEYS.language, language);
	}

	readThemeMode(): ThemeMode {
		if (!this.canUseLocalStorage()) return DEFAULT_THEME_MODE;

		const value = localStorage.getItem(STORAGE_KEYS.themeMode);
		return this.isThemeMode(value) ? value : DEFAULT_THEME_MODE;
	}

	writeThemeMode(themeMode: ThemeMode): void {
		if (!this.canUseLocalStorage()) return;
		localStorage.setItem(STORAGE_KEYS.themeMode, themeMode);
	}

	private canUseLocalStorage(): boolean {
		return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
	}

	private isLanguageCode(value: string | null): value is LanguageCode {
		return SUPPORTED_LANGUAGE_CODES.includes(value as LanguageCode);
	}

	private isThemeMode(value: string | null): value is ThemeMode {
		return THEME_OPTIONS.some((option) => option.value === value);
	}
}
