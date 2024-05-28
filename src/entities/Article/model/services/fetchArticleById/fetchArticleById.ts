import { createAsyncThunk } from '@reduxjs/toolkit';

import { updateViews } from '../../../api/articleApi';
import { Article } from '../../types/article';

import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI;

  try {
    if (!articleId) {
      throw new Error('');
    }

    const response = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: {
        _expand: 'user',
      },
    });

    if (!response.data) {
      throw new Error();
    }

    dispatch(updateViews(response.data));

    return response.data;
  } catch (e) {
    return rejectWithValue('Fetching error');
  }
});
