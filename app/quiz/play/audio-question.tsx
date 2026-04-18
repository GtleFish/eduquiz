// Converted from: src/app/components/AudioQuestion.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';
import { OptionCard, Option } from '../../../components/quiz/OptionCard';

const WAVEFORM_HEIGHTS = [16, 32, 48, 40, 64, 24, 56, 32, 48, 20, 40, 64, 32, 16];

const OPTIONS: Option[] = [
  { id: 'a', label: 'A', text: 'Việt Nam', color: Colors.primary },
  { id: 'b', label: 'B', text: 'Nhật Bản', color: Colors.primary },
  { id: 'c', label: 'C', text: 'Hàn Quốc', color: Colors.primary },
  { id: 'd', label: 'D', text: 'Thái Lan', color: Colors.primary },
];

export default function AudioQuestionScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.screen}>
      <QuestionProgressBar
        current={10}
        total={15}
        points={2500}
        onClose={() => router.back()}
      />

      <View style={styles.content}>
        {/* Question */}
        <Text style={styles.questionText}>
          Đây là đoạn nhạc của{'\n'}quốc gia nào?
        </Text>

        {/* Audio player */}
        <View style={styles.playerCard}>
          <LinearGradient
            colors={['rgba(104,58,209,0.1)', 'rgba(250,213,56,0.1)']}
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => setIsPlaying((v) => !v)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryLight]}
              style={styles.playBtnGradient}
            >
              <Text style={styles.playBtnIcon}>{isPlaying ? '⏸' : '▶'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Waveform */}
          <View style={styles.waveform}>
            {WAVEFORM_HEIGHTS.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    height: h,
                    backgroundColor: isPlaying && i < 6 ? Colors.primary : Colors.primaryLight,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Streak badge */}
        <View style={styles.streakBadge}>
          <View style={styles.streakIcon}>
            <Text style={styles.streakIconText}>🔥</Text>
          </View>
          <Text style={styles.streakText}>5 Streak</Text>
        </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  content: { flex: 1, padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  questionText: {
    fontSize: 28, fontWeight: '800', color: Colors.textPrimary,
    textAlign: 'center', lineHeight: 38,
  },
  playerCard: {
    backgroundColor: Colors.primaryMuted,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center',
    gap: Spacing.xl,
    overflow: 'hidden',
  },
  playBtn: { borderRadius: 48, overflow: 'hidden', ...Shadow.xl },
  playBtnGradient: {
    width: 88, height: 88, borderRadius: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  playBtnIcon: { fontSize: 36, color: Colors.white, marginLeft: 4 },
  waveform: {
    flexDirection: 'row', alignItems: 'flex-end',
    gap: 4, height: 64,
  },
  waveBar: { width: 4, borderRadius: 2 },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: 'rgba(243,232,255,0.8)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    alignSelf: 'center',
    ...Shadow.sm,
  },
  streakIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  streakIconText: { fontSize: 18 },
  streakText: { fontWeight: '600', color: Colors.primary, fontSize: 15 },
  optionsList: { gap: Spacing.md },
});
