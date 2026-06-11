import footerLogo from '../../assets/agajansahatov_xs.png';
import Collapsible from '../../components/Collapsible';
import Link from '../../components/Link';
import Block from '../../components/Block';
import { useTranslation } from '../../i18n';
import { FooterLinksBuilder } from '../../services/footerLinksBuilder';
import styles from './Footer.module.css';

interface Props {
	hasTopBorder?: boolean;
}

const Footer = ({ hasTopBorder = true }: Props) => {
	const { t } = useTranslation();
	const currentYear = new Date().getFullYear();
	const footerGroups = FooterLinksBuilder.build(t);

	return (
		<footer>
			<Block
				className={`${styles.footer} ${
					hasTopBorder ? styles['footer--top-border'] : ''
				}`}
				containerClassName='grid grid--cols-1 md:grid--cols-3 lg:grid--cols-4 gap-4'
			>
				<div className={styles['footer__links']}>
					{footerGroups.map((footerGroup) => (
						<article
							key={footerGroup.header}
							className={styles['footer__item']}
						>
							<Collapsible
								header={footerGroup.header}
								headerClassName={`${styles['footer__item__heading']} ${styles['footer__collapsible-header']}`.trim()}
								headingClassName={styles['footer__collapsible-heading']}
								chevronIconClassName={
									styles['footer__collapsible-chevron-icon']
								}
								isHiddenInitially={footerGroup.isHidden}
								alwaysExpandedOn={768}
								chevronSkinVariant='light'
							>
								<ul>
									{footerGroup.links.map((link) => (
										<li
											key={`${footerGroup.header}-${link.label}`}
											className={`${styles['footer__list-item']} link-underline`}
										>
											<Link href={link.link} target={link.target}>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</Collapsible>
						</article>
					))}
				</div>

				<article
					className={`${styles['footer__item']} ${styles['footer__brand']}`}
				>
					<img
						src={footerLogo}
						alt={t.components.footerLogoAlt}
						className={styles['footer__logo']}
					/>
					<p className={styles['footer__copyright']}>
						&copy; {currentYear} {t.common.brandName}.
					</p>
					<p className={styles['footer__copyright']}>
						{t.common.allRightsReserved}
					</p>
					<p className={styles['footer__copyright']}>
						{t.common.builtWithNote}
					</p>
				</article>
			</Block>
		</footer>
	);
};

export default Footer;
