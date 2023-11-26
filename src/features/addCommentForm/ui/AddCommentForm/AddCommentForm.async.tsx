import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(() => new Promise((resolve) => {
  // @ts-ignore
  // ТАК ДЕЛАТЬ ПЛОХО, ДЛЯ ПРИМЕРА!!!
  setTimeout(() => resolve(import('./AddCommentForm')), 1500);
}));
