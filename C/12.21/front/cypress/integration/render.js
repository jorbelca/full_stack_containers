describe("Persons App", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3001")
    cy.contains("Phonebook")
    cy.contains("Numbers")
  })
  it("Search", function () {
    cy.get("#filterPerson").type("anna")
    cy.contains("Anna")
  })
  it("Add new", function () {
    cy.get("#namePerson").type("Test")
    cy.get("#numberPerson").type("0987654321")
    cy.get("button").contains("Add").click()
    cy.contains("Test")
  })
  it("Delete", function () {
    cy.visit("http://localhost:3001")
    cy.contains("987654321").next().next().next().contains("Delete").click()
    cy.contains("The entry has been deleted")
  })
})
