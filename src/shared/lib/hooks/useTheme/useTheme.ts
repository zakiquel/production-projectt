import { useContext } from 'react';

import { Theme } from '../../../const/theme';
import { ThemeContext } from '../../context/ThemeContext';

interface UseThemeResult {
  theme: Theme;
  toggleTheme: (saveAction?: (theme: Theme) => void) => void;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction?: (theme: Theme) => void) => {
    let newTheme: Theme;
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.NORMAL;
        break;
      case Theme.NORMAL:
        newTheme = Theme.CUSTOM;
        break;
      case Theme.CUSTOM:
        newTheme = Theme.DARK;
        break;
      default:
        newTheme = Theme.NORMAL;
    }
    setTheme?.(newTheme);
    document.body.className = newTheme;
    saveAction?.(newTheme);
  };

  return {
    theme: theme || Theme.NORMAL,
    toggleTheme,
  };
}
