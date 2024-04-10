let currentArticleId: string;

describe('Переход на страницу статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`/articles/${article.id}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });

  it('Содержимое статьи отображается', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });

  it('Список рекомендаций отображается', () => {
    cy.getByTestId('ArticleRecommendations').should('exist');
  });

  it('Отправка комментариев работает', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('Оценка статьи работает', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
