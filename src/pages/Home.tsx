import { useEffect } from 'react';
import Carousel from '../components/Carousel';
import AttractionCard from '../components/AttractionCard';
import { ATTRACTIONS } from '../data/attractions';
import { Star, Shield, Users, Zap, Clock, MapPin } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-0">
      {/* Hero Section with Overlay */}
      <section
        className="relative px-6 py-24 md:px-8 md:py-48 bg-cover bg-center overflow-hidden bg-fixed-mobile"
        style={{
          backgroundImage: 'url(/images/waterhouse.avif)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="mb-6">
            <span className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              🎉 Summer Season Now Open
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Make a Splash This Season
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
            Experience thrilling water rides, relaxing pools, and unforgettable memories with your family and friends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/booking"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 hover:shadow-2xl text-lg"
            >
              Book Your Day Now
            </a>
            <a
              href="/attractions"
              className="inline-block border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-lg transition text-lg"
            >
              View Attractions
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center">
                <Shield size={24} />
              </div>
              <div>
                <p className="font-bold text-blue-900">100% Safe</p>
                <p className="text-sm text-gray-600">Daily inspections</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center">
                <Users size={24} />
              </div>
              <div>
                <p className="font-bold text-blue-900">50,000+ Visitors</p>
                <p className="text-sm text-gray-600">Annual guests</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center">
                <Star size={24} />
              </div>
              <div>
                <p className="font-bold text-blue-900">4.9/5 Rating</p>
                <p className="text-sm text-gray-600">Top reviewed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center">
                <Zap size={24} />
              </div>
              <div>
                <p className="font-bold text-blue-900">15+ Attractions</p>
                <p className="text-sm text-gray-600">Year-round fun</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Attractions Section */}
      <section className="px-4 md:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold uppercase mb-4">
              Explore
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6">
              Featured Attractions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From thrilling slides to relaxing lazy rivers. Choose your adventure and experience the ultimate water park fun.
            </p>
          </div>
          <Carousel />
        </div>
      </section>

      {/* All Attractions Grid */}
      <section className="px-4 md:px-8 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6">
              Explore All Attractions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect ride based on intensity level, duration, and age requirements.
            </p>
          </div>

          {/* Attractions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ATTRACTIONS.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">Make Your Memories Today</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't wait! Book your tickets now and get ready for an unforgettable day at AquaPark.
            Group discounts and season passes available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-10 rounded-lg transition transform hover:scale-105 hover:shadow-2xl text-lg"
            >
              Reserve Your Spot
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-yellow-400 hover:bg-yellow-400 hover:text-blue-900 text-white font-bold py-4 px-10 rounded-lg transition text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 md:px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6">
              Why Choose AquaPark?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best experience for our guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Certified Safe',
                desc: 'Daily safety inspections and trained lifeguards throughout the park.',
              },
              {
                icon: Users,
                title: 'Family Friendly',
                desc: 'Attractions for all ages with separate areas for kids and thrill seekers.',
              },
              {
                icon: Star,
                title: '4.9★ Rated',
                desc: 'Over 5,000 reviews with 95% satisfaction rate from our guests.',
              },
              {
                icon: Clock,
                title: 'Open Year-Round',
                desc: 'Seasonal hours and indoor pools for year-round fun and relaxation.',
              },
              {
                icon: MapPin,
                title: 'Easy Access',
                desc: 'Located conveniently with ample parking and public transportation.',
              },
              {
                icon: Zap,
                title: '15+ Attractions',
                desc: 'New rides added every season with thrills for everyone.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-full text-white flex items-center justify-center mb-4">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 md:px-8 py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who've made lasting memories at AquaPark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                location: 'California',
                text: 'Best family day ever! The kids loved every ride and the staff was incredibly friendly.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                location: 'Nevada',
                text: 'Amazing experience from start to finish. Worth every penny. Will definitely come back!',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                location: 'Arizona',
                text: 'Clean facilities, safe environment, and so many attractions. Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-800 p-8 rounded-xl">
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(null)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                </div>
                <p className="text-lg text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
