import { useCallback, useMemo } from 'react';
import { LuFileText, LuGraduationCap } from 'react-icons/lu';
import Block from '../../components/Block';
import BlockHeader from '../../components/Block/BlockHeader';
import DocumentActionCard from '../../components/DocumentActionCard';
import { DOCUMENTS } from '../../config/documents';
import { useTranslation } from '../../i18n';
import { DocumentDownloadService } from '../../services/documents/documentDownloadService';
import type { DocumentDownloadServicePort } from '../../services/documents/documentDownloadServicePort';
import Footer from '../../sections/Footer';
import styles from './ResumeCvPage.module.css';

type ResumeCvPageProps = {
	readonly downloadService?: DocumentDownloadServicePort;
};

const ResumeCvPage = ({
	downloadService = DocumentDownloadService.instance,
}: ResumeCvPageProps) => {
	const { t } = useTranslation();

	const handleResumeDownload = useCallback(() => {
		const { publicPath, downloadFileName } = DOCUMENTS.resume;
		downloadService.openAndDownload(publicPath, downloadFileName);
	}, [downloadService]);

	const cards = useMemo(
		() => [
			{
				key: DOCUMENTS.resume.id,
				title: t.resumeCv.resume.title,
				description: t.resumeCv.resume.description,
				icon: LuFileText,
				variant: 'primary' as const,
				onAction: handleResumeDownload,
				isDisabled: !DOCUMENTS.resume.isAvailable,
				unavailableNote: undefined,
			},
			{
				key: DOCUMENTS.cv.id,
				title: t.resumeCv.cv.title,
				description: t.resumeCv.cv.description,
				icon: LuGraduationCap,
				variant: 'secondary' as const,
				onAction: undefined,
				isDisabled: !DOCUMENTS.cv.isAvailable,
				unavailableNote: t.resumeCv.cv.unavailable,
			},
		],
		[handleResumeDownload, t.resumeCv],
	);

	return (
		<>
			<Block className={styles.page}>
				<div className={styles.section}>
					<BlockHeader className={styles.header}>
						<h1 className={styles.heading}>{t.resumeCv.title}</h1>
						<p className={styles.tagline}>{t.resumeCv.tagline}</p>
					</BlockHeader>

					<div className={styles.cards}>
						{cards.map((card) => (
							<DocumentActionCard
								key={card.key}
								title={card.title}
								description={card.description}
								icon={card.icon}
								variant={card.variant}
								onAction={card.onAction}
								isDisabled={card.isDisabled}
								unavailableNote={card.unavailableNote}
							/>
						))}
					</div>
				</div>
			</Block>
			<Footer />
		</>
	);
};

export default ResumeCvPage;
