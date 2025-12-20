import BlockHeader from '../../components/Block/BlockHeader';
import Block from '../../components/Block';
import Button from './../../components/Button/Button';
import styles from './Banner.module.css';

const Banner = () => {
	return (
		<Block color='dark' direction='left' className={styles['banner']}>
			<article className='grid grid--1x2'>
				<BlockHeader>
					<div className={styles['banner__content']}>
						<h1 style={{ marginTop: '0' }}>
							Hey there! I&apos;m Agajan Sahatov
						</h1>
						<p className={styles['banner__tagline']}>
							I turn ideas, wireframes, and technical specifications into fast,
							scalable, beautiful and production-ready applications.
						</p>
						<Button
							type='link'
							href='#section-services'
							color='accent'
							style='stretched'
						>
							Get to know me
						</Button>
					</div>
				</BlockHeader>
				<img
					className={styles.banner__image}
					sizes='(max-width: 1000px) 100vw, 1000px'
					srcSet='/images/agajansahatov_sm.png 400w, /images/agajansahatov_md.png 800w, /images/agajansahatov.png 1000w'
					src='/images/agajansahatov.png'
					alt='Photo of Agajan Sahatov who is a professional software engineer'
				/>
			</article>
		</Block>
	);
};

export default Banner;
