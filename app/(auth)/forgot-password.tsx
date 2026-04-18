// Converted from: src/app/components/QuenMatKhau.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StyledTextInput } from '../../components/ui/StyledTextInput';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

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
          <TouchableOpacity onPress={() => router.replace('/(tabs)/')}>
            <Text style={styles.skipText}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>

        {/* Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🔄</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Quên mật khẩu?</Text>
          <Text style={styles.subtitle}>
            Nhập email của bạn để nhận mã khôi phục
          </Text>
        </View>

        {/* Email field */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>Địa chỉ Email</Text>
          <StyledTextInput
            placeholder="ten@vidu.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            rightIcon="✉️"
            containerStyle={styles.inputRounded}
          />
        </View>

        {/* Submit */}
        <PrimaryButton
          label="Gửi mã xác thực"
          onPress={() => router.push('/(auth)/otp-verify')}
          style={styles.btn}
        />

        {/* Back to login */}
        <View style={styles.loginRow}>
          <Text style={styles.loginHint}>Bạn đã nhớ lại? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Progress dots */}
        <View style={styles.dots}>
          <View style={styles.dotActive} />
          <View style={styles.dotInactive} />
          <View style={styles.dotInactive} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: {
    flexGrow: 1, alignItems: 'center',
    paddingBottom: Spacing['3xl'],
  },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  logo: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  skipText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  iconWrapper: { marginTop: Spacing['2xl'], marginBottom: Spacing.xl },
  iconCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji: { fontSize: 56 },
  titleBlock: { alignItems: 'center', gap: Spacing.sm, paddingHorizontal: Spacing.xl },
  title: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  fieldWrapper: {
    width: '100%', paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl, gap: Spacing.sm,
  },
  fieldLabel: {
    fontSize: 12, fontWeight: '700', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.8,
  },
  inputRounded: { borderRadius: Radius.xl },
  btn: { marginTop: Spacing.xl, marginHorizontal: Spacing.xl, alignSelf: 'stretch' },
  loginRow: {
    flexDirection: 'row', marginTop: Spacing.xl,
  },
  loginHint: { fontSize: 15, color: Colors.textSecondary },
  loginLink: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    gap: Spacing.sm, marginTop: Spacing['2xl'],
  },
  dotActive: { width: 32, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryMuted },
});
