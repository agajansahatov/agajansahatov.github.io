import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import ButtonLink from '../../../../components/Button/ButtonLink';
import { useTranslation } from '../../../../i18n';
import styles from './BannerSection.module.css';

const BannerSection = () => {
	const { t } = useTranslation();

	return (
		<Block
			direction='left'
			className={styles.banner}
			containerClassName={`grid grid--cols-1 lg:grid--cols-2 ${styles.banner__grid} container`}
		>
			<BlockHeader
				className={`${styles.banner__header} ${styles.banner__content}`}
			>
				<h1 className='word-break'>{t.explore.heroTitle}</h1>

				<p className={`${styles.banner__tagline} word-break`}>
					{t.explore.heroTagline}
				</p>

				<ButtonLink
					href='#services-section'
					variant='accent'
					layout='stretched'
				>
					{t.explore.heroCta}
				</ButtonLink>
			</BlockHeader>

			<img
				className={styles.banner__image}
				sizes='(max-width: 1000px) 100vw, 1000px'
				srcSet='/images/agajansahatov_sm.png 400w, /images/agajansahatov_md.png 800w, /images/agajansahatov.png 1000w'
				src='/images/agajansahatov.png'
				alt={t.explore.heroImageAlt}
			/>
		</Block>
	);
};

export default BannerSection;
