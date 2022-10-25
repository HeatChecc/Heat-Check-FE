import User from "../fixtures/User.json"

describe('empty spec', () => {

  describe('Homepage', () => {
    beforeEach(() => {
      cy.visit('localhost:3000')
    })
    it('should have a logo', () => {
      cy.get('.heatCheckLogo').should("exist")
    })
    it('should have an input field and search button', () => {
      cy.get('input[name="address"]')
        .get(".searchButton")
    })
    it('should be able to input information into the field', () => {
      cy.get('input[name="address"]').type('denver').should('have.value', 'denver')
    })
    it('should fail without an input', () => {
      cy.get('.addressErrorMsg').should('not.exist')
      cy.get('.searchButton').click()
      cy.get('.addressErrorMsg').should('exist')
    })

    it('should allow a user to log in', () => {
      cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
      cy.get('.signInButton').click().wait(1000)
      cy.get('input[name="idInput"]').type('1')
      cy.get('.logInButton').click({ force: true }).wait(1000)
      cy.get('.signInButton').should('not.exist')
      cy.get(".userName").contains("Welcome, eli")
    })

    it('should allow a user to log out', () => {
      cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User)      
      cy.get('.signInButton').click().wait(1000)
      cy.get('input[name="idInput"]').type('1')
      cy.get('.logInButton').click({ force: true }).wait(1000)
      cy.get(".userName").contains("Welcome, eli")
      cy.get('.signOutButton').click().wait(1000)
      cy.get('.singOutButton').should("not.exist")
    })
  
    it('should display a error message if user does not input an address, city, or zip code', () => {
      cy.get(".searchButton").click()
      cy.get(".addressErrorMsg").contains("Please enter a valid city, address or zip code!")
    })

  })
})