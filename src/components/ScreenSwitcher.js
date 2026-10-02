import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const ScreenSwitcher = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
}) => {
  const screens = [
    {
      id: 'login',
      name: '1. Login & Cadastro',
      category: 'Acesso',
      icon: 'login',
    },
    {
      id: 'permissions',
      name: '2. Permissões Necessárias',
      category: 'Configuração',
      icon: 'verified-user',
    },
    {
      id: 'home',
      name: '3. Início (Home)',
      category: 'Principal',
      icon: 'home',
    },
    {
      id: 'active-route',
      name: '4. Trajeto Ativo',
      category: 'Monitoramento',
      icon: 'directions-walk',
    },
    {
      id: 'motion-alert',
      name: '5. Alerta de Movimento',
      category: 'Segurança',
      icon: 'sensors',
    },
    {
      id: 'emergency-help',
      name: '6. Ajuda de Emergência',
      category: 'Segurança',
      icon: 'emergency',
    },
    {
      id: 'route-summary',
      name: '7. Resumo do Trajeto',
      category: 'Conclusão',
      icon: 'task-alt',
    },
    {
      id: 'history',
      name: '8. Histórico de Trajetos',
      category: 'Registros',
      icon: 'history',
    },
    {
      id: 'route-detail',
      name: '9. Detalhes do Trajeto',
      category: 'Registros',
      icon: 'alt-route',
    },
    {
      id: 'contacts',
      name: '10. Contatos de Confiança',
      category: 'Círculo Seguro',
      icon: 'group',
    },
    {
      id: 'gps-unavailable',
      name: '11. GPS Indisponível',
      category: 'Diagnóstico',
      icon: 'gps-off',
    },
  ];

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <View style={styles.dot} />

              <Text style={styles.title}>
                Navegar pelas 11 Telas
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
            >
              <MaterialIcons
                name="close"
                size={20}
                color="#5F6368"
              />
            </Pressable>
          </View>

          <Text style={styles.description}>
            Selecione qualquer tela para visualizar seu design e
            testar interações diretamente:
          </Text>

          <ScrollView
            style={styles.list}
            showsVerticalScrollIndicator={false}
          >
            {screens.map((screen) => {
              const isSelected =
                currentScreen === screen.id;

              return (
                <Pressable
                  key={screen.id}
                  onPress={() => {
                    onSelectScreen(screen.id);
                    onClose();
                  }}
                  style={[
                    styles.screenButton,
                    isSelected
                      ? styles.selectedButton
                      : styles.unselectedButton,
                  ]}
                >
                  <View style={styles.screenInfo}>
                    <View
                      style={[
                        styles.iconContainer,
                        isSelected
                          ? styles.selectedIcon
                          : styles.unselectedIcon,
                      ]}
                    >
                      <MaterialIcons
                        name={screen.icon}
                        size={20}
                        color={
                          isSelected
                            ? '#FFFFFF'
                            : '#1739C6'
                        }
                      />
                    </View>

                    <View style={styles.textContainer}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.screenName,
                          isSelected &&
                            styles.selectedText,
                        ]}
                      >
                        {screen.name}
                      </Text>

                      <Text
                        style={[
                          styles.category,
                          isSelected &&
                            styles.selectedCategory,
                        ]}
                      >
                        {screen.category}
                      </Text>
                    </View>
                  </View>

                  <MaterialIcons
                    name={
                      isSelected
                        ? 'check-circle'
                        : 'chevron-right'
                    }
                    size={18}
                    color={
                      isSelected
                        ? '#FFFFFF'
                        : '#9CA3AF'
                    }
                  />
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              SafeWalk • Proteção Feminina
            </Text>

            <Pressable onPress={onClose}>
              <Text style={styles.closeText}>
                Fechar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  modal: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1739C6',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  description: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 12,
  },

  list: {
    flexGrow: 0,
  },

  screenButton: {
    minHeight: 64,
    padding: 10,
    borderRadius: 16,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedButton: {
    backgroundColor: '#1739C6',
    elevation: 2,
  },

  unselectedButton: {
    backgroundColor: '#F5F6FA',
  },

  screenInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  selectedIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  unselectedIcon: {
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },

  textContainer: {
    flex: 1,
  },

  screenName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },

  selectedText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  category: {
    fontSize: 11,
    color: '#7B61A8',
    marginTop: 2,
  },

  selectedCategory: {
    color: 'rgba(255,255,255,0.8)',
  },

  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  footerText: {
    fontSize: 12,
    color: '#7B61A8',
  },

  closeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1739C6',
  },
});