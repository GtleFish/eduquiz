// Entry point — renders splash directly (no redirect flash)
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import { Spacing, Radius } from '../constants/spacing';
import { Routes } from '../constants/routes';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to onboarding after 3 second
    const t = setTimeout(() => {
      router.replace(Routes.ONBOARDING);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primary, '#8b5cf6']}
      style={styles.container}
    >
      {/* Logo card */}
      <View style={styles.logoCard}>
        <Text style={styles.logoLetter}>E</Text>
        <Text style={styles.logoEmoji}>🎓</Text>
      </View>

      <Text style={styles.brandName}>EduQuiz</Text>

      {/* Tagline pill */}
      <View style={styles.tagline}>
        <Text style={styles.taglineText}>⚡  Học là vui!</Text>
      </View>

      {/* Loading dots */}
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  logoCard: {
    width: 160,
    height: 160,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: 80,
    fontWeight: '900',
    color: Colors.white,
    lineHeight: 90,
  },
  logoEmoji: {
    position: 'absolute',
    top: 8,
    right: -10,
    fontSize: 36,
  },
  brandName: {
    fontSize: 40,
    fontWeight: '800',
    color: Colors.white,
  },
  tagline: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 999,
  },
  taglineText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.base,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.yellow,
  },
});
