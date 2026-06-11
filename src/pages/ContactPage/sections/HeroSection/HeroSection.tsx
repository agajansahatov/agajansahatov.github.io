import { useEffect, useMemo } from 'react';
import { LuCopy, LuMail, LuMapPin, LuPhoneCall } from 'react-icons/lu';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import IconButton from '../../../../components/Button/IconButton';
import ContactMethodCard from '../../../../components/ContactMethodCard';
import { useTranslation } from '../../../../i18n';
import { COMPANY } from '../../../../config/company';
import { ContactClipboardBinder } from '../../../../services/contact/contactClipboardBinder';
import { ToastNotificationService } from '../../../../services/notifications/toastNotificationService';
import styles from './HeroSection.module.css';

const HeroSection = () => {
	const { t } = useTranslation();
	const clipboardBinder = useMemo(
		() => new ContactClipboardBinder(ToastNotificationService.instance),
		[],
	);

	useEffect(() => {
		return clipboardBinder.bind(
			'.copy-btn',
			t.contact.copySuccess,
			t.contact.copyFailure,
		);
	}, [clipboardBinder, t.contact.copyFailure, t.contact.copySuccess]);

	return (
		<Block className={styles.block}>
			<div className={styles.section}>
				<BlockHeader>
					<h1 className={styles.heading}>{t.contact.title}</h1>
				</BlockHeader>

				<div
					className='grid grid--cols-1 lg:grid--cols-2'
					style={{ gap: '2rem 3rem', justifyItems: 'center' }}
				>
					<ContactMethodCard
						title={t.contact.mapTitle}
						icon={LuMapPin}
						variant='primary'
						description={
							<>
								<div className={styles.addressCn}>{COMPANY.address}</div>
								<div
									className={styles.mapWrap}
									aria-label={t.contact.mapPreview}
								>
									<iframe
										className={styles.map}
										title={t.contact.mapTitle}
										loading='lazy'
										referrerPolicy='no-referrer-when-downgrade'
										src={`https://www.google.com/maps?q=${encodeURIComponent(
											COMPANY.address,
										)}&output=embed`}
									/>
								</div>
								<p className={styles.mapNote}>{t.contact.mapUnavailable}</p>
							</>
						}
						actions={[
							{
								type: 'button',
								label: t.contact.openMap,
								href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
									COMPANY.address,
								)}`,
								target: '_blank',
							},
						]}
						isScalableOnHover={false}
						dataAos='fade-up-right'
					/>

					<div className={styles.contactMethods}>
						<ContactMethodCard
							title={t.contact.phonesTitle}
							icon={LuPhoneCall}
							variant='success'
							description={
								<div className={styles.contactBody}>
									<div className={styles.kvList}>
										<div className={styles.kvRow}>
											<span className={styles.kvKey}>
												{t.contact.tmPhoneLabel}
											</span>

											<span className={styles.kvValueWrap}>
												<a
													className={`${styles.kvValue} link-underline`}
													href={`tel:${COMPANY.phone_tm}`}
												>
													{COMPANY.phone_tm}
												</a>

												<IconButton
													aria-label={t.contact.copyTmPhone}
													title={t.contact.copyTmPhone}
													className={`copy-btn ${styles.copyBtn}`}
													data-clipboard-text={COMPANY.phone_tm}
													data-label={t.contact.tmPhoneDataLabel}
												>
													<LuCopy />
												</IconButton>
											</span>
										</div>

										<div className={styles.kvRow}>
											<span className={styles.kvKey}>
												{t.contact.cnPhoneLabel}
											</span>

											<span className={styles.kvValueWrap}>
												<a
													className={`${styles.kvValue} link-underline`}
													href={`tel:${COMPANY.phone_cn}`}
												>
													{COMPANY.phone_cn}
												</a>

												<IconButton
													aria-label={t.contact.copyCnPhone}
													title={t.contact.copyCnPhone}
													className={`copy-btn ${styles.copyBtn}`}
													data-clipboard-text={COMPANY.phone_cn}
													data-label={t.contact.cnPhoneDataLabel}
												>
													<LuCopy />
												</IconButton>
											</span>
										</div>
									</div>

									<p className={styles.meta}>{t.contact.phonesBody}</p>
								</div>
							}
							actions={[
								{
									type: 'button',
									label: t.contact.callTm,
									href: `tel:${COMPANY.phone_tm}`,
								},
								{
									type: 'button',
									label: t.contact.callCn,
									href: `tel:${COMPANY.phone_cn}`,
								},
							]}
							isScalableOnHover={false}
							dataAos='fade-up-left'
						/>

						<ContactMethodCard
							title={t.contact.emailTitle}
							icon={LuMail}
							variant='secondary'
							description={
								<div className={styles.contactBody}>
									<p className={styles.lead}>{t.contact.emailBody}</p>

									<div className={styles.kvList}>
										<div className={styles.kvRow}>
											<span className={styles.kvKey}>{t.common.email}:</span>

											<span className={styles.kvValueWrap}>
												<a
													className={`${styles.kvValue} link-underline`}
													href={`mailto:${COMPANY.email}`}
												>
													{COMPANY.email}
												</a>

												<IconButton
													aria-label={t.contact.copyEmail}
													title={t.contact.copyEmail}
													className={`copy-btn ${styles.copyBtn}`}
													data-clipboard-text={COMPANY.email}
													data-label={t.common.email}
												>
													<LuCopy />
												</IconButton>
											</span>
										</div>
									</div>
								</div>
							}
							actions={[
								{
									type: 'button',
									label: t.contact.writeEmail,
									href: `mailto:${COMPANY.email}`,
								},
							]}
							isScalableOnHover={false}
							dataAos='fade-up-left'
						/>
					</div>
				</div>
			</div>
		</Block>
	);
};

export default HeroSection;
