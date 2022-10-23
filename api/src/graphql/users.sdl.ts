export const schema = gql`
  type User {
    id: String!
    name: String!
    hashedPassword: String!
    email: String!
    createdAt: DateTime!
    profile: Profile!
    profileId: String!
    followerId: String
    follower: User
    followers: [User]!
    followingId: String
    follow: User
    following: [User]!
    tweets: [Tweet]!
    Like: [Like]!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
    credentials: [UserCredential]!
  }

  type UserDetails {
    id: String!
    name: String!
    email: String!
    createdAt: DateTime!
    profile: Profile!
    followers: [User]!
    followingId: String
    following: [User]!
    tweets: [Tweet]!
    _count: UserCount
  }

  type UserCount {
    followers: Int
    following: Int
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String): UserDetails! @skipAuth
  }

  input CreateUserInput {
    name: String!
    hashedPassword: String!
    email: String!
    profileId: String!
    followerId: String
    followingId: String
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }

  input UpdateUserInput {
    name: String
    hashedPassword: String
    email: String
    profileId: String
    followerId: String
    followingId: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    webAuthnChallenge: String
  }
`
