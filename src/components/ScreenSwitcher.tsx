import React from 'react';
import { ScreenType } from '../types';

interface ScreenSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
}) => {
  if (!isOpen) return null;

  const screens: { id: ScreenType; name: string; category: string; icon: string }[] = [
    { id: 'login', name: '1. Login & Cadastro', category: 'Acesso', icon: 'login' },
    { id: 'permissions', name: '2. Permissões Necessárias', category: 'Configuração', icon: 'verified_user' },
    { id: 'home', name: '3. Início (Home)', category: 'Principal', icon: 'home' },
    { id: 'active-route', name: '4. Trajeto Ativo', category: 'Monitoramento', icon: 'directions_walk' },
    { id: 'motion-alert', name: '5. Alerta de Movimento', category: 'Segurança', icon: 'sensors' },
    { id: 'emergency-help', name: '6. Ajuda de Emergência', category: 'Segurança', icon: 'e911_emergency' },
    { id: 'route-summary', name: '7. Resumo do Trajeto', category: 'Conclusão', icon: 'task_alt' },
    { id: 'history', name: '8. Histórico de Trajetos', category: 'Registros', icon: 'history' },
    { id: 'route-detail', name: '9. Detalhes do Trajeto', category: 'Registros', icon: 'alt_route' },
    { id: 'contacts', name: '10. Contatos de Confiança', category: 'Círculo Seguro', icon: 'group' },
    { id: 'gps-unavailable', name: '11. GPS Indisponível', category: 'Diagnóstico', icon: 'gps_off' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <h3 className="font-heading font-bold text-lg text-on-surface">
              Navegar pelas 11 Telas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant mt-2 mb-3">
          Selecione qualquer tela para visualizar seu design e testar interações diretamente:
        </p>

        <div className="overflow-y-auto space-y-1.5 flex-1 pr-1 -mr-1">
          {screens.map((screen) => {
            const isSelected = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => {
                  onSelectScreen(screen.id);
                  onClose();
                }}
                className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all duration-150 ${
                  isSelected
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high active:scale-[0.99]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-container-lowest text-primary shadow-xs'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {screen.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold block truncate leading-tight">
                      {screen.name}
                    </span>
                    <span
                      className={`text-[11px] block mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-tertiary'
                      }`}
                    >
                      {screen.category}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="material-symbols-outlined text-white text-[18px]">
                    check_circle
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-outline-variant text-[18px]">
                    chevron_right
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-surface-container-high flex justify-between items-center text-xs text-tertiary">
          <span>SafeWalk • Proteção Feminina</span>
          <button
            onClick={onClose}
            className="text-primary font-semibold hover:underline"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
