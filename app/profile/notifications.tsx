// Converted from: CaiDatThongBao.tsx + ThongBao.tsx (merged with tabs)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { TabPills } from '../../components/ui/TabPills';

// ─── Notification Settings ────────────────────────────────────────────────────
const NOTIF_SETTINGS = [
  {
    section: 'Hoạt động học tập',
    items: [
      { icon: '🎯', title: 'Thử thách mới', desc: 'Nhận tin khi có Quiz mới phù hợp với sở thích', on: true },
      { icon: '💡', title: 'Thống kê & Huy hiệu', desc: 'Thông báo khi bạn thăng hạng hoặc nhận quà', on: true },
      { icon: '📆', title: 'Báo cáo hằng tuần', desc: 'Tổng kết học tập 7 ngày qua', on: true },
    ],
  },
  {
    section: 'Lớp học & cộng đồng',
    items: [
      { icon: '👥', title: 'Cập nhật lớp học', desc: 'Thông báo từ giáo viên và bài tập mới', on: true },
    ],
  },
  {
    section: 'Khác',
    items: [
      { icon: '🎁', title: 'Khuyến mãi & Tin tức', desc: 'Ưu đãi gói Premium và tính năng mới', on: false },
    ],
  },
];

// ─── Notification List ────────────────────────────────────────────────────────
const NOTIFS_TODAY = [
  { icon: '🏆', iconBg: Colors.yellowAlt, title: 'Chúc mừng! Bạn đã đạt danh hiệu "Thợ Săn Kiến Thức"', desc: 'Bạn đã hoàn thành 10 bộ câu hỏi trong tuần này với tỉ lệ chính xác trên 90%.', time: '2 giờ trước', unread: true },
  { icon: '⚔️', iconBg: '#ff928e', title: 'Lời thách đấu mới từ Minh Anh', desc: 'Minh Anh đã thách đấu bạn trong chủ đề "Lịch sử Thế giới hiện đại".', time: '5 giờ trước', unread: true },
  { icon: '📚', iconBg: Colors.primaryMuted, title: 'Bài tập mới: Toán Giải Tích 12', desc: 'Giáo viên Nguyễn Văn A vừa giao bài kiểm tra chương 3. Hạn chót: Thứ 6 tới.', time: '8 giờ trước', unread: false },
];

