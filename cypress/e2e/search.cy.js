import Search from '../fixtures/Search.json'

describe('The Search Page', () => {
  beforeEach(() => {
    cy.intercept(`https://arcane-hollows-12884.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=%22spicy%22&location=%22Denver%22`, Search)
    cy.visit('localhost:3000/search/Denver')
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
    .get(".sideButton").last().contains("Restaurants")
  })

  it('should have 20 restaurants', () => {
    cy.get('.restaurant').should("have.length", 20)
  })

  it('Should have Toro as the first resturant', () => {
    cy.get('.restaurant').first().contains("Toro")
    .get(".restRating").contains("Rating: 4.5")
    .get(".restaurantImage").first().should('have.attr', 'src').should('include',"https://s3-media1.fl.yelpcdn.com/bphoto/DD9_4p7wAwzx9VbNYMwFTQ/o.jpg")
  })

  it('should have b.b.q chicken as the last resturant', () => {
    cy.get(".restaurant").last().contains("bb.q Chicken - Capitol Hill Denver")
    .get(".restRating").contains("Rating: 4.5")
    .get(".restaurantImage").last().should('have.attr', 'src').should('include',"https://s3-media3.fl.yelpcdn.com/bphoto/x6_dXMxOUoYm5ziY1b5sCA/o.jpg")
  })
})