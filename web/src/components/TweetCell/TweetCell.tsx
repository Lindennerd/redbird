import type { FindTweetQuery, FindTweetQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ReactLoading from 'react-loading'
import Tweet from '../Tweet/Tweet'

export const QUERY = gql`
  query FindTweetQuery($id: String!) {
    tweet(id: $id) {
      id
      text
      createdAt
      likes {
        id
        userId
      }
      retweet {
        id
      }
      userId
      user {
        name
      }
      replies {
        id
        text
        createdAt
        userId
        user {
          name
        }
        likes {
          id
          userId
        }
        replies {
          id
        }
      }
    }
  }
`

export const Loading = () => (
  <div className="flex items-center justify-center">
    <ReactLoading type="bubbles" color="#EF3109" height={'10%'} width={'10%'} />
  </div>
)


export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTweetQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  tweet,
}: CellSuccessProps<FindTweetQuery, FindTweetQueryVariables>) => {
  return (
    <div>
      <Tweet tweet={tweet} displayActions={true} />
      <div className="ml-4">
        {tweet.replies.map(reply => (
          <Tweet tweet={reply} key={reply.id} displayActions={true} />
        ))}
      </div>
    </div>
  )
}
