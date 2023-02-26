describe("See the weather of the Mexico City", () => {
  it("Should find the Mexico City text in the page and need to be all in english", () => {
    cy.visit("http://localhost:3000");
    cy.wait(5000);
    cy.contains("Mexico City, MX");
    cy.contains("No Favorite Places");
    cy.contains("Minimum Temperature");
    cy.contains("Humidity");
    cy.contains("Maximum Temperature");
    cy.contains(/°C/i);
    cy.findByRole("button", { name: "ES" }).click();
    cy.wait(5000);
    cy.contains("No Hay Lugares Favoritos");
    cy.contains("Temperatura Mínima");
    cy.contains("Humedad");
    cy.contains("Temperatura Máxima");
    cy.findByRole("button", { name: "°F" }).click();
    cy.wait(5000);
    cy.contains(/°F/i);
    cy.get(".Sidebar_favorite_icon__zvQi1").click();
    cy.get(".Form_input__CkksV").type("mexico");
    cy.wait(1000);
    cy.contains("Mexico, US").click();
    cy.wait(5000);
    cy.contains("Mexico, US");
  });
});
