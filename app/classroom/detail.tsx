// Converted from: ChiTietLopHoc.tsx + ChiTietHocSinh.tsx + GiaoBaiTapQuiz.tsx + KetQuaBaiTap.tsx + TrangChuGiaoVien.tsx
// Merged into a single detail screen with tabs
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { TabPills } from '../../components/ui/TabPills';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const STUDENTS = [
  { name: 'Nguyen Minh Duan', progress: 0.92, quiz: '10/10', status: 'TOP 5', statusColor: Colors.yellowAlt, statusTextColor: Colors.yellowDark },
  { name: 'Trần Thùy Linh', progress: 0.76, quiz: '7/10', status: 'AVG', statusColor: Colors.primarySurface, statusTextColor: Colors.primary },
  { name: 'Pham Hoàng Anh', progress: 0.68, quiz: '4/10', status: 'ALERT', statusColor: '#fee2e2', statusTextColor: '#dc2626' },
  { name: 'Lê Kim Ngân', progress: 0.84, quiz: '9/10', status: 'UPWARD', statusColor: '#dcfce7', statusTextColor: '#16a34a' },
];

const RESULTS = [
  { name: 'Nguyen Minh Duân', grade: 'A+', score: 100, color: '#a855f7' },
  { name: 'Lê Văn Việt', grade: 'B+', score: 85, color: '#c084fc' },
  { name: 'Trần Thúy', grade: 'A', score: 92, color: '#fbbf24' },
  { name: 'Quách Đan Minh', grade: 'C+', score: 78, color: '#ef4444' },
  { name: 'Pham Son Hoàng', grade: 'A+', score: 100, color: '#22c55e' },
];

