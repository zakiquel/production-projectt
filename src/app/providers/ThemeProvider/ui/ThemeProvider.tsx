import React, {
  ReactNode, useEffect, useMemo, useState,
} from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.NORMAL;

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    initialTheme,
    children,
  } = props;

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
