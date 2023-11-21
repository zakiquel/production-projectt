import { Article } from '../types/Article';

export interface ArticleDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Article;
}
