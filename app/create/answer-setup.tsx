// Converted from: src/app/components/ThietLapDapAn.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const LABELS = ['A', 'B', 'C', 'D'];

export default function AnswerSetupScreen() {
  const router = useRouter();
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);

  const updateAnswer = (i: number, text: string) => {
    const next = [...answers];
    next[i] = text;
    setAnswers(next);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <AppHeader
        title="EduQuiz"
        onBack={() => router.back()}
        rightElement={
          <TouchableOpacity>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        }
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Step header */}
        <View style={styles.stepBlock}>
          <Text style={styles.stepLabel}>Bước 2: Thiết lập câu trả lời</Text>
          <Text style={styles.stepTitle}>Câu hỏi trắc nghiệm</Text>
          <View style={styles.stepUnderline} />
        </View>

        {/* Answer options */}
        <View style={styles.answersBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📝</Text>
            <Text style={styles.sectionLabel}>Các lựa chọn trả lời</Text>
          </View>

          {LABELS.map((label, i) => (
            <View key={label} style={styles.answerWrapper}>
              <View style={styles.answerCard}>
                <View style={styles.answerLeft}>
                  <View style={styles.answerBadge}>
                    <Text style={styles.answerBadgeText}>{label}</Text>
                  </View>
                  <TextInput
                    style={styles.answerInput}
                    placeholder={`Nhập câu trả lời thứ ${i + 1}...`}
                    placeholderTextColor={Colors.textMuted}
                    value={answers[i]}
                    onChangeText={(t) => updateAnswer(i, t)}
                  />
                </View>
                <View style={styles.answerRight}>
                  <Text style={styles.correctLabel}>Đáp án đúng</Text>
                  <TouchableOpacity
                    style={[styles.toggle, correctIndex === i && styles.toggleActive]}
                    onPress={() => setCorrectIndex(i)}
                  >
                    <View style={[styles.toggleThumb, correctIndex === i && styles.toggleThumbActive]} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Explanation */}
        <View style={styles.explanationBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>💬</Text>
            <Text style={styles.sectionLabel}>Thêm giải thích</Text>
          </View>
          <TextInput
            style={styles.explanationInput}
            placeholder="Giải thích vì sao đáp án này đúng để người học dễ hiểu hơn..."
            placeholderTextColor={Colors.textMuted}
            value={explanation}
            onChangeText={setExplanation}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Timer */}
        <View style={styles.timerBlock}>
          <View style={styles.timerHeader}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>⏱</Text>
              <Text style={styles.sectionLabel}>Thời gian trả lời</Text>
            </View>
            <Text style={styles.timerValue}>{timeLimit}s</Text>
          </View>
          <View style={styles.timerControls}>
            <TouchableOpacity
              style={styles.timerBtn}
              onPress={() => setTimeLimit((t) => Math.max(10, t - 5))}
            >
              <Text style={styles.timerBtnText}>−</Text>
            </TouchableOpacity>
            <View style={styles.timerTrack}>
              <View style={[styles.timerFill, { width: `${((timeLimit - 10) / 50) * 100}%` }]} />
            </View>
            <TouchableOpacity
              style={[styles.timerBtn, styles.timerBtnActive]}
              onPress={() => setTimeLimit((t) => Math.min(60, t + 5))}
            >
              <Text style={[styles.timerBtnText, styles.timerBtnTextActive]}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timerLabels}>
            <Text style={styles.timerLabelText}>10s</Text>
            <Text style={styles.timerLabelText}>30s</Text>
            <Text style={styles.timerLabelText}>60s</Text>
          </View>
        </View>

        {/* Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Mẹo từ EduQuiz AI</Text>
            <Text style={styles.tipDesc}>
              Sử dụng các câu trả lời gần giống nhau để tăng độ khó và sự tập trung cho người học.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          label="Hoàn tất"
          onPress={() => router.push(Routes.CREATE_LIST)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  saveText: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 100 },
  stepBlock: { gap: Spacing.sm },
  stepLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  stepTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  stepUnderline: { width: 80, height: 4, borderRadius: Radius.pill, backgroundColor: Colors.primary },
  answersBlock: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  sectionIcon: { fontSize: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#67537c', textTransform: 'uppercase', letterSpacing: 0.5 },
  answerWrapper: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: 4,
  },
  answerCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  answerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, flex: 1 },
  answerBadge: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  answerBadgeText: { fontWeight: '700', color: Colors.primary },
  answerInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  answerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  correctLabel: { fontSize: 10, fontWeight: '700', color: '#836e99', textTransform: 'uppercase' },
  toggle: {
    width: 44, height: 24, borderRadius: 12,
    backgroundColor: Colors.primaryMuted,
    justifyContent: 'center', paddingHorizontal: 2,
  },
  toggleActive: { backgroundColor: '#ca8a04' },
  toggleThumb: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: { alignSelf: 'flex-end' },
  explanationBlock: { gap: Spacing.sm },
  explanationInput: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    minHeight: 100,
    fontSize: 14, color: Colors.textPrimary,
    textAlignVertical: 'top',
  },
  timerBlock: { gap: Spacing.sm },
  timerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timerValue: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  timerControls: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  timerBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  timerBtnActive: { backgroundColor: Colors.primary },
  timerBtnText: { fontSize: 22, color: Colors.primary, fontWeight: '700' },
  timerBtnTextActive: { color: Colors.white },
  timerTrack: {
    flex: 1, height: 8, backgroundColor: Colors.primaryMuted,
    borderRadius: Radius.pill, overflow: 'hidden',
  },
  timerFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: Radius.pill },
  timerLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  timerLabelText: { fontSize: 11, fontWeight: '700', color: '#836e99', textTransform: 'uppercase' },
  tipCard: {
    backgroundColor: Colors.yellowBg,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row', gap: Spacing.base,
    borderLeftWidth: 4, borderLeftColor: '#ca8a04',
  },
  tipIcon: { fontSize: 22 },
  tipText: { flex: 1, gap: Spacing.xs },
  tipTitle: { fontSize: 14, fontWeight: '700', color: Colors.yellowDark },
  tipDesc: { fontSize: 13, color: Colors.textPrimary, lineHeight: 20 },
  bottomBar: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1, borderTopColor: Colors.border,
    padding: Spacing.xl,
  },
});
