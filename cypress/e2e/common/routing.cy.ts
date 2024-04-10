import { getByTestId } from '../../support/commands/common';

describe('Роутинг', () => {
  beforeEach(() => {
    it('Переход на главную страницу', () => {
      cy.visit('/');
      getByTestId('MainPage').should('exist');
    });
  });

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      getByTestId('ProfilePage').should('exist');
    });
    it('Переход на страницу со статьями', () => {
      cy.visit('/articles');
      getByTestId('ArticlesPage').should('exist');
    });
  });

  describe('Пользователь неавторизован', () => {
    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      getByTestId('MainPage').should('exist');
    });
    it('Переход на несуществующий маршрут', () => {
      cy.visit('/qwe32trwe123');
      getByTestId('NotFoundPage').should('exist');
    });
  });
});
