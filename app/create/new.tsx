// Converted from: src/app/components/TaoQuizMoi.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';

const METHODS = [
  { icon: '📄', label: 'Import File', desc: 'Tải lên file có sẵn (PDF, DOCX, TXT)', route: '/create/import-file', iconBg: Colors.primarySurface },
  { icon: '📋', label: 'Dùng template', desc: 'Chọn từ thư viện mẫu có sẵn', route: '/create/template-library', iconBg: Colors.yellowBg },
  { icon: '✏️', label: 'Tự soạn', desc: 'Tạo từng câu hỏi thủ công', route: '/create/question-editor', iconBg: Colors.primarySurface },
];

export default function NewQuizScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <AppHeader
        title="Tạo Quiz Mới"
        onBack={() => router.back()}
        rightElement={
          <TouchableOpacity style={styles.saveBtn} onPress={() => {}}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        }
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Step header */}
        <View style={styles.stepBlock}>
          <Text style={styles.stepLabel}>Bước 1: Chọn phương thức</Text>
          <Text style={styles.stepTitle}>Chọn phương thức{'\n'}khởi tạo bài học</Text>
          <View style={styles.stepUnderline} />
        </View>

        {/* AI option */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryGradientEnd]}
          style={styles.aiCard}
        >
          <View style={styles.aiCardTop}>
            <View style={styles.aiIconWrapper}>
              <Text style={styles.aiIcon}>✨</Text>
            </View>
            <View style={styles.aiTextBlock}>
              <Text style={styles.aiTitle}>AI tạo hộ</Text>
              <Text style={styles.aiDesc}>
                Tự động tạo ra bộ câu hỏi thông minh dựa trên chủ đề và mục tiêu bạn đặt ra.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.aiBtn}
            onPress={() => router.push(Routes.CREATE_AI)}
            activeOpacity={0.85}
          >
            <Text style={styles.aiBtnText}>Bắt đầu với AI →</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Manual methods */}
        <View style={styles.methodList}>
          {METHODS.map((m) => (
            <TouchableOpacity
              key={m.label}
              style={styles.methodCard}
              onPress={() => router.push(m.route as any)}
              activeOpacity={0.8}
            >
              <View style={[styles.methodIcon, { backgroundColor: m.iconBg }]}>
                <Text style={styles.methodIconText}>{m.icon}</Text>
              </View>
              <View style={styles.methodText}>
                <Text style={styles.methodLabel}>{m.label}</Text>
                <Text style={styles.methodDesc}>{m.desc}</Text>
              </View>
              <Text style={styles.methodArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tip card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Mẹo từ EduQuiz</Text>
            <Text style={styles.tipDesc}>
              Với AI, bạn chỉ cần nhập chủ đề và mục tiêu, hệ thống sẽ tự động tạo bộ câu hỏi phù hợp trong vài giây!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  saveBtn: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  saveBtnText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  stepBlock: { gap: Spacing.sm },
  stepLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  stepTitle: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, lineHeight: 36 },
  stepUnderline: { width: 80, height: 4, borderRadius: Radius.pill, backgroundColor: Colors.primary },
  aiCard: { borderRadius: 40, padding: Spacing['2xl'], gap: Spacing.xl },
  aiCardTop: { flexDirection: 'row', gap: Spacing.base, alignItems: 'flex-start' },
  aiIconWrapper: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  aiIcon: { fontSize: 24 },
  aiTextBlock: { flex: 1, gap: Spacing.xs },
  aiTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  aiDesc: { fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 22 },
  aiBtn: {
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  aiBtnText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  methodList: { gap: Spacing.md },
  methodCard: {
    backgroundColor: Colors.white,
    borderRadius: 40, padding: Spacing.xl,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
    borderWidth: 2, borderColor: Colors.primarySurface,
    ...Shadow.sm,
  },
  methodIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  methodIconText: { fontSize: 24 },
  methodText: { flex: 1 },
  methodLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  methodDesc: { fontSize: 13, color: Colors.textSecondary },
  methodArrow: { fontSize: 18, color: Colors.primary },
  tipCard: {
    backgroundColor: Colors.yellowBg,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row', gap: Spacing.base,
    borderLeftWidth: 4, borderLeftColor: '#ca8a04',
  },
  tipIcon: { fontSize: 24 },
  tipText: { flex: 1, gap: Spacing.xs },
  tipTitle: { fontSize: 15, fontWeight: '700', color: Colors.yellowDark },
  tipDesc: { fontSize: 13, color: Colors.textPrimary, lineHeight: 20 },
});
