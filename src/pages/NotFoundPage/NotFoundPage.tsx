import { useTranslation } from '../../i18n';
import Link from '../../components/Link';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
	const { t } = useTranslation();

	return (
		<main className={styles.page}>
			<div className={styles.container}>
				<h1 className={styles.title}>{t.errors.notFoundTitle}</h1>
				<p className={styles.message}>{t.errors.notFoundMessage}</p>

				<Link href='/' className={styles.link}>
					{t.errors.goHome}
				</Link>
			</div>
		</main>
	);
};

export default NotFoundPage;

