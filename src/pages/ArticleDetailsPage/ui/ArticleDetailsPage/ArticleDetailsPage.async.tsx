import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // ТАК ДЕЛАТЬ ПЛОХО, ДЛЯ ПРИМЕРА!!!
  setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500);
}));
