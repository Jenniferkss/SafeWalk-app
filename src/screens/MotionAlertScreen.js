import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Header } from "../components/Header";

export const MotionAlertScreen = ({
  user,
  onSafeConfirm,
  onEmergencyTrigger,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [isResolved, setIsResolved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isResolved) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onEmergencyTrigger();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isResolved, onEmergencyTrigger]);

  const handleSafe = () => {
    setIsResolved(true);
    setShowToast(true);

    setTimeout(() => {
      onSafeConfirm();
    }, 1500);
  };

  const progressPercentage = (secondsLeft / 20) * 100;

  return (
    <View style={styles.screen}>
      <Header
        subtitle="Alerta De Movimento"
        showBack
        onBack={onBack}
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="motion-alert"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Indicador de movimento */}
        <View style={styles.beaconSection}>
          <View style={styles.beaconWrapper}>
            <View style={styles.outerCircle} />
            <View style={styles.middleCircle} />

            <View style={styles.sensorCircle}>
              <MaterialIcons
                name="sensors"
                size={44}
                color="#006951"
              />
            </View>

            <View style={styles.favoriteBadge}>
              <MaterialIcons
                name="favorite"
                size={16}
                color="#FFFFFF"
              />
            </View>
          </View>

          <Text style={styles.heading}>
            Movimento inesperado detectado
          </Text>

          <Text style={styles.description}>
            Detectamos uma mudança brusca nos sensores. Respire fundo:
            você está bem?
          </Text>
        </View>

        {/* Contador */}
        <View style={styles.countdownCard}>
          <View style={styles.countdownHeader}>
            <View style={styles.checkingRow}>
              <View style={styles.liveDot} />

              <Text style={styles.checkingText}>
                Checagem de Segurança
              </Text>
            </View>

            <Text style={styles.secondsText}>
              {secondsLeft}s restantes
            </Text>
          </View>

          {/* Barra de progresso */}
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progressPercentage}%`,
                },
              ]}
            />
          </View>

          <View style={styles.warningRow}>
            <MaterialIcons
              name="timer"
              size={20}
              color="#8A6D3B"
            />

            <Text style={styles.warningText}>
              Se não houver resposta dentro do tempo, compartilharemos
              sua localização com seus 3 contatos de confiança.
            </Text>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.actions}>
          {/* Estou bem */}
          <Pressable
            onPress={handleSafe}
            style={({ pressed }) => [
              styles.safeButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="check-circle"
              size={26}
              color="#FFFFFF"
            />

            <Text style={styles.safeButtonText}>
              SIM, ESTOU BEM
            </Text>
          </Pressable>

          {/* Emergência */}
          <Pressable
            onPress={onEmergencyTrigger}
            style={({ pressed }) => [
              styles.emergencyButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="sos"
              size={24}
              color="#FFFFFF"
            />

            <Text style={styles.emergencyButtonText}>
              PRECISO DE AJUDA
            </Text>
          </Pressable>
        </View>

        {/* Informações dos sensores */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <MaterialIcons
              name="phonelink-ring"
              size={18}
              color="#8A6D3B"
            />

            <Text style={styles.infoTitle}>
              SENSORES INTELIGENTES
            </Text>
          </View>

          <Text style={styles.infoDescription}>
            Este alerta é baseado nos sensores de aceleração e rotação
            do seu smartphone.
          </Text>

          <Text style={styles.infoHighlight}>
            Se você estiver bem, basta tocar no botão acima para
            continuar seu trajeto normalmente e cancelar o aviso aos
            seus contatos.
          </Text>
        </View>
      </ScrollView>

      {/* Toast de confirmação */}
      {showToast && (
        <View style={styles.toast}>
          <View style={styles.toastLeft}>
            <MaterialIcons
              name="verified"
              size={26}
              color="#D9F7ED"
            />

            <View style={styles.toastTextContainer}>
              <Text style={styles.toastTitle}>
                Alerta cancelado
              </Text>

              <Text style={styles.toastDescription}>
                Trajeto seguro retomado com sucesso.
              </Text>
            </View>
          </View>

          <MaterialIcons
            name="done-all"
            size={20}
            color="#AAA6B0"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F2F9",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  beaconSection: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
  },

  beaconWrapper: {
    width: 112,
    height: 112,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  outerCircle: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#D9F7ED",
    opacity: 0.4,
  },

  middleCircle: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#CDEFE4",
    opacity: 0.5,
  },

  sensorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D9F7ED",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  favoriteBadge: {
    position: "absolute",
    right: 2,
    top: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#006951",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  heading: {
    fontSize: 23,
    fontWeight: "800",
    color: "#25232A",
    textAlign: "center",
    marginBottom: 7,
  },

  description: {
    fontSize: 12,
    lineHeight: 18,
    color: "#77737E",
    textAlign: "center",
    maxWidth: 300,
  },

  countdownCard: {
    width: "100%",
    backgroundColor: "#F0EEF3",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2DFE6",
  },

  countdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  checkingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#006951",
  },

  checkingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#25232A",
  },

  secondsText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#006951",
  },

  progressBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#D8D5DD",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#006951",
    borderRadius: 8,
  },

  warningRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    paddingTop: 2,
  },

  warningText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color: "#77737E",
  },

  actions: {
    gap: 12,
    marginBottom: 18,
  },

  safeButton: {
    width: "100%",
    minHeight: 58,
    borderRadius: 17,
    backgroundColor: "#006951",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 3,
    shadowColor: "#006951",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  safeButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  emergencyButton: {
    width: "100%",
    minHeight: 56,
    borderRadius: 17,
    backgroundColor: "#B42318",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 3,
    shadowColor: "#B42318",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  emergencyButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#E2E0E6",
    borderRadius: 17,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D8D5DD",
    gap: 8,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  infoTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8A6D3B",
    letterSpacing: 1,
  },

  infoDescription: {
    fontSize: 10,
    lineHeight: 15,
    color: "#77737E",
  },

  infoHighlight: {
    fontSize: 10,
    lineHeight: 15,
    color: "#006951",
    fontWeight: "500",
  },

  toast: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 28,
    backgroundColor: "#25232A",
    padding: 16,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  toastLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  toastTextContainer: {
    flex: 1,
  },

  toastTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  toastDescription: {
    fontSize: 10,
    color: "#D8D5DD",
    marginTop: 2,
  },

  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});