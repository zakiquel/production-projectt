import { Country } from 'entities/Country';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Profile } from 'entities/Profile';
import { ValidateProfileErrors } from '../../types/editableProfileCardSchema';
import { updateProfileData } from './updateProfileData';

const formData: Profile = {
  id: '1',
  username: 'kirillzav',
  first: 'kirill',
  lastname: 'zavalishin',
  age: 21,
  country: Country.Russia,
  city: 'Tomsk',
};
describe('updateProfileData.test', () => {
  test('success update', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: formData,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ data: formData }));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.payload).toEqual(formData);
    expect(result.meta.requestStatus).toEqual('fulfilled');
  });
  test('server error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: formData,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({}));
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.payload).toEqual(['SERVER_ERROR']);
    expect(result.meta.requestStatus).toEqual('rejected');
  });
  test('client error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...formData, lastname: '' },
      },
    });
    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalledTimes(0);
    expect(result.payload).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
    ]);
    expect(result.meta.requestStatus).toEqual('rejected');
  });
});
