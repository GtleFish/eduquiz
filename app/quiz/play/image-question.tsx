// Converted from: src/app/components/ImageQuestion.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';
import { OptionCard, Option } from '../../../components/quiz/OptionCard';

const OPTIONS: Option[] = [
  { id: 'a', label: 'A', text: 'Tháp Eiffel', color: Colors.primary },
  { id: 'b', label: 'B', text: 'Tháp Nghiêng Pizza', color: Colors.primary },
  { id: 'c', label: 'C', text: 'Big Ben', color: Colors.primary },
  { id: 'd', label: 'D', text: 'Khải Hoàn Môn', color: Colors.primary },
];

export default function ImageQuestionScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.screen}>
      <QuestionProgressBar
        current={3}
        total={15}
        points={1250}
        onClose={() => router.back()}
      />

      <View style={styles.content}>
        {/* Image card with floating timer */}
        <View style={styles.imageCard}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🗼</Text>
          </View>
          <View style={styles.floatingTimer}>
            <Text style={styles.floatingTimerIcon}>⏱</Text>
            <Text style={styles.floatingTimerText}>10s</Text>
          </View>
        </View>

        {/* Question */}
        <Text style={styles.questionText}>
          Đây là công trình{'\n'}kiến trúc nào?
        </Text>

        {/* Options */}
        <View style={styles.optionsList}>
          {OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              state={selected === opt.id ? 'selected' : 'idle'}
              onPress={() => setSelected(opt.id)}
            />
          ))}
        </View>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.hintBtn}>
          <Text style={styles.hintIcon}>💡</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.leaderboardBtn}>
          <Text style={styles.leaderboardIcon}>🏆</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  content: { flex: 1, padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 100 },
  imageCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    height: 180,
    ...Shadow.lg,
  },
  imagePlaceholder: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primaryMuted,
  },
  imagePlaceholderText: { fontSize: 72 },
  floatingTimer: {
    position: 'absolute', bottom: -Spacing.base, right: Spacing.xl,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: 'rgba(243,232,255,0.85)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    ...Shadow.sm,
  },
  floatingTimerIcon: { fontSize: 14, color: '#dc2626' },
  floatingTimerText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  questionText: {
    fontSize: 28, fontWeight: '800', color: Colors.textPrimary,
    lineHeight: 38, marginTop: Spacing.base,
  },
  optionsList: { gap: Spacing.md },
  bottomBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing['2xl'], paddingBottom: 34, paddingTop: Spacing.base,
  },
  hintBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.md,
  },
  hintIcon: { fontSize: 22 },
  leaderboardBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  leaderboardIcon: { fontSize: 22 },
});
