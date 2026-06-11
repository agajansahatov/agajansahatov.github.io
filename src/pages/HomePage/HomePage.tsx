import Footer from '../../sections/Footer';
import BannerSection from './sections/BannerSection';
import CalloutSection from './sections/CalloutSection';
import ExpertiseSection from './sections/ExpertiseSection';
import LastExperiencesSection from './sections/LastExperiencesSection';
import ServicesSection from './sections/ServicesSection';
import StatsSection from './sections/StatsSection';
import PrinciplesSection from './sections/PrinciplesSection';
import TestimonialsSection from './sections/TestimonialsSection/TestimonialsSection';
import TopProjectsSection from './sections/TopProjectsSection/TopProjectsSection';

const HomePage = () => {
	return (
		<>
			<BannerSection />
			<ServicesSection />
			<LastExperiencesSection />
			<ExpertiseSection />
			<TopProjectsSection />
			<StatsSection />
			<TestimonialsSection />
			<PrinciplesSection />
			<CalloutSection />
			<Footer hasTopBorder={false} />
		</>
	);
};

export default HomePage;
