// Converted from: src/app/components/ThanhCong.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const FEATURES = [
  {
    icon: '📚', bg: Colors.primarySurface,
    title: 'Mở khoá nội dung',
    desc: 'Tất cả bài học và quiz cơ bản đã sẵn sàng cho bạn.',
  },
  {
    icon: '🔥', bg: Colors.yellowBg,
    title: 'Bắt đầu Streak',
    desc: 'Học mỗi ngày để tích lũy điểm và thăng hạng nhanh hơn.',
  },
  {
    icon: '👥', bg: Colors.primaryMuted,
    title: 'Kết nối bạn bè',
    desc: 'Tham gia các nhóm học tập và thi đấu cùng bạn bè.',
  },
];

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>EduQuiz</Text>
        <View style={styles.headerRight}>
          <Text style={styles.rocketIcon}>🚀</Text>
          <Text style={styles.headerSubtext}>Bắt đầu hành trình mới</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero illustration */}
        <View style={styles.heroCard}>
          <View style={styles.heroImagePlaceholder}>
            <Text style={styles.heroEmoji}>🎉</Text>
          </View>
          {/* Badge */}
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🏆  Hạng: Tân Thủ</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Đăng ký thành công!</Text>
          <Text style={styles.subtitle}>
            Chào mừng bạn đến với cộng đồng{' '}
            <Text style={styles.subtitleBrand}>EduQuiz</Text>.{' '}
            Hàng ngàn thử thách kiến thức đang chờ đón bạn khám phá.
          </Text>
        </View>

        {/* CTA buttons */}
        <View style={styles.buttons}>
          <PrimaryButton
            label="Bắt đầu học thôi!"
            onPress={() => router.replace('/(auth)/learning-preferences')}
          />
          <PrimaryButton
            label="Thiết lập hồ sơ"
            onPress={() => router.push('/profile/edit')}
            variant="ghost"
          />
        </View>

        {/* Feature cards */}
        <View style={styles.featureList}>
          {FEATURES.map((f) => (
            <View key={f.title} style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: f.bg }]}>
                <Text style={styles.featureIconText}>{f.icon}</Text>
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Progress bar bottom */}
      <View style={styles.progressBar}>
        <View style={styles.dotInactive} />
        <View style={styles.dotActive} />
        <View style={styles.dotInactive} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
    backgroundColor: 'rgba(243,232,255,0.7)',
  },
  logo: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  rocketIcon: { fontSize: 18 },
  headerSubtext: { fontSize: 13, color: Colors.textSecondary },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing['2xl'], gap: Spacing.xl },
  heroCard: {
    marginTop: Spacing.xl,
    borderRadius: Radius['2xl'], overflow: 'hidden',
    height: 220, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.lg,
  },
  heroImagePlaceholder: { alignItems: 'center', justifyContent: 'center' },
  heroEmoji: { fontSize: 80 },
  heroBadge: {
    position: 'absolute', top: Spacing.base, right: Spacing.base,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    ...Shadow.sm,
  },
  heroBadgeText: { fontSize: 12, fontWeight: '600', color: Colors.textPrimary },
  titleBlock: { gap: Spacing.sm },
  title: { fontSize: 36, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { fontSize: 15, color: Colors.textSecondary, lineHeight: 24 },
  subtitleBrand: { fontWeight: '600', color: Colors.primary },
  buttons: { gap: Spacing.md },
  featureList: { gap: Spacing.md },
  featureCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius['2xl'], padding: Spacing.xl,
    flexDirection: 'row', gap: Spacing.base, alignItems: 'flex-start',
  },
  featureIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  featureIconText: { fontSize: 24 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  featureDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  progressBar: {
    flexDirection: 'row', justifyContent: 'center',
    gap: Spacing.sm, paddingVertical: Spacing.base,
    backgroundColor: 'rgba(243,232,255,0.8)',
  },
  dotActive: { width: 32, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryMuted },
});
