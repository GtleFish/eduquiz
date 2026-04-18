// Converted from: TimKiem.tsx + KetQuaTimKiem.tsx + BoLocTimKiem.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

const RECENT = ['Giới tích 12', 'Lịch sử thế giới', 'Từ vựng IELTS'];
const SUGGESTIONS = [
  { category: 'NGOẠI NGỮ', title: 'Tiếng Anh Giao Tiếp Cơ Bản', questions: '24 Câu hỏi', views: '1.2k Lượt xem', bg: Colors.primarySurface, icon: '🌐' },
  { category: 'TOÁN HỌC', title: 'Dao Hàm & Tích Phân 11', questions: '18 Câu hỏi', views: '850 Lượt xem', bg: Colors.yellowBg, icon: '📐' },
  { category: 'KHOA HỌC', title: 'Hệ Mặt Trời & Vũ Trụ', questions: '20 Câu hỏi', views: '2.5k Lượt xem', bg: '#fee2e2', icon: '🔬' },
  { category: 'LỊCH SỬ', title: 'Văn Minh Cổ Đại Thế Giới', questions: '30 Câu hỏi', views: '1.8k Lượt xem', bg: Colors.primarySurface, icon: '📜' },
];
const RESULTS = [
  { title: 'Đại chiến Thế giới I: Những bước ngoặt quan trọng', author: 'Thầy Huy Hoàng', meta: '📝 30 Câu  •  Khó', badge: 'MỚI NHẤT' },
  { title: 'Văn Khố Phục Hưng tại Ý', author: 'Khoa Lịch sử', meta: '', badge: 'THỊNH HÀNH' },
  { title: 'Bí ẩn Kim tự tháp Ai Cập', author: '', meta: '📝 22 Câu  •  ⏱ 15 Phút', badge: '⭐' },
  { title: 'Lịch sử Việt Nam: Triều Nguyễn', author: '', meta: '📝 25 Câu', badge: 'PHỔ BIẾN' },
];
const DIFFICULTIES = ['Dễ', 'Trung bình', 'Khó'];
const SORT_OPTIONS = ['Mới nhất', 'Chơi nhiều nhất', 'Đánh giá cao'];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [difficulty, setDifficulty] = useState('Trung bình');
  const [sortBy, setSortBy] = useState('Chơi nhiều nhất');
  const hasResults = query.length > 0;

  return (
    <View style={styles.screen}>
      <AppHeader title="Tìm kiếm" onBack={() => router.back()} />
      {/* Search bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchInput}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchTextInput}
            placeholder="Tìm kiếm quiz, chủ đề..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity onPress={() => { setQuery(''); }}>
          <Text style={styles.cancelText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      {hasResults ? (
        /* Results view */
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.resultsHeader}>
            <View>
              <Text style={styles.resultsFor}>Kết quả cho</Text>
              <Text style={styles.resultsQuery}>"{query}"</Text>
            </View>
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterChip} onPress={() => setShowFilter(true)}>
              <Text style={styles.filterChipText}>Môn học ▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip} onPress={() => setShowFilter(true)}>
              <Text style={styles.filterChipText}>Độ khó ▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip} onPress={() => setShowFilter(true)}>
              <Text style={styles.filterChipText}>Số câu</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.resultCount}>Tìm thấy 124 quiz</Text>
          {RESULTS.map((r) => (
            <TouchableOpacity key={r.title} style={styles.resultCard} activeOpacity={0.8}>
              <View style={styles.resultThumb}>
                <View style={styles.resultBadge}><Text style={styles.resultBadgeText}>{r.badge}</Text></View>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle} numberOfLines={2}>{r.title}</Text>
                {r.author ? <Text style={styles.resultAuthor}>{r.author}</Text> : null}
                {r.meta ? <Text style={styles.resultMeta}>{r.meta}</Text> : null}
              </View>
              <Text style={styles.resultArrow}>→</Text>
            </TouchableOpacity>
          ))}
          <PrimaryButton label="Xem thêm kết quả  ↓" onPress={() => {}} />
        </ScrollView>
      ) : (
        /* Empty / suggestions view */
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.recentBlock}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Tìm kiếm gần đây</Text>
              <TouchableOpacity><Text style={styles.clearAll}>XÓA TẤT CẢ</Text></TouchableOpacity>
            </View>
            <View style={styles.recentTags}>
              {RECENT.map((r) => (
                <TouchableOpacity key={r} style={styles.recentTag} onPress={() => setQuery(r)}>
                  <Text style={styles.recentTagIcon}>🔍</Text>
                  <Text style={styles.recentTagText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.suggestionsBlock}>
            <Text style={styles.suggestionsTitle}>Gợi ý cho bạn</Text>
            {SUGGESTIONS.map((s) => (
              <TouchableOpacity key={s.title} style={styles.suggestionCard} onPress={() => setQuery(s.title)} activeOpacity={0.8}>
                <View style={[styles.suggestionIcon, { backgroundColor: s.bg }]}>
                  <Text style={styles.suggestionIconText}>{s.icon}</Text>
                </View>
                <View style={styles.suggestionInfo}>
                  <Text style={styles.suggestionCategory}>{s.category}</Text>
                  <Text style={styles.suggestionTitle}>{s.title}</Text>
                  <Text style={styles.suggestionMeta}>📝 {s.questions}  •  👁 {s.views}</Text>
                </View>
                <Text style={styles.suggestionArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          <LinearGradient colors={[Colors.primary, Colors.primaryGradientEnd]} style={styles.challengeBanner}>
            <Text style={styles.challengeTitle}>Thách Thức Tuần Này!</Text>
            <Text style={styles.challengeDesc}>Tham gia giải đố chủ đề 'Trí Tuệ Nhân Tạo' để nhận huy hiệu đặc biệt.</Text>
            <TouchableOpacity style={styles.challengeBtn}>
              <Text style={styles.challengeBtnText}>Khám phá ngay</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      )}

      {/* Filter Modal */}
      <Modal visible={showFilter} transparent animationType="slide" onRequestClose={() => setShowFilter(false)}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setShowFilter(false)} />
        <View style={styles.filterSheet}>
          <View style={styles.filterHandle} />
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Bộ lọc tìm kiếm</Text>
            <TouchableOpacity onPress={() => setShowFilter(false)}>
              <Text style={styles.filterClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionLabel}>Độ khó</Text>
            <View style={styles.filterRow}>
              {DIFFICULTIES.map((d) => (
                <TouchableOpacity key={d} style={[styles.filterChipLg, difficulty === d && styles.filterChipLgActive]} onPress={() => setDifficulty(d)}>
                  <Text style={[styles.filterChipLgText, difficulty === d && styles.filterChipLgTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionLabel}>Sắp xếp theo</Text>
            {SORT_OPTIONS.map((s) => (
              <TouchableOpacity key={s} style={[styles.sortOption, sortBy === s && styles.sortOptionActive]} onPress={() => setSortBy(s)}>
                <Text style={styles.sortOptionText}>{s}</Text>
                <View style={[styles.radioCircle, sortBy === s && styles.radioCircleActive]}>
                  {sortBy === s && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <PrimaryButton label="Áp dụng bộ lọc" onPress={() => setShowFilter(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  searchInput: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md },
  searchIcon: { fontSize: 18, color: Colors.primary },
  searchTextInput: { flex: 1, fontSize: 15, color: Colors.textPrimary },
  cancelText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  resultsHeader: { gap: Spacing.xs },
  resultsFor: { fontSize: 12, color: Colors.textMuted, textTransform: 'uppercase' },
  resultsQuery: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  filterRow: { flexDirection: 'row', gap: Spacing.sm },
  filterChip: { backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs },
  filterChipText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  resultCount: { fontSize: 13, color: Colors.textSecondary },
  resultCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], overflow: 'hidden', ...Shadow.sm },
  resultThumb: { height: 120, backgroundColor: Colors.primaryMuted, position: 'relative' },
  resultBadge: { position: 'absolute', top: Spacing.md, left: Spacing.md, backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs },
  resultBadgeText: { fontSize: 11, fontWeight: '700', color: Colors.textPrimary },
  resultInfo: { padding: Spacing.base, gap: Spacing.xs },
  resultTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  resultAuthor: { fontSize: 13, color: Colors.textSecondary },
  resultMeta: { fontSize: 12, color: Colors.textMuted },
  resultArrow: { fontSize: 18, color: Colors.primary, paddingHorizontal: Spacing.base, paddingBottom: Spacing.base },
  recentBlock: { gap: Spacing.md },
  recentHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  recentTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  clearAll: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  recentTags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  recentTag: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs },
  recentTagIcon: { fontSize: 14 },
  recentTagText: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  suggestionsBlock: { gap: Spacing.md },
  suggestionsTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary },
  suggestionCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.base, ...Shadow.sm },
  suggestionIcon: { width: 56, height: 56, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  suggestionIconText: { fontSize: 28 },
  suggestionInfo: { flex: 1 },
  suggestionCategory: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  suggestionTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  suggestionMeta: { fontSize: 12, color: Colors.textMuted },
  suggestionArrow: { fontSize: 18, color: Colors.primary },
  challengeBanner: { borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md },
  challengeTitle: { fontSize: 22, fontWeight: '700', color: Colors.white },
  challengeDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  challengeBtn: { backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, alignSelf: 'flex-start' },
  challengeBtnText: { fontSize: 14, fontWeight: '700', color: Colors.yellowDark },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  filterSheet: { backgroundColor: Colors.white, borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  filterHandle: { width: 48, height: 6, borderRadius: 3, backgroundColor: Colors.primaryMuted, alignSelf: 'center', marginBottom: Spacing.sm },
  filterHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  filterTitle: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  filterClose: { fontSize: 22, color: Colors.primary },
  filterSection: { gap: Spacing.md },
  filterSectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  filterChipLg: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  filterChipLgActive: { backgroundColor: Colors.primary },
  filterChipLgText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  filterChipLgTextActive: { color: Colors.white },
  sortOption: { backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sortOptionActive: { backgroundColor: Colors.primarySurface, borderWidth: 2, borderColor: Colors.primary },
  sortOptionText: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  radioCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.primaryMuted, alignItems: 'center', justifyContent: 'center' },
  radioCircleActive: { borderColor: Colors.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary },
});
