export interface NotificationServicePort {
	success(message: string): void;
	error(message: string): void;
}
