// Converted from: src/app/components/SoThichHocTap.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const GRADES = [
  { id: '10', label: 'Khối 10' },
  { id: '11', label: 'Khối 11' },
  { id: '12', label: 'Khối 12' },
  { id: 'uni', label: 'Đại Học' },
];

const SUBJECTS = [
  { id: 'math', icon: '∑', name: 'Toán' },
  { id: 'english', icon: '🌐', name: 'Tiếng Anh' },
  { id: 'physics', icon: '⚛️', name: 'Vật Lý' },
  { id: 'chemistry', icon: '🧪', name: 'Hóa Học' },
  { id: 'literature', icon: '📖', name: 'Ngữ Văn' },
  { id: 'biology', icon: '🧬', name: 'Sinh Học' },
  { id: 'history', icon: '📜', name: 'Lịch Sử' },
  { id: 'geography', icon: '🌍', name: 'Địa Lý' },
];

export default function LearningPreferencesScreen() {
  const router = useRouter();
  const [selectedGrade, setSelectedGrade] = useState('11');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['math', 'english']);

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <View style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </View>
          <Text style={styles.logo}>EduQuiz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/')}>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Cá nhân hóa</Text>
          <Text style={styles.titlePurple}>trải nghiệm.</Text>
          <Text style={styles.subtitle}>
            Chọn khối lớp và môn học bạn quan tâm để bắt đầu hành trình chinh phục kiến thức.
          </Text>
        </View>

        {/* Grade selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎓</Text>
            <Text style={styles.sectionTitle}>Khối lớp của bạn</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gradeRow}
          >
            {GRADES.map((g) => {
              const isActive = selectedGrade === g.id;
              return (
                <TouchableOpacity
                  key={g.id}
                  style={[styles.gradeCard, isActive && styles.gradeCardActive]}
                  onPress={() => setSelectedGrade(g.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.gradeNumber, isActive && styles.gradeNumberActive]}>
                    {g.id === 'uni' ? 'ĐH' : g.id}
                  </Text>
                  <Text style={[styles.gradeLabel, isActive && styles.gradeLabelActive]}>
                    {g.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Subject selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📚</Text>
            <Text style={styles.sectionTitle}>Môn học yêu thích</Text>
          </View>
          <View style={styles.subjectGrid}>
            {SUBJECTS.map((s) => {
              const isActive = selectedSubjects.includes(s.id);
              return (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.subjectCard, isActive && styles.subjectCardActive]}
                  onPress={() => toggleSubject(s.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.subjectIcon}>{s.icon}</Text>
                  <Text style={[styles.subjectName, isActive && styles.subjectNameActive]}>
                    {s.name}
                  </Text>
                  {isActive && (
                    <View style={styles.checkBadge}>
                      <Text style={styles.checkIcon}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Tip card */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Text style={styles.tipIconText}>💡</Text>
          </View>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Mẹo nhỏ</Text>
            <Text style={styles.tipDesc}>
              Việc chọn đúng khối lớp giúp EduQuiz đề xuất những bộ đề thi thử THPT Quốc gia sát với thực tế nhất.
            </Text>
          </View>
        </View>

        {/* Bottom padding for fixed button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed bottom action */}
      <View style={styles.bottomAction}>
        <PrimaryButton
          label="Tiếp tục  →"
          onPress={() => router.replace('/(tabs)/')}
        />
        <View style={styles.dots}>
          <View style={styles.dotInactive} />
          <View style={styles.dotActive} />
          <View style={styles.dotInactive} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 22, color: Colors.primary },
  logo: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  skipText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xl },
  titleBlock: { paddingTop: Spacing.base, gap: 2, marginBottom: Spacing.xl },
  titleBlack: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  titlePurple: { fontSize: 32, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.sm },
  subtitle: { fontSize: 15, color: Colors.textSecondary, lineHeight: 22 },
  section: { marginBottom: Spacing.xl, gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  sectionIcon: { fontSize: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  gradeRow: { gap: Spacing.md, paddingRight: Spacing.xl },
  gradeCard: {
    width: 110, height: 140, borderRadius: Radius['2xl'],
    backgroundColor: Colors.primarySurface,
    padding: Spacing.base,
    justifyContent: 'space-between',
  },
  gradeCardActive: {
    backgroundColor: Colors.primary,
    ...Shadow.md,
    transform: [{ scale: 1.05 }],
  },
  gradeNumber: {
    fontSize: 36, fontWeight: '800',
    color: Colors.textMuted, opacity: 0.4,
  },
  gradeNumberActive: { color: Colors.white, opacity: 1 },
  gradeLabel: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  gradeLabelActive: { color: Colors.white },
  subjectGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  subjectCard: {
    width: '47%', backgroundColor: '#efdbff',
    borderRadius: Radius['2xl'], padding: Spacing.xl,
    position: 'relative',
  },
  subjectCardActive: { backgroundColor: Colors.primary },
  subjectIcon: { fontSize: 28, marginBottom: Spacing.xl },
  subjectName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  subjectNameActive: { color: Colors.white },
  checkBadge: {
    position: 'absolute', top: Spacing.base, right: Spacing.base,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  checkIcon: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  tipCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'], padding: Spacing.xl,
    flexDirection: 'row', gap: Spacing.base,
    borderWidth: 1, borderColor: Colors.primaryMuted,
    marginTop: Spacing.sm,
  },
  tipIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  tipIconText: { fontSize: 20 },
  tipText: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  tipDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  bottomAction: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(253,243,255,0.95)',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.sm },
  dotActive: { width: 32, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryMuted },
});
