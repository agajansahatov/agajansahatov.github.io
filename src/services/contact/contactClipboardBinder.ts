import ClipboardJS from 'clipboard';
import type { NotificationServicePort } from '../notifications/notificationServicePort';

export class ContactClipboardBinder {
	private clipboard: ClipboardJS | null = null;
	private readonly notifications: NotificationServicePort;

	constructor(notifications: NotificationServicePort) {
		this.notifications = notifications;
	}

	bind(
		selector: string,
		successMessage: string,
		failureMessage: string,
	): () => void {
		this.clipboard = new ClipboardJS(selector);

		this.clipboard.on('success', (event) => {
			const label = event.trigger.getAttribute('data-label') ?? '';
			const value = event.text;
			this.notifications.success(`${label}: ${value}\n\n${successMessage}`);
			event.clearSelection();
		});

		this.clipboard.on('error', (event) => {
			const label = event.trigger.getAttribute('data-label') ?? '';
			const value = event.text;
			this.notifications.error(`${label}: ${value}\n\n${failureMessage}`);
		});

		return () => this.destroy();
	}

	private destroy(): void {
		this.clipboard?.destroy();
		this.clipboard = null;
	}
}
