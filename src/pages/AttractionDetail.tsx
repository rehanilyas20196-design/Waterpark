import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Droplet, History, CheckCircle, AlertCircle, Calendar, TicketIcon } from 'lucide-react';
import { ATTRACTIONS } from '../data/attractions';

const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const attraction = ATTRACTIONS.find((a) => a.id === id);

  if (!attraction) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Attraction not found</h2>
        <p className="text-muted mb-6">Try selecting another attraction from our list.</p>
        <Link to="/attractions" className="text-primary font-semibold">
          View All Attractions
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8 p-6">
        {/* Hero Image with Overlay */}
        <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
          <img 
            src={attraction.image} 
            alt={attraction.name} 
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {attraction.name}
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            {attraction.description}
          </p>
        </div>

        {/* Interactive Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Location Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary p-3 rounded-lg">
                <MapPin size={24} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-muted uppercase">Location</p>
            </div>
            <p className="text-lg font-bold text-park-dark">{attraction.location ?? 'Park Grounds'}</p>
          </div>

          {/* Visitors Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-secondary p-3 rounded-lg">
                <Users size={24} className="text-park-dark" />
              </div>
              <p className="text-sm font-semibold text-muted uppercase">Visitors</p>
            </div>
            <p className="text-lg font-bold text-park-dark">{attraction.annualVisitors ?? `${attraction.currentVisitors} now`}</p>
          </div>

          {/* Water Type Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-cyan-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Droplet size={24} className="text-white" />
              </div>
              <p className="text-sm font-semibold text-muted uppercase">Water Type</p>
            </div>
            <p className="text-lg font-bold text-park-dark">{attraction.waterType ?? 'Chlorinated'}</p>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <History size={28} className="text-primary" />
            <h2 className="text-3xl font-bold text-park-dark">History</h2>
          </div>
          <p className="text-lg text-muted leading-relaxed">
            {attraction.history ?? 'This attraction has been delighting guests since its opening.'}
          </p>
        </div>

        {/* Condition Status */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={28} className="text-green-500" />
            <h2 className="text-3xl font-bold text-park-dark">Current Condition</h2>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <p className="font-semibold text-green-700">{attraction.condition ?? 'Open and maintained'}</p>
          </div>
        </div>

        {/* Safety & Requirements */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={28} className="text-orange-500" />
            <h2 className="text-3xl font-bold text-park-dark">Safety & Requirements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attraction.minHeight && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-muted font-semibold">Minimum Height</p>
                <p className="text-xl font-bold text-park-dark">{attraction.minHeight}</p>
              </div>
            )}
            {attraction.minAge && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-muted font-semibold">Recommended Age</p>
                <p className="text-xl font-bold text-park-dark">{attraction.minAge}+</p>
              </div>
            )}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-muted font-semibold">Capacity</p>
              <p className="text-xl font-bold text-park-dark">{attraction.capacity} people</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-muted font-semibold">Duration</p>
              <p className="text-xl font-bold text-park-dark">{attraction.duration}</p>
            </div>
          </div>
        </div>

        {/* Booking CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <TicketIcon size={32} className="text-white" />
            <div>
              <h3 className="text-2xl font-bold text-white">Ready to Experience the Thrills?</h3>
              <p className="text-white/90">Book your tickets now for an unforgettable adventure!</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Link 
              to="/booking" 
              className="inline-flex items-center justify-center gap-2 bg-secondary text-park-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <TicketIcon size={20} />
              Book Tickets Now
            </Link>
            <Link 
              to="/attractions" 
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              <span>Explore Other Attractions</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetail;
