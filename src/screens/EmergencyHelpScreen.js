import React, { useState } from "react";
import { Alert, Linking, Pressable, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../components/Header";

export const EmergencyHelpScreen = ({
  user,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [contactsAlerted, setContactsAlerted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const link = "https://safewalk.app/live/track-882f";

  const handleAlertContacts = () => setContactsAlerted(true);

  const handleCopyLink = async () => {
    try {
      const Clipboard = require("expo-clipboard");
      await Clipboard.setStringAsync(link);
    } catch {
      Alert.alert("Link seguro", link);
    }
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: "SafeWalk - Minha Rota ao Vivo",
        message: `Estou acompanhando minha rota pelo SafeWalk. Acompanhe minha chegada segura.\n${link}`,
      });
    } catch {
      handleCopyLink();
    }
  };

  const call = (number) => Linking.openURL(`tel:${number}`);

  return (
    <View style={styles.screen}>
      <Header
        subtitle="Ajuda De Emergência"
        showBack
        onBack={onBack}
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="emergency-help"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusCard}>
          <View style={styles.row}>
            <View style={styles.liveDot} />
            <View>
              <Text style={styles.bold}>Monitoramento em Curso</Text>
              <Text style={styles.muted}>Sinal GPS de alta precisão ativo</Text>
            </View>
          </View>
          <Text style={styles.live}>Ao Vivo</Text>
        </View>

        <View style={styles.intro}>
          <Text style={styles.heading}>Como podemos ajudar?</Text>
          <Text style={styles.description}>
            Escolha uma ação imediata. Estamos conectados para manter você segura.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <MaterialIcons name="shield" size={26} color="#006951" />
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Avisar contato de confiança</Text>
              <Text style={styles.tag}>1 toque</Text>
            </View>
            <Text style={styles.description}>Envie um alerta para um contato cadastrado.</Text>

            <Pressable
              onPress={handleAlertContacts}
              style={[styles.actionButton, contactsAlerted && styles.successButton]}
            >
              <MaterialIcons
                name={contactsAlerted ? "done-all" : "chat"}
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.actionText}>
                {contactsAlerted ? "Alerta Transmitido!" : "Enviar SMS / WhatsApp"}
              </Text>
            </Pressable>

            {contactsAlerted && (
              <View style={styles.feedback}>
                <MaterialIcons name="check-circle" size={16} color="#006951" />
                <Text style={styles.feedbackText}>
                  Mensagem transmitida para 3 guardiãs
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <MaterialIcons name="share-location" size={26} color="#006951" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Compartilhar localização</Text>
            <Text style={styles.description}>
              Compartilhe sua localização atual com link seguro com prazo expiração.
            </Text>

            <View style={styles.linkBox}>
              <MaterialIcons name="link" size={18} color="#006951" />
              <Text style={styles.linkText} numberOfLines={1}>
                safewalk.app/live/track-882f
              </Text>
              <Pressable style={styles.copyButton} onPress={handleCopyLink}>
                <Text style={styles.copyText}>{copyFeedback ? "Copiado!" : "Copiar"}</Text>
              </Pressable>
            </View>

            <Pressable style={styles.shareButton} onPress={handleShare}>
              <MaterialIcons name="send" size={18} color="#006951" />
              <Text style={styles.shareText}>Compartilhar Agora</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.emergencyCard}>
          <View style={styles.row}>
            <MaterialIcons name="verified-user" size={18} color="#77737E" />
            <Text style={styles.emergencyLabel}>CANAIS OFICIAIS DE EMERGÊNCIA</Text>
          </View>

          <View style={styles.callRow}>
            <Pressable style={styles.callCard} onPress={() => call("190")}>
              <MaterialIcons name="local-police" size={20} color="#BA1A1A" />
              <View>
                <Text style={styles.callNumber}>190</Text>
                <Text style={styles.muted}>Polícia</Text>
              </View>
              <MaterialIcons name="call" size={18} color="#77737E" />
            </Pressable>

            <Pressable style={styles.callCard} onPress={() => call("180")}>
              <MaterialIcons name="support-agent" size={20} color="#006951" />
              <View>
                <Text style={styles.callNumber}>180</Text>
                <Text style={styles.muted}>Apoio Mulher</Text>
              </View>
              <MaterialIcons name="call" size={18} color="#77737E" />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.backButton} onPress={onBack}>
          <MaterialIcons name="arrow-back" size={20} color="#25232A" />
          <Text style={styles.backText}>Voltar ao trajeto ativo</Text>
        </Pressable>

        <Text style={styles.footer}>
          Sua caminhada continuará protegida e monitorada.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F2F9" },
  content: { padding: 16, paddingBottom: 30, gap: 12 },
  statusCard: { padding: 14, backgroundColor: "#FFFFFF", borderRadius: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  liveDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#006951" },
  bold: { fontSize: 12, fontWeight: "700", color: "#25232A" },
  muted: { fontSize: 10, color: "#77737E", marginTop: 2 },
  live: { backgroundColor: "#D9F7ED", color: "#006951", fontSize: 10, fontWeight: "700", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  intro: { marginVertical: 5 },
  heading: { fontSize: 24, fontWeight: "800", color: "#25232A" },
  description: { fontSize: 11, color: "#625F69", lineHeight: 17, marginTop: 3 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 15, flexDirection: "row", gap: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#E4F6EF", alignItems: "center", justifyContent: "center" },
  cardBody: { flex: 1 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 5 },
  cardTitle: { fontSize: 13, fontWeight: "700", color: "#25232A", flex: 1 },
  tag: { fontSize: 9, fontWeight: "700", color: "#006951", backgroundColor: "#D9F7ED", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8 },
  actionButton: { height: 48, marginTop: 10, borderRadius: 12, backgroundColor: "#006951", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  successButton: { backgroundColor: "#238368" },
  actionText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
  feedback: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4, marginTop: 7 },
  feedbackText: { color: "#006951", fontSize: 10, fontWeight: "700" },
  linkBox: { marginTop: 10, backgroundColor: "#F0EEF3", borderRadius: 11, padding: 6, flexDirection: "row", alignItems: "center", gap: 6 },
  linkText: { flex: 1, fontSize: 10, color: "#77737E" },
  copyButton: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, backgroundColor: "#E2E0E6" },
  copyText: { fontSize: 10, fontWeight: "700", color: "#25232A" },
  shareButton: { height: 44, marginTop: 9, borderRadius: 11, backgroundColor: "#D9F7ED", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  shareText: { fontSize: 11, fontWeight: "700", color: "#006951" },
  emergencyCard: { backgroundColor: "#ECE9EF", borderRadius: 16, padding: 14, gap: 10 },
  emergencyLabel: { fontSize: 10, fontWeight: "800", color: "#77737E" },
  callRow: { flexDirection: "row", gap: 8 },
  callCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 12, padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  callNumber: { fontSize: 12, fontWeight: "700", color: "#25232A" },
  backButton: { height: 54, borderRadius: 16, backgroundColor: "#E2E0E6", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  backText: { fontSize: 12, fontWeight: "700", color: "#25232A" },
  footer: { textAlign: "center", fontSize: 10, color: "#77737E" },
});
