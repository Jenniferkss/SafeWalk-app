import React, { useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../components/Header";

export const GpsUnavailableScreen = ({
  user,
  onRetrySuccess,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryFeedback, setRetryFeedback] = useState(null);

  const handleRetry = () => {
    setIsRetrying(true);
    setRetryFeedback("Buscando sinal de satélite...");

    setTimeout(() => {
      setIsRetrying(false);
      setRetryFeedback("Sinal restabelecido com sucesso!");

      setTimeout(() => {
        onRetrySuccess();
      }, 700);
    }, 1800);
  };

  return (
    <View style={styles.screen}>
      <Header
        subtitle="Gps Indisponível"
        showBack
        onBack={onBack}
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="gps-unavailable"
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.circleOuter}>
            <View style={styles.circleInner}>
              <MaterialIcons name="gps-off" size={62} color="#645494" />
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.orangeDot} />
              <Text style={styles.statusText}>SINAL SUSPENSO</Text>
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.heading}>Localização indisponível</Text>
          <Text style={styles.description}>
            Não foi possível acessar sua localização. Verifique a permissão de localização e tente novamente.
          </Text>
        </View>

        <View style={styles.reassurance}>
          <View style={styles.reassuranceIcon}>
            <MaterialIcons name="health-and-safety" size={20} color="#006951" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.reassuranceTitle}>Estamos com você</Text>
            <Text style={styles.description}>
              Seus dados e contatos guardados continuam intactos.
            </Text>
          </View>
        </View>

        <View style={styles.tipsCard}>
          <View style={styles.row}>
            <MaterialIcons name="lightbulb" size={20} color="#006951" />
            <Text style={styles.tipTitle}>Dicas rápidas para resolver:</Text>
          </View>

          <Tip number="1">
            Verifique se o <Text style={styles.strong}>GPS do celular</Text> está ligado nas configurações rápidas.
          </Tip>
          <Tip number="2">
            Certifique-se de que a permissão está em <Text style={styles.strong}>“Permitir sempre”</Text> ou “Durante o uso”.
          </Tip>
          <Tip number="3">
            Se estiver em local subterrâneo ou fechado, aproxime-se de uma <Text style={styles.strong}>área aberta</Text>.
          </Tip>
        </View>

        {retryFeedback && (
          <Text style={styles.feedback}>{retryFeedback}</Text>
        )}

        <Pressable
          disabled={isRetrying}
          onPress={handleRetry}
          style={[styles.retryButton, isRetrying && { opacity: 0.8 }]}
        >
          <MaterialIcons
            name="refresh"
            size={21}
            color="#FFFFFF"
          />
          <Text style={styles.retryText}>
            {isRetrying ? "BUSCANDO SINAL..." : "TENTAR NOVAMENTE"}
          </Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>VOLTAR</Text>
        </Pressable>

        <View style={styles.emergencyFooter}>
          <MaterialIcons name="support-agent" size={16} color="#006951" />
          <Text style={styles.footerText}>Sente dúvida ou insegurança imediata?</Text>
          <Pressable onPress={() => Linking.openURL("tel:190")}>
            <Text style={styles.callText}>Discar 190</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const Tip = ({ number, children }) => (
  <View style={styles.tip}>
    <View style={styles.number}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
    <Text style={styles.tipText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F2F9" },
  content: { padding: 16, paddingBottom: 30 },
  illustration: { alignItems: "center", paddingVertical: 15 },
  circleOuter: { width: 145, height: 145, borderRadius: 73, backgroundColor: "#E7E3EC", alignItems: "center", justifyContent: "center", position: "relative" },
  circleInner: { width: 112, height: 112, borderRadius: 56, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#E2DFE6" },
  statusBadge: { position: "absolute", bottom: -3, backgroundColor: "#FFFFFF", borderRadius: 15, paddingHorizontal: 11, paddingVertical: 6, flexDirection: "row", alignItems: "center", gap: 5 },
  orangeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#C26A00" },
  statusText: { fontSize: 9, fontWeight: "800", color: "#C26A00", letterSpacing: 1 },
  header: { alignItems: "center", marginVertical: 14 },
  heading: { fontSize: 23, fontWeight: "800", color: "#25232A", textAlign: "center" },
  description: { fontSize: 11, lineHeight: 17, color: "#625F69", marginTop: 3 },
  reassurance: { backgroundColor: "#E4F6EF", borderRadius: 16, padding: 13, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  reassuranceIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  reassuranceTitle: { fontSize: 11, fontWeight: "700", color: "#006951" },
  tipsCard: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 15, gap: 8, marginBottom: 15 },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  tipTitle: { fontSize: 11, fontWeight: "700", color: "#25232A" },
  tip: { backgroundColor: "#F0EEF3", borderRadius: 11, padding: 10, flexDirection: "row", alignItems: "flex-start", gap: 9 },
  number: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#E2E0E6", alignItems: "center", justifyContent: "center" },
  numberText: { fontSize: 10, fontWeight: "700", color: "#77737E" },
  tipText: { flex: 1, fontSize: 11, lineHeight: 16, color: "#25232A" },
  strong: { fontWeight: "800" },
  feedback: { textAlign: "center", fontSize: 11, fontWeight: "600", color: "#006951", marginBottom: 5 },
  retryButton: { height: 56, borderRadius: 16, backgroundColor: "#006951", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  retryText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  backButton: { height: 48, borderRadius: 16, backgroundColor: "#E8E6EC", alignItems: "center", justifyContent: "center", marginTop: 8 },
  backText: { color: "#55515B", fontSize: 11, fontWeight: "700" },
  emergencyFooter: { marginTop: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, flexWrap: "wrap" },
  footerText: { fontSize: 10, color: "#625F69" },
  callText: { fontSize: 10, fontWeight: "800", color: "#006951", textDecorationLine: "underline" },
});
