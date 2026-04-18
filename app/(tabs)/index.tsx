// Converted from: src/app/components/TrangChuMacDinh.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { Avatar, AvatarGroup } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Card } from '../../components/ui/Card';

const SUBJECTS = [
  { icon: '∑', name: 'Toán', progress: 0.66, color: Colors.primary, track: Colors.primaryMuted },
  { icon: '⚡', name: 'Lý', progress: 0.5, color: Colors.yellowAlt, track: '#fef9c3' },
  { icon: '🧪', name: 'Hóa', progress: 0.33, color: '#ef4444', track: '#fee2e2' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar size={48} initials="M" />
          <View>
            <Text style={styles.greeting}>Chào bạn!</Text>
            <Text style={styles.appName}>EduQuiz</Text>
          </View>
        </View>
        <View style={styles.streakBadge}>
          <Text>🔥</Text>
          <Text style={styles.streakText}>7 ngày liên tiếp</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily challenge card */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryGradientEnd]}
          style={styles.challengeCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.challengeTop}>
            <View>
              <View style={styles.challengeTagWrapper}>
                <Text style={styles.challengeTag}>Thử thách hàng ngày</Text>
              </View>
              <Text style={styles.challengeTitle}>
                Chinh phục đỉnh{'\n'}cao kiến thức
              </Text>
            </View>
            <View style={styles.countdownBadge}>
              <Text style={styles.countdownLabel}>Kết thúc sau</Text>
              <Text style={styles.countdownTime}>05:42:10</Text>
            </View>
          </View>

          <View style={styles.challengeBottom}>
            <AvatarGroup uris={[undefined, undefined]} size={32} extra={5} />
            <TouchableOpacity style={styles.playBtn} onPress={() => router.push(Routes.QUIZ_LOBBY)}>
              <Text style={styles.playBtnText}>Chơi ngay</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Continue studying */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tiếp tục ôn tập</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.subjectGrid}>
            {SUBJECTS.map((s) => (
              <Card key={s.name} style={styles.subjectCard} padding={Spacing.base}>
                <Text style={styles.subjectIcon}>{s.icon}</Text>
                <Text style={styles.subjectName}>{s.name}</Text>
                <ProgressBar progress={s.progress} color={s.color} trackColor={s.track} />
              </Card>
            ))}
          </View>
        </View>

        {/* Featured quizzes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz nổi bật</Text>
          <View style={styles.quizList}>
            <QuizRow
              title="Lịch sử lớp 12 - Chương 1"
              author="Trung Đình"
              meta="15 câu hỏi  •  Ôn thi THPT Quốc Gia"
              isNew
              onPress={() => {}}
            />
            <QuizRow
              title="English Vocabulary: Tech"
              author="20 câu hỏi  •  Business English"
              meta="👁 850 lượt xem"
              badge="Dễ"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Friends playing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bạn bè đang chơi</Text>
          <View style={styles.friendsList}>
            <FriendRow
              name="Ân đang chơi Tiếng Anh Giao Tiếp"
              sub="VUA HÁI BÓNG • NHÓM 2"
              canJoin
              onAction={() => router.push(Routes.LIVE_BATTLE_JOIN)}
            />
            <FriendRow
              name="Đức đang chơi Vật Lý 12"
              sub="HÌNH HỌC • DC-HDOOP"
              canJoin={false}
              onAction={() => router.push(Routes.QUIZ_LOBBY)}
            />
          </View>
        </View>

        {/* Quick links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tính năng khác</Text>
          <View style={styles.quickLinks}>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push(Routes.LIVE_BATTLE_SETUP)}
              activeOpacity={0.8}
            >
              <Text style={styles.quickLinkIcon}>⚔️</Text>
              <Text style={styles.quickLinkTitle}>Live Battle</Text>
              <Text style={styles.quickLinkDesc}>Tạo phòng đấu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push(Routes.LIVE_BATTLE_JOIN)}
              activeOpacity={0.8}
            >
              <Text style={styles.quickLinkIcon}>🚀</Text>
              <Text style={styles.quickLinkTitle}>Tham gia</Text>
              <Text style={styles.quickLinkDesc}>Nhập mã PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push(Routes.CLASSROOM)}
              activeOpacity={0.8}
            >
              <Text style={styles.quickLinkIcon}>🏫</Text>
              <Text style={styles.quickLinkTitle}>Lớp học</Text>
              <Text style={styles.quickLinkDesc}>Quản lý lớp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push(Routes.SEARCH)}
              activeOpacity={0.8}
            >
              <Text style={styles.quickLinkIcon}>🔍</Text>
              <Text style={styles.quickLinkTitle}>Tìm kiếm</Text>
              <Text style={styles.quickLinkDesc}>Khám phá quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function QuizRow({
  title, author, meta, isNew, badge, onPress,
}: {
  title: string; author: string; meta: string;
  isNew?: boolean; badge?: string; onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quizRow} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.quizThumb}>
        {isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>MỚI</Text>
          </View>
        )}
      </View>
      <View style={styles.quizInfo}>
        <View style={styles.quizTitleRow}>
          <Text style={styles.quizTitle} numberOfLines={1}>{title}</Text>
          {badge && (
            <View style={styles.diffBadge}>
              <Text style={styles.diffBadgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.quizAuthor}>{author}</Text>
        <Text style={styles.quizMeta}>{meta}</Text>
      </View>
      <Text style={styles.playIcon}>▶</Text>
    </TouchableOpacity>
  );
}

function FriendRow({
  name, sub, canJoin, onAction,
}: {
  name: string; sub: string; canJoin: boolean; onAction: () => void;
}) {
  return (
    <View style={styles.friendRow}>
      <Avatar size={48} initials="?" />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName} numberOfLines={1}>{name}</Text>
        <Text style={styles.friendSub}>{sub}</Text>
      </View>
      <TouchableOpacity
        style={canJoin ? styles.joinBtn : styles.viewBtn}
        onPress={onAction}
      >
        <Text style={canJoin ? styles.joinBtnText : styles.viewBtnText}>
          {canJoin ? 'THAM GIA' : 'Xem'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  greeting: { fontSize: 11, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  appName: { fontSize: 18, fontWeight: '700', color: Colors.primary },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.yellowBg,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  streakText: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 100, gap: Spacing.xl },
  challengeCard: {
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  challengeTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  challengeTagWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  challengeTag: { fontSize: 11, color: Colors.white, textTransform: 'uppercase', letterSpacing: 0.5 },
  challengeTitle: { fontSize: 22, fontWeight: '700', color: Colors.white, lineHeight: 30 },
  countdownBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  countdownLabel: { fontSize: 10, color: Colors.yellowDark, textTransform: 'uppercase' },
  countdownTime: { fontSize: 16, fontWeight: '700', color: Colors.yellowDark },
  challengeBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  playBtn: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  playBtnText: { fontWeight: '700', color: Colors.textPrimary, fontSize: 14 },
  section: { gap: Spacing.base },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  seeAll: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  subjectGrid: { flexDirection: 'row', gap: Spacing.md },
  subjectCard: { flex: 1, alignItems: 'center', gap: Spacing.xs },
  subjectIcon: { fontSize: 32, marginBottom: Spacing.xs },
  subjectName: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  quizList: { gap: Spacing.md },
  quizRow: {
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    ...Shadow.sm,
  },
  quizThumb: {
    width: 72,
    height: 72,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primaryMuted,
  },
  newBadge: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  newBadgeText: { fontSize: 9, fontWeight: '700', color: Colors.textPrimary },
  quizInfo: { flex: 1, gap: 3 },
  quizTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  quizTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  diffBadge: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  diffBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.primary },
  quizAuthor: { fontSize: 13, color: Colors.textSecondary },
  quizMeta: { fontSize: 12, color: Colors.textMuted },
  playIcon: { fontSize: 18, color: Colors.primary },
  friendsList: { gap: Spacing.md },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  friendSub: { fontSize: 12, color: Colors.textSecondary },
  joinBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  joinBtnText: { color: Colors.white, fontWeight: '700', fontSize: 12 },
  viewBtn: {},
  viewBtnText: { color: Colors.primary, fontWeight: '700', fontSize: 14 },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickLinkCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.xs,
    ...Shadow.sm,
  },
  quickLinkIcon: { fontSize: 28, marginBottom: Spacing.xs },
  quickLinkTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  quickLinkDesc: { fontSize: 12, color: Colors.textSecondary },
});
