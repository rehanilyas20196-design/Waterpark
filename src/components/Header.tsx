import { Link } from 'react-router-dom';
import { Menu, X, LogOut, Ticket } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/attractions', label: 'Attractions' },
    { to: '/park-details', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="relative text-white shadow-xl sticky top-0 z-50 overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 border-b-4 border-yellow-400">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Professional */}
          <Link
            to="/"
            className="flex items-center space-x-3 font-extrabold text-white hover:opacity-90 transition group"
            aria-label="WaterPark home"
          >
            <div className="w-12 h-12 bg-yellow-400 rounded-full text-blue-700 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition transform">
              💧
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold">AquaPark</div>
              <div className="text-xs text-yellow-300 font-semibold tracking-widest">SPLASH & PLAY</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex space-x-1 items-center"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 hover:text-yellow-300 rounded-md transition duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/my-tickets"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-white hover:text-yellow-300 transition"
            >
              <Ticket size={18} />
              My Tickets
            </Link>
            <Link
              to="/booking"
              className="bg-yellow-400 text-blue-800 px-6 py-2.5 rounded-lg font-bold hover:bg-yellow-300 transition transform hover:scale-105 hover:shadow-lg text-sm whitespace-nowrap"
            >
              Book Now
            </Link>

            {/* Authentication Links */}
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="hidden md:block text-sm font-semibold text-white hover:text-yellow-300 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hidden md:block bg-yellow-400 text-blue-800 px-4 py-2 rounded-md font-bold hover:bg-yellow-300 transition text-sm whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-white hover:bg-blue-700 rounded-md transition"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div> {/* end CTA buttons */}        </div> {/* end flex container */}

        {/* Mobile Navigation - Full Screen Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-blue-900 z-[200] transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-yellow-400">💧</span> AquaPark
              </span>
              <button
                onClick={toggleMenu}
                className="p-2 text-white bg-white/10 rounded-full hover:rotate-90 transition-transform duration-300"
              >
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-3xl font-extrabold text-white hover:text-yellow-400 transition-colors"
                  style={{ animationDelay: `${idx * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <Link
                  to="/my-tickets"
                  className="flex items-center justify-center gap-3 text-2xl font-bold text-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Ticket size={24} />
                  My Tickets
                </Link>

                <Link
                  to="/booking"
                  className="block w-full bg-yellow-400 text-blue-900 py-4 rounded-2xl text-2xl font-black shadow-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BOOK NOW
                </Link>

                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <Link
                      to="/login"
                      className="py-4 bg-white/10 text-white rounded-xl font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="py-4 bg-blue-600 text-white rounded-xl font-bold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full mt-8 py-4 bg-red-500/20 text-red-100 border-2 border-red-500/30 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut size={20} />
                    Logout Account
                  </button>
                )}
              </div>
            </nav>

            <div className="mt-auto text-center text-white/40 text-sm">
              <p>© 2026 AquaPark Adventure</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
