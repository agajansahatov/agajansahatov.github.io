import {
	resolveEducationEntries,
	resolveWorkExperiences,
} from '../../data/experienceAssets';
import Block from '../../components/Block';
import BlockHeader from '../../components/Block/BlockHeader';
import ExperienceTimeline from '../../components/ExperienceTimeline';
import { useTranslation } from '../../i18n';
import Footer from '../../sections/Footer';
import styles from './ExperiencePage.module.css';

const ExperiencePage = () => {
	const { t, language } = useTranslation();
	const workExperiences = resolveWorkExperiences(t.experience.workExperience.entries);
	const educationEntries = resolveEducationEntries(t.experience.education.entries);

	return (
		<>
			<Block id='experience-page' className={styles.section}>
				<BlockHeader>
					<h1 className={styles['section__heading']}>{t.experience.title}</h1>
					<p className={styles['section__tagline']}>{t.experience.tagline}</p>
				</BlockHeader>

				<section className={styles.subsection}>
					<h2 className={styles['subsection__heading']}>
						{t.experience.workExperience.title}
					</h2>
					<ExperienceTimeline
						experiences={workExperiences}
						language={language}
						presentLabel={t.experience.present}
						viewCompanyLabel={t.experience.viewCompany}
						readMoreLabel={t.experience.readMore}
						readLessLabel={t.experience.readLess}
					/>
				</section>

				<section className={`${styles.subsection} ${styles['subsection--education']}`}>
					<h2 className={styles['subsection__heading']}>
						{t.experience.education.title}
					</h2>
					<ExperienceTimeline
						experiences={educationEntries}
						language={language}
						presentLabel={t.experience.present}
						viewCompanyLabel={t.experience.viewInstitution}
						readMoreLabel={t.experience.readMore}
						readLessLabel={t.experience.readLess}
					/>
				</section>
			</Block>
			<Footer />
		</>
	);
};

export default ExperiencePage;
