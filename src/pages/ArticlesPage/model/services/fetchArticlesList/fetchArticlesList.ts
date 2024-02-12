import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { useSelector } from 'react-redux';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import {
  getArticlesPageLimit, getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
} from '../../selectors/articlesPageSelectors';

interface FetchArticleListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticleListProps,
  ThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
      const { extra, rejectWithValue, getState } = thunkAPI;
      const page = getArticlesPageNum(getState());
      const limit = getArticlesPageLimit(getState());
      const sort = getArticlesPageSort(getState());
      const order = getArticlesPageOrder(getState());
      const search = getArticlesPageSearch(getState());
      try {
        console.log(sort);
        console.log(order);
        console.log(search);
        addQueryParams({
          sort, order, search,
        });
        const response = await extra.api.get<Article[]>('/articles', {
          params: {
            _expand: 'user',
            _limit: limit,
            _page: page,
            _sort: sort,
            _order: order,
            q: search,
          },
        });

        if (!response.data) {
          throw new Error();
        }

        return response.data;
      } catch (e) {
        return rejectWithValue('Fetching error');
      }
    },
  );
