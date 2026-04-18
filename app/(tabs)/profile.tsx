// Converted from: src/app/components/TrangCaNhan.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { TabPills } from '../../components/ui/TabPills';
import { Card } from '../../components/ui/Card';

const TABS = [
  { key: 'activity', label: 'Hoạt động' },
  { key: 'created', label: 'Đã tạo' },
  { key: 'collection', label: 'Bộ sưu tập' },
];

const RECENT = [
  { icon: '🎓', title: 'Vật lý hạt nhân cơ bản', score: '950 điểm', time: '2 giờ trước', grade: 'A+', gradeColor: Colors.yellowAlt },
  { icon: '🌐', title: 'Tiếng Anh Giao tiếp #12', score: '820 điểm', time: 'Hôm qua', grade: 'Hoàn thành', gradeColor: Colors.primarySurface },
  { icon: '📚', title: 'Lịch sử Việt Nam hiện đại', score: '1000 điểm', time: '2 ngày trước', grade: 'Hạng #1', gradeColor: Colors.yellowAlt },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('activity');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push(Routes.PROFILE_SETTINGS)}>
          <Text style={styles.settingsText}>Cài đặt</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile hero */}
        <View style={styles.profileHero}>
          <View style={styles.avatarWrapper}>
            <Avatar size={112} initials="MA" style={styles.avatar} />
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>🏆 Cấp 25</Text>
            </View>
          </View>

          <Text style={styles.name}>Minh Anh</Text>
          <Text style={styles.title}>Học giả ưu tú</Text>

          {/* XP bar */}
          <View style={styles.xpWrapper}>
            <ProgressBar progress={0.75} height={8} />
            <Text style={styles.xpText}>750/1000 XP</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Quizzes chơi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Đã tạo</Text>
          </View>
          <View style={[styles.statItem, styles.statHighlight]}>
            <Text style={[styles.statValue, styles.statValueHighlight]}>12</Text>
            <Text style={[styles.statLabel, styles.statLabelHighlight]}>Ngày liên tiếp</Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          {[
            { icon: '📊', label: 'Tiến trình', route: Routes.PROFILE_PROGRESS },
            { icon: '🔥', label: 'Streak', route: Routes.PROFILE_STREAK },
            { icon: '📈', label: 'Phân tích', route: Routes.PROFILE_ANALYSIS },
            { icon: '📅', label: 'Báo cáo', route: Routes.PROFILE_REPORT },
            { icon: '🏅', label: 'Xếp hạng', route: Routes.PROFILE_RATING },
            { icon: '📚', label: 'Bộ sưu tập', route: Routes.PROFILE_COLLECTION },
            { icon: '🕐', label: 'Lịch sử', route: Routes.PROFILE_HISTORY },
            { icon: '🔔', label: 'Thông báo', route: Routes.PROFILE_NOTIFICATIONS },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.quickActionItem}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.75}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>{item.icon}</Text>
              </View>
              <Text style={styles.quickActionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tabs */}
        <TabPills tabs={TABS} activeKey={activeTab} onSelect={setActiveTab} />

        {/* Recent activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gần đây</Text>
          {RECENT.map((item) => (
            <Card key={item.title} style={styles.activityCard} padding={Spacing.base}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>{item.icon}</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.activityScore}>{item.score}</Text>
              </View>
              <View style={styles.activityRight}>
                <Text style={styles.activityTime}>{item.time}</Text>
                <View style={[styles.gradeBadge, { backgroundColor: item.gradeColor }]}>
                  <Text style={styles.gradeText}>{item.grade}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  backIcon: { fontSize: 22, color: Colors.primary },
  settingsText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 100, gap: Spacing.xl },
  profileHero: { alignItems: 'center', gap: Spacing.sm },
  avatarWrapper: { alignItems: 'center', marginBottom: Spacing.sm },
  avatar: { borderWidth: 4, borderColor: Colors.primary },
  levelBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginTop: -Spacing.base,
  },
  levelText: { fontSize: 12, fontWeight: '700', color: Colors.yellowDark },
  name: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  title: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  xpWrapper: { width: 180, gap: Spacing.xs },
  xpText: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statItem: { flex: 1, alignItems: 'center', gap: Spacing.xs },
  statHighlight: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
  },
  statValue: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  statValueHighlight: { color: Colors.yellowDark },
  statLabel: { fontSize: 11, color: Colors.textSecondary, textTransform: 'uppercase' },
  statLabelHighlight: { color: Colors.yellowDark, fontWeight: '700' },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  quickActionItem: {
    width: '22%',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionEmoji: { fontSize: 24 },
  quickActionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: { gap: Spacing.md },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  activityCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIconText: { fontSize: 22 },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  activityScore: { fontSize: 13, color: Colors.textSecondary },
  activityRight: { alignItems: 'flex-end', gap: Spacing.xs },
  activityTime: { fontSize: 11, color: Colors.textMuted },
  gradeBadge: {
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  gradeText: { fontSize: 10, fontWeight: '700', color: Colors.textPrimary, textTransform: 'uppercase' },
});
