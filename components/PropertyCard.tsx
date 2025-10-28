import React from 'react';
import { Property, User } from '../types';
import { BedIcon, BathIcon, AreaIcon, LocationMarkerIcon, HeartIcon } from './icons';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  currentUser: User | null;
  onToggleFavorite: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelectProperty, currentUser, onToggleFavorite }) => {
  const isFavorite = currentUser?.favoriteIds.includes(property.id) ?? false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from firing
    if (currentUser) {
      onToggleFavorite(property.id);
    } else {
      alert("Please log in to save favorites.");
    }
  };

  return (
    <div 
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col"
      onClick={() => onSelectProperty(property)}
    >
      <div className="relative">
        <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
        <div className={`absolute top-2 right-2 px-3 py-1 text-sm font-bold rounded-full ${property.type === 'sale' ? 'bg-cyan-500' : 'bg-purple-500'}`}>
          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
        {currentUser && (
            <button
                onClick={handleFavoriteClick}
                className="absolute top-2 left-2 p-2 bg-black/50 rounded-full text-white hover:text-red-500 hover:bg-black/70 transition-colors"
                aria-label="Toggle Favorite"
            >
                <HeartIcon className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
            </button>
        )}
         <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-lg font-bold">${property.price.toLocaleString()}{property.type === 'rent' ? '/mo' : ''}</p>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold truncate group-hover:text-cyan-400 transition-colors">{property.title}</h3>
        <div className="flex items-center text-gray-400 text-sm mt-1">
            <LocationMarkerIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <p className="truncate">{property.address.street}, {property.address.city}</p>
        </div>
        <div className="flex justify-between items-center mt-4 text-gray-300 border-t border-gray-700 pt-3 mt-auto">
          <div className="flex items-center space-x-1">
            <BedIcon className="w-5 h-5 text-cyan-400"/>
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BathIcon className="w-5 h-5 text-cyan-400"/>
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <AreaIcon className="w-5 h-5 text-cyan-400"/>
            <span>{property.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
