const graphql = require("graphql");
const typeDefs = require("../typeDefs");
const resolvers = require("../resolvers");
const { makeExecutableSchema } = require("@graphql-tools/schema");

describe("## User domain tests", () => {
  it("should ne able to register a user", async () => {
    const mutation = /* GraphQL */ `
      mutation registerUser(
        $name: String
        $email: String
        $password: String
        $passwordConfirmation: String
      ) {
        register(
          name: $name
          email: $email
          password: $password
          passwordConfirmation: $passwordConfirmation
        ) {
          id
          email
        }
      }
    `;

    const result = await graphql(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      mutation,
      {},
      null
    );

    expect(result.data.user.id).toBe("dassa");
  });
});
