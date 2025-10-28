import React, { useState, useEffect, useMemo } from 'react';
import { Property, FilterState, User, Conversation, Message } from './types';
import { mockProperties } from './data/mockProperties';
import { mockUser } from './data/mockUsers';
import { mockConversations } from './data/mockMessages';
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import FilterBar from './components/FilterBar';
import FavoritesList from './components/FavoritesList';

type View = 'list' | 'favorites' | 'detail';

const App: React.FC = () => {
  const [properties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [view, setView] = useState<View>('list');

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    type: 'all',
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: 'any',
  });

  const priceRange = useMemo(() => {
    const prices = mockProperties.map(p => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  useEffect(() => {
    let result = properties.filter(property => {
      const searchTermMatch = property.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                              property.address.city.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                              property.address.street.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const typeMatch = filters.type === 'all' || property.type === filters.type;
      const priceMatch = property.price >= filters.minPrice && property.price <= filters.maxPrice;
      const bedroomMatch = filters.bedrooms === 'any' || property.bedrooms >= parseInt(filters.bedrooms);
      
      return searchTermMatch && typeMatch && priceMatch && bedroomMatch;
    });
    setFilteredProperties(result);
  }, [filters, properties]);
  
  // --- Auth ---
  const handleLogin = () => {
    setCurrentUser(mockUser);
    setConversations(mockConversations); // Load user's conversations on login
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedProperty(null);
    setView('list');
    setConversations([]);
  };

  // --- Navigation ---
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
    setView(view === 'favorites' ? 'favorites' : 'list');
  };
  
  const handleSetView = (newView: 'list' | 'favorites') => {
    setSelectedProperty(null);
    setView(newView);
  }

  // --- Features ---
  const handleToggleFavorite = (propertyId: string) => {
    if (!currentUser) return;
    const isFavorite = currentUser.favoriteIds.includes(propertyId);
    const updatedFavoriteIds = isFavorite
      ? currentUser.favoriteIds.filter(id => id !== propertyId)
      : [...currentUser.favoriteIds, propertyId];
    
    setCurrentUser({ ...currentUser, favoriteIds: updatedFavoriteIds });
  };

  const handleSendMessage = (propertyId: string, text: string) => {
    if (!currentUser) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
    };

    const conversationIndex = conversations.findIndex(c => c.propertyId === propertyId);
    let updatedConversations = [...conversations];

    if (conversationIndex > -1) {
      updatedConversations[conversationIndex].messages.push(message);
    } else {
      updatedConversations.push({
        id: `convo-${currentUser.id}-${propertyId}`,
        userId: currentUser.id,
        propertyId,
        messages: [message],
      });
    }
    setConversations(updatedConversations);

    // Simulate agent reply
    setTimeout(() => {
        const agentMessage: Message = {
            id: `msg-agent-${Date.now()}`,
            senderId: 'agent-001',
            text: "Thank you for your message! An agent will get back to you shortly regarding this property.",
            timestamp: new Date().toISOString(),
        };
        const convoIndex = updatedConversations.findIndex(c => c.propertyId === propertyId);
        if (convoIndex > -1) {
            const finalConversations = [...updatedConversations];
            finalConversations[convoIndex].messages.push(agentMessage);
            setConversations(finalConversations);
        }
    }, 1500);
  };

  const favoriteProperties = useMemo(() => {
    if (!currentUser) return [];
    return properties.filter(p => currentUser.favoriteIds.includes(p.id));
  }, [currentUser, properties]);
  
  const renderContent = () => {
    if (view === 'detail' && selectedProperty) {
      return (
        <PropertyDetail 
          property={selectedProperty} 
          onBack={handleBackToList}
          currentUser={currentUser}
          onToggleFavorite={handleToggleFavorite}
          conversation={conversations.find(c => c.propertyId === selectedProperty.id)}
          onSendMessage={handleSendMessage}
        />
      );
    }
    
    if (view === 'favorites') {
      return (
        <FavoritesList 
          properties={favoriteProperties} 
          onSelectProperty={handleSelectProperty}
          currentUser={currentUser}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }

    return (
      <>
        <FilterBar filters={filters} setFilters={setFilters} priceRange={priceRange} />
        <PropertyList 
          properties={filteredProperties} 
          onSelectProperty={handleSelectProperty}
          currentUser={currentUser}
          onToggleFavorite={handleToggleFavorite}
        />
      </>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header 
        currentUser={currentUser} 
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSetView={handleSetView}
        currentView={view}
      />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
