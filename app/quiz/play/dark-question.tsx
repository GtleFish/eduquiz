// Converted from: CauHoiToi.tsx — Dark mode question screen
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { DarkColors as D } from '../../../constants/darkColors';
import { Spacing, Radius } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { useCountdown } from '../../../hooks/useCountdown';

const OPTIONS = [
  { id: 'a', label: 'A', text: 'Venus', badgeBg: '#93000a', badgeText: '#ffb4ab' },
  { id: 'b', label: 'B', text: 'Mars', badgeBg: D.primary, badgeText: D.white },
  { id: 'c', label: 'C', text: 'Jupiter', badgeBg: '#d0ae00', badgeText: '#514200' },
  { id: 'd', label: 'D', text: 'Saturn', badgeBg: '#2e4a3d', badgeText: '#a7f3d0' },
];

export default function DarkQuestionScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const { seconds, start } = useCountdown(30);

  useEffect(() => { start(); }, []);

  const handleClose = () => {
    Alert.alert('Thoát quiz?', 'Tiến trình sẽ không được lưu.', [
      { text: 'Tiếp tục chơi', style: 'cancel' },
      { text: 'Thoát', style: 'destructive', onPress: () => router.replace(Routes.HOME) },
    ]);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.questionLabel}>Question</Text>
            <Text style={styles.questionProgress}>3/15</Text>
          </View>
        </View>

        {/* Timer ring */}
        <View style={styles.timerRing}>
          <Text style={styles.timerText}>{seconds}</Text>
        </View>

        <View style={styles.avatar} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: '20%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Question card */}
        <View style={styles.questionCard}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeIcon}>🔭</Text>
            <Text style={styles.questionBadgeText}>Astronomy Basics</Text>
          </View>
          <Text style={styles.questionText}>
            Which planet is known as the "Red Planet"?
          </Text>
        </View>

        {/* Planet illustration */}
        <View style={styles.planetCard}>
          <View style={styles.planet} />
        </View>

        {/* Options */}
        <View style={styles.optionsList}>
          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.optionRow, selected === opt.id && styles.optionRowSelected]}
              onPress={() => setSelected(opt.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.optionBadge, { backgroundColor: opt.badgeBg }]}>
                <Text style={[styles.optionBadgeText, { color: opt.badgeText }]}>{opt.label}</Text>
              </View>
              <Text style={styles.optionText}>{opt.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.hintBtn}>
          <Text style={styles.hintIcon}>💡</Text>
          <Text style={styles.hintText}>Hint</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitBtn, !selected && styles.submitBtnDisabled]}
          onPress={() => selected && router.push(Routes.FEEDBACK_CORRECT)}
          disabled={!selected}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: D.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: D.border, alignItems: 'center', justifyContent: 'center' },
  closeBtnText: { fontSize: 18, color: D.primaryLight },
  questionLabel: { fontSize: 10, color: D.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  questionProgress: { fontSize: 20, fontWeight: '800', color: D.primaryLight },
  timerRing: { width: 56, height: 56, borderRadius: 28, borderWidth: 4, borderColor: D.yellow, alignItems: 'center', justifyContent: 'center' },
  timerText: { fontSize: 14, fontWeight: '800', color: D.yellow },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: D.primary },
  progressTrack: { height: 8, backgroundColor: D.border, marginHorizontal: Spacing.xl, borderRadius: Radius.pill, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: D.primary, borderRadius: Radius.pill },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 120 },
  questionCard: {
    backgroundColor: D.surface, borderRadius: 40, padding: Spacing['2xl'],
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', gap: Spacing.xl,
  },
  questionBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: D.border, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs, alignSelf: 'flex-start' },
  questionBadgeIcon: { fontSize: 16 },
  questionBadgeText: { fontSize: 11, fontWeight: '700', color: '#ffb688', textTransform: 'uppercase', letterSpacing: 0.5 },
  questionText: { fontSize: 22, fontWeight: '800', color: D.text, textAlign: 'center', lineHeight: 32 },
  planetCard: { borderRadius: Radius['2xl'], overflow: 'hidden', height: 200, alignItems: 'center', justifyContent: 'center', backgroundColor: D.surface },
  planet: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#f97316' },
  optionsList: { gap: Spacing.md },
  optionRow: { backgroundColor: D.surface, borderRadius: Radius.pill, padding: 4, flexDirection: 'row', alignItems: 'center', gap: Spacing.xl },
  optionRowSelected: { borderWidth: 2, borderColor: D.primary },
  optionBadge: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  optionBadgeText: { fontSize: 22, fontWeight: '800' },
  optionText: { fontSize: 18, fontWeight: '700', color: D.text },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingBottom: 34, paddingTop: Spacing.base, backgroundColor: D.bg },
  hintBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: 'rgba(51,52,72,0.6)', borderRadius: Radius.pill, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  hintIcon: { fontSize: 18 },
  hintText: { fontSize: 15, fontWeight: '700', color: D.primaryLight },
  submitBtn: { backgroundColor: D.primary, borderRadius: Radius.pill, paddingHorizontal: Spacing['2xl'], paddingVertical: Spacing.base },
  submitBtnDisabled: { opacity: 0.4 },
  submitBtnText: { fontSize: 15, fontWeight: '800', color: D.white, textTransform: 'uppercase', letterSpacing: 1 },
});
