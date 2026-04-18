// Converted from: src/app/components/BoSuuTapCuaToi.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';

const COLLECTIONS = [
  { title: 'Ôn tập Toán cao cấp 1', meta: '8 Bài • Nguyễn Văn A', icon: '📊', colors: ['#1e0a3c', '#4c1d95'] as [string, string] },
  { title: 'Mastering JavaScript ES6+', meta: '18 Bài • Alex Kuang', icon: '💻', colors: ['#500724', '#4c1d95'] as [string, string] },
  { title: 'Lịch sử Việt Nam hiện đại', meta: '6 Bài • Trần B', icon: '📜', colors: ['#78350f', '#c2410c'] as [string, string] },
];

export default function CollectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader title="Cài đặt" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Bộ sưu tập</Text>
          <Text style={styles.titlePurple}>Của tôi</Text>
          <Text style={styles.subtitle}>Nơi lưu trữ những bộ đề bạn lưu hoặc đã tạo bởi bản thân.</Text>
        </View>

        {/* Create button */}
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push(Routes.CREATE_NEW)}
        >
          <Text style={styles.createBtnText}>➕  TẠO BỘ QUIZ MỚI</Text>
        </TouchableOpacity>

        {/* Collection cards */}
        <View style={styles.cardList}>
          {COLLECTIONS.map((c) => (
            <LinearGradient key={c.title} colors={c.colors} style={styles.collectionCard}>
              <View style={styles.cardBadge}>
                <Text style={styles.cardBadgeText}>Riêng tư</Text>
              </View>
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardMeta}>{c.meta}</Text>
              <TouchableOpacity style={styles.cardBtn}>
                <Text style={styles.cardBtnText}>Xem chi tiết</Text>
              </TouchableOpacity>
              <Text style={styles.cardBgIcon}>{c.icon}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Empty state */}
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>➕</Text>
          </View>
          <Text style={styles.emptyTitle}>Thêm bộ sưu tập mới!</Text>
          <Text style={styles.emptyDesc}>Bắt đầu tạo và lưu trữ các bộ câu hỏi để sử dụng sau.</Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => router.push(Routes.CREATE_NEW)}
          >
            <Text style={styles.emptyBtnText}>+ Tạo bộ sưu tập mới</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: 2 },
  titleBlack: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  titlePurple: { fontSize: 32, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.sm },
  subtitle: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  createBtn: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    flexDirection: 'row', justifyContent: 'center', gap: Spacing.sm,
  },
  createBtnText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  cardList: { gap: Spacing.md },
  collectionCard: {
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.sm,
    overflow: 'hidden',
  },
  cardBadge: {
    backgroundColor: Colors.yellowAlt,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
    alignSelf: 'flex-start',
  },
  cardBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.yellowDark, textTransform: 'uppercase' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  cardMeta: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  cardBtn: {
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm,
    alignSelf: 'flex-start', marginTop: Spacing.sm,
  },
  cardBtnText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  cardBgIcon: { position: 'absolute', top: Spacing.base, right: Spacing.base, fontSize: 56, opacity: 0.2 },
  emptyCard: {
    backgroundColor: Colors.white,
    borderWidth: 2, borderColor: Colors.primaryMuted,
    borderStyle: 'dashed',
    borderRadius: Radius['2xl'],
    padding: Spacing['2xl'],
    alignItems: 'center', gap: Spacing.md,
  },
  emptyIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyIconText: { fontSize: 28 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  emptyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
  },
  emptyBtnText: { fontSize: 14, fontWeight: '700', color: Colors.white },
});
