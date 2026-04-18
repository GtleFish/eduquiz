// Converted from: src/app/components/MatchPairs.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';

const LEFT_ITEMS = ['Hà Nội', 'Paris', 'Tokyo'];
const RIGHT_ITEMS = ['Việt Nam', 'Pháp', 'Nhật Bản'];

// Correct pairs: index 0→0, 1→1, 2→2
const CORRECT_PAIRS: Record<number, number> = { 0: 0, 1: 1, 2: 2 };

export default function MatchPairsScreen() {
  const router = useRouter();
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, number>>({});

  const handleLeft = (i: number) => {
    if (matched[i] !== undefined) return;
    setSelectedLeft(i);
  };

  const handleRight = (j: number) => {
    if (selectedLeft === null) return;
    const alreadyMatched = Object.values(matched).includes(j);
    if (alreadyMatched) return;
    setMatched((prev) => ({ ...prev, [selectedLeft]: j }));
    setSelectedLeft(null);
  };

  const isLeftMatched = (i: number) => matched[i] !== undefined;
  const isRightMatched = (j: number) => Object.values(matched).includes(j);

  return (
    <View style={styles.screen}>
      <QuestionProgressBar
        current={8}
        total={15}
        points={2000}
        onClose={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Ghép Đôi Hoàn Hảo</Text>
          <Text style={styles.subtitle}>
            Kết nối các thủ đô với quốc gia tương ứng của chúng.
          </Text>
        </View>

        {/* Pairs grid */}
        <View style={styles.grid}>
          {/* Left column */}
          <View style={styles.column}>
            {LEFT_ITEMS.map((item, i) => {
              const isActive = selectedLeft === i;
              const isDone = isLeftMatched(i);
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.pairCard,
                    isActive && styles.pairCardActive,
                    isDone && styles.pairCardDone,
                  ]}
                  onPress={() => handleLeft(i)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pairText, (isActive || isDone) && styles.pairTextLight]}>
                    {item}
                  </Text>
                  <Text style={[styles.pairArrow, (isActive || isDone) && styles.pairArrowLight]}>
                    ⇢
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Right column */}
          <View style={styles.column}>
            {RIGHT_ITEMS.map((item, j) => {
              const isDone = isRightMatched(j);
              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.pairCard,
                    styles.pairCardRight,
                    isDone && styles.pairCardDone,
                  ]}
                  onPress={() => handleRight(j)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pairArrow, isDone && styles.pairArrowLight]}>⇠</Text>
                  <Text style={[styles.pairText, isDone && styles.pairTextLight]}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Streak bonus */}
        <View style={styles.streakBadge}>
          <View style={styles.streakIcon}>
            <Text style={styles.streakIconText}>⚡</Text>
          </View>
          <View>
            <Text style={styles.streakLabel}>Chuỗi thắng</Text>
            <Text style={styles.streakValue}>5 Câu Liên Tiếp!</Text>
          </View>
        </View>
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
  titleBlock: { gap: Spacing.xs },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  grid: { flexDirection: 'row', gap: Spacing.xl },
  column: { flex: 1, gap: Spacing.xl },
  pairCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.primaryMuted,
    ...Shadow.sm,
  },
  pairCardRight: { flexDirection: 'row-reverse' },
  pairCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  pairCardDone: { backgroundColor: Colors.primaryLight, borderColor: Colors.primaryLight },
  pairText: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  pairTextLight: { color: Colors.white },
  pairArrow: { fontSize: 16, color: Colors.textMuted },
  pairArrowLight: { color: 'rgba(255,255,255,0.5)' },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: 'rgba(243,232,255,0.8)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    alignSelf: 'center',
  },
  streakIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.sm,
  },
  streakIconText: { fontSize: 20 },
  streakLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase' },
  streakValue: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
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
