import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';

type Variant = 'gradient' | 'solid' | 'outline' | 'ghost' | 'yellow';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export function PrimaryButton({
  label,
  onPress,
  variant = 'gradient',
  style,
  labelStyle,
  disabled = false,
  loading = false,
  icon,
}: Props) {
  const opacity = disabled ? 0.45 : 1;

  const content = loading ? (
    <ActivityIndicator
      color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
    />
  ) : (
    <Text style={[styles.label, variantLabel[variant], labelStyle]}>
      {icon ? `${icon}  ` : ''}
      {label}
    </Text>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[{ opacity }, style]}
        activeOpacity={0.82}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.base}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={[styles.base, variantContainer[variant], { opacity }, style]}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing['2xl'],
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 52,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});

const variantContainer: Record<Variant, ViewStyle> = {
  gradient: {},
  solid:   { backgroundColor: Colors.primary },
  outline: { borderWidth: 2, borderColor: Colors.primary, backgroundColor: 'transparent' },
  ghost:   { backgroundColor: Colors.primarySurface, borderWidth: 1.5, borderColor: Colors.primaryMuted },
  yellow:  { backgroundColor: Colors.yellowAlt },
};

const variantLabel: Record<Variant, TextStyle> = {
  gradient: { color: Colors.white },
  solid:    { color: Colors.white },
  outline:  { color: Colors.primary },
  ghost:    { color: Colors.primary },
  yellow:   { color: Colors.yellowDark },
};
