// Converted from: src/app/components/WrongFeedback.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { QuizSessionStore } from '../../../store/quizSessionStore';

export default function WrongFeedbackScreen() {
  const router = useRouter();
  const { isLast } = useLocalSearchParams<{ isLast?: string }>();

  // Read the question that was just answered (NOT current question)
  const lastAnswered = QuizSessionStore.getLastAnswered();
  const correctOption = lastAnswered?.question.options.find(
    (o) => o.id === lastAnswered.question.correctId
  );
  const explanation = lastAnswered?.question.explanation ?? 'Không có giải thích.';

  const handleExit = () => {
    Alert.alert(
      'Thoát quiz?', 'Tiến trình sẽ không được lưu.',
      [
        { text: 'Tiếp tục chơi', style: 'cancel' },
        { text: 'Thoát', style: 'destructive', onPress: () => router.replace(Routes.HOME) },
      ]
    );
  };

  const handleContinue = () => {
    if (isLast === '1') {
      router.replace(Routes.QUIZ_COMPLETE);
    } else {
      router.back();
    }
  };

  return (
    <LinearGradient colors={['#dc2626', '#db2777']} style={styles.screen}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={handleExit}>
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Sad icon */}
        <View style={styles.iconCircle}>
          <Text style={styles.iconEmoji}>😞</Text>
        </View>

        <Text style={styles.title}>Tiếc quá!</Text>

        {/* Correct answer reveal */}
        <View style={styles.correctReveal}>
          <Text style={styles.correctRevealLabel}>Đáp án đúng</Text>
          <View style={styles.correctRevealCard}>
            <Text style={styles.correctRevealIcon}>✓</Text>
            <Text style={styles.correctRevealText}>
              {correctOption?.text ?? 'N/A'}
            </Text>
          </View>
        </View>

        {/* Explanation card */}
        <View style={styles.explanationCard}>
          <Text style={styles.explanationLabel}>Giải thích</Text>
          <Text style={styles.explanationText}>{explanation}</Text>
        </View>

        {/* Continue button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Đã hiểu →</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  closeBtn: {
    position: 'absolute', top: 52, right: Spacing.xl,
    zIndex: 10,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 18, color: Colors.white, fontWeight: '700' },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    paddingTop: 80,
    gap: Spacing.xl,
  },
  iconCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji: { fontSize: 64 },
  title: { fontSize: 48, fontWeight: '800', color: Colors.white },
  correctReveal: { width: '100%', gap: Spacing.sm },
  correctRevealLabel: {
    fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center',
  },
  correctRevealCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
  },
  correctRevealIcon: { fontSize: 20, color: Colors.yellowDark, fontWeight: '800' },
  correctRevealText: { fontSize: 20, fontWeight: '800', color: Colors.yellowDark },
  explanationCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    width: '100%', gap: Spacing.sm,
  },
  explanationLabel: {
    fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase', letterSpacing: 0.8,
  },
  explanationText: { fontSize: 14, color: Colors.white, lineHeight: 22 },
  continueBtn: {
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing['3xl'], paddingVertical: Spacing.base,
    ...Shadow.xl,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: '#dc2626' },
});
