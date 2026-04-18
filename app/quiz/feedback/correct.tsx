// Converted from: src/app/components/CorrectFeedback.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';

export default function CorrectFeedbackScreen() {
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
      // Go back to multiple-choice — useFocusEffect will load next question
      router.back();
    }
  };

  return (
    <LinearGradient colors={['#fbbf24', '#fde68a']} style={styles.screen}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeBtn} onPress={handleExit}>
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <View style={[styles.blob, { top: 80, left: 40, width: 64, height: 64, backgroundColor: 'rgba(109,40,217,0.2)' }]} />
      <View style={[styles.blob, { bottom: 128, left: 80, width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.2)' }]} />

      <View style={styles.content}>
        <View style={styles.trophyWrapper}>
          <View style={styles.trophyCircle}>
            <Text style={styles.trophyIcon}>🏆</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>3 streak</Text>
          </View>
        </View>

        <Text style={styles.title}>Chính xác!</Text>

        <View style={styles.pointsRow}>
          <Text style={styles.points}>+100 pts</Text>
          <Text style={styles.arrow}>→</Text>
        </View>

        <Text style={styles.encouragement}>
          Bạn đang dẫn đầu bảng xếp hạng tuần này.{'\n'}Tiếp tục duy trì phong độ nhé!
        </Text>

        <PrimaryButton
          label="Tiếp tục →"
          onPress={handleContinue}
          style={styles.btn}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  blob: { position: 'absolute', borderRadius: 999 },
  closeBtn: {
    position: 'absolute', top: 52, right: Spacing.xl,
    zIndex: 10,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 18, color: Colors.yellowDark, fontWeight: '700' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  trophyWrapper: { alignItems: 'center', gap: Spacing.base, marginBottom: Spacing.sm },
  trophyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.xl,
  },
  trophyIcon: { fontSize: 60 },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    ...Shadow.sm,
  },
  streakIcon: { fontSize: 18 },
  streakText: { fontWeight: '700', color: Colors.textPrimary, fontSize: 15 },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.yellowDark,
  },
  pointsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  points: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  arrow: { fontSize: 20, color: Colors.primary },
  encouragement: {
    fontSize: 15,
    color: 'rgba(120,53,15,0.8)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  btn: { marginTop: Spacing.base, alignSelf: 'stretch' },
});
