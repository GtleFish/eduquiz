// Converted from: src/app/components/ArrangeOrder.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';

const INITIAL_ITEMS = [
  { id: 'mercury', label: 'Sao Thủy' },
  { id: 'venus', label: 'Sao Kim' },
  { id: 'earth', label: 'Trái Đất' },
  { id: 'mars', label: 'Sao Hỏa' },
];

export default function ArrangeOrderScreen() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [dragging, setDragging] = useState<number | null>(null);

  // Simple swap on press (full drag-and-drop needs react-native-draggable-flatlist)
  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    setItems(next);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    setItems(next);
  };

  return (
    <View style={styles.screen}>
      <QuestionProgressBar
        current={7}
        total={15}
        points={1800}
        onClose={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Type badge */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>Sắp xếp theo thứ tự</Text>
        </View>

        {/* Question */}
        <View style={styles.questionBlock}>
          <Text style={styles.questionText}>
            Sắp xếp các hành tinh{'\n'}theo thứ tự xa dần mặt{'\n'}trời
          </Text>
          <Text style={styles.questionHint}>
            Nhấn ↑ ↓ để di chuyển các thẻ.
          </Text>
        </View>

        {/* Sortable list */}
        <View style={styles.list}>
          {items.map((item, index) => (
            <View key={item.id} style={styles.sortRow}>
              <View style={styles.sortCard}>
                <View style={styles.sortNumber}>
                  <Text style={styles.sortNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.sortLabel}>{item.label}</Text>
              </View>
              <View style={styles.sortControls}>
                <TouchableOpacity
                  style={[styles.sortBtn, index === 0 && styles.sortBtnDisabled]}
                  onPress={() => moveUp(index)}
                  disabled={index === 0}
                >
                  <Text style={styles.sortBtnText}>↑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sortBtn, index === items.length - 1 && styles.sortBtnDisabled]}
                  onPress={() => moveDown(index)}
                  disabled={index === items.length - 1}
                >
                  <Text style={styles.sortBtnText}>↓</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Illustration placeholder */}
        <View style={styles.illustrationCard}>
          <Text style={styles.illustrationEmoji}>🪐</Text>
          <Text style={styles.illustrationLabel}>Space Exploration Quiz Series</Text>
        </View>

        <PrimaryButton
          label="Kiểm tra kết quả"
          onPress={() => router.push(Routes.FEEDBACK_CORRECT)}
        />
      </ScrollView>

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
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 100 },
  typeBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
  },
  typeBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5 },
  questionBlock: { gap: Spacing.sm },
  questionText: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, lineHeight: 38 },
  questionHint: { fontSize: 13, color: Colors.textSecondary },
  list: { gap: Spacing.md },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  sortCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.xl,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.xl,
    borderWidth: 1, borderColor: Colors.primaryMuted,
  },
  sortNumber: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  sortNumberText: { fontWeight: '700', color: Colors.primary, fontSize: 16 },
  sortLabel: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary },
  sortControls: { gap: Spacing.xs },
  sortBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.primaryMuted,
  },
  sortBtnDisabled: { opacity: 0.3 },
  sortBtnText: { fontSize: 16, color: Colors.primary, fontWeight: '700' },
  illustrationCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    height: 160,
    alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
  },
  illustrationEmoji: { fontSize: 64 },
  illustrationLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
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
