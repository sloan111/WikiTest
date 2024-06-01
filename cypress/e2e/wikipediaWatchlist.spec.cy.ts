
describe('Wikipedia Watchlist', () => {
    beforeEach(() => {
      // Visit the Wikipedia login page
      cy.visit('https://en.wikipedia.org/wiki/Main_Page');
    });
  
    it('Logs in and adds pages to watchlist', () => {
      // Replace with actual credentials from your file
      const username: string = 'YOUR USERNAME';
      const password: string = 'YOUR PASSWORD';

      // Click the link for the login form
      cy.get('li[id="pt-login-2"]').click();
      
      // Locate login form elements and type credentials
      cy.get('input[id="wpName1"]').type(username);
      cy.get('input[id="wpPassword1"]').type(password);
  
      // Click the login button
      cy.get('button[id="wpLoginAttempt"]').click();
      
      // Navigate to Cyprus nation page
      cy.visit('https://en.wikipedia.org/wiki/Cyprus');
      cy.get('li[id="ca-watch"]').click(); // Add Cyprus page to watchlist
      cy.contains('button', 'Watch').click();  //confirm
  
      // Navigate to Pine Cypress tree page
      cy.visit('https://en.wikipedia.org/wiki/Taxodium_ascendens');
      cy.get('li[id="ca-watch"]').click(); // Add Pine Cypress page to watchlist
      cy.contains('button', 'Watch').click();  //confirm

      // Nagivate to your watchlist
      cy.visit('https://en.wikipedia.org/wiki/Special:EditWatchlist');

      // Remove the first watchlist entry
      cy.get('input[value="Cyprus"]').click();
      cy.contains('button', 'Remove titles').click(); 

      // Verify the 2nd watchlist entry is retained
      cy.visit('https://en.wikipedia.org/wiki/Special:EditWatchlist');
      cy.get('input[value="Taxodium ascendens"]').should('exist');

      // Click on the watchlist item link
      cy.contains('a', 'Taxodium ascendens').click(); 

      // Verify the page title is as expected
      cy.contains('h1', 'Taxodium ascendens');

      // Clear entire watchlist for next test run
      cy.visit('https://en.wikipedia.org/wiki/Special:EditWatchlist');
      cy.get('input[name="wpCheckAllNs0"]').click();
      cy.contains('button', 'Remove titles').click(); 

      //Log out from the page

      cy.get('input[id="vector-user-links-dropdown-checkbox"]').click();
      cy.get('li[id="pt-logout"]').click({force: true});
      
    });
  });