export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article, ArticleBlock } from './model/types/article';

export type { ArticleDetailsSchema } from './model/types/ArticleDetailsSchema';

export { ArticleList } from './ui/ArticleList/ArticleList';
export {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from './model/selectors/articleDetails';

export { updateViews, articleApi } from '@/entities/Article/api/articleApi';

export {
  ArticleView,
  ArticleType,
  ArticleSortField,
  ArticleBlockType,
} from './model/consts/articleConsts';
