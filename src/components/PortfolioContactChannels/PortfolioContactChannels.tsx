import { LuCopy } from 'react-icons/lu';
import { PORTFOLIO } from '../../config/portfolio';
import IconButton from '../Button/IconButton';
import Link from '../Link';
import styles from './PortfolioContactChannels.module.css';

type CopyLabels = {
	readonly copyTmPhone: string;
	readonly copyCnPhone: string;
	readonly copyEmail: string;
	readonly tmPhoneDataLabel: string;
	readonly cnPhoneDataLabel: string;
	readonly emailDataLabel: string;
};

type Props = {
	readonly variant: 'inverted' | 'default';
	readonly layout: 'compact' | 'detailed';
	readonly channel: 'phones' | 'email' | 'all';
	readonly phoneLabel?: string;
	readonly emailLabel?: string;
	readonly tmPhoneLabel?: string;
	readonly cnPhoneLabel?: string;
	readonly showCopyButtons?: boolean;
	readonly copyLabels?: CopyLabels;
	readonly copyButtonClassName?: string;
};

const PortfolioContactChannels = ({
	variant,
	layout,
	channel,
	phoneLabel,
	emailLabel,
	tmPhoneLabel,
	cnPhoneLabel,
	showCopyButtons = false,
	copyLabels,
	copyButtonClassName = '',
}: Props) => {
	const valueClassName =
		variant === 'inverted'
			? `${styles.value} ${styles['value--inverted']}`
			: `${styles.value} link-underline`;

	if (layout === 'compact' && channel === 'phones') {
		return (
			<div className={styles.compactBody}>
				{phoneLabel ? (
					<span className={styles.compactLabel}>{phoneLabel}</span>
				) : null}

				<div className={styles.compactValues}>
					<Link
						className={`link-underline word-break ${valueClassName}`}
						href={`tel:${PORTFOLIO.phones.turkmenistan}`}
					>
						{PORTFOLIO.phones.turkmenistan},
					</Link>

					<Link
						className={`link-underline word-break ${valueClassName}`}
						href={`tel:${PORTFOLIO.phones.china}`}
					>
						{PORTFOLIO.phones.china}
					</Link>
				</div>
			</div>
		);
	}

	if (layout === 'compact' && channel === 'email') {
		return (
			<div className={styles.compactBody}>
				{emailLabel ? (
					<span className={styles.compactLabel}>{emailLabel}</span>
				) : null}

				<div className={styles.compactValues}>
					<Link
						className={`link-underline word-break ${valueClassName}`}
						href={`mailto:${PORTFOLIO.email}`}
					>
						{PORTFOLIO.email}
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.detailed}>
			{channel !== 'email' ? (
				<div className={styles.kvList}>
					<div className={styles.kvRow}>
						<span className={styles.kvKey}>{tmPhoneLabel}</span>

						<span className={styles.kvValueWrap}>
							<a
								className={`${styles.kvValue} link-underline`}
								href={`tel:${PORTFOLIO.phones.turkmenistan}`}
							>
								{PORTFOLIO.phones.turkmenistan}
							</a>

							{showCopyButtons && copyLabels ? (
								<IconButton
									aria-label={copyLabels.copyTmPhone}
									title={copyLabels.copyTmPhone}
									className={`copy-btn ${copyButtonClassName}`.trim()}
									data-clipboard-text={PORTFOLIO.phones.turkmenistan}
									data-label={copyLabels.tmPhoneDataLabel}
								>
									<LuCopy />
								</IconButton>
							) : null}
						</span>
					</div>

					<div className={styles.kvRow}>
						<span className={styles.kvKey}>{cnPhoneLabel}</span>

						<span className={styles.kvValueWrap}>
							<a
								className={`${styles.kvValue} link-underline`}
								href={`tel:${PORTFOLIO.phones.china}`}
							>
								{PORTFOLIO.phones.china}
							</a>

							{showCopyButtons && copyLabels ? (
								<IconButton
									aria-label={copyLabels.copyCnPhone}
									title={copyLabels.copyCnPhone}
									className={`copy-btn ${copyButtonClassName}`.trim()}
									data-clipboard-text={PORTFOLIO.phones.china}
									data-label={copyLabels.cnPhoneDataLabel}
								>
									<LuCopy />
								</IconButton>
							) : null}
						</span>
					</div>
				</div>
			) : null}

			{channel !== 'phones' ? (
				<div className={styles.kvList}>
					<div className={styles.kvRow}>
						<span className={styles.kvKey}>{emailLabel}</span>

						<span className={styles.kvValueWrap}>
							<a
								className={`${styles.kvValue} link-underline`}
								href={`mailto:${PORTFOLIO.email}`}
							>
								{PORTFOLIO.email}
							</a>

							{showCopyButtons && copyLabels ? (
								<IconButton
									aria-label={copyLabels.copyEmail}
									title={copyLabels.copyEmail}
									className={`copy-btn ${copyButtonClassName}`.trim()}
									data-clipboard-text={PORTFOLIO.email}
									data-label={copyLabels.emailDataLabel}
								>
									<LuCopy />
								</IconButton>
							) : null}
						</span>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default PortfolioContactChannels;
