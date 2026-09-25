import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ScreenType, UserProfile } from '../types';

interface RouteSummaryScreenProps {
  user: UserProfile;
  destinationTitle?: string;
  onHome: () => void;
  onBack: () => void;
  onOpenScreenSwitcher?: () => void;
}

export const RouteSummaryScreen: React.FC<RouteSummaryScreenProps> = ({
  user,
  destinationTitle = 'Casa',
  onHome,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [rating, setRating] = useState<'bad' | 'neutral' | 'good'>('good');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between">
      <Header
        subtitle="Resumo Do Trajeto"
        showBack
        onBack={onBack}
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="route-summary"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-8 px-4 flex flex-col">
        {/* Top Celebration & Affirmation Banner */}
        <div className="flex flex-col items-center text-center mt-2 mb-5">
          <div className="relative flex items-center justify-center w-24 h-24 mb-3">
            <div
              className="absolute inset-0 rounded-full bg-primary-fixed opacity-40 animate-ping"
              style={{ animationDuration: '3s' }}
            ></div>
            <div className="absolute inset-1.5 rounded-full bg-primary-fixed opacity-70"></div>
            <div className="relative w-16 h-16 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary text-[38px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
              >
                check_circle
              </span>
            </div>
          </div>

          <h1 className="font-heading font-bold text-2xl text-primary tracking-tight mb-1">
            Trajeto finalizado ✓
          </h1>
          <p className="font-sans text-xs text-on-surface-variant max-w-xs leading-relaxed">
            Você chegou ao seu destino em total segurança. Seus contatos de confiança já foram notificados.
          </p>
        </div>

        {/* Primary Route Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-4 shadow-xs border border-surface-container-high/50 flex flex-col gap-3.5 mb-4">
          {/* Safe Status Pill Banner */}
          <div className="flex items-center justify-between bg-tertiary-fixed/60 text-on-tertiary-fixed rounded-2xl px-3.5 py-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <span className="font-heading text-xs font-bold text-on-surface">
                100% monitorado com segurança
              </span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">
              done_all
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-surface-container-high/30">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center mb-1 text-primary">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
              </div>
              <span className="font-heading text-base font-bold text-on-surface tracking-tight">
                18:42
              </span>
              <span className="font-heading text-[10px] text-tertiary uppercase mt-0.5">
                Tempo total
              </span>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-surface-container-high/30">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center mb-1 text-primary">
                <span className="material-symbols-outlined text-[18px]">straighten</span>
              </div>
              <span className="font-heading text-base font-bold text-on-surface tracking-tight">
                1,8 km
              </span>
              <span className="font-heading text-[10px] text-tertiary uppercase mt-0.5">
                Distância percorrida
              </span>
            </div>
          </div>

          {/* Vector Map Route Viewport */}
          <div className="relative w-full h-44 bg-surface-container-low rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-surface-container-high/40">
            <svg
              className="absolute inset-0 w-full h-full text-outline-variant/30"
              preserveAspectRatio="none"
              viewBox="0 0 340 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* City Grids */}
              <rect fill="#F5F2F9" height="45" rx="6" width="70" x="15" y="15" />
              <rect fill="#F5F2F9" height="45" rx="6" width="115" x="105" y="15" />
              <rect fill="#F5F2F9" height="75" rx="6" width="85" x="240" y="15" />
              <rect fill="#F5F2F9" height="95" rx="6" width="70" x="15" y="80" />
              <rect fill="#F5F2F9" height="50" rx="6" width="90" x="105" y="130" />
              <rect fill="#F5F2F9" height="70" rx="6" width="110" x="215" y="110" />

              {/* Streets */}
              <path d="M0,70 L340,70" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
              <path d="M95,0 L95,200" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
              <path d="M230,0 L230,200" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
              <path d="M0,120 L230,120" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />

              {/* Safe Halo Glow Corridor */}
              <path
                d="M50,150 L95,150 L95,70 L210,70 L230,70 L230,45 L285,45"
                fill="none"
                opacity="0.65"
                stroke="#9AF4D4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="14"
              />

              {/* Walk Path Vector */}
              <path
                d="M50,150 L95,150 L95,70 L210,70 L230,70 L230,45 L285,45"
                fill="none"
                stroke="#006951"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />

              {/* Origin Node */}
              <circle cx="50" cy="150" fill="#645494" r="7" />
              <circle cx="50" cy="150" fill="#FFFFFF" r="3.5" />

              {/* Destination Node */}
              <circle cx="285" cy="45" fill="#006951" r="9" />
              <circle cx="285" cy="45" fill="#FFFFFF" r="4.5" />
            </svg>

            {/* Origin Badge */}
            <div className="absolute left-3 bottom-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 border border-surface-container-high/40">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-heading text-[10px] font-semibold text-on-surface">
                Av. Paulista
              </span>
            </div>

            {/* Destination Badge */}
            <div className="absolute right-3 top-3 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 border border-surface-container-high/40">
              <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                home
              </span>
              <span className="font-heading text-[10px] font-bold text-primary">
                {destinationTitle} (Chegada)
              </span>
            </div>
          </div>

          {/* Circle Contacts Alerted Feedback */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-heading text-xs font-bold shadow-xs">
                  M
                </div>
                <div className="w-8 h-8 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-heading text-xs font-bold shadow-xs">
                  C
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-heading text-xs font-bold shadow-xs">
                  L
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xs font-bold text-on-surface">
                  Círculo Seguro notificado
                </span>
                <span className="font-sans text-[11px] text-on-surface-variant">
                  3 contatos receberam o aviso
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              notifications_active
            </span>
          </div>
        </div>

        {/* Route Rating / Mood Feedback Micro-Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-xs border border-surface-container-high/50 mb-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-heading text-xs font-bold text-on-surface">
              Como foi a caminhada?
            </span>
            <span className="font-sans text-[11px] text-on-surface-variant">
              Avalie a sensação de segurança
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Ruim"
              onClick={() => setRating('bad')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
                rating === 'bad'
                  ? 'bg-error-container text-error shadow-xs'
                  : 'bg-surface-container-low text-tertiary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">sentiment_dissatisfied</span>
            </button>

            <button
              type="button"
              aria-label="Neutro"
              onClick={() => setRating('neutral')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
                rating === 'neutral'
                  ? 'bg-secondary-fixed text-secondary shadow-xs'
                  : 'bg-surface-container-low text-tertiary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">sentiment_neutral</span>
            </button>

            <button
              type="button"
              aria-label="Excelente"
              onClick={() => setRating('good')}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
                rating === 'good'
                  ? 'bg-primary-fixed text-primary shadow-xs'
                  : 'bg-surface-container-low text-tertiary hover:bg-surface-container'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: rating === 'good' ? "'FILL' 1" : "'FILL' 0" }}
              >
                sentiment_very_satisfied
              </span>
            </button>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-col gap-2.5 mt-auto">
          {/* Save Route Action Button */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-14 bg-primary text-on-primary rounded-2xl shadow-md flex items-center justify-center gap-2 font-heading text-xs font-bold active:scale-[0.98] transition-all hover:bg-primary-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isSaved ? 'check' : 'bookmark'}
            </span>
            <span>{isSaved ? 'TRAJETO SALVO COM SUCESSO!' : 'SALVAR TRAJETO'}</span>
          </button>

          {/* Return Home Button */}
          <button
            type="button"
            onClick={onHome}
            className="w-full h-14 bg-surface-container text-on-surface rounded-2xl flex items-center justify-center gap-2 font-heading text-xs font-bold active:scale-[0.98] transition-all hover:bg-surface-container-high cursor-pointer border border-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>VOLTAR AO INÍCIO</span>
          </button>
        </div>
      </main>
    </div>
  );
};
