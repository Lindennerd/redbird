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
      }
      retweet {
        id
      }
      replies {
        id
        text
        createdAt
        user {
          name
        }
      }
      user {
        name
      }
    }
  }
`

export const Loading = () => (
  <ReactLoading type="bubbles" color="#EF3109" height={'10%'} width={'10%'} />
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
      <Tweet tweet={tweet} />
      <div>

      </div>
    </div>
  )
}
