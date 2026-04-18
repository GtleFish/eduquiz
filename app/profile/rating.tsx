// Converted from: src/app/components/DanhGiaUngDung.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  return (
    <View style={styles.screen}>
      {/* Blurred background placeholder */}
      <View style={styles.bgBlocks}>
        <View style={[styles.bgBlock, { height: 120, backgroundColor: Colors.primarySurface }]} />
        <View style={[styles.bgBlock, { height: 200, backgroundColor: Colors.cardBg }]} />
        <View style={[styles.bgBlock, { height: 100, backgroundColor: Colors.primarySurface }]} />
      </View>

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Modal card */}
        <View style={styles.card}>
          {/* Streak badge */}
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>7 NGÀY</Text>
          </View>

          {/* Hero gradient */}
          <LinearGradient colors={[Colors.primary, Colors.primaryLight]} style={styles.heroSection}>
            <View style={styles.heroCard}>
              <Text style={styles.heroEmoji}>✨</Text>
            </View>
          </LinearGradient>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Bạn thấy EduQuiz thế nào?</Text>
            <Text style={styles.subtitle}>
              Đánh giá của bạn giúp chúng mình cải thiện trải nghiệm học tập mỗi ngày!
            </Text>

            {/* Star rating */}
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={[styles.star, star > rating && styles.starEmpty]}>⭐</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Feedback */}
            <View style={styles.feedbackBlock}>
              <Text style={styles.feedbackLabel}>Góp ý cho chúng mình</Text>
              <TextInput
                style={styles.feedbackInput}
                placeholder="Hãy chia sẻ điều bạn thích nhất hoặc cần chúng mình cải thiện nhé..."
                placeholderTextColor={Colors.textMuted}
                value={feedback}
                onChangeText={setFeedback}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Actions */}
            <PrimaryButton
              label="Gửi"
              onPress={() => router.back()}
            />
            <TouchableOpacity style={styles.laterBtn} onPress={() => router.back()}>
              <Text style={styles.laterText}>Sau</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  bgBlocks: {
    position: 'absolute', top: 100, left: Spacing.xl, right: Spacing.xl,
    gap: Spacing.xl, opacity: 0.5,
  },
  bgBlock: { borderRadius: Radius['2xl'] },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17,7,40,0.2)',
    alignItems: 'center', justifyContent: 'center',
    padding: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 40,
    width: '100%', maxWidth: 380,
    overflow: 'hidden',
    ...Shadow.xl,
  },
  streakBadge: {
    position: 'absolute', top: Spacing.base, right: Spacing.base,
    zIndex: 10,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.xs,
    backgroundColor: 'rgba(243,232,255,0.85)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  streakIcon: { fontSize: 16 },
  streakText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary },
  heroSection: {
    height: 120,
    alignItems: 'center', justifyContent: 'center',
  },
  heroCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 40,
    padding: Spacing['2xl'],
    transform: [{ rotate: '-3deg' }],
  },
  heroEmoji: { fontSize: 48 },
  content: { padding: Spacing['2xl'], gap: Spacing.xl },
  title: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.sm },
  star: { fontSize: 44 },
  starEmpty: { opacity: 0.3 },
  feedbackBlock: { gap: Spacing.sm },
  feedbackLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  feedbackInput: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.base,
    height: 96,
    fontSize: 14, color: Colors.textPrimary,
    textAlignVertical: 'top',
  },
  laterBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  laterText: { fontSize: 14, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
});
