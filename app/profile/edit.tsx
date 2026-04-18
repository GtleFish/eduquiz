// Converted from: src/app/components/ChinhSuaHoSo.tsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { PrimaryButton } from '../../components/ui/PrimaryButton';

const INTERESTS = ['Toán học', 'Vật lý', 'Tiếng Anh', 'Lịch sử'];

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Linh Nguyen');
  const [bio, setBio] = useState('Đam mê chinh phục mọi thử thách Quiz!');
  const [school, setSchool] = useState('Lưu Văn Lang');
  const [selectedInterests, setSelectedInterests] = useState(['Toán học', 'Tiếng Anh']);

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerLeft}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.headerTitle}>Cài đặt</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>EduQuiz</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar} />
            <TouchableOpacity style={styles.cameraBtn}>
              <Text style={styles.cameraBtnText}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.changeAvatarText}>Thay đổi ảnh đại diện</Text>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Display Name</Text>
            <TextInput
              style={styles.fieldInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Bio</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldTextArea]}
              value={bio}
              onChangeText={setBio}
              multiline
              textAlignVertical="top"
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Grade</Text>
            <TouchableOpacity style={styles.selectRow}>
              <Text style={styles.selectText}>Lớp 12</Text>
              <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>School</Text>
            <TextInput
              style={styles.fieldInput}
              value={school}
              onChangeText={setSchool}
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.fieldCard}>
            <Text style={styles.fieldLabel}>Sở thích học tập</Text>
            <View style={styles.interestRow}>
              {INTERESTS.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.interestTag,
                    selectedInterests.includes(item) && styles.interestTagActive,
                  ]}
                  onPress={() => toggleInterest(item)}
                >
                  <Text style={[
                    styles.interestTagText,
                    selectedInterests.includes(item) && styles.interestTagTextActive,
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.addInterestBtn}>
                <Text style={styles.addInterestText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <PrimaryButton label="Lưu thay đổi" onPress={() => router.back()} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    backgroundColor: 'rgba(250,245,255,0.7)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: Colors.primary },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  logo: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  scroll: { padding: Spacing.xl, gap: Spacing.xl, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', gap: Spacing.sm },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: Colors.textPrimary,
    borderWidth: 4, borderColor: Colors.primaryMuted,
  },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: Colors.primary,
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 4, borderColor: Colors.primaryBg,
    ...Shadow.md,
  },
  cameraBtnText: { fontSize: 20 },
  changeAvatarText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  formSection: { gap: Spacing.xl },
  fieldCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius['2xl'],
    padding: Spacing.xl,
    gap: Spacing.sm,
    borderWidth: 1, borderColor: 'rgba(187,164,210,0.1)',
  },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: '#67537c', textTransform: 'uppercase', letterSpacing: 0.8 },
  fieldInput: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    fontSize: 15, color: Colors.textPrimary,
  },
  fieldTextArea: { minHeight: 80, textAlignVertical: 'top' },
  selectRow: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  selectText: { fontSize: 15, color: Colors.textPrimary },
  selectArrow: { fontSize: 14, color: '#836e99' },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  interestTag: {
    backgroundColor: Colors.primaryMuted,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.xs,
  },
  interestTagActive: { backgroundColor: Colors.primary },
  interestTagText: { fontSize: 14, fontWeight: '700', color: '#67537c' },
  interestTagTextActive: { color: Colors.white },
  addInterestBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.yellowAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  addInterestText: { fontSize: 20, fontWeight: '700', color: Colors.yellowDark },
});
