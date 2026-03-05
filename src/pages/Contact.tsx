import { useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section with Image */}
      <section 
        className="relative text-white py-32 px-4 md:px-8 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/antlantis.webp)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">
            Have questions or need help? We're here to assist you!
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Phone,
              title: 'Phone',
              value: '1-800-WATER (1-800-928-3727)',
              link: 'tel:1-800-928-3727',
            },
            {
              icon: Mail,
              title: 'Email',
              value: 'info@waterpark.com',
              link: 'mailto:info@waterpark.com',
            },
            {
              icon: MapPin,
              title: 'Location',
              value: '123 Water Lane, Fun City, CA 90210',
              link: '#',
            },
          ].map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div key={idx} className="text-center p-6 bg-blue-50 rounded-lg">
                <Icon size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-park-dark mb-2">{contact.title}</h3>
                <a
                  href={contact.link}
                  className="text-primary hover:text-blue-700 font-semibold transition"
                >
                  {contact.value}
                </a>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto grid md:grid-cols-2">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-park-dark mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-park-dark mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-park-dark mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-park-dark mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-park-dark mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary p-8 flex items-center justify-center hidden md:flex">
            <img
              src="/images/Atlantis_Aquaventure_Trident_Tower_waterslides.jpg"
              alt="Contact support"
              className="rounded-lg shadow-lg h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="bg-blue-50 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-park-dark text-center mb-8">Hours of Operation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-park-dark mb-4">Regular Season</h3>
              <ul className="space-y-2 text-muted">
                <li>Monday - Friday: 10 AM - 6 PM</li>
                <li>Saturday - Sunday: 9 AM - 8 PM</li>
                <li>Holidays: 9 AM - 9 PM</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-park-dark mb-4">Winter Hours</h3>
              <ul className="space-y-2 text-muted">
                <li>Weekdays: Closed</li>
                <li>Weekends: 11 AM - 5 PM</li>
                <li>Check website for holiday hours</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
