import { getByPlaceholderText } from '@testing-library/react'
import Restaurant from '../fixtures/Restaurant.json'
import User from '../fixtures/User.json'
describe('The Single Restaurant Page', () => {
  beforeEach(() => {
    // cy.intercept('https://heatcheck-be.herokuapp.com/graphql', Restaurant).as('getRest')
    cy.intercept({method: 'POST', url: 'https://heatcheck-be.herokuapp.com/graphql', times: 1}, (req) => {
      req.reply({
        delay: 1000,
        fixture: 'User.json'
      });
    }).as('getUser')
    cy.intercept({method: 'POST', url: 'https://heatcheck-be.herokuapp.com/graphql', times: 1}, (req) => {
      req.reply({
        delay: 1000,
        fixture: 'Restaurant.json'
      });
    }).as('getRest')
    // cy.intercept('https://heatcheck-be.herokuapp.com/graphql', User).as('getUser')
    cy.visit('localhost:3000/restaurant/Ttk8uzixI-qX8LhdHINV9A')
    cy.wait(3000)
  })
  
  it('should have a restaurant name', () => {
    cy.get('.restaurantName').contains("Toro")
    // cy.wait('@getRest')
    // cy.wait('@userGet')
  })

  it('should have the city name of the restaurant', () => {
    cy.get(".cityName").contains("150 Clayton Ln, Ste B, Denver, CO 77777")
  })

  it("Should have a empty menu", () => {
    cy.get(".menuTitle").contains("Hot Menu")
    cy.get(".dishCardInfo").should('have.length', 0)
  })

  it('should have a button to add a review for a dish', () => {
    cy.get(".addNewDishButton").contains("Add New Dish Review")
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
    .get(".sideButton").last().contains("Last Restaurant")
  })

  it('should be able to see a form to add a new dish', () => {
    cy.get(".addNewDishButton").click()
    .get(".exitModalImage").should("exist")
    .get(".fire").should('have.length', 5)
    .get(".spiceRating").contains("rating: 0")
    .get('input[name="dishName"]')
    .get('input[name="description"]')
    .get(".submitNewDishButton").contains("Add New Dish Review")
  })

  it("should be able to add a new dish review", () => {
    cy.get(".addNewDishButton").click()
    .get(".fire").last().click()
    .get(".spiceRating").contains("rating: 5")
    .get('input[name="dishName"]').type('Chicken Masala').should('have.value', 'Chicken Masala')
    .get('input[name="description"]').type('It burned twice').should('have.value', 'It burned twice')
    .get(".submitNewDishButton").click()
    .get(".dishCardInfo").should('have.length', 1)
  })

  it("should be able to see a dish's details in more depth", () => {
    cy.get(".addNewDishButton").click()
    .get(".fire").last().click()
    .get(".spiceRating").contains("rating: 5")
    .get('input[name="dishName"]').type('Chicken Masala').should('have.value', 'Chicken Masala')
    .get('input[name="description"]').type('It burned twice').should('have.value', 'It burned twice')
    .get(".submitNewDishButton").click()
    .get(".dishName").click()
    .get(".backButton").should("exist")
    .get(".reviewsHeader").contains("Customer Reviews")
  })

  it("should be able to go back to the restuant view when in the dish details", () => {
    cy.get(".addNewDishButton").click()
    .get(".fire").last().click()
    .get(".spiceRating").contains("rating: 5")
    .get('input[name="dishName"]').type('Chicken Masala').should('have.value', 'Chicken Masala')
    .get('input[name="description"]').type('It burned twice').should('have.value', 'It burned twice')
    .get(".submitNewDishButton").click()
    .get(".dishName").click()
    .get(".backButton").click()
    .get(".backButton").should('not.exist')
    .get(".dishCardInfo").should('have.length', 1)
  })

  it("should be able to exit the form if the user doesn't want to add a review", () => {
    cy.get(".addNewDishButton").click()
    .get(".exitModalImage").click()
    .get(".exitModalImage").should('not.exist')
  })
})