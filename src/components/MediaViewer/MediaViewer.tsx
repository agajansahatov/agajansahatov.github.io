import { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { useTranslation } from '../../i18n';
import styles from './MediaViewer.module.css';
import { isVideo } from './mediaUtils';

interface Props {
	medias: string[];
	initialIndex: number;
	alt?: string;
	onClose: () => void;
}

const MediaViewer = ({ medias, initialIndex, alt = '', onClose }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const { t } = useTranslation();

	const goNext = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % medias.length);
	}, [medias.length]);

	const goPrev = useCallback(() => {
		setCurrentIndex((prev) => (prev - 1 + medias.length) % medias.length);
	}, [medias.length]);

	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
			if (event.key === 'ArrowRight') goNext();
			if (event.key === 'ArrowLeft') goPrev();
		};

		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKey);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', handleKey);
		};
	}, [onClose, goNext, goPrev]);

	return (
		<div className={styles.lightbox} onClick={onClose}>
			<div
				className={styles.lightbox__content}
				onClick={(event) => event.stopPropagation()}
			>
				<button
					className={styles.lightbox__close}
					onClick={onClose}
					type='button'
					aria-label={t.components.mediaClose}
				>
					<FaXmark />
				</button>

				<button
					className={`${styles.lightbox__nav} ${styles['lightbox__nav--prev']}`}
					onClick={goPrev}
					type='button'
					aria-label={t.components.mediaPrevious}
				>
					<FaChevronLeft />
				</button>

				{isVideo(medias[currentIndex]) ? (
					<video
						src={medias[currentIndex]}
						className={styles.lightbox__img}
						controls
						autoPlay
					/>
				) : (
					<img
						src={medias[currentIndex]}
						alt={`${alt} - ${currentIndex + 1}`}
						className={styles.lightbox__img}
					/>
				)}

				<button
					className={`${styles.lightbox__nav} ${styles['lightbox__nav--next']}`}
					onClick={goNext}
					type='button'
					aria-label={t.components.mediaNext}
				>
					<FaChevronRight />
				</button>

				<div className={styles.lightbox__counter}>
					{currentIndex + 1} / {medias.length}
				</div>

				<div className={styles.lightbox__strip}>
					{medias.map((media, index) => (
						<button
							key={media}
							className={`${styles.lightbox__stripThumb} ${
								index === currentIndex
									? styles['lightbox__stripThumb--active']
									: ''
							}`}
							onClick={() => setCurrentIndex(index)}
							type='button'
						>
							{isVideo(media) ? (
								<video src={media} muted />
							) : (
								<img
									src={media}
									alt={`${t.components.mediaThumbnail} ${index + 1}`}
								/>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default MediaViewer;

