import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ScreenType, UserProfile } from '../types';

interface MotionAlertScreenProps {
  user: UserProfile;
  onSafeConfirm: () => void;
  onEmergencyTrigger: () => void;
  onBack: () => void;
  onOpenScreenSwitcher?: () => void;
}

export const MotionAlertScreen: React.FC<MotionAlertScreenProps> = ({
  user,
  onSafeConfirm,
  onEmergencyTrigger,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [isResolved, setIsResolved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isResolved) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onEmergencyTrigger();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isResolved, onEmergencyTrigger]);

  const handleSafe = () => {
    setIsResolved(true);
    setShowToast(true);
    setTimeout(() => {
      onSafeConfirm();
    }, 1500);
  };

  const progressPercentage = (secondsLeft / 20) * 100;

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between">
      <Header
        subtitle="Alerta De Movimento"
        showBack
        onBack={onBack}
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="motion-alert"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-8 px-4 flex flex-col justify-between">
        <div className="flex flex-col w-full">
          {/* Friendly Calm Beacon & Pulsing Indicator */}
          <div className="flex flex-col items-center justify-center text-center mt-2 mb-6">
            <div className="relative flex items-center justify-center w-28 h-28 mb-4">
              <div
                className="absolute inset-0 rounded-full bg-secondary-fixed opacity-40 animate-ping"
                style={{ animationDuration: '2.6s' }}
              ></div>
              <div className="absolute inset-2 rounded-full bg-secondary-fixed-dim/30"></div>
              <div className="relative w-20 h-20 rounded-full bg-secondary-fixed flex items-center justify-center shadow-md">
                <span
                  className="material-symbols-outlined text-on-secondary-fixed text-[44px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sensors
                </span>
              </div>
              <div className="absolute top-1 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-on-primary text-[16px]">
                  favorite
                </span>
              </div>
            </div>

            {/* Main Headings */}
            <h1 className="font-heading font-bold text-2xl text-on-surface mb-2 tracking-tight">
              Movimento inesperado detectado
            </h1>
            <p className="font-sans text-sm text-on-surface-variant max-w-xs leading-relaxed">
              Detectamos uma mudança brusca nos sensores. Respire fundo: você está bem?
            </p>
          </div>

          {/* Reassuring Countdown & Status Card */}
          <div className="w-full bg-surface-container-low rounded-3xl p-5 mb-5 shadow-xs border border-surface-container-high/40">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-heading text-xs font-bold text-on-surface">
                  Checagem de Segurança
                </span>
              </div>
              <span className="font-heading text-xs text-primary font-bold">
                {secondsLeft}s restantes
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden mb-3">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">
                timer
              </span>
              <p className="font-sans text-xs text-on-surface-variant leading-snug">
                Se não houver resposta dentro do tempo, compartilharemos sua localização com seus 3 contatos de confiança.
              </p>
            </div>
          </div>

          {/* Primary Safety Actions (Thumb Zone) */}
          <div className="flex flex-col gap-3.5 mb-5">
            {/* Primary Green Button: Safe */}
            <button
              type="button"
              onClick={handleSafe}
              className="w-full min-h-[58px] py-4 px-6 rounded-2xl bg-primary text-on-primary shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-3 cursor-pointer hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[26px]">
                check_circle
              </span>
              <span className="font-heading text-sm font-bold tracking-wide uppercase">
                Sim, estou bem
              </span>
            </button>

            {/* Secondary Red Button: Emergency / Assistance */}
            <button
              type="button"
              onClick={onEmergencyTrigger}
              className="w-full min-h-[56px] py-3.5 px-6 rounded-2xl bg-error text-on-error shadow-lg shadow-error/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-3 cursor-pointer hover:bg-error/90"
            >
              <span className="material-symbols-outlined text-[24px]">
                sos
              </span>
              <span className="font-heading text-sm font-bold tracking-wide uppercase">
                Preciso de ajuda
              </span>
            </button>
          </div>

          {/* Soft Clarification & Reassurance Card */}
          <div className="w-full bg-surface-container rounded-2xl p-4 flex flex-col gap-2 border border-surface-container-high/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px]">
                phonelink_ring
              </span>
              <span className="font-heading text-[11px] font-bold text-tertiary uppercase tracking-wider">
                Sensores Inteligentes
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant">
              Este alerta é baseado nos sensores de aceleração e rotação do seu smartphone.
            </p>
            <p className="font-sans text-xs text-primary font-medium">
              Se você estiver bem, basta tocar no botão acima para continuar seu trajeto normalmente e cancelar o aviso aos seus contatos.
            </p>
          </div>
        </div>

        {/* Confirmation Feedback Toast */}
        {showToast && (
          <div className="fixed inset-x-4 bottom-8 z-50 max-w-sm mx-auto bg-inverse-surface text-inverse-on-surface p-4 rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-fixed text-[26px]">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-heading text-xs font-bold text-inverse-on-surface">
                  Alerta cancelado
                </span>
                <span className="font-sans text-xs text-inverse-on-surface/80">
                  Trajeto seguro retomado com sucesso.
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-inverse-on-surface/60 text-[20px]">
              done_all
            </span>
          </div>
        )}
      </main>
    </div>
  );
};
