import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Country } from '../../model/types/country';

import { toggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';
import { ListBox } from '@/shared/ui/redesigned/Popups/ui/ListBox/ListBox';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
  // eslint-disable-next-line react/prop-types
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation('profile');

  const countryOptions = useMemo(
    () =>
      Object.entries(Country).map((val) => ({
        value: val[0],
        content: val[1],
      })),
    [],
  );

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  const countryProps = {
    className,
    value,
    defaultValue: t('Страна'),
    label: t('Страна'),
    items: countryOptions,
    onChange: onChangeHandler,
    readonly,
    direction: 'top right' as const,
  };

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <ListBox {...countryProps} />,
    off: () => <ListBoxDeprecated {...countryProps} />,
  });
});
