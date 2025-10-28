import React from 'react';
import { Property, User } from '../types';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  currentUser: User | null;
  onToggleFavorite: (propertyId: string) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onSelectProperty, currentUser, onToggleFavorite }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-400">No properties found.</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
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
  );
};

export default PropertyList;
