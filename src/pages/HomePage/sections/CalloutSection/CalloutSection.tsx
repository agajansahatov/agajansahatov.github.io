import Block from '../../../../components/Block';
import ButtonLink from '../../../../components/Button/ButtonLink';
import { useTranslation } from '../../../../i18n';
import styles from './CalloutSection.module.css';

const CalloutSection = () => {
	const { t } = useTranslation();

	return (
		<div className={styles['section__callout']}>
			<div
				className={styles['section__callout__inverted-overlap']}
				aria-hidden
			/>
			<Block
				className={styles['section__callout__content']}
				containerClassName={styles['section__callout__content__container']}
			>
				<div className={styles.callout}>
					<div className='grid grid--cols-1 md:grid--cols-2'>
						<div className={styles.callout__content}>
							<h2 className={styles.callout__heading}>
								{t.explore.calloutTitle}
							</h2>
							<p>{t.explore.calloutBody}</p>
						</div>

						<ButtonLink
							href='/contact'
							variant='info'
							className={styles.callout__button}
							layout='stretched'
						>
							{t.explore.calloutCta}
						</ButtonLink>
					</div>
				</div>
			</Block>
		</div>
	);
};

export default CalloutSection;
