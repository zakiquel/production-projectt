import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
  error?: string;
  isLoading?: boolean;

  view: ArticleView;
  // pagination
  page: number;
  limit?: number;
  hasMore: boolean;

  _inited: boolean;
}
