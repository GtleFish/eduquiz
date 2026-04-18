// Converted from: src/app/components/DangKy.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { StyledTextInput } from '../../components/ui/StyledTextInput';

type Role = 'student' | 'teacher';

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

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

        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Tạo tài khoản</Text>
          <Text style={styles.titlePurple}>mới</Text>
          <Text style={styles.subtitle}>
            Khám phá hành trình tri thức dành cho riêng bạn.
          </Text>
        </View>

        {/* Role selector */}
        <View style={styles.roleWrapper}>
          {(['student', 'teacher'] as Role[]).map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleBtn, role === r && styles.roleBtnActive]}
              onPress={() => setRole(r)}
              activeOpacity={0.8}
            >
              <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>
                {r === 'student' ? 'Học sinh' : 'Giáo viên'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Form */}
        <View style={styles.form}>
          <StyledTextInput
            placeholder="Họ và tên"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            containerStyle={styles.inputRounded}
          />
          <StyledTextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputRounded}
          />
          <StyledTextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            isPassword
            containerStyle={styles.inputRounded}
          />
          <StyledTextInput
            placeholder="Xác nhận mật khẩu"
            value={confirm}
            onChangeText={setConfirm}
            isPassword
            containerStyle={styles.inputRounded}
          />
        </View>

        {/* Submit */}
        <PrimaryButton
          label="Đăng ký ngay  →"
          onPress={() => router.push(Routes.OTP_VERIFY)}
        />

        {/* Login link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.push(Routes.LOGIN)}
        >
          <Text style={styles.loginLinkText}>Đã có tài khoản?</Text>
        </TouchableOpacity>

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
  scroll: { flexGrow: 1, paddingBottom: Spacing['3xl'] },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  logo: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  skipText: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary },
  titleBlock: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, gap: 2 },
  titleBlack: { fontSize: 40, fontWeight: '800', color: Colors.textPrimary },
  titlePurple: { fontSize: 40, fontWeight: '800', color: Colors.primary },
  subtitle: { fontSize: 15, color: Colors.textSecondary, marginTop: Spacing.sm, lineHeight: 22 },
  roleWrapper: {
    flexDirection: 'row',
    backgroundColor: '#efdbff',
    borderRadius: Radius.pill,
    padding: Spacing.xs,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    gap: Spacing.xs,
  },
  roleBtn: {
    flex: 1, paddingVertical: Spacing.md,
    borderRadius: Radius.pill, alignItems: 'center',
  },
  roleBtnActive: {
    backgroundColor: Colors.primary,
    ...Shadow.sm,
  },
  roleBtnText: { fontSize: 15, fontWeight: '600', color: Colors.textSecondary },
  roleBtnTextActive: { color: Colors.white },
  form: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  inputRounded: { borderRadius: Radius.xl },
  loginLink: { alignItems: 'center', marginTop: Spacing.base },
  loginLinkText: { color: Colors.primary, fontWeight: '700', fontSize: 15 },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    gap: Spacing.sm, marginTop: Spacing.xl,
  },
  dotActive: { width: 32, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryMuted },
});
