// Converted from: NotFound404.tsx — Expo Router convention for 404
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import { Spacing, Radius, Shadow } from '../constants/spacing';
import { PrimaryButton } from '../components/ui/PrimaryButton';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>EduQuiz</Text>
        <TouchableOpacity><Text style={styles.searchIcon}>🔍</Text></TouchableOpacity>
        <View style={styles.avatar} />
      </View>

      <View style={styles.content}>
        {/* 404 illustration */}
        <View style={styles.illustrationCard}>
          <View style={styles.illustrationInner}>
            <Text style={styles.robotEmoji}>🤖</Text>
            <View style={styles.badge404}><Text style={styles.badge404Text}>404</Text></View>
          </View>
        </View>

        {/* Text */}
        <Text style={styles.title}>Trang này không tồn tại rồi!</Text>
        <Text style={styles.desc}>
          Có vẻ như bạn đã lạc vào vùng kiến thức bí ẩn chưa được khai phá. Hãy để EduQuiz đưa bạn về nhà nhé!
        </Text>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton label="🏠  Về Trang chủ" onPress={() => router.replace('/(tabs)/')} />
          <PrimaryButton label="↩️  Quay lại" onPress={() => router.back()} variant="ghost" />
        </View>

        {/* Streak reminder */}
        <View style={styles.streakBadge}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>Đừng để đứt chuỗi học tập của bạn!</Text>
        </View>
      </View>

      <Text style={styles.footer}>© 2024 EduQuiz Vietnam</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    backgroundColor: 'rgba(243,232,255,0.7)',
  },
  logo: { fontSize: 22, fontWeight: '800', fontStyle: 'italic', color: '#7e22ce' },
  searchIcon: { fontSize: 22 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryMuted, borderWidth: 2, borderColor: Colors.primaryLight },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.xl },
  illustrationCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: 40, padding: Spacing['2xl'],
    width: '100%', ...Shadow.lg,
  },
  illustrationInner: {
    aspectRatio: 1, backgroundColor: Colors.primaryMuted,
    borderRadius: Radius['2xl'], alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  robotEmoji: { fontSize: 80 },
  badge404: {
    position: 'absolute', top: Spacing.base, right: Spacing.base,
    backgroundColor: Colors.yellowAlt, borderRadius: Radius['2xl'],
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    transform: [{ rotate: '12deg' }],
    ...Shadow.lg,
  },
  badge404Text: { fontSize: 22, fontWeight: '700', color: Colors.yellowDark },
  title: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  desc: { fontSize: 16, color: Colors.textSecondary, textAlign: 'center', lineHeight: 26 },
  actions: { gap: Spacing.md, width: '100%' },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: 'rgba(172,142,255,0.7)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    ...Shadow.sm,
  },
  streakIcon: { fontSize: 20 },
  streakText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  footer: { fontSize: 11, color: Colors.textMuted, textAlign: 'center', paddingBottom: Spacing.xl, opacity: 0.4 },
});
