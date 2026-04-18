// Converted from: QuizKhongKhaDung.tsx — Reusable "quiz locked/unavailable" component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from './PrimaryButton';

const SUGGESTIONS = [
  { icon: '📐', title: 'Toán học giải trí', desc: 'Thú vị và các bí tốc hời thử nhất về phạm' },
  { icon: '🌐', title: 'Tiếng Anh Giao Tiếp', desc: 'Luyện tập nghe nói với câu hỏi thông dụng' },
  { icon: '👑', title: 'Thế Giới Tự Nhiên', desc: 'Khám phá bí mật của thế giới tự nhiên' },
];

export function QuizUnavailable() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>EduQuiz</Text>
        <View style={styles.avatar} />
      </View>

      <View style={styles.content}>
        {/* Locked illustration */}
        <View style={styles.illustrationCard}>
          <Text style={styles.lockEmoji}>🔒</Text>
          <View style={styles.lockedBadge}><Text style={styles.lockedBadgeText}>Locked</Text></View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedIcon}>⚡</Text>
            <Text style={styles.verifiedText}>Đỉ Verified</Text>
          </View>
        </View>

        <Text style={styles.title}>Rất tiếc! Nội dung đã bị khóa</Text>
        <Text style={styles.desc}>
          Quiz này đã bị hạn chế. Hãy cùng là lòng, vẫn còn hàng ngàn thử thách khác đang chờ bạn!
        </Text>

        <PrimaryButton label="🔍  Khám phá Quiz mới" onPress={() => router.push(Routes.EXPLORE)} />
        <TouchableOpacity onPress={() => router.replace(Routes.HOME)}>
          <Text style={styles.homeLink}>Về trang chủ</Text>
        </TouchableOpacity>

        {/* Suggestions */}
        <View style={styles.suggestionsBlock}>
          <Text style={styles.suggestionsLabel}>Dành cho bạn</Text>
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity key={s.title} style={styles.suggestionCard} onPress={() => router.push(Routes.EXPLORE)}>
              <View style={styles.suggestionIcon}><Text style={styles.suggestionIconText}>{s.icon}</Text></View>
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionTitle}>{s.title}</Text>
                <Text style={styles.suggestionDesc}>{s.desc}</Text>
              </View>
              <Text style={styles.suggestionArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  menuIcon: { fontSize: 22, color: '#9333ea' },
  logo: { fontSize: 18, fontWeight: '700', fontStyle: 'italic', color: '#7e22ce' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primarySurface, borderWidth: 2, borderColor: Colors.primaryLight },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.xl },
  illustrationCard: {
    backgroundColor: Colors.primarySurface, borderRadius: 40,
    padding: Spacing['3xl'], alignItems: 'center', position: 'relative',
    ...Shadow.lg,
  },
  lockEmoji: { fontSize: 72 },
  lockedBadge: { backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs, marginTop: Spacing.sm },
  lockedBadgeText: { fontSize: 12, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  verifiedBadge: {
    position: 'absolute', top: -Spacing.base, right: -Spacing.base,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: 'rgba(243,232,255,0.8)',
    borderRadius: Radius.pill, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    ...Shadow.sm,
  },
  verifiedIcon: { fontSize: 14 },
  verifiedText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary },
  title: { fontSize: 24, fontWeight: '800', color: Colors.primary, textAlign: 'center' },
  desc: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  homeLink: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  suggestionsBlock: { width: '100%', gap: Spacing.md },
  suggestionsLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  suggestionCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.base, ...Shadow.sm },
  suggestionIcon: { width: 48, height: 48, borderRadius: Radius.lg, backgroundColor: Colors.primarySurface, alignItems: 'center', justifyContent: 'center' },
  suggestionIconText: { fontSize: 24 },
  suggestionInfo: { flex: 1 },
  suggestionTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  suggestionDesc: { fontSize: 12, color: Colors.textSecondary },
  suggestionArrow: { fontSize: 18, color: Colors.primary },
});
