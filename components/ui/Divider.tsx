import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';

interface Props {
  label?: string;
}

export function Divider({ label }: Props) {
  if (!label) {
    return <View style={styles.line} />;
  }
  return (
    <View style={styles.row}>
      <View style={styles.flex} />
      <Text style={styles.text}>{label}</Text>
      <View style={styles.flex} />
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderMid,
    marginVertical: Spacing.xs,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  flex: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.borderMid },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
