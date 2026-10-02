import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SAFEWALK_ASSETS } from '../data/mockData';

export const Header = ({
  subtitle = 'Home',
  onBack,
  showBack = false,
  avatarUrl = SAFEWALK_ASSETS.userSofia,
  onOpenScreenSwitcher,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack && onBack ? (
            <Pressable
              accessibilityLabel="Voltar"
              onPress={onBack}
              style={styles.backButton}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color="#1A1A1A"
              />
            </Pressable>
          ) : null}

          <View style={styles.brand}>
            <Image
              source={{ uri: SAFEWALK_ASSETS.logoShield }}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.brandText}>
              <Text style={styles.title}>SafeWalk</Text>
              <Text style={styles.subtitle}>
                {subtitle}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightSection}>
          {onOpenScreenSwitcher ? (
            <Pressable
              onPress={onOpenScreenSwitcher}
              style={styles.screenButton}
            >
              <MaterialIcons
                name="layers"
                size={15}
                color="#1739C6"
              />
              <Text style={styles.screenButtonText}>
                Telas
              </Text>
            </Pressable>
          ) : null}

          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatarUrl }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  container: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 40,
    height: 40,
    marginLeft: -6,
    marginRight: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  logo: {
    width: 32,
    height: 32,
  },

  brandText: {
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1739C6',
    lineHeight: 20,
  },

  subtitle: {
    marginTop: 1,
    fontSize: 11,
    fontWeight: '700',
    color: '#7B61A8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  screenButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#E8EDFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  screenButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1739C6',
    letterSpacing: 0.5,
  },

  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(23,57,198,0.2)',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },
});