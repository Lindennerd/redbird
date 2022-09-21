const typeDefs = /* GraphQL */ `
  type User {
    id: String
    name: String
  }

  type Session {
    user: User
    token: String
  }

  type Query {
    hello: String
    users: [User]
    login(user: String!, password: String!): Session
  }

  type Mutation {
    registerUser(
      name: String
      email: String
      password: String
      passwordConfirmation: String
    ): User
  }
`;

export default typeDefs;
