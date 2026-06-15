import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import Media from '../Media';
import styles from './Quote.module.css';

interface Props {
	author: string;
	children: string;
	organization: string;
	readMoreLabel: string;
	readLessLabel: string;
}

const Quote = ({
	author,
	children,
	organization,
	readMoreLabel,
	readLessLabel,
}: Props) => {
	const mediaImage = <span className={styles['quote__line']} aria-hidden />;
	const textRef = useRef<HTMLParagraphElement>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isTruncated, setIsTruncated] = useState(false);

	const measureTruncation = useCallback(() => {
		const textElement = textRef.current;
		if (!textElement || isExpanded) return;

		setIsTruncated(textElement.scrollHeight > textElement.clientHeight + 1);
	}, [isExpanded]);

	useLayoutEffect(() => {
		measureTruncation();

		const textElement = textRef.current;
		if (!textElement) return;

		const resizeObserver = new ResizeObserver(measureTruncation);
		resizeObserver.observe(textElement);

		return () => {
			resizeObserver.disconnect();
		};
	}, [children, measureTruncation]);

	useLayoutEffect(() => {
		if (!isExpanded) {
			measureTruncation();
		}
	}, [isExpanded, measureTruncation]);

	const showExpandButton = isTruncated || isExpanded;
	const toggleLabel = isExpanded ? readLessLabel : readMoreLabel;

	return (
		<blockquote className={styles.quote}>
			<div className={styles['quote__text-block']}>
				<p
					ref={textRef}
					className={[
						styles['quote__text'],
						!isExpanded ? styles['quote__text--clamped'] : '',
					]
						.filter(Boolean)
						.join(' ')}
				>
					{children}
				</p>
				{showExpandButton ? (
					<button
						type='button'
						className={[
							styles['quote__expand-button'],
							isExpanded ? styles['quote__expand-button--expanded'] : '',
						]
							.filter(Boolean)
							.join(' ')}
						onClick={() => {
							setIsExpanded((expanded) => !expanded);
						}}
						aria-expanded={isExpanded}
						aria-label={toggleLabel}
					>
						<span className={styles['quote__expand-icon']} aria-hidden>
							<FaChevronDown />
						</span>
					</button>
				) : null}
			</div>
			<div>
				<Media
					className={styles['quote__media']}
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
