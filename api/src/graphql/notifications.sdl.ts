export const schema = gql`
  type Notification {
    id: String!
    user: User!
    tweet: Tweet!
    event: NotificationEvent!
    userId: String!
    tweetId: String!
    viewed: Boolean!
  }

  enum NotificationEvent {
    LIKED
    RETWEETED
    REPLYED
    MENTIONED
  }

  type Query {
    notifications: [Notification!]! @requireAuth
    countNotifications: Int! @requireAuth
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
