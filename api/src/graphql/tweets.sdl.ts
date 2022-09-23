export const schema = gql`
  type Tweet {
    id: String!
    text: String!
    createdAt: DateTime!
    user: User!
    userId: String!
    likes: [Like]!
    retweet: [Share]
    replies: [Tweet]
    repliesTo: Tweet
  }

  type Query {
    tweets: [Tweet!]! @skipAuth
    tweet(id: String!): Tweet @skipAuth
  }

  input CreateTweetInput {
    text: String!
    userId: String!
  }

  input UpdateTweetInput {
    text: String
    userId: String
  }

  type Mutation {
    createTweet(input: CreateTweetInput!): Tweet! @requireAuth
    updateTweet(id: String!, input: UpdateTweetInput!): Tweet! @requireAuth
    deleteTweet(id: String!): Tweet! @requireAuth
  }
`
