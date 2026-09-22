import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTopButton } from '../common/ScrollToTopButton';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors duration-200">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};
