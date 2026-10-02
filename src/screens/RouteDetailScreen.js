import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, {
  Circle,
  G,
  Path,
} from 'react-native-svg';

import { Header } from '../components/Header';

export const RouteDetailScreen = ({
  user,
  route,
  onRepeatRoute,
  onBack,
  onOpenScreenSwitcher,
}) => {
  return (
    <View style={styles.container}>
      <Header
        subtitle="Detalhes Do Trajeto"
        showBack
        onBack={onBack}
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="route-detail"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Action */}
        <View style={styles.topAction}>
          <Pressable
            onPress={onBack}
            style={styles.backLink}
          >
            <MaterialIcons
              name="arrow-back"
              size={18}
              color="#006951"
            />
            <Text style={styles.backLinkText}>
              Voltar ao Histórico
            </Text>
          </Pressable>

          <View style={styles.verifiedBadge}>
            <View style={styles.smallDot} />
            <Text style={styles.verifiedText}>
              Registro Verificado
            </Text>
          </View>
        </View>

        {/* Route Title */}
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <View style={styles.routeIcon}>
              <MaterialIcons
                name="alt-route"
                size={22}
                color="#006951"
              />
            </View>

            <View style={styles.routeTitleContainer}>
              <Text style={styles.routeTitle}>
                {route.title}
              </Text>

              <Text style={styles.routeDate}>
                {route.dateStr} • {route.timeRange}
              </Text>
            </View>
          </View>

          <View style={styles.completedBadge}>
            <MaterialIcons
              name="verified"
              size={16}
              color="#006951"
            />

            <Text style={styles.completedText}>
              Trajeto Concluído em Segurança ✓
            </Text>
          </View>
        </View>

        {/* Metrics */}
        <View style={styles.metricsGrid}>
          {/* Duration */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <MaterialIcons
                name="timer"
                size={20}
                color="#006951"
              />
            </View>

            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>
                Duração
              </Text>

              <Text style={styles.metricValue}>
                {route.durationMin} min
              </Text>
            </View>
          </View>

          {/* Distance */}
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <MaterialIcons
                name="straighten"
                size={20}
                color="#006951"
              />
            </View>

            <View style={styles.metricContent}>
              <Text style={styles.metricLabel}>
                Distância
              </Text>

              <Text style={styles.metricValue}>
                {route.distanceKm} km
              </Text>
            </View>
          </View>

          {/* Overall Status */}
          <View style={styles.statusCard}>
            <View style={styles.securityIcon}>
              <MaterialIcons
                name="security"
                size={20}
                color="#006951"
              />
            </View>

            <View style={styles.statusContent}>
              <Text style={styles.statusLabel}>
                INTEGRIDADE DA ROTA
              </Text>

              <Text style={styles.statusValue}>
                100% monitorado • Sem alertas de movimento
              </Text>
            </View>
          </View>
        </View>

        {/* Map Card */}
        <View style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <View style={styles.mapTitleRow}>
              <MaterialIcons
                name="map"
                size={20}
                color="#006951"
              />

              <Text style={styles.mapTitle}>
                Mapa do Percurso
              </Text>
            </View>

            <View style={styles.gpsBadge}>
              <Text style={styles.gpsText}>
                GPS Ativo • Alta Precisão
              </Text>
            </View>
          </View>

          {/* Map */}
          <View style={styles.mapContainer}>
            <Svg
              width="100%"
              height="100%"
              viewBox="0 0 360 250"
            >
              {/* Roads */}
              <Path
                d="M 0,40 L 360,40"
                stroke="#E4E1E8"
                strokeLinecap="round"
                strokeWidth="8"
              />

              <Path
                d="M 0,110 L 360,110"
                stroke="#E4E1E8"
                strokeLinecap="round"
                strokeWidth="12"
              />

              <Path
                d="M 0,195 L 360,195"
                stroke="#E4E1E8"
                strokeLinecap="round"
                strokeWidth="10"
              />

              <Path
                d="M 70,0 L 70,250"
                stroke="#E4E1E8"
                strokeLinecap="round"
                strokeWidth="9"
              />

              <Path
                d="M 180,0 L 180,250"
                stroke="#E4E1E8"
                strokeLinecap="round"
                strokeWidth="11"
              />

              <Path
                d="M 290,0 L 290,250"
                stroke="#E4E1E8"
                strokeLinecap="round"
                strokeWidth="9"
              />

              {/* Safe Corridor */}
              <Path
                d="M 70,195 L 70,110 Q 70,80 100,80 L 180,80 L 180,40 L 290,40"
                opacity="0.45"
                stroke="#9AF4D4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />

              {/* Route */}
              <Path
                d="M 70,195 L 70,110 Q 70,80 100,80 L 180,80 L 180,40 L 290,40"
                stroke="#006951"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              />

              {/* Checkpoint */}
              <Circle
                cx="180"
                cy="80"
                fill="#645494"
                r="7"
              />

              <Circle
                cx="180"
                cy="80"
                fill="#FFFFFF"
                r="3"
              />

              {/* Start Marker */}
              <G>
                <Circle
                  cx="70"
                  cy="195"
                  fill="#006951"
                  opacity="0.2"
                  r="14"
                />

                <Circle
                  cx="70"
                  cy="195"
                  fill="#006951"
                  r="8"
                />

                <Circle
                  cx="70"
                  cy="195"
                  fill="#FFFFFF"
                  r="3.5"
                />
              </G>

              {/* Destination Marker */}
              <G>
                <Circle
                  cx="290"
                  cy="40"
                  fill="#006951"
                  opacity="0.2"
                  r="16"
                />

                <Circle
                  cx="290"
                  cy="40"
                  fill="#006951"
                  r="9"
                />

                <Path
                  d="M 286,-2 L 289,2 L 294,-3"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  transform="translate(0 40)"
                />
              </G>
            </Svg>

            {/* Safe Beacon */}
            <View style={styles.safeBeacon}>
              <View style={styles.beaconContent}>
                <View style={styles.beaconDot} />

                <Text
                  style={styles.beaconText}
                  numberOfLines={1}
                >
                  Ponto Seguro Monitorado:{' '}
                  {route.safeZoneHub ||
                    'Farmácia 24h • Km 0.9'}
                </Text>
              </View>

              <MaterialIcons
                name="local-convenience-store"
                size={16}
                color="#006951"
              />
            </View>
          </View>

          {/* Addresses */}
          <View style={styles.addresses}>
            {/* Origin */}
            <View style={styles.addressRow}>
              <View style={styles.timeline}>
                <View style={styles.originCircle}>
                  <View style={styles.whiteDot} />
                </View>

                <View style={styles.timelineLine} />
              </View>

              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>
                  PARTIDA
                </Text>

                <Text
                  style={styles.addressValue}
                  numberOfLines={1}
                >
                  {route.origin}
                </Text>
              </View>
            </View>

            {/* Destination */}
            <View style={styles.addressRow}>
              <View style={styles.timeline}>
                <View style={styles.destinationCircle}>
                  <MaterialIcons
                    name="school"
                    size={10}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>
                  CHEGADA
                </Text>

                <Text
                  style={styles.addressValue}
                  numberOfLines={1}
                >
                  {route.destination}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Trust Network */}
        <View style={styles.networkCard}>
          <View style={styles.networkHeader}>
            <View style={styles.networkTitleRow}>
              <MaterialIcons
                name="group"
                size={20}
                color="#006951"
              />

              <Text style={styles.networkTitle}>
                Rede de Confiança Ativa
              </Text>
            </View>

            <Text style={styles.notifiedText}>
              {route.guardiansNotified} Notificados
            </Text>
          </View>

          <View style={styles.guardiansBox}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarM}>
                <Text style={styles.avatarText}>
                  M
                </Text>
              </View>

              <View style={styles.avatarA}>
                <Text style={styles.avatarText}>
                  A
                </Text>
              </View>
            </View>

            <View style={styles.guardianTextContainer}>
              <Text style={styles.guardianDescription}>
                {route.guardianNames.join(' e ')} acompanharam
                sua rota em tempo real.
              </Text>

              <Text style={styles.guardianStatus}>
                Nenhuma anormalidade reportada pelas guardiãs.
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            onPress={() => onRepeatRoute(route)}
            style={styles.repeatButton}
          >
            <MaterialIcons
              name="replay"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.repeatText}>
              REPETIR ESTE TRAJETO
            </Text>
          </Pressable>

          <Pressable
            onPress={onBack}
            style={styles.historyButton}
          >
            <MaterialIcons
              name="history"
              size={18}
              color="#8A6D3B"
            />

            <Text style={styles.historyText}>
              VOLTAR AO HISTÓRICO
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2F9',
  },

  scroll: {
    flex: 1,
  },

  content: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 16,
    gap: 16,
  },

  topAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },

  backLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006951',
  },

  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#D9F7ED',
  },

  smallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#006951',
  },

  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006951',
  },

  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E8E5EA',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  routeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0EEF2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  routeTitleContainer: {
    flex: 1,
  },

  routeTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: '#1D1B20',
  },

  routeDate: {
    fontSize: 12,
    color: '#8A6D3B',
    marginTop: 2,
  },

  completedBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#D9F7ED',
  },

  completedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#006951',
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  metricCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0EEF2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  metricContent: {
    flex: 1,
  },

  metricLabel: {
    fontSize: 12,
    color: '#8A6D3B',
    marginBottom: 2,
  },

  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1B20',
  },

  statusCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#D9F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusContent: {
    flex: 1,
  },

  statusLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8A6D3B',
    letterSpacing: 1,
    marginBottom: 3,
  },

  statusValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D1B20',
  },

  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  mapTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  mapTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D1B20',
  },

  gpsBadge: {
    backgroundColor: '#F0EEF2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },

  gpsText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#68666D',
  },

  mapContainer: {
    width: '100%',
    height: 224,
    borderRadius: 12,
    backgroundColor: '#F0EEF2',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E5EA',
    position: 'relative',
  },

  safeBeacon: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  beaconContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  beaconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006951',
  },

  beaconText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#1D1B20',
  },

  addresses: {
    gap: 8,
    paddingTop: 4,
  },

  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  timeline: {
    width: 18,
    alignItems: 'center',
  },

  originCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#006951',
    alignItems: 'center',
    justifyContent: 'center',
  },

  destinationCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#645494',
    alignItems: 'center',
    justifyContent: 'center',
  },

  whiteDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },

  timelineLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E4E1E8',
    marginVertical: 2,
  },

  addressContent: {
    flex: 1,
  },

  addressLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8A6D3B',
    marginBottom: 2,
  },

  addressValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D1B20',
  },

  networkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  networkTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  networkTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D1B20',
  },

  notifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006951',
  },

  guardiansBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0EEF2',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  avatarContainer: {
    flexDirection: 'row',
    width: 58,
  },

  avatarM: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#006951',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  avatarA: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#645494',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  guardianTextContainer: {
    flex: 1,
  },

  guardianDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#1D1B20',
    fontWeight: '500',
    marginBottom: 2,
  },

  guardianStatus: {
    fontSize: 11,
    lineHeight: 16,
    color: '#8A6D3B',
  },

  actions: {
    gap: 10,
    paddingTop: 2,
  },

  repeatButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#006951',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  repeatText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  historyButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#F0EEF2',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  historyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A6D3B',
  },
});