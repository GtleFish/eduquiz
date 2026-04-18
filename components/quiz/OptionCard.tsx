import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Radius, Shadow, Spacing } from '../../constants/spacing';

export interface Option {
  id: string;
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  color: string;
}

interface Props {
  option: Option;
  state: 'idle' | 'selected' | 'correct' | 'wrong' | 'disabled';
  onPress: () => void;
}

const STATE_BORDER: Record<string, string> = {
  idle:     'transparent',
  selected: Colors.primary,
  correct:  '#16a34a',
  wrong:    Colors.error,
  disabled: 'transparent',
};

const STATE_BG: Record<string, string> = {
  idle:     Colors.white,
  selected: '#faf5ff',
  correct:  '#f0fdf4',
  wrong:    '#fef2f2',
  disabled: Colors.white,
};

const STATE_ICON: Record<string, string | null> = {
  idle:     null,
  selected: '●',
  correct:  '✓',
  wrong:    '✗',
  disabled: null,
};

const STATE_ICON_COLOR: Record<string, string> = {
  selected: Colors.primary,
  correct:  '#16a34a',
  wrong:    Colors.error,
};

export function OptionCard({ option, state, onPress }: Props) {
  const isDisabled = state === 'disabled';
  const icon = STATE_ICON[state];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.78}
      style={[
        styles.card,
        {
          backgroundColor: STATE_BG[state],
          borderColor: STATE_BORDER[state],
          borderWidth: state !== 'idle' ? 2 : 1,
          opacity: isDisabled ? 0.45 : 1,
        },
      ]}
    >
      <View style={[styles.badge, { backgroundColor: option.color }]}>
        <Text style={styles.badgeText}>{option.label}</Text>
      </View>
      <Text style={styles.optionText}>{option.text}</Text>
      {icon && (
        <View style={[styles.stateCircle, { backgroundColor: STATE_BG[state] }]}>
          <Text style={[styles.stateIcon, { color: STATE_ICON_COLOR[state] }]}>{icon}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    borderRadius: Radius['2xl'],
    gap: Spacing.base,
    borderColor: Colors.borderMid,
    ...Shadow.sm,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeText: { color: Colors.white, fontWeight: '800', fontSize: 18 },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  stateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stateIcon: { fontSize: 16, fontWeight: '800' },
});
