import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type {
  StateSchema, ThunkConfig, ReduxStoreWithManager, StateSchemaKey,
} from './config/StateSchema';

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
