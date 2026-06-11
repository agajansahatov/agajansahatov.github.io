import { Navigate } from 'react-router-dom';
import { DEFAULT_LANGUAGE_CODE } from '../../config/preferences';
import {
	CountryIsGeoCountryService,
	LanguageResolver,
} from '../../services/preferences/languageResolver';
import { LocalPreferencesStorage } from '../../services/preferences/localPreferencesStorage';

const languageResolver = new LanguageResolver(
	new LocalPreferencesStorage(),
	new CountryIsGeoCountryService(),
);

const RootRedirect = () => {
	const language =
		languageResolver.resolveStoredLanguage() ??
		languageResolver.resolveBrowserLanguage() ??
		DEFAULT_LANGUAGE_CODE;

	return <Navigate to={`/${language}`} replace />;
};

export default RootRedirect;
