// Converted from: VinhDanhChienThang.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

const STATS = [
  { label: 'Thời gian', value: '12:45', color: Colors.textPrimary },
  { label: 'Chính xác', value: '94%', color: '#22c55e' },
  { label: 'Thứ hạng', value: '#12 / 85', color: Colors.primary },
  { label: 'XP nhận', value: '+450', color: Colors.yellowDark },
];

export default function VictoryScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={[Colors.primaryBg, Colors.primarySurface]} style={styles.screen}>
      <AppHeader title="EduQuiz Live" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Battle finished badge */}
        <View style={styles.battleBadge}>
          <Text style={styles.battleBadgeIcon}>⚔️</Text>
          <Text style={styles.battleBadgeText}>Battle Finished</Text>
        </View>

        {/* Victory title */}
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Chiến </Text>
          <Text style={styles.titleYellow}>Thắng!</Text>
          <Text style={styles.subtitle}>Một trận đấu hay lúc! Chúc mừng các nhà thông thái đã xuất sắc đứng đầu bảng xếp hạng hôm nay.</Text>
        </View>

        {/* Winner */}
        <View style={styles.winnerBlock}>
          <View style={styles.trophyCircle}><Text style={styles.trophyIcon}>🏆</Text></View>
          <View style={styles.winnerAvatar} />
          <Text style={styles.winnerName}>Minh Anh</Text>
          <Text style={styles.winnerScore}>3,120 pts</Text>
        </View>

        {/* Podium bars */}
        <View style={styles.podium}>
          <View style={styles.podiumItem}>
            <View style={styles.podiumAvatar} />
            <Text style={styles.podiumName}>Hoàng Nam</Text>
            <Text style={styles.podiumScore}>2,840 pts</Text>
            <View style={[styles.podiumBar, { height: 100, backgroundColor: Colors.primarySurface }]}>
              <Text style={styles.podiumBarText}>2</Text>
            </View>
          </View>
          <View style={[styles.podiumItem, { marginTop: -40 }]}>
            <View style={[styles.podiumBar, { height: 160, backgroundColor: Colors.yellowAlt }]}>
              <Text style={[styles.podiumBarText, { fontSize: 48, color: Colors.yellowDark }]}>1</Text>
            </View>
          </View>
          <View style={styles.podiumItem}>
            <View style={styles.podiumAvatar} />
            <Text style={styles.podiumName}>Gia Huy</Text>
            <Text style={styles.podiumScore}>2,450 pts</Text>
            <View style={[styles.podiumBar, { height: 72, backgroundColor: Colors.primarySurface }]}>
              <Text style={styles.podiumBarText}>3</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton label="🏠  Về trang chủ" onPress={() => router.replace(Routes.HOME)} />
          <PrimaryButton label="🔄  Xem lại bài" onPress={() => router.push(Routes.RESULTS_DETAIL)} variant="ghost" />
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{s.label}</Text>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40, alignItems: 'center' },
  battleBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: 'rgba(172,142,255,0.3)', borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs },
  battleBadgeIcon: { fontSize: 16 },
  battleBadgeText: { fontSize: 12, fontWeight: '700', color: '#7e22ce', textTransform: 'uppercase', letterSpacing: 0.5 },
  titleBlock: { alignItems: 'center', gap: 2 },
  titleBlack: { fontSize: 44, fontWeight: '800', color: Colors.textPrimary },
  titleYellow: { fontSize: 44, fontWeight: '800', color: Colors.yellowAlt, marginTop: -Spacing.sm },
  subtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, maxWidth: 300 },
  winnerBlock: { alignItems: 'center', gap: Spacing.sm },
  trophyCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.yellowAlt, alignItems: 'center', justifyContent: 'center', ...Shadow.lg },
  trophyIcon: { fontSize: 32 },
  winnerAvatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.textPrimary },
  winnerName: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  winnerScore: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  podium: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.md, width: '100%', maxWidth: 320 },
  podiumItem: { flex: 1, alignItems: 'center', gap: Spacing.xs },
  podiumAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.textPrimary },
  podiumName: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  podiumScore: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, textAlign: 'center' },
  podiumBar: { width: '100%', borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg, alignItems: 'center', justifyContent: 'center' },
  podiumBarText: { fontSize: 32, fontWeight: '800', color: Colors.textMuted },
  actions: { gap: Spacing.md, width: '100%', maxWidth: 320 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, width: '100%', maxWidth: 320 },
  statCard: { width: '47%', backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, ...Shadow.sm },
  statLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase' },
  statValue: { fontSize: 24, fontWeight: '800' },
});
