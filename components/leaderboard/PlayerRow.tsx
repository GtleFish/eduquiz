import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '../ui/Avatar';
import { Colors } from '../../constants/colors';
import { Radius, Spacing } from '../../constants/spacing';

interface Props {
  rank: number;
  name: string;
  score: string;
  avatarUri?: string;
  streak?: boolean;
  isCurrentUser?: boolean;
}

export function PlayerRow({ rank, name, score, avatarUri, streak, isCurrentUser }: Props) {
  return (
    <View style={[styles.row, isCurrentUser && styles.rowHighlight]}>
      <Text style={[styles.rank, isCurrentUser && styles.rankHighlight]}>
        {rank}
      </Text>
      <Avatar uri={avatarUri} initials={name[0]} size={38} />
      <Text
        style={[styles.name, isCurrentUser && styles.nameHighlight]}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text style={[styles.score, isCurrentUser && styles.scoreHighlight]}>
        {score}
      </Text>
      {streak && <Text style={styles.streak}>🔥</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  rowHighlight: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.xs,
  },
  rank: {
    width: 24,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  rankHighlight: { color: Colors.white, fontSize: 15 },
  name: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  nameHighlight: { fontWeight: '700', color: Colors.white },
  score: {
    fontWeight: '700',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  scoreHighlight: { fontSize: 16, color: Colors.white },
  streak: { fontSize: 16 },
});
