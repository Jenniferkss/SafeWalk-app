import React, { useState } from 'react';
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
  Path,
  Rect,
} from 'react-native-svg';

import { Header } from '../components/Header';

export const RouteSummaryScreen = ({
  user,
  destinationTitle = 'Casa',
  onHome,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [rating, setRating] = useState('good');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <Header
        subtitle="Resumo Do Trajeto"
        showBack
        onBack={onBack}
        avatarUrl={user?.avatarUrl}
        onOpenScreenSwitcher={onOpenScreenSwitcher}
        currentScreen="route-summary"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration */}
        <View style={styles.celebration}>
          <View style={styles.celebrationCircle}>
            <View style={styles.celebrationOuter} />
            <View style={styles.celebrationMiddle} />

            <View style={styles.celebrationInner}>
              <MaterialIcons
                name="check-circle"
                size={38}
                color="#006951"
              />
            </View>
          </View>

          <Text style={styles.title}>
            Trajeto finalizado ✓
          </Text>

          <Text style={styles.subtitle}>
            Você chegou ao seu destino em total segurança.
            Seus contatos de confiança já foram notificados.
          </Text>
        </View>

        {/* Main Route Card */}
        <View style={styles.routeCard}>
          {/* Safe Status */}
          <View style={styles.safeStatus}>
            <View style={styles.safeStatusLeft}>
              <MaterialIcons
                name="verified-user"
                size={20}
                color="#006951"
              />

              <Text style={styles.safeStatusText}>
                100% monitorado com segurança
              </Text>
            </View>

            <MaterialIcons
              name="done-all"
              size={18}
              color="#006951"
            />
          </View>

          {/* Metrics */}
          <View style={styles.metrics}>
            <View style={styles.metricBox}>
              <View style={styles.metricCircle}>
                <MaterialIcons
                  name="schedule"
                  size={18}
                  color="#006951"
                />
              </View>

              <Text style={styles.metricValue}>
                18:42
              </Text>

              <Text style={styles.metricLabel}>
                TEMPO TOTAL
              </Text>
            </View>

            <View style={styles.metricBox}>
              <View style={styles.metricCircle}>
                <MaterialIcons
                  name="straighten"
                  size={18}
                  color="#006951"
                />
              </View>

              <Text style={styles.metricValue}>
                1,8 km
              </Text>

              <Text style={styles.metricLabel}>
                DISTÂNCIA PERCORRIDA
              </Text>
            </View>
          </View>

          {/* Map */}
          <View style={styles.mapContainer}>
            <Svg
              width="100%"
              height="100%"
              viewBox="0 0 340 200"
            >
              {/* City Blocks */}
              <Rect
                fill="#F5F2F9"
                height="45"
                rx="6"
                width="70"
                x="15"
                y="15"
              />

              <Rect
                fill="#F5F2F9"
                height="45"
                rx="6"
                width="115"
                x="105"
                y="15"
              />

              <Rect
                fill="#F5F2F9"
                height="75"
                rx="6"
                width="85"
                x="240"
                y="15"
              />

              <Rect
                fill="#F5F2F9"
                height="95"
                rx="6"
                width="70"
                x="15"
                y="80"
              />

              <Rect
                fill="#F5F2F9"
                height="50"
                rx="6"
                width="90"
                x="105"
                y="130"
              />

              <Rect
                fill="#F5F2F9"
                height="70"
                rx="6"
                width="110"
                x="215"
                y="110"
              />

              {/* Streets */}
              <Path
                d="M0,70 L340,70"
                stroke="#D7D4DC"
                strokeLinecap="round"
                strokeWidth="6"
              />

              <Path
                d="M95,0 L95,200"
                stroke="#D7D4DC"
                strokeLinecap="round"
                strokeWidth="6"
              />

              <Path
                d="M230,0 L230,200"
                stroke="#D7D4DC"
                strokeLinecap="round"
                strokeWidth="6"
              />

              <Path
                d="M0,120 L230,120"
                stroke="#D7D4DC"
                strokeLinecap="round"
                strokeWidth="4"
              />

              {/* Safe Corridor */}
              <Path
                d="M50,150 L95,150 L95,70 L210,70 L230,70 L230,45 L285,45"
                fill="none"
                opacity="0.65"
                stroke="#9AF4D4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="14"
              />

              {/* Route */}
              <Path
                d="M50,150 L95,150 L95,70 L210,70 L230,70 L230,45 L285,45"
                fill="none"
                stroke="#006951"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />

              {/* Origin */}
              <Circle
                cx="50"
                cy="150"
                fill="#645494"
                r="7"
              />

              <Circle
                cx="50"
                cy="150"
                fill="#FFFFFF"
                r="3.5"
              />

              {/* Destination */}
              <Circle
                cx="285"
                cy="45"
                fill="#006951"
                r="9"
              />

              <Circle
                cx="285"
                cy="45"
                fill="#FFFFFF"
                r="4.5"
              />
            </Svg>

            {/* Origin Badge */}
            <View style={styles.originBadge}>
              <View style={styles.originDot} />

              <Text style={styles.originText}>
                Av. Paulista
              </Text>
            </View>

            {/* Destination Badge */}
            <View style={styles.destinationBadge}>
              <MaterialIcons
                name="home"
                size={14}
                color="#006951"
              />

              <Text style={styles.destinationText}>
                {destinationTitle} (Chegada)
              </Text>
            </View>
          </View>

          {/* Contacts Notified */}
          <View style={styles.contactsRow}>
            <View style={styles.contactsLeft}>
              <View style={styles.avatars}>
                <View style={styles.avatarM}>
                  <Text style={styles.avatarText}>M</Text>
                </View>

                <View style={styles.avatarC}>
                  <Text style={styles.avatarText}>C</Text>
                </View>

                <View style={styles.avatarL}>
                  <Text style={styles.avatarText}>L</Text>
                </View>
              </View>

              <View style={styles.contactsText}>
                <Text style={styles.contactsTitle}>
                  Círculo Seguro notificado
                </Text>

                <Text style={styles.contactsSubtitle}>
                  3 contatos receberam o aviso
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="notifications-active"
              size={20}
              color="#006951"
            />
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingCard}>
          <View style={styles.ratingTextContainer}>
            <Text style={styles.ratingTitle}>
              Como foi a caminhada?
            </Text>

            <Text style={styles.ratingSubtitle}>
              Avalie a sensação de segurança
            </Text>
          </View>

          <View style={styles.ratingButtons}>
            {/* Bad */}
            <Pressable
              onPress={() => setRating('bad')}
              style={[
                styles.ratingButton,
                rating === 'bad'
                  ? styles.ratingBadActive
                  : styles.ratingInactive,
              ]}
            >
              <MaterialIcons
                name="sentiment-dissatisfied"
                size={18}
                color={
                  rating === 'bad'
                    ? '#B42318'
                    : '#8A6D3B'
                }
              />
            </Pressable>

            {/* Neutral */}
            <Pressable
              onPress={() => setRating('neutral')}
              style={[
                styles.ratingButton,
                rating === 'neutral'
                  ? styles.ratingNeutralActive
                  : styles.ratingInactive,
              ]}
            >
              <MaterialIcons
                name="sentiment-neutral"
                size={18}
                color={
                  rating === 'neutral'
                    ? '#645494'
                    : '#8A6D3B'
                }
              />
            </Pressable>

            {/* Good */}
            <Pressable
              onPress={() => setRating('good')}
              style={[
                styles.ratingButton,
                rating === 'good'
                  ? styles.ratingGoodActive
                  : styles.ratingInactive,
              ]}
            >
              <MaterialIcons
                name="sentiment-very-satisfied"
                size={20}
                color={
                  rating === 'good'
                    ? '#006951'
                    : '#8A6D3B'
                }
              />
            </Pressable>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {/* Save */}
          <Pressable
            onPress={handleSave}
            style={styles.saveButton}
          >
            <MaterialIcons
              name={isSaved ? 'check' : 'bookmark'}
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.saveText}>
              {isSaved
                ? 'TRAJETO SALVO COM SUCESSO!'
                : 'SALVAR TRAJETO'}
            </Text>
          </Pressable>

          {/* Home */}
          <Pressable
            onPress={onHome}
            style={styles.homeButton}
          >
            <MaterialIcons
              name="home"
              size={20}
              color="#1D1B20"
            />

            <Text style={styles.homeText}>
              VOLTAR AO INÍCIO
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
  },

  celebration: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },

  celebrationCircle: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  celebrationOuter: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#D9F7ED',
    opacity: 0.4,
  },

  celebrationMiddle: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#D9F7ED',
    opacity: 0.7,
  },

  celebrationInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#006951',
    letterSpacing: -0.3,
    marginBottom: 4,
    textAlign: 'center',
  },

  subtitle: {
    maxWidth: 320,
    fontSize: 12,
    lineHeight: 18,
    color: '#68666D',
    textAlign: 'center',
  },

  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    gap: 14,
    marginBottom: 16,

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

  safeStatus: {
    backgroundColor: '#E4F6EF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  safeStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  safeStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D1B20',
  },

  metrics: {
    flexDirection: 'row',
    gap: 10,
  },

  metricBox: {
    flex: 1,
    backgroundColor: '#F0EEF2',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  metricCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D9F7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },

  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D1B20',
  },

  metricLabel: {
    fontSize: 10,
    color: '#8A6D3B',
    fontWeight: '600',
    marginTop: 2,
  },

  mapContainer: {
    width: '100%',
    height: 176,
    backgroundColor: '#F0EEF2',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E5EA',
    position: 'relative',
  },

  originBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  originDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#645494',
  },

  originText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1D1B20',
  },

  destinationBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  destinationText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#006951',
  },

  contactsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },

  contactsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },

  avatars: {
    width: 76,
    height: 32,
    flexDirection: 'row',
  },

  avatarM: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#645494',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },

  avatarC: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8A6D3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -7,
    zIndex: 2,
  },

  avatarL: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#006951',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -7,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  contactsText: {
    flex: 1,
  },

  contactsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D1B20',
    marginBottom: 2,
  },

  contactsSubtitle: {
    fontSize: 11,
    color: '#68666D',
  },

  ratingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,

    borderWidth: 1,
    borderColor: '#E8E5EA',
  },

  ratingTextContainer: {
    flex: 1,
  },

  ratingTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D1B20',
    marginBottom: 2,
  },

  ratingSubtitle: {
    fontSize: 11,
    color: '#68666D',
  },

  ratingButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  ratingButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingInactive: {
    backgroundColor: '#F0EEF2',
  },

  ratingBadActive: {
    backgroundColor: '#FCE8E6',
  },

  ratingNeutralActive: {
    backgroundColor: '#E4DFF2',
  },

  ratingGoodActive: {
    backgroundColor: '#D9F7ED',
  },

  actions: {
    gap: 10,
    marginTop: 'auto',
  },

  saveButton: {
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

  saveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  homeButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#E8E5EA',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#D8D5DC',
  },

  homeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D1B20',
  },
});