// src/constants/theme.ts

export const COLORS = {
  primary: '#f6a927',        // (Your main yellow-orange)
  secondary: '#efe6de',      // (Light beige for backgrounds)

  success: '#b5dead',        // (Light green - success)
  danger: '#eb6c59',         // (Soft red - error/warning)
  info: '#9fc6ce',           // (Light blue - info)

  white: '#f7f7f7',
  black: '#0f0f0f',
  inactive: '#666',
  gray: '#999',

  // 🎨 Expanded palette
  blue: '#4a90e2',
  red: '#e94e4e',
  yellow: '#f5c542',
  orange: '#f6a927', // keep your primary as orange
  green: '#4caf50',
  pink: '#f48fb1',
  purple: '#9c27b0',
  lightGray: '#d3d3d3',
  darkGray: '#555',
} as const;

export const SIZES = {
  fontSmall: 14,
  fontMedium: 16,
  fontLarge: 18,
  padding: 10,
  margin: 10,
} as const;

export type ThemeColors = typeof COLORS;
export type ThemeSizes = typeof SIZES;
