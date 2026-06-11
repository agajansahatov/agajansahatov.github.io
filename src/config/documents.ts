export type DocumentDefinition = {
	readonly id: string;
	readonly publicPath: string;
	readonly downloadFileName: string;
	readonly isAvailable: boolean;
};

export const DOCUMENTS = {
	resume: {
		id: 'resume',
		publicPath: '/Resume.pdf',
		downloadFileName: 'Agajan-Sahatov-Resume.pdf',
		isAvailable: true,
	},
	cv: {
		id: 'cv',
		publicPath: '/CV.pdf',
		downloadFileName: 'Agajan-Sahatov-CV.pdf',
		isAvailable: false,
	},
} as const satisfies Record<string, DocumentDefinition>;
