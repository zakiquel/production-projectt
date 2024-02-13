import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkAPI) => {
      const { dispatch, getState } = thunkAPI;
      const inited = getArticlesPageInited(getState());

      if (!inited) {
        searchParams.forEach((key, value) => {
          // eslint-disable-next-line default-case
          switch (key) {
          case 'order':
            dispatch(articlePageActions.setOrder(value as SortOrder));
            break;
          case 'sort':
            dispatch(articlePageActions.setSort(value as ArticleSortField));
            break;
          case 'search':
            dispatch(articlePageActions.setSearch(value));
            break;
          case 'type':
            dispatch(articlePageActions.setType(value as ArticleType));
            break;
          }
        });
        dispatch(articlePageActions.initState());
        dispatch(fetchArticlesList({}));
      }
    },
  );
