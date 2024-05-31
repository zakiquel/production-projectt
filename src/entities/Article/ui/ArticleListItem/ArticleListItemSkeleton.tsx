import { memo } from 'react';

import { ArticleView } from '../../model/consts/articleConsts';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';

import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => cls.ArticleListItemRedesigned,
      off: () => cls.ArticleListItem,
    });

    if (view === ArticleView.LIST) {
      const cardContent = (
        <div className={cls.wrapper}>
          <div className={cls.header}>
            <Skeleton border="50%" height={30} width={30} />
            <Skeleton width={150} height={16} className={cls.username} />
            <Skeleton width={150} height={16} className={cls.date} />
          </div>
          <Skeleton width={250} height={24} className={cls.title} />
          <Skeleton height={400} className={cls.img} />
          <div className={cls.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </div>
      );
      return (
        <div className={classNames(mainClass, {}, [className, cls[view]])}>
          {toggleFeatures({
            name: 'isAppRedesigned',
            on: () => (
              <Card border="round" className={cls.card}>
                {cardContent}
              </Card>
            ),
            off: () => (
              <CardDeprecated className={cls.card}>
                {cardContent}
              </CardDeprecated>
            ),
          })}
        </div>
      );
    }

    const cardContent = (
      <>
        {toggleFeatures({
          name: 'isAppRedesigned',
          on: () => (
            <Skeleton
              width="100%"
              height={150}
              border="32px"
              className={cls.img}
            />
          ),
          off: () => (
            <div className={cls.imageWrapper}>
              <Skeleton width={200} height={200} className={cls.img} />
            </div>
          ),
        })}
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={cls.title} />
      </>
    );

    return (
      <div className={classNames(mainClass, {}, [className, cls[view]])}>
        {toggleFeatures({
          name: 'isAppRedesigned',
          on: () => (
            <Card border="round" className={cls.card}>
              {cardContent}
            </Card>
          ),
          off: () => (
            <CardDeprecated className={cls.card}>{cardContent}</CardDeprecated>
          ),
        })}
      </div>
    );
  },
);
