import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { SAFEWALK_ASSETS } from "../data/mockData";

export const LoginScreen = ({
  onSuccess,
  onOpenScreenSwitcher,
}) => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("sofia@exemplo.com");
  const [password, setPassword] = useState("••••••••••••");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = () => {
    setFeedbackMsg(
      mode === "login"
        ? "Conectando ao SafeWalk..."
        : "Criando conta protegida..."
    );

    setTimeout(() => {
      onSuccess("permissions");
    }, 700);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Recuperação de senha",
      "Link de recuperação enviado para seu email ou WhatsApp!"
    );
  };

  const handleTerms = () => {
    Alert.alert(
      "Termos de Uso",
      "Termos de Uso do SafeWalk: Segurança privada, sigilo total e prioridade de proteção."
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Política de Privacidade",
      "Política de Privacidade Feminina: Nenhum compartilhamento com terceiros não autorizados. Trajetos criptografados."
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Botão de troca de tela */}
        <View style={styles.topBar}>
          {onOpenScreenSwitcher && (
            <Pressable
              onPress={onOpenScreenSwitcher}
              style={({ pressed }) => [
                styles.screenSwitcher,
                pressed && styles.pressed,
              ]}
            >
              <MaterialIcons
                name="layers"
                size={15}
                color="#006951"
              />

              <Text style={styles.screenSwitcherText}>
                Ver Telas
              </Text>
            </Pressable>
          )}
        </View>

        {/* Logo e apresentação */}
        <View style={styles.brandSection}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoGlow} />

            <Image
              source={{ uri: SAFEWALK_ASSETS.logoMain }}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>

          <View style={styles.brandNameRow}>
            <Text style={styles.brandName}>
              SafeWalk
            </Text>

            <View style={styles.verifiedBadge}>
              <MaterialIcons
                name="verified-user"
                size={14}
                color="#006951"
              />
            </View>
          </View>

          <Text style={styles.brandSubtitle}>
            Sua caminhada com segurança e tranquilidade
          </Text>

          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />

            <Text style={styles.activeBadgeText}>
              Rede ativa de proteção feminina
            </Text>
          </View>
        </View>

        {/* Abas */}
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setMode("login")}
            style={[
              styles.tab,
              mode === "login" && styles.activeTab,
            ]}
          >
            <MaterialIcons
              name="login"
              size={17}
              color={mode === "login" ? "#006951" : "#77737E"}
            />

            <Text
              style={[
                styles.tabText,
                mode === "login" && styles.activeTabText,
              ]}
            >
              Entrar
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setMode("register")}
            style={[
              styles.tab,
              mode === "register" && styles.activeTab,
            ]}
          >
            <MaterialIcons
              name="person-add"
              size={17}
              color={mode === "register" ? "#006951" : "#77737E"}
            />

            <Text
              style={[
                styles.tabText,
                mode === "register" && styles.activeTabText,
              ]}
            >
              Criar conta
            </Text>
          </Pressable>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
          {/* Nome */}
          {mode === "register" && (
            <View style={styles.field}>
              <Text style={styles.label}>
                Como prefere ser chamada?
              </Text>

              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="sentiment-satisfied"
                  size={21}
                  color="#77737E"
                  style={styles.inputIcon}
                />

                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Seu nome ou apelido carinhoso"
                  placeholderTextColor="#AAA6B0"
                  style={styles.input}
                />
              </View>
            </View>
          )}

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>
              Email ou Celular
            </Text>

            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="alternate-email"
                size={21}
                color="#77737E"
                style={styles.inputIcon}
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com ou telefone"
                placeholderTextColor="#AAA6B0"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Senha */}
          <View style={styles.field}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>
                Senha de Acesso
              </Text>

              {mode === "login" && (
                <Pressable onPress={handleForgotPassword}>
                  <Text style={styles.forgotPassword}>
                    Esqueci minha senha
                  </Text>
                </Pressable>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="lock"
                size={21}
                color="#77737E"
                style={styles.inputIcon}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha segura"
                placeholderTextColor="#AAA6B0"
                style={styles.input}
                secureTextEntry={!showPassword}
              />

              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <MaterialIcons
                  name={
                    showPassword
                      ? "visibility-off"
                      : "visibility"
                  }
                  size={21}
                  color="#77737E"
                />
              </Pressable>
            </View>
          </View>

          {/* Aviso de segurança */}
          <View style={styles.securityNotice}>
            <View style={styles.securityIcon}>
              <MaterialIcons
                name="shield"
                size={19}
                color="#006951"
              />
            </View>

            <View style={styles.securityTextContainer}>
              <Text style={styles.securityTitle}>
                Criptografia de Ponta a Ponta
              </Text>

              <Text style={styles.securityDescription}>
                Seus dados e trajetos são visíveis apenas para os
                contatos de confiança autorizados por você.
              </Text>
            </View>
          </View>

          {/* Botão principal */}
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.submitText}>
              {mode === "login"
                ? "ENTRAR NO SAFEWALK"
                : "CRIAR MINHA CONTA PROTEGIDA"}
            </Text>

            <MaterialIcons
              name="arrow-forward"
              size={21}
              color="#FFFFFF"
            />
          </Pressable>

          {feedbackMsg !== "" && (
            <Text style={styles.feedback}>
              {feedbackMsg}
            </Text>
          )}
        </View>

        {/* Divisor */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />

          <View style={styles.dividerLabelContainer}>
            <Text style={styles.dividerLabel}>
              ou continue com
            </Text>
          </View>
        </View>

        {/* Google e Apple */}
        <View style={styles.socialButtons}>
          <Pressable
            onPress={() => onSuccess("permissions")}
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.googleIcon}>
              G
            </Text>

            <Text style={styles.socialText}>
              Google
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onSuccess("permissions")}
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="apple"
              size={19}
              color="#25232A"
            />

            <Text style={styles.socialText}>
              Apple
            </Text>
          </Pressable>
        </View>

        {/* Banner de confiança */}
        <View style={styles.trustBanner}>
          <View style={styles.heartIcon}>
            <MaterialIcons
              name="favorite"
              size={20}
              color="#006951"
            />
          </View>

          <View style={styles.trustTextContainer}>
            <Text style={styles.trustTitle}>
              Feito por e para mulheres
            </Text>

            <Text style={styles.trustDescription}>
              Espaço acolhedor, sem julgamentos e 100% focado
              no seu bem-estar.
            </Text>
          </View>
        </View>

        {/* Termos */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ao prosseguir, você concorda com nossos{" "}
            <Text
              style={styles.footerLink}
              onPress={handleTerms}
            >
              Termos de Uso
            </Text>{" "}
            e nossa{" "}
            <Text
              style={styles.footerLink}
              onPress={handlePrivacy}
            >
              Política de Privacidade Feminina
            </Text>
            .
          </Text>

          <View style={styles.protectedRow}>
            <MaterialIcons
              name="lock-clock"
              size={15}
              color="#006951"
            />

            <Text style={styles.protectedText}>
              Seus passos protegidos em cada esquina
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F2F9",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 25,
  },

  topBar: {
    alignItems: "flex-end",
    height: 32,
  },

  screenSwitcher: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E4F6EF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },

  screenSwitcherText: {
    color: "#006951",
    fontSize: 10,
    fontWeight: "700",
  },

  brandSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },

  logoWrapper: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  logoGlow: {
    position: "absolute",
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#D9F7ED",
    opacity: 0.7,
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },

  brandNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 3,
  },

  brandName: {
    fontSize: 25,
    fontWeight: "800",
    color: "#25232A",
  },

  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D9F7ED",
    alignItems: "center",
    justifyContent: "center",
  },

  brandSubtitle: {
    fontSize: 12,
    color: "#77737E",
    textAlign: "center",
    maxWidth: 280,
  },

  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E4F6EF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#006951",
  },

  activeBadgeText: {
    color: "#006951",
    fontSize: 10,
    fontWeight: "700",
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#E2E0E6",
    padding: 4,
    borderRadius: 17,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    height: 40,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  tabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#77737E",
  },

  activeTabText: {
    color: "#006951",
  },

  form: {
    gap: 14,
  },

  field: {
    gap: 6,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#25232A",
    paddingHorizontal: 4,
  },

  inputWrapper: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2DFE6",
  },

  inputIcon: {
    marginLeft: 14,
  },

  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#25232A",
  },

  eyeButton: {
    padding: 10,
    marginRight: 2,
  },

  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forgotPassword: {
    fontSize: 10,
    fontWeight: "700",
    color: "#006951",
  },

  securityNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8F8F2",
    padding: 14,
    borderRadius: 16,
    gap: 10,
  },

  securityIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  securityTextContainer: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#25232A",
  },

  securityDescription: {
    fontSize: 10,
    lineHeight: 15,
    color: "#625F69",
    marginTop: 2,
  },

  submitButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#006951",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 2,
    elevation: 3,
    shadowColor: "#006951",
    shadowOpacity: 0.18,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  feedback: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
    color: "#006951",
  },

  dividerContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#C8C4CD",
  },

  dividerLabelContainer: {
    position: "absolute",
    backgroundColor: "#F5F2F9",
    paddingHorizontal: 12,
  },

  dividerLabel: {
    fontSize: 10,
    color: "#77737E",
  },

  socialButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },

  googleIcon: {
    fontSize: 17,
    fontWeight: "800",
    color: "#4285F4",
  },

  socialText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#25232A",
  },

  trustBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    gap: 10,
    marginBottom: 18,
  },

  heartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E4F6EF",
    alignItems: "center",
    justifyContent: "center",
  },

  trustTextContainer: {
    flex: 1,
  },

  trustTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#25232A",
  },

  trustDescription: {
    fontSize: 10,
    lineHeight: 15,
    color: "#77737E",
    marginTop: 2,
  },

  footer: {
    alignItems: "center",
    paddingTop: 4,
  },

  footerText: {
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
    color: "#77737E",
  },

  footerLink: {
    color: "#006951",
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  protectedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },

  protectedText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#77737E",
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});