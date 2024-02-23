describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      username: 'siva',
      name: 'siva',
      password: 'helloworld',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
  });
  it('login form is shown ', () => {
    cy.contains('Login').click();
    cy.contains('Username');
  });
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login').click();
      cy.get('#UserName').type('siva');
      cy.get('#Password').type('helloworld');
      cy.get('#login-submit').click();

      cy.contains('Logged in Successfully');
    });
    it('fails with wrong credentials', () => {
      cy.contains('Login').click();
      cy.get('#UserName').type('siva');
      cy.get('#Password').type('kkas');
      cy.get('#login-submit').click();

      cy.get('.error')
        .should(
          'contain',
          'Wrong credentails, please enter correct username or password'
        )
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'siva', password: 'helloworld' });
    });
    it('a new blog can be added', () => {
      cy.contains('Add new Blog').click();
      cy.get('#Title').type('testing');
      cy.get('#Author').type('cypress');
      cy.get('#Url').type('www.test.com');
      cy.get('#Create').click();

      cy.contains('testing');
      cy.contains('a new blog testing by cypress is added');
    });
    it('user can like a blog', () => {
      const blog = {
        title: 'testing',
        author: 'cypress',
        url: 'www.testing.com',
        likes: 0,
      };
      cy.createBlog(blog);
      cy.contains('View').click();
      cy.get('#likes').should('have.text', 'likes 0 like');
      cy.get('#like-button').click();
      cy.get('#likes').should('have.text', 'likes 1 like');
    });
    it('user can delete a blog added by user', () => {
      const blog = {
        title: 'testing',
        author: 'cypress',
        url: 'www.testing.com',
        likes: 0,
      };
      cy.createBlog(blog);
      cy.contains('View').click();
      cy.contains('Delete').click();
      cy.should('not.contain', 'testing');
    });
    it('when multiple blogs are there , it is orderby likes', () => {
      cy.createBlog({
        title: 'testing',
        author: 'cypress',
        url: 'www.testing.com',
        likes: 0,
      });
      cy.createBlog({
        title: 'testing1',
        author: 'cypress',
        url: 'www.testing.com',
        likes: 2,
      });
      cy.createBlog({
        title: 'testing2',
        author: 'cypress',
        url: 'www.testing.com',
        likes: 3,
      });
      cy.get('.blog').eq(0).should('contain', 'testing2');
      cy.get('.blog').eq(1).should('contain', 'testing1');
    });
  });
});
