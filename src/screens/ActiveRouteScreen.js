import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  FeGaussianBlur,
  FeComposite,
  Filter,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../components/Header";

export const ActiveRouteScreen = ({
  user,
  destinationTitle = "Casa",
  onFinishRoute,
  onEmergency,
  onTriggerAlert,
  onTriggerGpsOff,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [mapCentered, setMapCentered] = useState(true);
  const [sosActivated, setSosActivated] = useState(false);
  const holdIntervalRef = useRef(null);

  const startHold = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setIsHolding(true);
    setHoldProgress(0);

    const start = Date.now();
    const duration = 2500;

    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setHoldProgress(pct);

      if (pct >= 100) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
        setIsHolding(false);
        setSosActivated(true);
        onEmergency();
      }
    }, 50);
  };

  const cancelHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const handleSosPress = () => {
    if (holdProgress < 85) onEmergency();
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Header
        subtitle="Trajeto Ativo"
        showBack
        onBack={onBack}
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="active-route"
      />

      <View style={styles.content}>
        <View style={styles.statusCard}>
          <View style={styles.row}>
            <View style={styles.statusDot} />
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.titleSmall}>Trajeto protegido</Text>
                <Text style={styles.liveBadge}>AO VIVO</Text>
              </View>
              <View style={styles.row}>
                <MaterialIcons name="security" size={14} color="#006951" />
                <Text style={styles.muted}>Compartilhando com 3 contatos de confiança</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.iconButton}
            onPress={() =>
              Alert.alert(
                "Opções da rota",
                "Iluminação pública ativa • Corredor Seguro ativado"
              )
            }
          >
            <MaterialIcons name="layers" size={20} color="#625f69" />
          </Pressable>
        </View>

        <View style={styles.mapCard}>
          <Svg width="100%" height="100%" viewBox="0 0 380 320">
            <Defs>
              <RadialGradient id="radar" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#645494" stopOpacity="0.45" />
                <Stop offset="60%" stopColor="#645494" stopOpacity="0.2" />
                <Stop offset="100%" stopColor="#645494" stopOpacity="0" />
              </RadialGradient>
              <Filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <FeGaussianBlur stdDeviation="3" result="blur" />
                <FeComposite in="SourceGraphic" in2="blur" operator="over" />
              </Filter>
            </Defs>

            <Rect width="380" height="320" fill="#F5F2F9" />

            <Path
              d="M-20 40 C30 20 80 60 95 120 C110 180 50 210 10 200 Z"
              fill="#D1E7DF"
              opacity="0.65"
            />
            <Path
              d="M260 220 C300 210 360 230 390 280 L390 340 L240 340 Z"
              fill="#D1E7DF"
              opacity="0.5"
            />

            <Path d="M-10 80 L390 80" stroke="#E4E1E8" strokeWidth="12" strokeLinecap="round" />
            <Path d="M-10 160 L390 160" stroke="#E4E1E8" strokeWidth="14" strokeLinecap="round" />
            <Path d="M-10 240 L390 240" stroke="#E4E1E8" strokeWidth="10" strokeLinecap="round" />
            <Path d="M80 -10 L80 330" stroke="#E4E1E8" strokeWidth="12" strokeLinecap="round" />
            <Path d="M190 -10 L190 330" stroke="#E4E1E8" strokeWidth="14" strokeLinecap="round" />
            <Path d="M300 -10 L300 330" stroke="#E4E1E8" strokeWidth="10" strokeLinecap="round" />

            <Path d="M30 330 L290 -10" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            <Path d="M70 330 L330 70" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />

            <Path
              d="M60 70 L190 70 L190 190 L290 190 L290 260"
              stroke="#9AF4D4"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
            <Path
              d="M60 70 L190 70 L190 190 L290 190 L290 260"
              stroke="#006951"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            <Circle cx="60" cy="70" r="7" fill="#006951" />
            <Circle cx="60" cy="70" r="3.5" fill="#FFFFFF" />
            <Circle cx="290" cy="260" r="11" fill="#238368" />
            <Path d="M285 263 L285 258 L290 254 L295 258 L295 263 Z" fill="#FFFFFF" />

            <Circle cx="190" cy="140" r="32" fill="url(#radar)" />
            <Circle cx="190" cy="140" r="9" fill="#645494" />
            <Circle cx="190" cy="140" r="4" fill="#FFFFFF" />
          </Svg>

          <View style={[styles.mapBadge, { top: 14, left: 14 }]}>
            <View style={styles.greenDot} />
            <Text style={styles.badgeText}>Partida: Av. Paulista, 1000</Text>
          </View>

          <View style={[styles.mapBadge, { bottom: 14, right: 14 }]}>
            <MaterialIcons name="home" size={15} color="#006951" />
            <Text style={styles.badgeText}>Destino: {destinationTitle}</Text>
          </View>

          <Pressable
            style={[styles.recenter, { bottom: 14, left: 14 }]}
            onPress={() => {
              setMapCentered(true);
              Alert.alert("Localização", "GPS recentralizado no centro da tela.");
            }}
          >
            <MaterialIcons name="my-location" size={20} color="#006951" />
          </Pressable>
        </View>

        <View style={styles.metrics}>
          <Metric icon="schedule" value="18:42" label="Previsão (12m)" color="#006951" />
          <Metric icon="route" value="1,8 km" label="Restante" color="#006951" />
          <Metric icon="verified-user" value="100%" label="Seguro" color="#006951" />
        </View>

        <View style={styles.contactsBar}>
          <View style={styles.avatarRow}>
            <Avatar text="CA" color="#B8E5D7" />
            <Avatar text="MA" color="#006951" />
            <Avatar text="JU" color="#645494" />
          </View>
          <Text style={styles.muted}>Camila, Mãe e Julia conectadas</Text>
          <MaterialIcons name="share-location" size={20} color="#006951" />
        </View>

        <View style={styles.simulationRow}>
          <Pressable style={styles.simButton} onPress={onTriggerAlert}>
            <MaterialIcons name="sensors" size={15} color="#006951" />
            <Text style={styles.simText}>Simular Alerta</Text>
          </Pressable>
          <Pressable style={styles.gpsButton} onPress={onTriggerGpsOff}>
            <MaterialIcons name="gps-off" size={15} color="#625f69" />
            <Text style={styles.simText}>Perda GPS</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.sosButton}
          onPress={handleSosPress}
          onPressIn={startHold}
          onPressOut={cancelHold}
        >
          <View style={styles.row}>
            <View style={styles.sosIcon}>
              <MaterialIcons name="e911-emergency" size={25} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.sosTitle}>PRECISO DE AJUDA</Text>
              <Text style={styles.sosSub}>
                {isHolding
                  ? `Segurando... ${Math.round(holdProgress)}%`
                  : "Toque rápido ou segure 3s"}
              </Text>
            </View>
          </View>

          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />

          <View style={[styles.progress, { width: `${holdProgress}%` }]} />
        </Pressable>

        <Pressable style={styles.finishButton} onPress={onFinishRoute}>
          <MaterialIcons name="check-circle" size={20} color="#625f69" />
          <Text style={styles.finishText}>Encerrar trajeto</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Metric = ({ icon, value, label, color }) => (
  <View style={styles.metric}>
    <View style={styles.metricIcon}>
      <MaterialIcons name={icon} size={18} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const Avatar = ({ text, color }) => (
  <View style={[styles.avatar, { backgroundColor: color }]}>
    <Text style={styles.avatarText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F2F9" },
  content: { padding: 16, gap: 10 },
  statusCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  statusDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#006951", marginRight: 8 },
  titleSmall: { fontSize: 14, fontWeight: "700", color: "#25232A" },
  liveBadge: { fontSize: 9, fontWeight: "800", color: "#006951", backgroundColor: "#D9F7ED", paddingHorizontal: 7, paddingVertical: 3, borderRadius: 10, marginLeft: 5 },
  muted: { fontSize: 10, color: "#77737E", marginLeft: 4, flexShrink: 1 },
  iconButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F0EEF3", alignItems: "center", justifyContent: "center" },
  mapCard: { height: 310, borderRadius: 24, overflow: "hidden", position: "relative", borderWidth: 1, borderColor: "#E2DFE6" },
  mapBadge: { position: "absolute", backgroundColor: "#FFFFFF", borderRadius: 18, paddingHorizontal: 10, paddingVertical: 7, flexDirection: "row", alignItems: "center", gap: 5 },
  badgeText: { fontSize: 10, fontWeight: "600", color: "#25232A" },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#006951" },
  recenter: { position: "absolute", width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  metrics: { flexDirection: "row", gap: 8 },
  metric: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 10, alignItems: "center" },
  metricIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#E7F7F0", alignItems: "center", justifyContent: "center", marginBottom: 4 },
  metricValue: { fontSize: 15, fontWeight: "700", color: "#25232A" },
  metricLabel: { fontSize: 9, color: "#77737E", marginTop: 2 },
  contactsBar: { backgroundColor: "#ECE9EF", borderRadius: 16, padding: 11, flexDirection: "row", alignItems: "center", gap: 7 },
  avatarRow: { flexDirection: "row", marginRight: 2 },
  avatar: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", marginLeft: -4, borderWidth: 2, borderColor: "#ECE9EF" },
  avatarText: { fontSize: 9, fontWeight: "700", color: "#FFFFFF" },
  simulationRow: { flexDirection: "row", gap: 7 },
  simButton: { flex: 1, backgroundColor: "#E3F5EE", borderRadius: 12, padding: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 },
  gpsButton: { backgroundColor: "#E3E0E7", borderRadius: 12, padding: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 },
  simText: { fontSize: 10, fontWeight: "600", color: "#55515B" },
  sosButton: { minHeight: 64, backgroundColor: "#BA1A1A", borderRadius: 16, paddingHorizontal: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "hidden", position: "relative" },
  sosIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,.2)", alignItems: "center", justifyContent: "center" },
  sosTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  sosSub: { color: "#FFFFFF", opacity: 0.85, fontSize: 10, marginTop: 2 },
  progress: { position: "absolute", left: 0, bottom: 0, height: 5, backgroundColor: "#FFFFFF" },
  finishButton: { height: 54, borderRadius: 16, backgroundColor: "#E2E0E6", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 7 },
  finishText: { fontSize: 13, fontWeight: "600", color: "#25232A" },
});
