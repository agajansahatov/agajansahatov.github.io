import { Navigate, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE_CODE } from '../../config/preferences';
import { isLanguageCode } from '../../i18n/languagePath';

const LanguageHomeRedirect = () => {
	const { lang } = useParams();
	const language = isLanguageCode(lang) ? lang : DEFAULT_LANGUAGE_CODE;

	return <Navigate to={`/${language}`} replace />;
};

export default LanguageHomeRedirect;
