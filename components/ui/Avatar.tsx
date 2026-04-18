import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
  uri?: string;
  initials?: string;
  size?: number;
  bordered?: boolean;
  borderColor?: string;
  style?: ViewStyle;
}

export function Avatar({
  uri,
  initials = '?',
  size = 40,
  bordered = false,
  borderColor = Colors.white,
  style,
}: Props) {
  const circle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View
      style={[
        styles.wrapper,
        circle,
        bordered && { borderWidth: 2, borderColor },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={[styles.image, circle]} />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.35 }]}>{initials}</Text>
      )}
    </View>
  );
}

// Stacked avatars group (e.g. "+5 friends playing")
interface AvatarGroupProps {
  uris: (string | undefined)[];
  size?: number;
  max?: number;
  extra?: number;
}

export function AvatarGroup({ uris, size = 32, max = 3, extra = 0 }: AvatarGroupProps) {
  const shown = uris.slice(0, max);
  return (
    <View style={styles.group}>
      {shown.map((uri, i) => (
        <Avatar
          key={i}
          uri={uri}
          size={size}
          bordered
          style={{ marginLeft: i === 0 ? 0 : -(size * 0.3) }}
        />
      ))}
      {extra > 0 && (
        <View
          style={[
            styles.extraBadge,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginLeft: -(size * 0.3),
            },
          ]}
        >
          <Text style={[styles.extraText, { fontSize: size * 0.3 }]}>+{extra}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { resizeMode: 'cover' },
  initials: { color: Colors.primary, fontWeight: '700' },
  group: { flexDirection: 'row', alignItems: 'center' },
  extraBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  extraText: { color: Colors.white, fontWeight: '700' },
});
