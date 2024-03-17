import type {
  StateSchema, ThunkConfig, ReduxStoreWithManager, StateSchemaKey,
} from './config/StateSchema';
import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
  StoreProvider,
  createReduxStore,
};

export type {
  AppDispatch,
  StateSchema,
  ThunkConfig,
  ReduxStoreWithManager,
  StateSchemaKey,
};
