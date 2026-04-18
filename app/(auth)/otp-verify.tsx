// Converted from: src/app/components/XacThucOtp.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { useCountdown } from '../../hooks/useCountdown';

const OTP_LENGTH = 6;

export default function OtpVerifyScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);
  const { seconds, isExpired, start } = useCountdown(119); // 1:59

  useEffect(() => { start(); }, []);

  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const isFilled = otp.every((d) => d !== '');

  return (
    <ScrollView
      style={styles.screen}
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

      {/* Ready badge */}
      <View style={styles.readyBadge}>
        <Text style={styles.readyIcon}>⚡</Text>
        <Text style={styles.readyText}>READY TO LEARN</Text>
      </View>

      {/* Illustration placeholder */}
      <View style={styles.illustration}>
        <Text style={styles.illustrationEmoji}>📱</Text>
      </View>

      {/* Title */}
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Xác minh OTP</Text>
        <Text style={styles.subtitle}>
          Chúng tôi đã gửi mã xác minh gồm 6 chữ số đến số điện thoại của bạn.
        </Text>
      </View>

      {/* OTP inputs */}
      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(el) => { inputs.current[i] = el; }}
            style={[styles.otpCell, digit ? styles.otpCellFilled : null]}
            value={digit}
            onChangeText={(v) => handleChange(v, i)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
          />
        ))}
      </View>

      {/* Timer + resend */}
      <View style={styles.timerBlock}>
        <View style={styles.timerBadge}>
          <Text style={styles.timerIcon}>⏱</Text>
          <Text style={styles.timerText}>
            {isExpired ? '00:00' : formatTime(seconds)}
          </Text>
        </View>
        <View style={styles.resendRow}>
          <Text style={styles.resendHint}>Bạn chưa nhận được mã? </Text>
          <TouchableOpacity disabled={!isExpired}>
            <Text style={[styles.resendLink, !isExpired && styles.resendLinkDisabled]}>
              Gửi lại mã
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm button */}
      <PrimaryButton
        label="Xác nhận"
        onPress={() => router.push('/(auth)/success')}
        disabled={!isFilled}
        style={styles.btn}
      />

      {/* Progress dots */}
      <View style={styles.dots}>
        <View style={styles.dotInactive} />
        <View style={styles.dotActive} />
        <View style={styles.dotInactive} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { alignItems: 'center', paddingBottom: Spacing['3xl'] },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', width: '100%',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  logo: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  skipText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  readyBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    alignSelf: 'flex-end', marginRight: Spacing.xl, marginBottom: Spacing.xl,
  },
  readyIcon: { fontSize: 16 },
  readyText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 0.5 },
  illustration: {
    width: 160, height: 160, borderRadius: Radius['2xl'],
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.xl,
    ...Shadow.lg,
  },
  illustrationEmoji: { fontSize: 72 },
  titleBlock: {
    alignItems: 'center', gap: Spacing.sm,
    paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl,
  },
  title: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  subtitle: {
    fontSize: 15, color: Colors.textSecondary,
    textAlign: 'center', lineHeight: 22,
  },
  otpRow: {
    flexDirection: 'row', gap: Spacing.sm,
    paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl,
  },
  otpCell: {
    flex: 1, height: 56, borderRadius: Radius.xl,
    backgroundColor: Colors.cardBg,
    fontSize: 24, fontWeight: '700', color: Colors.textPrimary,
    textAlign: 'center',
  },
  otpCellFilled: {
    backgroundColor: Colors.primarySurface,
    borderWidth: 2, borderColor: Colors.primary,
  },
  timerBlock: { alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xl },
  timerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  timerIcon: { fontSize: 16 },
  timerText: { fontWeight: '700', color: Colors.primary, fontSize: 16 },
  resendRow: { flexDirection: 'row' },
  resendHint: { fontSize: 14, color: Colors.textSecondary },
  resendLink: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  resendLinkDisabled: { color: Colors.textMuted },
  btn: { alignSelf: 'stretch', marginHorizontal: Spacing.xl },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    gap: Spacing.sm, marginTop: Spacing.xl,
  },
  dotActive: { width: 32, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryMuted },
});
