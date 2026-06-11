import { FaInstagram, FaLocationDot, FaPhone, FaTiktok } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { PiHandshakeFill } from 'react-icons/pi';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Icon from '../../../../components/Icon';
import Link from '../../../../components/Link';
import { useTranslation } from '../../../../i18n';
import { COMPANY } from '../../../../config/company';
import styles from './CompanyInfoSection.module.css';

const CompanyInfoSection = () => {
	const { t } = useTranslation();

	return (
		<Block className={styles.section} variant='inverted'>
			<BlockHeader>
				<h2>{t.about.companyTitle}</h2>
				<p>{t.about.companySubtitle}</p>
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
							<span className={styles.kv__key}>{t.about.ownerLabel}</span>
							<span className={`word-break ${styles.kv__value}`}>
								{COMPANY.owner}
							</span>
						</div>

						<div className={styles.kv__row}>
							<span className={styles.kv__key}>{t.about.addressLabel}</span>
							<span className={`word-break ${styles.kv__value}`}>
								{COMPANY.address}
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

							<div className={styles.action__body}>
								<span className={styles.action__label}>
									{t.about.phoneLabel}
								</span>

								<div className={styles.action__values}>
									<Link
										className={`link-underline word-break ${styles.action__value}`}
										href={`tel:${COMPANY.phone_tm}`}
									>
										{COMPANY.phone_tm},
									</Link>

									<Link
										className={`link-underline word-break ${styles.action__value}`}
										href={`tel:${COMPANY.phone_cn}`}
									>
										{COMPANY.phone_cn}
									</Link>
								</div>
							</div>
						</li>

						<li className={`grid ${styles.action}`}>
							<span className={styles.action__icon}>
								<Icon icon={MdEmail} variant='accent' />
							</span>

							<div className={styles.action__body}>
								<span className={styles.action__label}>{t.common.email}</span>

								<div className={styles.action__values}>
									<Link
										className={`link-underline word-break ${styles.action__value}`}
										href={`mailto:${COMPANY.email}`}
									>
										{COMPANY.email}
									</Link>
								</div>
							</div>
						</li>

						<li className={styles.actionRow}>
							<div className={styles.social}>
								<Link
									href='https://www.instagram.com/agajansahatovofficial/'
									target='_blank'
									className={styles.social__btn}
									aria-label='Instagram'
									title='Instagram'
								>
									<FaInstagram size={28} />
								</Link>

								<Link
									href='https://www.tiktok.com/@agajansahatov.official'
									target='_blank'
									className={styles.social__btn}
									aria-label='TikTok'
									title='TikTok'
								>
									<FaTiktok size={25} />
								</Link>
							</div>

							<p className={styles.socialNote}>{t.about.socialNote}</p>
						</li>
					</ul>
				</aside>
			</div>
		</Block>
	);
};

export default CompanyInfoSection;
