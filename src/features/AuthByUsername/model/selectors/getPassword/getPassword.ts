import { StateSchema } from 'app/providers/StoreProvider';

export const getPassword = (state: StateSchema) => state?.loginForm.password;
