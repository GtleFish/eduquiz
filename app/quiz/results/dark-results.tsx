// Converted from: KetQuaToi.tsx — Dark mode Quiz Results
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { DarkColors as D } from '../../../constants/darkColors';
import { Spacing, Radius } from '../../../constants/spacing';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { QuizSessionStore } from '../../../store/quizSessionStore';
import { Routes } from '../../../constants/routes';

export default function DarkResultsScreen() {
  const router = useRouter();
  const summary = QuizSessionStore.getSummary();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.headerIcon, { fontSize: 22 }]}>←</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>EduQuiz</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity><Text style={styles.headerIcon}>👥</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.headerIcon}>ℹ️</Text></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Tuyệt vời!</Text>
          <Text style={styles.subtitle}>Bạn đã hoàn thành bài quiz với kết quả ấn tượng!</Text>
        </View>

        {/* Score ring */}
        <View style={styles.scoreRing}>
          <View style={styles.ringOuter}>
            <View style={styles.ringInner}>
              <Text style={styles.ringValue}>{summary.correctCount}/{summary.total}</Text>
              <Text style={styles.ringLabel}>Câu đúng</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Độ chính xác', value: `${summary.accuracy}%`, color: D.primary },
            { label: 'Trung bình', value: '45s', color: D.yellow },
            { label: 'Tổng thời gian', value: '04:12', color: D.green },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Best answer */}
        <View style={styles.bestCard}>
          <View style={styles.bestLeft}>
            <View style={styles.bestBadge}><Text style={styles.bestBadgeText}>A</Text></View>
            <View>
              <Text style={styles.bestSubLabel}>Vị trí cao nhất</Text>
              <Text style={styles.bestTitle}>Câu số 8 (Xuất sắc!)</Text>
            </View>
          </View>
          <View style={styles.bestMeta}>
            <Text style={styles.bestMetaItem}>✓  Trả lời đúng</Text>
            <Text style={styles.bestMetaItem}>⚡  Nhanh nhất</Text>
          </View>
        </View>

        {/* XP card */}
        <LinearGradient colors={[D.primary, D.primaryLight]} style={styles.xpCard}>
          <View>
            <Text style={styles.xpLabel}>Điểm kinh nghiệm</Text>
            <Text style={styles.xpValue}>2,281 / 3,000 XP</Text>
          </View>
          <Text style={styles.xpEmoji}>🎯</Text>
        </LinearGradient>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push(Routes.RESULTS_DETAIL)}>
            <Text style={styles.primaryBtnText}>✓  Xem đáp án</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => { QuizSessionStore.start(); router.replace(Routes.QUIZ_LOBBY); }}>
            <Text style={styles.secondaryBtnText}>↺  Làm lại quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Có lẽ bạn quan tâm</Text>
          {[
            { icon: '🎯', label: 'Quiz tương tự', title: 'Ôn luyện 2: Đại lý học', desc: 'Nếu bạn thích quiz này, thử sức với 15 câu hỏi Đại lý học nâng cao!' },
            { icon: '👑', label: 'Thử thách tuần này', title: 'Gói đề mẫu kỳ I', desc: 'Lấy 90% câu khi đầu lớp có thể được học bổng!' },
          ].map((s) => (
            <View key={s.title} style={styles.suggestionCard}>
              <View style={styles.suggestionTop}>
                <Text style={styles.suggestionIcon}>{s.icon}</Text>
                <View>
                  <Text style={styles.suggestionLabel}>{s.label}</Text>
                  <Text style={styles.suggestionTitle}>{s.title}</Text>
                </View>
              </View>
              <Text style={styles.suggestionDesc}>{s.desc}</Text>
              {s.label === 'Quiz tương tự' && (
                <TouchableOpacity style={styles.suggestionBtn} onPress={() => router.push(Routes.QUIZ_LOBBY)}>
                  <Text style={styles.suggestionBtnText}>Bắt đầu ngay</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: D.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  logo: { fontSize: 18, fontWeight: '700', color: D.text },
  headerRight: { flexDirection: 'row', gap: Spacing.md },
  headerIcon: { fontSize: 22 },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { alignItems: 'center', gap: Spacing.xs },
  title: { fontSize: 28, fontWeight: '800', color: D.text },
  subtitle: { fontSize: 14, color: D.textMuted, textAlign: 'center' },
  scoreRing: { alignItems: 'center' },
  ringOuter: { width: 180, height: 180, borderRadius: 90, borderWidth: 8, borderColor: D.yellow, alignItems: 'center', justifyContent: 'center' },
  ringInner: { alignItems: 'center' },
  ringValue: { fontSize: 40, fontWeight: '800', color: D.yellow },
  ringLabel: { fontSize: 13, color: D.textMuted },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: { flex: 1, backgroundColor: D.surface, borderRadius: Radius['2xl'], padding: Spacing.base, alignItems: 'center', gap: Spacing.xs, borderWidth: 1, borderColor: D.border },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 10, color: D.textMuted, textTransform: 'uppercase', textAlign: 'center' },
  bestCard: { backgroundColor: D.surface, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md, borderWidth: 1, borderColor: D.border },
  bestLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  bestBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: D.yellow, alignItems: 'center', justifyContent: 'center' },
  bestBadgeText: { fontSize: 24, fontWeight: '800', color: D.yellowDark },
  bestSubLabel: { fontSize: 11, color: D.textMuted, textTransform: 'uppercase' },
  bestTitle: { fontSize: 16, fontWeight: '700', color: D.text },
  bestMeta: { flexDirection: 'row', gap: Spacing.xl },
  bestMetaItem: { fontSize: 13, color: D.textMuted },
  xpCard: { borderRadius: Radius['2xl'], padding: Spacing.xl, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  xpLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' },
  xpValue: { fontSize: 22, fontWeight: '800', color: D.white },
  xpEmoji: { fontSize: 48 },
  actions: { gap: Spacing.md },
  primaryBtn: { backgroundColor: D.primary, borderRadius: Radius.pill, paddingVertical: Spacing.base, alignItems: 'center' },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: D.white },
  secondaryBtn: { backgroundColor: D.surface, borderRadius: Radius.pill, paddingVertical: Spacing.base, alignItems: 'center', borderWidth: 1, borderColor: D.border },
  secondaryBtnText: { fontSize: 16, fontWeight: '700', color: D.text },
  section: { gap: Spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: D.text },
  suggestionCard: { backgroundColor: D.surface, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md, borderWidth: 1, borderColor: D.border },
  suggestionTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  suggestionIcon: { fontSize: 28 },
  suggestionLabel: { fontSize: 11, color: D.textMuted, textTransform: 'uppercase' },
  suggestionTitle: { fontSize: 15, fontWeight: '700', color: D.text },
  suggestionDesc: { fontSize: 13, color: D.textMuted, lineHeight: 20 },
  suggestionBtn: { backgroundColor: D.primary, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  suggestionBtnText: { fontSize: 14, fontWeight: '700', color: D.white },
});
