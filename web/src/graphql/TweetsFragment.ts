export const TweetsFragment = gql`
  fragment TweetsFragment on Tweets {
    id
    text
    createdAt
    likesCount
    repliesCount
    retweetsCount
    currentUserLiked
    user {
      id
      name
    }
    retweet {
      user {
        name
      }
      text
      createdAt
    }
  }
`
