import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const BottomNav = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: 'home',
      label: 'Início',
      icon: 'shield',
      isActive: currentScreen === 'home',
    },
    {
      id: 'history',
      label: 'Histórico',
      icon: 'history',
      isActive:
        currentScreen === 'history' ||
        currentScreen === 'route-detail',
    },
    {
      id: 'contacts',
      label: 'Contatos',
      icon: 'group',
      isActive: currentScreen === 'contacts',
    },
  ];

  return (
    <View style={styles.nav}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const active = tab.isActive;

          return (
            <Pressable
              key={tab.id}
              onPress={() => onNavigate(tab.id)}
              style={styles.tab}
            >
              <MaterialIcons
                name={tab.icon}
                size={24}
                color={active ? '#1739C6' : '#6B7280'}
              />

              <Text
                style={[
                  styles.label,
                  active && styles.activeLabel,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  container: {
    height: 72,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  tab: {
    minWidth: 64,
    minHeight: 48,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#6B7280',
  },

  activeLabel: {
    color: '#1739C6',
    fontWeight: '700',
  },
});