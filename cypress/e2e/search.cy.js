import Search from '../fixtures/Search.json'

describe('The Search Page', () => {
  beforeEach(() => {
    cy.intercept({method: 'POST', url: 'https://heatcheck-be.herokuapp.com/graphql', times: 1}, (req) => {
      req.reply({
        delay: 1000,
        fixture: 'User.json'
      });
    })
    cy.intercept({method: 'POST', url: 'https://heatcheck-be.herokuapp.com/graphql', times: 1}, (req) => {
      req.reply({
        delay: 1000,
        fixture: 'Search.json'
      });
    }).wait(3000)
    // cy.intercept(`https://heatcheck-be.herokuapp.com/graphql`, Search)
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

  it('Should have Himalayan Spice as the first resturant', () => {
    cy.get('.restaurant').first().contains("Himalayan Spice")
    .get(".restRating").contains("Rating: 4.5")
    .get(".restaurantImage").first().should('have.attr', 'src').should('include',"https://s3-media2.fl.yelpcdn.com/bphoto/swlTvEXL5yVRzlOPWo4tYw/o.jpg")
  })

  it("should have Mehak India's Aroma as the last resturant", () => {
    cy.get(".restaurant").last().contains("Mehak India's Aroma")
    .get(".restRating").contains("Rating: 4.5")
    .get(".restaurantImage").last().should('have.attr', 'src').should('include',"https://s3-media1.fl.yelpcdn.com/bphoto/CzbzAT1SD9exma35ESPBUQ/o.jpg")
  })
})