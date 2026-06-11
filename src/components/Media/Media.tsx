import type { ReactNode } from 'react';
import styles from './Media.module.css';

interface Props {
	image: ReactNode;
	title: ReactNode;
	titleStyles?: string;
	className?: string;
	children: ReactNode;
}

const Media = ({ children, image, title, titleStyles, className }: Props) => {
	const titleClassNames = [styles['media__title']];
	if (titleStyles) titleClassNames.push(titleStyles);

	const mediaClassNames = [styles['media']];
	if (className) mediaClassNames.push(className);

	return (
		<div className={mediaClassNames.join(' ')}>
			<div className={styles['media__image']}>{image}</div>
			<div className={styles['media__body']}>
				<h3 className={titleClassNames.join(' ')}>{title}</h3>
				{children}
			</div>
		</div>
	);
};

export default Media;
