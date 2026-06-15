import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type KeyboardEvent,
	type PointerEvent,
} from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { interpolate } from '../../i18n/interpolate';
import { useTranslation } from '../../i18n';
import type { ResolvedHomeTestimonial } from '../../types/testimonial';
import IconButton from '../Button/IconButton';
import TestimonialCard from '../TestimonialCard';
import styles from './TestimonialsCarousel.module.css';

const AUTOPLAY_INTERVAL_MS = 8000;
const SWIPE_THRESHOLD_PX = 50;

type Props = {
	testimonials: ResolvedHomeTestimonial[];
};

const TestimonialsCarousel = ({ testimonials }: Props) => {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const pointerStartX = useRef<number | null>(null);
	const total = testimonials.length;

	const goTo = useCallback(
		(index: number) => {
			setActiveIndex((index + total) % total);
		},
		[total],
	);

	const goNext = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % total);
	}, [total]);

	const goPrev = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + total) % total);
	}, [total]);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotionPreference = () => {
			setPrefersReducedMotion(mediaQuery.matches);
		};

		updateMotionPreference();
		mediaQuery.addEventListener('change', updateMotionPreference);
		return () => {
			mediaQuery.removeEventListener('change', updateMotionPreference);
		};
	}, []);

	useEffect(() => {
		if (prefersReducedMotion || isPaused || total <= 1) return;

		const intervalId = window.setInterval(goNext, AUTOPLAY_INTERVAL_MS);
		return () => {
			window.clearInterval(intervalId);
		};
	}, [prefersReducedMotion, isPaused, goNext, total]);

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			goNext();
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goPrev();
		}
	};

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		pointerStartX.current = event.clientX;
		setIsPaused(true);
	};

	const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
		if (pointerStartX.current === null) return;

		const delta = event.clientX - pointerStartX.current;
		if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) {
			if (delta < 0) goNext();
			else goPrev();
		}

		pointerStartX.current = null;
		setIsPaused(false);
	};

	const handlePointerCancel = () => {
		pointerStartX.current = null;
		setIsPaused(false);
	};

	const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			setIsPaused(false);
		}
	};

	const statusLabel = interpolate(t.components.testimonialStatus, {
		current: String(activeIndex + 1),
		total: String(total),
	});

	if (total === 0) return null;

	return (
		<div
			className={styles.carousel}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onFocusCapture={() => setIsPaused(true)}
			onBlurCapture={handleBlurCapture}
		>
			<div
				className={styles.carousel__region}
				role='region'
				aria-roledescription='carousel'
				aria-label={t.explore.testimonialsTitle}
				tabIndex={0}
				onKeyDown={handleKeyDown}
			>
				<div className={styles.carousel__controls}>
					<IconButton
						className={styles.carousel__nav}
						aria-label={t.components.testimonialPrevious}
						onClick={goPrev}
						disabled={total <= 1}
					>
						<FaChevronLeft />
					</IconButton>

					<div
						className={styles.carousel__viewport}
						onPointerDown={handlePointerDown}
						onPointerUp={handlePointerUp}
						onPointerCancel={handlePointerCancel}
						onPointerLeave={handlePointerCancel}
					>
						<div className={styles['carousel__viewport-clip']}>
							<div
								className={styles.carousel__track}
								style={{ transform: `translateX(-${activeIndex * 100}%)` }}
							>
								{testimonials.map((testimonial, index) => (
									<div
										key={testimonial.id}
										className={styles.carousel__slide}
										aria-hidden={index !== activeIndex}
									>
										<TestimonialCard
											name={testimonial.name}
											organization={testimonial.organization}
											comment={testimonial.comment}
											photo={testimonial.photo}
											photoAlt={testimonial.photoAlt}
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					<IconButton
						className={styles.carousel__nav}
						aria-label={t.components.testimonialNext}
						onClick={goNext}
						disabled={total <= 1}
					>
						<FaChevronRight />
					</IconButton>
				</div>

				<p className={styles.carousel__status} aria-live='polite'>
					{statusLabel}
				</p>

				<div
					className={styles.carousel__dots}
					role='tablist'
					aria-label={t.explore.testimonialsTitle}
				>
					{testimonials.map((testimonial, index) => (
						<button
							key={testimonial.id}
							type='button'
							role='tab'
							className={`${styles.carousel__dot} ${
								index === activeIndex ? styles['carousel__dot--active'] : ''
							}`}
							aria-label={interpolate(t.components.testimonialGoTo, {
								index: String(index + 1),
							})}
							aria-selected={index === activeIndex}
							aria-current={index === activeIndex ? 'true' : undefined}
							onClick={() => goTo(index)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default TestimonialsCarousel;
