import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE_CODE } from '../../config/preferences';
import { LanguageContext } from '../../i18n/languageContext';
import { isLanguageCode } from '../../i18n/languagePath';
import { LocalPreferencesStorage } from '../../services/preferences/localPreferencesStorage';
import NotFoundPage from '../../pages/NotFoundPage';

const storage = new LocalPreferencesStorage();

const LanguageRoute = () => {
	const { lang } = useParams();
	const isValid = isLanguageCode(lang);
	const language = isValid ? lang : DEFAULT_LANGUAGE_CODE;

	useEffect(() => {
		if (!isValid) return;
		storage.writeLanguage(language);
		document.documentElement.lang = language;
	}, [isValid, language]);

	return (
		<LanguageContext.Provider value={language}>
			{isValid ? <Outlet /> : <NotFoundPage />}
		</LanguageContext.Provider>
	);
};

export default LanguageRoute;
