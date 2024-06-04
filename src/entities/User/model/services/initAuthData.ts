import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../..';
import { getUserDataByIdQuery } from '../../api/userApi';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, 'new');
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(
        getUserDataByIdQuery(JSON.parse(userId)),
      ).unwrap();

      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        response.features?.isAppRedesigned ? 'new' : 'old',
      );

      if (!response) {
        return rejectWithValue('No response');
      }

      return response;
    } catch (e) {
      return rejectWithValue('Fetching error');
    }
  },
);
