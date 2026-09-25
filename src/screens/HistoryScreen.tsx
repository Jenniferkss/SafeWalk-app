import React, { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { RouteRecord, ScreenType, UserProfile } from '../types';

interface HistoryScreenProps {
  user: UserProfile;
  routes: RouteRecord[];
  onSelectRoute: (route: RouteRecord) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenScreenSwitcher?: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  user,
  routes,
  onSelectRoute,
  onNavigate,
  onOpenScreenSwitcher,
}) => {
  const [filterActive, setFilterActive] = useState<'all' | 'safe'>('all');

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <Header
        subtitle="Histórico"
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="history"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-28 px-4 flex flex-col">
        {/* Top actions & Month picker */}
        <div className="flex items-center justify-between py-1 mb-2">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1 text-primary font-heading text-xs font-semibold active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back_ios</span>
            <span>Voltar ao Início</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-heading text-[11px] font-semibold shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_month
            </span>
            <span>Outubro 2024</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="flex flex-col gap-0.5 mb-4">
          <h1 className="font-heading font-bold text-2xl text-on-surface tracking-tight">
            Histórico
          </h1>
          <p className="font-sans text-xs text-on-surface-variant">
            Seus trajetos protegidos recentemente
          </p>
        </div>

        {/* Resumo Mensal Card */}
        <div className="relative overflow-hidden rounded-3xl bg-surface-container-lowest p-5 shadow-xs border border-surface-container-high/50 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 z-10">
              <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-primary">
                Resumo mensal
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading text-3xl font-bold text-on-surface">42</span>
                <span className="font-sans text-xs text-on-surface-variant">caminhadas seguras</span>
              </div>
              <p className="font-sans text-[11px] text-tertiary mt-0.5">
                Total de 42 trajetos protegidos este mês.
              </p>
            </div>

            <div className="relative w-14 h-14 rounded-2xl bg-tertiary-fixed/40 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-fixed-dim rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-heading text-[11px] font-semibold bg-surface-container-low/70 rounded-xl px-3 py-2 border border-surface-container-high/40">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">near_me</span>
              <span>54,6 km percorridos</span>
            </div>
            <div className="h-3 w-[1px] bg-outline-variant"></div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">share_location</span>
              <span>100% monitorado</span>
            </div>
          </div>
        </div>

        {/* Section Title & Filter */}
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-tertiary">
            Trajetos Concluídos
          </span>
          <button
            type="button"
            onClick={() => setFilterActive(filterActive === 'all' ? 'safe' : 'all')}
            className="font-heading text-xs text-primary font-semibold hover:underline"
          >
            Filtros {filterActive === 'safe' ? '(100% Seguros)' : ''}
          </button>
        </div>

        {/* Lista de Trajetos */}
        <div className="flex flex-col gap-3">
          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => onSelectRoute(route)}
              role="button"
              tabIndex={0}
              className="group w-full rounded-2xl bg-surface-container-lowest p-3.5 shadow-xs border border-surface-container-high/50 active:scale-[0.99] hover:border-primary/40 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center shrink-0 text-primary mt-0.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      {route.title.includes('Escola') ? 'school' : route.title.includes('Metrô') ? 'commute' : 'directions_walk'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h2 className="font-heading text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                      {route.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-sans text-xs mt-0.5">
                      <span>{route.dateStr}</span>
                    </div>
                    <div className="flex items-center gap-2 text-tertiary font-sans text-xs mt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {route.durationMin} min
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">straighten</span>
                        {route.distanceKm} km
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-heading text-[10px] font-bold">
                    <span>Seguro</span>
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all text-[20px]">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Reassurance Footer */}
        <div className="mt-8 flex flex-col items-center justify-center py-4 text-center">
          <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline mb-2">
            <span className="material-symbols-outlined text-[18px]">lock</span>
          </div>
          <span className="font-heading text-xs font-semibold text-on-surface-variant">
            Seus dados de rotas são criptografados de ponta a ponta
          </span>
          <span className="font-sans text-xs text-tertiary mt-0.5">
            Visíveis apenas para você e seus contatos durante a caminhada.
          </span>
        </div>
      </main>

      <BottomNav currentScreen="history" onNavigate={onNavigate} />
    </div>
  );
};
