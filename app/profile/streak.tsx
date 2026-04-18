// Converted from: src/app/components/ChuoiHocTapHuyHieu.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { AppHeader } from '../../components/ui/AppHeader';

const WEEK_DAYS = [
  { day: 'T2', active: true }, { day: 'T3', active: true },
  { day: 'T4', active: true }, { day: 'T5', active: true },
  { day: 'T6', active: true }, { day: 'T7', active: true },
  { day: 'CN', active: false }, { day: 'Hôm nay', active: false, isToday: true },
];

const BADGES = [
  { icon: '🎓', label: 'Nhà thông thái', bg: Colors.primarySurface, gradient: [Colors.primary, Colors.primaryLight] as [string, string], locked: false },
  { icon: '🚀', label: 'Siêu tốc độ', bg: Colors.yellowBg, gradient: ['#fbbf24', '#d97706'] as [string, string], locked: false },
  { icon: '🔥', label: 'Nhiệt huyết', bg: '#fee2e2', gradient: ['#f87171', '#dc2626'] as [string, string], locked: false },
  { icon: '🎖️', label: 'Chiến binh 50', bg: '#f3f4f6', gradient: ['#d1d5db', '#9ca3af'] as [string, string], locked: true },
  { icon: '⚡', label: 'Kỷ lục 7 tuần', bg: '#f3f4f6', gradient: ['#d1d5db', '#9ca3af'] as [string, string], locked: true },
  { icon: '🌍', label: 'Vũ trụ học', bg: '#f3f4f6', gradient: ['#d1d5db', '#9ca3af'] as [string, string], locked: true },
];

export default function StreakScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader title="Thành tích" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Streak card */}
        <LinearGradient colors={[Colors.primary, Colors.primaryGradientEnd]} style={styles.streakCard}>
          <View style={styles.streakLabelRow}>
            <Text style={styles.streakLabelIcon}>⚡</Text>
            <Text style={styles.streakLabel}>Chuỗi học tập</Text>
          </View>
          <Text style={styles.streakCount}>7 ngày liên tiếp</Text>
          <Text style={styles.streakRecord}>Kỷ lục: 15 ngày</Text>

          {/* Calendar */}
          <View style={styles.calendar}>
            {WEEK_DAYS.map((d, i) => (
              <View key={i} style={styles.calendarItem}>
                {d.isToday ? (
                  <View style={styles.calendarToday}>
                    <Text style={styles.calendarTodayIcon}>🔥</Text>
                  </View>
                ) : (
                  <View style={[styles.calendarDot, d.active && styles.calendarDotActive]}>
                    {d.active && <Text style={styles.calendarCheck}>✓</Text>}
                  </View>
                )}
                <Text style={styles.calendarDay}>{d.day}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tiến độ mục tiêu</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Xem tất</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.goalCard}>
            <Text style={styles.goalBadge}>Học giá tự tu</Text>
            <Text style={styles.goalTitle}>Hoàn thành 50 bài học</Text>
            <ProgressBar progress={0.84} />
            <Text style={styles.goalProgress}>42/50</Text>
          </View>

          <View style={styles.goalCard}>
            <Text style={[styles.goalBadge, { color: Colors.yellowDark }]}>Vừa tốc độ</Text>
            <Text style={styles.goalTitle}>Trả lời nhanh trong 10 giây</Text>
            <ProgressBar progress={0.8} color={Colors.yellowAlt} trackColor={Colors.yellowBg} />
            <Text style={[styles.goalProgress, { color: Colors.yellowDark }]}>8/10</Text>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bộ sưu tập huy hiệu</Text>
            <Text style={styles.badgeCount}>Đã mở: 6/24</Text>
          </View>

          <View style={styles.badgeGrid}>
            {BADGES.map((b) => (
              <View
                key={b.label}
                style={[styles.badgeCard, { backgroundColor: b.bg }, b.locked && styles.badgeCardLocked]}
              >
                <LinearGradient colors={b.gradient} style={styles.badgeCircle}>
                  <Text style={styles.badgeIcon}>{b.icon}</Text>
                </LinearGradient>
                <Text style={[styles.badgeLabel, b.locked && styles.badgeLabelLocked]}>{b.label}</Text>
                {b.locked && <Text style={styles.lockIcon}>🔒</Text>}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  streakCard: { borderRadius: Radius['2xl'], padding: Spacing['2xl'], gap: Spacing.sm },
  streakLabelRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  streakLabelIcon: { fontSize: 20 },
  streakLabel: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 0.8 },
  streakCount: { fontSize: 40, fontWeight: '800', color: Colors.white },
  streakRecord: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: Spacing.base },
  calendar: { flexDirection: 'row', gap: Spacing.xs },
  calendarItem: { flex: 1, alignItems: 'center', gap: Spacing.xs },
  calendarDot: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  calendarDotActive: { backgroundColor: Colors.white },
  calendarCheck: { fontSize: 16, color: Colors.primary, fontWeight: '700' },
  calendarToday: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  calendarTodayIcon: { fontSize: 20 },
  calendarDay: { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  seeAll: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  badgeCount: { fontSize: 13, color: Colors.textSecondary },
  goalCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.sm,
    ...Shadow.md,
  },
  goalBadge: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  goalTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  goalProgress: { fontSize: 13, fontWeight: '700', color: Colors.primary, textAlign: 'right' },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  badgeCard: {
    width: '30%', borderRadius: Radius['2xl'],
    padding: Spacing.xl, alignItems: 'center', gap: Spacing.sm,
  },
  badgeCardLocked: { opacity: 0.4 },
  badgeCircle: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.md,
  },
  badgeIcon: { fontSize: 28 },
  badgeLabel: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  badgeLabelLocked: { color: Colors.textMuted },
  lockIcon: { fontSize: 12 },
});
