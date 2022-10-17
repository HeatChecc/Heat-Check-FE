import Search from '../fixtures/Search.json'

describe('empty spec', () => {
  it('passes', () => {
    cy.intercept(`https://arcane-hollows-12884.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=%22spicy%22&location=%22Denver%22`, Search)
    cy.visit('localhost:3000/search/Denver')
  })
})