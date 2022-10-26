export const schema = gql`
  type Notification {
    id: String!
    user: User!
    tweet: Tweet!
    event: NotificationEvent!
    userId: String!
    tweetId: String!
  }

  enum NotificationEvent {
    LIKED
    RETWEETED
    REPLYED
    MENTIONED
  }

  type Query {
    notifications: [Notification!]! @requireAuth
  }

  input CreateNotificationInput {
    event: NotificationEvent!
    userId: String!
    tweetId: String!
  }

  input UpdateNotificationInput {
    event: NotificationEvent
    userId: String
    tweetId: String
  }
`
