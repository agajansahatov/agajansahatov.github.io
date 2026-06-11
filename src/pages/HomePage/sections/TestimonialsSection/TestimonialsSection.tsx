import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import TestimonialCard from '../../../../components/TestimonialCard';
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
		<Block id='section-testimonials' className={styles.section}>
			<BlockHeader dataAos='fade-up'>
				<h2 className={styles['section__heading']}>
					{t.explore.testimonialsTitle}
				</h2>
				<p className={styles['section__body']}>{t.explore.testimonialsBody}</p>
			</BlockHeader>
			<ul className={styles['testimonials-list']}>
				{testimonials.map((testimonial) => (
					<li key={testimonial.id} className={styles['testimonial-item']}>
						<TestimonialCard
							name={testimonial.name}
							company={testimonial.company}
							comment={testimonial.comment}
							photo={testimonial.photo}
							photoAlt={testimonial.photoAlt}
							dataAos='fade-up'
						/>
					</li>
				))}
			</ul>
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
		photo: '/images/meylis.png',
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
				company: content.company,
				comment: content.comment,
				photoAlt: content.photoAlt,
				photo: asset.photo,
			},
		];
	});
}

export default TestimonialsSection;
