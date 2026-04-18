// Converted from: TrangCaNhanToi.tsx — Dark mode Profile
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { DarkColors as D } from '../../constants/darkColors';
import { Spacing, Radius } from '../../constants/spacing';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { TabPills } from '../../components/ui/TabPills';

const ACTIVITIES = [
  { icon: '📜', iconGradient: ['#fbbf24', '#f97316'] as [string,string], title: 'Lịch sử Thế giới 101', sub: 'Hoàn thành với 85% chính xác', xp: '+450 XP', time: '2 giờ trước' },
  { icon: '🧠', iconGradient: ['#a855f7', '#3b82f6'] as [string,string], title: 'Thử thách Logic To...', sub: 'Hạng 3 trên bảng xếp hạng', xp: '+220 XP', time: 'Hôm qua' },
  { icon: '🎖️', iconGradient: ['#f97316', '#ef4444'] as [string,string], title: 'Huy hiệu mới: Siê...', sub: 'Đạt 10 quiz chiến thắng liên tiếp', xp: '+1,000 XP', time: '1 ngày trước' },
];

export default function DarkProfileScreen() {
  const router = useRouter();
  const [tab, setTab] = useState('activity');

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}><Text style={styles.logoIcon}>📚</Text></View>
          <Text style={styles.logoText}>EduQuiz</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile/settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarRing}>
              <View style={styles.avatarInner}><Text style={styles.avatarEmoji}>👨‍💼</Text></View>
            </View>
            <View style={styles.levelBadge}><Text style={styles.levelText}>LEVEL 24</Text></View>
          </View>
          <Text style={styles.name}>Nguyễn Thành Trung</Text>
          <Text style={styles.title}>Người khai phá kiến thức</Text>

          {/* XP bar */}
          <View style={styles.xpBlock}>
            <View style={styles.xpHeader}>
              <Text style={styles.xpLabel}>XP Progress</Text>
              <Text style={styles.xpValue}>1,240 / 2,000</Text>
            </View>
            <ProgressBar progress={0.62} color={D.primary} trackColor={D.border} height={12} />
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>124</Text>
              <Text style={styles.statLabel}>Đã chơi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: D.yellow }]}>15</Text>
              <Text style={styles.statLabel}>Đã tạo</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#ffb688' }]}>12</Text>
              <Text style={styles.statLabel}>Nhiệm vụ</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsWrapper}>
            <TabPills
              tabs={[
                { key: 'activity', label: 'Hoạt động' },
                { key: 'created', label: 'Đã tạo' },
                { key: 'collection', label: 'Bộ sưu tập' },
              ]}
              activeKey={tab}
              onSelect={setTab}
            />
          </View>
        </View>

        {/* Recent activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gần đây</Text>
          {ACTIVITIES.map((a) => (
            <View key={a.title} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>{a.icon}</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{a.title}</Text>
                <Text style={styles.activitySub}>{a.sub}</Text>
              </View>
              <View style={styles.activityRight}>
                <Text style={styles.activityXp}>{a.xp}</Text>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
            </View>
          ))}
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
  settingsIcon: { fontSize: 22 },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  profileSection: { alignItems: 'center', gap: Spacing.md },
  avatarWrapper: { alignItems: 'center' },
  avatarRing: { width: 112, height: 112, borderRadius: 56, padding: 3, backgroundColor: D.primary },
  avatarInner: { flex: 1, borderRadius: 53, backgroundColor: D.surface, alignItems: 'center', justifyContent: 'center' },
  avatarEmoji: { fontSize: 48 },
  levelBadge: { backgroundColor: D.yellow, borderRadius: Radius.pill, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, marginTop: -Spacing.sm },
  levelText: { fontSize: 11, fontWeight: '700', color: D.yellowDark, textTransform: 'uppercase' },
  name: { fontSize: 22, fontWeight: '800', color: D.text },
  title: { fontSize: 14, color: D.textMuted },
  xpBlock: { width: '100%', gap: Spacing.xs },
  xpHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  xpLabel: { fontSize: 11, fontWeight: '700', color: D.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  xpValue: { fontSize: 13, fontWeight: '700', color: D.text },
  statsRow: { flexDirection: 'row', gap: Spacing['2xl'] },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '800', color: D.text },
  statLabel: { fontSize: 11, color: D.textMuted, textTransform: 'uppercase' },
  tabsWrapper: { width: '100%' },
  section: { gap: Spacing.md },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: D.text },
  activityCard: { backgroundColor: D.surface, borderRadius: Radius['2xl'], padding: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.base, borderWidth: 1, borderColor: D.border },
  activityIcon: { width: 56, height: 56, borderRadius: Radius.xl, backgroundColor: `${D.primary}33`, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  activityIconText: { fontSize: 28 },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: '700', color: D.text },
  activitySub: { fontSize: 12, color: D.textMuted },
  activityRight: { alignItems: 'flex-end' },
  activityXp: { fontSize: 15, fontWeight: '700', color: D.yellow },
  activityTime: { fontSize: 11, color: D.textMuted },
});
