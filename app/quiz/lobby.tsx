// Converted from: src/app/components/PhongCho.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

import { QuizSessionStore } from '../../store/quizSessionStore';

export default function LobbyScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Sẵn sàng chưa?</Text>
          <Text style={styles.subtitle}>Level Up Your Knowledge</Text>
        </View>

        {/* Avatar with streak */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>12 DAY STREAK</Text>
          </View>
        </View>

        {/* Quiz info card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Selected Quiz</Text>
          <Text style={styles.infoTitle}>Giải tích 12</Text>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: Colors.primarySurface }]}>
              <View style={styles.statIcon}>
                <Text style={styles.statIconText}>📝</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Questions</Text>
                <Text style={styles.statValue}>35</Text>
              </View>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#fefce8' }]}>
              <View style={[styles.statIcon, { backgroundColor: '#fef9c3' }]}>
                <Text style={styles.statIconText}>⏱</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Difficulty</Text>
                <Text style={[styles.statValue, { color: '#a16207' }]}>Hard</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoNote}>
            <Text style={styles.infoNoteIcon}>ℹ️</Text>
            <Text style={styles.infoNoteText}>
              Hệ thống đã chuẩn bị xong các câu hỏi. Bạn có 20 phút.
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <PrimaryButton
            label="Bắt đầu ngay"
            onPress={() => {
              QuizSessionStore.start();
              router.push(Routes.QUIZ_READY);
            }}
          />
          <PrimaryButton
            label="Chọn môn khác"
            onPress={() => router.back()}
            variant="outline"
          />
        </View>

        {/* Player info */}
        <View style={styles.playerRow}>
          <Avatar size={72} initials="MK" style={styles.playerAvatar} />
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>Minh Khoa</Text>
            <ProgressBar progress={0.66} height={8} />
          </View>
          <Text style={styles.readyIcon}>✓</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  headerPill: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(243,232,255,0.7)',
    marginHorizontal: Spacing.xl, marginTop: Spacing['3xl'],
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  menuIcon: { fontSize: 20, color: Colors.textPrimary },
  logo: { fontSize: 18, fontWeight: '800', color: '#7e22ce', fontStyle: 'italic' },
  headerRight: { alignItems: 'flex-end' },
  quizTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  quizSubtitle: { fontSize: 10, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 100 },
  titleBlock: { alignItems: 'center', gap: Spacing.xs },
  title: { fontSize: 40, fontWeight: '800', color: Colors.primary },
  subtitle: { fontSize: 13, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  avatarWrapper: { alignItems: 'center' },
  avatarCircle: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.xl,
  },
  avatarEmoji: { fontSize: 80 },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: 'rgba(243,232,255,0.8)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
    marginTop: -Spacing.base,
    ...Shadow.sm,
  },
  streakIcon: { fontSize: 16 },
  streakText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    gap: Spacing.base,
    ...Shadow.lg,
  },
  infoLabel: { fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    borderRadius: Radius['2xl'], padding: Spacing.base,
  },
  statIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  statIconText: { fontSize: 20 },
  statLabel: { fontSize: 10, color: Colors.textSecondary, textTransform: 'uppercase' },
  statValue: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  infoNote: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start' },
  infoNoteIcon: { fontSize: 16 },
  infoNoteText: { flex: 1, fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
  actions: { gap: Spacing.md },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  playerAvatar: { transform: [{ rotate: '3deg' }] },
  playerInfo: { flex: 1, gap: Spacing.sm },
  playerName: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  readyIcon: { fontSize: 28, color: Colors.yellowAlt },
});
