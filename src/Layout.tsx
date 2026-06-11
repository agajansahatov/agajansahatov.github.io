import { Outlet } from 'react-router-dom';
import ScrollToTopButton from './components/Button/ScrollToTopButton';
import { useSeo } from './components/Seo/useSeo';
import Navbar from './sections/Navbar';

const Layout = () => {
	useSeo();

	return (
		<>
			<Navbar />
			<main>
				<Outlet />
			</main>
			<ScrollToTopButton />
		</>
	);
};

export default Layout;
