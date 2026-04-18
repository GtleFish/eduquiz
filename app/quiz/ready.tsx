// Converted from: src/app/components/SanSang.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { Avatar } from '../../components/ui/Avatar';
import { useCountdown } from '../../hooks/useCountdown';

export default function ReadyScreen() {
  const router = useRouter();
  const { seconds, start } = useCountdown(3);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      router.replace(Routes.PLAY_MULTIPLE_CHOICE);
    }
  }, [seconds]);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryGradientEnd]}
      style={styles.screen}
    >
      {/* Decorative math symbols */}
      <Text style={[styles.deco, { top: 160, left: 48, transform: [{ rotate: '12deg' }] }]}>∑</Text>
      <Text style={[styles.deco, { bottom: 208, right: 64, transform: [{ rotate: '-12deg' }] }]}>📐</Text>

      {/* Header pill */}
      <View style={styles.headerPill}>
        <View style={styles.headerLeft}>
          <Text style={styles.menuIcon}>☰</Text>
          <Text style={styles.logo}>EduQuiz</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.quizTitle}>Giải tích 12</Text>
          <Text style={styles.quizSubtitle}>Chương 1 Khảo Sát Hàm Số</Text>
        </View>
      </View>

      {/* Countdown */}
      <View style={styles.countdownWrapper}>
        {/* Outer ring */}
        <View style={styles.outerRing} />
        {/* Dashed ring */}
        <View style={styles.dashedRing} />
        {/* Number */}
        <Text style={styles.countdownNumber}>{seconds}</Text>
      </View>

      {/* Status */}
      <View style={styles.statusBlock}>
        <Text style={styles.statusText}>CHUẨN BỊ</Text>
        <View style={styles.statusDots}>
          <View style={[styles.statusDot, styles.statusDotActive]} />
          <View style={styles.statusDot} />
          <View style={styles.statusDot} />
        </View>
      </View>

      {/* Bottom section */}
      <View style={styles.bottom}>
        {/* Streak pill */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>Chuỗi thắng: 5 trận!</Text>
        </View>

        {/* Player card */}
        <View style={styles.playerCard}>
          <View style={styles.playerAvatarWrapper}>
            <Avatar size={72} initials="MK" bordered borderColor={Colors.white} />
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>Minh Khoa</Text>
            <View style={styles.playerBar} />
          </View>
          <Text style={styles.readyIcon}>✓</Text>
        </View>
      </View>

      {/* Background text */}
      <Text style={styles.bgTextLeft}>EDU</Text>
      <Text style={styles.bgTextRight}>MATH</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  deco: {
    position: 'absolute',
    fontSize: 72, color: 'rgba(255,255,255,0.2)', fontWeight: '800',
  },
  headerPill: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: Spacing.xl, marginTop: Spacing['3xl'],
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  menuIcon: { fontSize: 20, color: Colors.white },
  logo: { fontSize: 18, fontWeight: '800', color: Colors.white, fontStyle: 'italic' },
  headerRight: { alignItems: 'flex-end' },
  quizTitle: { fontSize: 14, fontWeight: '700', color: Colors.white },
  quizSubtitle: { fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.5 },
  countdownWrapper: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  outerRing: {
    position: 'absolute',
    width: 280, height: 280, borderRadius: 140,
    borderWidth: 8, borderColor: 'rgba(255,255,255,0.2)',
  },
  dashedRing: {
    position: 'absolute',
    width: 340, height: 340, borderRadius: 170,
    borderWidth: 2, borderColor: 'rgba(250,213,56,0.4)',
    borderStyle: 'dashed',
  },
  countdownNumber: {
    fontSize: 200, fontWeight: '900', color: Colors.yellow,
    lineHeight: 220,
  },
  statusBlock: { alignItems: 'center', gap: Spacing.base, marginBottom: Spacing['2xl'] },
  statusText: {
    fontSize: 22, fontWeight: '700', color: Colors.white,
    textTransform: 'uppercase', letterSpacing: 8,
  },
  statusDots: { flexDirection: 'row', gap: Spacing.sm },
  statusDot: { width: 48, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
  statusDotActive: { backgroundColor: Colors.yellow },
  bottom: {
    paddingHorizontal: Spacing.xl, paddingBottom: Spacing['2xl'],
    gap: Spacing.xl, alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  streakIcon: { fontSize: 18 },
  streakText: { fontWeight: '700', color: Colors.white, fontSize: 15 },
  playerCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xl,
    width: '100%', maxWidth: 360,
  },
  playerAvatarWrapper: { transform: [{ rotate: '3deg' }] },
  playerInfo: { flex: 1, gap: Spacing.sm },
  playerName: { fontSize: 22, fontWeight: '700', color: Colors.white },
  playerBar: {
    height: 28, backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.pill,
  },
  readyIcon: { fontSize: 28, color: Colors.yellow },
  bgTextLeft: {
    position: 'absolute', top: '55%', left: -80,
    fontSize: 140, fontWeight: '900', color: 'rgba(255,255,255,0.05)',
  },
  bgTextRight: {
    position: 'absolute', bottom: 0, right: -200,
    fontSize: 100, fontWeight: '900', color: 'rgba(255,255,255,0.05)',
  },
});
