// Converted from: DangTai.tsx — Skeleton loading screen
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';

function SkeletonBox({ width, height, style }: { width: number | string; height: number; style?: object }) {
  return (
    <View
      style={[
        styles.skeleton,
        { width: width as any, height, borderRadius: Radius.xl },
        style,
      ]}
    />
  );
}

export function LoadingScreen() {
  return (
    <View style={styles.screen}>
      {/* Header skeleton */}
      <View style={styles.header}>
        <SkeletonBox width={200} height={24} />
        <SkeletonBox width={40} height={40} style={{ borderRadius: 20 }} />
      </View>

      <View style={styles.content}>
        {/* Title skeletons */}
        <View style={styles.titleBlock}>
          <SkeletonBox width={240} height={36} />
          <SkeletonBox width={160} height={24} style={{ opacity: 0.6 }} />
          <SkeletonBox width={120} height={36} style={{ borderRadius: Radius.pill }} />
        </View>

        {/* Large card skeleton */}
        <SkeletonBox width="100%" height={260} style={{ borderRadius: 40 }} />

        {/* Medium card skeleton */}
        <SkeletonBox width="100%" height={200} style={{ borderRadius: 40 }} />

        {/* Category chips */}
        <View style={styles.chipsRow}>
          <SkeletonBox width={120} height={44} style={{ borderRadius: Radius.pill }} />
          <SkeletonBox width={140} height={44} style={{ borderRadius: Radius.pill }} />
          <SkeletonBox width={100} height={44} style={{ borderRadius: Radius.pill }} />
        </View>

        {/* List items */}
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.listItem}>
            <SkeletonBox width={88} height={88} style={{ borderRadius: Radius['2xl'] }} />
            <View style={styles.listItemText}>
              <SkeletonBox width={140} height={20} />
              <SkeletonBox width={100} height={16} style={{ opacity: 0.5 }} />
              <View style={styles.listItemTags}>
                <SkeletonBox width={48} height={18} style={{ borderRadius: Radius.pill }} />
                <SkeletonBox width={64} height={18} style={{ borderRadius: Radius.pill }} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.primaryBg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  content: { padding: Spacing.xl, gap: Spacing.xl },
  titleBlock: { gap: Spacing.md },
  chipsRow: { flexDirection: 'row', gap: Spacing.md },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl, backgroundColor: Colors.primarySurface, borderRadius: Radius['2xl'], padding: Spacing.base },
  listItemText: { flex: 1, gap: Spacing.sm },
  listItemTags: { flexDirection: 'row', gap: Spacing.sm },
  skeleton: { backgroundColor: Colors.primaryMuted },
});
