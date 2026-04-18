// Converted from: BangXepHangBanBe.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const FRIENDS = [
  { rank: 2, name: 'Khánh Linh', sub: '8 quizzes today', score: '10,120' },
  { rank: 3, name: 'Hoàng Nam', sub: 'On fire! 🔥', score: '9,850' },
];

export default function FriendsLeaderboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerAvatar} />
          <Text style={styles.headerTitle}>EduQuiz Battle</Text>
        </View>
        <TouchableOpacity><Text style={styles.notifIcon}>🔔</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleLabel}>Monthly Ranking</Text>
          <Text style={styles.title}>Social Arena</Text>
          <Text style={styles.subtitle}>See how you measure up against your circle this month.</Text>
        </View>

        {/* My stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>My Rank</Text>
            <Text style={styles.statValue}>#04</Text>
            <Text style={styles.statTrend}>↑2</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors.yellowAlt }]}>
            <Text style={[styles.statLabel, { color: Colors.yellowDark }]}>Streak</Text>
            <Text style={[styles.statValue, { color: Colors.yellowDark }]}>12 Days</Text>
            <Text style={styles.fireText}>🔥 ON FIRE!</Text>
          </View>
        </View>

        {/* Top friend */}
        <View style={styles.topFriendCard}>
          <View style={styles.topFriendLeft}>
            <View style={styles.topFriendAvatarWrapper}>
              <View style={styles.topFriendAvatar} />
              <View style={styles.topFriendRankBadge}><Text style={styles.topFriendRankText}>1</Text></View>
            </View>
            <View>
              <Text style={styles.topFriendName}>Minh Tuấn</Text>
              <Text style={styles.topFriendSub}>Top Contributor</Text>
            </View>
          </View>
          <View>
            <Text style={styles.topFriendScore}>12,450</Text>
            <Text style={styles.topFriendScoreLabel}>Points</Text>
          </View>
        </View>

        {/* Friends list */}
        <View style={styles.friendsList}>
          {FRIENDS.map((f) => (
            <View key={f.name} style={styles.friendRow}>
              <Text style={styles.friendRank}>{f.rank}</Text>
              <View style={styles.friendAvatar} />
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{f.name}</Text>
                <Text style={styles.friendSub}>{f.sub}</Text>
              </View>
              <Text style={styles.friendScore}>{f.score}</Text>
            </View>
          ))}
          {/* You */}
          <View style={[styles.friendRow, styles.youRow]}>
            <Text style={[styles.friendRank, { color: Colors.primary }]}>4</Text>
            <View style={styles.friendAvatar} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>Bạn (You)</Text>
              <Text style={[styles.friendSub, { color: Colors.primary, fontWeight: '700' }]}>Close to Top 3!</Text>
            </View>
            <Text style={[styles.friendScore, { color: Colors.primary }]}>8,200</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addFriendsBtn}>
          <Text style={styles.addFriendsBtnText}>👥  Mời thêm bạn bè</Text>
        </TouchableOpacity>

        <LinearGradient colors={[Colors.primary, Colors.primaryGradientEnd]} style={styles.challengeCard}>
          <Text style={styles.challengeTitle}>Weekly Challenge</Text>
          <Text style={styles.challengeDesc}>Beat the #1 player this week to earn a special badge!</Text>
          <TouchableOpacity style={styles.challengeBtn}>
            <Text style={styles.challengeBtnText}>Challenge Minh Tuấn →</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  backIcon: { fontSize: 22, color: Colors.primary },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.textPrimary },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  notifIcon: { fontSize: 22 },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: Spacing.xs },
  titleLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.xs },
  statLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase' },
  statValue: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  statTrend: { fontSize: 13, color: Colors.textMuted },
  fireText: { fontSize: 12, color: Colors.yellowDark, fontWeight: '700' },
  topFriendCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.xl, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...Shadow.md },
  topFriendLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  topFriendAvatarWrapper: { position: 'relative' },
  topFriendAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.textPrimary },
  topFriendRankBadge: { position: 'absolute', top: -8, right: -8, width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.yellowAlt, alignItems: 'center', justifyContent: 'center' },
  topFriendRankText: { fontSize: 13, fontWeight: '700', color: Colors.yellowDark },
  topFriendName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  topFriendSub: { fontSize: 12, color: Colors.textMuted },
  topFriendScore: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  topFriendScoreLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', textAlign: 'right' },
  friendsList: { gap: Spacing.md },
  friendRow: { backgroundColor: Colors.white, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: Spacing.md, ...Shadow.sm },
  youRow: { backgroundColor: Colors.primarySurface, borderWidth: 2, borderColor: Colors.primary },
  friendRank: { fontSize: 18, fontWeight: '700', color: Colors.textMuted, width: 24 },
  friendAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.textPrimary },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  friendSub: { fontSize: 12, color: Colors.textSecondary },
  friendScore: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  addFriendsBtn: { backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.base, alignItems: 'center' },
  addFriendsBtnText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  challengeCard: { borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md },
  challengeTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  challengeDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  challengeBtn: { backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, alignSelf: 'stretch', alignItems: 'center' },
  challengeBtnText: { fontSize: 14, fontWeight: '700', color: Colors.yellowDark },
});
