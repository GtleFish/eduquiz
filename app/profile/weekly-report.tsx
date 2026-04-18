// Converted from: src/app/components/BaoCaoTuan.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

export default function WeeklyReportScreen() {
  const router = useRouter();

  const handleShare = async () => {
    await Share.share({ message: 'Tôi đang trong Top 5% tuần này trên EduQuiz! 🏆' });
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Báo cáo tuần" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Report card */}
        <LinearGradient colors={['#fef9c3', Colors.primarySurface]} style={styles.reportCard}>
          {/* Trophy */}
          <View style={styles.trophyWrapper}>
            <View style={styles.trophyCircle}>
              <Text style={styles.trophyIcon}>🏆</Text>
            </View>
          </View>

          <Text style={styles.reportTitle}>Báo cáo tuần của{'\n'}Minh Anh</Text>
          <Text style={styles.reportDate}>THỨ 2, 17 THÁNG 5 - CHỦ NHẬT, 18 THÁNG 5</Text>

          {/* Top badge */}
          <View style={styles.topBadge}>
            <Text style={styles.topBadgeValue}>Top 5%</Text>
            <Text style={styles.topBadgeLabel}>Xếp hạng tuần này</Text>
            <Text style={styles.topBadgeBgIcon}>📈</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>bài học hoàn tất</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: Colors.yellowDark }]}>+500 XP</Text>
              <Text style={styles.statLabel}>Kinh nghiệm</Text>
            </View>
          </View>

          {/* Radar chart placeholder */}
          <View style={styles.radarCard}>
            <Text style={styles.radarTitle}>Chỉ số năng trưởng</Text>
            <View style={styles.radarPlaceholder}>
              <Text style={styles.radarEmoji}>📊</Text>
              <View style={styles.radarLabels}>
                {['VĂN', 'LÝ', 'SỬ', 'HÓA', 'TOÁN'].map((label) => (
                  <Text key={label} style={styles.radarLabel}>{label}</Text>
                ))}
              </View>
            </View>
            <Text style={styles.radarDesc}>
              Bạn đang thể hiện sự cải thiện tốt qua 5 môn, chú ý luyện tập thêm phần Ngữ văn để nâng cao kỹ năng đọc hiểu!
            </Text>
          </View>

          {/* Recommendation */}
          <View style={styles.recommendBadge}>
            <Text style={styles.recommendIcon}>✨</Text>
            <Text style={styles.recommendText}>PHƯƠNG PHÁP TUYỆT VỜI</Text>
          </View>
        </LinearGradient>

        {/* Footer info */}
        <View style={styles.footerRow}>
          <Text style={styles.footerLogo}>EduQuiz</Text>
          <View style={styles.footerRight}>
            <View style={styles.footerAvatar} />
            <Text style={styles.footerScore}>🏆 185</Text>
          </View>
        </View>

        {/* Actions */}
        <PrimaryButton label="📤  Chia sẻ lên MXH" onPress={handleShare} />
        <PrimaryButton label="Lưu về máy" onPress={() => {}} variant="ghost" />

        {/* Next week challenge */}
        <View style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>Thử thách tuần tới</Text>
          <View style={styles.challengeItem}>
            <View style={styles.challengeIcon}>
              <Text style={styles.challengeIconText}>⚡</Text>
            </View>
            <View style={styles.challengeText}>
              <Text style={styles.challengeItemTitle}>Chuỗi 7 ngày vàng</Text>
              <Text style={styles.challengeItemDesc}>Hoàn thành ít nhất 1 bài kiểm tra mỗi ngày trong 7 ngày.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  reportCard: { borderRadius: 40, padding: Spacing['2xl'], gap: Spacing.xl, ...Shadow.xl },
  trophyWrapper: { alignItems: 'center' },
  trophyCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.lg,
  },
  trophyIcon: { fontSize: 40 },
  reportTitle: { fontSize: 28, fontWeight: '800', color: Colors.primary, textAlign: 'center', lineHeight: 36 },
  reportDate: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },
  topBadge: {
    backgroundColor: Colors.primaryMuted,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    overflow: 'hidden',
  },
  topBadgeValue: { fontSize: 36, fontWeight: '800', color: Colors.primary },
  topBadgeLabel: { fontSize: 13, color: Colors.textSecondary },
  topBadgeBgIcon: { position: 'absolute', top: Spacing.base, right: Spacing.base, fontSize: 48, opacity: 0.2 },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center', gap: Spacing.xs,
  },
  statValue: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
  radarCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: Radius['2xl'],
    padding: Spacing.xl, gap: Spacing.md,
  },
  radarTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  radarPlaceholder: { alignItems: 'center', gap: Spacing.md },
  radarEmoji: { fontSize: 64 },
  radarLabels: { flexDirection: 'row', gap: Spacing.md },
  radarLabel: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  radarDesc: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center', lineHeight: 18 },
  recommendBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
  },
  recommendIcon: { fontSize: 20 },
  recommendText: { fontSize: 13, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.sm },
  footerLogo: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  footerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  footerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.yellowAlt },
  footerScore: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  challengeCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl, gap: Spacing.md,
    ...Shadow.md,
  },
  challengeTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  challengeItem: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    flexDirection: 'row', gap: Spacing.base, alignItems: 'flex-start',
  },
  challengeIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  challengeIconText: { fontSize: 24, color: Colors.white },
  challengeText: { flex: 1 },
  challengeItemTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  challengeItemDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
});
