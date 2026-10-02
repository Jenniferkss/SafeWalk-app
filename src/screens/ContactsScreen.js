import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";

export const ContactsScreen = ({
  user,
  contacts,
  onAddContact,
  onDeleteContact,
  onEditContact,
  onNavigate,
  onOpenScreenSwitcher,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [phone, setPhone] = useState("");
  const [receivesWhatsapp, setReceivesWhatsapp] = useState(true);

  const openAddModal = () => {
    setEditContactId(null);
    setName("");
    setRelationship("");
    setPhone("");
    setReceivesWhatsapp(true);
    setModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditContactId(contact.id);
    setName(contact.name);
    setRelationship(contact.relationship);
    setPhone(contact.phone);
    setReceivesWhatsapp(contact.receivesWhatsapp);
    setModalOpen(true);
  };

  const handleSave = () => {
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
        relationship: relationship || "Amiga",
        phone: phone || "(11) 90000-0000",
        receivesSms: true,
        receivesWhatsapp,
        active: true,
        initials: name.substring(0, 1).toUpperCase(),
        colorBg: "bg-primary-fixed",
        colorText: "text-on-primary-fixed",
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (contact) => {
    Alert.alert(
      "Remover contato",
      `Deseja remover ${contact.name} (${contact.relationship}) dos seus contatos de emergência?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => onDeleteContact(contact.id) },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <Header
        subtitle="Contatos De Confiança"
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="contacts"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.intro}>
          <Text style={styles.heading}>Contatos de confiança</Text>
          <Text style={styles.description}>
            Pessoas que podem acompanhar suas rotas e receber alertas.
          </Text>
        </View>

        <Pressable style={styles.addButton} onPress={openAddModal}>
          <View style={styles.addIcon}>
            <MaterialIcons name="add" size={22} color="#006951" />
          </View>
          <View>
            <Text style={styles.addTitle}>ADICIONAR CONTATO</Text>
            <Text style={styles.addSubtitle}>Incluir nova pessoa à sua rede segura</Text>
          </View>
        </Pressable>

        <View style={{ gap: 10 }}>
          {contacts.map((contact) => (
            <View key={contact.id} style={styles.contactCard}>
              <View style={styles.contactTop}>
                <View style={[styles.initials, { backgroundColor: "#D9F7ED" }]}>
                  <Text style={styles.initialsText}>{contact.initials}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRelation}>
                    Contato de confiança • {contact.relationship}
                  </Text>
                  <View style={styles.phoneRow}>
                    <MaterialIcons name="call" size={13} color="#77737E" />
                    <Text style={styles.phone}>{contact.phone}</Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <Pressable onPress={() => openEditModal(contact)} style={styles.smallButton}>
                    <MaterialIcons name="edit" size={18} color="#625F69" />
                  </Pressable>
                  <Pressable onPress={() => handleDelete(contact)} style={styles.smallButton}>
                    <MaterialIcons name="delete" size={18} color="#BA1A1A" />
                  </Pressable>
                </View>
              </View>

              <View style={styles.contactBottom}>
                <View style={styles.whatsappTag}>
                  <MaterialIcons
                    name={contact.receivesWhatsapp ? "chat" : "sms"}
                    size={13}
                    color="#006951"
                  />
                  <Text style={styles.tagText}>
                    {contact.receivesWhatsapp ? "Recebe SMS e WhatsApp" : "Recebe SMS"}
                  </Text>
                </View>

                <View style={styles.active}>
                  <View style={styles.activeDot} />
                  <Text style={styles.activeText}>Ativo</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <MaterialIcons name="lightbulb" size={20} color="#006951" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Dica de tranquilidade</Text>
            <Text style={styles.description}>
              Recomendamos manter entre 2 e 5 contatos próximos atualizados para garantir que alguém sempre visualize suas rotas noturnas.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav currentScreen="contacts" onNavigate={onNavigate} />

      <Modal
        visible={modalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editContactId ? "Editar contato seguro" : "Novo contato seguro"}
              </Text>
              <Pressable onPress={() => setModalOpen(false)} style={styles.closeButton}>
                <MaterialIcons name="close" size={20} color="#625F69" />
              </Pressable>
            </View>

            <Field label="Nome" value={name} onChangeText={setName} placeholder="Ex: Juliana" />
            <Field
              label="Parentesco ou relação"
              value={relationship}
              onChangeText={setRelationship}
              placeholder="Ex: Amiga, Colega de quarto, Irmã"
            />
            <Field
              label="WhatsApp / Telefone"
              value={phone}
              onChangeText={setPhone}
              placeholder="(11) 98000-0000"
              keyboardType="phone-pad"
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Enviar alertas via WhatsApp</Text>
              <Switch
                value={receivesWhatsapp}
                onValueChange={setReceivesWhatsapp}
                trackColor={{ false: "#CCC8D0", true: "#9ADFCB" }}
                thumbColor={receivesWhatsapp ? "#006951" : "#F4F3F4"}
              />
            </View>

            <Pressable style={styles.saveButton} onPress={handleSave}>
              <MaterialIcons name="check" size={20} color="#FFFFFF" />
              <Text style={styles.saveText}>
                {editContactId ? "Salvar Alterações" : "Salvar Contato"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Field = ({ label, value, onChangeText, placeholder, keyboardType = "default" }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#99959F"
      keyboardType={keyboardType}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F2F9" },
  content: { padding: 16, paddingBottom: 100, gap: 12 },
  intro: { marginBottom: 2 },
  heading: { fontSize: 23, fontWeight: "800", color: "#25232A" },
  description: { fontSize: 11, lineHeight: 17, color: "#625F69", marginTop: 3 },
  addButton: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 13, flexDirection: "row", alignItems: "center", gap: 11, borderWidth: 1, borderColor: "#E2DFE6" },
  addIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#D9F7ED", alignItems: "center", justifyContent: "center" },
  addTitle: { fontSize: 11, fontWeight: "800", color: "#006951" },
  addSubtitle: { fontSize: 10, color: "#77737E", marginTop: 2 },
  contactCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 15, borderWidth: 1, borderColor: "#E2DFE6" },
  contactTop: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  initials: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  initialsText: { fontSize: 15, fontWeight: "800", color: "#006951" },
  contactName: { fontSize: 13, fontWeight: "700", color: "#25232A" },
  contactRelation: { fontSize: 10, color: "#77737E", marginTop: 2 },
  phoneRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  phone: { fontSize: 10, color: "#625F69" },
  actions: { flexDirection: "row", gap: 3 },
  smallButton: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  contactBottom: { borderTopWidth: 1, borderTopColor: "#F0EEF3", marginTop: 12, paddingTop: 9, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  whatsappTag: { backgroundColor: "#E4F6EF", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, flexDirection: "row", alignItems: "center", gap: 4 },
  tagText: { fontSize: 9, fontWeight: "600", color: "#006951" },
  active: { flexDirection: "row", alignItems: "center", gap: 4 },
  activeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#006951" },
  activeText: { fontSize: 10, fontWeight: "700", color: "#006951" },
  tipCard: { backgroundColor: "#ECE9EF", borderRadius: 16, padding: 14, flexDirection: "row", gap: 10 },
  tipIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#E2E0E6", alignItems: "center", justifyContent: "center" },
  tipTitle: { fontSize: 11, fontWeight: "700", color: "#25232A" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,.4)", justifyContent: "flex-end" },
  modal: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 },
  modalTitle: { fontSize: 18, fontWeight: "800", color: "#25232A" },
  closeButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#ECE9EF", alignItems: "center", justifyContent: "center" },
  field: { marginBottom: 12 },
  label: { fontSize: 11, fontWeight: "700", color: "#625F69", marginBottom: 5 },
  input: { height: 48, borderRadius: 12, backgroundColor: "#F0EEF3", paddingHorizontal: 14, fontSize: 13, color: "#25232A", borderWidth: 1, borderColor: "#E2DFE6" },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 5 },
  switchLabel: { fontSize: 11, fontWeight: "600", color: "#25232A" },
  saveButton: { height: 54, borderRadius: 16, backgroundColor: "#006951", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 10 },
  saveText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
});
