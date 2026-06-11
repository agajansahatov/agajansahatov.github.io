import type { DocumentDownloadServicePort } from './documentDownloadServicePort';

export class DocumentDownloadService implements DocumentDownloadServicePort {
	private static readonly _instance = new DocumentDownloadService();

	static get instance(): DocumentDownloadService {
		return DocumentDownloadService._instance;
	}

	openAndDownload(publicPath: string, downloadFileName: string): void {
		const url = publicPath.startsWith('/') ? publicPath : `/${publicPath}`;

		window.open(url, '_blank', 'noopener,noreferrer');

		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = downloadFileName;
		anchor.rel = 'noopener';
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
	}
}
