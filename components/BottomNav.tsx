
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  const items: { id: View; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'explore', label: 'Skills', icon: '🔍' },
    { id: 'chat', label: 'Mentor', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-6 py-3 flex justify-between items-center z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeView === item.id ? 'text-indigo-600' : 'text-slate-400'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          {activeView === item.id && (
            <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
