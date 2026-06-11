import { FaArrowRightLong } from 'react-icons/fa6';
import styles from './ArrowLink.module.css';
import type { ReactNode } from 'react';

interface Props {
	href: string;
	children: ReactNode;
	target?: '_self' | '_blank' | '_parent' | '_top';
}
const ArrowLink = ({ href, children, target = '_self' }: Props) => {
	return (
		<a
			href={href}
			className={styles['arrow-link']}
			target={target}
			rel={target === '_blank' ? 'noopener noreferrer' : undefined}
		>
			{children}
			<FaArrowRightLong className={styles['icon']} />
		</a>
	);
};

export default ArrowLink;
