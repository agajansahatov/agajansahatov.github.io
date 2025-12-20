import Collapsible from '../../components/Collapsible';
import Block from './../../components/Block/index';
import styles from './Footer.module.css';
import IconContainer from './../../components/Icon/IconContainer';
import Icon from '../../components/Icon';
import logo from './../../assets/agajansahatov_xs.png';

const footerLinks = [
	{
		header: 'SERVICES',
		links: [
			{ link: '#services1', label: 'Front-End Apps', target: '_self' },
			{ link: '#services2', label: 'Back-End Systems', target: '_self' },
			{ link: '#services3', label: 'Mobile Apps', target: '_self' },
			{
				link: '#services4',
				label: 'Cross-Platform Solutions',
				target: '_self',
			},
		],
		isHidden: false,
	},
	{
		header: 'LIVE PROJECTS',
		links: [
			{
				link: 'https://game-hub-three-kohl.vercel.app/',
				label: 'GameHub',
				target: '_blank',
			},

			{
				link: 'https://agajansahatov.github.io/sada/',
				label: 'SADA',
				target: '_blank',
			},
			{
				link: 'https://agajansahatov.github.io/sozluk/',
				label: 'Sözlük',
				target: '_blank',
			},
			{
				link: 'https://agajansahatov.github.io/aurora-tours/',
				label: 'Aurora Tours',
				target: '_blank',
			},
		],
		isHidden: true,
	},
	{
		header: 'ABOUT',
		links: [
			{ link: '/', label: 'Home', target: '_self' },
			{
				link: '#section-showcase',
				label: 'Why Work With Me?',
				target: '_self',
			},
			{
				link: 'https://github.com/agajansahatov/',
				label: 'My GitHub Profile',
				target: '_blank',
			},
			{
				link: 'mailto:agajansahatovofficial@gmail.com',
				label: 'agajansahatovofficial@gmail.com',
				target: '_self',
			},
		],
		isHidden: true,
	},
];

const Footer = () => {
	return (
		<Block color='dark' className={styles['footer']}>
			<div className={'grid ' + styles['footer__articles']}>
				{footerLinks.map((footerLink, index) => (
					<article key={index}>
						<Collapsible
							isHidden={footerLink.isHidden}
							className={styles['footer__article']}
						>
							<h2 className={styles['footer__heading']}>{footerLink.header}</h2>
							<div>
								<IconContainer className={styles['footer__toggler-container']}>
									<Icon
										color='white'
										name='angle-down'
										className={styles['footer__toggler']}
									/>
								</IconContainer>
							</div>
							<ul className='list'>
								{footerLink.links.map((link, i) => (
									<li key={i}>
										<a href={link.link} target={link.target}>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</Collapsible>
					</article>
				))}

				<article className={styles['footer__brand']}>
					<img
						src={logo}
						alt='Agajan Sahatov logo'
						className={styles['footer__logo']}
					/>

					<p className={styles['footer__copyright']}>
						© {new Date().getFullYear()} Agajan Sahatov.
					</p>

					<p className={styles['footer__copyright']}>All rights reserved.</p>
					<p className={styles['footer__copyright']}>Built with ❤️ and code.</p>
				</article>
			</div>
		</Block>
	);
};

export default Footer;
