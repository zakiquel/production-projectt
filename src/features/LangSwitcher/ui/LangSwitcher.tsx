import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

// eslint-disable-next-line react/prop-types
export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <Button
        variant="clear"
        className={classNames('', {}, [className])}
        onClick={toggle}
      >
        {t(short ? 'Короткий язык' : 'Язык')}
      </Button>
    ),
    off: () => (
      <ButtonDeprecated
        className={classNames('', {}, [className])}
        theme={ButtonTheme.CLEAR}
        onClick={toggle}
      >
        {t(short ? 'Короткий язык' : 'Язык')}
      </ButtonDeprecated>
    ),
  });
});
