import styles from './Callout.module.css';
import Collapsible from './../Collapsible/index';
import Icon from './../Icon/index';
import Button from './../Button/Button';
import ClipboardJS from 'clipboard';

const Callout = () => {
	const showContactInfo = async (label: string, strCopy: string) => {
		let status = 'Failed to copy.\nYou can copy it manually!';
		if (ClipboardJS.isSupported()) {
			await new Promise<void>((resolve, reject) => {
				const clipboard = new ClipboardJS('.copy-btn', {
					text: () => strCopy,
				});
				clipboard.on('success', () => {
					status = 'Successfully copied to clipboard!';
					clipboard.destroy();
					resolve();
				});
				clipboard.on('error', () => {
					clipboard.destroy();
					reject();
				});
			});
		}

		window.alert(`${label}: ${strCopy}.\n${status}`);
	};

	return (
		<div className={[styles['callout'], styles['callout--primary']].join(' ')}>
			<Collapsible isHidden={true} className='grid grid--1x2'>
				<div className={styles['callout__content']}>
					<h2 className={styles['callout__heading']}>
						Have a Project in Mind?
					</h2>
					<p>
						If you’re looking for a reliable software engineer to bring your
						idea to life, feel free to reach out. I’m always open to discussing
						new projects and collaborations.
					</p>
				</div>
				<Button
					color='secondary'
					style='stretched'
					className={styles['callout__toggler']}
					type='button'
				>
					Contact Me
				</Button>
				<div className={styles['contact-info']}>
					<header className={styles['contact-info__header']}>
						<Icon name='line' color='primary' />
						<p className={styles['contact-info__heading']}>
							Let's build something great together!
						</p>
						<Icon name='line' color='primary' />
					</header>
					<a
						className={styles['contact-type']}
						href='mailto:agajansahatovofficial@gmail.com'
						rel='noopener noreferrer'
						aria-label='Send email to Agajan Sahatov'
					>
						<Icon name='email' color='white' className={styles['icon']} />
					</a>
					<button
						className={styles['contact-type'] + ' copy-btn'}
						onClick={() => showContactInfo('Phone', '+86 132 5940 0802')}
					>
						<Icon name='call' color='white' className={styles['icon']} />
					</button>
					<a
						className={styles['contact-type']}
						href='https://www.instagram.com/agajansahatov'
						target='_blank'
					>
						<Icon name='instagram' color='white' className={styles['icon']} />
					</a>
					<a
						className={styles['contact-type']}
						href='https://www.facebook.com/agajansahatov'
						target='_blank'
					>
						<Icon name='facebook' color='white' className={styles['icon']} />
					</a>
					<a
						className={styles['contact-type']}
						href='https://x.com/AgajanSahatov'
						target='_blank'
					>
						<Icon name='twitter' color='white' className={styles['icon']} />
					</a>
					<a
						className={styles['contact-type']}
						href='https://www.linkedin.com/in/agajansahatov'
						target='_blank'
					>
						<Icon name='linkedin' color='white' className={styles['icon']} />
					</a>
					<button
						className={styles['contact-type'] + ' copy-btn'}
						onClick={() => showContactInfo('Whatsapp', '+993 65 083466')}
					>
						<Icon name='whatsapp' color='white' className={styles['icon']} />
					</button>
					<button
						className={styles['contact-type'] + ' copy-btn'}
						onClick={() =>
							showContactInfo('Wechat number', '+86 132 5940 0802')
						}
					>
						<Icon name='wechat' color='white' className={styles['icon']} />
					</button>
				</div>
			</Collapsible>
		</div>
	);
};

export default Callout;
