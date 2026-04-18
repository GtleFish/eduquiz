// Converted from: BangXepHangTheGioi.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';

const FILTERS = ['WEEKLY', 'MONTHLY', 'ALL-TIME'];
const PLAYERS = [
  { rank: 4, name: 'Phục Nguyễn', sub: 'Lv. 42 Master', score: '10,920' },
  { rank: 5, name: 'Thao Vy', sub: 'Lv. 38 Scholar', score: '10,400' },
  { rank: 6, name: 'Linh Đan', sub: 'Lv. 35 Challenger', score: '9,850' },
];

export default function WorldLeaderboardScreen() {
  const [filter, setFilter] = useState('WEEKLY');
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
          <Text style={styles.titlePurple}>Global</Text>
          <Text style={styles.titlePurple}>League Stars</Text>
          <Text style={styles.subtitle}>The fastest minds in the nation.</Text>
        </View>

        {/* Filter tabs */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterBtnActive]} onPress={() => setFilter(f)}>
              <Text style={[styles.filterBtnText, filter === f && styles.filterBtnTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Podium */}
        <View style={styles.podium}>
          {/* 2nd */}
          <View style={styles.podiumItem}>
            <View style={styles.podiumAvatar2}><Text style={styles.podiumAvatarText}>2</Text></View>
            <Text style={styles.podiumName}>Anh Tuấn</Text>
            <Text style={styles.podiumScore}>12,450</Text>
            <View style={[styles.podiumBar, { height: 80, backgroundColor: Colors.primarySurface }]}>
              <Text style={styles.podiumBarText}>2</Text>
            </View>
          </View>
          {/* 1st */}
          <View style={[styles.podiumItem, { marginTop: -32 }]}>
            <View style={styles.podiumAvatar1}>
              <Text style={styles.podiumAvatar1Text}>👤</Text>
              <View style={styles.podiumCrown}><Text style={styles.podiumCrownText}>1</Text></View>
            </View>
            <Text style={styles.podiumName}>Minh Anh</Text>
            <Text style={[styles.podiumScore, { color: Colors.primary, fontSize: 18 }]}>14,200 pts</Text>
            <View style={[styles.podiumBar, { height: 120, backgroundColor: Colors.yellowAlt }]}>
              <Text style={[styles.podiumBarText, { color: Colors.yellowDark, fontSize: 40 }]}>1</Text>
            </View>
          </View>
          {/* 3rd */}
          <View style={styles.podiumItem}>
            <View style={styles.podiumAvatar3}><Text style={styles.podiumAvatarText}>3</Text></View>
            <Text style={styles.podiumName}>Hoàng Phi</Text>
            <Text style={styles.podiumScore}>11,800</Text>
            <View style={[styles.podiumBar, { height: 60, backgroundColor: Colors.primarySurface }]}>
              <Text style={styles.podiumBarText}>3</Text>
            </View>
          </View>
        </View>

        {/* List */}
        <View style={styles.playerList}>
          {PLAYERS.map((p) => (
            <View key={p.name} style={styles.playerRow}>
              <Text style={styles.playerRank}>{p.rank}</Text>
              <View style={styles.playerAvatar} />
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{p.name}</Text>
                <Text style={styles.playerSub}>{p.sub}</Text>
              </View>
              <View>
                <Text style={styles.playerScore}>{p.score}</Text>
                <Text style={styles.playerScoreLabel}>POINTS</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Your rank */}
        <LinearGradient colors={[Colors.primary, Colors.primaryGradientEnd]} style={styles.yourRankCard}>
          <View style={styles.yourRankLeft}>
            <View style={styles.yourRankRing}>
              <Text style={styles.yourRankRingText}>75%</Text>
            </View>
          </View>
          <View style={styles.yourRankInfo}>
            <Text style={styles.yourRankLabel}>Your Global Rank</Text>
            <Text style={styles.yourRankSub}>Top 2% of players</Text>
          </View>
          <View>
            <Text style={styles.yourRankValue}>#42</Text>
            <Text style={styles.yourRankPts}>9,420 pts</Text>
          </View>
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
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  notifIcon: { fontSize: 22 },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: 2 },
  titlePurple: { fontSize: 32, fontWeight: '800', color: Colors.primary },
  subtitle: { fontSize: 14, color: Colors.textSecondary },
  filterRow: { flexDirection: 'row', gap: Spacing.md },
  filterBtn: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  filterBtnActive: { backgroundColor: Colors.primary },
  filterBtnText: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary },
  filterBtnTextActive: { color: Colors.white },
  podium: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: Spacing.md, paddingVertical: Spacing.xl },
  podiumItem: { flex: 1, alignItems: 'center', gap: Spacing.xs },
  podiumAvatar1: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  podiumAvatar1Text: { fontSize: 32, color: Colors.white },
  podiumCrown: { position: 'absolute', top: -8, right: -8, width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.yellowAlt, alignItems: 'center', justifyContent: 'center' },
  podiumCrownText: { fontSize: 13, fontWeight: '700', color: Colors.yellowDark },
  podiumAvatar2: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  podiumAvatar3: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fde68a', alignItems: 'center', justifyContent: 'center' },
  podiumAvatarText: { fontSize: 22, fontWeight: '700', color: Colors.textSecondary },
  podiumName: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  podiumScore: { fontSize: 13, fontWeight: '700', color: Colors.primary, textAlign: 'center' },
  podiumBar: { width: '100%', borderTopLeftRadius: Radius.lg, borderTopRightRadius: Radius.lg, alignItems: 'center', justifyContent: 'center' },
  podiumBarText: { fontSize: 28, fontWeight: '800', color: Colors.textMuted },
  playerList: { gap: Spacing.md },
  playerRow: { backgroundColor: Colors.white, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: Spacing.md, ...Shadow.sm },
  playerRank: { fontSize: 18, fontWeight: '700', color: Colors.textMuted, width: 24 },
  playerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primarySurface },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  playerSub: { fontSize: 12, color: Colors.textSecondary },
  playerScore: { fontSize: 16, fontWeight: '700', color: Colors.primary, textAlign: 'right' },
  playerScoreLabel: { fontSize: 10, color: Colors.textMuted, textTransform: 'uppercase', textAlign: 'right' },
  yourRankCard: { borderRadius: Radius['2xl'], padding: Spacing.xl, flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  yourRankLeft: {},
  yourRankRing: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, borderColor: Colors.white, alignItems: 'center', justifyContent: 'center' },
  yourRankRingText: { fontSize: 12, fontWeight: '700', color: Colors.white },
  yourRankInfo: { flex: 1 },
  yourRankLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  yourRankSub: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  yourRankValue: { fontSize: 28, fontWeight: '800', color: Colors.white, textAlign: 'right' },
  yourRankPts: { fontSize: 12, color: 'rgba(255,255,255,0.8)', textAlign: 'right' },
});
