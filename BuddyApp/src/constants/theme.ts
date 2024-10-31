// src/constants/theme.ts

export const COLORS = {
    primary: '#f6a927',
    secondary: '#efe6de',
    success: '#b5dead',
    danger: '#eb6c59',
    info: '#9fc6ce',
    white: '#f7f7f7',
    black: '#0f0f0f',
    inactive: '#666',
    gray: '#999',

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
  