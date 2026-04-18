// Converted from: src/app/components/KetQuaChiTiet.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { AppHeader } from '../../../components/ui/AppHeader';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { QuizSessionStore } from '../../../store/quizSessionStore';

const RESULT_ITEMS = [
  { num: '01', question: 'Ai là người đầu tiên đặt chân lên Mặt Trăng?', status: 'correct', time: '0:45' },
  { num: '02', question: 'Giao thức HTTP được viết tắt từ cụm từ nào?', status: 'wrong', time: '1:12' },
  { num: '03', question: 'Nguyên nhân lịch sử thăng trầm trên từng giai đoạn?', status: 'timesup', time: '3:00' },
];

const STATUS_CONFIG = {
  correct:  { border: '#22c55e', bg: '#dcfce7', icon: '✓', color: '#16a34a', label: 'Chính xác' },
  wrong:    { border: '#ef4444', bg: '#fee2e2', icon: '✕', color: '#dc2626', label: 'Sai' },
  timesup:  { border: '#9ca3af', bg: '#f3f4f6', icon: '○', color: '#6b7280', label: 'Đã bỏ qua' },
};

export default function ResultDetailScreen() {
  const router = useRouter();
  const summary = QuizSessionStore.getSummary();

  const progressDeg = (summary.accuracy / 100) * 360;

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Quiz Complete"
        onBack={() => router.back()}
        onAction={() => {}}
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Score circle card */}
        <View style={styles.scoreCard}>
          {/* Ring using nested Views */}
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.scorePercent}>{summary.accuracy}%</Text>
              <Text style={styles.scoreLabel}>Điểm số</Text>
            </View>
          </View>
          <Text style={styles.scoreTitle}>Tuyệt vời, Scholar!</Text>
          <Text style={styles.scoreDesc}>
            Bạn đã vượt qua bài kiểm tra! Tiếp tục duy trì phong độ nhé.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: Colors.primarySurface }]}>
            <Text style={styles.statIcon}>⏱</Text>
            <Text style={styles.statLabel}>Thời gian</Text>
            <Text style={styles.statValue}>12:45</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors.primarySurface }]}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statLabel}>Câu đúng</Text>
            <Text style={styles.statValue}>
              {String(summary.correctCount).padStart(2, '0')}
            </Text>
          </View>
        </View>

        {/* Question detail list */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chi tiết câu hỏi</Text>
            <Text style={styles.sectionMeta}>{summary.total} Câu hỏi</Text>
          </View>

          {RESULT_ITEMS.map((item) => {
            const cfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
            return (
              <View
                key={item.num}
                style={[styles.resultCard, { borderLeftColor: cfg.border }]}
              >
                <View style={styles.resultTop}>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultMeta}>Câu {item.num} • {item.time}</Text>
                    <Text style={styles.resultQuestion}>{item.question}</Text>
                  </View>
                  <View style={[styles.resultIcon, { backgroundColor: cfg.bg }]}>
                    <Text style={[styles.resultIconText, { color: cfg.color }]}>
                      {cfg.icon}
                    </Text>
                  </View>
                </View>
                <View style={styles.resultTags}>
                  <Text style={[styles.resultTag, { color: cfg.color }]}>{cfg.label}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton
            label="Xem bảng xếp hạng"
            onPress={() => router.push(Routes.LEADERBOARD)}
          />
          <PrimaryButton
            label="Làm lại Quiz"
            onPress={() => {
              QuizSessionStore.start();
              router.replace(Routes.QUIZ_LOBBY);
            }}
            variant="outline"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  scoreCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center',
    gap: Spacing.base,
    ...Shadow.md,
  },
  ringOuter: {
    width: 160, height: 160, borderRadius: 80,
    borderWidth: 12, borderColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  ringInner: { alignItems: 'center' },
  scorePercent: { fontSize: 36, fontWeight: '800', color: Colors.textPrimary },
  scoreLabel: { fontSize: 11, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  scoreTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  scoreDesc: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: {
    flex: 1, borderRadius: Radius.xl,
    padding: Spacing.xl, alignItems: 'center', gap: Spacing.xs,
  },
  statIcon: { fontSize: 24 },
  statLabel: { fontSize: 11, color: Colors.textSecondary, textTransform: 'uppercase' },
  statValue: { fontSize: 24, fontWeight: '700', color: Colors.textPrimary },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  sectionMeta: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  resultCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    borderLeftWidth: 4,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  resultTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  resultInfo: { flex: 1, gap: 3 },
  resultMeta: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  resultQuestion: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, lineHeight: 20 },
  resultIcon: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  resultIconText: { fontSize: 16, fontWeight: '700' },
  resultTags: { flexDirection: 'row', gap: Spacing.sm },
  resultTag: { fontSize: 12, fontWeight: '700' },
  actions: { gap: Spacing.md },
});
