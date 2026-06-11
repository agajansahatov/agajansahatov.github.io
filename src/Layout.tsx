import { Outlet } from 'react-router-dom';
import ScrollToTopButton from './components/Button/ScrollToTopButton';
import Navbar from './sections/Navbar';

const Layout = () => {
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

