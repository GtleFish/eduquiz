// Converted from: src/app/components/ChiaSeKetQua.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/colors';
import { Spacing, Radius, Shadow } from '../../../constants/spacing';
import { Routes } from '../../../constants/routes';
import { Avatar } from '../../../components/ui/Avatar';
import { QuizSessionStore } from '../../../store/quizSessionStore';

export default function ShareResultScreen() {
  const router = useRouter();
  const summary = QuizSessionStore.getSummary();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Tôi vừa đạt ${summary.accuracy}% trong bài quiz EduQuiz! Thử thách bạn bè tại eduquiz.vn`,
        title: 'EduQuiz - Kết quả của tôi',
      });
    } catch {
      Alert.alert('Không thể chia sẻ');
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz Complete</Text>
        <TouchableOpacity>
          <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Share card */}        <LinearGradient
          colors={[Colors.primary, Colors.primaryLight]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.shareCard}
        >
          {/* Logo */}
          <View style={styles.logoCard}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>

          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <Avatar size={112} initials="MA" bordered borderColor={Colors.white} />
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>TOP 1%</Text>
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleBlock}>
            <Text style={styles.shareTitle}>Thắng Tuyệt Đối!</Text>
            <Text style={styles.shareSubtitle}>Bạn vừa phá kỷ lục cá nhân</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Điểm số</Text>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{summary.correctCount}</Text>
                <Text style={styles.statTotal}>/{summary.total}</Text>
              </View>
            </View>
            <View style={[styles.statCard, styles.statCardHighlight]}>
              <Text style={styles.statLabel}>Chính xác</Text>
              <Text style={styles.statValue}>{summary.accuracy}%</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.cardFooter}>
            <View style={styles.footerPill}>
              <Text style={styles.footerPillText}>Thách thức bạn bè cùng tham gia!</Text>
            </View>
            <View style={styles.footerMeta}>
              <Text style={styles.streakText}>🔥  Chuỗi 15 ngày</Text>
              <Text style={styles.domainText}>eduquiz.vn</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleShare}>
            <Text style={styles.saveBtnIcon}>💾</Text>
            <Text style={styles.saveBtnText}>Lưu ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.shareBtnIcon}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    backgroundColor: 'rgba(243,232,255,0.7)',
  },
  closeIcon: { fontSize: 20, color: Colors.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  moreIcon: { fontSize: 20, color: Colors.primary },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.xl },
  shareCard: {
    borderRadius: 40, padding: Spacing['2xl'],
    width: '100%', maxWidth: 360,
    alignItems: 'center', gap: Spacing.xl,
    ...Shadow.xl,
  },
  logoCard: {
    width: 64, height: 64, borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    transform: [{ rotate: '-6deg' }],
    ...Shadow.md,
  },
  logoEmoji: { fontSize: 32 },
  avatarWrapper: { alignItems: 'center' },
  rankBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    marginTop: -Spacing.sm,
  },
  rankText: { fontSize: 11, fontWeight: '700', color: Colors.yellowDark },
  titleBlock: { alignItems: 'center', gap: Spacing.xs },
  shareTitle: { fontSize: 28, fontWeight: '800', color: Colors.white },
  shareSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  statsRow: { flexDirection: 'row', gap: Spacing.md, width: '100%' },
  statCard: {
    flex: 1, backgroundColor: 'rgba(172,142,255,0.4)',
    borderRadius: Radius['2xl'], padding: Spacing.xl, alignItems: 'center', gap: Spacing.xs,
  },
  statCardHighlight: { borderWidth: 2, borderColor: 'rgba(250,213,56,0.3)' },
  statLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(42,0,112,0.6)', textTransform: 'uppercase' },
  statValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  statValue: { fontSize: 36, fontWeight: '800', color: '#2a0070' },
  statTotal: { fontSize: 16, fontWeight: '700', color: 'rgba(42,0,112,0.4)' },
  cardFooter: { width: '100%', gap: Spacing.md },
  footerPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  footerPillText: { fontSize: 12, color: Colors.white },
  footerMeta: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.sm },
  streakText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  domainText: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  actionRow: { flexDirection: 'row', gap: Spacing.md, width: '100%', maxWidth: 360 },
  saveBtn: {
    flex: 1, backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill, paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    ...Shadow.md,
  },
  saveBtnIcon: { fontSize: 18 },
  saveBtnText: { fontWeight: '700', color: Colors.yellowDark, fontSize: 15 },
  shareBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
    ...Shadow.md,
  },
  shareBtnIcon: { fontSize: 22 },
});
