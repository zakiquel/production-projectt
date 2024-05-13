import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import {
  TabItem,
  Tabs as TabsDeprecated,
} from '@/shared/ui/deprecated/Tabs/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  // eslint-disable-next-line react/prop-types
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все статьи'),
      },
      {
        value: ArticleType.IT,
        content: t('Айти'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
      {
        value: ArticleType.WEB,
        content: t('Веб'),
      },
      {
        value: ArticleType.MOBILE,
        content: t('Мобилки'),
      },
      {
        value: ArticleType.CYBERSECURITY,
        content: t('Кибербезопасность'),
      },
      {
        value: ArticleType.DESIGN,
        content: t('Дизайн'),
      },
      {
        value: ArticleType.HEALTHCARE,
        content: t('Здоровье'),
      },
      {
        value: ArticleType.E_COMMERCE,
        content: t('Бизнес'),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <Tabs
        direction="column"
        tabs={typeTabs}
        value={value}
        onTabClick={onTabClick}
        className={classNames('', {}, [className])}
      />
    ),
    off: () => (
      <TabsDeprecated
        tabs={typeTabs}
        value={value}
        onTabClick={onTabClick}
        className={classNames('', {}, [className])}
      />
    ),
  });
});
