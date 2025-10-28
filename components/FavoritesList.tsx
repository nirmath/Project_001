import React from 'react';
import { Property, User } from '../types';
import PropertyCard from './PropertyCard';
import { HeartIcon } from './icons';

interface FavoritesListProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  currentUser: User | null;
  onToggleFavorite: (propertyId: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ properties, onSelectProperty, currentUser, onToggleFavorite }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <HeartIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-400">No Favorites Yet.</h2>
        <p className="text-gray-500 mt-2">Click the heart icon on any property to save it here.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-3">My Favorite Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {properties.map(property => (
            <PropertyCard 
            key={property.id} 
            property={property} 
            onSelectProperty={onSelectProperty}
            currentUser={currentUser}
            onToggleFavorite={onToggleFavorite}
            />
        ))}
        </div>
    </div>
  );
};

export default FavoritesList;
