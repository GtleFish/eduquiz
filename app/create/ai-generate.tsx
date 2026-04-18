// Converted from: src/app/components/AiTaoQuiz.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';

const GRADES = ['6', '7', '8', '9', '10', '11', '12'];
const QUESTION_TYPES = [
  { icon: '☰', label: 'Trắc nghiệm', id: 'mc' },
  { icon: '✓✕', label: 'Đúng/Sai', id: 'tf' },
  { icon: '__', label: 'Điền chỗ trống', id: 'fill' },
];
const DIFFICULTIES = [
  { key: 'easy', label: 'Dễ', bg: '#dcfce7', color: '#16a34a' },
  { key: 'medium', label: 'TB', bg: Colors.primary, color: Colors.white },
  { key: 'hard', label: 'Khó', bg: Colors.primarySurface, color: Colors.textSecondary },
];

export default function AiGenerateScreen() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('10');
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedType, setSelectedType] = useState('mc');
  const [difficulty, setDifficulty] = useState('medium');
  const [mode, setMode] = useState<'ai' | 'custom'>('ai');

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
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerTitle}>Sáng tạo nội dung{'\n'}thông minh hơn</Text>
          <Text style={styles.headerDesc}>
            Hệ thống AI sẽ tự động tạo ra bộ câu hỏi phù hợp dựa trên yêu cầu của bạn.
          </Text>
        </View>

        {/* Mode selector */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Chọn chế độ tạo</Text>
          <View style={styles.modeRow}>
            <TouchableOpacity
              style={[styles.modeBtn, mode === 'ai' && styles.modeBtnActive]}
              onPress={() => setMode('ai')}
            >
              <Text style={[styles.modeBtnText, mode === 'ai' && styles.modeBtnTextActive]}>AI tạo hộ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeBtn, mode === 'custom' && styles.modeBtnActive]}
              onPress={() => setMode('custom')}
            >
              <Text style={[styles.modeBtnText, mode === 'custom' && styles.modeBtnTextActive]}>Tùy chỉnh</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subject */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Chủ đề</Text>
          <TextInput
            style={styles.textInput}
            placeholder="VD: Lịch sử Việt Nam"
            placeholderTextColor={Colors.textMuted}
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        {/* Grade */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Khối lớp</Text>
          <View style={styles.gradeGrid}>
            {GRADES.map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.gradeBtn, selectedGrade === g && styles.gradeBtnActive]}
                onPress={() => setSelectedGrade(g)}
              >
                <Text style={[styles.gradeBtnText, selectedGrade === g && styles.gradeBtnTextActive]}>
                  Lớp {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Question count */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Số câu hỏi</Text>
          <View style={styles.countRow}>
            <TouchableOpacity
              style={styles.countBtn}
              onPress={() => setQuestionCount((c) => Math.max(5, c - 5))}
            >
              <Text style={styles.countBtnText}>−</Text>
            </TouchableOpacity>
            <View style={styles.countDisplay}>
              <Text style={styles.countValue}>{questionCount}</Text>
            </View>
            <TouchableOpacity
              style={[styles.countBtn, styles.countBtnActive]}
              onPress={() => setQuestionCount((c) => Math.min(50, c + 5))}
            >
              <Text style={[styles.countBtnText, styles.countBtnTextActive]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Question types */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Loại câu hỏi chính</Text>
          <View style={styles.typeList}>
            {QUESTION_TYPES.map((qt) => (
              <TouchableOpacity
                key={qt.id}
                style={[styles.typeCard, selectedType === qt.id && styles.typeCardActive]}
                onPress={() => setSelectedType(qt.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.typeIcon, selectedType === qt.id && styles.typeIconActive]}>
                  <Text style={styles.typeIconText}>{qt.icon}</Text>
                </View>
                <Text style={styles.typeLabel}>{qt.label}</Text>
                <View style={[styles.radioCircle, selectedType === qt.id && styles.radioCircleActive]}>
                  {selectedType === qt.id && <Text style={styles.radioCheck}>✓</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Difficulty */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Độ khó mong muốn của bạn là?</Text>
          <View style={styles.diffRow}>
            {DIFFICULTIES.map((d) => (
              <TouchableOpacity
                key={d.key}
                style={[styles.diffBtn, { backgroundColor: difficulty === d.key ? d.bg : Colors.primarySurface }]}
                onPress={() => setDifficulty(d.key)}
              >
                <Text style={[styles.diffBtnText, { color: difficulty === d.key ? d.color : Colors.textSecondary }]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Learning goal */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Mục tiêu học tập bạn muốn hướng tới?</Text>
          <TouchableOpacity style={styles.goalCard}>
            <Text style={styles.goalIcon}>🎯</Text>
            <View style={styles.goalText}>
              <Text style={styles.goalTitle}>Kiểm tra kiến thức cơ bản</Text>
              <Text style={styles.goalDesc}>Đánh giá mức độ hiểu bài của học sinh</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Upload materials */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Nếu bạn có tài liệu, hãy tải lên ở đây</Text>
          <TouchableOpacity style={styles.uploadCard}>
            <Text style={styles.uploadIcon}>📎</Text>
            <Text style={styles.uploadTitle}>Thêm tài liệu học tập</Text>
            <Text style={styles.uploadDesc}>PDF, DOCX, TXT (Tối đa 10MB)</Text>
          </TouchableOpacity>
        </View>

        {/* AI illustration */}
        <LinearGradient
          colors={['#1e0a3c', Colors.primary]}
          style={styles.aiIllustration}
        >
          <Text style={styles.aiIllustrationText}>🤖</Text>
        </LinearGradient>

        {/* Preview card */}
        <View style={styles.previewCard}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewIcon}>✨</Text>
            <Text style={styles.previewTitle}>Sẵn sàng tạo quiz</Text>
          </View>
          <Text style={styles.previewDesc}>
            Hãy kiểm tra lại thông tin và nhấn nút bên dưới để AI tạo quiz cho bạn!
          </Text>
          <TouchableOpacity style={styles.previewBtn}>
            <Text style={styles.previewBtnText}>Sẵn sàng tạo quiz</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => router.push(Routes.CREATE_LIST)}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.generateBtn}
          >
            <Text style={styles.generateBtnIcon}>✨</Text>
            <Text style={styles.generateBtnText}>Tạo bằng AI</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  saveText: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl },
  headerBlock: { gap: Spacing.sm },
  headerTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, lineHeight: 36 },
  headerDesc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  fieldBlock: { gap: Spacing.sm },
  fieldLabel: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  modeRow: { flexDirection: 'row', gap: Spacing.md },
  modeBtn: {
    flex: 1, paddingVertical: Spacing.md,
    borderRadius: Radius.pill, alignItems: 'center',
    backgroundColor: Colors.primarySurface,
  },
  modeBtnActive: { backgroundColor: Colors.primary },
  modeBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  modeBtnTextActive: { color: Colors.white },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    fontSize: 15, color: Colors.textPrimary,
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  gradeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  gradeBtn: {
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    borderRadius: Radius.pill, backgroundColor: Colors.primarySurface,
  },
  gradeBtnActive: { backgroundColor: Colors.primary },
  gradeBtnText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  gradeBtnTextActive: { color: Colors.white },
  countRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  countBtn: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  countBtnActive: { backgroundColor: Colors.primary },
  countBtnText: { fontSize: 24, color: Colors.primary, fontWeight: '700' },
  countBtnTextActive: { color: Colors.white },
  countDisplay: {
    flex: 1, backgroundColor: Colors.primarySurface,
    borderRadius: Radius.xl, paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  countValue: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  typeList: { gap: Spacing.md },
  typeCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  typeCardActive: { backgroundColor: Colors.primarySurface, borderColor: Colors.primary },
  typeIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  typeIconActive: { backgroundColor: Colors.primary },
  typeIconText: { fontSize: 18, color: Colors.primary },
  typeLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  radioCircle: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  radioCircleActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  radioCheck: { fontSize: 12, color: Colors.white, fontWeight: '700' },
  diffRow: { flexDirection: 'row', gap: Spacing.md },
  diffBtn: {
    flex: 1, paddingVertical: Spacing.md,
    borderRadius: Radius.pill, alignItems: 'center',
  },
  diffBtnText: { fontSize: 14, fontWeight: '600' },
  goalCard: {
    backgroundColor: Colors.primarySurface,
    borderWidth: 2, borderColor: Colors.primary,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
  },
  goalIcon: { fontSize: 24 },
  goalText: { flex: 1 },
  goalTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  goalDesc: { fontSize: 13, color: Colors.textSecondary },
  uploadCard: {
    backgroundColor: Colors.white,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    borderStyle: 'dashed',
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center', gap: Spacing.sm,
  },
  uploadIcon: { fontSize: 32 },
  uploadTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  uploadDesc: { fontSize: 13, color: Colors.textSecondary },
  aiIllustration: {
    borderRadius: Radius['2xl'],
    height: 160,
    alignItems: 'center', justifyContent: 'center',
  },
  aiIllustrationText: { fontSize: 72 },
  previewCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl, gap: Spacing.md,
  },
  previewHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  previewIcon: { fontSize: 24 },
  previewTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  previewDesc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  previewBtn: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl,
    alignSelf: 'flex-start',
  },
  previewBtnText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.border,
    padding: Spacing.xl,
  },
  generateBtn: {
    borderRadius: Radius.pill,
    paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
  },
  generateBtnIcon: { fontSize: 20 },
  generateBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },
});
