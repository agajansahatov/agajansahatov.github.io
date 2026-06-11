const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];

export const isVideo = (src: string) =>
	VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext));