export default function ClassDetailScreen() {
  const router = useRouter();
  const [tab, setTab] = useState('students');

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.headerTitle}>Class 12A1</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity><Text style={styles.notifIcon}>🔔</Text></TouchableOpacity>
          <View style={styles.headerAvatar} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Performance card */}
        <LinearGradient colors={[Colors.primary, '#5b2ac5']} style={styles.perfCard}>
          <Text style={styles.perfLabel}>Current Performance</Text>
          <View style={styles.perfScoreRow}>
            <Text style={styles.perfScore}>7.8</Text>
            <Text style={styles.perfScoreMax}>/10</Text>
          </View>
          <Text style={styles.perfSubtitle}>Class Average Score • Term 2</Text>
          <View style={styles.perfStats}>
            <View style={styles.perfStatCard}>
              <Text style={styles.perfStatLabel}>VS Last Term</Text>
              <Text style={[styles.perfStatValue, { color: '#4ade80' }]}>+0.4</Text>
            </View>
            <View style={styles.perfStatCard}>
              <Text style={styles.perfStatLabel}>Attendance</Text>
              <Text style={styles.perfStatValue}>98%</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => router.push(Routes.CLASSROOM_ASSIGN_QUIZ)}>
            <Text style={styles.actionBtnPrimaryText}>📚  Danh sách học sinh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtnSecondary}>
            <Text style={styles.actionBtnSecondaryText}>📊  Báo cáo</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <TabPills
          tabs={[
            { key: 'students', label: 'Học sinh' },
            { key: 'results', label: 'Kết quả' },
          ]}
          activeKey={tab}
          onSelect={setTab}
        />

        {tab === 'students' ? (
          <View style={styles.list}>
            {STUDENTS.map((s) => (
              <TouchableOpacity key={s.name} style={styles.studentCard} onPress={() => router.back()}>
                <View style={styles.studentTop}>
                  <View style={styles.studentAvatar} />
                  <View style={styles.studentInfo}>
                    <Text style={styles.studentName}>{s.name}</Text>
                    <Text style={styles.studentId}>ID #CS2401</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: s.statusColor }]}>
                    <Text style={[styles.statusBadgeText, { color: s.statusTextColor }]}>{s.status}</Text>
                  </View>
                </View>
                <View style={styles.studentProgress}>
                  <Text style={styles.progressLabel}>Term Progress</Text>
                  <Text style={styles.progressValue}>{(s.progress * 10).toFixed(1)}</Text>
                </View>
                <ProgressBar progress={s.progress} />
                <View style={styles.quizRow}>
                  <Text style={styles.quizLabel}>📋  Recent Quiz</Text>
                  <Text style={styles.quizScore}>{s.quiz}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addStudentBtn}>
              <Text style={styles.addStudentText}>+  Add Student</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.list}>
            <View style={styles.resultSummary}>
              <View style={styles.resultSummaryCard}>
                <Text style={styles.resultSummaryValue}>32/40</Text>
                <Text style={styles.resultSummaryLabel}>Đã nộp</Text>
              </View>
              <View style={[styles.resultSummaryCard, { backgroundColor: Colors.primarySurface }]}>
                <Text style={[styles.resultSummaryValue, { color: Colors.primary }]}>80%</Text>
                <Text style={styles.resultSummaryLabel}>Trung bình</Text>
              </View>
            </View>
            <View style={styles.warningCard}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <View>
                <Text style={styles.warningTitle}>Most Struggling</Text>
                <Text style={styles.warningDesc}>12 students scored under 70%</Text>
              </View>
            </View>
            {RESULTS.map((r) => (
              <View key={r.name} style={styles.resultRow}>
                <View style={[styles.resultAvatar, { backgroundColor: r.color }]}>
                  <Text style={styles.resultAvatarText}>{r.name[0]}</Text>
                </View>
                <Text style={styles.resultName} numberOfLines={1}>{r.name}</Text>
                <View style={[styles.gradeBadge, { backgroundColor: r.grade.startsWith('A') ? '#4ade80' : r.grade.startsWith('B') ? '#60a5fa' : Colors.yellowAlt }]}>
                  <Text style={styles.gradeBadgeText}>{r.grade}</Text>
                </View>
                <View style={styles.resultScoreBlock}>
                  <Text style={styles.resultScore}>{r.score}</Text>
                  <Text style={styles.resultScoreMax}>100</Text>
                </View>
              </View>
            ))}
            <PrimaryButton label="📊  Export to Excel (.xlsx)" onPress={() => {}} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  backIcon: { fontSize: 22, color: Colors.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  notifIcon: { fontSize: 22 },
  headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  perfCard: { borderRadius: Radius['2xl'], padding: Spacing['2xl'], gap: Spacing.sm },
  perfLabel: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 0.8 },
  perfScoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.xs },
  perfScore: { fontSize: 56, fontWeight: '800', color: Colors.white, lineHeight: 64 },
  perfScoreMax: { fontSize: 20, fontWeight: '700', color: 'rgba(255,255,255,0.9)', paddingBottom: Spacing.sm },
  perfSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  perfStats: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.sm },
  perfStatCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: Radius.xl, padding: Spacing.base, alignItems: 'center' },
  perfStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' },
  perfStatValue: { fontSize: 22, fontWeight: '800', color: Colors.white },
  actionsRow: { flexDirection: 'row', gap: Spacing.md },
  actionBtnPrimary: { flex: 1, backgroundColor: Colors.primary, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  actionBtnPrimaryText: { color: Colors.white, fontWeight: '700', fontSize: 13 },
  actionBtnSecondary: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center', borderWidth: 2, borderColor: Colors.primaryMuted },
  actionBtnSecondaryText: { color: Colors.primary, fontWeight: '700', fontSize: 13 },
  list: { gap: Spacing.md },
  studentCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md, ...Shadow.sm },
  studentTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  studentAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.primaryMuted, flexShrink: 0 },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  studentId: { fontSize: 12, color: Colors.textMuted },
  statusBadge: { borderRadius: Radius.pill, paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs },
  statusBadgeText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  studentProgress: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase' },
  progressValue: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  quizRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  quizLabel: { fontSize: 13, color: Colors.textSecondary },
  quizScore: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  addStudentBtn: { backgroundColor: Colors.white, borderWidth: 2, borderColor: Colors.primaryMuted, borderStyle: 'dashed', borderRadius: Radius.pill, paddingVertical: Spacing.base, alignItems: 'center' },
  addStudentText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  resultSummary: { flexDirection: 'row', gap: Spacing.md },
  resultSummaryCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.xl, alignItems: 'center', gap: Spacing.xs, ...Shadow.sm },
  resultSummaryValue: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  resultSummaryLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase' },
  warningCard: { backgroundColor: Colors.yellowAlt, borderRadius: Radius['2xl'], padding: Spacing.xl, flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  warningIcon: { fontSize: 28 },
  warningTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, textTransform: 'uppercase' },
  warningDesc: { fontSize: 13, color: Colors.textSecondary },
  resultRow: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.md, ...Shadow.sm },
  resultAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  resultAvatarText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  resultName: { flex: 1, fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  gradeBadge: { borderRadius: Radius.pill, paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs },
  gradeBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  resultScoreBlock: { alignItems: 'flex-end' },
  resultScore: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  resultScoreMax: { fontSize: 11, color: Colors.textMuted },
});
