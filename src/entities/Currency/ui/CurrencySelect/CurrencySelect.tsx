import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../../model/types/currency';

import { toggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';
import { ListBox } from '@/shared/ui/redesigned/Popups/ui/ListBox/ListBox';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  // eslint-disable-next-line react/prop-types
  const { className, value, onChange, readonly } = props;

  const currencyOptions = useMemo(
    () =>
      Object.entries(Currency).map((val) => ({
        value: val[0],
        content: val[1],
      })),
    [],
  );

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  const { t } = useTranslation('profile');

  const listProps = {
    className,
    value,
    defaultValue: t('Валюта'),
    label: t('Валюта'),
    onChange: onChangeHandler,
    items: currencyOptions,
    readonly,
    direction: 'top right' as const,
  };

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <ListBox {...listProps} />,
    off: () => <ListBoxDeprecated {...listProps} />,
  });
});
