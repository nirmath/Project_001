import React, { useState } from 'react';
import { Property, User, Conversation } from '../types';
import PannellumViewer from './PannellumViewer';
import { BedIcon, BathIcon, AreaIcon, LocationMarkerIcon, ArrowLeftIcon, HeartIcon } from './icons';
import { generateDescription } from '../services/geminiService';
import ChatBox from './ChatBox';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  currentUser: User | null;
  onToggleFavorite: (propertyId: string) => void;
  conversation: Conversation | undefined;
  onSendMessage: (propertyId: string, text: string) => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  property, 
  onBack, 
  currentUser, 
  onToggleFavorite,
  conversation,
  onSendMessage
}) => {
  const [smartDescription, setSmartDescription] = useState('');
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  
  const isFavorite = currentUser?.favoriteIds.includes(property.id) ?? false;

  const handleGenerateDescription = async () => {
    setIsLoadingDescription(true);
    const description = await generateDescription(property);
    setSmartDescription(description);
    setIsLoadingDescription(false);
  };
  
  const handleFavoriteClick = () => {
     if (currentUser) {
      onToggleFavorite(property.id);
    } else {
      alert("Please log in to save favorites.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <button 
          onClick={onBack} 
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 font-semibold"
        >
          <ArrowLeftIcon className="w-5 h-5"/>
          <span>Back to Listings</span>
        </button>
      </div>

      <div className="w-full h-[60vh] rounded-xl overflow-hidden bg-gray-800 shadow-2xl">
        <PannellumViewer imageUrl={property.tourUrl} title={property.title} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between md:items-start border-b border-gray-700 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white">{property.title}</h1>
                {currentUser && (
                    <button onClick={handleFavoriteClick} className="text-white hover:text-red-500 transition-colors" aria-label="Toggle Favorite">
                        <HeartIcon className={`w-8 h-8 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
                    </button>
                )}
              </div>
              <div className="flex items-center text-gray-400 mt-2">
                  <LocationMarkerIcon className="w-5 h-5 mr-2" />
                  <span>{property.address.street}, {property.address.city}, {property.address.zip}</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-cyan-400 mt-4 md:mt-0 flex-shrink-0">
              ${property.price.toLocaleString()}{property.type === 'rent' ? '/month' : ''}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-lg my-6">
            <div className="flex items-center space-x-2">
              <BedIcon className="w-6 h-6 text-cyan-400"/>
              <span className="text-gray-300">{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <BathIcon className="w-6 h-6 text-cyan-400"/>
              <span className="text-gray-300">{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <AreaIcon className="w-6 h-6 text-cyan-400"/>
              <span className="text-gray-300">{property.area} sqft</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">Description</h2>
            <p className="text-gray-300 leading-relaxed">{property.description}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">AI-Powered Smart Description</h2>
            {smartDescription ? (
              <div className="text-gray-300 leading-relaxed mt-4 whitespace-pre-wrap">{smartDescription}</div>
            ) : (
              <div className="mt-4">
                <button
                  onClick={handleGenerateDescription}
                  disabled={isLoadingDescription}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  {isLoadingDescription ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : "Generate Smart Description"}
                </button>
                 <p className="text-sm text-gray-500 mt-2">Click to generate a more detailed and engaging description using AI.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
            <ChatBox 
              currentUser={currentUser}
              conversation={conversation}
              onSendMessage={(text) => onSendMessage(property.id, text)}
            />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
