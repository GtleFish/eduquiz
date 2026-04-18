// Converted from: MatKetNoi.tsx — Reusable offline/error component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from './PrimaryButton';

interface Props {
  onRetry: () => void;
  onOffline?: () => void;
}

export function OfflineScreen({ onRetry, onOffline }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconCard}>
          <Text style={styles.iconEmoji}>📡</Text>
          <View style={styles.warningBadge}><Text style={styles.warningText}>⚠</Text></View>
          <View style={styles.oopsBadge}><Text style={styles.oopsBadgeText}>Oops!</Text></View>
          <View style={styles.noSignalBadge}><Text style={styles.noSignalText}>No Signal</Text></View>
        </View>

        <Text style={styles.title}>Mất kết nối mạng rồi!</Text>
        <Text style={styles.desc}>
          Có vẻ như đường truyền đang đi lạc. Kiểm tra lại wifi hoặc dữ liệu di động nhé!
        </Text>

        <View style={styles.actions}>
          <PrimaryButton label="Thử lại" onPress={onRetry} />
          {onOffline && (
            <TouchableOpacity onPress={onOffline}>
              <Text style={styles.offlineText}>Chế độ Offline</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Tips */}
        {[
          { icon: '📶', title: 'Check Wifi', desc: 'Đảm bảo bạn đang ở gần cục phát wifi để có sóng mạnh nhất.' },
          { icon: '📱', title: 'Data Check', desc: 'Kiểm tra xem gói cước di động của bạn còn dung lượng không nha.' },
          { icon: '✈️', title: 'Airplane Mode', desc: 'Thử bật/tắt chế độ máy bay để "reset" lại kết nối nhanh chóng.' },
        ].map((tip) => (
          <View key={tip.title} style={styles.tipCard}>
            <Text style={styles.tipIcon}>{tip.icon}</Text>
            <View style={styles.tipText}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDesc}>{tip.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.xl },
  iconCard: {
    backgroundColor: Colors.white, borderRadius: 40,
    padding: Spacing['3xl'], position: 'relative',
    ...Shadow.xl,
  },
  iconEmoji: { fontSize: 80, color: Colors.primary },
  warningBadge: {
    position: 'absolute', bottom: -8, right: -8,
    width: 36, height: 36, borderRadius: 8,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  warningText: { fontSize: 14, transform: [{ rotate: '-45deg' }] },
  oopsBadge: {
    position: 'absolute', top: -24, left: -12,
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    transform: [{ rotate: '-12deg' }],
    ...Shadow.md,
  },
  oopsBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  noSignalBadge: {
    position: 'absolute', bottom: -16, right: -32,
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    transform: [{ rotate: '6deg' }],
    ...Shadow.md,
  },
  noSignalText: { fontSize: 12, fontWeight: '700', color: Colors.white, textTransform: 'uppercase' },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  desc: { fontSize: 15, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  actions: { gap: Spacing.md, width: '100%', alignItems: 'center' },
  offlineText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  tipCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row', gap: Spacing.base,
    width: '100%',
  },
  tipIcon: { fontSize: 24 },
  tipText: { flex: 1 },
  tipTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  tipDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
});
