// Converted from: LopHocCuaToi.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

const CLASSES = [
  { code: '12A1', subject: 'Toán học', title: 'Giải tích 12 - Ôn thi THPT', students: 38, lastActive: '2 hours ago', colors: ['#fbbf24', '#f97316'] as [string,string] },
  { code: '11C5', subject: 'Tiếng Anh', title: 'IELTS Intensive Reading', students: 45, lastActive: 'Yesterday', colors: ['#ec4899', '#ef4444'] as [string,string] },
];

export default function ClassroomListScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Teacher Portal"
        onBack={() => router.back()}
        rightElement={<TouchableOpacity><Text style={{ fontSize: 22 }}>🔔</Text></TouchableOpacity>}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Manage Your </Text>
          <Text style={styles.titlePurple}>Learning Circles.</Text>
          <Text style={styles.subtitle}>You have <Text style={styles.subtitleBold}>6 active</Text> classes today. Keep the momentum going!</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statBadge}><Text style={styles.statBadgeText}>10B3</Text></View>
            <Text style={styles.statSubject}>Vật lý</Text>
            <Text style={styles.statTitle}>Cơ học lượng tử đại cương</Text>
            <View style={styles.avatarStack}>
              {[0,1,2].map(i => <View key={i} style={styles.miniAvatar} />)}
              <Text style={styles.moreStudents}>+39</Text>
            </View>
            <TouchableOpacity><Text style={styles.arrowLink}>→</Text></TouchableOpacity>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors.primarySurface, alignItems: 'center', justifyContent: 'center' }]}>
            <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>Live Now</Text></View>
            <Text style={styles.liveCount}>42</Text>
          </View>
        </View>

        {/* Class cards */}
        {CLASSES.map((cls) => (
          <TouchableOpacity
            key={cls.code}
            onPress={() => router.push(Routes.CLASSROOM_DETAIL)}
            activeOpacity={0.85}
          >
            <LinearGradient colors={cls.colors} style={styles.classCard}>
              <View style={styles.classCodeBadge}>
                <Text style={styles.classCodeText}>{cls.code}</Text>
              </View>
              <Text style={styles.classSubject}>{cls.subject}</Text>
              <Text style={styles.classTitle}>{cls.title}</Text>
              <View style={styles.classFooter}>
                <Text style={styles.classLastActive}>Last active: {cls.lastActive}</Text>
                <Text style={styles.classStudentCount}>{cls.students}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Achievement card */}
        <View style={styles.achievementCard}>
          <View style={styles.achievementBadge}><Text style={styles.achievementBadgeText}>🏆 Most active this week</Text></View>
          <Text style={styles.achievementTitle}>9A - Lớp chuyên Lý</Text>
          <Text style={styles.achievementDesc}>Students from class completed 12 quizzes this week with a 94% average score.</Text>
          <View style={styles.achievementStats}>
            <View>
              <Text style={styles.achievementStatLabel}>Class rate</Text>
              <Text style={styles.achievementStatValue}>94.2%</Text>
            </View>
            <View>
              <Text style={styles.achievementStatLabel}>Active tasks</Text>
              <Text style={styles.achievementStatValue}>05</Text>
            </View>
          </View>
        </View>

        {/* Progress ring */}
        <View style={styles.progressCard}>
          <View style={styles.progressRing}>
            <Text style={styles.progressValue}>88%</Text>
          </View>
          <Text style={styles.progressTitle}>Current Week Progress</Text>
          <Text style={styles.progressDesc}>Great work! Keep it up!</Text>
        </View>

        <PrimaryButton label="+ Tạo lớp học mới" onPress={() => router.push(Routes.CLASSROOM_CREATE)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: 2 },
  titleBlack: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  titlePurple: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: Spacing.xs },
  subtitleBold: { fontWeight: '700', color: Colors.textPrimary },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, gap: Spacing.xs, ...Shadow.sm },
  statBadge: { backgroundColor: Colors.primary, borderRadius: Radius.lg, width: 48, height: 48, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xs },
  statBadgeText: { color: Colors.white, fontWeight: '700', fontSize: 12 },
  statSubject: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase' },
  statTitle: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  avatarStack: { flexDirection: 'row', alignItems: 'center', gap: -4 },
  miniAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.textMuted, borderWidth: 2, borderColor: Colors.white },
  moreStudents: { fontSize: 12, color: Colors.textSecondary, marginLeft: Spacing.sm },
  arrowLink: { fontSize: 18, color: Colors.primary, fontWeight: '700' },
  liveBadge: { backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, marginBottom: Spacing.sm },
  liveBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  liveCount: { fontSize: 48, fontWeight: '800', color: Colors.primary },
  classCard: { borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.sm, overflow: 'hidden' },
  classCodeBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.lg, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  classCodeText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  classSubject: { fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  classTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  classFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  classLastActive: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  classStudentCount: { fontSize: 28, fontWeight: '800', color: Colors.white },
  achievementCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md, borderWidth: 2, borderColor: Colors.yellowAlt, ...Shadow.sm },
  achievementBadge: { backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, alignSelf: 'flex-start' },
  achievementBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  achievementTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  achievementDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  achievementStats: { flexDirection: 'row', gap: Spacing['2xl'] },
  achievementStatLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase' },
  achievementStatValue: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  progressCard: { backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], padding: Spacing['2xl'], alignItems: 'center', gap: Spacing.sm },
  progressRing: { width: 120, height: 120, borderRadius: 60, borderWidth: 10, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  progressValue: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  progressTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  progressDesc: { fontSize: 13, color: Colors.textSecondary },
});
