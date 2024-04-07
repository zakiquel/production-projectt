import { selectByTestId } from '../../helpers/selectByTestId';

describe('Роутинг', () => {
  beforeEach(() => {
    it('Переход на главную страницу', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
  });

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });
    it('Переход на страницу со статьями', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });

  describe('Пользователь неавторизован', () => {
    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Переход на несуществующий маршрут', () => {
      cy.visit('/qwe32trwe123');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });
});
