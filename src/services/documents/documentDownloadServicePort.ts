export interface DocumentDownloadServicePort {
	openAndDownload(publicPath: string, downloadFileName: string): void;
}
