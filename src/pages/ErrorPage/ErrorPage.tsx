import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import Navbar from '../../sections/Navbar';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
	const error = useRouteError();
	const { t } = useTranslation();

	let title: string = t.errors.genericTitle;
	let message: string = t.errors.genericMessage;

	if (isRouteErrorResponse(error)) {
		title = String(error.status);
		message = error.statusText || t.errors.routeErrorFallback;
	}

	return (
		<>
			<Navbar />

			<main className={styles.page}>
				<div className={styles.container}>
					<h1 className={styles.title}>{title}</h1>
					<p className={styles.message}>{message}</p>
				</div>
			</main>
		</>
	);
};

export default ErrorPage;
