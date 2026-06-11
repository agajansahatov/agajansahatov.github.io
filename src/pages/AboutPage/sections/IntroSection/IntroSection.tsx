import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import { useTranslation } from '../../../../i18n';
import styles from './IntroSection.module.css';

const IntroSection = () => {
	const { t } = useTranslation();

	return (
		<Block
			className={styles.hero}
			containerClassName={`grid grid--cols-1 lg:grid--cols-2 ${styles.hero__grid}`}
		>
			<BlockHeader className={styles.hero__content}>
				<span className={styles.badge}>{t.about.badge}</span>
				<h1 className='word-break'>{t.about.title}</h1>
				<p className={`${styles.hero__tagline} word-break`}>
					{t.about.tagline}
				</p>
			</BlockHeader>

			<div className={styles.hero__visual}>
				<img
					className={styles.hero__image}
					sizes='(max-width: 1000px) 100vw, 1000px'
					srcSet='/images/agajansahatov_sm.png 400w, /images/agajansahatov_md.png 800w, /images/agajansahatov.png 1000w'
					src='/images/agajansahatov.png'
					alt={t.about.imageAlt}
				/>
			</div>
		</Block>
	);
};

export default IntroSection;
