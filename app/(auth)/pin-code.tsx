// Converted from: src/app/components/ManHinhPinCode.tsx
// Note: This is a Live Battle host screen (teacher view), not a standard auth screen.
// Placed in auth group for routing convenience; can be moved to live-battle/ later.
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';

const PIN = '847293';

export default function PinCodeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#f3e8ff', '#fdf3ff', '#fefce8']}
      style={styles.screen}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle} />
          <View>
            <Text style={styles.logoTitle}>EDUQUIZ LIVE</Text>
            <Text style={styles.roomName}>Room: History Champions</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.playersBadge}>
            <Text style={styles.playersIcon}>👥</Text>
            <View>
              <Text style={styles.playersCount}>12</Text>
              <Text style={styles.playersLabel}>Players</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          {/* PIN Card */}
          <View style={styles.pinCard}>
            {/* Top gradient bar */}
            <LinearGradient
              colors={[Colors.primary, Colors.yellow]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.pinCardBar}
            />
            <Text style={styles.joinAt}>Join at</Text>
            <Text style={styles.joinUrl}>eduhub.live</Text>

            <Text style={styles.pinLabel}>Game PIN</Text>
            <Text style={styles.pinNumber}>
              {PIN.slice(0, 3)}{'\n'}{PIN.slice(3)}
            </Text>

            <View style={styles.waitingBadge}>
              <View style={styles.waitingDot} />
              <Text style={styles.waitingText}>Waiting for players...</Text>
            </View>
          </View>

          {/* QR Card */}
          <View style={styles.qrCard}>
            <View style={styles.qrBox}>
              <Text style={styles.qrPlaceholder}>QR</Text>
            </View>
            <Text style={styles.qrLabel}>SCAN TO{'\n'}JOIN{'\n'}INSTANTLY</Text>
          </View>
        </View>
      </ScrollView>

      {/* Start button */}
      <View style={styles.startWrapper}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => router.push('/quiz/play/multiple-choice')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary, '#5b2ac5']}
            style={styles.startGradient}
          >
            <Text style={styles.startText}>START{'\n'}GAME</Text>
            <Text style={styles.startArrow}>▶</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.base,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  logoCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  logoTitle: { fontSize: 14, fontWeight: '800', color: '#7c3aed', fontStyle: 'italic' },
  roomName: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  playersBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  playersIcon: { fontSize: 16 },
  playersCount: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  playersLabel: { fontSize: 10, color: Colors.textSecondary, textTransform: 'uppercase' },
  settingsBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#9333ea',
    alignItems: 'center', justifyContent: 'center',
  },
  settingsIcon: { fontSize: 20 },
  scroll: { padding: Spacing.xl, paddingBottom: 160 },
  row: { flexDirection: 'row', gap: Spacing.base },
  pinCard: {
    flex: 2, backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: Radius['2xl'], padding: Spacing.xl,
    alignItems: 'center', overflow: 'hidden',
    ...Shadow.lg,
  },
  pinCardBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 6 },
  joinAt: { fontSize: 18, fontWeight: '700', color: '#5b2ac5', textTransform: 'uppercase', letterSpacing: 2, marginTop: Spacing.sm },
  joinUrl: { fontSize: 18, fontWeight: '700', color: '#5b2ac5', textTransform: 'uppercase', letterSpacing: 2, marginBottom: Spacing.base },
  pinLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.sm },
  pinNumber: { fontSize: 72, fontWeight: '900', color: Colors.primary, textAlign: 'center', lineHeight: 80 },
  waitingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    marginTop: Spacing.xl,
  },
  waitingDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.yellowAlt },
  waitingText: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  qrCard: {
    flex: 1, backgroundColor: Colors.yellowAlt,
    borderRadius: Radius['2xl'], padding: Spacing.xl,
    alignItems: 'center', justifyContent: 'center', gap: Spacing.xl,
    ...Shadow.md,
  },
  qrBox: {
    width: 120, height: 120, borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  qrPlaceholder: { fontSize: 32, fontWeight: '800', color: Colors.textMuted },
  qrLabel: { fontSize: 20, fontWeight: '800', color: Colors.yellowDark, textAlign: 'center', lineHeight: 28 },
  startWrapper: {
    position: 'absolute', bottom: 40, alignSelf: 'center',
  },
  startBtn: { borderRadius: Radius.pill, overflow: 'hidden', ...Shadow.xl },
  startGradient: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xl,
    paddingHorizontal: Spacing['3xl'], paddingVertical: Spacing.xl,
  },
  startText: { fontSize: 28, fontWeight: '900', color: Colors.white, textTransform: 'uppercase', lineHeight: 34 },
  startArrow: { fontSize: 28, color: Colors.white },
});
