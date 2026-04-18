// Converted from: TaoLopHocMoi.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AppHeader } from '../../components/ui/AppHeader';

const GRADES = ['GR1', 'GR2', 'GR3', 'UNI+'];
const METHODS = [
  { icon: '🔗', label: 'Share Link' },
  { icon: '📱', label: 'QR Code' },
  { icon: '✉️', label: 'Email List' },
];

export default function CreateClassroomScreen() {
  const router = useRouter();
  const [className, setClassName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('GR1');

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <AppHeader title="Tạo lớp học mới" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.titleBlack}>Launch a New</Text>
          <Text style={styles.titlePurple}>Classroom</Text>
          <Text style={styles.subtitle}>Empower your students with a collaborative learning space.</Text>
        </View>

        {/* Class Identity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionTitle}>Class Identity</Text>
          </View>
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Class Name</Text>
            <TextInput style={styles.textInput} placeholder="e.g., Advanced Quantum Mechanics" placeholderTextColor={Colors.textMuted} value={className} onChangeText={setClassName} />
          </View>
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Subject</Text>
            <TouchableOpacity style={styles.selectBtn}>
              <Text style={styles.selectText}>Mathematics</Text>
              <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>Grade Level</Text>
            <View style={styles.gradeRow}>
              {GRADES.map((g) => (
                <TouchableOpacity key={g} style={[styles.gradeBtn, selectedGrade === g && styles.gradeBtnActive]} onPress={() => setSelectedGrade(g)}>
                  <Text style={[styles.gradeBtnText, selectedGrade === g && styles.gradeBtnTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Distribution */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionTitle}>Distribution Methods</Text>
          </View>
          <View style={styles.methodsRow}>
            {METHODS.map((m) => (
              <TouchableOpacity key={m.label} style={styles.methodCard}>
                <View style={styles.methodIcon}><Text style={styles.methodIconText}>{m.icon}</Text></View>
                <Text style={styles.methodLabel}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Access code */}
        <LinearGradient colors={[Colors.primary, '#5b2ac5']} style={styles.codeCard}>
          <Text style={styles.codeLabel}>Class Access Code</Text>
          <Text style={styles.codeValue}>VX-7729</Text>
          <TouchableOpacity style={styles.copyBtn}>
            <Text style={styles.copyBtnText}>📋  Copy Code</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Status */}
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Class system is ready</Text>
        </View>

        <PrimaryButton label="CREATE CLASS" onPress={() => router.back()} />
        <TouchableOpacity style={styles.draftBtn} onPress={() => router.back()}>
          <Text style={styles.draftBtnText}>Save as Draft</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  titleBlock: { gap: 2 },
  titleBlack: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary },
  titlePurple: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: Spacing.xs, lineHeight: 22 },
  section: { gap: Spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  sectionBar: { width: 4, height: 24, borderRadius: 2, backgroundColor: Colors.primary },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  fieldBlock: { gap: Spacing.xs },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  textInput: { backgroundColor: Colors.white, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, fontSize: 15, color: Colors.textPrimary, borderWidth: 2, borderColor: Colors.primarySurface },
  selectBtn: { backgroundColor: Colors.white, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 2, borderColor: Colors.primarySurface },
  selectText: { fontSize: 15, color: Colors.textPrimary },
  selectArrow: { fontSize: 14, color: Colors.textMuted },
  gradeRow: { flexDirection: 'row', gap: Spacing.md },
  gradeBtn: { flex: 1, paddingVertical: Spacing.md, borderRadius: Radius.pill, backgroundColor: Colors.primarySurface, alignItems: 'center' },
  gradeBtnActive: { backgroundColor: Colors.primary },
  gradeBtnText: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary },
  gradeBtnTextActive: { color: Colors.white },
  methodsRow: { flexDirection: 'row', gap: Spacing.md },
  methodCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius['2xl'], padding: Spacing.base, alignItems: 'center', gap: Spacing.sm, ...Shadow.sm },
  methodIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.primarySurface, alignItems: 'center', justifyContent: 'center' },
  methodIconText: { fontSize: 24 },
  methodLabel: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary },
  codeCard: { borderRadius: Radius['2xl'], padding: Spacing['2xl'], alignItems: 'center', gap: Spacing.base },
  codeLabel: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 0.8 },
  codeValue: { fontSize: 40, fontWeight: '900', color: Colors.white, letterSpacing: 4 },
  copyBtn: { backgroundColor: Colors.yellowAlt, borderRadius: Radius.pill, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, width: '100%', alignItems: 'center' },
  copyBtnText: { fontSize: 15, fontWeight: '700', color: Colors.yellowDark },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.white, borderRadius: Radius.xl, paddingHorizontal: Spacing.base, paddingVertical: Spacing.md },
  statusDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#22c55e' },
  statusText: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  draftBtn: { alignItems: 'center', paddingVertical: Spacing.md },
  draftBtnText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
});
