import { getPortfolioLegalNameSlug } from './portfolio';

export type DocumentDefinition = {
	readonly id: string;
	readonly publicPath: string;
	readonly downloadFileName: string;
	readonly isAvailable: boolean;
};

const portfolioNameSlug = getPortfolioLegalNameSlug();

export const DOCUMENTS = {
	resume: {
		id: 'resume',
		publicPath: '/Resume.pdf',
		downloadFileName: `${portfolioNameSlug}-Resume.pdf`,
		isAvailable: true,
	},
	cv: {
		id: 'cv',
		publicPath: '/CV.pdf',
		downloadFileName: `${portfolioNameSlug}-CV.pdf`,
		isAvailable: false,
	},
} as const satisfies Record<string, DocumentDefinition>;
