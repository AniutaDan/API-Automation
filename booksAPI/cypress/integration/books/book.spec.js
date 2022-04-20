let title;
let id;

context("Network Requests", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/network-requests");
    title = "First api.book. ";
  });

  // Manage HTTP requests in your app

  it("CREATE and GET a book", () => {
    // https://on.cypress.io/request
    cy.request(
      "POST",
      "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/books",
      {
        title: title,
        author: "Aniuta",
      }
    ).then((response) => {
      //     expect(response.status).to.eq(201);
      //     expect(response.body.title).to.eq(title);
      //   })
      //   .then((response) => {
      //     const title = response.body.title;
      //     cy.log("New title");
      //   });
      cy.request(
        "GET",
        "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/" +
          response.body.id
      )
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.title).to.eq(title);
        })
        .then((response) => {
          const id = response.body.id;
          cy.log("New ID");
          expect(response.body.id).to.eq(id);
        });
    });
  });

  it("GET ALL books", () => {
    // https://on.cypress.io/request
    cy.request(
      "GET",
      "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/books/"
    ).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
      // expect(response.body.id.title.author).to.eq(body.id.title.author);
    });
  });

  it("UPDATE a book", () => {
    cy.request(
      "PUT",
      "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/" + id,
      {
        title: "New title",
        author: "Aniuta",
      }
    ).then((response) => {
      cy.request(
        "GET",
        "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/" +
          response.body.id
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq("New title");
      });
    });
  });

  it("DELETE a book", () => {
    cy.request(
      "DELETE",
      "https://f4hatlr72b.execute-api.us-east-1.amazonaws.com/production/" + id,
      {
        title: "New title",
        author: "Aniuta",
      }
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
