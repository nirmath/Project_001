import React, { useState, useEffect, useRef } from 'react';
import { User, Conversation } from '../types';
import { PaperAirplaneIcon } from './icons';

interface ChatBoxProps {
    currentUser: User | null;
    conversation: Conversation | undefined;
    onSendMessage: (text: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ currentUser, conversation, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    if (!currentUser) {
        return (
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold text-white mb-4">Contact Agent</h2>
                <p className="text-gray-400">Please log in to send a message to the agent and view your conversation history.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg flex flex-col h-[60vh] lg:h-full">
            <h2 className="text-xl font-semibold text-white p-4 border-b border-gray-700 flex-shrink-0">
                Message Agent
            </h2>
            <div className="p-4 flex-grow overflow-y-auto space-y-4">
                {conversation?.messages && conversation.messages.length > 0 ? (
                    conversation.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.senderId === currentUser.id ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                <p>{msg.text}</p>
                                <p className="text-xs opacity-60 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 pt-8">
                        No messages yet. Send a message to start the conversation!
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input 
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full transition-colors disabled:bg-gray-600" disabled={!message.trim()}>
                        <PaperAirplaneIcon className="w-6 h-6"/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
