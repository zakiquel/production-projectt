import { Article } from '../../model/types/article';

import { rtkApi } from '@/shared/api/rtkApi';

const articleApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateArticleViews: build.mutation<Article, Article>({
      query: (article) => ({
        url: `/articles/${article.id}`,
        method: 'PATCH',
        body: {
          ...article,
          views: article.views + 1,
        },
      }),
    }),
  }),
});

export const updateViews = articleApi.endpoints.updateArticleViews.initiate;
