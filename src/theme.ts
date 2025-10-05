// CHART Color Palette - Accessible & Visually Pleasing
export const colors = {
  // Warm neutrals - softer and more inviting
  cream: '#FDF8F3',
  warmBeige: '#E8DCC8',
  sand: '#D4C4B0',
  
  // Blues - professional yet calming
  primaryBlue: '#2B5F8F',      // Deep, accessible blue
  accentBlue: '#4A90C5',       // Medium blue for highlights
  lightBlue: '#A8D0E6',        // Soft blue for backgrounds
  
  // Supporting colors
  white: '#FFFFFF',
  softGray: '#F5F5F5',
  mediumGray: '#E0E0E0',
  darkGray: '#4A4A4A',
  charcoal: '#2C2C2C',
  
  // Semantic colors
  success: '#2D7A4F',
  warning: '#D97706',
  error: '#C53030',
  
  // Shadows
  shadowLight: 'rgba(43, 95, 143, 0.08)',
  shadowMedium: 'rgba(43, 95, 143, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

export const theme = {
  light: {
    background: colors.cream,
    surface: colors.white,
    surfaceAlt: colors.softGray,
    primary: colors.primaryBlue,
    primaryHover: '#1E4668',
    secondary: colors.accentBlue,
    secondaryHover: '#367AAC',
    accent: colors.warmBeige,
    text: colors.charcoal,
    textSecondary: '#666666',
    textMuted: '#888888',
    border: colors.mediumGray,
    borderLight: colors.lightBlue,
    shadow: colors.shadowLight,
    shadowHover: colors.shadowMedium,
    gradient: `linear-gradient(135deg, ${colors.primaryBlue} 0%, ${colors.accentBlue} 100%)`,
  },
  dark: {
    background: '#0F1419',
    surface: '#1A1F2E',
    surfaceAlt: '#242938',
    primary: colors.accentBlue,
    primaryHover: colors.lightBlue,
    secondary: colors.lightBlue,
    secondaryHover: '#C0E0F5',
    accent: colors.sand,
    text: '#E8E8E8',
    textSecondary: '#B8B8B8',
    textMuted: '#888888',
    border: '#3A4252',
    borderLight: '#4A5468',
    shadow: colors.shadowDark,
    shadowHover: 'rgba(0, 0, 0, 0.4)',
    gradient: `linear-gradient(135deg, ${colors.primaryBlue} 0%, #1E4668 100%)`,
  },
};
