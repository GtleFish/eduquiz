// Converted from: src/app/components/BaoMatTaiKhoan.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';

export default function SecurityScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.headerTitle}>Cài đặt</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Security status card */}
        <LinearGradient colors={[Colors.primary, '#5b2ac5']} style={styles.statusCard}>
          <Text style={styles.statusLabel}>Bảo mật & Quyền riêng tư</Text>
          <Text style={styles.statusTitle}>Tài khoản của bạn{'\n'}là ưu tiên hàng đầu.</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusIcon}>🛡️</Text>
            <Text style={styles.statusText}>Trạng thái: An toàn</Text>
          </View>
          <Text style={styles.bgIcon}>🛡️</Text>
        </LinearGradient>

        {/* Password & Login */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mật khẩu & đăng nhập</Text>
          <View style={styles.sectionItems}>
            {/* Change password */}
            <View style={styles.itemCard}>
              <View style={styles.itemTop}>
                <View style={styles.itemIcon}><Text style={styles.itemIconText}>🔑</Text></View>
                <View style={styles.itemText}>
                  <Text style={styles.itemTitle}>Đổi mật khẩu</Text>
                  <Text style={styles.itemDesc}>Cập nhật mật khẩu để bảo vệ tài khoản</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => router.push(Routes.RESET_PASSWORD)}
              >
                <Text style={styles.actionBtnText}>Cập nhật ngay</Text>
              </TouchableOpacity>
            </View>

            {/* 2FA */}
            <View style={[styles.itemCard, { backgroundColor: Colors.primarySurface }]}>
              <View style={styles.itemTop}>
                <View style={[styles.itemIcon, { backgroundColor: Colors.white }]}>
                  <Text style={styles.itemIconText}>📱</Text>
                </View>
                <View style={styles.itemText}>
                  <Text style={styles.itemTitle}>Xác thực 2 yếu tố</Text>
                  <Text style={styles.itemDesc}>Yêu cầu mã xác nhận khi đăng nhập từ thiết bị lạ</Text>
                </View>
                <View style={styles.toggleOn}>
                  <View style={styles.toggleThumbRight} />
                </View>
              </View>
              <TouchableOpacity style={styles.smsRow}>
                <Text style={styles.smsText}>📧  Đã kích hoạt qua SMS</Text>
              </TouchableOpacity>
            </View>

            {/* Login history */}
            <View style={styles.itemCard}>
              <View style={styles.itemTop}>
                <View style={styles.itemIcon}><Text style={styles.itemIconText}>🕐</Text></View>
                <View style={styles.itemText}>
                  <Text style={styles.itemTitle}>Lịch sử đăng nhập</Text>
                  <Text style={styles.itemDesc}>Kiểm tra các phiên đăng nhập gần đây</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.linkText}>Xem chi tiết →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Linked accounts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Liên kết tài khoản</Text>
          <View style={styles.sectionItems}>
            <View style={styles.linkedRow}>
              <View style={styles.linkedLeft}>
                <View style={[styles.linkedIcon, { borderWidth: 2, borderColor: Colors.borderMid }]}>
                  <Text style={styles.linkedIconText}>G</Text>
                </View>
                <View>
                  <Text style={styles.linkedName}>Google</Text>
                  <Text style={styles.linkedEmail}>nguyen@gmail.com</Text>
                </View>
              </View>
              <View style={styles.connectedBadge}>
                <Text style={styles.connectedText}>ĐÃ KẾT</Text>
              </View>
            </View>

            <View style={styles.linkedRow}>
              <View style={styles.linkedLeft}>
                <View style={[styles.linkedIcon, { backgroundColor: '#1877F2' }]}>
                  <Text style={[styles.linkedIconText, { color: Colors.white }]}>f</Text>
                </View>
                <View>
                  <Text style={styles.linkedName}>Facebook</Text>
                  <Text style={styles.linkedEmail}>Chưa kết nối</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.linkText}>LIÊN KẾT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Help */}
        <View style={styles.helpCard}>
          <Text style={styles.helpText}>Có thắc mắc về bảo mật?</Text>
          <TouchableOpacity style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Trung tâm trợ giúp  ↗</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  statusCard: {
    borderRadius: Radius['2xl'], padding: Spacing['2xl'],
    gap: Spacing.sm, overflow: 'hidden',
  },
  statusLabel: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 0.8 },
  statusTitle: { fontSize: 28, fontWeight: '800', color: Colors.white, lineHeight: 36 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  statusIcon: { fontSize: 18 },
  statusText: { fontSize: 14, fontWeight: '700', color: Colors.white },
  bgIcon: { position: 'absolute', top: Spacing.base, right: Spacing.base, fontSize: 64, opacity: 0.2 },
  section: { gap: Spacing.sm },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  sectionItems: { gap: Spacing.md },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  itemTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  itemIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  itemIconText: { fontSize: 24 },
  itemText: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  itemDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  toggleOn: {
    width: 48, height: 28, borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center', paddingHorizontal: 2,
  },
  toggleThumbRight: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: Colors.white, alignSelf: 'flex-end',
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  actionBtnText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  smsRow: { marginTop: -Spacing.sm },
  smsText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  linkText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  linkedRow: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    ...Shadow.sm,
  },
  linkedLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  linkedIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  linkedIconText: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  linkedName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  linkedEmail: { fontSize: 13, color: Colors.textSecondary },
  connectedBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.sm, paddingVertical: Spacing.xs,
  },
  connectedText: { fontSize: 11, fontWeight: '700', color: Colors.yellowDark },
  helpCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl, gap: Spacing.sm,
  },
  helpText: { fontSize: 14, color: Colors.textSecondary },
  helpLink: {},
  helpLinkText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
});
