// ============================================================
// Typography scale — converted from theme.css h1-h4/label/button/input
// Fonts: Plus Jakarta Sans (headings), Be Vietnam Pro (body)
// ============================================================
import { TextStyle } from 'react-native';

export const FontFamily = {
  heading: 'PlusJakartaSans_800ExtraBold',
  headingBold: 'PlusJakartaSans_700Bold',
  body: 'BeVietnamPro_400Regular',
  bodyMedium: 'BeVietnamPro_500Medium',
  bodyBold: 'BeVietnamPro_700Bold',
};

export const Typography: Record<string, TextStyle> = {
  // Headings
  h1: { fontSize: 40, fontWeight: '800', lineHeight: 50, letterSpacing: -0.5 },
  h2: { fontSize: 32, fontWeight: '800', lineHeight: 40 },
  h3: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h4: { fontSize: 20, fontWeight: '700', lineHeight: 28 },

  // Body
  bodyLg: { fontSize: 18, fontWeight: '400', lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodySm: { fontSize: 14, fontWeight: '400', lineHeight: 20 },

  // Labels / UI
  label: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  labelSm: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  captionBold: { fontSize: 12, fontWeight: '700', lineHeight: 16, letterSpacing: 0.5 },

  // Buttons
  btnLg: { fontSize: 17, fontWeight: '700', lineHeight: 24 },
  btn: { fontSize: 15, fontWeight: '700', lineHeight: 22 },
  btnSm: { fontSize: 13, fontWeight: '700', lineHeight: 18 },
};
