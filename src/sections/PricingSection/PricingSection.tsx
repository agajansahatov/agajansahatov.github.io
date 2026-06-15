import Block from '../../components/Block';
import BlockHeader from '../../components/Block/BlockHeader';
import type { SkinVariant } from '../../components/types';
import { useTranslation } from '../../i18n';
import PricingCard from './PricingCard';
import styles from './PricingSection.module.css';

const planVariants: readonly SkinVariant[] = ['info', 'primary', 'info'];

const PricingSection = () => {
	const { t, interpolate } = useTranslation();

	return (
		<Block id='pricing-section' className={styles['section__pricing']}>
			<BlockHeader>
				<h2 className={styles['section__heading']}>{t.pricing.title}</h2>
				<p className={styles['section__tagline']}>{interpolate(t.pricing.tagline)}</p>
			</BlockHeader>

			<ul
				className={`grid grid--cols-1 md:grid--cols-2 lg:grid--cols-3 ${styles.plans}`}
			>
				{t.pricing.plans.map((pricingPlan, index) => (
					<li
						key={pricingPlan.name}
						style={{ width: '90%', height: '100%', margin: '0 auto' }}
					>
						<PricingCard
							planName={pricingPlan.name}
							priceLabel={pricingPlan.price}
							description={pricingPlan.description}
							features={pricingPlan.features}
							link='/pricing'
							isHighlighted={index === 1}
							skinVariant={planVariants[index] ?? 'primary'}
							billingCycle={pricingPlan.cycle}
							discount={pricingPlan.discount}
							discountSuffix={t.pricing.badgeSuffix}
							ctaLabel={t.pricing.subscribe}
						/>
					</li>
				))}
			</ul>
		</Block>
	);
};

export default PricingSection;
