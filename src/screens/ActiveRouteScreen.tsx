import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { ScreenType, UserProfile } from '../types';

interface ActiveRouteScreenProps {
  user: UserProfile;
  destinationTitle?: string;
  onFinishRoute: () => void;
  onEmergency: () => void;
  onTriggerAlert: () => void;
  onTriggerGpsOff: () => void;
  onBack: () => void;
  onOpenScreenSwitcher?: () => void;
}

export const ActiveRouteScreen: React.FC<ActiveRouteScreenProps> = ({
  user,
  destinationTitle = 'Casa',
  onFinishRoute,
  onEmergency,
  onTriggerAlert,
  onTriggerGpsOff,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [mapCentered, setMapCentered] = useState(true);
  const [sosActivated, setSosActivated] = useState(false);
  const holdIntervalRef = useRef<number | null>(null);

  const startHold = () => {
    setIsHolding(true);
    setHoldProgress(0);
    const start = Date.now();
    const duration = 2500; // 2.5s to trigger full SOS

    holdIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setHoldProgress(pct);

      if (pct >= 100) {
        clearInterval(holdIntervalRef.current!);
        setIsHolding(false);
        setSosActivated(true);
        onEmergency();
      }
    }, 50);
  };

  const cancelHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const handleSosClick = () => {
    if (holdProgress < 85) {
      onEmergency();
    }
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <Header
        subtitle="Trajeto Ativo"
        showBack
        onBack={onBack}
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="active-route"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-8 px-4 flex flex-col gap-3">
        {/* Status Bar de Proteção Ativa Flutuante */}
        <section className="w-full">
          <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs p-3.5 flex items-center justify-between border border-surface-container-high/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed shrink-0">
                <span className="absolute w-6 h-6 rounded-full bg-primary/30 animate-ping"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-primary"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-sm text-on-surface truncate">
                    Trajeto protegido
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-heading text-[10px] font-bold">
                    AO VIVO
                  </span>
                </div>
                <p className="font-sans text-xs text-tertiary truncate flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    security
                  </span>
                  <span>Compartilhando com 3 contatos de confiança</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Opções de rota"
              onClick={() => alert('Camadas do mapa: Iluminação pública ativa • Corredor Seguro ativado')}
              className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-transform active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">layers</span>
            </button>
          </div>
        </section>

        {/* Área Principal: Mapa Vetorial Estilizado SVG Interativo */}
        <section className="relative w-full">
          <div className="relative w-full h-[310px] rounded-3xl overflow-hidden bg-surface-container-low shadow-inner border border-surface-container-high/60">
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 380 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient cx="50%" cy="50%" id="userRadarGlow" r="50%">
                  <stop offset="0%" stopColor="#645494" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#645494" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#645494" stopOpacity="0" />
                </radialGradient>
                <filter height="140%" id="safePathGlow" width="140%" x="-20%" y="-20%">
                  <feGaussianBlur result="blur" stdDeviation="3" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Fundo e Malha Urbana */}
              <rect fill="#F5F2F9" height="320" width="380" />

              {/* Parques e Áreas Verdes de Acolhimento */}
              <path
                d="M-20 40 C 30 20, 80 60, 95 120 C 110 180, 50 210, 10 200 Z"
                fill="#D1E7DF"
                opacity="0.65"
              />
              <path
                d="M260 220 C 300 210, 360 230, 390 280 L 390 340 L 240 340 Z"
                fill="#D1E7DF"
                opacity="0.5"
              />

              {/* Malha de Ruas Neutras */}
              <path d="M-10 80 L390 80" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="12" />
              <path d="M-10 160 L390 160" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="14" />
              <path d="M-10 240 L390 240" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="10" />
              <path d="M80 -10 L80 330" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="12" />
              <path d="M190 -10 L190 330" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="14" />
              <path d="M300 -10 L300 330" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="10" />

              {/* Ruas Diagonais e Travessas */}
              <path d="M30 330 L 290 -10" opacity="0.9" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="8" />
              <path d="M70 330 L 330 70" opacity="0.9" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="6" />

              {/* Corredor Seguro com Halo de Proteção */}
              <path
                d="M 60 70 L 190 70 L 190 190 L 290 190 L 290 260"
                opacity="0.6"
                stroke="#9AF4D4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />

              {/* Trajeto Ativo SafeWalk */}
              <path
                d="M 60 70 L 190 70 L 190 190 L 290 190 L 290 260"
                filter="url(#safePathGlow)"
                stroke="#006951"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              />

              {/* Ponto Inicial: Origem */}
              <circle cx="60" cy="70" fill="#006951" r="7" />
              <circle cx="60" cy="70" fill="#FFFFFF" r="3.5" />

              {/* Ponto Destino: Chegada Final */}
              <circle cx="290" cy="260" fill="#238368" r="11" />
              <path d="M 285 263 L 285 258 L 290 254 L 295 258 L 295 263 Z" fill="#FFFFFF" />

              {/* Halo Pulsante de Localização Atual */}
              <circle cx="190" cy="140" fill="url(#userRadarGlow)" r="32">
                <animate attributeName="r" dur="2.4s" repeatCount="indefinite" values="24;38;24" />
                <animate attributeName="opacity" dur="2.4s" repeatCount="indefinite" values="0.8;0.3;0.8" />
              </circle>

              {/* Ponto Atual em Movimento */}
              <circle cx="190" cy="140" fill="#645494" r="9" />
              <circle cx="190" cy="140" fill="#FFFFFF" r="4" />
            </svg>

            {/* Badge de Origem Flutuante */}
            <div className="absolute top-3.5 left-3.5 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 border border-surface-container-high/40">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-heading text-[11px] font-semibold text-on-surface">
                Partida: Av. Paulista, 1000
              </span>
            </div>

            {/* Badge de Destino Flutuante */}
            <div className="absolute bottom-3.5 right-3.5 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 border border-surface-container-high/40">
              <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                home
              </span>
              <span className="font-heading text-[11px] font-semibold text-on-surface">
                Destino: {destinationTitle}
              </span>
            </div>

            {/* Controle de Re-centralização */}
            <button
              type="button"
              aria-label="Recentralizar meu trajeto"
              onClick={() => {
                setMapCentered(true);
                alert('Localização GPS recentralizada no centro da tela.');
              }}
              className="absolute bottom-3.5 left-3.5 w-10 h-10 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-primary hover:bg-surface-container-low transition-transform active:scale-95 border border-surface-container-high/50"
            >
              <span className="material-symbols-outlined text-[20px]">my_location</span>
            </button>
          </div>
        </section>

        {/* Painel de Métricas em Tempo Real (Bento 3 Colunas) */}
        <section className="grid grid-cols-3 gap-2.5">
          {/* Métrica 1: Chegada Estimada */}
          <div className="bg-surface-container-lowest rounded-2xl p-2.5 shadow-xs flex flex-col items-center justify-center text-center border border-surface-container-high/40">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center mb-1 text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
            </div>
            <span className="font-heading font-bold text-base text-on-surface leading-tight">
              18:42
            </span>
            <span className="font-heading text-[10px] text-tertiary">Previsão (12m)</span>
          </div>

          {/* Métrica 2: Distância */}
          <div className="bg-surface-container-lowest rounded-2xl p-2.5 shadow-xs flex flex-col items-center justify-center text-center border border-surface-container-high/40">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center mb-1 text-on-primary-fixed">
              <span className="material-symbols-outlined text-[18px]">route</span>
            </div>
            <span className="font-heading font-bold text-base text-on-surface leading-tight">
              1,8 km
            </span>
            <span className="font-heading text-[10px] text-tertiary">Restante</span>
          </div>

          {/* Métrica 3: Nível de Proteção */}
          <div className="bg-surface-container-lowest rounded-2xl p-2.5 shadow-xs flex flex-col items-center justify-center text-center border border-surface-container-high/40">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center mb-1 text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            <span className="font-heading font-bold text-base text-primary leading-tight">
              100%
            </span>
            <span className="font-heading text-[10px] text-tertiary">Seguro</span>
          </div>
        </section>

        {/* Contatos em Acompanhamento Ativo */}
        <section className="bg-surface-container-low rounded-2xl p-3 flex items-center justify-between border border-surface-container-high/40">
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary font-heading text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
                CA
              </div>
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary font-heading text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
                MA
              </div>
              <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary font-heading text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
                JU
              </div>
            </div>
            <span className="font-sans text-xs text-on-surface-variant font-medium">
              Camila, Mãe e Julia conectadas
            </span>
          </div>
          <span className="material-symbols-outlined text-primary text-[20px]">
            share_location
          </span>
        </section>

        {/* Quick Simulation Bar (Allows testing motion alert or GPS offline quickly) */}
        <div className="flex items-center gap-2 py-1 px-1">
          <button
            type="button"
            onClick={onTriggerAlert}
            className="flex-1 py-1.5 px-2 bg-secondary-fixed/50 hover:bg-secondary-fixed text-on-secondary-fixed rounded-xl text-[11px] font-heading font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">sensors</span>
            <span>Simular Alerta de Movimento</span>
          </button>
          <button
            type="button"
            onClick={onTriggerGpsOff}
            className="py-1.5 px-2 bg-surface-container-high hover:bg-surface-dim text-on-surface-variant rounded-xl text-[11px] font-heading font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">gps_off</span>
            <span>Perda GPS</span>
          </button>
        </div>

        {/* Zona Inferior de Ação: Prioridade Máxima Ergonômica */}
        <section className="flex flex-col gap-2.5 mt-auto pt-2">
          {/* Botão de Emergência SOS */}
          <div className="relative w-full">
            <button
              type="button"
              id="sosEmergencyBtn"
              onClick={handleSosClick}
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              className="w-full h-16 rounded-2xl bg-error text-on-error flex items-center justify-between px-5 shadow-xl hover:bg-error/95 active:scale-[0.98] transition-transform select-none relative overflow-hidden cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px] text-on-error" style={{ fontVariationSettings: "'FILL' 1" }}>
                    e911_emergency
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-heading font-bold text-sm tracking-wide text-on-error uppercase leading-tight">
                    Preciso de ajuda
                  </span>
                  <span className="font-sans text-[11px] text-on-error/85 mt-0.5">
                    {isHolding ? `Segurando... ${Math.round(holdProgress)}%` : 'Toque rápido ou segure 3s'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0">
                <span className="material-symbols-outlined text-[20px] text-on-error">
                  arrow_forward
                </span>
              </div>

              {/* Barra de Progresso Visual de Press-and-Hold */}
              <div
                className="absolute bottom-0 left-0 h-1.5 bg-white/80 transition-all duration-75"
                style={{ width: `${holdProgress}%` }}
              ></div>
            </button>
          </div>

          {/* Botão Secundário: Encerrar Trajeto */}
          <button
            type="button"
            onClick={onFinishRoute}
            className="w-full h-14 rounded-2xl bg-surface-container-highest text-on-surface flex items-center justify-center gap-2 hover:bg-surface-container active:scale-[0.98] transition-transform cursor-pointer border border-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px] text-tertiary">
              check_circle
            </span>
            <span className="font-heading font-semibold text-sm text-on-surface">
              Encerrar trajeto
            </span>
          </button>
        </section>
      </main>
    </div>
  );
};
