// Converted from: src/app/components/DatLaiMatKhau.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StyledTextInput } from '../../components/ui/StyledTextInput';
import { AppHeader } from '../../components/ui/AppHeader';

const REQUIREMENTS = [
  { text: 'Ít nhất 8 ký tự', met: true },
  { text: 'Bao gồm chữ cái và số', met: false },
];

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AppHeader
        title="Đặt lại mật khẩu"
        onBack={() => router.back()}
        rightElement={<Text style={styles.logoText}>EduQuiz</Text>}
        variant="quiz"
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <View style={styles.card}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🔄</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Mật khẩu mới</Text>
          <Text style={styles.subtitle}>
            Hãy tạo mật khẩu mạnh để bảo vệ tài khoản học tập của bạn.
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <StyledTextInput
              placeholder="Mật khẩu mới"
              value={password}
              onChangeText={setPassword}
              isPassword
            />
            <StyledTextInput
              placeholder="Xác nhận mật khẩu"
              value={confirm}
              onChangeText={setConfirm}
              isPassword
            />

            {/* Requirements */}
            <View style={styles.requirementsCard}>
              <Text style={styles.requirementsTitle}>Yêu cầu bảo mật</Text>
              {REQUIREMENTS.map((req) => (
                <View key={req.text} style={styles.requirementRow}>
                  <Text style={[styles.requirementIcon, req.met && styles.requirementIconMet]}>
                    {req.met ? '✓' : '○'}
                  </Text>
                  <Text style={styles.requirementText}>{req.text}</Text>
                </View>
              ))}
            </View>

            <PrimaryButton
              label="Cập nhật mật khẩu  →"
              onPress={() => router.replace('/(auth)/success')}
            />
          </View>
        </View>

        {/* Security badge */}
        <View style={styles.securityRow}>
          <View style={styles.securityBadge}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>Bảo mật SSL 256-bit</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.helpText}>Bạn cần hỗ trợ?</Text>
          </TouchableOpacity>
        </View>

        {/* Progress dots */}
        <View style={styles.dots}>
          <View style={styles.dotInactive} />
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  logoText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  scroll: {
    flexGrow: 1, alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingBottom: Spacing['3xl'],
  },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius['2xl'],
    padding: Spacing['2xl'], width: '100%',
    marginTop: Spacing.xl, alignItems: 'center',
    ...Shadow.lg,
  },
  iconWrapper: { marginBottom: Spacing.xl },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji: { fontSize: 36 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.sm },
  subtitle: {
    fontSize: 14, color: Colors.textSecondary,
    textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl,
  },
  form: { width: '100%', gap: Spacing.base },
  requirementsCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'], padding: Spacing.base, gap: Spacing.sm,
  },
  requirementsTitle: {
    fontSize: 11, fontWeight: '700', color: Colors.primary,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: Spacing.xs,
  },
  requirementRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  requirementIcon: { fontSize: 14, color: Colors.textMuted, width: 16 },
  requirementIconMet: { color: Colors.primary },
  requirementText: { fontSize: 13, color: Colors.textSecondary },
  securityRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: Spacing.md, marginTop: Spacing.xl,
  },
  securityBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: 'rgba(104,58,209,0.08)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  securityIcon: { fontSize: 14 },
  securityText: { fontSize: 12, color: Colors.primary, fontWeight: '500' },
  helpText: { fontSize: 13, color: Colors.textSecondary },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    gap: Spacing.sm, marginTop: Spacing.xl,
  },
  dotActive: { width: 32, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryMuted },
});
