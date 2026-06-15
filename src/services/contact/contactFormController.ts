import { getPortfolioLegalName, PORTFOLIO } from '../../config/portfolio';

export type ContactTopic =
	| 'technicalSupport'
	| 'apiIntegration'
	| 'pricingSubscription'
	| 'other';

export type ContactFormState = {
	name: string;
	phoneOrWechat: string;
	email: string;
	topic: ContactTopic;
	message: string;
};

export type ContactFormErrors = {
	readonly name: string;
	readonly message: string;
	readonly contact: string;
	readonly email: string;
};

export type ContactMailtoContent = {
	readonly mailSubject: string;
	readonly topics: Record<ContactTopic, string>;
	readonly mailFields: {
		readonly name: string;
		readonly topic: string;
		readonly email: string;
		readonly phoneOrWechat: string;
		readonly message: string;
	};
};

export const CONTACT_TOPIC_KEYS: readonly ContactTopic[] = [
	'technicalSupport',
	'apiIntegration',
	'pricingSubscription',
	'other',
] as const;

export const initialContactFormState: ContactFormState = {
	name: '',
	phoneOrWechat: '',
	email: '',
	topic: 'technicalSupport',
	message: '',
};

export class ContactFormController {
	static validate(
		form: ContactFormState,
		errors: ContactFormErrors,
	): Partial<Record<keyof ContactFormState, string>> {
		const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};

		if (!form.name.trim()) nextErrors.name = errors.name;
		if (!form.message.trim() || form.message.trim().length < 10) {
			nextErrors.message = errors.message;
		}
		if (!form.email.trim() && !form.phoneOrWechat.trim()) {
			nextErrors.email = errors.contact;
		}

		if (form.email.trim()) {
			const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
				form.email.trim(),
			);
			if (!isValidEmail) nextErrors.email = errors.email;
		}

		return nextErrors;
	}

	static buildMailto(
		form: ContactFormState,
		contact: ContactMailtoContent,
	): string {
		const subject = `${getPortfolioLegalName()} - ${contact.mailSubject} - ${
			contact.topics[form.topic]
		}`;
		const lines = [
			`${contact.mailFields.name}: ${form.name}`,
			`${contact.mailFields.topic}: ${contact.topics[form.topic]}`,
			`${contact.mailFields.email}: ${form.email || '-'}`,
			`${contact.mailFields.phoneOrWechat}: ${form.phoneOrWechat || '-'}`,
			'',
			`${contact.mailFields.message}:`,
			form.message,
		];

		return `mailto:${PORTFOLIO.email}?subject=${encodeURIComponent(
			subject,
		)}&body=${encodeURIComponent(lines.join('\n'))}`;
	}
}
