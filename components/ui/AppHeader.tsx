import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Colors } from '../../constants/colors';
import { Spacing, Radius } from '../../constants/spacing';

interface Props {
  title?: string;
  onBack?: () => void;
  backLabel?: string;
  onAction?: () => void;
  actionLabel?: string;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'transparent' | 'quiz';
}

export function AppHeader({
  title,
  onBack,
  backLabel = '←',
  onAction,
  actionLabel = '⋯',
  rightElement,
  style,
  variant = 'default',
}: Props) {
  const theme = useTheme();

  const bgColor =
    variant === 'transparent'
      ? 'transparent'
      : variant === 'quiz'
      ? Colors.primarySurface
      : Colors.white;

  const showBorder = variant !== 'transparent';

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: bgColor },
        showBorder && styles.headerBorder,
        style,
      ]}
    >
      {/* Left */}
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Text style={[styles.backIcon, { color: theme.primary }]}>{backLabel}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      {/* Center */}
      {title ? (
        <Text style={[styles.title, { color: Colors.textPrimary }]} numberOfLines={1}>
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {/* Right */}
      {rightElement != null ? (
        rightElement
      ) : onAction ? (
        <TouchableOpacity
          onPress={onAction}
          style={styles.actionBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionIcon, { color: theme.primary }]}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    minHeight: 56,
  },
  headerBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderMid,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
    letterSpacing: -0.1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: { fontSize: 18 },
  placeholder: { width: 36 },
});
