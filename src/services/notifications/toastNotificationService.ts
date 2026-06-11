import toast from 'react-hot-toast';
import type { NotificationServicePort } from './notificationServicePort';

export class ToastNotificationService implements NotificationServicePort {
	static readonly instance = new ToastNotificationService();

	success(message: string): void {
		toast.success(message);
	}

	error(message: string): void {
		toast.error(message);
	}
}
