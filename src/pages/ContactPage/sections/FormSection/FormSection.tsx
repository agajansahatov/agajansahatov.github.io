import { useMemo, useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { LuChevronDown } from 'react-icons/lu';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Icon from '../../../../components/Icon';
import { useTranslation } from '../../../../i18n';
import {
	CONTACT_TOPIC_KEYS,
	ContactFormController,
	initialContactFormState,
	type ContactFormState,
	type ContactTopic,
} from '../../../../services/contact/contactFormController';
import styles from './FormSection.module.css';

const FormSection = () => {
	const { t } = useTranslation();
	const [form, setForm] = useState<ContactFormState>(initialContactFormState);
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	const errors = useMemo(
		() => ContactFormController.validate(form, t.contact.errors),
		[form, t.contact.errors],
	);

	const isValid = Object.keys(errors).length === 0;

	const setField = <K extends keyof ContactFormState>(
		key: K,
		value: ContactFormState[K],
	) => {
		setForm((previous) => ({ ...previous, [key]: value }));
	};

	const markTouched = (key: keyof ContactFormState) => {
		setTouched((previous) => ({ ...previous, [key]: true }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setTouched({
			name: true,
			email: true,
			phoneOrWechat: true,
			message: true,
			topic: true,
		});

		if (!isValid) return;
		window.location.href = ContactFormController.buildMailto(form, {
			mailSubject: t.contact.mailSubject,
			topics: t.contact.topics,
			mailFields: t.contact.mailFields,
		});
	};

	return (
		<Block variant='inverted' className={styles.block} direction='right'>
			<div className={styles.section}>
				<BlockHeader className={styles.header}>
					<h2 className={styles.heading}>{t.contact.formTitle}</h2>
					<p className={styles.subheading}>{t.contact.formSubtitle}</p>
				</BlockHeader>

				<Card
					className={styles.formCard}
					variant='accent'
					isScalableOnHover={false}
					isInverted
					header={
						<div className={styles.cardHeader}>
							<Icon icon={FiFileText} variant='dark' isSmall />
							<h3 className={styles.cardTitle}>{t.contact.formCardTitle}</h3>
						</div>
					}
					dataAos='fade-up'
				>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div
							className={[
								'grid',
								'grid--cols-1',
								'md:grid--cols-2',
								styles.grid,
							].join(' ')}
						>
							<div className={styles.field}>
								<label className={styles.label} htmlFor='name'>
									{t.contact.nameLabel}
								</label>
								<input
									id='name'
									className={styles.input}
									value={form.name}
									onChange={(event) => setField('name', event.target.value)}
									onBlur={() => markTouched('name')}
									placeholder={t.contact.namePlaceholder}
									autoComplete='name'
								/>
								{touched.name && errors.name ? (
									<p className={styles.error}>{errors.name}</p>
								) : null}
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor='topic'>
									{t.contact.topicLabel}
								</label>
								<div className={styles.selectWrap}>
									<select
										id='topic'
										className={`${styles.input} ${styles.select}`}
										value={form.topic}
										onChange={(event) =>
											setField('topic', event.target.value as ContactTopic)
										}
									>
										{CONTACT_TOPIC_KEYS.map((topic) => (
											<option key={topic} value={topic}>
												{t.contact.topics[topic]}
											</option>
										))}
									</select>

									<span className={styles.selectIcon} aria-hidden='true'>
										<LuChevronDown />
									</span>
								</div>
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor='email'>
									{t.contact.emailLabel}
								</label>
								<input
									id='email'
									className={styles.input}
									value={form.email}
									onChange={(event) => setField('email', event.target.value)}
									onBlur={() => markTouched('email')}
									placeholder={t.contact.emailPlaceholder}
									autoComplete='email'
								/>
								{touched.email && errors.email ? (
									<p className={styles.error}>{errors.email}</p>
								) : null}
							</div>

							<div className={styles.field}>
								<label className={styles.label} htmlFor='phone'>
									{t.contact.phoneOrWechatLabel}
								</label>
								<input
									id='phone'
									className={styles.input}
									value={form.phoneOrWechat}
									onChange={(event) =>
										setField('phoneOrWechat', event.target.value)
									}
									onBlur={() => markTouched('phoneOrWechat')}
									placeholder={t.contact.phoneOrWechatPlaceholder}
									autoComplete='tel'
								/>
							</div>

							<div className={styles.fieldFull}>
								<label className={styles.label} htmlFor='message'>
									{t.contact.messageLabel}
								</label>
								<textarea
									id='message'
									className={`${styles.input} ${styles.textarea}`}
									value={form.message}
									onChange={(event) => setField('message', event.target.value)}
									onBlur={() => markTouched('message')}
									placeholder={t.contact.messagePlaceholder}
									rows={7}
								/>
								{touched.message && errors.message ? (
									<p className={styles.error}>{errors.message}</p>
								) : null}
							</div>
						</div>

						<div className={styles.footer}>
							<Button
								type='submit'
								variant='accent'
								layout='stretched'
								disabled={!isValid}
							>
								{t.contact.submit}
							</Button>

							<p className={styles.hint}>{t.contact.hint}</p>
						</div>
					</form>
				</Card>
			</div>
		</Block>
	);
};

export default FormSection;
