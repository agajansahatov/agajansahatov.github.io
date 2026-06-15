import { useEffect, useMemo } from 'react';
import { LuMail, LuMapPin, LuPhoneCall, LuShare2 } from 'react-icons/lu';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import ContactMethodCard from '../../../../components/ContactMethodCard';
import PortfolioContactChannels from '../../../../components/PortfolioContactChannels';
import SocialLinks from '../../../../components/SocialLinks';
import { PORTFOLIO } from '../../../../config/portfolio';
import { useTranslation } from '../../../../i18n';
import { ContactClipboardBinder } from '../../../../services/contact/contactClipboardBinder';
import { ToastNotificationService } from '../../../../services/notifications/toastNotificationService';
import styles from './HeroSection.module.css';

const HeroSection = () => {
	const { t, interpolate } = useTranslation();
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

	const copyLabels = {
		copyTmPhone: t.contact.copyTmPhone,
		copyCnPhone: t.contact.copyCnPhone,
		copyEmail: t.contact.copyEmail,
		tmPhoneDataLabel: t.contact.tmPhoneDataLabel,
		cnPhoneDataLabel: t.contact.cnPhoneDataLabel,
		emailDataLabel: t.common.email,
	};

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
						title={interpolate(t.contact.mapTitle)}
						icon={LuMapPin}
						variant='primary'
						description={
							<>
								<div className={styles.addressCn}>{PORTFOLIO.address}</div>
								<div
									className={styles.mapWrap}
									aria-label={t.contact.mapPreview}
								>
									<iframe
										className={styles.map}
										title={interpolate(t.contact.mapTitle)}
										loading='lazy'
										referrerPolicy='no-referrer-when-downgrade'
										src={`https://www.google.com/maps?q=${encodeURIComponent(
											PORTFOLIO.address,
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
									PORTFOLIO.address,
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
									<PortfolioContactChannels
										variant='default'
										layout='detailed'
										channel='phones'
										tmPhoneLabel={t.contact.tmPhoneLabel}
										cnPhoneLabel={t.contact.cnPhoneLabel}
										showCopyButtons
										copyLabels={copyLabels}
										copyButtonClassName={styles.copyBtn}
									/>

									<p className={styles.meta}>
										{interpolate(t.contact.phonesBody)}
									</p>
								</div>
							}
							actions={[
								{
									type: 'button',
									label: t.contact.callTm,
									href: `tel:${PORTFOLIO.phones.turkmenistan}`,
								},
								{
									type: 'button',
									label: t.contact.callCn,
									href: `tel:${PORTFOLIO.phones.china}`,
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
									<p className={styles.lead}>
										{interpolate(t.contact.emailBody)}
									</p>

									<PortfolioContactChannels
										variant='default'
										layout='detailed'
										channel='email'
										emailLabel={`${t.common.email}:`}
										showCopyButtons
										copyLabels={copyLabels}
										copyButtonClassName={styles.copyBtn}
									/>
								</div>
							}
							actions={[
								{
									type: 'button',
									label: t.contact.writeEmail,
									href: `mailto:${PORTFOLIO.email}`,
								},
							]}
							isScalableOnHover={false}
							dataAos='fade-up-left'
						/>

						<ContactMethodCard
							title={t.common.socialTitle}
							icon={LuShare2}
							variant='primary'
							description={
								<SocialLinks
									variant='default'
									note={t.common.socialNote}
								/>
							}
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
