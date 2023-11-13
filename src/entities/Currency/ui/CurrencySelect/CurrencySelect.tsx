import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback, useMemo } from 'react';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className,
    value,
    onChange,
    readonly,
  } = props;

  const currencyOption = useMemo(() => Object.entries(Currency).map((val) => ({ value: val[0], content: val[1] })), []);

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  const { t } = useTranslation();
  return (
    <Select
      value={value}
      label={t('Укажите валюту')}
      options={currencyOption}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  );
});
