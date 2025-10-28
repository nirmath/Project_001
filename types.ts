export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  type: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqft
  imageUrl: string;
  tourUrl: string;
}

export interface FilterState {
    searchTerm: string;
    type: 'all' | 'sale' | 'rent';
    minPrice: number;
    maxPrice: number;
    bedrooms: 'any' | '1' | '2' | '3' | '4';
}

export interface User {
  id: string;
  name: string;
  email: string;
  favoriteIds: string[];
}

export interface Message {
  id: string;
  senderId: string; // 'agent-001' for lister, or userId for user
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string; // e.g., `userId-propertyId`
  userId: string;
  propertyId: string;
  messages: Message[];
}
