import { CountryIsGeoCountryService } from './languageResolver';

let cachedCountryCode: string | null | undefined;
let inflightRequest: Promise<string | null> | null = null;

export async function getCachedCountryCode(): Promise<string | null> {
	if (cachedCountryCode !== undefined) {
		return cachedCountryCode;
	}

	if (!inflightRequest) {
		inflightRequest = new CountryIsGeoCountryService()
			.getCountryCode()
			.then((countryCode) => {
				cachedCountryCode = countryCode;
				inflightRequest = null;
				return countryCode;
			})
			.catch(() => {
				cachedCountryCode = null;
				inflightRequest = null;
				return null;
			});
	}

	return inflightRequest;
}
