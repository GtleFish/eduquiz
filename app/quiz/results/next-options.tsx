// Converted from: src/app/components/TuyChonTiepTheo.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { AppHeader } from '../../../components/ui/AppHeader';

const ACTIONS = [
  {
    icon: '🔄',
    title: 'Chơi lại',
    desc: 'Thử thách bản thân một lần nữa',
    bg: null,
    route: Routes.PLAY_MULTIPLE_CHOICE,
  },
  {
    icon: '📋',
    title: 'Xem giải thích',
    desc: 'Học từ những sai lầm của bạn',
    bg: Colors.primarySurface,
    route: Routes.RESULTS_DETAIL,
  },
  {
    icon: '⚔️',
    title: 'Thách đấu bạn',
    desc: 'Xem ai là người thông minh nhất',
    bg: Colors.primarySurface,
    route: Routes.LIVE_BATTLE_SETUP,
  },
  {
    icon: '🏠',
    title: 'Về trang chủ',
    desc: 'Khám phá các chủ đề khác',
    bg: Colors.primarySurface,
    route: Routes.HOME,
  },
] as const;

export default function NextOptionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader title="Quiz Complete" onBack={() => router.back()} onAction={() => {}} variant="quiz" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Score hero */}
        <View style={styles.heroCard}>
          <View style={styles.trophyCircle}>
            <Text style={styles.trophyIcon}>🏆</Text>
          </View>
          <Text style={styles.heroTitle}>Xuất sắc!</Text>
          <Text style={styles.heroDesc}>
            Bạn đã hoàn thành bài thi với kết{'\n'}quả ấn tượng.
          </Text>
          <View style={styles.scoreRow}>
            <View style={styles.scoreItem}>
              <Text style={styles.scoreItemLabel}>Điểm số</Text>
              <Text style={styles.scoreItemValue}>950</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreItem}>
              <Text style={styles.scoreItemLabel}>Chính xác</Text>
              <Text style={styles.scoreItemValue}>95%</Text>
            </View>
          </View>
        </View>

        {/* Action list */}
        <View style={styles.actionList}>
          {ACTIONS.map((action) => {
            if (!action.bg) {
              return (
                <TouchableOpacity
                  key={action.title}
                  onPress={() => router.push(action.route as any)}
                  activeOpacity={0.85}
                >
                  <LinearGradient
                    colors={[Colors.primary, Colors.primaryGradientEnd]}
                    style={styles.actionCard}
                  >
                    <View style={styles.actionIconWrapper}>
                      <Text style={styles.actionIcon}>{action.icon}</Text>
                    </View>
                    <View style={styles.actionText}>
                      <Text style={[styles.actionTitle, { color: Colors.white }]}>{action.title}</Text>
                      <Text style={[styles.actionDesc, { color: 'rgba(255,255,255,0.8)' }]}>{action.desc}</Text>
                    </View>
                    <Text style={[styles.actionArrow, { color: Colors.white }]}>→</Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={action.title}
                style={[styles.actionCard, { backgroundColor: action.bg }]}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIconWrapper, { backgroundColor: Colors.primaryMuted }]}>
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                </View>
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDesc}>{action.desc}</Text>
                </View>
                <Text style={styles.actionArrow}>→</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Streak badge */}
        <View style={styles.streakCard}>
          <View style={styles.streakAvatar}>
            <Text style={styles.streakAvatarText}>🔥</Text>
          </View>
          <View style={styles.streakInfo}>
            <Text style={styles.streakLabel}>Kỷ lục mới!</Text>
            <Text style={styles.streakQuote}>
              "Bạn vừa đạt chuỗi 15 ngày học liên tiếp. Đừng dừng lại nhé!"
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  heroCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: 40,
    padding: Spacing['2xl'],
    alignItems: 'center',
    gap: Spacing.base,
  },
  trophyCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  trophyIcon: { fontSize: 36 },
  heroTitle: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  heroDesc: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
    width: '100%',
    marginTop: Spacing.sm,
  },
  scoreItem: { flex: 1, alignItems: 'center' },
  scoreItemLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  scoreItemValue: { fontSize: 36, fontWeight: '800', color: '#2a0070' },
  scoreDivider: { width: 1, height: 48, backgroundColor: 'rgba(104,58,209,0.2)' },
  actionList: { gap: Spacing.md },
  actionCard: {
    borderRadius: 40,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  actionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: { fontSize: 24 },
  actionText: { flex: 1 },
  actionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  actionDesc: { fontSize: 13, color: Colors.textSecondary },
  actionArrow: { fontSize: 20, color: Colors.textSecondary },
  streakCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    borderLeftWidth: 6,
    borderLeftColor: Colors.yellowAlt,
  },
  streakAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakAvatarText: { fontSize: 28 },
  streakInfo: { flex: 1 },
  streakLabel: { fontSize: 12, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  streakQuote: { fontSize: 14, color: Colors.textPrimary, fontStyle: 'italic', lineHeight: 22, marginTop: 4 },
});
