import { combineReducers } from '@reduxjs/toolkit';

import { articleDetailsCommentsReducer } from './model/slices/articleDetailsCommentSlice';
import { articleDetailsPageRecommendationsReducer } from './model/slices/articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageShema } from './model/types';

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageShema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
  });
