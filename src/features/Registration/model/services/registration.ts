import { createAsyncThunk } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { createProfile } from '@/entities/Profile';
import { getAllUsers, User, UserRole, createUser } from '@/entities/User';
import { Theme } from '@/shared/const/theme';

interface RegistrationProps {
  username: string;
  password: string;
}
export const registration = createAsyncThunk<
  User,
  RegistrationProps,
  ThunkConfig<string>
>('common/registration', async ({ username, password }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const users = await dispatch(getAllUsers('')).unwrap();

    const candidate = users.find((user) => user.username === username);

    if (candidate) {
      return rejectWithValue('Пользователь с таким именем уже существует');
    }

    const id = uuid();

    const user = {
      id,
      username,
      password,
      roles: [UserRole.USER],
      features: {
        isArticleRatingEnabled: false,
        isCounterEnabled: false,
        isAppRedesigned: true,
      },
      jsonSettings: {
        theme: Theme.DARK,
        isFirstVisit: true,
        settingsPageHasBeenOpen: false,
      },
      avatar: '',
    } as User;

    const newProfile = {
      id,
      first: '',
      lastname: '',
      age: 18,
      currency: Currency.RUB,
      country: Country.Russia,
      city: '',
      username,
      avatar: '',
    };

    await dispatch(createProfile(newProfile));
    return await dispatch(createUser(user)).unwrap();
  } catch (e) {
    console.log(e);
    return rejectWithValue('Registration error');
  }
});
