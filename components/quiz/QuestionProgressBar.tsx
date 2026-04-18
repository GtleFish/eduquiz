import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Radius, Spacing } from '../../constants/spacing';

interface Props {
  current: number;   // 1-based
  total: number;
  points: number;
  onClose: () => void;
  onMore?: () => void;
}

export function QuestionProgressBar({ current, total, points, onClose, onMore }: Props) {
  const progress = current / total;

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {/* Close */}
        <TouchableOpacity
          onPress={onClose}
          style={styles.iconBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        {/* Progress track */}
        <View style={styles.trackWrapper}>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{current}/{total}</Text>
        </View>

        {/* Points */}
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsText}>{points.toLocaleString()}</Text>
          <Text style={styles.pointsLabel}>pts</Text>
        </View>

        {onMore && (
          <TouchableOpacity
            onPress={onMore}
            style={styles.iconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeIcon}>⋯</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderMid,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
  trackWrapper: {
    flex: 1,
    gap: 4,
  },
  track: {
    height: 6,
    backgroundColor: Colors.primaryMuted,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    textAlign: 'center',
  },
  pointsBadge: {
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    alignItems: 'center',
    minWidth: 56,
  },
  pointsText: { fontSize: 14, fontWeight: '800', color: Colors.primary },
  pointsLabel: { fontSize: 9, fontWeight: '700', color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
});
