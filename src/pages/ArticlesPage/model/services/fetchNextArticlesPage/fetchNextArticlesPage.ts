import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../../selectors/articlesPageSelectors';
import { articlePageActions } from '../../slices/articlePageSlice';

export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
  >(
    'articlesPage/fetchNextArticlesPage',
    async (_, thunkAPI) => {
      const { getState, dispatch } = thunkAPI;
      const hasMore = getArticlesPageHasMore(getState());
      const page = getArticlesPageNum(getState());
      const isLoading = getArticlesPageIsLoading(getState());

      if (hasMore && !isLoading) {
        dispatch(articlePageActions.setPage(page + 1));
        dispatch(fetchArticlesList({
          page: page + 1,
        }));
      }
    },
  );
