import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: String
    name: String
  }

  type Query {
    hello: String
    users: [User]
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
