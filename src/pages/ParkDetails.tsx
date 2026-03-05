import { useEffect } from 'react';
import { MapPin, Clock, DollarSign, Users, Shield, Zap } from 'lucide-react';

const ParkDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative text-white py-24 px-4 md:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/top-down-aerial-view-colorful-water-park-pools-slides-attractions-vibrant-summer-leisure-scene-geometric-patterns-429691820.webp')] bg-cover bg-center filter blur-sm brightness-50"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/30 to-accent/40 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md py-2 px-4 rounded-full shadow-lg border border-white/20">
              <span className="text-3xl">🌊</span>
              <span className="text-sm font-semibold uppercase tracking-widest">Welcome to WaterPark</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Experience the Ultimate<br />
              <span className="bg-gradient-to-r from-secondary via-yellow-300 to-secondary bg-clip-text text-transparent">Water Adventure</span>
            </h1>

            <p className="text-lg text-white/95 max-w-xl leading-relaxed font-light">
              Thrilling slides, relaxing rivers, and unforgettable memories await you. Discover 10+ attractions, pristine facilities, and world-class hospitality crafted for your perfect water escape.
            </p>

            <div className="flex items-center gap-4">
              <a href="/booking" className="inline-block bg-secondary text-park-dark px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">
                Book Tickets
              </a>
              <a href="/attractions" className="inline-block border border-white/30 text-white px-5 py-3 rounded-full hover:bg-white/10 transition">
                View Attractions
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <div className="text-sm text-white/80">Open daily · Family friendly · Safety first</div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10">
              <img
                src="/images/top-down-aerial-view-colorful-water-park-pools-slides-attractions-vibrant-summer-leisure-scene-geometric-patterns-429691820.webp"
                alt="WaterPark aerial view"
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-6 right-6 md:left-auto md:right-6">
              <div className="bg-white/90 rounded-lg p-4 shadow-lg flex justify-between items-center">
                <div>
                  <p className="text-sm text-park-dark">Visitors Today</p>
                  <p className="font-bold text-park-dark text-lg">3,824</p>
                </div>
                <div>
                  <p className="text-sm text-park-dark">Open Attractions</p>
                  <p className="font-bold text-park-dark text-lg">8</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Zap,
              title: '10+ Attractions',
              desc: 'From thrilling slides to relaxing rivers',
            },
            {
              icon: Users,
              title: 'Family Friendly',
              desc: 'Fun for all ages, from toddlers to teens',
            },
            {
              icon: Shield,
              title: 'Safety First',
              desc: 'Professional staff & highest safety standards',
            },
            {
              icon: Clock,
              title: 'Extended Hours',
              desc: 'Open daily during peak season',
            },
            {
              icon: MapPin,
              title: 'Prime Location',
              desc: 'Easy access with ample parking',
            },
            {
              icon: DollarSign,
              title: 'Great Value',
              desc: 'Affordable prices & annual passes available',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-blue-50 rounded-lg p-8 text-center hover:shadow-lg transition">
                <Icon size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-park-dark mb-2">{feature.title}</h3>
                <p className="text-muted">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Attractions Highlight */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-park-dark mb-8 text-center">Our Most Popular Attractions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Tornado Rush', emoji: '🌪️', desc: 'Heart-pounding 5-floor water slide' },
              { name: 'Wave Master', emoji: '🌊', desc: 'Artificial waves up to 6 feet tall' },
              { name: 'Lazy River', emoji: '🚣', desc: 'Scenic 20-minute relaxing float' },
              { name: 'Splash Kingdom', emoji: '💦', desc: 'Interactive water play for kids' },
              { name: 'Cosmic Adventure', emoji: '🚀', desc: 'Underwater tunnel water slide' },
              { name: 'Aquatic Show', emoji: '🤸', desc: 'Professional acrobatics & swimming' },
            ].map((attr, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition">
                <div className="text-5xl mb-3">{attr.emoji}</div>
                <h3 className="text-xl font-bold text-park-dark mb-2">{attr.name}</h3>
                <p className="text-muted">{attr.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Park Info Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-park-light rounded-lg p-8">
            <h3 className="text-3xl font-bold text-park-dark mb-6">📍 Location & Hours</h3>
            <div className="space-y-4 text-lg">
              <div>
                <p className="text-muted font-semibold">Address</p>
                <p className="text-park-dark font-bold">123 Water Lane, Fun City, CA 90210</p>
              </div>
              <div>
                <p className="text-muted font-semibold">Phone</p>
                <p className="text-primary font-bold">1-800-WATER (1-800-928-3727)</p>
              </div>
              <div>
                <p className="text-muted font-semibold">Regular Season</p>
                <p className="text-park-dark">Mon-Fri: 10 AM - 6 PM</p>
                <p className="text-park-dark">Sat-Sun: 9 AM - 8 PM</p>
              </div>
              <div>
                <p className="text-muted font-semibold">Winter Hours</p>
                <p className="text-park-dark">Weekends: 11 AM - 5 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-park-light rounded-lg p-8">
            <h3 className="text-3xl font-bold text-park-dark mb-6">💰 Pricing</h3>
            <div className="space-y-4">
              {[
                { name: 'Day Pass', price: 'Rs. 45', desc: 'Full day access' },
                { name: 'Evening Pass', price: 'Rs. 30', desc: '4 PM onwards' },
                { name: 'Annual Pass', price: 'Rs. 199', desc: 'Unlimited visits' },
              ].map((ticket, idx) => (
                <div key={idx} className="flex justify-between items-start border-b pb-3">
                  <div>
                    <p className="font-bold text-park-dark">{ticket.name}</p>
                    <p className="text-sm text-muted">{ticket.desc}</p>
                  </div>
                  <p className="text-secondary font-bold text-lg">{ticket.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-gradient-to-r from-secondary to-accent text-white rounded-lg p-12 text-center mb-16">
          <h3 className="text-4xl font-bold mb-8">🏊 Premium Facilities</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {['🍔 Food Court', '🧸 Kids Area', '🩹 First Aid', '🚻 Restrooms', '🚪 Lockers', '🏖️ Lounging Area', '💇 Showers', '👶 Baby Room'].map((facility, idx) => (
              <div key={idx} className="bg-white/20 rounded-lg p-4 text-lg font-semibold backdrop-blur">
                {facility}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-park-dark mb-4">Ready to Make a Splash?</h2>
          <p className="text-xl text-muted mb-8">Join thousands of happy guests at WaterPark</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition text-lg">
              Book Tickets Now
            </button>
            <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-park-dark text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: '10+ Years', stat: 'In Business' },
            { label: '50,000+', stat: 'Annual Visitors' },
            { label: '10+', stat: 'Attractions' },
            { label: '4.8/5', stat: 'Star Rating' },
          ].map((item, idx) => (
            <div key={idx}>
              <p className="text-4xl font-bold text-secondary mb-2">{item.label}</p>
              <p className="text-lg">{item.stat}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ParkDetails;
