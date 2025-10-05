import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { theme as themeColors } from '../theme';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: typeof themeColors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDark.toString());
    document.body.style.backgroundColor = isDark ? themeColors.dark.background : themeColors.light.background;
    document.body.style.color = isDark ? themeColors.dark.text : themeColors.light.text;
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? themeColors.dark : themeColors.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
