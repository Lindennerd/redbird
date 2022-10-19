export const schema = gql`
  type Tweet {
    id: String!
    text: String!
    createdAt: DateTime!
    user: User!
    userId: String!
    likes: [Like]!
    retweets: [Tweet]
    retweet: Tweet
    replies: [Tweet]
    repliesTo: Tweet
  }

  type Tweets {
    id: String!
    text: String!
    createdAt: DateTime!
    user: User!
    likesCount: Int
    retweetsCount: Int
    repliesCount: Int
    replyTo: Tweet
    retweet: Tweet
    currentUserLiked: Boolean
    likes: [Like]!
    retweets: [Tweet]
    replies: [Tweet]
  }


  type Query {
    tweets: [Tweets!]! @skipAuth
    tweet(id: String!): Tweet @skipAuth
  }

  input CreateTweetInput {
    text: String!
    userId: String!
  }

  input ReplyTweetInput {
    text: String!
    userId: String!
    repliesTo: String!
  }

  input UpdateTweetInput {
    text: String
    userId: String
  }

  input RetweetInput {
    retweetId: String!
  }

  input RetweetWithCommentInput {
    retweetId: String!
    text: String!
  }


  type Mutation {
    createTweet(input: CreateTweetInput!): Tweets! @requireAuth
    reply(input: ReplyTweetInput!): Tweet! @requireAuth
    retweet(input: RetweetInput!): Tweets! @requireAuth
    retweetWithComment(input: RetweetWithCommentInput!): Tweets! @requireAuth
    updateTweet(id: String!, input: UpdateTweetInput!): Tweet! @requireAuth
    deleteTweet(id: String!): Tweet! @requireAuth
  }
`
