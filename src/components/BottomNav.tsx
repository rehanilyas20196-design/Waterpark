import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Ghost as AttractionsIcon, Calendar, User, Ticket } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const BottomNav = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuthStore();

    const navItems = [
        { to: '/', label: 'Home', icon: HomeIcon },
        { to: '/attractions', label: 'Rides', icon: AttractionsIcon },
        { to: '/booking', label: 'Book', icon: Calendar },
        { to: '/my-tickets', label: 'Tickets', icon: Ticket },
        { to: isAuthenticated ? '/profile' : '/login', label: 'Me', icon: User },
    ];

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] px-2 py-1 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
            aria-label="Mobile Navigation"
        >
            <div className="flex justify-around items-center h-14">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative ${isActive ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {isActive && (
                                <span className="absolute -top-1 w-12 h-1 bg-primary rounded-full animate-fadeIn" />
                            )}
                            <Icon size={isActive ? 24 : 20} className={isActive ? 'animate-bounce-subtle' : ''} />
                            <span className={`text-[10px] sm:text-[11px] font-bold mt-1 ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
