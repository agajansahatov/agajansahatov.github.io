import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Collapsible from '../../../../components/Collapsible';
import { useTranslation } from '../../../../i18n';
import styles from './FAQSection.module.css';

const FAQSection = () => {
	const { t } = useTranslation();

	return (
		<Block className={styles.block}>
			<div className={styles.section}>
				<BlockHeader>
					<h2 className={styles.heading}>{t.contact.faqTitle}</h2>
					<p className={styles.subheading}>{t.contact.faqSubtitle}</p>
				</BlockHeader>

				<div className={styles.faq}>
					{t.contact.faqs.map((faq) => (
						<Collapsible
							key={faq.question}
							header={faq.question}
							headingClassName={styles.question}
							chevronIconClassName={styles['chevron-icon']}
							headingLevel={3}
							chevronSkinVariant='secondary'
						>
							<p className={styles.answer}>{faq.answer}</p>
						</Collapsible>
					))}
				</div>
			</div>
		</Block>
	);
};

export default FAQSection;
