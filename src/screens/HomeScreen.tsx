import React from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { SAFEWALK_ASSETS } from '../data/mockData';
import { ScreenType, UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  contactsCount: number;
  completedRoutesCount: number;
  onNavigate: (screen: ScreenType) => void;
  onStartRoute: (destinationTitle?: string) => void;
  onOpenScreenSwitcher?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  contactsCount,
  completedRoutesCount,
  onNavigate,
  onStartRoute,
  onOpenScreenSwitcher,
}) => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <Header
        subtitle="Home"
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="home"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-28 px-4 space-y-5">
        {/* Bloco de Acolhimento & Status do Sistema */}
        <section className="flex flex-col space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-heading text-[11px] font-bold tracking-wide">
                Sistema pronto e protegido
              </span>
            </div>

            <div className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">battery_charging_full</span>
              <span className="font-heading text-xs font-semibold">{user.batteryLevel}%</span>
            </div>
          </div>

          <div>
            <h1 className="font-heading text-2xl font-bold text-on-surface">
              Olá, {user.name}
            </h1>
            <p className="font-sans text-sm text-on-surface-variant">
              Para onde vamos hoje?
            </p>
          </div>
        </section>

        {/* Aura Central & Identidade SafeWalk */}
        <section className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-surface-container-lowest shadow-sm overflow-hidden text-center border border-surface-container-high/50">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none"></div>

          <div className="relative flex items-center justify-center mb-3">
            <div className="absolute w-28 h-28 rounded-full bg-primary-fixed animate-pulse opacity-60"></div>
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-surface-container-lowest p-2 shadow-xs flex items-center justify-center">
              <img
                alt="SafeWalk Shield Logo"
                className="w-full h-full object-contain"
                src={SAFEWALK_ASSETS.logoShield}
              />
            </div>
          </div>

          <h2 className="relative z-10 font-heading text-base font-bold text-primary">
            Sua segurança durante o caminho
          </h2>
          <p className="relative z-10 font-sans text-xs text-on-surface-variant mt-1 max-w-[270px] leading-relaxed">
            Monitoramento discreto em tempo real, acionamento assistido e conexão imediata com quem você ama.
          </p>
        </section>

        {/* Ação Heroica Principal */}
        <section className="w-full">
          <button
            type="button"
            onClick={() => onStartRoute('Casa')}
            className="w-full h-16 rounded-2xl bg-primary text-on-primary font-heading font-bold text-base flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] hover:bg-primary-container transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              directions_walk
            </span>
            <span className="tracking-wide">INICIAR TRAJETO</span>
          </button>
        </section>

        {/* Atalhos de Destino Rápido (1 Toque) */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-heading text-xs font-semibold text-on-surface">
              Destinos frequentes
            </span>
            <button
              onClick={() => onNavigate('history')}
              className="font-heading text-xs text-primary font-semibold hover:underline"
            >
              Ver todos
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onStartRoute('Casa')}
              className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest shadow-xs active:scale-[0.97] transition-transform text-left border border-surface-container-high/40 hover:bg-surface-container-low cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">home</span>
              </div>
              <div className="min-w-0">
                <span className="font-heading text-xs font-bold text-on-surface block truncate">
                  Casa
                </span>
                <span className="font-sans text-[11px] text-on-surface-variant block truncate">
                  18 min a pé
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onStartRoute('Trabalho')}
              className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-lowest shadow-xs active:scale-[0.97] transition-transform text-left border border-surface-container-high/40 hover:bg-surface-container-low cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
              </div>
              <div className="min-w-0">
                <span className="font-heading text-xs font-bold text-on-surface block truncate">
                  Trabalho
                </span>
                <span className="font-sans text-[11px] text-on-surface-variant block truncate">
                  Avenida Paulista
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Cards Estruturados de Acesso Rápido - Painel de Proteção */}
        <section className="space-y-2">
          <span className="font-heading text-xs font-semibold text-on-surface px-1">
            Painel de proteção
          </span>
          <div className="flex flex-col space-y-2.5">
            {/* Card Contatos de Confiança */}
            <div
              onClick={() => onNavigate('contacts')}
              className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40 hover:bg-surface-container-low transition-colors cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">supervised_user_circle</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading text-xs font-bold text-on-surface">
                      Círculo de Confiança
                    </span>
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                  </div>
                  <span className="font-sans text-xs text-on-surface-variant">
                    {contactsCount} contatos recebem alertas
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[22px]">
                chevron_right
              </span>
            </div>

            {/* Card Histórico de Trajetos */}
            <div
              onClick={() => onNavigate('history')}
              className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40 hover:bg-surface-container-low transition-colors cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">route</span>
                </div>
                <div>
                  <span className="font-heading text-xs font-bold text-on-surface block">
                    Histórico de Trajetos
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant block">
                    {completedRoutesCount} trajetos concluídos em paz
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed-dim/40 text-on-primary-fixed font-heading text-[10px] font-bold">
                  100% seguros
                </span>
                <span className="material-symbols-outlined text-outline-variant text-[22px]">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Card Configurações & Sensores (pode acionar alerta de teste) */}
            <div
              onClick={() => onNavigate('motion-alert')}
              className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40 hover:bg-surface-container-low transition-colors cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">tune</span>
                </div>
                <div>
                  <span className="font-heading text-xs font-bold text-on-surface block">
                    Sensores e Alertas
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant block">
                    Sensibilidade de paradas: Calibrada
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[22px]">
                chevron_right
              </span>
            </div>
          </div>
        </section>

        {/* Mensagem de Cuidado & Acolhimento no Rodapé */}
        <section className="p-4 rounded-2xl bg-primary-fixed/30 flex items-start gap-3 border border-primary-fixed/40">
          <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Seus sensores e contatos de confiança estarão vigilantes a cada passo. Caminhe no seu ritmo, nós cuidamos do resto.
          </p>
        </section>
      </main>

      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
};
