import Restaurant from '../fixtures/Restaurant.json'
describe('The Single Restaurant Page', () => {
  beforeEach(() => {
    cy.intercept('https://arcane-hollows-12884.herokuapp.com/https://api.yelp.com/v3/businesses/Ttk8uzixI-qX8LhdHINV9A', Restaurant)
    cy.visit('localhost:3000/restaurant/Ttk8uzixI-qX8LhdHINV9A')
  })

  it('should have a restaurant name', () => {
    cy.get('.restaurantName').contains("Toro")
  })
})