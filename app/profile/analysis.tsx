// Converted from: src/app/components/PhanTichMonHoc.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

const SUBJECTS = [
  { icon: '🟢', name: 'Toán học', accuracy: 90, days: 18, color: '#22c55e', track: '#dcfce7' },
  { icon: '🟡', name: 'Tiếng Anh', accuracy: 65, days: 7, color: '#eab308', track: '#fef9c3' },
  { icon: '🔴', name: 'Vật lý', accuracy: 40, days: 3, color: '#ef4444', track: '#fee2e2' },
];

const STRONG_TOPICS = ['Bội số chung tính', 'Ngữ pháp cơ bản', 'Cơ học cổ điển'];

const WEAK_TOPICS = [
  { topic: 'Mệnh đề từ học', accuracy: 35 },
  { topic: 'Thì quá khứ hoàn thành', accuracy: 42 },
  { topic: 'Đạo hàm cùng dấu', accuracy: 38 },
];

export default function AnalysisScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader title="Phân tích môn học" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Progress card */}
        <LinearGradient colors={[Colors.primary, Colors.primaryGradientEnd]} style={styles.progressCard}>
          <Text style={styles.progressLabel}>Phân tích môn học</Text>
          <Text style={styles.progressTitle}>Bạn đang tiến{'\n'}bộ vượt bậc!</Text>

          {/* Circular progress ring */}
          <View style={styles.ringWrapper}>
            <View style={styles.ringOuter}>
              <View style={styles.ringInner}>
                <Text style={styles.ringValue}>75%</Text>
              </View>
            </View>
          </View>

          <Text style={styles.progressDesc}>
            Độ chính xác trung bình trong 30 ngày qua đạt 75% trên các môn chính.
          </Text>
        </LinearGradient>

        {/* Subject breakdown */}
        <View style={styles.subjectCard}>
          <View style={styles.subjectHeader}>
            <Text style={styles.subjectTitle}>Độ chính xác các môn</Text>
            <TouchableOpacity>
              <Text style={styles.subjectLink}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>

          {SUBJECTS.map((s) => (
            <View key={s.name} style={styles.subjectRow}>
              <View style={styles.subjectLeft}>
                <View style={[styles.subjectIcon, { backgroundColor: s.track }]}>
                  <Text style={styles.subjectIconText}>{s.icon}</Text>
                </View>
                <View style={styles.subjectInfo}>
                  <View style={styles.subjectNameRow}>
                    <Text style={styles.subjectName}>{s.name}</Text>
                    <Text style={[styles.subjectAccuracy, { color: s.color }]}>{s.accuracy}%</Text>
                  </View>
                  <Text style={styles.subjectDays}>Hoạt động {s.days} ngày qua</Text>
                </View>
              </View>
              <ProgressBar progress={s.accuracy / 100} color={s.color} trackColor={s.track} height={8} />
            </View>
          ))}
        </View>

        {/* Strong topics */}
        <View style={styles.topicsSection}>
          <Text style={styles.topicsTitle}>⏰  Chủ đề mạnh</Text>
          {STRONG_TOPICS.map((topic) => (
            <View key={topic} style={styles.strongRow}>
              <Text style={styles.strongTopic}>{topic}</Text>
              <Text style={styles.strongCheck}>✓</Text>
            </View>
          ))}
        </View>

        {/* Weak topics */}
        <View style={styles.topicsSection}>
          <Text style={styles.topicsTitle}>⏰  Chủ đề yếu</Text>
          {WEAK_TOPICS.map((item) => (
            <View key={item.topic} style={styles.weakRow}>
              <View style={styles.weakInfo}>
                <Text style={styles.weakTopic}>{item.topic}</Text>
                <Text style={styles.weakAccuracy}>Chỉ đạt {item.accuracy}% độ chính xác</Text>
              </View>
              <TouchableOpacity style={styles.practiceBtn}>
                <Text style={styles.practiceBtnText}>Luyện tập</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Cần cải thiện ngữ pháp?</Text>
          <Text style={styles.ctaDesc}>Hãy bắt đầu với kế hoạch ôn tập cá nhân hóa từ AI!</Text>
          <PrimaryButton label="Bắt đầu học ngay" onPress={() => router.push(Routes.CREATE_AI)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  progressCard: { borderRadius: Radius['2xl'], padding: Spacing['2xl'], gap: Spacing.md, alignItems: 'center' },
  progressLabel: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 0.8, alignSelf: 'flex-start' },
  progressTitle: { fontSize: 28, fontWeight: '800', color: Colors.white, lineHeight: 36, alignSelf: 'flex-start' },
  ringWrapper: { marginVertical: Spacing.base },
  ringOuter: {
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 10, borderColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  ringInner: { alignItems: 'center' },
  ringValue: { fontSize: 36, fontWeight: '800', color: Colors.white },
  progressDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 20 },
  subjectCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl, gap: Spacing.xl,
    ...Shadow.md,
  },
  subjectHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  subjectTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  subjectLink: { fontSize: 13, color: Colors.textSecondary },
  subjectRow: { gap: Spacing.sm },
  subjectLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  subjectIcon: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  subjectIconText: { fontSize: 20 },
  subjectInfo: { flex: 1 },
  subjectNameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  subjectName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  subjectAccuracy: { fontSize: 22, fontWeight: '700' },
  subjectDays: { fontSize: 12, color: Colors.textMuted },
  topicsSection: { gap: Spacing.md },
  topicsTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  strongRow: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    ...Shadow.sm,
  },
  strongTopic: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  strongCheck: { fontSize: 18, color: '#22c55e', fontWeight: '700' },
  weakRow: {
    backgroundColor: '#fef2f2',
    borderRadius: Radius.xl,
    padding: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderLeftWidth: 4, borderLeftColor: '#ef4444',
  },
  weakInfo: { flex: 1 },
  weakTopic: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  weakAccuracy: { fontSize: 12, color: Colors.textSecondary },
  practiceBtn: {
    backgroundColor: '#dc2626',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
  },
  practiceBtnText: { fontSize: 11, fontWeight: '700', color: Colors.white, textTransform: 'uppercase' },
  ctaCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl, gap: Spacing.md, alignItems: 'center',
  },
  ctaTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  ctaDesc: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
});
