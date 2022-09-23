export const schema = gql`
  type Profile {
    id: String!
    image: String
    displayName: String!
    theme: Theme!
    bio: String
    location: String
    website: String
    birth: String
    User: [User]!
  }

  enum Theme {
    DARK
    LIGHT
  }

  type Query {
    profiles: [Profile!]! @requireAuth
    profile(id: String!): Profile @requireAuth
  }

  input CreateProfileInput {
    image: String
    displayName: String!
    theme: Theme!
    bio: String
    location: String
    website: String
    birth: String
  }

  input UpdateProfileInput {
    image: String
    displayName: String
    theme: Theme
    bio: String
    location: String
    website: String
    birth: String
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile! @requireAuth
    updateProfile(id: String!, input: UpdateProfileInput!): Profile!
      @requireAuth
    deleteProfile(id: String!): Profile! @requireAuth
  }
`
