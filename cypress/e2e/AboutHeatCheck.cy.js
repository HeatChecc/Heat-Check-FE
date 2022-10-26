describe('The About Heat Check page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/about-heat-check')
    })

    it('should render all the correct elements', () => {
        cy.get('.aboutHeatCheck').should('exist')
        cy.get('.teams-style').first().should('have.length', 1)
    })

    it('should have a sidebar', () => {
        cy.get(".sideBar")
            .get(".sideButton").should("have.length", 2)
            .get(".sideButton").first().contains("Homepage")
            .get(".sideButton").last().contains("About Heat Check")
    })

    it('should be able to go get out of the about Heat Check page', () => {
        cy.get('.navigation').first().click()
        cy.get('.heatCheckLogo').should("exist")
    })

})