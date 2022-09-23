export const schema = gql`
  type UserCredential {
    id: String!
    userId: String!
    user: User!
    transports: String
    counter: BigInt!
  }

  type Query {
    userCredentials: [UserCredential!]! @requireAuth
  }

  input CreateUserCredentialInput {
    userId: String!
    transports: String
    counter: BigInt!
  }

  input UpdateUserCredentialInput {
    userId: String
    transports: String
    counter: BigInt
  }
`
