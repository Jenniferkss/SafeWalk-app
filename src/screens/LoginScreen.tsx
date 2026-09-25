import React, { useState } from 'react';
import { SAFEWALK_ASSETS } from '../data/mockData';
import { ScreenType } from '../types';

interface LoginScreenProps {
  onSuccess: (screen: ScreenType) => void;
  onOpenScreenSwitcher?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSuccess,
  onOpenScreenSwitcher,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('sofia@exemplo.com');
  const [password, setPassword] = useState('••••••••••••');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(mode === 'login' ? 'Conectando ao SafeWalk...' : 'Criando conta protegida...');
    setTimeout(() => {
      onSuccess('permissions');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col justify-between max-w-lg mx-auto px-5 py-6">
      {/* Top Bar Action for testing */}
      <div className="flex justify-end">
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

      <div className="flex flex-col w-full">
        {/* Brand Header & Mascot Hero */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="relative mb-2 flex items-center justify-center">
            <div className="absolute -inset-2 bg-primary-fixed/40 rounded-full blur-xl pointer-events-none"></div>
            <img
              alt="SafeWalk Logotipo"
              className="relative w-20 h-20 rounded-2xl object-cover shadow-sm"
              src={SAFEWALK_ASSETS.logoMain}
            />
          </div>

          <div className="flex items-center gap-1.5 justify-center mb-1">
            <h1 className="font-heading font-bold text-2xl text-on-surface tracking-tight">
              SafeWalk
            </h1>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </span>
          </div>

          <p className="font-sans text-sm text-on-surface-variant max-w-[280px]">
            Sua caminhada com segurança e tranquilidade
          </p>

          {/* Warm micro-badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-heading text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span>Rede ativa de proteção feminina</span>
          </div>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="bg-surface-container-high p-1 rounded-2xl flex relative mb-5 shadow-xs">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-xl font-heading text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">login</span>
            <span>Entrar</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 rounded-xl font-heading text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            <span>Criar conta</span>
          </button>
        </div>

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {mode === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label className="font-heading text-xs font-semibold text-on-surface px-1">
                Como prefere ser chamada?
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-xl pointer-events-none">
                  sentiment_satisfied
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome ou apelido carinhoso"
                  className="w-full h-[52px] pl-12 pr-4 bg-surface-container-lowest rounded-2xl font-sans text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
                />
              </div>
            </div>
          )}

          {/* Email / Celular field */}
          <div className="flex flex-col gap-1.5">
            <label className="font-heading text-xs font-semibold text-on-surface px-1">
              Email ou Celular
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-xl pointer-events-none">
                alternate_email
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com ou telefone"
                className="w-full h-[52px] pl-12 pr-4 bg-surface-container-lowest rounded-2xl font-sans text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="font-heading text-xs font-semibold text-on-surface">
                Senha de Acesso
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Link de recuperação enviado para seu email ou WhatsApp!')}
                  className="font-heading text-[11px] font-bold text-secondary hover:text-on-secondary-fixed transition-colors"
                >
                  Esqueci minha senha
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-xl pointer-events-none">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha segura"
                className="w-full h-[52px] pl-12 pr-12 bg-surface-container-lowest rounded-2xl font-sans text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Security & Privacy Reassurance Notice */}
          <div className="p-3.5 rounded-2xl bg-tertiary-fixed/60 text-on-tertiary-fixed flex items-start gap-3 shadow-xs">
            <div className="p-1.5 rounded-xl bg-surface-container-lowest text-primary shrink-0 shadow-xs mt-0.5">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xs font-bold leading-snug">
                Criptografia de Ponta a Ponta
              </span>
              <span className="font-sans text-xs text-on-surface-variant mt-0.5">
                Seus dados e trajetos são visíveis apenas para os contatos de confiança autorizados por você.
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full h-14 rounded-2xl bg-primary text-on-primary font-heading text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.98] transition-all mt-1"
          >
            <span>{mode === 'login' ? 'ENTRAR NO SAFEWALK' : 'CRIAR MINHA CONTA PROTEGIDA'}</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>

          {feedbackMsg && (
            <p className="text-center text-xs text-primary font-semibold animate-pulse">
              {feedbackMsg}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-[1px] bg-outline-variant/50"></div>
          <span className="absolute bg-background px-3 font-sans text-xs text-on-surface-variant">
            ou continue com
          </span>
        </div>

        {/* Social Auth Options */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => onSuccess('permissions')}
            className="h-12 px-4 rounded-2xl bg-surface-container-lowest text-on-surface font-heading text-xs font-semibold flex items-center justify-center gap-2.5 shadow-xs active:scale-[0.98] transition-all hover:bg-surface-container-low"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => onSuccess('permissions')}
            className="h-12 px-4 rounded-2xl bg-surface-container-lowest text-on-surface font-heading text-xs font-semibold flex items-center justify-center gap-2.5 shadow-xs active:scale-[0.98] transition-all hover:bg-surface-container-low"
          >
            <svg className="w-4 h-4 shrink-0 fill-current text-on-surface" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.65 1.37-.56.65-.99 1.71-.86 2.73 1.05.08 2.05-.54 2.59-1.23z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Trust Guarantee Banner */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-lowest shadow-xs mb-4">
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xs font-bold text-on-surface">
              Feito por e para mulheres
            </span>
            <span className="font-sans text-xs text-on-surface-variant">
              Espaço acolhedor, sem julgamentos e 100% focado no seu bem-estar.
            </span>
          </div>
        </div>
      </div>

      {/* Discreet Footer Terms */}
      <div className="pt-2 text-center flex flex-col gap-1 mt-auto">
        <p className="font-sans text-xs text-on-surface-variant">
          Ao prosseguir, você concorda com nossos{' '}
          <button type="button" onClick={() => alert('Termos de Uso do SafeWalk: Segurança privada, sigilo total e prioridade de proteção.')} className="font-heading font-semibold text-primary underline">
            Termos de Uso
          </button>{' '}
          e nossa{' '}
          <button type="button" onClick={() => alert('Política de Privacidade Feminina: Nenhum compartilhamento com terceiros não autorizados. Trajetos criptografados.')} className="font-heading font-semibold text-primary underline">
            Política de Privacidade Feminina
          </button>.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-on-surface-variant font-heading text-[11px] font-bold mt-1">
          <span className="material-symbols-outlined text-sm text-primary">lock_clock</span>
          <span>Seus passos protegidos em cada esquina</span>
        </div>
      </div>
    </div>
  );
};
