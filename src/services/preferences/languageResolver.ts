import {
	CIS_RUSSIAN_COUNTRY_CODES,
	COUNTRY_LANGUAGE_MAP,
	DEFAULT_LANGUAGE_CODE,
	GEOLOCATION_API_URL,
	SUPPORTED_LANGUAGE_CODES,
	TURKMENISTAN_COUNTRY_CODE,
} from '../../config/preferences';
import type { LanguageCode } from '../../types/preferences';
import type { PreferencesStoragePort } from './localPreferencesStorage';

export interface GeoCountryServicePort {
	getCountryCode(): Promise<string | null>;
}

type CountryApiResponse = {
	readonly country?: unknown;
};

export class CountryIsGeoCountryService implements GeoCountryServicePort {
	static readonly endpoint = GEOLOCATION_API_URL;
	static readonly timeoutMs = 2500;

	async getCountryCode(): Promise<string | null> {
		const controller = new AbortController();
		const timeoutId = window.setTimeout(
			() => controller.abort(),
			CountryIsGeoCountryService.timeoutMs,
		);

		try {
			const response = await fetch(CountryIsGeoCountryService.endpoint, {
				signal: controller.signal,
			});
			if (!response.ok) return null;

			const data = (await response.json()) as CountryApiResponse;
			return typeof data.country === 'string'
				? data.country.toUpperCase()
				: null;
		} catch {
			return null;
		} finally {
			window.clearTimeout(timeoutId);
		}
	}
}

export class LanguageResolver {
	private readonly storage: PreferencesStoragePort;
	private readonly geoCountryService: GeoCountryServicePort;

	constructor(
		storage: PreferencesStoragePort,
		geoCountryService: GeoCountryServicePort,
	) {
		this.storage = storage;
		this.geoCountryService = geoCountryService;
	}

	resolveStoredLanguage(): LanguageCode | null {
		return this.storage.readLanguage();
	}

	resolveBrowserLanguage(): LanguageCode | null {
		if (typeof navigator === 'undefined') return null;

		const candidates =
			navigator.languages && navigator.languages.length > 0
				? navigator.languages
				: [navigator.language];

		for (const candidate of candidates) {
			const normalized = candidate.toLowerCase();
			const language = SUPPORTED_LANGUAGE_CODES.find((code) =>
				normalized.startsWith(code),
			);

			if (language) return language;
		}

		return null;
	}

	async resolveInitialLanguage(): Promise<LanguageCode> {
		const storedLanguage = this.resolveStoredLanguage();
		if (storedLanguage) return storedLanguage;

		const countryCode = await this.geoCountryService.getCountryCode();
		if (countryCode === TURKMENISTAN_COUNTRY_CODE) return 'tk';

		return this.resolveBrowserLanguage() ?? DEFAULT_LANGUAGE_CODE;
	}

	async resolveGeoLanguage(): Promise<LanguageCode> {
		const countryCode = await this.geoCountryService.getCountryCode();
		if (!countryCode) return DEFAULT_LANGUAGE_CODE;

		const mapped = COUNTRY_LANGUAGE_MAP[countryCode];
		if (mapped) return mapped;

		if (CIS_RUSSIAN_COUNTRY_CODES.includes(countryCode as never)) {
			return 'ru';
		}

		return DEFAULT_LANGUAGE_CODE;
	}
}
