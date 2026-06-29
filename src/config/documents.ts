import type { LanguageCode } from '../types/preferences';
import { getPortfolioLegalNameSlug } from './portfolio';

export type DocumentDefinition = {
	readonly id: string;
	readonly publicPath: string;
	readonly downloadFileName: string;
	readonly isAvailable: boolean;
};

const portfolioNameSlug = getPortfolioLegalNameSlug();

const DEFAULT_RESUME_PUBLIC_PATH = '/Resume.pdf';

function getDownloadFileNameFromPublicPath(publicPath: string): string {
	const fileName = publicPath.split('/').pop();
	return fileName ?? publicPath;
}

export const DOCUMENTS = {
	resume: {
		id: 'resume',
		publicPath: DEFAULT_RESUME_PUBLIC_PATH,
		downloadFileName: getDownloadFileNameFromPublicPath(
			DEFAULT_RESUME_PUBLIC_PATH,
		),
		isAvailable: true,
	},
	cv: {
		id: 'cv',
		publicPath: '/CV.pdf',
		downloadFileName: `${portfolioNameSlug}-CV.pdf`,
		isAvailable: false,
	},
} as const satisfies Record<string, DocumentDefinition>;

const RESUME_PUBLIC_PATHS_BY_LANGUAGE: Partial<Record<LanguageCode, string>> = {
	en: '/resume/Agajan_Sahatov_Resume.pdf',
};

export function resolveResumeDocument(language: LanguageCode) {
	const publicPath =
		RESUME_PUBLIC_PATHS_BY_LANGUAGE[language] ?? DEFAULT_RESUME_PUBLIC_PATH;

	return {
		publicPath,
		downloadFileName: getDownloadFileNameFromPublicPath(publicPath),
	};
}
