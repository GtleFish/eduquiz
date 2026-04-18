// Converted from: src/app/components/ChonLoaiCauHoi.tsx
// Bottom sheet modal for selecting question type
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';

const QUESTION_TYPES = [
  { icon: '☰', label: 'Trắc nghiệm', bg: Colors.primaryMuted, route: '/create/question-editor' },
  { icon: '✓✕', label: 'Đúng/Sai', bg: Colors.yellowAlt, route: '/create/question-editor' },
  { icon: '__', label: 'Điền chỗ trống', bg: '#fca5a5', route: '/create/question-editor' },
  { icon: '⇄', label: 'Ghép đôi', bg: Colors.primary, route: '/create/question-editor' },
  { icon: '≡', label: 'Sắp xếp', bg: Colors.primaryMuted, route: '/create/question-editor' },
  { icon: '☑', label: 'Chọn nhiều', bg: Colors.yellowAlt, route: '/create/question-editor' },
  { icon: '🖼', label: 'Câu hỏi ảnh', bg: '#f87171', route: '/create/question-editor' },
  { icon: '🎵', label: 'Câu hỏi âm thanh', bg: Colors.primaryLight, route: '/create/question-editor' },
];

export default function QuestionTypeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Dimmed background */}
      <TouchableOpacity style={styles.backdrop} onPress={() => router.back()} />

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        {/* Drag handle */}
        <View style={styles.handle} />

        <Text style={styles.sheetTitle}>Loại câu hỏi</Text>
        <Text style={styles.sheetSubtitle}>
          Chọn định dạng phù hợp nhất cho bài kiểm tra
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {QUESTION_TYPES.map((qt) => (
              <TouchableOpacity
                key={qt.label}
                style={styles.typeCard}
                onPress={() => router.push(qt.route as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.typeIcon, { backgroundColor: qt.bg }]}>
                  <Text style={styles.typeIconText}>{qt.icon}</Text>
                </View>
                <Text style={styles.typeLabel}>{qt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,7,40,0.4)',
  },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40, borderTopRightRadius: 40,
    padding: Spacing.xl,
    paddingBottom: 40,
    maxHeight: '80%',
    ...Shadow.xl,
  },
  handle: {
    width: 48, height: 6, borderRadius: 3,
    backgroundColor: Colors.primaryMuted,
    alignSelf: 'center', marginBottom: Spacing.xl,
  },
  sheetTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, marginBottom: Spacing.xs },
  sheetSubtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: Spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  typeCard: {
    width: '47%',
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    alignItems: 'center', gap: Spacing.md,
  },
  typeIcon: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.sm,
  },
  typeIconText: { fontSize: 28, color: Colors.white, fontWeight: '700' },
  typeLabel: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
});
