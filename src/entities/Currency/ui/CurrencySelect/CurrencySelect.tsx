import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
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

  const currencyOptions = useMemo(() => Object.entries(Currency).map((val) => (
    { value: val[0], content: val[1] })), []);

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  const { t } = useTranslation();

  return (
    <ListBox
      className={className}
      value={value}
      defaultValue={t('Укажите валюту')}
      label={t('Укажите валюту')}
      onChange={onChangeHandler}
      items={currencyOptions}
      readonly={readonly}
      direction="top right"
    />
  );
});
