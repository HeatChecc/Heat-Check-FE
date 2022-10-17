describe('empty spec', () => {
  
  describe('Homepage', () => {
    beforeEach(() => {
      cy.visit('localhost:3000')
    })
    it('should have a logo', () => {
      cy.get('.heatCheckLogo').should("exist")
    })
  })
})