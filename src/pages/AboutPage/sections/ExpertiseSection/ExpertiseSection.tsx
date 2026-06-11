import { FaBullseye, FaRegEye } from 'react-icons/fa6';
import Block from '../../../../components/Block';
import Card from '../../../../components/Card';
import Icon from '../../../../components/Icon';
import { useTranslation } from '../../../../i18n';
import styles from './ExpertiseSection.module.css';

const ExpertiseSection = () => {
	const { t } = useTranslation();

	return (
		<Block variant='inverted' className={styles.section}>
			<div className={`grid grid--cols-1 lg:grid--cols-2 ${styles.grid}`}>
				<Card
					variant='default'
					isInverted
					isScalableOnHover={false}
					className={styles.card}
					header={
						<div className={styles.cardHeader}>
							<Icon icon={FaBullseye} variant='primary' />
							<h3 className={styles.cardTitle}>{t.about.missionTitle}</h3>
						</div>
					}
				>
					<p className={styles.body}>{t.about.missionBody}</p>
				</Card>

				<Card
					variant='default'
					isInverted
					isScalableOnHover={false}
					className={styles.card}
					header={
						<div className={styles.cardHeader}>
							<Icon icon={FaRegEye} variant='secondary' />
							<h3 className={styles.cardTitle}>{t.about.visionTitle}</h3>
						</div>
					}
				>
					<p className={styles.body}>{t.about.visionBody}</p>
				</Card>
			</div>
		</Block>
	);
};

export default ExpertiseSection;
