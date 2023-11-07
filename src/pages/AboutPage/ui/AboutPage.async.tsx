import { lazy } from 'react';

export const AboutPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // ТАК ДЕЛАТЬ ПЛОХО, ДЛЯ ПРИМЕРА!!!
  setTimeout(() => resolve(import('./AboutPage')), 1500);
}));
