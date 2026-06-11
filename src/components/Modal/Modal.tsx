import { useEffect, useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { LuX } from 'react-icons/lu';
import IconButton from '../Button/IconButton';
import styles from './Modal.module.css';

export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	closeButtonAriaLabel: string;
	children: ReactNode;
}

const Modal = ({
	open,
	onClose,
	title,
	closeButtonAriaLabel,
	children,
}: ModalProps) => {
	const titleId = useId();

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open, onClose]);

	useEffect(() => {
		if (!open) return;
		const html = document.documentElement;
		const previousHtmlOverflow = html.style.overflow;
		const previousHtmlPaddingRight = html.style.paddingRight;
		const scrollbarWidth = window.innerWidth - html.clientWidth;
		/* Scroll lock on <html> avoids body overflow:hidden, which creates a scrollport and breaks position:sticky. */
		html.style.overflow = 'hidden';
		if (scrollbarWidth > 0) {
			html.style.paddingRight = `${scrollbarWidth}px`;
		}
		return () => {
			html.style.overflow = previousHtmlOverflow;
			html.style.paddingRight = previousHtmlPaddingRight;
		};
	}, [open]);

	if (!open || typeof document === 'undefined') return null;

	return createPortal(
		<div
			className={styles.overlay}
			role='presentation'
			onClick={onClose}
		>
			<div
				className={styles.panel}
				role='dialog'
				aria-modal='true'
				aria-labelledby={titleId}
				onClick={(event) => event.stopPropagation()}
			>
				<div className={styles.header}>
					<h2 className={styles.title} id={titleId}>
						{title}
					</h2>
					<IconButton
						type='button'
						aria-label={closeButtonAriaLabel}
						onClick={onClose}
						className={styles.close}
					>
						<LuX size={22} strokeWidth={2} aria-hidden />
					</IconButton>
				</div>
				<div className={styles.body}>{children}</div>
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
