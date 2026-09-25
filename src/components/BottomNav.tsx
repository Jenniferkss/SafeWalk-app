import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: 'home' as ScreenType,
      label: 'Início',
      icon: 'shield',
      isActive: currentScreen === 'home',
    },
    {
      id: 'history' as ScreenType,
      label: 'Histórico',
      icon: 'history',
      isActive: currentScreen === 'history' || currentScreen === 'route-detail',
    },
    {
      id: 'contacts' as ScreenType,
      label: 'Contatos',
      icon: 'group',
      isActive: currentScreen === 'contacts',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60">
      <div className="max-w-lg mx-auto flex items-center justify-around h-18 px-4">
        {tabs.map((tab) => {
          const active = tab.isActive;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-all active:scale-95 ${
                active ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className="font-heading text-[11px] font-semibold tracking-wide mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
