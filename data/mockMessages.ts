import { Conversation } from '../types';

export const mockConversations: Conversation[] = [
  {
    id: 'convo-user-123-1',
    userId: 'user-123',
    propertyId: '1',
    messages: [
      {
        id: 'msg1',
        senderId: 'user-123',
        text: 'Hello, is this loft still available for viewing this weekend?',
        timestamp: '2023-10-26T10:00:00Z',
      },
      {
        id: 'msg2',
        senderId: 'agent-001', // Represents the property lister/agent
        text: 'Good morning! Yes, it is. We have slots open on Saturday afternoon. Would that work for you?',
        timestamp: '2023-10-26T10:05:00Z',
      },
    ],
  },
  {
    id: 'convo-user-123-4',
    userId: 'user-123',
    propertyId: '4',
    messages: [
      {
        id: 'msg3',
        senderId: 'user-123',
        text: 'Hi, I am very interested in the Chic Urban Apartment. What is the policy on pets?',
        timestamp: '2023-10-27T14:20:00Z',
      },
    ],
  },
];
