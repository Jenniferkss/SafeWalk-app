import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { SAFEWALK_ASSETS } from "../data/mockData";

export const HomeScreen = ({
  user,
  contactsCount,
  completedRoutesCount,
  onNavigate,
  onStartRoute,
  onOpenScreenSwitcher,
}) => {
  return (
    <View style={styles.screen}>
      <Header
        subtitle="Home"
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="home"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Status do sistema */}
        <View style={styles.welcomeSection}>
          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>
                Sistema pronto e protegido
              </Text>
            </View>

            <View style={styles.battery}>
              <MaterialIcons
                name="battery-charging-full"
                size={18}
                color="#625F69"
              />
              <Text style={styles.batteryText}>
                {user?.batteryLevel ?? 0}%
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.greeting}>
              Olá, {user?.name}
            </Text>

            <Text style={styles.greetingSubtitle}>
              Para onde vamos hoje?
            </Text>
          </View>
        </View>

        {/* Identidade SafeWalk */}
        <View style={styles.heroCard}>
          <View style={styles.heroGlowTop} />
          <View style={styles.heroGlowBottom} />

          <View style={styles.logoWrapper}>
            <View style={styles.logoPulse} />

            <View style={styles.logoContainer}>
              <Image
                source={{ uri: SAFEWALK_ASSETS.logoShield }}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          <Text style={styles.heroTitle}>
            Sua segurança durante o caminho
          </Text>

          <Text style={styles.heroDescription}>
            Monitoramento discreto em tempo real, acionamento assistido e
            conexão imediata com quem você ama.
          </Text>
        </View>

        {/* Botão principal */}
        <Pressable
          onPress={() => onStartRoute("Casa")}
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialIcons
            name="directions-walk"
            size={28}
            color="#FFFFFF"
          />

          <Text style={styles.startButtonText}>
            INICIAR TRAJETO
          </Text>
        </Pressable>

        {/* Destinos frequentes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Destinos frequentes
            </Text>

            <Pressable onPress={() => onNavigate("history")}>
              <Text style={styles.seeAll}>
                Ver todos
              </Text>
            </Pressable>
          </View>

          <View style={styles.destinations}>
            {/* Casa */}
            <Pressable
              onPress={() => onStartRoute("Casa")}
              style={({ pressed }) => [
                styles.destinationCard,
                pressed && styles.pressedSmall,
              ]}
            >
              <View style={styles.homeIcon}>
                <MaterialIcons
                  name="home"
                  size={22}
                  color="#006951"
                />
              </View>

              <View style={styles.destinationInfo}>
                <Text style={styles.destinationTitle}>
                  Casa
                </Text>

                <Text style={styles.destinationSubtitle}>
                  18 min a pé
                </Text>
              </View>
            </Pressable>

            {/* Trabalho */}
            <Pressable
              onPress={() => onStartRoute("Trabalho")}
              style={({ pressed }) => [
                styles.destinationCard,
                pressed && styles.pressedSmall,
              ]}
            >
              <View style={styles.workIcon}>
                <MaterialIcons
                  name="apartment"
                  size={22}
                  color="#006951"
                />
              </View>

              <View style={styles.destinationInfo}>
                <Text style={styles.destinationTitle}>
                  Trabalho
                </Text>

                <Text style={styles.destinationSubtitle}>
                  Avenida Paulista
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Painel de proteção */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Painel de proteção
          </Text>

          <View style={styles.protectionList}>
            {/* Contatos */}
            <Pressable
              onPress={() => onNavigate("contacts")}
              style={({ pressed }) => [
                styles.protectionCard,
                pressed && styles.pressedSmall,
              ]}
            >
              <View style={styles.protectionLeft}>
                <View style={styles.contactsIcon}>
                  <MaterialIcons
                    name="supervised-user-circle"
                    size={24}
                    color="#006951"
                  />
                </View>

                <View style={styles.protectionInfo}>
                  <View style={styles.titleWithDot}>
                    <Text style={styles.protectionTitle}>
                      Círculo de Confiança
                    </Text>

                    <View style={styles.onlineDot} />
                  </View>

                  <Text style={styles.protectionSubtitle}>
                    {contactsCount} contatos recebem alertas
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="chevron-right"
                size={22}
                color="#AAA6B0"
              />
            </Pressable>

            {/* Histórico */}
            <Pressable
              onPress={() => onNavigate("history")}
              style={({ pressed }) => [
                styles.protectionCard,
                pressed && styles.pressedSmall,
              ]}
            >
              <View style={styles.protectionLeft}>
                <View style={styles.historyIcon}>
                  <MaterialIcons
                    name="route"
                    size={24}
                    color="#006951"
                  />
                </View>

                <View style={styles.protectionInfo}>
                  <Text style={styles.protectionTitle}>
                    Histórico de Trajetos
                  </Text>

                  <Text style={styles.protectionSubtitle}>
                    {completedRoutesCount} trajetos concluídos em paz
                  </Text>
                </View>
              </View>

              <View style={styles.historyRight}>
                <View style={styles.safeBadge}>
                  <Text style={styles.safeBadgeText}>
                    100% seguros
                  </Text>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color="#AAA6B0"
                />
              </View>
            </Pressable>

            {/* Sensores */}
            <Pressable
              onPress={() => onNavigate("motion-alert")}
              style={({ pressed }) => [
                styles.protectionCard,
                pressed && styles.pressedSmall,
              ]}
            >
              <View style={styles.protectionLeft}>
                <View style={styles.sensorsIcon}>
                  <MaterialIcons
                    name="tune"
                    size={24}
                    color="#006951"
                  />
                </View>

                <View style={styles.protectionInfo}>
                  <Text style={styles.protectionTitle}>
                    Sensores e Alertas
                  </Text>

                  <Text style={styles.protectionSubtitle}>
                    Sensibilidade de paradas: Calibrada
                  </Text>
                </View>
              </View>

              <MaterialIcons
                name="chevron-right"
                size={22}
                color="#AAA6B0"
              />
            </Pressable>
          </View>
        </View>

        {/* Mensagem de cuidado */}
        <View style={styles.careCard}>
          <View style={styles.careIcon}>
            <MaterialIcons
              name="verified-user"
              size={18}
              color="#006951"
            />
          </View>

          <Text style={styles.careText}>
            Seus sensores e contatos de confiança estarão vigilantes a cada
            passo. Caminhe no seu ritmo, nós cuidamos do resto.
          </Text>
        </View>
      </ScrollView>

      <BottomNav
        currentScreen="home"
        onNavigate={onNavigate}
      />
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
    paddingBottom: 100,
  },

  welcomeSection: {
    marginBottom: 20,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9F7ED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#006951",
    marginRight: 7,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#006951",
  },

  battery: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  batteryText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#625F69",
  },

  greeting: {
    fontSize: 25,
    fontWeight: "800",
    color: "#25232A",
  },

  greetingSubtitle: {
    fontSize: 13,
    color: "#77737E",
    marginTop: 2,
  },

  heroCard: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2DFE6",
  },

  heroGlowTop: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#D9F7ED",
    top: -55,
    right: -55,
    opacity: 0.7,
  },

  heroGlowBottom: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#E4F6EF",
    bottom: -60,
    left: -60,
    opacity: 0.7,
  },

  logoWrapper: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  logoPulse: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#D9F7ED",
    opacity: 0.7,
  },

  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  heroTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#006951",
    textAlign: "center",
  },

  heroDescription: {
    fontSize: 11,
    lineHeight: 17,
    color: "#77737E",
    textAlign: "center",
    marginTop: 5,
    maxWidth: 270,
  },

  startButton: {
    height: 64,
    borderRadius: 17,
    backgroundColor: "#006951",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#006951",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  startButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  pressed: {
    transform: [{ scale: 0.98 }],
  },

  pressedSmall: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  section: {
    marginBottom: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    marginBottom: 9,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#25232A",
  },

  seeAll: {
    fontSize: 10,
    fontWeight: "600",
    color: "#006951",
  },

  destinations: {
    flexDirection: "row",
    gap: 10,
  },

  destinationCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2DFE6",
    gap: 10,
  },

  homeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#D9F7ED",
    alignItems: "center",
    justifyContent: "center",
  },

  workIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E4F6EF",
    alignItems: "center",
    justifyContent: "center",
  },

  destinationInfo: {
    flex: 1,
  },

  destinationTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#25232A",
  },

  destinationSubtitle: {
    fontSize: 9,
    color: "#77737E",
    marginTop: 2,
  },

  protectionList: {
    gap: 10,
    marginTop: 9,
  },

  protectionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2DFE6",
  },

  protectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 11,
  },

  contactsIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E4F6EF",
    alignItems: "center",
    justifyContent: "center",
  },

  historyIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#D9F7ED",
    alignItems: "center",
    justifyContent: "center",
  },

  sensorsIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E4F6EF",
    alignItems: "center",
    justifyContent: "center",
  },

  protectionInfo: {
    flex: 1,
  },

  titleWithDot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  protectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#25232A",
  },

  protectionSubtitle: {
    fontSize: 10,
    color: "#77737E",
    marginTop: 3,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#006951",
  },

  historyRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  safeBadge: {
    backgroundColor: "#D9F7ED",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },

  safeBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#006951",
  },

  careCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8F8F2",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9F7ED",
    gap: 10,
  },

  careIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  careText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: "#625F69",
  },
});