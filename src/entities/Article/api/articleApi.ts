import { Article } from '../model/types/article';

import { rtkApi } from '@/shared/api/rtkApi';

export const articleApi = rtkApi.injectEndpoints({
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
    createArticle: build.mutation<Article, Article>({
      query: (article) => ({
        url: `/articles`,
        method: 'POST',
        body: {
          title: article.title,
          subtitle: article.subtitle,
          img: article.img,
          views: 0,
          createdAt: article.createdAt,
          userId: article.user.id,
          type: article.type,
          blocks: article.blocks,
        },
      }),
    }),
  }),
});

export const updateViews = articleApi.endpoints.updateArticleViews.initiate;
