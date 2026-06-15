import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import TestimonialsCarousel from '../../../../components/TestimonialsCarousel';
import type { TranslationDictionary } from '../../../../i18n/translations';
import { useTranslation } from '../../../../i18n';
import type {
	HomeTestimonialId,
	ResolvedHomeTestimonial,
} from '../../../../types/testimonial';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection = () => {
	const { t } = useTranslation();
	const testimonials = resolveTestimonials(t.explore.testimonials);

	return (
		<Block
			id='section-testimonials'
			className={styles.section}
			containerClassName={styles['section__container']}
		>
			<BlockHeader dataAos='fade-up'>
				<h2 className={styles['section__heading']}>
					{t.explore.testimonialsTitle}
				</h2>
				<p className={styles['section__body']}>{t.explore.testimonialsBody}</p>
			</BlockHeader>
			<TestimonialsCarousel testimonials={testimonials} />
		</Block>
	);
};

type TestimonialAsset = {
	readonly id: HomeTestimonialId;
	readonly photo: string;
};

const testimonialAssets: readonly TestimonialAsset[] = [
	{
		id: 'meylis-sahetmammedov',
		photo: '/images/testimonials/meylis.png',
	},
	{
		id: 'chary-babaniyazov',
		photo: '/images/testimonials/chary.png',
	},
	{
		id: 'godwin-rapuluchukwu',
		photo: '/images/testimonials/rapuluchukwu.png',
	},
] as const;

function resolveTestimonials(
	testimonials: TranslationDictionary['explore']['testimonials'],
): ResolvedHomeTestimonial[] {
	return testimonials.flatMap((content) => {
		const asset = testimonialAssets.find((entry) => entry.id === content.id);
		if (!asset) return [];

		return [
			{
				id: asset.id,
				name: content.name,
				organization: content.organization,
				comment: content.comment,
				photoAlt: content.photoAlt,
				photo: asset.photo,
			},
		];
	});
}

export default TestimonialsSection;
