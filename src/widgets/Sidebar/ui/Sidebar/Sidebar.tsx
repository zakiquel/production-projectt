import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/Stack/VStack/VStack';
import {
  Button,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

// eslint-disable-next-line react/prop-types
export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.path} />
      )),
    [collapsed, sidebarItemsList],
  );

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <aside
        data-testid="sidebar"
        className={classNames(
          cls.SidebarRedesigned,
          { [cls.collapsedRedesigned]: collapsed },
          [className],
        )}
      >
        <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
        <VStack role="navigation" gap="8" className={cls.items}>
          {itemsList}
        </VStack>
        <Icon
          data-testid="sidebar-toggle"
          onClick={onToggle}
          className={cls.collapseBtn}
          Svg={ArrowIcon}
          clickable
        />
        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LangSwitcher short={collapsed} className={cls.lang} />
        </div>
      </aside>
    ),
    off: () => (
      <aside
        data-testid="sidebar"
        className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
          className,
        ])}
      >
        <Button
          data-testid="sidebar-toggle"
          onClick={onToggle}
          className={cls.collapseBtn}
          theme={ButtonTheme.BACKGROUND_INVERTED}
          square
          size={ButtonSize.L}
        >
          {collapsed ? '>' : '<'}
        </Button>
        <VStack role="navigation" gap="8" className={cls.items}>
          {itemsList}
        </VStack>
        <div className={cls.switchers}>
          <ThemeSwitcher />
          <LangSwitcher short={collapsed} className={cls.lang} />
        </div>
      </aside>
    ),
  });
});
