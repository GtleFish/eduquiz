// Converted from: TrangChuToi.tsx — Dark mode Home screen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { DarkColors as D } from '../../constants/darkColors';
import { Spacing, Radius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { ProgressBar } from '../../components/ui/ProgressBar';

const SUBJECTS = [
  { icon: 'Σ', name: 'Toán', progress: 0.65, color: D.primary, track: D.border },
  { icon: '⚡', name: 'Lý', progress: 0.32, color: D.yellow, track: D.border },
];

const QUIZZES = [
  { icon: '📄', title: 'Tiếng Anh Giao Tiếp', meta: '👥 1.2k học sinh  •  ⭐ 4.5', btnColor: D.primary },
  { icon: '🌌', title: 'Khám Phá Vũ Trụ', meta: '👥 860 học sinh  •  ⭐ 4.7', btnColor: D.yellow },
];

export default function DarkHomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}><Text style={styles.logoIcon}>📚</Text></View>
          <Text style={styles.logoText}>EduQuiz</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>7 ngày liên tiếp</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Featured challenge */}
        <LinearGradient colors={[D.primary, D.primaryLight]} style={styles.featuredCard}>
          <View style={styles.featuredBadge}><Text style={styles.featuredBadgeText}>Thử thách ngay</Text></View>
          <Text style={styles.featuredTitle}>Giải mã Siêu Trí Tuệ</Text>
          <Text style={styles.featuredDesc}>Hoàn thành 3 quiz Toán cao cấp để nhận mã Phương Hoàng!</Text>
          <View style={styles.featuredMeta}>
            <View style={styles.metaBadge}><Text style={styles.metaBadgeText}>⏱️  8s</Text></View>
            <View style={styles.metaBadge}><Text style={styles.metaBadgeText}>⭐  42</Text></View>
          </View>
          <TouchableOpacity style={styles.featuredBtn} onPress={() => router.push(Routes.QUIZ_LOBBY)}>
            <Text style={styles.featuredBtnText}>Tham gia ngay</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Continue studying */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tiếp tục ôn tập</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Xem tất cả</Text></TouchableOpacity>
          </View>
          <View style={styles.subjectGrid}>
            {SUBJECTS.map((s) => (
              <View key={s.name} style={styles.subjectCard}>
                <Text style={styles.subjectIcon}>{s.icon}</Text>
                <Text style={styles.subjectName}>{s.name}</Text>
                <ProgressBar progress={s.progress} color={s.color} trackColor={D.border} />
                <Text style={styles.subjectPct}>{Math.round(s.progress * 100)}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured quizzes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quiz nổi bật</Text>
            <TouchableOpacity><Text style={styles.seeAll}>☰</Text></TouchableOpacity>
          </View>
          {QUIZZES.map((q) => (
            <View key={q.title} style={styles.quizRow}>
              <View style={styles.quizIconWrapper}><Text style={styles.quizIcon}>{q.icon}</Text></View>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{q.title}</Text>
                <Text style={styles.quizMeta}>{q.meta}</Text>
              </View>
              <TouchableOpacity style={[styles.playBtn, { backgroundColor: q.btnColor }]} onPress={() => router.push(Routes.QUIZ_LOBBY)}>
                <Text style={styles.playBtnText}>▶</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Friends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bạn bè đang chơi</Text>
          <View style={styles.friendCard}>
            <View style={styles.friendAvatar} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>Duy Anh đang chơi</Text>
              <Text style={styles.friendSub}>Lịch sử Thế giới Hiện đại</Text>
            </View>
            <TouchableOpacity style={styles.challengeBtn}>
              <Text style={styles.challengeBtnText}>Thách đấu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: D.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  logoCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: D.primary, alignItems: 'center', justifyContent: 'center' },
  logoIcon: { fontSize: 20 },
  logoText: { fontSize: 18, fontWeight: '700', color: D.text },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  streakIcon: { fontSize: 18 },
  streakText: { fontSize: 14, fontWeight: '700', color: D.yellow },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  featuredCard: { borderRadius: 40, padding: Spacing['2xl'], gap: Spacing.md, overflow: 'hidden' },
  featuredBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs, alignSelf: 'flex-start' },
  featuredBadgeText: { fontSize: 11, fontWeight: '700', color: D.white, textTransform: 'uppercase', letterSpacing: 0.5 },
  featuredTitle: { fontSize: 28, fontWeight: '800', color: D.white },
  featuredDesc: { fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 22 },
  featuredMeta: { flexDirection: 'row', gap: Spacing.md },
  metaBadge: { backgroundColor: D.surface, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs },
  metaBadgeText: { fontSize: 13, fontWeight: '700', color: D.white },
  featuredBtn: { backgroundColor: D.yellow, borderRadius: Radius.pill, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base, alignSelf: 'flex-start' },
  featuredBtnText: { fontSize: 15, fontWeight: '700', color: D.yellowDark },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: D.text },
  seeAll: { fontSize: 14, fontWeight: '600', color: D.primary },
  subjectGrid: { flexDirection: 'row', gap: Spacing.md },
  subjectCard: { flex: 1, backgroundColor: D.surface, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.xs, borderWidth: 1, borderColor: D.border },
  subjectIcon: { fontSize: 32 },
  subjectName: { fontSize: 15, fontWeight: '700', color: D.text },
  subjectPct: { fontSize: 12, color: D.textMuted },
  quizRow: { backgroundColor: D.surface, borderRadius: Radius['2xl'], padding: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.base, borderWidth: 1, borderColor: D.border },
  quizIconWrapper: { width: 56, height: 56, backgroundColor: `${D.primary}33`, borderRadius: Radius['2xl'], alignItems: 'center', justifyContent: 'center' },
  quizIcon: { fontSize: 28 },
  quizInfo: { flex: 1 },
  quizTitle: { fontSize: 15, fontWeight: '700', color: D.text },
  quizMeta: { fontSize: 12, color: D.textMuted },
  playBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  playBtnText: { fontSize: 16, color: D.white },
  friendCard: { backgroundColor: D.surface, borderRadius: Radius['2xl'], padding: Spacing.xl, flexDirection: 'row', alignItems: 'center', gap: Spacing.base, borderWidth: 1, borderColor: D.border },
  friendAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: D.primary },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 15, fontWeight: '700', color: D.text },
  friendSub: { fontSize: 13, color: D.textMuted },
  challengeBtn: { backgroundColor: D.primary, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs },
  challengeBtnText: { fontSize: 13, fontWeight: '700', color: D.white },
});
