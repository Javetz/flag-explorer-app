describe('Country Flags App', () => {
  it('lists the countries on the home page', () => {
    // Visit the home page
    cy.visit('http://localhost:3000')

    // Check if the title is present
    cy.get('h1').should('contain', 'Country Flags')

    // Click on the first country
    cy.get('a').first().click()

    // Check if we're on the detail page
    cy.url().should('include', '/country/')

    // Check if country details are present
    cy.get('h1').should('exist')
    cy.contains('Population:').should('exist')
    cy.contains('Capital:').should('exist')

    // Go back to the home page
    cy.contains('Back to all countries').click()

    // Check if we're back on the home page
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('h1').should('contain', 'Country Flags')
  })
})

