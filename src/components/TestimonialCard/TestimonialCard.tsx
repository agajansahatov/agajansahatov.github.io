import { FaQuoteLeft } from 'react-icons/fa6';
import type { ResolvedHomeTestimonial } from '../../types/testimonial';
import { useTranslation } from '../../i18n';
import Icon from '../Icon';
import Picture from '../Picture';
import Quote from '../Quote';
import styles from './TestimonialCard.module.css';

type Props = Pick<
	ResolvedHomeTestimonial,
	'name' | 'organization' | 'comment' | 'photo' | 'photoAlt'
> & {
	dataAos?: string;
};

const TestimonialCard = ({
	name,
	organization,
	comment,
	photo,
	photoAlt,
	dataAos = '',
}: Props) => {
	const { t } = useTranslation();
	const aosAttributes = dataAos
		? { 'data-aos': dataAos, 'data-aos-duration': 1000 }
		: {};

	return (
		<div className={styles.card} {...aosAttributes}>
			<div className={styles['card__surface']}>
				<div className={`grid grid--cols-1 ${styles['card__layout']}`}>
					<div className={styles['image-container']}>
						<Picture
							src={photo}
							alt={photoAlt}
							className={styles.image}
							type='multi-source'
						/>
						<span className={styles['quote-badge']} aria-hidden>
							<Icon
								icon={FaQuoteLeft}
								variant='accent'
								className={styles['quote-badge__icon']}
							/>
						</span>
					</div>
					<div className={styles['card__quote']}>
						<Quote
							author={name}
							organization={organization}
							readMoreLabel={t.experience.readMore}
							readLessLabel={t.experience.readLess}
						>
							{comment}
						</Quote>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialCard;
