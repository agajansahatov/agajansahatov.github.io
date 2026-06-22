import { FaLocationDot, FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { PiHandshakeFill } from 'react-icons/pi';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Icon from '../../../../components/Icon';
import PortfolioContactChannels from '../../../../components/PortfolioContactChannels';
import SocialLinks from '../../../../components/SocialLinks';
import { PORTFOLIO } from '../../../../config/portfolio';
import { useTranslation } from '../../../../i18n';
import styles from './PortfolioInfoSection.module.css';

const PortfolioInfoSection = () => {
	const { t, portfolioName, interpolate } = useTranslation();

	return (
		<Block className={styles.section} variant='inverted'>
			<BlockHeader>
				<h2>{t.about.portfolioTitle}</h2>
				<p>{interpolate(t.about.portfolioSubtitle)}</p>
			</BlockHeader>

			<div className={`grid grid--cols-1 lg:grid--cols-2 ${styles.layout}`}>
				<section className={styles.details}>
					<div className={styles.details__header}>
						<Icon icon={PiHandshakeFill} variant='secondary' />
						<div className={styles.details__headerBody}>
							<h3 className={styles.details__title}>{t.about.detailsTitle}</h3>
							<p className={styles.details__hint}>{t.about.detailsHint}</p>
						</div>
					</div>

					<div className={styles.kv}>
						<div className={styles.kv__row}>
							<span className={styles.kv__key}>{t.about.nameLabel}</span>
							<span className={`word-break ${styles.kv__value}`}>
								{portfolioName}
							</span>
						</div>

						<div className={styles.kv__row}>
							<span className={styles.kv__key}>{t.about.addressLabel}</span>
							<span className={`word-break ${styles.kv__value}`}>
								{PORTFOLIO.address}
							</span>
						</div>

						<div className={styles.kv__row}>
							<span className={styles.kv__key}>{t.about.focusLabel}</span>
							<span className={styles.kv__value}>{t.about.focusValue}</span>
						</div>
					</div>

					<div className={styles.footerNote}>
						<FaLocationDot className={styles.footerNote__icon} size={30} />
						<p className='word-break'>{t.about.footerNote}</p>
					</div>
				</section>

				<aside className={styles.rail}>
					<div className={styles.rail__glow} aria-hidden='true' />

					<h3 className={styles.rail__title}>{t.about.contactTitle}</h3>
					<p className={styles.rail__subtitle}>{t.about.contactSubtitle}</p>

					<ul className={styles.actions}>
						<li className={`grid ${styles.action}`}>
							<span className={styles.action__icon}>
								<Icon icon={FaPhone} variant='success' />
							</span>

							<PortfolioContactChannels
								variant='inverted'
								layout='compact'
								channel='phones'
								phoneLabel={t.about.phoneLabel}
							/>
						</li>

						<li className={`grid ${styles.action}`}>
							<span className={styles.action__icon}>
								<Icon icon={MdEmail} variant='accent' />
							</span>

							<PortfolioContactChannels
								variant='inverted'
								layout='compact'
								channel='email'
								emailLabel={t.common.email}
							/>
						</li>

						<li className={styles.actionRow}>
							<SocialLinks
								variant='inverted'
								note={interpolate(t.about.socialNote)}
							/>
						</li>
					</ul>
				</aside>
			</div>
		</Block>
	);
};

export default PortfolioInfoSection;
