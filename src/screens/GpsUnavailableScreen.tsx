import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ScreenType, UserProfile } from '../types';

interface GpsUnavailableScreenProps {
  user: UserProfile;
  onRetrySuccess: () => void;
  onBack: () => void;
  onOpenScreenSwitcher?: () => void;
}

export const GpsUnavailableScreen: React.FC<GpsUnavailableScreenProps> = ({
  user,
  onRetrySuccess,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryFeedback, setRetryFeedback] = useState<string | null>(null);

  const handleRetry = () => {
    setIsRetrying(true);
    setRetryFeedback('Buscando sinal de satélite...');
    setTimeout(() => {
      setIsRetrying(false);
      setRetryFeedback('Sinal restabelecido com sucesso!');
      setTimeout(() => {
        onRetrySuccess();
      }, 700);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between">
      <Header
        subtitle="Gps Indisponível"
        showBack
        onBack={onBack}
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="gps-unavailable"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-8 px-4 flex flex-col justify-between">
        <div className="flex flex-col w-full">
          {/* Top Organic Breathing Illustration */}
          <div className="flex flex-col items-center justify-center pt-2 pb-2 relative">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full bg-secondary-container/20 animate-ping opacity-40"
                style={{ animationDuration: '2s' }}
              ></div>
              <div className="absolute inset-2 rounded-full bg-surface-container-high/60"></div>

              {/* Vector Shield with Soft Amber Satellite Off/Search Signal */}
              <div className="relative w-28 h-28 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center border border-surface-container-high/40">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 6C18 6 12 11 12 24C12 40 25 53 32 58C39 53 52 40 52 24C52 11 46 6 32 6Z" fill="#F5F2F9" />
                  <path d="M32 10C21.5 10 16 14.5 16 25C16 38.5 26.5 49.5 32 53.5C37.5 49.5 48 38.5 48 25C48 14.5 42.5 10 32 10Z" fill="#E8DDFF" opacity="0.6" />
                  <circle cx="32" cy="27" fill="#006951" opacity="0.15" r="9" />
                  <circle cx="32" cy="27" fill="#006951" r="5" />
                  <path d="M42 17C44.5 19.5 46 23 46 27" opacity="0.7" stroke="#BA1A1A" strokeDasharray="1 4" strokeLinecap="round" strokeWidth="2.5" />
                  <path d="M22 17C19.5 19.5 18 23 18 27" opacity="0.7" stroke="#BA1A1A" strokeDasharray="1 4" strokeLinecap="round" strokeWidth="2.5" />
                  <line stroke="#4C3C7A" strokeLinecap="round" strokeWidth="2.5" x1="20" x2="44" y1="39" y2="15" />
                </svg>
              </div>

              {/* Floating gentle status badge */}
              <div className="absolute -bottom-1 bg-surface-container-lowest shadow-xs rounded-full px-3 py-1 flex items-center gap-1.5 border border-surface-container-high/40">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-heading text-[10px] font-bold text-secondary tracking-wider uppercase">
                  Sinal Suspenso
                </span>
              </div>
            </div>
          </div>

          {/* Reassuring Message Header */}
          <div className="flex flex-col items-center text-center mt-3 mb-4">
            <h1 className="font-heading font-bold text-2xl text-on-surface">
              Localização indisponível
            </h1>
            <p className="font-sans text-xs text-on-surface-variant max-w-xs mt-1 leading-relaxed">
              Não foi possível acessar sua localização. Verifique a permissão de localização e tente novamente.
            </p>
          </div>

          {/* Reassurance / Protective Context Micro-Card */}
          <div className="w-full bg-primary-fixed/30 rounded-2xl p-3.5 mb-4 flex items-center gap-3 border border-primary-fixed/50">
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary shadow-xs">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                health_and_safety
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-xs font-bold text-on-primary-fixed">
                Estamos com você
              </span>
              <span className="font-sans text-[11px] text-on-surface-variant truncate">
                Seus dados e contatos guardados continuam intactos.
              </span>
            </div>
          </div>

          {/* Quick Troubleshooting Resolution Card */}
          <div className="w-full bg-surface-container-lowest rounded-3xl p-4 shadow-xs border border-surface-container-high/50 mb-5 flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              <span className="font-heading text-xs font-bold text-on-surface">
                Dicas rápidas para resolver:
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2.5 bg-surface-container-low rounded-xl p-2.5 border border-surface-container-high/30">
                <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-heading text-[10px] font-bold text-tertiary">1</span>
                </div>
                <p className="font-sans text-xs text-on-surface leading-snug">
                  Verifique se o <strong>GPS do celular</strong> está ligado nas configurações rápidas.
                </p>
              </div>

              <div className="flex items-start gap-2.5 bg-surface-container-low rounded-xl p-2.5 border border-surface-container-high/30">
                <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-heading text-[10px] font-bold text-tertiary">2</span>
                </div>
                <p className="font-sans text-xs text-on-surface leading-snug">
                  Certifique-se de que a permissão está em <strong>“Permitir sempre”</strong> ou “Durante o uso”.
                </p>
              </div>

              <div className="flex items-start gap-2.5 bg-surface-container-low rounded-xl p-2.5 border border-surface-container-high/30">
                <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-heading text-[10px] font-bold text-tertiary">3</span>
                </div>
                <p className="font-sans text-xs text-on-surface leading-snug">
                  Se estiver em local subterrâneo ou fechado, aproxime-se de uma <strong>área aberta</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary and Secondary Actions */}
        <div className="flex flex-col gap-2.5 w-full mt-auto">
          {retryFeedback && (
            <p className="text-center text-xs text-primary font-semibold animate-pulse mb-1">
              {retryFeedback}
            </p>
          )}

          <button
            type="button"
            disabled={isRetrying}
            onClick={handleRetry}
            className="w-full h-14 bg-primary text-on-primary rounded-2xl font-heading text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all hover:bg-primary-container disabled:opacity-80 cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[20px] ${isRetrying ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isRetrying ? 'BUSCANDO SINAL...' : 'TENTAR NOVAMENTE'}</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full h-12 bg-surface-container-low text-on-surface-variant hover:text-on-surface rounded-2xl font-heading text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer border border-surface-container-high/40"
          >
            VOLTAR
          </button>

          {/* Emergency Support Safe-zone Footer Line */}
          <div className="mt-3 pt-1 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-container-high/40">
              <span className="material-symbols-outlined text-secondary text-[16px]">support_agent</span>
              <span className="font-sans text-[11px] text-on-surface-variant">
                Sente dúvida ou insegurança imediata?
              </span>
              <a href="tel:190" className="font-heading text-[11px] font-bold text-primary underline hover:opacity-80">
                Discar 190
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
