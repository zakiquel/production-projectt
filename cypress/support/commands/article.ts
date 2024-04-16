import { Article } from '../../../src/entities/Article';

const articleTemplate = {
  title: 'TEST ARTICLE',
  subtitle: 'Что нового в JS за 2022 год?',
  img: 'https://pluspng.com/img-png/scala-logo-png-scala-logo-1200x675.png',
  views: 1022,
  createdAt: '26.04.2022',
  userId: '1',
  type: ['IT'],
  blocks: [],
};

export const createArticle = (article?: Article) =>
  cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/articles',
      headers: { Authorization: 'zxc' },
      body: article ?? articleTemplate,
    })
    .then((res) => res.body);

export const removeArticle = (articleId: string) =>
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'zxc' },
  });

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
