const faker = require("faker");
let title;

context("Network Requests", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/network-requests");
    title = "api.book. " + faker.datatype.number();
  });

  // Manage HTTP requests in your app

  it("Create a book", () => {
    // https://on.cypress.io/request
    cy.request(
      'POST',
      'https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/books',
      {
        title: title,
        author: "Aniuta",
      }
    ).then((response) => {
      cy.request('https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/' + response.body.id).then((response) => { 
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq(title);

      })
      cy.request(
        'PUT',
        'https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/' + response.body.id,
        {
          title: {title:"New title"},
          author: "Aniuta",
        }
      ).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.title).to.eq(title)
        })
    });
  });
});
