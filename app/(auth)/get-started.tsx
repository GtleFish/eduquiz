// Converted from: src/app/components/GetStarted.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Spacing, Radius, Shadow } from '../../constants/spacing';
import { Routes } from '../../constants/routes';
import { PrimaryButton } from '../../components/ui/PrimaryButton';
import { AvatarGroup } from '../../components/ui/Avatar';

export default function GetStartedScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={[Colors.primary, Colors.primary]} style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>EduQuiz</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace(Routes.HOME)}>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      {/* Hero image */}
      <View style={styles.heroWrapper}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Floating badges */}
        <View style={styles.badgeTop}>
          <Text style={styles.badgeTopText}>🏆  TOP #1 Học Tập</Text>
        </View>
        <View style={styles.badgeBottom}>
          <Text style={styles.badgeBottomText}>🔥  Học mỗi ngày!</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Sẵn sàng chưa?</Text>
        <Text style={styles.description}>
          Tham gia EduQuiz ngay hôm nay để bắt đầu hành trình chinh phục tri thức!
          Hàng ngàn thử thách đang chờ đón bạn.
        </Text>
      </View>

      {/* CTA buttons */}
      <View style={styles.buttons}>
        <PrimaryButton
          label="Tạo tài khoản  →"
          onPress={() => router.push(Routes.REGISTER)}
          variant="yellow"
          style={styles.btnFull}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push(Routes.LOGIN)}
        >
          <Text style={styles.loginBtnText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>

      {/* Social proof */}
      <View style={styles.socialProof}>
        <AvatarGroup uris={[undefined, undefined, undefined]} size={36} />
        <Text style={styles.socialText}>+10k người đang học</Text>
      </View>

      {/* Progress dots */}
      <View style={styles.dots}>
        {[0, 1].map((i) => (
          <View key={i} style={styles.dotInactive} />
        ))}
        <View style={styles.dotActive} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: Spacing['2xl'] },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  backIcon: { fontSize: 22, color: 'rgba(255,255,255,0.7)' },
  logo: { fontSize: 18, fontWeight: '700', color: 'rgba(255,255,255,0.8)' },
  skipText: { fontSize: 15, color: 'rgba(255,255,255,0.6)' },
  heroWrapper: {
    marginHorizontal: Spacing.xl,
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    height: 240,
    backgroundColor: '#0d9488',
  },
  heroImage: { width: '100%', height: '100%' },
  badgeTop: {
    position: 'absolute',
    top: Spacing.base,
    right: Spacing.base,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    ...Shadow.sm,
  },
  badgeTopText: { fontWeight: '600', fontSize: 13, color: Colors.textPrimary },
  badgeBottom: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.base,
    backgroundColor: 'rgba(104,58,209,0.8)',
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
  },
  badgeBottomText: { fontWeight: '600', fontSize: 13, color: Colors.white },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  title: { fontSize: 40, fontWeight: '800', color: Colors.white, textAlign: 'center' },
  description: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttons: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    gap: Spacing.md,
  },
  btnFull: { alignSelf: 'stretch' },
  loginBtn: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: Radius.pill,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  loginBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.xl,
    opacity: 0.7,
  },
  socialText: { color: Colors.white, fontSize: 14 },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
  },
  dotActive: { width: 40, height: 8, borderRadius: 4, backgroundColor: Colors.yellowAlt },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
});
