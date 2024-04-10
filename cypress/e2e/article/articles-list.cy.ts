describe('Загрузка списка статей', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('/articles');
    });
  });

  it('Список статей существует и статьи загружаются', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });

  it('Табы работают', () => {
    cy.getByTestId('TabItemCard').should('have.length', 10);
    cy.getByTestId('TabItemCard').contains('HEALTHCARE').click();
    cy.getByTestId('ArticleList').should('have.length', 1);
  });
});
