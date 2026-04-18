// Converted from: ThamGiaLiveBattle.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const AVATARS = ['🧑', '👩', '👨', '👧', '🧒'];

export default function JoinLiveBattleScreen() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Background blobs */}
      <View style={[styles.blob, { top: 0, left: 0, width: 240, height: 240, backgroundColor: 'rgba(172,142,255,0.4)' }]} />
      <View style={[styles.blob, { bottom: 0, right: 0, width: 280, height: 280, backgroundColor: 'rgba(250,213,56,0.3)' }]} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.titleBlock}>
          <Text style={styles.titlePurple}>EduQuiz </Text>
          <Text style={styles.titleYellow}>Live</Text>
          <Text style={styles.subtitle}>Sẵn sàng cho cuộc chiến tri thức?</Text>
        </View>

        {/* Join form */}
        <View style={styles.formCard}>
          {/* Live badge */}
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeIcon}>⚡</Text>
            <Text style={styles.liveBadgeText}>Live Battle Active</Text>
          </View>

          {/* Avatar selection */}
          <View style={styles.avatarSection}>
            <Text style={styles.avatarTitle}>Chọn Avatar của bạn</Text>
            <View style={styles.avatarRow}>
              {AVATARS.map((emoji, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.avatarItem, selectedAvatar === i && styles.avatarItemSelected]}
                  onPress={() => setSelectedAvatar(i)}
                >
                  <Text style={styles.avatarEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* PIN input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Mã PIN trò chơi</Text>
            <View style={styles.pinInput}>
              <TextInput
                style={styles.pinTextInput}
                placeholder="000 000"
                placeholderTextColor={Colors.textMuted}
                value={pin}
                onChangeText={setPin}
                keyboardType="number-pad"
                maxLength={6}
                textAlign="center"
              />
            </View>
          </View>

          {/* Nickname input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Biệt danh của bạn</Text>
            <View style={styles.nicknameInput}>
              <Text style={styles.nicknameIcon}>😊</Text>
              <TextInput
                style={styles.nicknameTextInput}
                placeholder="Nhập tên..."
                placeholderTextColor={Colors.textMuted}
                value={nickname}
                onChangeText={setNickname}
              />
            </View>
          </View>

          <PrimaryButton
            label="Tham gia ngay  🚀"
            onPress={() => router.push(Routes.QUIZ_LOBBY)}
            disabled={pin.length < 6 || !nickname.trim()}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Bạn có tài khoản giáo viên? </Text>
          <TouchableOpacity onPress={() => router.push(Routes.LOGIN)}>
            <Text style={styles.footerLink}>Đăng nhập tại đây</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statItem}>👥  1.2M+ Đang chơi</Text>
          <Text style={styles.statItem}>⚡  Siêu tốc độ</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  blob: { position: 'absolute', borderRadius: 999 },
  scroll: { flexGrow: 1, padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { alignItems: 'center', gap: 2, paddingTop: Spacing.xl },
  titlePurple: { fontSize: 48, fontWeight: '800', color: Colors.primary, fontStyle: 'italic' },
  titleYellow: { fontSize: 48, fontWeight: '800', color: Colors.yellowAlt, fontStyle: 'italic', marginTop: -Spacing.base },
  subtitle: { fontSize: 13, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  formCard: { backgroundColor: Colors.white, borderRadius: 40, padding: Spacing['2xl'], gap: Spacing.xl, ...Shadow.xl },
  liveBadge: {
    position: 'absolute', top: -Spacing.base, right: Spacing.xl,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: Colors.primaryMuted,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    transform: [{ rotate: '12deg' }],
    ...Shadow.sm,
  },
  liveBadgeIcon: { fontSize: 14 },
  liveBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, textTransform: 'uppercase' },
  avatarSection: { gap: Spacing.md, alignItems: 'center' },
  avatarTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  avatarRow: { flexDirection: 'row', gap: Spacing.md },
  avatarItem: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primarySurface, alignItems: 'center', justifyContent: 'center', opacity: 0.4 },
  avatarItemSelected: { opacity: 1, backgroundColor: Colors.primary, ...Shadow.md },
  avatarEmoji: { fontSize: 28 },
  inputBlock: { gap: Spacing.sm },
  inputLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  pinInput: { backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], paddingVertical: Spacing.xl },
  pinTextInput: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  nicknameInput: { backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  nicknameIcon: { fontSize: 24 },
  nicknameTextInput: { flex: 1, fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 14, color: Colors.textSecondary },
  footerLink: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: Spacing['2xl'] },
  statItem: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary },
});
