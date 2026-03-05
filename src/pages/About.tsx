import { useEffect } from 'react';
import { Users, Target, Heart } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section with Image */}
      <section 
        className="relative text-white py-32 px-4 md:px-8 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/Splashway-Waterpark_54_990x660.webp)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">About WaterPark</h1>
          <p className="text-xl">
            Creating memories and smiles through water-based fun for families everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              desc: 'Provide a safe, accessible, and fun water park experience for families of all ages.',
            },
            {
              icon: Heart,
              title: 'Our Values',
              desc: 'Safety, cleanliness, and guest satisfaction are at the heart of everything we do.',
            },
            {
              icon: Users,
              title: 'Our Team',
              desc: '500+ dedicated staff working to make your visit unforgettable.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="text-center p-6 bg-blue-50 rounded-lg">
                <Icon size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-park-dark mb-2">{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-park-dark mb-4">Our Story</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Founded in 2010, WaterPark has grown to become the region's premier water park destination. 
                What started as a dream to create a family-friendly water park has evolved into a world-class 
                facility serving thousands of guests annually.
              </p>
              <p>
                Our commitment to excellence is reflected in our attractions, facilities, and staff training. 
                We continually invest in new rides, safety improvements, and guest experiences to ensure everyone 
                has an amazing day with us.
              </p>
              <p>
                Today, WaterPark stands as a testament to our dedication to providing safe, clean, and exhilarating 
                water park experiences for guests of all ages and abilities.
              </p>
            </div>
          </div>
          <img 
            src="/images/Wild-Island-Waterpark-Hurricane-Cove-1024x576.jpg" 
            alt="WaterPark attractions"
            className="rounded-lg shadow-lg h-80 object-cover"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: '10+ Years', value: 'In Business' },
            { label: '50,000+', value: 'Annual Visitors' },
            { label: '10+', value: 'World-Class Attractions' },
            { label: '4.8/5', value: 'Guest Rating' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.label}</div>
              <div className="text-muted font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Visit?</h2>
        <a
          href="/booking"
          className="inline-block bg-secondary text-park-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition"
        >
          Book Your Visit Today
        </a>
      </section>
    </div>
  );
};

export default About;
