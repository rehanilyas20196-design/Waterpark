import { useEffect, useState } from 'react';
import AttractionCard from '../components/AttractionCard';
import { ATTRACTIONS } from '../data/attractions';
import type { Attraction } from '../data/attractions';
import { Filter } from 'lucide-react';

const Attractions = () => {
  const [filtered, setFiltered] = useState<Attraction[]>(ATTRACTIONS);
  const [selectedIntensity, setSelectedIntensity] = useState<string>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedIntensity === 'all') {
      setFiltered(ATTRACTIONS);
    } else {
      setFiltered(ATTRACTIONS.filter(a => a.intensity === selectedIntensity));
    }
  }, [selectedIntensity]);

  const intensities = ['all', 'kids', 'family', 'thrilling'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-park-dark mb-4">All Attractions</h1>
      <p className="text-lg text-muted mb-12 max-w-2xl">
        Discover all of our amazing water park attractions, from family-friendly experiences
        to thrilling adventures for thrill-seekers.
      </p>

      {/* Filters */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-4">
          <Filter size={20} className="text-primary" />
          <h2 className="text-xl font-bold text-park-dark">Filter by Intensity</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {intensities.map((intensity) => (
            <button
              key={intensity}
              onClick={() => setSelectedIntensity(intensity)}
              className={`px-6 py-2 rounded-full font-semibold transition capitalize ${
                selectedIntensity === intensity
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-park-dark hover:bg-gray-300'
              }`}
              aria-pressed={selectedIntensity === intensity}
            >
              {intensity === 'all' ? 'All Attractions' : intensity}
            </button>
          ))}
        </div>
      </div>

      {/* Attractions Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted">No attractions found for selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default Attractions;
