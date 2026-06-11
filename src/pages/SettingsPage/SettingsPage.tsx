import Block from '../../components/Block';
import Card from '../../components/Card';
import { SettingsControls } from '../../components/Preferences';
import { useTranslation } from '../../i18n';
import Footer from '../../sections/Footer';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
	const { t } = useTranslation();

	return (
		<>
			<Block className={styles.page}>
				<div className={styles.header}>
					<h1>{t.settings.title}</h1>
					<p>{t.settings.subtitle}</p>
				</div>

				<Card
					className={styles.card}
					isScalableOnHover={false}
					header={
						<div>
							<h2 className={styles.cardTitle}>{t.settings.panelTitle}</h2>
							<p className={styles.cardDescription}>
								{t.settings.panelDescription}
							</p>
						</div>
					}
				>
					<SettingsControls />
				</Card>
			</Block>
			<Footer />
		</>
	);
};

export default SettingsPage;

