import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleSortField, ArticleView, ArticleViewSelector } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortSelector } from 'entities/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlePageActions } from '../../model/slices/articlePageSlice';
import {
  getArticlesPageOrder, getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlePageFilters.module.scss';

interface ArticlePageFiltersProps {
  className?: string;
}

export const ArticlePageFilters = memo((props: ArticlePageFiltersProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation();
  const view = useSelector(getArticlesPageView);
  const dispatch = useAppDispatch();
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view));
  }, [dispatch]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlePageActions.setOrder(newOrder));
    dispatch(articlePageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlePageActions.setSort(newSort));
    dispatch(articlePageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const onChangeSearch = useCallback((newSearch: string) => {
    dispatch(articlePageActions.setSearch(newSearch));
    dispatch(articlePageActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  return (
    <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          value={search}
          onChange={onChangeSearch}
          placeholder={t('Поиск')}
        />
      </Card>
    </div>
  );
});
