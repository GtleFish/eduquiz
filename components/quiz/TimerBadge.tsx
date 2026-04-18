import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Radius, Spacing } from '../../constants/spacing';

interface Props {
  seconds: number;
  warning?: boolean;
}

export function TimerBadge({ seconds, warning = seconds <= 5 }: Props) {
  return (
    <View style={[styles.pill, warning && styles.pillWarning]}>
      <Text style={styles.icon}>⏱</Text>
      <Text style={[styles.text, warning && styles.textWarning]}>{seconds}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primaryMuted,
  },
  pillWarning: {
    backgroundColor: '#fff1f2',
    borderColor: '#fecdd3',
  },
  icon: { fontSize: 18 },
  text: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primary,
    minWidth: 48,
    textAlign: 'center',
  },
  textWarning: { color: Colors.error },
});
