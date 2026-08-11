
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 ${className}`}>
        {children}
    </div>
);


interface TabButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({ children, onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
            isActive
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
        }`}
    >
        {children}
    </button>
);
