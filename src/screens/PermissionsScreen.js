import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const PermissionsScreen = ({
  onConfirm,
  onBack,
  onOpenScreenSwitcher,
}) => {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [sensorsEnabled, setSensorsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Top action */}
      <View style={styles.topAction}>
        <Pressable
          onPress={onBack}
          style={styles.backButton}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#1D1B20"
          />
        </Pressable>

        {onOpenScreenSwitcher && (
          <Pressable
            onPress={onOpenScreenSwitcher}
            style={styles.screenSwitcher}
          >
            <MaterialIcons
              name="layers"
              size={15}
              color="#1739C6"
            />
            <Text style={styles.screenSwitcherText}>
              Ver Telas
            </Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Shield Aura Graphic */}
        <View style={styles.visualAccent}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <MaterialIcons
                name="verified-user"
                size={32}
                color="#006951"
              />
            </View>
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerText}>
          <Text style={styles.title}>
            Permissões necessárias
          </Text>

          <Text style={styles.description}>
            Para acompanhar seu trajeto e utilizar os recursos
            de segurança, o SafeWalk precisa acessar alguns
            recursos do seu celular.
          </Text>
        </View>

        {/* Permission Cards */}
        <View style={styles.cardsContainer}>
          {/* Localização */}
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.locationIcon}>
                <MaterialIcons
                  name="location-on"
                  size={26}
                  color="#006951"
                />
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>
                    Localização
                  </Text>

                  <View style={styles.requiredBadge}>
                    <Text style={styles.requiredText}>
                      Necessária
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardDescription}>
                  Necessária para acompanhar e compartilhar sua
                  localização durante o trajeto.
                </Text>

                <View style={styles.controlRow}>
                  <View style={styles.controlLabel}>
                    <View style={styles.primaryDot} />

                    <Text style={styles.controlText}>
                      Acesso em segundo plano
                    </Text>
                  </View>

                  <Pressable
                    onPress={() =>
                      setLocationEnabled(!locationEnabled)
                    }
                    style={[
                      styles.switch,
                      locationEnabled
                        ? styles.switchActive
                        : styles.switchInactive,
                    ]}
                  >
                    <View
                      style={[
                        styles.switchThumb,
                        locationEnabled
                          ? styles.switchThumbActive
                          : styles.switchThumbInactive,
                      ]}
                    >
                      {locationEnabled && (
                        <MaterialIcons
                          name="check"
                          size={14}
                          color="#006951"
                        />
                      )}
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* Sensores */}
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.sensorIcon}>
                <MaterialIcons
                  name="vibration"
                  size={26}
                  color="#006951"
                />
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>
                    Sensores
                  </Text>

                  <View style={styles.sensorBadge}>
                    <Text style={styles.sensorBadgeText}>
                      Necessários
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardDescription}>
                  Utilizados para identificar mudanças
                  inesperadas de movimento e paradas abruptas.
                </Text>

                <View style={styles.controlRow}>
                  <View style={styles.controlLabel}>
                    <View style={styles.secondaryDot} />

                    <Text style={styles.controlText}>
                      Giroscópio & Movimento
                    </Text>
                  </View>

                  <Pressable
                    onPress={() =>
                      setSensorsEnabled(!sensorsEnabled)
                    }
                    style={[
                      styles.switch,
                      sensorsEnabled
                        ? styles.switchActive
                        : styles.switchInactive,
                    ]}
                  >
                    <View
                      style={[
                        styles.switchThumb,
                        sensorsEnabled
                          ? styles.switchThumbActive
                          : styles.switchThumbInactive,
                      ]}
                    >
                      {sensorsEnabled && (
                        <MaterialIcons
                          name="check"
                          size={14}
                          color="#006951"
                        />
                      )}
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.privacyBox}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#8A6D3B"
          />

          <Text style={styles.privacyText}>
            Seus dados de trajeto são criptografados de ponta a
            ponta e visíveis apenas para os contatos de confiança
            que você autorizar expressamente.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.actions}>
        <Pressable
          onPress={onConfirm}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmText}>
            PERMITIR ACESSO
          </Text>

          <MaterialIcons
            name="arrow-forward"
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          onPress={onBack}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>
            VOLTAR
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F2F9',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  topAction: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E4F6EF',
  },

  screenSwitcherText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1739C6',
  },

  content: {
    paddingTop: 18,
    paddingBottom: 16,
  },

  visualAccent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },

  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },

  headerText: {
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D1B20',
    marginBottom: 6,
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#68666D',
    textAlign: 'center',
    maxWidth: 320,
  },

  cardsContainer: {
    gap: 16,
    marginBottom: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,

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

  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },

  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#D9F7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sensorIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E4F6EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    flex: 1,
    minWidth: 0,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
  },

  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1B20',
  },

  requiredBadge: {
    backgroundColor: '#E4F6EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  requiredText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006951',
  },

  sensorBadge: {
    backgroundColor: '#D9F7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  sensorBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#006951',
  },

  cardDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: '#68666D',
    marginBottom: 12,
  },

  controlRow: {
    borderTopWidth: 1,
    borderTopColor: '#F0EEF2',
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  controlLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  controlText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#68666D',
  },

  primaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006951',
  },

  secondaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006951',
  },

  switch: {
    width: 48,
    height: 28,
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
  },

  switchActive: {
    backgroundColor: '#006951',
  },

  switchInactive: {
    backgroundColor: '#A9A7AD',
  },

  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },

  switchThumbActive: {
    alignSelf: 'flex-end',
  },

  switchThumbInactive: {
    alignSelf: 'flex-start',
  },

  privacyBox: {
    width: '100%',
    backgroundColor: '#EDEBF0',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 4,
  },

  privacyText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: '#8A6D3B',
  },

  actions: {
    width: '100%',
    gap: 10,
    marginTop: 8,
  },

  confirmButton: {
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

  confirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  cancelButton: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A6D3B',
  },
});