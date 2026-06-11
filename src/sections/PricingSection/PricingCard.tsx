import clsx from 'clsx';
import { GiCheckMark } from 'react-icons/gi';
import Badge from '../../components/Badge';
import Card from '../../components/Card';
import Link from '../../components/Link';
import buttonStyles from '../../components/Button/Button.module.css';
import type { SkinVariant } from '../../components/types';
import styles from './PricingCard.module.css';

type PricingCardProps = {
	readonly planName: string;
	readonly priceLabel: string;
	readonly billingCycle: string;
	readonly discount: string;
	readonly discountSuffix: string;
	readonly description: string;
	readonly features: readonly string[];
	readonly link: string;
	readonly isHighlighted?: boolean;
	readonly skinVariant?: SkinVariant;
	readonly ctaLabel: string;
};

const PricingCard = ({
	planName,
	priceLabel,
	description,
	features,
	link,
	isHighlighted = false,
	skinVariant = 'primary',
	billingCycle,
	discount,
	discountSuffix,
	ctaLabel,
}: PricingCardProps) => {
	return (
		<Link href={link} style={{ display: 'block', height: '100%' }}>
			<Card
				className={`${styles['pricing-card']} ${
					isHighlighted ? styles['pricing-card--highlighted'] : ''
				}`}
				variant={skinVariant}
				header={
					<div className={styles['pricing-card__header']}>
						<h3 className={styles['pricing-card__name']}>{planName}</h3>

						<p className={styles['pricing-card__header-row']}>
							<span className={styles['pricing-card__price']}>
								{priceLabel}
							</span>
							<span className={styles['pricing-card__billing-cycle']}>
								{billingCycle}
							</span>
							{discount ? (
								<Badge
									skinVariant={skinVariant}
									size='small'
									className={styles['pricing-card__badge']}
								>
									{discount} {discountSuffix}
								</Badge>
							) : null}
						</p>

						<p className={styles['pricing-card__description']}>{description}</p>
					</div>
				}
			>
				<main className={styles['pricing-card__content']}>
					<div className={styles['pricing-card__features']}>
						{features.map((feature) => (
							<p key={feature} className={styles['pricing-card__feature-item']}>
								<GiCheckMark
									className={`${styles['pricing-card__icon']} ${styles['pricing-card__icon--tick']}`}
								/>
								<span>{feature}</span>
							</p>
						))}
					</div>
				</main>
				<footer className={styles.footer}>
					<span
						className={clsx(
							buttonStyles.btn,
							buttonStyles['btn--outline'],
							buttonStyles['btn--block'],
							styles['footer__button'],
						)}
					>
						{ctaLabel}
					</span>
				</footer>
			</Card>
		</Link>
	);
};

export default PricingCard;
