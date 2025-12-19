import Navbar from '../components/Navbar';
import Banner from '../sections/Banner';
import Contact from '../sections/Contact/Contact';
import Expertise from '../sections/Expertise';
import Features from '../sections/Features';
import Footer from '../sections/Footer';
import Testimonials from '../sections/Testimonials';
import ScrollToTopBtn from './../components/ScrollToTopBtn/index';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { getFeatures } from '../services/features';
import { getShowCases } from '../services/showCases';
import { getExpertises } from '../services/expertises';
import { getCustomers } from '../services/customers';

const Home = () => {
	useEffect(() => {
		AOS.init({ duration: 850 });
	}, []);

	return (
		<>
			<header>
				<Navbar />
				<Banner />
			</header>
			<main>
				<Features
					label='Services'
					heading='What I Offer'
					headingBody='I help individuals, startups, and businesses transform ideas into real digital products. From concept to deployment, I design and build reliable, scalable, and modern applications using proven technologies and best practices.'
					features={getFeatures()}
					useAOS={true}
					id='section-services'
				/>
				<Expertise
					heading='Technologies I Work With'
					expertises={getExpertises()}
					id='section-expertise'
				/>
				<Features
					label='Showcase'
					heading='Why People Choose Me?'
					headingBody='My clients love how I always strive to fulfill their core needs. Here is what differentiates me from the rest.'
					features={getShowCases()}
					useAOS={true}
					id='section-showcase'
				/>
				<Testimonials
					heading='What my Customers are Saying'
					headingBody='I am delighted to have such happy and satisfied customers.'
					customers={getCustomers()}
					useAOS={true}
					id='section-testimonials'
				/>
				<Contact />
			</main>
			<footer>
				<ScrollToTopBtn />
				<Footer />
			</footer>
		</>
	);
};

export default Home;
