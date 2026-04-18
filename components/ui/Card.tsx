import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Colors } from '../../constants/colors';
import { Radius, Shadow, Spacing } from '../../constants/spacing';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  /** Show a subtle border for extra definition on light backgrounds */
  bordered?: boolean;
}

export function Card({
  children,
  style,
  padding = Spacing.lg,
  shadow = 'sm',
  bordered = true,
}: Props) {
  const theme = useTheme();
  const shadowStyle = shadow !== 'none' ? Shadow[shadow] : {};
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, padding },
        shadowStyle,
        bordered && styles.border,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.card,
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderMid,
  },
});
