export const schema = gql`
  type Share {
    id: String!
    tweet: Tweet!
    tweetId: String!
  }

  type Query {
    shares: [Share!]! @requireAuth
    share(id: String!): Share @requireAuth
  }

  input CreateShareInput {
    tweetId: String!
  }

  input UpdateShareInput {
    tweetId: String
  }

  type Mutation {
    createShare(input: CreateShareInput!): Share! @requireAuth
    updateShare(id: String!, input: UpdateShareInput!): Share! @requireAuth
    deleteShare(id: String!): Share! @requireAuth
  }
`
