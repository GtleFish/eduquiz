import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { Radius, Spacing } from '../../constants/spacing';

interface Tab {
  key: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  activeKey: string;
  onSelect: (key: string) => void;
  scrollable?: boolean;
}

export function TabPills({ tabs, activeKey, onSelect, scrollable = false }: Props) {
  const content = tabs.map((tab) => {
    const isActive = tab.key === activeKey;
    return (
      <TouchableOpacity
        key={tab.key}
        onPress={() => onSelect(tab.key)}
        style={[styles.pill, isActive && styles.pillActive]}
        activeOpacity={0.75}
      >
        <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
      </TouchableOpacity>
    );
  });

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
    padding: 4,
  },
  pill: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
