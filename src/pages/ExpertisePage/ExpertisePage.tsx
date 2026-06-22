import Block from '../../components/Block';
import BlockHeader from '../../components/Block/BlockHeader';
import Collapsible from '../../components/Collapsible';
import SkillGraph from '../../components/SkillGraph';
import { ExpertiseCatalog } from '../../data/expertiseCatalog';
import { useTranslation } from '../../i18n';
import Footer from '../../sections/Footer';
import type {
	ExpertiseCatalogPort,
	ExpertiseLabelKey,
} from '../../types/expertise';
import styles from './ExpertisePage.module.css';

type ExpertisePageProps = {
	readonly catalog?: ExpertiseCatalogPort;
};

const ExpertisePage = ({
	catalog = ExpertiseCatalog.instance,
}: ExpertisePageProps) => {
	const { t } = useTranslation();
	const sections = catalog.getSections();
	const resolveLabel = (key: ExpertiseLabelKey) => t.expertise.labels[key];
	const officialWebsiteLabel = (name: string) =>
		t.expertise.officialWebsiteLabel.replace('{name}', name);

	return (
		<>
			<Block id='expertise-page' className={styles.page}>
				<BlockHeader className={styles.header}>
					<h1 className={styles.heading}>{t.expertise.title}</h1>
					<p className={styles.tagline}>{t.expertise.tagline}</p>
				</BlockHeader>

				<div className={styles.sections}>
					{sections.map((section) => (
						<section key={section.id} className={styles.section}>
							<Collapsible
								header={resolveLabel(section.titleKey)}
								defaultExpanded={section.defaultExpanded}
								headingLevel={2}
								className={styles.collapsible}
								headerClassName={styles['collapsible-header']}
								headingClassName={styles['collapsible-heading']}
								chevronIconClassName={styles.chevron}
								chevronSkinVariant='primary'
							>
								<div className={styles.content}>
									{section.graph ? (
										<SkillGraph
											root={section.graph}
											catalog={catalog}
											resolveLabel={resolveLabel}
											officialWebsiteLabel={officialWebsiteLabel}
										/>
									) : (
										<p className={styles['full-stack-copy']}>
											{section.descriptionKey
												? t.expertise[section.descriptionKey]
												: null}
										</p>
									)}
								</div>
							</Collapsible>
						</section>
					))}
				</div>
			</Block>
			<Footer />
		</>
	);
};

export default ExpertisePage;
