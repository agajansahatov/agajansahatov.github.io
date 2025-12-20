import styles from './Navbar.module.css';
import logo from '../../assets/agajansahatov_xs.png';
import Collapsible from '../Collapsible';
import Icon from './../Icon';

const Navbar = () => {
	const navItems = [
		{
			label: 'Services',
			link: '#section-services',
			target: '_self',
		},
		{
			label: 'Expertise',
			link: '#section-expertise',
			target: '_self',
		},
		{
			label: 'Why me?',
			link: '#section-showcase',
			target: '_self',
		},
		{
			label: 'Testimonials',
			link: '#section-testimonials',
			target: '_self',
		},
		{
			label: 'Projects',
			link: 'https://github.com/agajansahatov',
			target: '_blank',
		},
	];

	return (
		<nav>
			<Collapsible className={styles['navbar']} isHidden={true}>
				<a aria-label='Güýmenje' className={styles['nav__header']} href='/'>
					<img className={styles['nav__logo']} src={logo} alt='' />
					<span className={styles['logo__text']}>Agajan Sahatov</span>
				</a>
				<span>
					<Icon
						name='toggler'
						color='white'
						className={styles['nav__toggler']}
					/>
				</span>
				<ul className={'list ' + styles['nav__list']}>
					{navItems.map((item, index) => (
						<li className={styles['nav__item']} key={'nav-item' + index}>
							<a href={item.link} target={item.target}>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</Collapsible>
		</nav>
	);
};

export default Navbar;
