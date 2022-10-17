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
  })
})