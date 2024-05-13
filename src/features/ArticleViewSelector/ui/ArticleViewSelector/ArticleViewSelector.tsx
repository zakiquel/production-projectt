import { memo } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/Stack';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TiledIcon,
      off: () => TiledIconDeprecated,
    }),
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  // eslint-disable-next-line react/prop-types
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return toggleFeatures({
    name: 'isAppRedesigned',
    on: () => (
      <Card
        className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
          className,
        ])}
        border="round"
      >
        <HStack gap="8">
          {viewTypes.map((viewType) => (
            <Icon
              clickable
              onClick={onClick(viewType.view)}
              Svg={viewType.icon}
              className={classNames('', {
                [cls.notSelected]: viewType.view !== view,
              })}
            />
          ))}
        </HStack>
      </Card>
    ),
    off: () => (
      <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
        {viewTypes.map((viewType) => (
          <ButtonDeprecated
            key={viewType.icon.name}
            theme={ButtonTheme.CLEAR}
            onClick={onClick(viewType.view)}
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view,
            })}
          >
            <IconDeprecated Svg={viewType.icon} width={24} height={24} />
          </ButtonDeprecated>
        ))}
      </div>
    ),
  });
});
