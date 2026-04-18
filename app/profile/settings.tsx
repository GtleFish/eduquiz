// Converted from: src/app/components/CaiDat.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';

const SECTIONS = [
  {
    title: 'Cá nhân',
    items: [
      { icon: '👤', label: 'Tài khoản', route: '/profile/edit' },
      { icon: '🔔', label: 'Thông báo', route: '/profile/notifications' },
    ],
  },
  {
    title: 'Tùy chỉnh',
    items: [
      { icon: '🎨', label: 'Giao diện', value: 'Sáng', route: null },
      { icon: '🌐', label: 'Ngôn ngữ', value: 'Tiếng Việt', route: null },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      { icon: '🔒', label: 'Bảo mật', route: '/profile/security' },
      { icon: 'ℹ️', label: 'Về ứng dụng', value: 'v2.4.0', route: null },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Đăng xuất?', 'Bạn có chắc muốn đăng xuất không?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: () => router.replace(Routes.LOGIN) },
    ]);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>✏️</Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Nguyễn Văn A</Text>
            <Text style={styles.profileSub}>Học sinh xuất sắc • 12,450 XP</Text>
          </View>
        </View>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionItems}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.settingRow}
                  onPress={() => item.route && router.push(item.route as any)}
                  activeOpacity={item.route ? 0.7 : 1}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.settingIcon}>
                      <Text style={styles.settingIconText}>{item.icon}</Text>
                    </View>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.settingRight}>
                    {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                    <Text style={styles.settingArrow}>→</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>⬅️  Đăng xuất</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>EduQuiz © 2024 • Made with passion for learning</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
  },
  backIcon: { fontSize: 22, color: Colors.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  profileCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
  },
  profileAvatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.textPrimary,
    position: 'relative',
  },
  editBadge: {
    position: 'absolute', bottom: -4, right: -4,
    backgroundColor: Colors.yellowAlt,
    borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2,
  },
  editBadgeText: { fontSize: 12 },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  profileSub: { fontSize: 13, color: Colors.textSecondary },
  section: { gap: Spacing.sm },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  sectionItems: { gap: Spacing.sm },
  settingRow: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  settingIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  settingIconText: { fontSize: 20 },
  settingLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  settingValue: { fontSize: 14, color: Colors.textSecondary },
  settingArrow: { fontSize: 16, color: Colors.textMuted },
  logoutBtn: {
    backgroundColor: Colors.white,
    borderWidth: 2, borderColor: '#ff928e',
    borderRadius: Radius.pill,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#ff928e' },
  footer: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', paddingVertical: Spacing.base },
});
