import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '../ui/Avatar';
import { Colors } from '../../constants/colors';
import { Radius, Shadow, Spacing } from '../../constants/spacing';

interface Props {
  rank: 1 | 2 | 3;
  name: string;
  score: string;
  avatarUri?: string;
  color: string;
}

const AVATAR_SIZE: Record<number, number> = { 1: 80, 2: 64, 3: 64 };
const CARD_OFFSET: Record<number, number> = { 1: -28, 2: 0, 3: 0 };

const CROWN: Record<number, string | null> = { 1: '👑', 2: null, 3: null };

export function PodiumCard({ rank, name, score, avatarUri, color }: Props) {
  const avatarSize = AVATAR_SIZE[rank];
  const crown = CROWN[rank];

  return (
    <View style={[styles.container, { marginTop: CARD_OFFSET[rank] }]}>
      {crown && <Text style={styles.crown}>{crown}</Text>}
      <Avatar
        uri={avatarUri}
        initials={name[0]}
        size={avatarSize}
        bordered
        borderColor={rank === 1 ? Colors.yellowAlt : Colors.white}
        style={styles.avatar}
      />
      <View style={[styles.card, rank === 1 && styles.cardFirst]}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={[styles.score, rank === 1 && styles.scoreLg]}>{score}</Text>
        <View style={[styles.rankBadge, { backgroundColor: color }]}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1 },
  crown: { fontSize: 20, marginBottom: 2 },
  avatar: { marginBottom: Spacing.sm },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    width: '100%',
    gap: 2,
  },
  cardFirst: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
  },
  name: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  score: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
  },
  scoreLg: { fontSize: 16, color: Colors.white },
  rankBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xs,
  },
  rankText: { fontWeight: '800', color: Colors.white, fontSize: 12 },
});
