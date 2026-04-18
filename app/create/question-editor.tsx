// Converted from: src/app/components/SoanCauHoi.tsx
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

const ANSWER_LABELS = ['A', 'B', 'C', 'D'];
const ANSWER_COLORS = [Colors.primary, Colors.primary, Colors.primary, Colors.primary];

export default function QuestionEditorScreen() {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const updateAnswer = (index: number, text: string) => {
    const next = [...answers];
    next[index] = text;
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
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        }
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtnPrimary}>
            <Text style={styles.actionBtnPrimaryText}>✏️  Tiếp nghiệm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSecondary}>
            <Text style={styles.actionBtnSecondaryText}>📸 Ảnh/âm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnIcon}>
            <Text style={styles.actionBtnIconText}>🔄</Text>
          </TouchableOpacity>
        </View>

        {/* Question input */}
        <TextInput
          style={styles.questionInput}
          placeholder="Nhập câu hỏi tại đây..."
          placeholderTextColor={Colors.textMuted}
          value={question}
          onChangeText={setQuestion}
          multiline
          textAlignVertical="top"
        />

        {/* Media placeholder */}
        <TouchableOpacity style={styles.mediaPlaceholder}>
          <View style={styles.mediaIcon}>
            <Text style={styles.mediaIconText}>🖼️</Text>
          </View>
          <Text style={styles.mediaTitle}>Thêm ảnh/video</Text>
          <Text style={styles.mediaDesc}>Tải lên hoặc chọn từ thư viện của bạn</Text>
        </TouchableOpacity>

        {/* Answer options */}
        <View style={styles.answersBlock}>
          <Text style={styles.answersTitle}>Lựa chọn đáp án</Text>
          {answers.map((ans, i) => (
            <View
              key={i}
              style={[
                styles.answerRow,
                correctIndex === i && styles.answerRowCorrect,
              ]}
            >
              <View style={[styles.answerBadge, correctIndex === i && styles.answerBadgeCorrect]}>
                <Text style={[styles.answerBadgeText, correctIndex === i && styles.answerBadgeTextCorrect]}>
                  {ANSWER_LABELS[i]}
                </Text>
              </View>
              <TextInput
                style={styles.answerInput}
                placeholder={`Đáp án thứ ${i + 1}...`}
                placeholderTextColor={Colors.textMuted}
                value={ans}
                onChangeText={(t) => updateAnswer(i, t)}
              />
              <TouchableOpacity
                style={[styles.correctToggle, correctIndex === i && styles.correctToggleActive]}
                onPress={() => setCorrectIndex(i)}
              >
                {correctIndex === i && <Text style={styles.correctToggleIcon}>✓</Text>}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <PrimaryButton
          label="Lưu câu hỏi"
          onPress={() => router.push(Routes.CREATE_LIST)}
        />
      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  saveBtn: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  saveBtnText: { fontSize: 14, fontWeight: '600', color: Colors.white },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  actionRow: { flexDirection: 'row', gap: Spacing.md },
  actionBtnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    ...Shadow.sm,
  },
  actionBtnPrimaryText: { color: Colors.white, fontWeight: '600', fontSize: 14 },
  actionBtnSecondary: {
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  actionBtnSecondaryText: { color: Colors.textSecondary, fontWeight: '600', fontSize: 14 },
  actionBtnIcon: { padding: Spacing.md },
  actionBtnIconText: { fontSize: 20 },
  questionInput: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    minHeight: 160,
    fontSize: 16, color: Colors.textPrimary,
    borderWidth: 2, borderColor: Colors.primarySurface,
    textAlignVertical: 'top',
  },
  mediaPlaceholder: {
    backgroundColor: Colors.primarySurface,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    borderStyle: 'dashed',
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center', gap: Spacing.sm,
  },
  mediaIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  mediaIconText: { fontSize: 32 },
  mediaTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  mediaDesc: { fontSize: 13, color: Colors.textSecondary },
  answersBlock: { gap: Spacing.md },
  answersTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  answerRow: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  answerRowCorrect: { borderColor: Colors.primary, backgroundColor: Colors.primarySurface },
  answerBadge: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  answerBadgeCorrect: { backgroundColor: Colors.primary },
  answerBadgeText: { fontWeight: '700', color: Colors.primary },
  answerBadgeTextCorrect: { color: Colors.white },
  answerInput: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  correctToggle: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  correctToggleActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  correctToggleIcon: { fontSize: 12, color: Colors.white, fontWeight: '700' },
});
