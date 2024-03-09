import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { ArticleType, ArticleBlockType } from '../../consts/articleConsts';
import { fetchArticleById } from './fetchArticleById';

const articleData = {
  id: '1',
  title: 'title',
  subtitle: 'subtitle',
  img: 'image',
  views: 'views',
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
describe('fetchArticleById.test', () => {
  test('success fetch', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: articleData }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(articleData);
  });
  test('error fetch', async () => {
    const thunk = new TestAsyncThunk(fetchArticleById);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
