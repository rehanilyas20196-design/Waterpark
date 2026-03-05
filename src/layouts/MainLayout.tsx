import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
