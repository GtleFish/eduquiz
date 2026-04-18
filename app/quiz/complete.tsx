// Converted from: src/app/components/HoanThanhQuiz.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { Card } from '../../components/ui/Card';

export default function QuizCompleteScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Quiz Complete"
        onBack={() => router.back()}
        onAction={() => {}}
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Trophy celebration */}
        <View style={styles.trophySection}>
          <View style={styles.trophyCircle}>
            <Text style={styles.trophyIcon}>🏆</Text>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>A</Text>
            </View>
          </View>
          <Text style={styles.celebTitle}>Tuyệt vời!</Text>
          <Text style={styles.celebDesc}>Bạn vừa hoàn thành thử thách xuất sắc.</Text>
        </View>

        {/* Score circle card */}
        <Card style={styles.scoreCard}>
          {/* SVG circle replaced with a simple ring using View */}
          <View style={styles.scoreRingOuter}>
            <View style={styles.scoreRingInner}>
              <Text style={styles.scoreMain}>12/15</Text>
              <Text style={styles.scoreLabel}>Câu đúng</Text>
            </View>
          </View>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>💡  +450 XP EARNED</Text>
          </View>
        </Card>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard} padding={Spacing.xl}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statLabel}>Độ chính xác</Text>
            <Text style={styles.statValue}>80%</Text>
          </Card>
          <Card style={styles.statCard} padding={Spacing.xl}>
            <Text style={styles.statIcon}>⏱</Text>
            <Text style={styles.statLabel}>Thời gian</Text>
            <Text style={styles.statValue}>04:35</Text>
          </Card>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <PrimaryButton
            label="Tiếp tục học tập"
            onPress={() => router.push(Routes.RESULTS_NEXT)}
          />
          <PrimaryButton
            label="Xem lại câu hỏi"
            onPress={() => router.push(Routes.RESULTS_DETAIL)}
            variant="ghost"
          />
          <PrimaryButton
            label="Chia sẻ kết quả  📤"
            onPress={() => router.push(Routes.RESULTS_SHARE)}
            variant="outline"
          />
        </View>

        {/* New badges */}
        <Card style={styles.badgesCard}>
          <Text style={styles.badgesTitle}>Huy hiệu mới đạt được</Text>
          <View style={styles.badgesRow}>
            <TouchableOpacity
              style={styles.badgeItem}
              onPress={() => router.push(Routes.RESULTS_ACHIEVEMENT)}
              activeOpacity={0.8}
            >
              <View style={[styles.badgeCircle, { backgroundColor: Colors.yellowAlt }]}>
                <Text style={styles.badgeEmoji}>⚡</Text>
              </View>
              <Text style={styles.badgeName}>Siêu tốc</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.badgeItem}
              onPress={() => router.push(Routes.RESULTS_ACHIEVEMENT)}
              activeOpacity={0.8}
            >
              <View style={[styles.badgeCircle, { backgroundColor: Colors.primaryMuted, borderWidth: 2, borderColor: Colors.primaryLight }]}>
                <Text style={styles.badgeEmoji}>✨</Text>
              </View>
              <Text style={styles.badgeName}>Hoàn hảo</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  trophySection: { alignItems: 'center', gap: Spacing.sm },
  trophyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.xl,
  },
  trophyIcon: { fontSize: 56 },
  gradeBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.primaryBg,
  },
  gradeText: { fontSize: 22, fontWeight: '800', color: Colors.yellowDark },
  celebTitle: { fontSize: 36, fontWeight: '800', color: Colors.primary },
  celebDesc: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center' },
  scoreCard: { alignItems: 'center', gap: Spacing.base },
  scoreRingOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreRingInner: { alignItems: 'center' },
  scoreMain: { fontSize: 40, fontWeight: '800', color: Colors.textPrimary },
  scoreLabel: { fontSize: 11, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  xpBadge: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  xpText: { fontWeight: '700', color: Colors.primary, fontSize: 14 },
  statsGrid: { flexDirection: 'row', gap: Spacing.md },
  statCard: { flex: 1, alignItems: 'center', gap: Spacing.xs, backgroundColor: Colors.primarySurface },
  statIcon: { fontSize: 24, color: Colors.primary },
  statLabel: { fontSize: 11, color: Colors.textSecondary, textTransform: 'uppercase' },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  actions: { gap: Spacing.md },
  badgesCard: { gap: Spacing.md },
  badgesTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  badgesRow: { flexDirection: 'row', gap: Spacing.xl },
  badgeItem: { alignItems: 'center', gap: Spacing.xs },
  badgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  badgeEmoji: { fontSize: 28 },
  badgeName: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase' },
});
