import type { ReactNode } from 'react';
import styles from './Block.module.css';

interface Props {
	id?: string;
	variant?: 'default' | 'inverted';
	direction?: 'left' | 'right';
	className?: string;
	style?: React.CSSProperties;
	children: ReactNode;
	containerClassName?: string;
}

// When Block component is used, it's better to pass BlockHeader as its child.
const Block = ({
	variant = 'default',
	direction,
	children,
	className,
	style,
	containerClassName,
	id,
}: Props) => {
	const idAttr = id ? { id: id } : {};

	const classNames = [styles['block']];

	if (variant === 'inverted') {
		classNames.push(styles['block--inverted']);
		if (direction) {
			classNames.push(styles[`block--skewed-${direction}`]);
		}
	}

	if (className) classNames.push(className);
	return (
		<section className={classNames.join(' ')} {...idAttr} style={style}>
			<div className={`container ${containerClassName ?? ''}`}>{children}</div>
		</section>
	);
};

export default Block;
