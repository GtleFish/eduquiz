// Converted from: Onboarding1.tsx + Onboarding2.tsx + Onboarding3.tsx
// Merged into a single stepper — no more 3 duplicate screens
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const { width } = Dimensions.get('window');

const STEPS = [
  {
    // Onboarding1 — "Học cùng bạn bè"
    image: require('../../assets/images/icon.png'),
    badge: { icon: '⚡', label: 'Học tập vui vẻ', sub: '+2,400 XP' },
    title: 'Học cùng bạn bè',
    description: 'Thách đấu và học tập cùng hàng triệu học sinh khác trên khắp cả nước.',
    btnLabel: 'Tiếp tục',
  },
  {
    // Onboarding2 — "Thi thử mọi lúc"
    image: require('../../assets/images/icon.png'),
    badge: { icon: '⭐', label: 'Best Score', sub: '' },
    title: 'Thi thử mọi lúc',
    description: 'Kho đề thi phong phú, cập nhật liên tục giúp bạn tự tin chinh phục mọi kỳ thi.',
    btnLabel: 'Tiếp tục',
  },
  {
    // Onboarding3 — "Theo dõi tiến độ"
    image: null,
    badge: null,
    title: 'Theo dõi tiến độ',
    description: 'Phân tích điểm mạnh, điểm yếu giúp bạn tối ưu hóa lộ trình học tập cá nhân.',
    btnLabel: 'Bắt đầu ngay',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.replace(Routes.GET_STARTED);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {step > 0 && (
            <TouchableOpacity onPress={() => setStep((s) => s - 1)}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.logo}>EduQuiz</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace(Routes.GET_STARTED)}>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        {current.image && (
          <View style={styles.imageWrapper}>
            <Image source={current.image} style={styles.image} resizeMode="cover" />
            {current.badge && (
              <View style={styles.floatingBadge}>
                <View style={styles.badgeIcon}>
                  <Text style={styles.badgeIconText}>{current.badge.icon}</Text>
                </View>
                <View>
                  <Text style={styles.badgeLabel}>{current.badge.label}</Text>
                  {current.badge.sub ? (
                    <Text style={styles.badgeSub}>{current.badge.sub}</Text>
                  ) : null}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Onboarding3 chart mockup (no image) */}
        {!current.image && (
          <View style={styles.chartCard}>
            <View style={styles.chartBars}>
              {[48, 72, 32, 64, 44].map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.bar,
                    {
                      height: h,
                      backgroundColor: i === 1 ? Colors.yellowAlt : Colors.primaryMuted,
                    },
                  ]}
                />
              ))}
            </View>
            <View style={styles.chartBadge}>
              <Text style={styles.chartBadgeText}>📈 85% Tăng trưởng</Text>
            </View>
          </View>
        )}

        {/* Text content */}
        <View style={styles.textBlock}>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.description}>{current.description}</Text>
        </View>

        <PrimaryButton label={`${current.btnLabel}  →`} onPress={handleNext} style={styles.btn} />
      </ScrollView>

      {/* Progress dots */}
      <View style={styles.dots}>
        {STEPS.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === step ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  logo: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  skipText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing['2xl'], gap: Spacing.xl },
  imageWrapper: {
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    height: 260,
    backgroundColor: '#0d9488',
  },
  image: { width: '100%', height: '100%' },
  floatingBadge: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.base,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: Radius['2xl'],
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.md,
  },
  badgeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIconText: { fontSize: 18 },
  badgeLabel: { fontSize: 11, fontWeight: '700', color: '#4c1d95', textTransform: 'uppercase' },
  badgeSub: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['3xl'],
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.base,
    ...Shadow.md,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
    height: 80,
  },
  bar: { flex: 1, borderRadius: 8 },
  chartBadge: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
  },
  chartBadgeText: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  textBlock: { alignItems: 'center', gap: Spacing.sm },
  title: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  btn: { alignSelf: 'stretch' },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingBottom: Spacing['2xl'],
  },
  dot: { height: 8, borderRadius: 4 },
  dotActive: { width: 32, backgroundColor: Colors.primary },
  dotInactive: { width: 8, backgroundColor: Colors.primaryMuted },
});
