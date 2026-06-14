import LastExperiencesSection from '../HomePage/sections/LastExperiencesSection/LastExperiencesSection';
import Block from '../../components/Block';
import BlockHeader from '../../components/Block/BlockHeader';
import ExperienceTimeline from '../../components/ExperienceTimeline';
import { useTranslation } from '../../i18n';
import Footer from '../../sections/Footer';
import styles from './ExperiencePage.module.css';

const ExperiencePage = () => {
	const { t, language } = useTranslation();
	const experiences = LastExperiencesSection.resolveExperiences(t.experience.entries);

	return (
		<>
			<Block id='experience-page' className={styles.section}>
				<BlockHeader>
					<h1 className={styles['section__heading']}>{t.experience.title}</h1>
					<p className={styles['section__tagline']}>{t.experience.tagline}</p>
				</BlockHeader>

				<ExperienceTimeline
					experiences={experiences}
					language={language}
					presentLabel={t.experience.present}
					viewCompanyLabel={t.experience.viewCompany}
					readMoreLabel={t.experience.readMore}
					readLessLabel={t.experience.readLess}
				/>
			</Block>
			<Footer />
		</>
	);
};

export default ExperiencePage;
