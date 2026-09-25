import React, { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { Contact, ScreenType, UserProfile } from '../types';

interface ContactsScreenProps {
  user: UserProfile;
  contacts: Contact[];
  onAddContact: (contact: Omit<Contact, 'id'>) => void;
  onDeleteContact: (id: string) => void;
  onEditContact: (id: string, updated: Partial<Contact>) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenScreenSwitcher?: () => void;
}

export const ContactsScreen: React.FC<ContactsScreenProps> = ({
  user,
  contacts,
  onAddContact,
  onDeleteContact,
  onEditContact,
  onNavigate,
  onOpenScreenSwitcher,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editContactId, setEditContactId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [receivesWhatsapp, setReceivesWhatsapp] = useState(true);

  const openAddModal = () => {
    setEditContactId(null);
    setName('');
    setRelationship('');
    setPhone('');
    setReceivesWhatsapp(true);
    setModalOpen(true);
  };

  const openEditModal = (c: Contact) => {
    setEditContactId(c.id);
    setName(c.name);
    setRelationship(c.relationship);
    setPhone(c.phone);
    setReceivesWhatsapp(c.receivesWhatsapp);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editContactId) {
      onEditContact(editContactId, {
        name,
        relationship,
        phone,
        receivesWhatsapp,
        initials: name.substring(0, 1).toUpperCase(),
      });
    } else {
      onAddContact({
        name,
        relationship: relationship || 'Amiga',
        phone: phone || '(11) 90000-0000',
        receivesSms: true,
        receivesWhatsapp,
        active: true,
        initials: name.substring(0, 1).toUpperCase(),
        colorBg: 'bg-primary-fixed',
        colorText: 'text-on-primary-fixed',
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (contact: Contact) => {
    if (confirm(`Deseja remover ${contact.name} (${contact.relationship}) dos seus contatos de emergência?`)) {
      onDeleteContact(contact.id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <Header
        subtitle="Contatos De Confiança"
        avatarUrl={user.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="contacts"
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 pb-28 px-4 flex flex-col">
        {/* Header Introduction */}
        <div className="mt-1 mb-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              supervised_user_circle
            </span>
            <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-primary">
              Círculo de Proteção
            </span>
          </div>
          <h2 className="font-heading font-bold text-2xl text-on-surface">
            Contatos de confiança
          </h2>
          <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
            Estas pessoas receberão sua localização e alertas automáticos em caso de emergência.
          </p>
        </div>

        {/* Rede Ativa & Protegida Card */}
        <div className="mb-4 bg-tertiary-fixed/30 rounded-2xl p-4 flex items-center justify-between shadow-xs border border-tertiary-fixed/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-heading font-bold text-base shadow-xs">
              {contacts.length}
            </div>
            <div>
              <p className="font-heading text-xs font-bold text-on-tertiary-fixed">
                Rede Ativa & Protegida
              </p>
              <p className="font-sans text-xs text-tertiary">
                {contacts.length} contatos sincronizados
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
        </div>

        {/* Adicionar Contato Button */}
        <button
          type="button"
          onClick={openAddModal}
          className="w-full mb-4 bg-surface-container-low hover:bg-secondary-fixed/40 transition-all duration-200 active:scale-[0.99] rounded-2xl p-3.5 flex items-center justify-center gap-3 shadow-xs group border border-surface-container-high/50 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary transition-transform group-hover:rotate-90 duration-300">
            <span className="material-symbols-outlined text-[22px]">add</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-xs text-secondary">
              ADICIONAR CONTATO
            </span>
            <span className="font-sans text-[11px] text-tertiary">
              Incluir nova pessoa à sua rede segura
            </span>
          </div>
        </button>

        {/* Contacts List */}
        <div className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-heading font-bold text-base shrink-0 shadow-xs ${
                      contact.colorBg
                    } ${contact.colorText}`}
                  >
                    {contact.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading font-bold text-sm text-on-surface truncate">
                      {contact.name}
                    </h3>
                    <p className="font-sans text-xs text-tertiary truncate">
                      Contato de confiança • {contact.relationship}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[13px]">call</span>
                      <span className="font-sans text-xs tracking-wide">{contact.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Editar ${contact.name}`}
                    onClick={() => openEditModal(contact)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Remover ${contact.name}`}
                    onClick={() => handleDelete(contact)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-surface-container-low flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined text-[13px]">
                    {contact.receivesWhatsapp ? 'chat' : 'sms'}
                  </span>
                  <span className="font-heading text-[10px] font-semibold">
                    {contact.receivesWhatsapp ? 'Recebe SMS e WhatsApp' : 'Recebe SMS'}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-primary font-heading text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Ativo
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dica de Tranquilidade */}
        <div className="mt-6 bg-surface-container rounded-2xl p-4 flex items-start gap-3 shadow-xs border border-surface-container-high/40">
          <div className="p-2 rounded-xl bg-surface-container-highest text-secondary shrink-0">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <p className="font-heading text-xs font-bold text-on-surface">
              Dica de tranquilidade
            </p>
            <p className="font-sans text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Recomendamos manter entre 2 e 5 contatos próximos atualizados para garantir que alguém sempre visualize suas rotas noturnas.
            </p>
          </div>
        </div>

        {/* Modal de Adicionar / Editar Contato */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl w-full max-w-lg p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg text-on-surface">
                  {editContactId ? 'Editar contato seguro' : 'Novo contato seguro'}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-3.5 mb-5">
                <div>
                  <label className="font-heading text-xs font-semibold text-on-surface-variant mb-1 block">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Juliana"
                    className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-high/40"
                  />
                </div>

                <div>
                  <label className="font-heading text-xs font-semibold text-on-surface-variant mb-1 block">
                    Parentesco ou relação
                  </label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="Ex: Amiga, Colega de quarto, Irmã"
                    className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-high/40"
                  />
                </div>

                <div>
                  <label className="font-heading text-xs font-semibold text-on-surface-variant mb-1 block">
                    WhatsApp / Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 98000-0000"
                    className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-high/40"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-heading text-xs text-on-surface font-semibold">
                    Enviar alertas via WhatsApp
                  </span>
                  <input
                    type="checkbox"
                    checked={receivesWhatsapp}
                    onChange={(e) => setReceivesWhatsapp(e.target.checked)}
                    className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-primary text-on-primary font-heading text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform hover:bg-primary-container cursor-pointer mt-2"
                >
                  <span className="material-symbols-outlined text-[20px]">check</span>
                  <span>{editContactId ? 'Salvar Alterações' : 'Salvar Contato'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <BottomNav currentScreen="contacts" onNavigate={onNavigate} />
    </div>
  );
};
