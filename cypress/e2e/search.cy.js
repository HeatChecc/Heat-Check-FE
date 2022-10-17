import Search from '../fixtures/Search.json'

describe('The Search Page', () => {
  beforeEach(() => {
    cy.intercept(`https://arcane-hollows-12884.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=%22spicy%22&location=%22Denver%22`, Search)
    cy.visit('localhost:3000/search/Denver')
  })

  it('should have 20 restaurants', () => {
    cy.get('.restaurant').should("have.length", 20)
  })
})