import { Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/park-details', label: 'Park Details' },
    { to: '/attractions', label: 'Attractions' },
    { to: '/booking', label: 'Book Now' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition"
            aria-label="WaterPark home"
          >
            <span className="text-3xl">🌊</span>
            <span>WaterPark</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex space-x-8 items-center"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Section */}
            <div className="flex items-center space-x-4 border-l border-blue-400 pl-4">
              {isAuthenticated && user ? (
                <>
                  <span className="text-sm">{user.firstName}</span>
                  <button
                    onClick={() => logout()}
                    className="bg-secondary text-park-dark px-4 py-2 rounded-md hover:bg-yellow-400 transition font-semibold flex items-center space-x-2 text-sm"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-secondary text-park-dark px-4 py-2 rounded-md hover:bg-yellow-400 transition font-semibold text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-blue-700 transition"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="md:hidden pb-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-blue-400 mt-2 pt-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-3 py-2 text-sm">
                    Welcome, {user.firstName}!
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full mt-2 bg-secondary text-park-dark px-4 py-2 rounded-md hover:bg-yellow-400 transition font-semibold flex items-center justify-center space-x-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full mt-2 bg-secondary text-park-dark px-4 py-2 rounded-md hover:bg-yellow-400 transition font-semibold text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
