let profileId: string;

describe('Переход на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('Профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'user');
  });

  it('Профиль успешно редактируется', () => {
    const newFirstname = 'newFirstname';
    const newLastname = 'newLastname';
    cy.updateProfile(newFirstname, newLastname);
    cy.getByTestId('ProfileCard.firstname').should('have.value', newFirstname);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
  });
});
