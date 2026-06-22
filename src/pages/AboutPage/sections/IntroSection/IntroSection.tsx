import Avatar from '../../../../components/Avatar';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import { useTranslation } from '../../../../i18n';
import styles from './IntroSection.module.css';

const IntroSection = () => {
	const { t, interpolate } = useTranslation();

	return (
		<Block
			className={styles.hero}
			containerClassName={`grid grid--cols-1 lg:grid--cols-2 ${styles.hero__grid}`}
		>
			<BlockHeader className={styles.hero__content}>
				<span className={styles.badge}>
					<Avatar
						size='sm'
						className={styles.badge__avatar}
						isDecorative
					/>
					<span className={styles.badge__text}>
						{interpolate(t.about.badge)}
					</span>
				</span>
				<h1 className={styles.hero__title}>{interpolate(t.about.title)}</h1>
				<p className={`${styles.hero__tagline} word-break`}>
					{interpolate(t.about.tagline)}
				</p>
			</BlockHeader>

			<img
				className={styles.hero__image}
				sizes='(max-width: 1000px) 100vw, 1000px'
				srcSet='/images/agajansahatov_sm.png 400w, /images/agajansahatov_md.png 800w, /images/agajansahatov.png 1000w'
				src='/images/agajansahatov.png'
				alt={interpolate(t.about.imageAlt)}
			/>
		</Block>
	);
};

export default IntroSection;
