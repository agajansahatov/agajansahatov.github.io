import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveDocumentTitle } from '../i18n/resolveDocumentTitle';
import { useTranslation } from '../i18n';

export const useDocumentTitle = () => {
	const { pathname } = useLocation();
	const { language, t } = useTranslation();

	useEffect(() => {
		document.title = resolveDocumentTitle(pathname, t);
		document.documentElement.lang = language;
	}, [language, pathname, t]);
};
