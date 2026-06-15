import type { FC } from 'react';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import ButtonLink from '../../../../components/Button/ButtonLink';
import ExperienceTimeline from '../../../../components/ExperienceTimeline';
import { resolveLatestWorkExperiences } from '../../../../data/experienceAssets';
import { useTranslation } from '../../../../i18n';
import styles from './LastExperiencesSection.module.css';

const featuredExperienceCount = 3;

function LastExperiencesSectionComponent() {
	const { t, language } = useTranslation();
	const experiences = resolveLatestWorkExperiences(
		t.experience.workExperience.entries,
		featuredExperienceCount,
	);

	return (
		<Block id='section-last-experiences' className={styles.section}>
			<BlockHeader>
				<h2 className={styles['section__heading']}>
					{t.explore.experiencesTitle}
				</h2>
				<p className={styles['section__tagline']}>
					{t.explore.experiencesTagline}
				</p>
			</BlockHeader>

			<ExperienceTimeline
				experiences={experiences}
				language={language}
				presentLabel={t.experience.present}
				viewCompanyLabel={t.experience.viewCompany}
				readMoreLabel={t.experience.readMore}
				readLessLabel={t.experience.readLess}
			/>

			<footer className={styles.footer}>
				<ButtonLink
					href='/experience'
					layout='stretched'
					variant='accent'
					className={styles['view-more']}
				>
					{t.explore.viewMore}
				</ButtonLink>
			</footer>
		</Block>
	);
}

const LastExperiencesSection = LastExperiencesSectionComponent as FC;

export default LastExperiencesSection;
