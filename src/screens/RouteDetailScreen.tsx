import React from 'react';
import { Header } from '../components/Header';
import { RouteRecord, ScreenType, UserProfile } from '../types';

interface RouteDetailScreenProps {
  user: UserProfile;
  route: RouteRecord;
  onRepeatRoute: (route: RouteRecord) => void;
  onBack: () => void;
  onOpenScreenSwitcher?: () => void;
}

export const RouteDetailScreen: React.FC<RouteDetailScreenProps> = ({
  user,
  route,
  onRepeatRoute,
  onBack,
  onOpenScreenSwitcher,
}) => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between">
      <Header
        subtitle="Detalhes Do Trajeto"
        showBack
        onBack={onBack}
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="route-detail"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-8 px-4 flex flex-col gap-4">
        {/* Top Action / Back Link */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1 text-primary font-heading text-xs font-semibold py-1 -ml-1 transition-transform active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Voltar ao Histórico</span>
          </button>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-heading text-[11px] font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Registro Verificado</span>
          </span>
        </div>

        {/* Route Title & Primary Status Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/50 flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">alt_route</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-on-surface leading-tight">
                {route.title}
              </h1>
              <p className="font-sans text-xs text-tertiary">
                {route.dateStr} • {route.timeRange}
              </p>
            </div>
          </div>

          <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-heading text-xs font-bold self-start">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span>Trajeto Concluído em Segurança ✓</span>
          </div>
        </div>

        {/* Essential Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Duration Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-xs border border-surface-container-high/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-xs text-tertiary truncate">Duração</span>
              <span className="font-heading font-bold text-base text-on-surface">
                {route.durationMin} min
              </span>
            </div>
          </div>

          {/* Distance Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-xs border border-surface-container-high/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-[20px]">straighten</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-xs text-tertiary truncate">Distância</span>
              <span className="font-heading font-bold text-base text-on-surface">
                {route.distanceKm} km
              </span>
            </div>
          </div>

          {/* Overall Status Card */}
          <div className="col-span-2 bg-surface-container-lowest rounded-2xl p-3.5 shadow-xs border border-surface-container-high/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                security
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-[10px] font-bold text-tertiary uppercase tracking-wider">
                Integridade da Rota
              </span>
              <span className="font-heading text-xs font-semibold text-on-surface truncate">
                100% monitorado • Sem alertas de movimento
              </span>
            </div>
          </div>
        </div>

        {/* High-Definition Stylized Vector Map Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">map</span>
              <span className="font-heading text-xs font-bold text-on-surface">
                Mapa do Percurso
              </span>
            </div>
            <span className="font-heading text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant">
              GPS Ativo • Alta Precisão
            </span>
          </div>

          {/* Clean Map Illustration Canvas */}
          <div className="relative w-full h-56 rounded-xl bg-surface-container-low overflow-hidden border border-surface-container-high/40 flex items-center justify-center">
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 360 250"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Roads */}
              <path d="M 0,40 L 360,40" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="8" />
              <path d="M 0,110 L 360,110" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="12" />
              <path d="M 0,195 L 360,195" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="10" />
              <path d="M 70,0 L 70,250" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="9" />
              <path d="M 180,0 L 180,250" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="11" />
              <path d="M 290,0 L 290,250" stroke="#E4E1E8" strokeLinecap="round" strokeWidth="9" />

              {/* Safe Corridor Halo Zone */}
              <path
                d="M 70,195 L 70,110 Q 70,80 100,80 L 180,80 L 180,40 L 290,40"
                opacity="0.45"
                stroke="#9AF4D4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />

              {/* Walked Route Vector */}
              <path
                d="M 70,195 L 70,110 Q 70,80 100,80 L 180,80 L 180,40 L 290,40"
                stroke="#006951"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              />

              {/* Mid Checkpoint */}
              <circle cx="180" cy="80" fill="#645494" r="7" />
              <circle cx="180" cy="80" fill="#FFFFFF" r="3" />

              {/* Start Marker */}
              <g transform="translate(70, 195)">
                <circle cx="0" cy="0" fill="#006951" opacity="0.2" r="14" />
                <circle cx="0" cy="0" fill="#006951" r="8" />
                <circle cx="0" cy="0" fill="#FFFFFF" r="3.5" />
              </g>

              {/* Destination Marker */}
              <g transform="translate(290, 40)">
                <circle cx="0" cy="0" fill="#006951" opacity="0.2" r="16" />
                <circle cx="0" cy="0" fill="#006951" r="9" />
                <path d="M -4,-2 L -1,2 L 4,-3" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>

            {/* Dynamic Safe Beacon Card Overlay */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-2.5 shadow-xs flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-heading text-[11px] font-semibold text-on-surface">
                  Ponto Seguro Monitorado: {route.safeZoneHub || 'Farmácia 24h • Km 0.9'}
                </span>
              </div>
              <span className="material-symbols-outlined text-secondary text-[16px]">
                local_convenience_store
              </span>
            </div>
          </div>

          {/* Departure & Arrival Address Details */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-start gap-2.5">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </div>
                <div className="w-0.5 h-6 bg-surface-container-high my-0.5"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-heading text-[10px] font-bold text-tertiary uppercase">
                  Partida
                </span>
                <span className="font-sans text-xs font-semibold text-on-surface truncate">
                  {route.origin}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 -mt-2">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3.5 h-3.5 rounded-full bg-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[10px] text-white">school</span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-heading text-[10px] font-bold text-tertiary uppercase">
                  Chegada
                </span>
                <span className="font-sans text-xs font-semibold text-on-surface truncate">
                  {route.destination}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Circle Network Companions Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/50 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">group</span>
              <span className="font-heading text-xs font-bold text-on-surface">
                Rede de Confiança Ativa
              </span>
            </div>
            <span className="font-heading text-[11px] font-bold text-primary">
              {route.guardiansNotified} Notificados
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1 bg-surface-container-low rounded-xl p-2.5 border border-surface-container-high/30">
            <div className="flex -space-x-2 shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-heading text-xs font-bold shadow-xs">
                M
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-heading text-xs font-bold shadow-xs">
                A
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-sans text-xs text-on-surface font-medium leading-snug">
                {route.guardianNames.join(' e ')} acompanharam sua rota em tempo real.
              </p>
              <span className="font-sans text-[11px] text-tertiary">
                Nenhuma anormalidade reportada pelas guardiãs.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Ergonomic Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1 mt-auto">
          <button
            type="button"
            onClick={() => onRepeatRoute(route)}
            className="w-full h-14 bg-primary text-on-primary rounded-2xl font-heading text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] hover:bg-primary-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">replay</span>
            <span>REPETIR ESTE TRAJETO</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full h-12 bg-surface-container-low text-tertiary rounded-2xl font-heading text-xs font-semibold flex items-center justify-center gap-2 transition-colors hover:bg-surface-container active:scale-[0.99] border border-surface-container-high/40 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span>VOLTAR AO HISTÓRICO</span>
          </button>
        </div>
      </main>
    </div>
  );
};
