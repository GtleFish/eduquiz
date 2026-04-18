// Converted from: src/app/components/KhamPha.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { StyledTextInput } from '../../components/ui/StyledTextInput';

const SUBJECTS = [
  { icon: '∑', name: 'Toán', bg: Colors.primarySurface },
  { icon: '⚡', name: 'Lý', bg: Colors.yellowBg },
  { icon: '🧪', name: 'Hóa', bg: '#dcfce7' },
  { icon: '🧬', name: 'Sinh', bg: '#d1fae5' },
  { icon: '📖', name: 'Văn', bg: '#fee2e2' },
  { icon: '😀', name: 'Emoji', bg: Colors.yellowBg },
  { icon: '🌍', name: 'Địa', bg: '#dbeafe' },
  { icon: '🌐', name: 'Anh', bg: Colors.primarySurface },
  { icon: '👓', name: 'IELTS', bg: Colors.primarySurface },
  { icon: '😊', name: 'THPT QG', bg: Colors.yellowBg },
];

const QUIZZES = [
  { title: 'Ngữ Văn: Nguồn Gốc Việt Nam', meta: '📝 15 Câu  •  👁 Hạp Dân', rating: '4.9' },
  { title: 'Vật Lý 12 - Ôn Tập Tổng Hợp', meta: '📝 30 Câu  •  👁 8 Phút', rating: '4.7' },
  { title: 'Tiếng Anh lớp 10 Family Life', meta: '📝 20 Câu  •  👁 5.2k Lượt xem', rating: '4.8' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {/* Search header */}
      <View style={styles.header}>
        <StyledTextInput
          placeholder="Khám phá"
          value={query}
          onChangeText={setQuery}
          containerStyle={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={() => router.push(Routes.SEARCH)}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Featured challenge */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryGradientEnd]}
          style={styles.featuredCard}
        >
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>ƯU ĐÃI HẤP DẪN</Text>
          </View>
          <Text style={styles.featuredTitle}>
            Chinh phục kỳ thi THPT Quốc gia 2024
          </Text>
          <Text style={styles.featuredDesc}>
            Bộ đề thi mô phỏng THPT Quốc gia năm 2024 vừa được cập nhật theo cấu trúc đề thi chính thức.
          </Text>
          <TouchableOpacity style={styles.featuredBtn}>
            <Text style={styles.featuredBtnText}>Học ngay</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Subject grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Môn học phổ biến</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subjectGrid}>
            {SUBJECTS.map((s) => (
              <TouchableOpacity
                key={s.name}
                style={[styles.subjectCell, { backgroundColor: s.bg }]}
                activeOpacity={0.8}
              >
                <Text style={styles.subjectIcon}>{s.icon}</Text>
                <Text style={styles.subjectName}>{s.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular quizzes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quiz nổi bật</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          {QUIZZES.map((q) => (
            <TouchableOpacity key={q.title} style={styles.quizCard} activeOpacity={0.8}
              onPress={() => router.push(Routes.QUIZ_LOBBY)}
            >
              <View style={styles.quizThumb}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {q.rating}</Text>
                </View>
              </View>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle} numberOfLines={2}>{q.title}</Text>
                <Text style={styles.quizMeta}>{q.meta}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gợi ý cho bạn</Text>
          <View style={styles.recommendGrid}>
            <TouchableOpacity style={[styles.recommendCard, { backgroundColor: Colors.primarySurface }]}>
              <Text style={styles.recommendIcon}>💬</Text>
              <Text style={styles.recommendTitle}>IELTS Speaking Part 1</Text>
              <Text style={styles.recommendDesc}>Học là để đi làm & Phát triển bản thân</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.recommendCard, { backgroundColor: Colors.yellowBg }]}>
              <Text style={styles.recommendIcon}>📊</Text>
              <Text style={styles.recommendTitle}>Mới giỏi</Text>
              <Text style={styles.recommendDesc}>Với trắc nghiệm căng thẳng chua chát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  searchInput: { flex: 1 },
  filterBtn: { padding: Spacing.sm },
  filterIcon: { fontSize: 22, color: Colors.primary },
  scroll: { paddingHorizontal: Spacing.xl, paddingBottom: 100, gap: Spacing.xl },
  featuredCard: {
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  featuredBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
  },
  featuredBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary },
  featuredTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  featuredDesc: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 20 },
  featuredBtn: {
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    alignSelf: 'flex-start',
    marginTop: Spacing.xs,
  },
  featuredBtnText: { fontWeight: '700', color: Colors.primary, fontSize: 14 },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  seeAll: { fontSize: 14, fontWeight: '600', color: Colors.primary },
  subjectGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  subjectCell: {
    width: '18%',
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  subjectIcon: { fontSize: 24 },
  subjectName: { fontSize: 10, fontWeight: '600', color: Colors.textPrimary, textAlign: 'center' },
  quizCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.card,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  quizThumb: {
    height: 120,
    backgroundColor: Colors.primaryMuted,
  },
  ratingBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  ratingText: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  quizInfo: { padding: Spacing.base, gap: Spacing.xs },
  quizTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  quizMeta: { fontSize: 12, color: Colors.textMuted },
  recommendGrid: { flexDirection: 'row', gap: Spacing.md },
  recommendCard: {
    flex: 1,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.xs,
  },
  recommendIcon: { fontSize: 28, marginBottom: Spacing.xs },
  recommendTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  recommendDesc: { fontSize: 11, color: Colors.textSecondary, lineHeight: 16 },
});
