import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  fetchCommentsByArticleId,
} from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>(
  'articleDetails/addCommentForArticle',
  async (text, thunkAPI) => {
    const {
      extra,
      rejectWithValue,
      getState,
      dispatch,
    } = thunkAPI;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
      return rejectWithValue('no data');
    }

    const comment = {
      text,
      articleId: article.id,
      userId: userData.id,
    };

    try {
      const response = await extra.api.post<Comment>('/comments', comment);

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchCommentsByArticleId(article.id));

      return response.data;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
