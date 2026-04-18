import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Radius, Spacing } from '../../constants/spacing';

type BadgeVariant = 'primary' | 'yellow' | 'success' | 'error' | 'ghost' | 'white';

interface Props {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  icon?: string;
  size?: 'sm' | 'md';
}

export function Badge({ label, variant = 'primary', style, icon, size = 'md' }: Props) {
  return (
    <View style={[styles.badge, variantBg[variant], size === 'sm' && styles.badgeSm, style]}>
      {icon && <Text style={[styles.icon, size === 'sm' && styles.iconSm]}>{icon} </Text>}
      <Text style={[styles.text, variantText[variant], size === 'sm' && styles.textSm]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textSm: { fontSize: 9 },
  icon: { fontSize: 12 },
  iconSm: { fontSize: 10 },
});

const variantBg: Record<BadgeVariant, ViewStyle> = {
  primary: { backgroundColor: Colors.primarySurface },
  yellow:  { backgroundColor: Colors.yellowAlt },
  success: { backgroundColor: '#dcfce7' },
  error:   { backgroundColor: '#fee2e2' },
  ghost:   { backgroundColor: 'rgba(255,255,255,0.2)' },
  white:   { backgroundColor: Colors.white },
};

const variantText: Record<BadgeVariant, object> = {
  primary: { color: Colors.primary },
  yellow:  { color: Colors.yellowDark },
  success: { color: '#166534' },
  error:   { color: '#991b1b' },
  ghost:   { color: Colors.white },
  white:   { color: Colors.textPrimary },
};
