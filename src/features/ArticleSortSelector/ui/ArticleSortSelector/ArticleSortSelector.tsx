import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { SortOrder } from '@/shared/types/sort';
import { VStack } from '@/shared/ui/Stack';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select/Select';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text/Text';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (sort: ArticleSortField) => void;
  onChangeOrder: (order: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  // eslint-disable-next-line react/prop-types
  const { className, sort, order, onChangeOrder, onChangeSort } = props;
  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию'),
      },
      {
        value: 'desc',
        content: t('убыванию'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('дате публикации'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('просмотрам'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('названию'),
      },
    ],
    [t],
  );

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <div
        className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
          className,
        ])}
      >
        <VStack gap="8">
          <Text text={t('Сортировать по')} />
          <ListBox
            value={sort}
            items={sortFieldOptions}
            onChange={onChangeSort}
          />
          <ListBox
            value={order}
            items={orderOptions}
            onChange={onChangeOrder}
          />
        </VStack>
      </div>
    ),
    off: () => (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          value={sort}
          options={sortFieldOptions}
          label={t('Сортировать по')}
          onChange={onChangeSort}
        />
        <Select
          value={order}
          options={orderOptions}
          label={t('по')}
          onChange={onChangeOrder}
          className={cls.order}
        />
      </div>
    ),
  });
});
