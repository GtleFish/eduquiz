// Converted from: src/app/components/TrueFalse.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';
import { TimerBadge } from '../../../components/quiz/TimerBadge';
import { useCountdown } from '../../../hooks/useCountdown';

export default function TrueFalseScreen() {
  const router = useRouter();
  const { seconds } = useCountdown(25);
  const [selected, setSelected] = useState<'true' | 'false' | null>(null);

  return (
    <View style={styles.screen}>
      <QuestionProgressBar
        current={3}
        total={15}
        points={1250}
        onClose={() => router.back()}
      />

      <View style={styles.content}>
        <TimerBadge seconds={seconds} />

        {/* Question card */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>Câu hỏi số 4</Text>
          </View>
          <Text style={styles.questionText}>
            Mặt trời là một{'\n'}ngôi sao?
          </Text>
          <View style={styles.imageWrapper}>
            <Text style={styles.imagePlaceholder}>☀️</Text>
          </View>
        </View>

        {/* True/False buttons */}
        <View style={styles.optionsWrapper}>
          <TouchableOpacity
            style={[styles.tfButton, styles.tfButtonTrue, selected === 'true' && styles.tfButtonSelected]}
            onPress={() => setSelected('true')}
            activeOpacity={0.85}
          >
            <View style={[styles.tfIcon, styles.tfIconTrue]}>
              <Text style={styles.tfIconText}>✓</Text>
            </View>
            <Text style={styles.tfLabel}>Đúng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tfButton, styles.tfButtonFalse, selected === 'false' && styles.tfButtonSelected]}
            onPress={() => setSelected('false')}
            activeOpacity={0.85}
          >
            <View style={[styles.tfIcon, styles.tfIconFalse]}>
              <Text style={styles.tfIconText}>✕</Text>
            </View>
            <Text style={styles.tfLabel}>Sai</Text>
          </TouchableOpacity>
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
  content: { flex: 1, padding: Spacing.xl, paddingTop: Spacing['2xl'], gap: Spacing.xl },
  questionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    ...Shadow.md,
  },
  questionBadge: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: Spacing.base,
  },
  questionBadgeText: {
    fontSize: 11, fontWeight: '700', color: Colors.primary,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 28, fontWeight: '800', color: Colors.textPrimary,
    lineHeight: 38, marginBottom: Spacing.xl,
  },
  imageWrapper: { alignItems: 'center' },
  imagePlaceholder: { fontSize: 80 },
  optionsWrapper: { gap: Spacing.xl },
  tfButton: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center',
    gap: Spacing.base,
    ...Shadow.md,
  },
  tfButtonTrue: { borderBottomWidth: 6, borderBottomColor: '#16a34a' },
  tfButtonFalse: { borderBottomWidth: 6, borderBottomColor: '#dc2626' },
  tfButtonSelected: { transform: [{ scale: 0.98 }] },
  tfIcon: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
  },
  tfIconTrue: { backgroundColor: '#dcfce7' },
  tfIconFalse: { backgroundColor: '#fee2e2' },
  tfIconText: { fontSize: 32, fontWeight: '700' },
  tfLabel: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
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
