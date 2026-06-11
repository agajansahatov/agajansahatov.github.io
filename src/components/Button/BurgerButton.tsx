import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './BurgerButton.module.css';

type Props = {
	className?: string;
	isActive: boolean;
	onClick?: () => void;
} & Pick<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	'aria-label' | 'aria-expanded' | 'aria-controls'
>;

const BurgerButton = forwardRef<HTMLButtonElement, Props>(
	(
		{
			className,
			isActive,
			onClick,
			'aria-label': ariaLabel,
			'aria-expanded': ariaExpanded,
			'aria-controls': ariaControls,
		},
		ref,
	) => {
		return (
			<span className={className}>
				<button
					ref={ref}
					type='button'
					className={clsx(styles.button, isActive && styles.active)}
					aria-label={ariaLabel}
					aria-expanded={ariaExpanded}
					aria-controls={ariaControls}
					onClick={() => {
						onClick?.();
					}}
				>
					<span className={styles.line} />
					<span className={styles.line} />
					<span className={styles.line} />
				</button>
			</span>
		);
	},
);

BurgerButton.displayName = 'BurgerButton';

export default BurgerButton;
