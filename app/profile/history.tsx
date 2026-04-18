// Converted from: src/app/components/LichSuLamBai.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { TabPills } from '../../components/ui/TabPills';
import { AppHeader } from '../../components/ui/AppHeader';

const SCORE_CONFIG: Record<string, { bg: string; color: string; label: string }> = {
  perfect: { bg: Colors.yellowBg, color: Colors.yellowDark, label: 'HOÀN HẢO' },
  good:    { bg: Colors.primarySurface, color: Colors.primary, label: 'KHÁ TỐT' },
  poor:    { bg: '#fee2e2', color: '#dc2626', label: 'CÓ ĐÁNG THÊM' },
  great:   { bg: '#dcfce7', color: '#16a34a', label: 'XUẤT SẮC' },
};

const HISTORY = {
  today: [
    { icon: 'Σ', subject: 'Toán 12 - Giải tích', date: '14/10/2023', time: '18:30', score: '10/10', type: 'perfect' },
    { icon: '📖', subject: 'Ngữ văn - Chí Phèo', date: '14/10/2023', time: '45:00', score: '7/10', type: 'good' },
  ],
  yesterday: [
    { icon: '⚗️', subject: 'Vật lí - Sóng cơ học', date: '13/10/2023', time: '12:45', score: '4/10', type: 'poor' },
    { icon: '🌏', subject: 'Địa lí - Vùng kinh tế', date: '13/10/2023', time: '28:30', score: '9/10', type: 'great' },
  ],
};

export default function HistoryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  return (
    <View style={styles.screen}>
      <AppHeader title="Lịch sử làm bài" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Hành trình</Text>
          <Text style={styles.titlePurple}>chinh phục kiến thức.</Text>
          <Text style={styles.subtitle}>Theo dõi sự tiến bộ của bạn qua từng bài kiểm tra.</Text>
        </View>

        {/* Filter tabs */}
        <TabPills
          tabs={[
            { key: 'all', label: 'Tất cả' },
            { key: 'month', label: 'Tháng này' },
            { key: 'week', label: 'Tuần này' },
          ]}
          activeKey={filter}
          onSelect={setFilter}
        />

        {/* Today */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Hôm nay</Text>
          {HISTORY.today.map((item) => {
            const cfg = SCORE_CONFIG[item.type];
            return (
              <View key={item.subject} style={styles.historyCard}>
                <View style={styles.historyIcon}>
                  <Text style={styles.historyIconText}>{item.icon}</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historySubject}>{item.subject}</Text>
                  <View style={styles.historyMeta}>
                    <Text style={styles.historyMetaText}>📅 {item.date}</Text>
                    <Text style={styles.historyMetaText}>⏱ {item.time}</Text>
                  </View>
                  <View style={styles.historyScoreRow}>
                    <View style={[styles.scoreBadge, { backgroundColor: cfg.bg }]}>
                      <Text style={[styles.scoreBadgeText, { color: cfg.color }]}>{item.score}</Text>
                    </View>
                    <Text style={[styles.scoreLabel, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Yesterday */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Hôm qua</Text>
          {HISTORY.yesterday.map((item) => {
            const cfg = SCORE_CONFIG[item.type];
            return (
              <View key={item.subject} style={styles.historyCard}>
                <View style={styles.historyIcon}>
                  <Text style={styles.historyIconText}>{item.icon}</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historySubject}>{item.subject}</Text>
                  <View style={styles.historyMeta}>
                    <Text style={styles.historyMetaText}>📅 {item.date}</Text>
                    <Text style={styles.historyMetaText}>⏱ {item.time}</Text>
                  </View>
                  <View style={styles.historyScoreRow}>
                    <View style={[styles.scoreBadge, { backgroundColor: cfg.bg }]}>
                      <Text style={[styles.scoreBadgeText, { color: cfg.color }]}>{item.score}</Text>
                    </View>
                    <Text style={[styles.scoreLabel, { color: cfg.color }]}>{cfg.label}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Loading */}
        <View style={styles.loadingBlock}>
          <View style={styles.loadingDots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.loadingDot, i === 0 && styles.loadingDotActive]} />
            ))}
          </View>
          <Text style={styles.loadingText}>Đang tải thêm...</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: 2 },
  titleBlack: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  titlePurple: { fontSize: 32, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.sm },
  subtitle: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  section: { gap: Spacing.md },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  historyCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row', gap: Spacing.base,
    ...Shadow.md,
  },
  historyIcon: {
    width: 48, height: 48, borderRadius: Radius.lg,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  historyIconText: { fontSize: 24 },
  historyInfo: { flex: 1, gap: Spacing.xs },
  historySubject: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  historyMeta: { flexDirection: 'row', gap: Spacing.xl },
  historyMetaText: { fontSize: 12, color: Colors.textMuted },
  historyScoreRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  scoreBadge: { borderRadius: Radius.pill, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs },
  scoreBadgeText: { fontSize: 13, fontWeight: '700' },
  scoreLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  loadingBlock: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.xl },
  loadingDots: { flexDirection: 'row', gap: Spacing.sm },
  loadingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primaryMuted },
  loadingDotActive: { backgroundColor: Colors.primary },
  loadingText: { fontSize: 12, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
});
