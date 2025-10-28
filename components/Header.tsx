import React from 'react';
import { HomeIcon, HeartIcon, UserCircleIcon } from './icons';
import { User } from '../types';

interface HeaderProps {
    currentUser: User | null;
    onLogin: () => void;
    onLogout: () => void;
    onSetView: (view: 'list' | 'favorites') => void;
    currentView: 'list' | 'favorites' | 'detail';
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogin, onLogout, onSetView, currentView }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => onSetView('list')}
        >
          <HomeIcon className="w-8 h-8 text-cyan-400"/>
          <h1 className="text-2xl font-bold tracking-tight text-white">VirtuCasa 360</h1>
        </div>
        <nav className="flex items-center space-x-6">
            {currentUser ? (
                <>
                    <button 
                        onClick={() => onSetView('favorites')} 
                        className={`flex items-center space-x-2 transition-colors duration-200 ${currentView === 'favorites' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}
                    >
                        <HeartIcon className="w-6 h-6"/>
                        <span>Favorites</span>
                    </button>
                    <div className="flex items-center space-x-3">
                        <UserCircleIcon className="w-7 h-7 text-gray-400"/>
                        <span className="font-semibold">{currentUser.name}</span>
                    </div>
                    <button 
                        onClick={onLogout}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <button 
                        onClick={onLogin} 
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-semibold"
                    >
                        Log In
                    </button>
                    <button 
                        onClick={onLogin} // Simulating signup with login
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Sign Up
                    </button>
                </>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
