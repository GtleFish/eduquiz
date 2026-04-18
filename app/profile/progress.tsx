// Converted from: src/app/components/TongQuanTienTrinh.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

const HEATMAP_DATA = Array.from({ length: 35 }, (_, i) => {
  const v = (i * 7 + 3) % 10;
  return v > 7 ? 3 : v > 4 ? 2 : v > 2 ? 1 : 0;
});

const HEATMAP_COLORS = ['#f3f4f6', Colors.primarySurface, Colors.primaryMuted, Colors.primary];

const BAR_HEIGHTS = [40, 65, 45, 80, 60, 90, 75];
const BAR_LABELS = ['T2 KN 1', 'T2 KN 2', 'T2 KN 3', 'HÔM NAY'];

export default function ProgressScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader title="Tiến trình" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Stats cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tổng số quiz</Text>
            <Text style={styles.statValue}>124</Text>
            <TouchableOpacity>
              <Text style={styles.statLink}>→ Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Độ chính xác</Text>
            <Text style={styles.statValue}>85%</Text>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeText}>⭐ Xuất sắc</Text>
            </View>
          </View>
        </View>

        {/* Activity heatmap */}
        <View style={styles.heatmapCard}>
          <Text style={styles.cardTitle}>Hoạt động học tập 📅</Text>
          <View style={styles.heatmapGrid}>
            {HEATMAP_DATA.map((level, i) => (
              <View
                key={i}
                style={[styles.heatmapCell, { backgroundColor: HEATMAP_COLORS[level] }]}
              />
            ))}
          </View>
          <View style={styles.heatmapLegend}>
            <Text style={styles.heatmapLegendLabel}>THỨ HAI</Text>
            <View style={styles.heatmapLegendDots}>
              {HEATMAP_COLORS.map((c, i) => (
                <View key={i} style={[styles.heatmapLegendDot, { backgroundColor: c }]} />
              ))}
            </View>
            <Text style={styles.heatmapLegendLabel}>CHỦ NHẬT</Text>
          </View>
        </View>

        {/* Trend chart */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Xu hướng chính xác</Text>
          <View style={styles.barChart}>
            {BAR_HEIGHTS.map((h, i) => (
              <View key={i} style={styles.barWrapper}>
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryLight]}
                  style={[styles.bar, { height: `${h}%` as any }]}
                />
              </View>
            ))}
          </View>
          <View style={styles.barLabels}>
            {BAR_LABELS.map((l) => (
              <Text key={l} style={styles.barLabel}>{l}</Text>
            ))}
          </View>
        </View>

        {/* Radar placeholder */}
        <View style={styles.radarCard}>
          <Text style={styles.cardTitle}>Năng lực theo môn</Text>
          <View style={styles.radarPlaceholder}>
            <Text style={styles.radarEmoji}>📊</Text>
            <View style={styles.radarLabels}>
              {['TOÁN', 'LÝ', 'HÓA', 'ANH', 'VĂN'].map((l) => (
                <Text key={l} style={styles.radarLabel}>{l}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* CTA */}
        <LinearGradient colors={[Colors.primary, Colors.primaryLight]} style={styles.ctaCard}>
          <View style={styles.ctaContent}>
            <View style={styles.ctaText}>
              <Text style={styles.ctaTitle}>Sẵn sàng chinh phục đỉnh cao?</Text>
              <Text style={styles.ctaDesc}>Nhận kế hoạch học tập từ Trợ lý AI để phát triển kỹ năng yếu của bạn!</Text>
              <TouchableOpacity
                style={styles.ctaBtn}
                onPress={() => router.push(Routes.CREATE_AI)}
              >
                <Text style={styles.ctaBtnText}>Bắt đầu ngay</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.ctaEmoji}>🎓</Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: {
    flex: 1, backgroundColor: Colors.white,
    borderRadius: Radius['2xl'], padding: Spacing.xl,
    alignItems: 'center', gap: Spacing.sm,
    ...Shadow.md,
  },
  statLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase' },
  statValue: { fontSize: 36, fontWeight: '800', color: Colors.primary },
  statLink: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  statBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.yellowDark },
  heatmapCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md,
    ...Shadow.md,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  heatmapGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  heatmapCell: { width: '12%', aspectRatio: 1, borderRadius: 4 },
  heatmapLegend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heatmapLegendLabel: { fontSize: 11, color: Colors.textMuted },
  heatmapLegendDots: { flexDirection: 'row', gap: 4 },
  heatmapLegendDot: { width: 12, height: 12, borderRadius: 2 },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md,
    ...Shadow.md,
  },
  barChart: { height: 140, flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm },
  barWrapper: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  bar: { borderRadius: 6 },
  barLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  barLabel: { fontSize: 10, color: Colors.textMuted },
  radarCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'], padding: Spacing['2xl'],
    alignItems: 'center', gap: Spacing.xl,
  },
  radarPlaceholder: { alignItems: 'center', gap: Spacing.md },
  radarEmoji: { fontSize: 80 },
  radarLabels: { flexDirection: 'row', gap: Spacing.md },
  radarLabel: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  ctaCard: { borderRadius: Radius['2xl'], padding: Spacing['2xl'] },
  ctaContent: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.base },
  ctaText: { flex: 1, gap: Spacing.sm },
  ctaTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  ctaDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  ctaBtn: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm,
    alignSelf: 'flex-start', marginTop: Spacing.sm,
  },
  ctaBtnText: { fontSize: 14, fontWeight: '700', color: Colors.yellowDark },
  ctaEmoji: { fontSize: 48 },
});
