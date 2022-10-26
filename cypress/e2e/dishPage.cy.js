import Review from "../fixtures/Review.json"
import Review2 from "../fixtures/Review2.json"
import Review3 from "../fixtures/Review3.json"
import User from "../fixtures/User.json"

describe('The Dish Page', () => {
    beforeEach(() => {
        cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, Review)
        cy.visit('http://localhost:3000/dish/25')
    })

    it('should have a header', () => {
        cy.get(".heatCheckHeader")
        .get("#heat").contains("HEAT")
        .get("#check").contains("CHECK")
    })

    it('should have a sidebar', () => {
        cy.get(".sideBar")
        .get(".sideButton").should("have.length", 2)
        .get(".sideButton").first().contains("Homepage")
        .get(".sideButton").last().contains("About Heat Check")
    })

    it('should be able to render the dish name', () => {
        cy.get('.dishName').contains('pad thai')
    })

    it.only('should render text if there are no current reviews for dish', () => {
        cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Review3).as("getReview3")
        cy.get('.review').should('have.length', 0)
        cy.get('.noReviewText').contains('No reviews yet.')
    })

    it('should be able to render existing reviews of dish', () => {
        cy.get('.review').should('have.length', 2)
        cy.get('.reviewDetails').first().contains('merp')
        cy.get('.peppers').first().contains('rating:🌶')
        cy.get('.reviewDetails').last().contains('it was meh')
        cy.get('.peppers').last().contains('rating:🌶')
    })

    it('should be able to add a new dish review', () => {
        cy.get('.signInButton').click().wait(1000)
        cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, User).as('getUser')
        cy.get('input[class*="loginInput"]').type('1')
        cy.get('.logInButton').click({ force: true })
        .wait('@getUser')
        cy.get(".reviewFormButton").click({ force: true })
        cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Review2).as("getReview2")
        .get('input[class*="dishReviewInput"]').type('pedas!').should('have.value', 'pedas!')
        .get('.womboCombo').click()
        .get(".submitNewReviewButton").click().wait(1000)
        cy.get('.review').should('have.length', 3)
        cy.get('.reviewDetails').first().contains('merp')
        cy.get('.peppers').first().contains('rating:🌶')
        cy.get('.reviewDetails').last().contains('pedas!')
        cy.get('.peppers').last().contains('rating:🌶')
    })

    it('should be able to go get out of the dish page', () => {
        cy.get('.navigation').first().click()
        cy.get('.heatCheckLogo').should("exist")
    })

    it('should show an error if there is a network error', () => {
        cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, {
            statusCode: 404
        })
        .get("p").contains("Error :(")
    })

})
