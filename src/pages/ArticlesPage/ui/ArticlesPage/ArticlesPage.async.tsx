import { lazy } from 'react';

export const ArticlesPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // ТАК ДЕЛАТЬ ПЛОХО, ДЛЯ ПРИМЕРА!!!
  setTimeout(() => resolve(import('./ArticlesPage')), 1500);
}));
