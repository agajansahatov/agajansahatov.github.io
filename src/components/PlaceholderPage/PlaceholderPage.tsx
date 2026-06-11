import Block from '../Block';
import BlockHeader from '../Block/BlockHeader';
import Footer from '../../sections/Footer';
import styles from './PlaceholderPage.module.css';

type PlaceholderPageProps = {
	readonly title: string;
	readonly tagline: string;
};

const PlaceholderPage = ({ title, tagline }: PlaceholderPageProps) => {
	return (
		<>
			<Block className={styles.page}>
				<BlockHeader className={styles.header}>
					<h1 className={styles.heading}>{title}</h1>
					<p className={styles.tagline}>{tagline}</p>
				</BlockHeader>
			</Block>
			<Footer />
		</>
	);
};

export default PlaceholderPage;
