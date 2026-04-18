import { Colors } from '../constants/colors';

export const lightTheme = {
  background: Colors.primaryBg,
  surface: Colors.white,
  card: Colors.white,
  primary: Colors.primary,
  primaryLight: Colors.primaryLight,
  text: Colors.textPrimary,
  textSecondary: Colors.textSecondary,
  textMuted: Colors.textMuted,
  border: Colors.border,
  inputBg: Colors.inputBg,
  tabBar: Colors.white,
  tabBarBorder: Colors.border,
  headerBg: Colors.white,
  isDark: false,
};

export type AppTheme = typeof lightTheme;
