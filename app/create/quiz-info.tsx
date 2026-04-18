// Converted from: src/app/components/ThongTinQuiz.tsx
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

type Difficulty = 'easy' | 'medium' | 'hard';
type Privacy = 'public' | 'private' | 'class';

const DIFFICULTIES: { key: Difficulty; label: string; bg: string; color: string }[] = [
  { key: 'easy', label: 'Dễ', bg: '#dcfce7', color: '#16a34a' },
  { key: 'medium', label: 'TB', bg: Colors.primary, color: Colors.white },
  { key: 'hard', label: 'Khó', bg: Colors.primarySurface, color: Colors.textSecondary },
];

const PRIVACY_OPTIONS: { key: Privacy; icon: string; label: string; desc: string }[] = [
  { key: 'public', icon: '🌐', label: 'Công khai', desc: 'Mọi người đều có thể tìm và làm bài' },
  { key: 'private', icon: '🔒', label: 'Riêng tư', desc: 'Chỉ người có mã PIN mới truy cập được' },
  { key: 'class', icon: '👑', label: 'Lớp học', desc: 'Chỉ dành cho học sinh trong lớp của bạn' },
];

export default function QuizInfoScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [privacy, setPrivacy] = useState<Privacy>('public');

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
          <Text style={styles.headerLabel}>Cấu hình nội dung</Text>
          <Text style={styles.headerTitle}>Thông tin Quiz</Text>
        </View>

        {/* Cover image */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Ảnh bìa</Text>
          <TouchableOpacity style={styles.coverPlaceholder}>
            <View style={styles.coverIcon}>
              <Text style={styles.coverIconText}>☁️</Text>
            </View>
            <Text style={styles.coverTitle}>Nhấn để tải ảnh hoặc kéo thả</Text>
            <Text style={styles.coverDesc}>Kích thước gợi ý: 1200x630 (PNG, JPG)</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Tiêu đề quiz</Text>
          <TextInput
            style={styles.textInput}
            placeholder="VD: Kiểm tra cuối học kỳ I - Toán 12"
            placeholderTextColor={Colors.textMuted}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Mô tả</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Chia sẻ thêm về nội dung bài học của bạn..."
            placeholderTextColor={Colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Subject */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Môn học</Text>
          <TouchableOpacity style={styles.selectBtn}>
            <Text style={styles.selectBtnText}>Chọn môn học</Text>
            <Text style={styles.selectArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Grade */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Khối lớp</Text>
          <TouchableOpacity style={styles.selectBtn}>
            <Text style={styles.selectBtnText}>Chọn khối</Text>
            <Text style={styles.selectArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Difficulty */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Độ khó</Text>
          <View style={styles.diffRow}>
            {DIFFICULTIES.map((d) => (
              <TouchableOpacity
                key={d.key}
                style={[
                  styles.diffBtn,
                  { backgroundColor: difficulty === d.key ? d.bg : Colors.primarySurface },
                  difficulty === d.key && d.key === 'medium' && styles.diffBtnShadow,
                ]}
                onPress={() => setDifficulty(d.key)}
              >
                <Text style={[
                  styles.diffBtnText,
                  { color: difficulty === d.key ? d.color : Colors.textSecondary },
                ]}>
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Chế độ hiển thị</Text>
          <View style={styles.privacyList}>
            {PRIVACY_OPTIONS.map((p) => (
              <TouchableOpacity
                key={p.key}
                style={[
                  styles.privacyCard,
                  privacy === p.key && styles.privacyCardActive,
                ]}
                onPress={() => setPrivacy(p.key)}
                activeOpacity={0.8}
              >
                <View style={[styles.privacyIcon, privacy === p.key && styles.privacyIconActive]}>
                  <Text style={styles.privacyIconText}>{p.icon}</Text>
                </View>
                <View style={styles.privacyText}>
                  <Text style={styles.privacyLabel}>{p.label}</Text>
                  <Text style={styles.privacyDesc}>{p.desc}</Text>
                </View>
                <View style={[styles.radioCircle, privacy === p.key && styles.radioCircleActive]}>
                  {privacy === p.key && <Text style={styles.radioCheck}>✓</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          label="Xuất bản Quiz  🚀"
          onPress={() => router.push(Routes.CREATE_PUBLISH)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  saveText: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 100 },
  headerBlock: { gap: Spacing.xs },
  headerLabel: { fontSize: 11, fontWeight: '700', color: '#67537c', textTransform: 'uppercase', letterSpacing: 0.8 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  fieldBlock: { gap: Spacing.sm },
  fieldLabel: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  coverPlaceholder: {
    backgroundColor: Colors.primarySurface,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    borderStyle: 'dashed',
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center', gap: Spacing.sm,
  },
  coverIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  coverIconText: { fontSize: 32 },
  coverTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  coverDesc: { fontSize: 12, color: Colors.textSecondary },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    fontSize: 15, color: Colors.textPrimary,
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  selectBtn: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  selectBtnText: { fontSize: 15, color: Colors.textPrimary },
  selectArrow: { fontSize: 14, color: Colors.primary },
  diffRow: { flexDirection: 'row', gap: Spacing.md },
  diffBtn: {
    flex: 1, paddingVertical: Spacing.md,
    borderRadius: Radius.pill, alignItems: 'center',
  },
  diffBtnShadow: { ...Shadow.sm },
  diffBtnText: { fontSize: 14, fontWeight: '600' },
  privacyList: { gap: Spacing.md },
  privacyCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  privacyCardActive: { backgroundColor: Colors.primarySurface, borderColor: Colors.primary },
  privacyIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  privacyIconActive: { backgroundColor: Colors.primary },
  privacyIconText: { fontSize: 20 },
  privacyText: { flex: 1 },
  privacyLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  privacyDesc: { fontSize: 12, color: Colors.textSecondary },
  radioCircle: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
  },
  radioCircleActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  radioCheck: { fontSize: 12, color: Colors.white, fontWeight: '700' },
  bottomBar: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1, borderTopColor: Colors.border,
    padding: Spacing.xl,
  },
});
