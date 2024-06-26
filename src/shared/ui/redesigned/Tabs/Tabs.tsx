import { memo, ReactNode, useCallback } from 'react';

import { Flex, FlexDirection } from '../../Stack/Flex/Flex';
import { Card } from '../Card/Card';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}
interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, direction = 'row', value, onTabClick } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap="8"
      className={classNames(cls.Tabs, {}, [className])}
      align="start"
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={tab.value === value ? 'light' : 'normal'}
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
            key={tab.value}
            onClick={clickHandle(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