const NOTIFS_EARLIER = [
  { icon: '⚙️', iconBg: Colors.primaryMuted, title: 'Bảo trì hệ thống định kỳ', desc: 'EduQuiz sẽ tạm ngưng hoạt động từ 01:00 đến 03:00 sáng mai để nâng cấp tính năng mới.', time: 'Hôm qua', unread: false },
  { icon: '🔥', iconBg: Colors.primaryMuted, title: 'Cột mốc mới: 30 ngày học liên tiếp', desc: 'Bạn thật tuyệt vời! Hãy duy trì phong độ này để nhận thêm nhiều phần quà nhé.', time: '2 ngày trước', unread: false },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('list');
  const [settings, setSettings] = useState(
    NOTIF_SETTINGS.flatMap((s) => s.items).reduce((acc, item) => ({ ...acc, [item.title]: item.on }), {} as Record<string, boolean>)
  );

  const toggleSetting = (title: string) => {
    setSettings((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.headerTitle}>Cài đặt</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabWrapper}>
        <TabPills
          tabs={[{ key: 'list', label: 'Thông báo' }, { key: 'settings', label: 'Cài đặt' }]}
          activeKey={activeTab}
          onSelect={setActiveTab}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {activeTab === 'list' ? (
          <>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Thông báo</Text>
              <Text style={styles.subtitle}>Cập nhật những hoạt động mới nhất của bạn</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Hôm nay</Text>
              {NOTIFS_TODAY.map((n) => (
                <View key={n.title} style={[styles.notifCard, n.unread && styles.notifCardUnread]}>
                  <View style={[styles.notifIcon, { backgroundColor: n.iconBg }]}>
                    <Text style={styles.notifIconText}>{n.icon}</Text>
                  </View>
                  <View style={styles.notifContent}>
                    <View style={styles.notifTitleRow}>
                      <Text style={styles.notifTitle} numberOfLines={2}>{n.title}</Text>
                      {n.unread && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.notifDesc}>{n.desc}</Text>
                    <Text style={styles.notifTime}>{n.time}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Trước đó</Text>
              {NOTIFS_EARLIER.map((n) => (
                <View key={n.title} style={[styles.notifCard, styles.notifCardRead]}>
                  <View style={[styles.notifIcon, { backgroundColor: n.iconBg }]}>
                    <Text style={styles.notifIconText}>{n.icon}</Text>
                  </View>
                  <View style={styles.notifContent}>
                    <Text style={styles.notifTitle} numberOfLines={2}>{n.title}</Text>
                    <Text style={styles.notifDesc}>{n.desc}</Text>
                    <Text style={styles.notifTime}>{n.time}</Text>
                  </View>
                </View>
              ))}

              {/* Leaderboard card */}
              <LinearGradient colors={[Colors.primary, '#5b2ac5']} style={styles.leaderCard}>
                <Text style={styles.leaderTitle}>Bạn đang dẫn đầu!</Text>
                <Text style={styles.leaderDesc}>Thứ hạng của bạn trong bảng xếp hạng tháng đã tăng lên Top 5. Tiếp tục bứt phá nào!</Text>
                <TouchableOpacity style={styles.leaderBtn} onPress={() => router.push(Routes.LEADERBOARD)}>
                  <Text style={styles.leaderBtnText}>Xem bảng xếp hạng</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </>
        ) : (
          <>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Thông báo</Text>
              <Text style={styles.subtitle}>Tùy chỉnh cách bạn nhận cập nhật từ EduQuiz để tối ưu hóa việc học tập.</Text>
            </View>

            {NOTIF_SETTINGS.map((group) => (
              <View key={group.section} style={styles.section}>
                <Text style={styles.sectionLabel}>{group.section}</Text>
                {group.items.map((item) => (
                  <View key={item.title} style={styles.toggleCard}>
                    <View style={styles.toggleIcon}>
                      <Text style={styles.toggleIconText}>{item.icon}</Text>
                    </View>
                    <View style={styles.toggleText}>
                      <Text style={styles.toggleTitle}>{item.title}</Text>
                      <Text style={styles.toggleDesc}>{item.desc}</Text>
                    </View>
                    <Switch
                      value={settings[item.title] ?? item.on}
                      onValueChange={() => toggleSetting(item.title)}
                      trackColor={{ false: Colors.primaryMuted, true: Colors.primary }}
                      thumbColor={Colors.white}
                    />
                  </View>
                ))}
              </View>
            ))}

            {/* Focus Mode */}
            <LinearGradient colors={[Colors.primary, '#5b2ac5']} style={styles.focusCard}>
              <Text style={styles.focusTitle}>Tắt hết phiền nhiễu?</Text>
              <Text style={styles.focusDesc}>Bạn có thể sử dụng Chế độ Tập trung để tắt mọi thông báo trong khi học</Text>
              <TouchableOpacity style={styles.focusBtn}>
                <Text style={styles.focusBtnText}>Bật Focus Mode</Text>
              </TouchableOpacity>
            </LinearGradient>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  tabWrapper: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.sm },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: Spacing.xs },
  title: { fontSize: 32, fontWeight: '800', color: Colors.primary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  section: { gap: Spacing.md },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#836e99', textTransform: 'uppercase', letterSpacing: 0.8 },
  notifCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    flexDirection: 'row', gap: Spacing.base,
    ...Shadow.sm,
  },
  notifCardUnread: { borderLeftWidth: 4, borderLeftColor: Colors.primary },
  notifCardRead: { backgroundColor: Colors.cardBg, opacity: 0.85 },
  notifIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  notifIconText: { fontSize: 24 },
  notifContent: { flex: 1, gap: 3 },
  notifTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  notifTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary, marginTop: 4, flexShrink: 0 },
  notifDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  notifTime: { fontSize: 11, fontWeight: '700', color: '#836e99', textTransform: 'uppercase' },
  leaderCard: { borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.sm },
  leaderTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  leaderDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  leaderBtn: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    alignSelf: 'flex-start', marginTop: Spacing.sm,
  },
  leaderBtnText: { fontSize: 12, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  toggleCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
    ...Shadow.sm,
  },
  toggleIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  toggleIconText: { fontSize: 24 },
  toggleText: { flex: 1 },
  toggleTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  toggleDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  focusCard: { borderRadius: Radius['2xl'], padding: Spacing['2xl'], gap: Spacing.sm },
  focusTitle: { fontSize: 22, fontWeight: '700', color: Colors.white },
  focusDesc: { fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 22 },
  focusBtn: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    alignSelf: 'flex-start', marginTop: Spacing.sm,
  },
  focusBtnText: { fontSize: 14, fontWeight: '700', color: Colors.yellowDark },
});
