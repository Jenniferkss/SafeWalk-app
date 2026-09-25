import React, { useState } from 'react';
import { ScreenType } from '../types';

interface PermissionsScreenProps {
  onConfirm: () => void;
  onBack: () => void;
  onOpenScreenSwitcher?: () => void;
}

export const PermissionsScreen: React.FC<PermissionsScreenProps> = ({
  onConfirm,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [sensorsEnabled, setSensorsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between max-w-lg mx-auto px-5 py-6">
      {/* Top action */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>

        {onOpenScreenSwitcher && (
          <button
            onClick={onOpenScreenSwitcher}
            className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wide flex items-center gap-1 shadow-xs hover:bg-secondary-fixed-dim transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">layers</span>
            <span>Ver Telas</span>
          </button>
        )}
      </div>

      <div className="flex flex-col w-full my-auto">
        {/* Top Visual Accent / Shield Aura Graphic */}
        <div className="w-full flex flex-col items-center justify-center pb-4">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-secondary-fixed">
            <div className="absolute inset-0 rounded-full bg-primary-fixed opacity-60 animate-ping"></div>
            <div className="relative z-10 w-14 h-14 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
          </div>
        </div>

        {/* Header Typography Area */}
        <div className="flex flex-col gap-1 text-center mb-6">
          <h1 className="font-heading font-bold text-2xl text-on-surface">
            Permissões necessárias
          </h1>
          <p className="font-sans text-sm text-on-surface-variant max-w-xs mx-auto leading-relaxed">
            Para acompanhar seu trajeto e utilizar os recursos de segurança, o SafeWalk precisa acessar alguns recursos do seu celular.
          </p>
        </div>

        {/* Permission Cards Container */}
        <div className="flex flex-col gap-4 w-full mb-6">
          {/* Card 1: Localização */}
          <div className="w-full bg-surface-container-lowest rounded-3xl p-4 shadow-xs transition-all duration-200 border border-surface-container-high/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Localização
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-primary font-heading text-[11px] font-bold">
                    Necessária
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant mb-3 leading-relaxed">
                  Necessária para acompanhar e compartilhar sua localização durante o trajeto.
                </p>

                {/* Interactive Micro-Control */}
                <div className="flex items-center justify-between pt-1 border-t border-surface-container-low">
                  <span className="font-heading text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                    Acesso em segundo plano
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={locationEnabled}
                    onClick={() => setLocationEnabled(!locationEnabled)}
                    className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none flex items-center cursor-pointer ${
                      locationEnabled ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full bg-surface-container-lowest shadow-xs transform transition-transform duration-200 ease-in-out flex items-center justify-center text-primary text-[14px] ${
                        locationEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    >
                      {locationEnabled ? (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      ) : null}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Sensores */}
          <div className="w-full bg-surface-container-lowest rounded-3xl p-4 shadow-xs transition-all duration-200 border border-surface-container-high/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  vibration
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-heading text-sm font-bold text-on-surface">
                    Sensores
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-heading text-[11px] font-bold">
                    Necessários
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant mb-3 leading-relaxed">
                  Utilizados para identificar mudanças inesperadas de movimento e paradas abruptas.
                </p>

                {/* Interactive Micro-Control */}
                <div className="flex items-center justify-between pt-1 border-t border-surface-container-low">
                  <span className="font-heading text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                    Giroscópio & Movimento
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={sensorsEnabled}
                    onClick={() => setSensorsEnabled(!sensorsEnabled)}
                    className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none flex items-center cursor-pointer ${
                      sensorsEnabled ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full bg-surface-container-lowest shadow-xs transform transition-transform duration-200 ease-in-out flex items-center justify-center text-primary text-[14px] ${
                        sensorsEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    >
                      {sensorsEnabled ? (
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      ) : null}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Trust Reassurance Shield Box */}
        <div className="w-full bg-surface-container-low rounded-2xl p-4 flex items-start gap-3 mb-6">
          <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            lock
          </span>
          <p className="font-sans text-xs text-tertiary leading-relaxed">
            Seus dados de trajeto são criptografados de ponta a ponta e visíveis apenas para os contatos de confiança que você autorizar expressamente.
          </p>
        </div>
      </div>

      {/* Action Thumb Zone */}
      <div className="flex flex-col gap-2.5 w-full mt-auto">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full h-14 bg-primary text-on-primary rounded-2xl font-heading text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform duration-150 hover:bg-primary-container"
        >
          <span>PERMITIR ACESSO</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full h-12 bg-transparent text-tertiary rounded-2xl font-heading text-xs font-semibold flex items-center justify-center hover:bg-surface-container-low transition-colors duration-150"
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
};
