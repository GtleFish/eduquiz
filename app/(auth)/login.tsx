// Converted from: src/app/components/DangNhap.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StyledTextInput } from '../../components/ui/StyledTextInput';
import { Divider } from '../../components/ui/Divider';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.logo}>EduQuiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace(Routes.HOME)}>
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeTitle}>Chào mừng!</Text>

        {/* Form card */}
        <View style={styles.card}>
          <StyledTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <StyledTextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <TouchableOpacity style={styles.forgotWrapper} onPress={() => router.push(Routes.FORGOT_PASSWORD)}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <PrimaryButton
            label="Đăng nhập"
            onPress={() => router.replace(Routes.HOME)}
          />

          <Divider label="Hoặc tiếp tục với" />

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialLabel}>G  Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={[styles.socialLabel, { color: '#1877F2' }]}>f  Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign up prompt */}
        <View style={styles.signupRow}>
          <Text style={styles.signupHint}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.push(Routes.REGISTER)}>
            <Text style={styles.signupLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { flexGrow: 1, paddingBottom: Spacing['3xl'] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  logo: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  skipText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  welcomeTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
    marginVertical: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    marginHorizontal: Spacing.xl,
    padding: Spacing['2xl'],
    gap: Spacing.base,
    ...Shadow.lg,
  },
  forgotWrapper: { alignSelf: 'flex-end' },
  forgotText: { color: Colors.primary, fontWeight: '600', fontSize: 14 },
  socialRow: { flexDirection: 'row', gap: Spacing.md },
  socialBtn: {
    flex: 1,
    backgroundColor: '#efdbff',
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  socialLabel: { fontWeight: '700', fontSize: 14, color: Colors.textPrimary },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  signupHint: { color: Colors.textSecondary, fontSize: 15 },
  signupLink: { color: Colors.primary, fontWeight: '700', fontSize: 15 },
});
