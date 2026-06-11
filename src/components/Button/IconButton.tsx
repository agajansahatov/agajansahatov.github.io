import { forwardRef } from 'react';
import styles from './IconButton.module.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	'aria-label': string;
};

const IconButton = forwardRef<HTMLButtonElement, Props>(
	({ children, className, type = 'button', ...rest }, ref) => {
		return (
			<button
				ref={ref}
				type={type}
				className={`${styles.iconButton} ${className ?? ''}`.trim()}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

IconButton.displayName = 'IconButton';

export default IconButton;
