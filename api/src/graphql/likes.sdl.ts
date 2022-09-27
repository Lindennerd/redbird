export const schema = gql`
  type Like {
    id: String!
    createdAt: DateTime!
    tweet: Tweet!
    user: User!
    tweetId: String!
    userId: String!
  }

  enum OPERATION {
    DELETE
    CREATE
  }

  type LikeOutput {
    like: Like!
    operation: OPERATION!
  }

  type Query {
    likes: [Like!]! @requireAuth
    like(id: String!): Like @requireAuth
  }

  input CreateLikeInput {
    tweetId: String!
    userId: String!
  }

  input UpdateLikeInput {
    tweetId: String
    userId: String
  }

  type Mutation {
    createLike(input: CreateLikeInput!): LikeOutput! @requireAuth
    updateLike(id: String!, input: UpdateLikeInput!): Like! @requireAuth
    deleteLike(id: String!): Like! @requireAuth
  }
`
