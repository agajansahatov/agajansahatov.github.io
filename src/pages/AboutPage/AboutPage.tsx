import Footer from '../../sections/Footer';
import CompanyInfoSection from './sections/CompanyInfoSection';
import ExpertiseSection from './sections/ExpertiseSection';
import IntroSection from './sections/IntroSection';
import PrinciplesSection from './sections/PrinciplesSection';

const AboutPage = () => {
	return (
		<>
			<IntroSection />
			<ExpertiseSection />
			<PrinciplesSection />
			<CompanyInfoSection />
			<Footer hasTopBorder={false} />
		</>
	);
};

export default AboutPage;
