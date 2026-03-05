import { Link } from 'react-router-dom';
import { Droplets, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center text-blue-400 font-bold text-3xl tracking-tighter">
            <Droplets className="mr-2" />
            <span className="text-blue-400">water</span>
            <span className="text-red-500">park</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Experience the ultimate water adventure with thrilling slides, relaxing rivers, and unforgettable memories for the whole family.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b border-blue-500 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/attractions" className="hover:text-blue-400 transition">Attractions</Link></li>
            <li><Link to="/booking" className="hover:text-blue-400 transition">Book Tickets</Link></li>
            <li><Link to="/park-details" className="hover:text-blue-400 transition">Park Details</Link></li>
            <li><Link to="/my-tickets" className="hover:text-blue-400 transition">My Tickets</Link></li>
          </ul>
        </div>

        {/* Helpful Info */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b border-blue-500 pb-2 inline-block">Helpful Info</h3>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            <li><a href="#" className="hover:text-blue-400 transition">Safety Guidelines</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-b border-blue-500 pb-2 inline-block">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start">
              <MapPin className="text-blue-500 mr-3 shrink-0" size={20} />
              <span>123 Water Lane, Fun City, WaterState 90210</span>
            </li>
            <li className="flex items-center">
              <Phone className="text-blue-500 mr-3 shrink-0" size={20} />
              <span>+1 (800) WATER-FUN</span>
            </li>
            <li className="flex items-center">
              <Mail className="text-blue-500 mr-3 shrink-0" size={20} />
              <span>hello@waterpark.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} WaterPark Ltd. All rights reserved. Designed for excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;
