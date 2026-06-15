import Media from '../Media';
import styles from './Quote.module.css';

interface Props {
	author: string;
	children: string;
	organization: string;
}

const Quote = ({ author, children, organization }: Props) => {
	const mediaImage = <span className={styles['quote__line']} aria-hidden />;

	return (
		<blockquote className={styles.quote}>
			<p className={styles['quote__text']}>{children}</p>
			<div>
				<Media
					image={mediaImage}
					title={author}
					titleStyles={styles['quote__author']}
				>
					<p className={styles['quote__organization']}>{organization}</p>
				</Media>
			</div>
		</blockquote>
	);
};

export default Quote;
