import React, { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-dark.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
  className?: string;
}

// eslint-disable-next-line react/prop-types
export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />,
    off: () => (
      <Button
        theme={ButtonTheme.CLEAR}
        className={classNames('', {}, [className])}
        onClick={onToggleHandler}
      >
        <IconDeprecated
          Svg={ThemeIconDeprecated}
          width={40}
          height={40}
          inverted
        />
      </Button>
    ),
  });
});
