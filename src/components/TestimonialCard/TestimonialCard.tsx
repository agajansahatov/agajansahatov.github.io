import { FaQuoteLeft } from 'react-icons/fa6';
import type { ResolvedHomeTestimonial } from '../../types/testimonial';
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
	const aosAttributes = dataAos
		? { 'data-aos': dataAos, 'data-aos-duration': 1000 }
		: {};

	return (
		<div
			className={styles.card}
			{...aosAttributes}
		>
			<div className='grid grid--cols-1 md:grid--cols-2'>
				<div className={styles['image-container']}>
					<Picture src={photo} alt={photoAlt} className={styles.image} />
					<span className={styles['quote-badge']} aria-hidden>
						<Icon icon={FaQuoteLeft} variant='accent' isSmall />
					</span>
				</div>
				<Quote author={name} organization={organization}>
					{comment}
				</Quote>
			</div>
		</div>
	);
};

export default TestimonialCard;
