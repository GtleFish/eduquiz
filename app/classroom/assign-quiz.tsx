// Converted from: GiaoBaiTapQuiz.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const QUIZZES = [
  { icon: '⚛️', title: 'Quantum Mechanics', sub: 'Basics', meta: '20 Questions • 45 Minutes • Physics Grade 12', selected: true, iconBg: Colors.primarySurface },
  { icon: '📚', title: 'Vietnamese Literature:', sub: '1945-1975', meta: '20 Questions • 60 Minutes • Literature', selected: false, iconBg: '#fce7f3' },
  { icon: '∫', title: 'Calculus: Integration', sub: 'Mastery', meta: '10 Questions • 30 Minutes • Advanced Math', selected: false, iconBg: Colors.primarySurface },
];

const ATTEMPTS = ['1', '2', '3', '∞'];

export default function AssignQuizScreen() {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [selectedAttempts, setSelectedAttempts] = useState(1);
  const [releaseResults, setReleaseResults] = useState(true);
  const [releaseImmediate, setReleaseImmediate] = useState(true);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar} />
          <Text style={styles.headerTitle}>Teacher Portal</Text>
        </View>
        <TouchableOpacity><Text style={styles.menuIcon}>☰</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleLabel}>New Assignment</Text>
          <Text style={styles.title}>Assign Quiz</Text>
        </View>

        {/* Step tabs */}
        <View style={styles.stepRow}>
          <View style={styles.stepBtnActive}><Text style={styles.stepBtnActiveText}>1  Select Quiz</Text></View>
          <View style={styles.stepBtn}><Text style={styles.stepBtnText}>2  Settings</Text></View>
        </View>

        {/* Quiz library */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quiz Library</Text>
            <TouchableOpacity><Text style={styles.searchLink}>🔍  Search</Text></TouchableOpacity>
          </View>
          {QUIZZES.map((q, i) => (
            <TouchableOpacity
              key={q.title}
              style={[styles.quizCard, selectedQuiz === i && styles.quizCardSelected]}
              onPress={() => setSelectedQuiz(i)}
              activeOpacity={0.8}
            >
              <View style={[styles.quizIcon, { backgroundColor: q.iconBg }]}>
                <Text style={styles.quizIconText}>{q.icon}</Text>
              </View>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{q.title}</Text>
                <Text style={styles.quizSub}>{q.sub}</Text>
                <Text style={styles.quizMeta}>{q.meta}</Text>
              </View>
              {selectedQuiz === i && (
                <View style={styles.checkCircle}><Text style={styles.checkIcon}>✓</Text></View>
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.createQuizBtn} onPress={() => router.push(Routes.CREATE_NEW)}>
            <Text style={styles.createQuizBtnText}>+  Create New Quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️  Assignment Settings</Text>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Submission Deadline</Text>
            <TextInput style={styles.settingInput} placeholder="mm/dd/yyyy" placeholderTextColor={Colors.textMuted} />
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Time limit (Per Question)</Text>
            <View style={styles.timeRow}>
              <TextInput style={[styles.settingInput, { flex: 1, textAlign: 'center' }]} defaultValue="60" keyboardType="number-pad" />
              <Text style={styles.secondsLabel}>seconds</Text>
            </View>
          </View>
          <View style={styles.settingCard}>
            <Text style={styles.settingLabel}>Allowed Attempts</Text>
            <View style={styles.attemptsRow}>
              {ATTEMPTS.map((a, i) => (
                <TouchableOpacity key={a} style={[styles.attemptBtn, selectedAttempts === i && styles.attemptBtnActive]} onPress={() => setSelectedAttempts(i)}>
                  <Text style={[styles.attemptBtnText, selectedAttempts === i && styles.attemptBtnTextActive]}>{a}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.settingCard}>
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleTitle}>Release Results</Text>
                <Text style={styles.toggleDesc}>Toggle when students see scores</Text>
              </View>
              <Switch value={releaseResults} onValueChange={setReleaseResults} trackColor={{ false: Colors.primaryMuted, true: Colors.primary }} thumbColor={Colors.white} />
            </View>
          </View>
          <View style={styles.releaseRow}>
            <TouchableOpacity style={[styles.releaseBtn, releaseImmediate && styles.releaseBtnActive]} onPress={() => setReleaseImmediate(true)}>
              <Text style={[styles.releaseBtnText, releaseImmediate && styles.releaseBtnTextActive]}>Immediately</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.releaseBtn, !releaseImmediate && styles.releaseBtnActive]} onPress={() => setReleaseImmediate(false)}>
              <Text style={[styles.releaseBtnText, !releaseImmediate && styles.releaseBtnTextActive]}>After Deadline</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton label="🚀  Finalize & Assign" onPress={() => router.back()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  menuIcon: { fontSize: 22, color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: Spacing.xs },
  titleLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  stepRow: { flexDirection: 'row', gap: Spacing.md },
  stepBtnActive: { flex: 1, backgroundColor: Colors.primary, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  stepBtnActiveText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  stepBtn: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  stepBtnText: { color: Colors.textSecondary, fontWeight: '600', fontSize: 14 },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  searchLink: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  quizCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, ...Shadow.sm },
  quizCardSelected: { borderWidth: 2, borderColor: Colors.primary },
  quizIcon: { width: 48, height: 48, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  quizIconText: { fontSize: 24 },
  quizInfo: { flex: 1 },
  quizTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  quizSub: { fontSize: 13, color: Colors.textSecondary },
  quizMeta: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  checkCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  checkIcon: { fontSize: 12, color: Colors.white, fontWeight: '700' },
  createQuizBtn: { backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  createQuizBtnText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  settingCard: { backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.xl, gap: Spacing.md, ...Shadow.sm },
  settingLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  settingInput: { backgroundColor: Colors.primarySurface, borderRadius: Radius.lg, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, fontSize: 15, color: Colors.textPrimary },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  secondsLabel: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary },
  attemptsRow: { flexDirection: 'row', gap: Spacing.md },
  attemptBtn: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  attemptBtnActive: { backgroundColor: Colors.primary },
  attemptBtnText: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  attemptBtnTextActive: { color: Colors.white },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggleTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  toggleDesc: { fontSize: 13, color: Colors.textSecondary },
  releaseRow: { flexDirection: 'row', gap: Spacing.md },
  releaseBtn: { flex: 1, backgroundColor: Colors.primarySurface, borderRadius: Radius.pill, paddingVertical: Spacing.md, alignItems: 'center' },
  releaseBtnActive: { backgroundColor: Colors.primary },
  releaseBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  releaseBtnTextActive: { color: Colors.white },
});
