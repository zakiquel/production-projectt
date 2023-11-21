import { articleDetailsReducer } from './articleDetailsSlice';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema';
import {
  Article, ArticleBlockType, ArticleType,
} from '../types/article';

const data: Article = {
  id: '1',
  title: 'title',
  subtitle: 'subtitle',
  img: 'image',
  views: 1024,
  createdAt: '21.11.2023',
  type: [ArticleType.IT],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'block title',
      paragraphs: [
        'paragraph',
      ],
    },
  ],
};
describe('articleSlice.test', () => {
  test('test fetch article by id pending', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: false,
      error: 'error',
    };
    expect(articleDetailsReducer(
      state as ArticleDetailsSchema,
      fetchArticleById.pending,
    )).toEqual({
      isLoading: true,
      error: undefined,
    });
  });
  test('test fetch article by id fulfilled', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
      data: {
        id: '2',
        title: 'subtitle',
      },
    };
    expect(articleDetailsReducer(
      state as ArticleDetailsSchema,
      fetchArticleById.fulfilled(data, '', ''),
    )).toEqual({
      isLoading: false,
      data,
    });
  });
  test('test fetch article by id rejected', () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
      isLoading: true,
      error: undefined,
    };
    expect(articleDetailsReducer(
      state as ArticleDetailsSchema,
      fetchArticleById.rejected,
    )).toEqual({
      isLoading: false,
      error: undefined,
    });
  });
});
