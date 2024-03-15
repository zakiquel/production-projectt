import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageShema } from './model/types';
import {
  articleDetailsPageRecommendationsReducer,
} from './model/slices/articleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from './model/slices/articleDetailsCommentSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageShema>({
  recommendations: articleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
});
