// Converted from: src/app/components/BangXepHang.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';
import { PodiumCard } from '../../components/leaderboard/PodiumCard';
import { PlayerRow } from '../../components/leaderboard/PlayerRow';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { TabPills } from '../../components/ui/TabPills';

const TOP3 = [
  { rank: 2 as const, name: 'Khánh Duy', score: '2,840 pts', color: '#9ca3af' },
  { rank: 1 as const, name: 'Linh Nguyễn', score: '9,100 pts', color: Colors.yellowAlt },
  { rank: 3 as const, name: 'Hải Đăng', score: '2,710 pts', color: '#fb923c' },
];

const PLAYERS = [
  { rank: 4, name: 'Hoàng Anh', score: '2,680', streak: false },
  { rank: 5, name: 'Thu Thảo', score: '2,450', streak: false },
  { rank: 6, name: 'Quốc Trung', score: '2,320', streak: true },
  { rank: 7, name: 'Minh Hằng', score: '2,110', streak: false },
];

export default function LeaderboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <AppHeader
        title="Leaderboard"
        onBack={() => router.back()}
        onAction={() => {}}
      />

      {/* Sub-leaderboard tabs */}
      <View style={styles.tabWrapper}>
        <TabPills
          tabs={[
            { key: 'friends', label: '👥 Bạn bè' },
            { key: 'world', label: '🌍 Thế giới' },
          ]}
          activeKey=""
          onSelect={(key) => {
            if (key === 'friends') router.push(Routes.LEADERBOARD_FRIENDS);
            else router.push(Routes.LEADERBOARD_WORLD);
          }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.period}>Tháng này</Text>
          <Text style={styles.title}>Đường Lên Đỉnh{'\n'}Vinh Quang</Text>
        </View>

        {/* Podium — order: 2nd, 1st, 3rd */}
        <View style={styles.podium}>
          {TOP3.map((p) => (
            <PodiumCard key={p.rank} {...p} />
          ))}
        </View>

        {/* Gradient list */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryGradientEnd]}
          style={styles.listCard}
        >
          {/* Current user */}
          <View style={styles.youRow}>
            <View style={styles.youAvatar}>
              <Text style={styles.youAvatarText}>T</Text>
            </View>
            <View style={styles.youInfo}>
              <Text style={styles.youName}>Bạn (Tôi)</Text>
              <Text style={styles.youSub}>Lên trước vị thế</Text>
            </View>
            <View style={styles.youScore}>
              <Text style={styles.youRank}>14</Text>
              <Text style={styles.youPts}>1,850</Text>
            </View>
            <Text style={styles.fireIcon}>🔥</Text>
          </View>

          {/* Other players */}
          {PLAYERS.map((p) => (
            <PlayerRow key={p.rank} {...p} />
          ))}
        </LinearGradient>

        {/* Challenge card */}
        <View style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>Thách thức cuối tuần!</Text>
          <Text style={styles.challengeDesc}>
            Hoàn thành 3 bài kiểm tra để nhận số điểm của bạn.
          </Text>
          <PrimaryButton label="Tham gia ngay" onPress={() => {}} variant="solid" />
          <View style={styles.trophyWrapper}>
            <Text style={styles.trophyIcon}>🏆</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  tabWrapper: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.sm },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 100, gap: Spacing.xl },
  titleBlock: { gap: Spacing.xs },
  period: { fontSize: 11, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 32, fontWeight: '800', color: Colors.primary, lineHeight: 40 },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  listCard: { borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.sm },
  youRow: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  youAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  youAvatarText: { fontWeight: '700', color: Colors.primary, fontSize: 18 },
  youInfo: { flex: 1 },
  youName: { fontWeight: '700', color: Colors.white, fontSize: 15 },
  youSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  youScore: { alignItems: 'flex-end' },
  youRank: { fontSize: 22, fontWeight: '800', color: Colors.white },
  youPts: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  fireIcon: { fontSize: 20 },
  challengeCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center',
    gap: Spacing.base,
  },
  challengeTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  challengeDesc: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  trophyWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  trophyIcon: { fontSize: 36 },
});
