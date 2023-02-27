describe("See the weather of the Mexico City", () => {
  it("Should find the Mexico City text in the page and need to be all in english", () => {
    cy.visit("/");
    cy.contains(/Loading.../i);
    cy.contains("Mexico City, MX");
    cy.contains("No Favorite Places");
    cy.contains("Minimum Temperature");
    cy.contains("Humidity");
    cy.contains("Maximum Temperature");
    cy.findAllByText(/°C/i).should("have.length", 8);
    cy.findByRole("button", { name: "ES" }).click();
    cy.contains(/Cargando.../i);
    cy.contains("No Hay Lugares Favoritos");
    cy.contains("Temperatura Mínima");
    cy.contains("Humedad");
    cy.contains("Temperatura Máxima");
    cy.findByRole("button", { name: "°F" }).click();
    cy.findAllByText(/°F/i).should("have.length", 8);
    cy.get(".Sidebar_favorite_icon__zvQi1").click();
    cy.findAllByText(/mexico city/i).should("have.length", 2);
    cy.get(".Form_input__CkksV").type("mexico,");
    cy.wait(1000);
    cy.contains("Mexico, US").click();
    cy.contains("Mexico, US");
  });
});
