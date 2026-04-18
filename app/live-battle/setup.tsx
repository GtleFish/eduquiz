// Converted from: ThietLapLiveBattle.tsx + ThamGiaLiveBattle.tsx + VinhDanhChienThang.tsx
// This file = host setup. Join and Victory are separate files.
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

const ROOM_SIZES = ['Small', 'Medium', 'Large'];
const MODES = [
  { icon: '⚡', label: 'Speed', bg: Colors.yellowAlt },
  { icon: '🥶', label: 'Chill', bg: Colors.white },
  { icon: '❌', label: 'None', bg: Colors.white },
];

export default function LiveBattleSetupScreen() {
  const router = useRouter();
  const [roomSize, setRoomSize] = useState('Medium');
  const [showScore, setShowScore] = useState(true);
  const [showRank, setShowRank] = useState(true);

  return (
    <View style={styles.screen}>
      <AppHeader title="Live Battle Setup" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Sẵn sàng cho</Text>
          <Text style={styles.titleYellow}>Live Battle?</Text>
          <Text style={styles.subtitle}>Thiết lập phòng chơi của bạn và mời người chơi tham gia.</Text>
        </View>

        {/* Quiz selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Chọn Quiz Card</Text>
          <TouchableOpacity style={[styles.quizCard, styles.quizCardSelected]}>
            <View style={styles.quizThumb} />
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>Hành Tinh Bí Ẩn</Text>
              <Text style={styles.quizMeta}>10 Câu hỏi</Text>
            </View>
            <View style={styles.checkCircle}><Text style={styles.checkIcon}>✓</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizCard}>
            <View style={styles.quizThumb} />
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>Toán Học Vui Nhộn</Text>
              <Text style={styles.quizMeta}>10 Câu hỏi</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Room size */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Kích thước phòng</Text>
          <View style={styles.roomSizeRow}>
            {ROOM_SIZES.map((s) => (
              <TouchableOpacity key={s} style={[styles.roomSizeBtn, roomSize === s && styles.roomSizeBtnActive]} onPress={() => setRoomSize(s)}>
                <Text style={[styles.roomSizeBtnText, roomSize === s && styles.roomSizeBtnTextActive]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mode */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ẩn hình ảnh đầu</Text>
          <View style={styles.modeRow}>
            {MODES.map((m) => (
              <TouchableOpacity key={m.label} style={[styles.modeCard, { backgroundColor: m.bg }]}>
                <Text style={styles.modeIcon}>{m.icon}</Text>
                <Text style={styles.modeLabel}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Leaderboard settings */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Cài đặt bảng xếp hạng</Text>
          <View style={styles.toggleCard}>
            <Text style={styles.toggleTitle}>Show Score</Text>
            <Switch value={showScore} onValueChange={setShowScore} trackColor={{ false: Colors.primaryMuted, true: Colors.primary }} thumbColor={Colors.white} />
          </View>
          <View style={styles.toggleCard}>
            <Text style={styles.toggleTitle}>Show Rank</Text>
            <Switch value={showRank} onValueChange={setShowRank} trackColor={{ false: Colors.primaryMuted, true: Colors.primary }} thumbColor={Colors.white} />
          </View>
          <Text style={styles.toggleNote}>Hiển thị điểm số và xếp hạng sau mỗi câu hỏi</Text>
        </View>

        <PrimaryButton label="🚀  Bắt đầu Lobby" onPress={() => router.push(Routes.PIN_CODE)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: 2 },
  titleBlack: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  titleYellow: { fontSize: 32, fontWeight: '800', color: Colors.yellowAlt },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: Spacing.xs, lineHeight: 22 },
  section: { gap: Spacing.md },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 },
  quizCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.base, ...Shadow.sm },
  quizCardSelected: { borderWidth: 2, borderColor: Colors.primary },
  quizThumb: { width: 64, height: 64, borderRadius: Radius.lg, backgroundColor: Colors.textPrimary, flexShrink: 0 },
  quizInfo: { flex: 1 },
  quizTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  quizMeta: { fontSize: 13, color: Colors.textSecondary },
  checkCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  checkIcon: { fontSize: 12, color: Colors.white, fontWeight: '700' },
  roomSizeRow: { flexDirection: 'row', gap: Spacing.md },
  roomSizeBtn: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  roomSizeBtnActive: { backgroundColor: Colors.primary },
  roomSizeBtnText: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  roomSizeBtnTextActive: { color: Colors.white },
  modeRow: { flexDirection: 'row', gap: Spacing.md },
  modeCard: { flex: 1, borderRadius: Radius.xl, padding: Spacing.base, alignItems: 'center', gap: Spacing.xs, borderWidth: 1, borderColor: Colors.border },
  modeIcon: { fontSize: 28 },
  modeLabel: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  toggleCard: { backgroundColor: Colors.white, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', ...Shadow.sm },
  toggleTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  toggleNote: { fontSize: 12, color: Colors.textMuted, textAlign: 'center' },
});
