// Converted from: src/app/components/DanhSachCauHoi.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const QUESTIONS = [
  { type: 'Trắc nghiệm', icon: '☰', iconBg: Colors.primaryMuted, badgeBg: Colors.primarySurface, badgeColor: Colors.primary, preview: 'Thế nào l…' },
  { type: 'Đúng / Sai', icon: '✓✕', iconBg: Colors.yellowAlt, badgeBg: Colors.yellowBg, badgeColor: Colors.yellowDark, preview: 'Nước sôi …' },
  { type: 'Tự luận', icon: '✍️', iconBg: Colors.primarySurface, badgeBg: '#f3f4f6', badgeColor: Colors.textSecondary, preview: 'Phân tích …' },
];

export default function QuestionListScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader
        title="EduQuiz"
        onBack={() => router.back()}
        rightElement={
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        }
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Progress header */}
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>Cấu trúc đề thi</Text>
            <Text style={styles.progressCount}>10 câu hỏi</Text>
          </View>
          <View style={styles.estimateBadge}>
            <Text style={styles.estimateIcon}>⚡</Text>
            <Text style={styles.estimateText}>Estimated: 15 min</Text>
          </View>
        </View>

        {/* Question cards */}
        <View style={styles.questionList}>
          {QUESTIONS.map((q, i) => (
            <View key={i} style={styles.questionCard}>
              <View style={[styles.questionIcon, { backgroundColor: q.iconBg }]}>
                <Text style={styles.questionIconText}>{q.icon}</Text>
              </View>
              <View style={styles.questionInfo}>
                <View style={[styles.typeBadge, { backgroundColor: q.badgeBg }]}>
                  <Text style={[styles.typeBadgeText, { color: q.badgeColor }]}>{q.type}</Text>
                </View>
                <Text style={styles.questionPreview}>{q.preview}</Text>
              </View>
              <View style={styles.questionActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>📋</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => router.push(Routes.CREATE_EDITOR)}>
                  <Text style={styles.actionBtnText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>☰</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add placeholder */}
          <TouchableOpacity
            style={styles.addCard}
            onPress={() => router.push(Routes.CREATE_EDITOR)}
          >
            <View style={styles.addIcon}>
              <Text style={styles.addIconText}>📷</Text>
            </View>
            <View style={styles.addInfo}>
              <View style={styles.addBadge}>
                <Text style={styles.addBadgeText}>Hình ảnh</Text>
              </View>
              <Text style={styles.addPreview}>Nhấn để thêm câu h…</Text>
            </View>
            <Text style={styles.addPlus}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Tip card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Mẹo nhỏ cho bạn</Text>
            <Text style={styles.tipDesc}>
              Hãy sử dụng câu hỏi <Text style={styles.tipBold}>Trắc nghiệm</Text> để tăng tính tương tác, và <Text style={styles.tipBold}>Tự luận</Text> để đánh giá chiều sâu kiến thức.
            </Text>
          </View>
        </View>

        {/* Bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push(Routes.CREATE_EDITOR)}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight]}
          style={styles.fabGradient}
        >
          <Text style={styles.fabIcon}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          label="Hoàn tất Quiz"
          onPress={() => router.push(Routes.CREATE_INFO)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  saveBtn: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  saveBtnText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl },
  progressHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  progressLabel: { fontSize: 11, fontWeight: '700', color: '#67537c', textTransform: 'uppercase', letterSpacing: 0.5 },
  progressCount: { fontSize: 36, fontWeight: '800', color: Colors.primary },
  estimateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  estimateIcon: { fontSize: 14 },
  estimateText: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  questionList: { gap: Spacing.md },
  questionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
    ...Shadow.md,
  },
  questionIcon: {
    width: 48, height: 48, borderRadius: Radius.lg,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  questionIconText: { fontSize: 22 },
  questionInfo: { flex: 1, gap: Spacing.xs },
  typeBadge: {
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm, paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  typeBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  questionPreview: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  questionActions: { flexDirection: 'row', gap: 2, opacity: 0.4 },
  actionBtn: { padding: Spacing.sm },
  actionBtnText: { fontSize: 16 },
  addCard: {
    backgroundColor: Colors.white,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    borderStyle: 'dashed',
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
  },
  addIcon: {
    width: 48, height: 48, borderRadius: Radius.lg,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  addIconText: { fontSize: 22 },
  addInfo: { flex: 1, gap: Spacing.xs },
  addBadge: {
    backgroundColor: '#f3f4f6',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm, paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  addBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase' },
  addPreview: { fontSize: 14, fontStyle: 'italic', color: Colors.textMuted },
  addPlus: { fontSize: 28, color: Colors.textMuted },
  tipCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    flexDirection: 'row', gap: Spacing.base,
  },
  tipIcon: { fontSize: 28 },
  tipText: { flex: 1, gap: Spacing.xs },
  tipTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  tipDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  tipBold: { fontWeight: '700', color: Colors.textPrimary },
  fab: {
    position: 'absolute', bottom: 100, right: Spacing.xl,
    borderRadius: 32, overflow: 'hidden',
    ...Shadow.xl,
  },
  fabGradient: {
    width: 64, height: 64,
    alignItems: 'center', justifyContent: 'center',
  },
  fabIcon: { fontSize: 32, color: Colors.white, fontWeight: '300' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.border,
    padding: Spacing.xl,
    ...Shadow.lg,
  },
});
