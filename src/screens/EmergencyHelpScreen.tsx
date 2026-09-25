import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ScreenType, UserProfile } from '../types';

interface EmergencyHelpScreenProps {
  user: UserProfile;
  onBack: () => void;
  onOpenScreenSwitcher?: () => void;
}

export const EmergencyHelpScreen: React.FC<EmergencyHelpScreenProps> = ({
  user,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [contactsAlerted, setContactsAlerted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleAlertContacts = () => {
    setContactsAlerted(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://safewalk.app/live/track-882f');
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'SafeWalk - Minha Rota ao Vivo',
          text: 'Estou acompanhando minha rota pelo SafeWalk. Acompanhe minha chegada segura.',
          url: 'https://safewalk.app/live/track-882f',
        })
        .catch(() => {});
    } else {
      handleCopyLink();
      alert('Link seguro de localização copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between">
      <Header
        subtitle="Ajuda De Emergência"
        showBack
        onBack={onBack}
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="emergency-help"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-8 px-4 flex flex-col">
        {/* Status de Proteção Ativa / Contexto da Sessão */}
        <div className="mt-1 mb-4 p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between shadow-xs border border-surface-container-high/50">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-xs font-bold text-on-surface">
                Monitoramento em Curso
              </span>
              <span className="font-sans text-[11px] text-tertiary">
                Sinal GPS de alta precisão ativo
              </span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-heading text-[10px] font-bold">
            Ao Vivo
          </span>
        </div>

        {/* Cabeçalho Acolhedor e Direto */}
        <div className="mb-5">
          <h1 className="font-heading font-bold text-2xl text-on-surface tracking-tight mb-1">
            Como podemos ajudar?
          </h1>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            Escolha uma ação imediata. Estamos conectados para manter você segura.
          </p>
        </div>

        {/* Ações Rápidas em Cards de Alta Prioridade */}
        <div className="flex flex-col gap-4">
          {/* Card 1: Avisar contato de confiança */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-4 shadow-xs border border-surface-container-high/50">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0 text-secondary">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield_person
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-heading text-sm font-bold text-on-surface">
                    Avisar contato de confiança
                  </h2>
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-heading text-[10px] font-bold px-2 py-0.5 rounded-full">
                    1 toque
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant mb-3 leading-relaxed">
                  Envie um alerta para um contato cadastrado.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleAlertContacts}
                    className={`w-full h-12 rounded-xl font-heading text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
                      contactsAlerted
                        ? 'bg-primary text-on-primary'
                        : 'bg-secondary text-on-secondary hover:bg-secondary/90'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {contactsAlerted ? 'done_all' : 'chat'}
                    </span>
                    <span>
                      {contactsAlerted ? 'Alerta Transmitido!' : 'Enviar SMS / WhatsApp'}
                    </span>
                  </button>

                  {contactsAlerted && (
                    <div className="flex items-center justify-center gap-1.5 py-1 text-primary font-heading text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>Mensagem transmitida para 3 guardiãs</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Compartilhar localização */}
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-4 shadow-xs border border-surface-container-high/50">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  share_location
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-heading text-sm font-bold text-on-surface mb-1">
                  Compartilhar localização
                </h2>
                <p className="font-sans text-xs text-on-surface-variant mb-3 leading-relaxed">
                  Compartilhe sua localização atual com link seguro com prazo expiração.
                </p>

                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-container-low mb-2.5 border border-surface-container-high/40">
                  <span className="material-symbols-outlined text-primary text-[18px] ml-1 shrink-0">
                    link
                  </span>
                  <span className="font-sans text-xs text-tertiary truncate flex-1 font-mono">
                    safewalk.app/live/track-882f
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1 rounded-lg bg-surface-container-highest text-on-surface font-heading text-[11px] font-bold hover:bg-surface-dim transition-colors shrink-0"
                  >
                    {copyFeedback ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full h-11 rounded-xl bg-primary-fixed text-on-primary-fixed font-heading text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Compartilhar Agora</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Discagem Rápida & Urgência Institucional */}
          <div className="rounded-2xl bg-surface-container-low p-3.5 flex flex-col gap-2.5 border border-surface-container-high/40">
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-heading text-[11px] font-bold uppercase tracking-wider">
                Canais Oficiais de Emergência
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="tel:190"
                className="h-12 rounded-xl bg-surface-container-lowest text-on-surface px-3 py-2 flex items-center justify-between shadow-xs active:scale-[0.98] transition-transform border border-surface-container-high/40 hover:bg-surface-container-low"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[20px]">local_police</span>
                  <div className="flex flex-col">
                    <span className="font-heading text-xs font-bold leading-tight">190</span>
                    <span className="font-sans text-[10px] text-tertiary">Polícia</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-tertiary text-[18px]">call</span>
              </a>

              <a
                href="tel:180"
                className="h-12 rounded-xl bg-surface-container-lowest text-on-surface px-3 py-2 flex items-center justify-between shadow-xs active:scale-[0.98] transition-transform border border-surface-container-high/40 hover:bg-surface-container-low"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span>
                  <div className="flex flex-col">
                    <span className="font-heading text-xs font-bold leading-tight">180</span>
                    <span className="font-sans text-[10px] text-tertiary">Apoio Mulher</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-tertiary text-[18px]">call</span>
              </a>
            </div>
          </div>

          {/* Botão Seguro de Retorno */}
          <div className="mt-2 pt-1 flex flex-col items-center">
            <button
              type="button"
              onClick={onBack}
              className="w-full h-14 rounded-2xl bg-surface-container text-on-surface font-heading text-xs font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span>Voltar ao trajeto ativo</span>
            </button>
            <span className="font-sans text-xs text-tertiary mt-2">
              Sua caminhada continuará protegida e monitorada.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
