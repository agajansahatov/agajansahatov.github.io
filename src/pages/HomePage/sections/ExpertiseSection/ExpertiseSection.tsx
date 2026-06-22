import type { ReactElement } from 'react';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import ButtonLink from '../../../../components/Button/ButtonLink';
import Icon from '../../../../components/Icon';
import Media from '../../../../components/Media';
import type { SkinVariant } from '../../../../components/types';
import { ROUTES } from '../../../../config/navigation';
import { HomeExpertiseCatalog } from '../../../../data/homeExpertiseCatalog';
import type { ExpertiseItemCatalogPort } from '../../../../types/expertise';
import type { HomeExpertiseId } from '../../../../i18n/expertiseTranslations';
import { useTranslation } from '../../../../i18n';
import styles from './ExpertiseSection.module.css';

type ExpertiseSectionProps = {
	readonly catalog?: ExpertiseItemCatalogPort;
};

const ExpertiseSection = ({
	catalog = HomeExpertiseCatalog.instance,
}: ExpertiseSectionProps) => {
	const { t } = useTranslation();

	return (
		<Block
			variant='inverted'
			id='section-expertise'
			className={styles.section}
		>
			<BlockHeader className={styles.header}>
				<h2>{t.explore.expertiseTitle}</h2>
			</BlockHeader>

			<ul
				className={`grid grid--cols-1 md:grid--cols-2 lg:grid--cols-3 ${styles.grid}`}
			>
				{t.explore.expertises.map((expertise) => {
					const catalogItem = catalog.getItem(expertise.id);

					return (
						<li key={expertise.id} className={styles.item}>
							<Media
								className={styles.media}
								image={createExpertiseIcon(
									catalogItem.icon,
									expertiseVariants[expertise.id],
								)}
								title={expertise.title}
								titleStyles={styles.title}
							>
								<p>{expertise.body}</p>
							</Media>
						</li>
					);
				})}
			</ul>

			<footer className={styles.footer}>
				<ButtonLink
					href={ROUTES.expertise}
					layout='stretched'
					variant='accent'
					className={styles.cta}
				>
					{t.explore.expertiseCta}
				</ButtonLink>
			</footer>
		</Block>
	);
};

const expertiseVariants: Readonly<Record<HomeExpertiseId, SkinVariant>> = {
	typescript: 'secondary',
	react: 'success',
	nodejs: 'info',
	nextjs: 'light',
	'spring-boot': 'success',
	mysql: 'primary',
};

function createExpertiseIcon(
	icon: Parameters<typeof Icon>[0]['icon'],
	variant: SkinVariant,
): ReactElement {
	return <Icon icon={icon} variant={variant} />;
}

export default ExpertiseSection;
