// Converted from: src/app/components/CaiDatXuatBan.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { AppHeader } from '../../components/ui/AppHeader';

export default function PublishSettingsScreen() {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <View style={styles.screen}>
      <AppHeader
        title="EduQuiz"
        onBack={() => router.back()}
        rightElement={
          <TouchableOpacity style={styles.publishBtn} onPress={() => router.replace(Routes.HOME)}>
            <Text style={styles.publishBtnText}>Publish</Text>
          </TouchableOpacity>
        }
        variant="quiz"
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.headerLabel}>Final Step</Text>
          <Text style={styles.headerTitle}>Publish Your Quiz</Text>
          <Text style={styles.headerDesc}>
            Configure how your students and the world will experience your creation.
          </Text>
        </View>

        {/* Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionIcon}>📅</Text>
            <View>
              <Text style={styles.sectionTitle}>Schedule publish</Text>
              <Text style={styles.sectionDesc}>Set a specific date and time for your quiz to go live.</Text>
            </View>
          </View>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleField}>
              <Text style={styles.scheduleFieldLabel}>Date</Text>
              <TextInput
                style={styles.scheduleInput}
                placeholder="mm/dd/yyyy"
                placeholderTextColor={Colors.textMuted}
                value={date}
                onChangeText={setDate}
              />
            </View>
            <View style={styles.scheduleField}>
              <Text style={styles.scheduleFieldLabel}>Time</Text>
              <TextInput
                style={styles.scheduleInput}
                placeholder="--:--AM"
                placeholderTextColor={Colors.textMuted}
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>
        </View>

        {/* Share link */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionIcon}>🔗</Text>
            <Text style={styles.sectionTitle}>Copy share link</Text>
          </View>
          <View style={styles.linkCard}>
            <Text style={styles.linkText}>eduquiz.io/q/7k92-kLq0</Text>
            <TouchableOpacity>
              <Text style={styles.copyIcon}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Embed */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionIcon}>📟</Text>
            <Text style={styles.sectionTitle}>Get embed code</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewSnippet}>🔍 View Snippet</Text>
          </TouchableOpacity>
        </View>

        {/* Assign to class */}
        <View style={styles.section}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionIcon}>👥</Text>
            <View>
              <Text style={styles.sectionTitle}>Assign to class</Text>
              <Text style={styles.sectionDesc}>Automatically notify your existing classrooms.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.selectBtn}>
            <Text style={styles.selectBtnText}>Select a class...</Text>
            <Text style={styles.selectArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Public toggle */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleIcon}>
            <Text style={styles.toggleIconText}>✓</Text>
          </View>
          <View style={styles.toggleText}>
            <Text style={styles.toggleTitle}>Public Quiz</Text>
            <Text style={styles.toggleDesc}>Allow others to find and play your quiz.</Text>
          </View>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: Colors.primaryMuted, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
      </ScrollView>

      {/* Publish button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => router.replace(Routes.HOME)}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.publishGradient}
          >
            <Text style={styles.publishGradientIcon}>🚀</Text>
            <Text style={styles.publishGradientText}>Xuất bản</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.publishNote}>
          By publishing, you agree to our Content Creator Terms.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  publishBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  publishBtnText: { fontSize: 14, fontWeight: '700', color: Colors.white },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 120 },
  headerBlock: { gap: Spacing.sm },
  headerLabel: { fontSize: 11, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary },
  headerDesc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  section: { gap: Spacing.md },
  sectionTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md },
  sectionIcon: { fontSize: 24, marginTop: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  sectionDesc: { fontSize: 13, color: Colors.textSecondary },
  scheduleCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  scheduleField: { gap: Spacing.xs },
  scheduleFieldLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase' },
  scheduleInput: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    fontSize: 15, color: Colors.textPrimary,
  },
  linkCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  linkText: { fontSize: 14, color: Colors.primary, fontFamily: 'monospace' },
  copyIcon: { fontSize: 20 },
  viewSnippet: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  selectBtn: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 2, borderColor: Colors.primarySurface,
  },
  selectBtnText: { fontSize: 15, color: Colors.textSecondary },
  selectArrow: { fontSize: 14, color: Colors.primary },
  toggleCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    flexDirection: 'row', alignItems: 'center', gap: Spacing.base,
  },
  toggleIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#1e0a3c',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  toggleIconText: { fontSize: 22, color: Colors.white },
  toggleText: { flex: 1 },
  toggleTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  toggleDesc: { fontSize: 13, color: Colors.textSecondary },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopWidth: 1, borderTopColor: Colors.border,
    padding: Spacing.xl, gap: Spacing.sm,
  },
  publishGradient: {
    borderRadius: Radius.pill,
    paddingVertical: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
  },
  publishGradientIcon: { fontSize: 20 },
  publishGradientText: { fontSize: 16, fontWeight: '700', color: Colors.white },
  publishNote: { fontSize: 12, color: Colors.textMuted, textAlign: 'center' },
});
