import Footer from '../../sections/Footer';
import PortfolioInfoSection from './sections/PortfolioInfoSection';
import ExpertiseSection from './sections/ExpertiseSection';
import IntroSection from './sections/IntroSection';
import PrinciplesSection from './sections/PrinciplesSection';

const AboutPage = () => {
	return (
		<>
			<IntroSection />
			<ExpertiseSection />
			<PrinciplesSection />
			<PortfolioInfoSection />
			<Footer hasTopBorder={false} />
		</>
	);
};

export default AboutPage;
