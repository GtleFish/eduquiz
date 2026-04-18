// Converted from: src/app/components/MultipleSelect.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';

const OPTIONS = [
  { id: 'a', label: 'A', text: 'Thái Lan' },
  { id: 'b', label: 'B', text: 'Lào' },
  { id: 'c', label: 'C', text: 'Hàn Quốc' },
  { id: 'd', label: 'D', text: 'Việt Nam' },
];

export default function MultipleSelectScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.screen}>
      <QuestionProgressBar
        current={9}
        total={15}
        points={2200}
        onClose={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Progress */}
        <View style={styles.progressBlock}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Tiến trình</Text>
            <View style={styles.timerBadge}>
              <Text style={styles.timerIcon}>⏱</Text>
              <Text style={styles.timerText}>20s</Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryLight]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: '60%' }]}
            />
          </View>
        </View>

        {/* Question card */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadgeWrapper}>
            <View style={styles.questionBadge}>
              <Text style={styles.questionBadgeText}>Câu hỏi nhiều lựa chọn</Text>
            </View>
          </View>
          <Text style={styles.questionText}>
            Những quốc gia nào{'\n'}sau đây thuộc Đông{'\n'}Nam Á?
          </Text>
          <Text style={styles.questionHint}>Chọn tất cả đáp án đúng</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsList}>
          {OPTIONS.map((opt) => {
            const isSelected = selected.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => toggle(opt.id)}
                activeOpacity={0.8}
              >
                <View style={styles.optionLeft}>
                  <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                    <Text style={[styles.checkIcon, isSelected && styles.checkIconSelected]}>
                      {isSelected ? '✓' : '○'}
                    </Text>
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {opt.text}
                  </Text>
                </View>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={() => router.push(Routes.FEEDBACK_CORRECT)}
          disabled={selected.length === 0}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.submitBtn, selected.length === 0 && styles.submitBtnDisabled]}
          >
            <Text style={styles.submitText}>KIỂM TRA ĐÁP ÁN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  progressBlock: { gap: Spacing.sm },
  progressHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressLabel: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  timerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  timerIcon: { fontSize: 14, color: Colors.primary },
  timerText: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  progressTrack: {
    height: 14, backgroundColor: Colors.primaryMuted,
    borderRadius: Radius.pill, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: Radius.pill },
  questionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    ...Shadow.md,
  },
  questionBadgeWrapper: { marginBottom: Spacing.base },
  questionBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
    transform: [{ rotate: '-2deg' }],
  },
  questionBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5 },
  questionText: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, lineHeight: 32 },
  questionHint: { fontSize: 13, color: Colors.textSecondary, marginTop: Spacing.sm },
  optionsList: { gap: Spacing.md },
  optionCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xl,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  optionCardSelected: { backgroundColor: Colors.primary, ...Shadow.md },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  checkCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  checkCircleSelected: { backgroundColor: 'rgba(255,255,255,0.2)' },
  checkIcon: { fontSize: 16, color: Colors.primary },
  checkIconSelected: { color: Colors.white },
  optionText: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  optionTextSelected: { color: Colors.white, fontWeight: '700' },
  optionLabel: { fontSize: 32, fontWeight: '800', color: Colors.primaryMuted },
  optionLabelSelected: { color: 'rgba(255,255,255,0.3)' },
  submitBtn: {
    borderRadius: Radius.pill, paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitText: { fontSize: 15, fontWeight: '800', color: Colors.white, letterSpacing: 1 },
});
