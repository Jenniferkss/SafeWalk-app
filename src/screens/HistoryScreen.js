import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";

export const HistoryScreen = ({
  user,
  routes,
  onSelectRoute,
  onNavigate,
  onOpenScreenSwitcher,
}) => {
  const [filterActive, setFilterActive] = useState("all");

  const getRouteIcon = (title) => {
    if (title.includes("Escola")) return "school";
    if (title.includes("Metrô")) return "commute";
    return "directions-walk";
  };

  const filteredRoutes =
    filterActive === "safe"
      ? routes.filter((route) => route.safe !== false)
      : routes;

  return (
    <View style={styles.screen}>
      <Header
        subtitle="Histórico"
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="history"
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Top actions */}
        <View style={styles.topActions}>
          <Pressable
            onPress={() => onNavigate("home")}
            style={styles.backHomeButton}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={16}
              color="#006951"
            />
            <Text style={styles.backHomeText}>Voltar ao Início</Text>
          </Pressable>

          <View style={styles.monthBadge}>
            <MaterialIcons
              name="calendar-month"
              size={16}
              color="#006951"
            />
            <Text style={styles.monthText}>Outubro 2024</Text>
          </View>
        </View>

        {/* Header */}
        <View style={styles.titleSection}>
          <Text style={styles.heading}>Histórico</Text>
          <Text style={styles.subtitle}>
            Seus trajetos protegidos recentemente
          </Text>
        </View>

        {/* Resumo Mensal */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryLabel}>RESUMO MENSAL</Text>

              <View style={styles.walksRow}>
                <Text style={styles.walksNumber}>42</Text>
                <Text style={styles.walksText}>
                  caminhadas seguras
                </Text>
              </View>

              <Text style={styles.summaryDescription}>
                Total de 42 trajetos protegidos este mês.
              </Text>
            </View>

            <View style={styles.securityIcon}>
              <MaterialIcons
                name="verified-user"
                size={28}
                color="#006951"
              />
              <View style={styles.statusDot} />
            </View>
          </View>

          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <MaterialIcons
                name="near-me"
                size={16}
                color="#006951"
              />
              <Text style={styles.statText}>
                54,6 km percorridos
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <MaterialIcons
                name="share-location"
                size={16}
                color="#006951"
              />
              <Text style={styles.statText}>
                100% monitorado
              </Text>
            </View>
          </View>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            TRAJETOS CONCLUÍDOS
          </Text>

          <Pressable
            onPress={() =>
              setFilterActive(
                filterActive === "all" ? "safe" : "all"
              )
            }
          >
            <Text style={styles.filterText}>
              Filtros{" "}
              {filterActive === "safe" ? "(100% Seguros)" : ""}
            </Text>
          </Pressable>
        </View>

        {/* Lista de trajetos */}
        <View style={styles.routesList}>
          {filteredRoutes.map((route) => (
            <Pressable
              key={route.id}
              onPress={() => onSelectRoute(route)}
              style={({ pressed }) => [
                styles.routeCard,
                pressed && styles.routeCardPressed,
              ]}
            >
              <View style={styles.routeMain}>
                <View style={styles.routeIcon}>
                  <MaterialIcons
                    name={getRouteIcon(route.title)}
                    size={20}
                    color="#006951"
                  />
                </View>

                <View style={styles.routeInfo}>
                  <Text
                    style={styles.routeTitle}
                    numberOfLines={1}
                  >
                    {route.title}
                  </Text>

                  <Text style={styles.routeDate}>
                    {route.dateStr}
                  </Text>

                  <View style={styles.routeDetails}>
                    <View style={styles.detailItem}>
                      <MaterialIcons
                        name="schedule"
                        size={14}
                        color="#006951"
                      />
                      <Text style={styles.detailText}>
                        {route.durationMin} min
                      </Text>
                    </View>

                    <Text style={styles.separator}>•</Text>

                    <View style={styles.detailItem}>
                      <MaterialIcons
                        name="straighten"
                        size={14}
                        color="#006951"
                      />
                      <Text style={styles.detailText}>
                        {route.distanceKm} km
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.routeRight}>
                  <View style={styles.safeBadge}>
                    <Text style={styles.safeText}>Seguro</Text>
                    <MaterialIcons
                      name="check"
                      size={14}
                      color="#006951"
                    />
                  </View>

                  <MaterialIcons
                    name="chevron-right"
                    size={20}
                    color="#AAA6B0"
                  />
                </View>
              </View>
            </Pressable>
          ))}

          {filteredRoutes.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="route"
                size={32}
                color="#AAA6B0"
              />
              <Text style={styles.emptyText}>
                Nenhum trajeto encontrado.
              </Text>
            </View>
          )}
        </View>

        {/* Security Footer */}
        <View style={styles.securityFooter}>
          <View style={styles.lockIcon}>
            <MaterialIcons
              name="lock"
              size={18}
              color="#77737E"
            />
          </View>

          <Text style={styles.securityTitle}>
            Seus dados de rotas são criptografados de ponta a ponta
          </Text>

          <Text style={styles.securityDescription}>
            Visíveis apenas para você e seus contatos durante a caminhada.
          </Text>
        </View>
      </ScrollView>

      <BottomNav
        currentScreen="history"
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

  topActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  backHomeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  backHomeText: {
    color: "#006951",
    fontSize: 11,
    fontWeight: "600",
  },

  monthBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E2E0E6",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 16,
  },

  monthText: {
    color: "#625F69",
    fontSize: 10,
    fontWeight: "600",
  },

  titleSection: {
    marginBottom: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#25232A",
  },

  subtitle: {
    fontSize: 11,
    color: "#77737E",
    marginTop: 3,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2DFE6",
  },

  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  summaryInfo: {
    flex: 1,
  },

  summaryLabel: {
    color: "#006951",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  walksRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 3,
    gap: 5,
  },

  walksNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#25232A",
  },

  walksText: {
    fontSize: 11,
    color: "#77737E",
  },

  summaryDescription: {
    fontSize: 10,
    color: "#006951",
    marginTop: 2,
  },

  securityIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#E4F6EF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  statusDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#006951",
    right: -2,
    top: -2,
  },

  summaryStats: {
    marginTop: 15,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#F0EEF3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  statText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#625F69",
  },

  divider: {
    width: 1,
    height: 14,
    backgroundColor: "#C8C4CD",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    marginBottom: 9,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#625F69",
    letterSpacing: 1,
  },

  filterText: {
    fontSize: 10,
    color: "#006951",
    fontWeight: "600",
  },

  routesList: {
    gap: 10,
  },

  routeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2DFE6",
  },

  routeCardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },

  routeMain: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  routeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E4F6EF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  routeInfo: {
    flex: 1,
    minWidth: 0,
  },

  routeTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#25232A",
  },

  routeDate: {
    fontSize: 10,
    color: "#77737E",
    marginTop: 3,
  },

  routeDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 6,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  detailText: {
    fontSize: 10,
    color: "#006951",
  },

  separator: {
    color: "#AAA6B0",
    fontSize: 10,
  },

  routeRight: {
    alignItems: "flex-end",
    gap: 9,
  },

  safeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#D9F7ED",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
  },

  safeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#006951",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },

  emptyText: {
    marginTop: 8,
    color: "#77737E",
    fontSize: 11,
  },

  securityFooter: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  lockIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E2E0E6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  securityTitle: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
    color: "#625F69",
  },

  securityDescription: {
    textAlign: "center",
    fontSize: 10,
    color: "#006951",
    marginTop: 3,
  },
});