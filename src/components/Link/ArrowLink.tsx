import { FaArrowRightLong } from 'react-icons/fa6';
import styles from './ArrowLink.module.css';
import type { ReactNode } from 'react';
import Link from './Link';

interface Props {
	href: string;
	children: ReactNode;
	target?: '_self' | '_blank' | '_parent' | '_top';
}

const ArrowLink = ({ href, children, target = '_self' }: Props) => {
	return (
		<Link href={href} className={styles['arrow-link']} target={target}>
			{children}
			<FaArrowRightLong className={styles['icon']} />
		</Link>
	);
};

export default ArrowLink;
