import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Radius, Shadow, Spacing } from '../../constants/spacing';
import { Routes } from '../../constants/routes';

type TabItem =
  | { route: string; icon: string; label: string; isCreate?: false }
  | { route: string; icon: string; label: ''; isCreate: true };

const TABS: TabItem[] = [
  { route: Routes.HOME,        icon: '🏠', label: 'Trang chủ' },
  { route: Routes.EXPLORE,     icon: '🔍', label: 'Khám phá' },
  { route: Routes.CREATE_NEW,  icon: '+',  label: '',  isCreate: true },
  { route: Routes.LEADERBOARD, icon: '📊', label: 'Xếp hạng' },
  { route: Routes.PROFILE,     icon: '👤', label: 'Cá nhân' },
];

/** expo-router strips the group segment in usePathname, e.g. "/(tabs)/" → "/" */
function normalisePath(p: string) {
  return p.replace(/\/\(tabs\)/, '') || '/';
}

const TAB_BAR_HEIGHT = 62;
const CREATE_BTN_SIZE = 54;
const CREATE_FLOAT = 14;

export function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const normalisedPath = normalisePath(pathname);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {TABS.map((tab) => {
          if (tab.isCreate) {
            return (
              <View key={tab.route} style={styles.createSlot}>
                <TouchableOpacity
                  onPress={() => router.navigate(tab.route as any)}
                  style={styles.createBtn}
                  activeOpacity={0.82}
                  accessibilityLabel="Tạo quiz mới"
                  accessibilityRole="button"
                >
                  <Text style={styles.createIcon}>{tab.icon}</Text>
                </TouchableOpacity>
              </View>
            );
          }

          const tabPath = normalisePath(tab.route);
          const isActive =
            normalisedPath === tabPath ||
            (tabPath !== '/' && normalisedPath.startsWith(tabPath));

          return (
            <TouchableOpacity
              key={tab.route}
              onPress={() => router.navigate(tab.route as any)}
              style={styles.tab}
              activeOpacity={0.75}
              accessibilityLabel={tab.label}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              {isActive && <View style={styles.activePill} />}
              <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                {tab.icon}
              </Text>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: TAB_BAR_HEIGHT + CREATE_FLOAT,
    backgroundColor: 'transparent',
  },

  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderMid,
    paddingBottom: Platform.OS === 'ios' ? 0 : 4,
    ...Shadow.sm,
  },

  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  activePill: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 68,
    height: 40,
    marginTop: -20,
    marginLeft: -34,
    backgroundColor: Colors.primarySurface,
    borderRadius: Radius.pill,
  },

  tabIcon: { fontSize: 20, zIndex: 1 },
  tabIconActive: {},

  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textMuted,
    zIndex: 1,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },

  createSlot: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  createBtn: {
    position: 'absolute',
    bottom: (TAB_BAR_HEIGHT - CREATE_BTN_SIZE) / 2 + CREATE_FLOAT,
    width: CREATE_BTN_SIZE,
    height: CREATE_BTN_SIZE,
    borderRadius: CREATE_BTN_SIZE / 2,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    ...Shadow.lg,
  },

  createIcon: { fontSize: 24, color: Colors.white, lineHeight: 28 },
});
