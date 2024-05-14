import { HTMLAttributeAnchorTarget, memo } from 'react';

import { ArticleView } from '../../model/consts/articleConsts';
import { Article } from '../../model/types/article';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

import { toggleFeatures } from '@/shared/lib/features';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) =>
  toggleFeatures({
    name: 'isAppRedesigned',
    on: () => <ArticleListItemRedesigned {...props} />,
    off: () => <ArticleListItemDeprecated {...props} />,
  }),
);
