import type { SkinVariant } from '../types';
import styles from './Badge.module.css';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
	skinVariant?: SkinVariant;
	size?: 'small' | 'medium' | 'large';
	children?: React.ReactNode;
}

const Badge = ({
	skinVariant = 'primary',
	children,
	size = 'medium',
	className,
	...rest
}: Props) => {
	const classNames = [styles.badge, styles[`badge--${skinVariant}`]];
	if (size) classNames.push(styles[`badge--${size}`]);
	if (className) classNames.push(className);
	return (
		<span className={classNames.join(' ')} {...rest}>
			{children}
		</span>
	);
};

export default Badge;
