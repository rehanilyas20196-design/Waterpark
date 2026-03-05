import type { Attraction } from '../data/attractions';
import { useCapacityStatus } from '../hooks/useEffects';
import { getCapacityStatusAria } from '../utils/accessibility';
import { Link } from 'react-router-dom';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  const { percentage, color } = useCapacityStatus(
    attraction.currentVisitors,
    attraction.capacity
  );

  return (
    <article
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition h-full flex flex-col"
      role="article"
    >
      {/* Image */}
      <div className="bg-gradient-to-br from-primary to-secondary h-40 flex items-center justify-center overflow-hidden">
        <img 
          src={attraction.image} 
          alt={attraction.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title & Category */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-park-dark mb-2">{attraction.name}</h3>
          <p className="text-sm font-semibold text-primary uppercase">
            {attraction.category.replace('-', ' ')}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 flex-1">{attraction.description}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <p className="text-muted font-semibold">Duration</p>
            <p className="text-park-dark font-bold">{attraction.duration}</p>
          </div>
          <div>
            <p className="text-muted font-semibold">Intensity</p>
            <p className="text-park-dark font-bold capitalize">{attraction.intensity}</p>
          </div>
          {attraction.minHeight && (
            <div>
              <p className="text-muted font-semibold">Min Height</p>
              <p className="text-park-dark font-bold">{attraction.minHeight}</p>
            </div>
          )}
          {attraction.minAge && (
            <div>
              <p className="text-muted font-semibold">Min Age</p>
              <p className="text-park-dark font-bold">{attraction.minAge}+</p>
            </div>
          )}
        </div>

        {/* Capacity Indicator */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor={`capacity-${attraction.id}`}
              className="text-sm font-semibold text-muted"
            >
              Current Capacity
            </label>
            <span className="text-sm font-bold text-park-dark">
              {attraction.currentVisitors}/{attraction.capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              id={`capacity-${attraction.id}`}
              className={`h-full ${color} transition-all`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={attraction.currentVisitors}
              aria-valuemin={0}
              aria-valuemax={attraction.capacity}
              aria-label={getCapacityStatusAria(attraction.currentVisitors, attraction.capacity)}
            />
          </div>
        </div>

        {/* Next Schedule */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-muted font-semibold">Next Available</p>
          <p className="text-primary font-bold">{attraction.nextSchedule}</p>
        </div>

        {/* CTA Button */}
        <Link
          to={`/attraction/${attraction.id}`}
          className="w-full text-center bg-secondary text-park-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default AttractionCard;
