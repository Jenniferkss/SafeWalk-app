import React from 'react';
import { SAFEWALK_ASSETS } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  avatarUrl?: string;
  onOpenScreenSwitcher?: () => void;
  currentScreen?: ScreenType;
}

export const Header: React.FC<HeaderProps> = ({
  subtitle = 'Home',
  onBack,
  showBack = false,
  avatarUrl = SAFEWALK_ASSETS.userSofia,
  onOpenScreenSwitcher,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60 pt-safe">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              aria-label="Voltar"
              className="w-10 h-10 -ml-1.5 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-95"
              onClick={onBack}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <div className="flex items-center gap-2">
            <img
              alt="SafeWalk Shield Logo"
              className="h-8 w-auto object-contain"
              src={SAFEWALK_ASSETS.logoShield}
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-primary leading-tight">
                SafeWalk
              </span>
              <span className="font-heading text-[11px] font-bold text-tertiary uppercase tracking-wider">
                {subtitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenScreenSwitcher && (
            <button
              onClick={onOpenScreenSwitcher}
              className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wide flex items-center gap-1 shadow-xs hover:bg-secondary-fixed-dim transition-all active:scale-95"
              title="Alternar entre as 11 telas"
            >
              <span className="material-symbols-outlined text-[15px]">layers</span>
              <span>Telas</span>
            </button>
          )}

          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 shadow-xs shrink-0">
            <img
              src={avatarUrl}
              alt="Foto de perfil de Sofia"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
