import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { themes } from './ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
};

export const useThemeToggle = () => {
  const { theme, buttonTheme } = useTheme();
  
  return {
    isDark: theme === themes.dark,
    isLight: theme === themes.light,
    toggleTheme: buttonTheme,
    theme
  };
};