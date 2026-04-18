// Converted from: ThanhTichMoi.tsx — New Achievement screen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { AppHeader } from '../../../components/ui/AppHeader';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';

export default function AchievementScreen() {
  const router = useRouter();

  const handleShare = async () => {
    await Share.share({ message: 'Tôi vừa đạt thành tựu "Chuỗi 7 Ngày" trên EduQuiz! 🔥' });
  };

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Quiz Complete"
        onBack={() => router.back()}
        onAction={() => {}}
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Badge card */}
        <View style={styles.badgeCard}>
          {/* Floating labels */}
          <View style={styles.floatingTop}>
            <Text style={styles.floatingTopIcon}>🔥</Text>
            <Text style={styles.floatingTopText}>Hừng hực khí thế!</Text>
          </View>
          <View style={styles.floatingBottom}>
            <Text style={styles.floatingBottomText}>+500 XP</Text>
          </View>

          {/* Badge */}
          <View style={styles.badgeCircle}>
            <Text style={styles.badgeEmoji}>🏅</Text>
          </View>

          <View style={styles.badgeInfo}>
            <Text style={styles.badgeLabel}>Thành tựu mới</Text>
            <Text style={styles.badgeTitle}>Chuỗi 7 Ngày</Text>
          </View>
        </View>

        {/* Congratulations */}
        <View style={styles.congratsBlock}>
          <Text style={styles.congratsTitle}>Bạn thật tuyệt vời!</Text>
          <Text style={styles.congratsDesc}>
            Chúc mừng bạn đã duy trì thói quen học tập trong suốt một tuần qua.
            Kiến thức đang lớn dần lên mỗi ngày!
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Xếp hạng</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>TOP{'\n'}5%</Text>
              <Text style={styles.statTrend}>↑{'\n'}2%</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Bài học</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>24</Text>
              <Text style={[styles.statTrend, { color: Colors.primary }]}>Hoàn tất</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton label="Chia sẻ  📤" onPress={handleShare} />
          <TouchableOpacity style={styles.continueBtn} onPress={() => router.replace(Routes.HOME)}>
            <Text style={styles.continueBtnText}>Tiếp tục học tập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40, alignItems: 'center' },
  badgeCard: {
    backgroundColor: Colors.white,
    borderRadius: 40, padding: Spacing['2xl'],
    alignItems: 'center', gap: Spacing.xl,
    transform: [{ rotate: '-2deg' }],
    position: 'relative',
    width: '100%',
    ...Shadow.xl,
  },
  floatingTop: {
    position: 'absolute', top: -Spacing.xl, left: -Spacing.xl,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: 'rgba(243,232,255,0.85)',
    borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    transform: [{ rotate: '12deg' }],
    ...Shadow.sm,
  },
  floatingTopIcon: { fontSize: 16 },
  floatingTopText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, textTransform: 'uppercase' },
  floatingBottom: {
    position: 'absolute', bottom: -Spacing.base, right: -Spacing.base,
    backgroundColor: 'rgba(243,232,255,0.85)',
    borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    transform: [{ rotate: '-6deg' }],
  },
  floatingBottomText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  badgeCircle: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: Colors.yellowBg,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.lg,
  },
  badgeEmoji: { fontSize: 80 },
  badgeInfo: { alignItems: 'center', gap: Spacing.xs },
  badgeLabel: { fontSize: 12, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 1 },
  badgeTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  congratsBlock: { alignItems: 'center', gap: Spacing.sm },
  congratsTitle: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  congratsDesc: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, maxWidth: 320 },
  statsRow: { flexDirection: 'row', gap: Spacing.md, width: '100%', maxWidth: 320 },
  statCard: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.sm },
  statLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  statValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.sm },
  statValue: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  statTrend: { fontSize: 12, fontWeight: '700', color: Colors.yellowDark },
  actions: { gap: Spacing.md, width: '100%', maxWidth: 320 },
  continueBtn: { alignItems: 'center', paddingVertical: Spacing.base },
  continueBtnText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
});
