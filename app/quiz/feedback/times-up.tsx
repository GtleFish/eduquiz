// Converted from: src/app/components/TimesUpFeedback.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';

export default function TimesUpFeedbackScreen() {
  const router = useRouter();
  const { isLast } = useLocalSearchParams<{ isLast?: string }>();

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
    <LinearGradient colors={['#fbbf24', '#fde68a']} style={styles.screen}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={handleExit}>
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer circle */}
        <View style={styles.timerWrapper}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerNumber}>00</Text>
          </View>
          {/* Times up badge */}
          <View style={styles.timesUpBadge}>
            <Text style={styles.timesUpIcon}>⏱</Text>
            <Text style={styles.timesUpText}>Hết giờ</Text>
          </View>
        </View>

        <Text style={styles.title}>Hết giờ rồi!</Text>

        <Text style={styles.message}>
          Tiếc quá, bạn đã hết thời gian để trả lời câu hỏi này.
          Hãy xem đáp án đúng và tiếp tục nhé!
        </Text>

        {/* Correct answer reveal */}
        <View style={styles.correctReveal}>
          <Text style={styles.correctRevealLabel}>Đáp án đúng</Text>
          <View style={styles.correctRevealCard}>
            <Text style={styles.correctRevealIcon}>✓</Text>
            <Text style={styles.correctRevealText}>Paris</Text>
          </View>
        </View>

        {/* Continue button */}
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryGradientEnd]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.continueBtn}
          >
            <Text style={styles.continueBtnText}>Câu tiếp theo →</Text>
          </LinearGradient>
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
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 18, color: Colors.yellowDark, fontWeight: '700' },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    paddingTop: 80,
    gap: Spacing.xl,
  },
  timerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  timerCircle: {
    width: 140, height: 140, borderRadius: 70,
    borderWidth: 10, borderColor: Colors.yellowDark,
    alignItems: 'center', justifyContent: 'center',
  },
  timerNumber: { fontSize: 48, fontWeight: '900', color: Colors.yellowDark },
  timesUpBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: '#dc2626',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  timesUpIcon: { fontSize: 14, color: Colors.white },
  timesUpText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  title: { fontSize: 44, fontWeight: '900', color: Colors.yellowDark },
  message: {
    fontSize: 15, color: 'rgba(120,53,15,0.8)',
    textAlign: 'center', lineHeight: 24, maxWidth: 320,
  },
  correctReveal: { width: '100%', gap: Spacing.sm },
  correctRevealLabel: {
    fontSize: 11, fontWeight: '700', color: 'rgba(120,53,15,0.6)',
    textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center',
  },
  correctRevealCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    borderWidth: 2, borderColor: Colors.yellowDark,
  },
  correctRevealIcon: { fontSize: 20, color: Colors.yellowDark, fontWeight: '800' },
  correctRevealText: { fontSize: 20, fontWeight: '800', color: Colors.yellowDark },
  continueBtn: {
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing['2xl'], paddingVertical: Spacing.base,
    ...Shadow.xl,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});
