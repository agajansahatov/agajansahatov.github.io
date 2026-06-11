import { FaAward, FaBolt, FaCode, FaUsers } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Card from '../../../../components/Card';
import Icon from '../../../../components/Icon';
import { useTranslation } from '../../../../i18n';
import styles from './PrinciplesSection.module.css';

const PrinciplesSection = () => {
	const { t } = useTranslation();

	return (
		<Block
			id='section-showcase'
			className={styles.section}
			containerClassName={styles.container}
			variant='inverted'
		>
			<BlockHeader dataAos='fade-up' className={styles.header}>
				<h2 className={styles.title}>{t.explore.principlesTitle}</h2>
			</BlockHeader>

			<ul
				className={`grid grid--cols-1 md:grid--cols-2 lg:grid--cols-4 ${styles.grid}`}
			>
				{t.explore.principles.map((principle, index) => (
					<li
						key={principle.title}
						className={styles.item}
						data-aos={index % 2 === 0 ? 'fade-up-right' : 'fade-up-left'}
					>
						<Card isInverted isScalableOnHover className={styles.card}>
							<Icon
								icon={PrincipleIcons.icons[index]}
								variant='primary'
								className={styles['card__icon']}
							/>

							<h3 className={styles.cardTitle}>{principle.title}</h3>
							<p className={styles.body}>{principle.body}</p>
						</Card>
					</li>
				))}
			</ul>
		</Block>
	);
};

export default PrinciplesSection;

class PrincipleIcons {
	static readonly icons: readonly IconType[] = [
		FaAward,
		FaBolt,
		FaUsers,
		FaCode,
	] as const;
}
