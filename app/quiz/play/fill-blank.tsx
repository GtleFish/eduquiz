// Converted from: src/app/components/FillInTheBlank.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { QuestionProgressBar } from '../../../components/quiz/QuestionProgressBar';

export default function FillInTheBlankScreen() {
  const router = useRouter();
  const [answer, setAnswer] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.progress}>5/15</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.timerBadge}>
            <Text style={styles.timerIcon}>⏱</Text>
            <Text style={styles.timerText}>18s</Text>
          </View>
          <Text style={styles.points}>1,400 pts</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Type badge */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>Điền vào chỗ trống</Text>
        </View>

        {/* Question */}
        <Text style={styles.questionText}>
          Ai là người đầu tiên{'\n'}đặt chân lên mặt{'\n'}trăng?
        </Text>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Nhập câu trả lời..."
          placeholderTextColor={Colors.primaryMuted}
          value={answer}
          onChangeText={setAnswer}
          textAlign="center"
          autoFocus
        />

        <Text style={styles.tip}>
          Mẹo: Trả lời nhanh để nhận thêm điểm thưởng!
        </Text>
      </View>

      {/* Submit button */}
      <View style={styles.submitWrapper}>
        <TouchableOpacity
          onPress={() => router.push(Routes.FEEDBACK_CORRECT)}
          disabled={!answer.trim()}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryGradientEnd]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={[styles.submitBtn, !answer.trim() && styles.submitBtnDisabled]}
          >
            <Text style={styles.submitText}>GỬI</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    backgroundColor: Colors.primarySurface,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  closeIcon: { fontSize: 20, color: Colors.primary },
  progress: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  progressTrack: {
    width: 80, height: 4, backgroundColor: Colors.primaryMuted,
    borderRadius: Radius.pill, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: Radius.pill },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  timerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
  },
  timerIcon: { fontSize: 14 },
  timerText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  points: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  content: {
    flex: 1, padding: Spacing.xl, paddingTop: Spacing['2xl'],
    gap: Spacing.xl, alignItems: 'center',
  },
  typeBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
  },
  typeBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary, textTransform: 'uppercase', letterSpacing: 0.5 },
  questionText: {
    fontSize: 28, fontWeight: '800', color: Colors.textPrimary,
    textAlign: 'center', lineHeight: 38,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.primarySurface,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    fontSize: 18, color: Colors.textPrimary,
    textAlign: 'center',
  },
  tip: { fontSize: 13, color: Colors.primary, textAlign: 'center' },
  submitWrapper: {
    paddingHorizontal: Spacing.xl, paddingBottom: 34, paddingTop: Spacing.base,
  },
  submitBtn: {
    borderRadius: Radius.pill, paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitText: { fontSize: 16, fontWeight: '800', color: Colors.white, letterSpacing: 1 },
});
