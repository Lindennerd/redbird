import type { TweetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'


export const QUERY = gql`
  query TweetsQuery {
    tweets {
      id
      createdAt
      text
      likes {
        user {
          name
        }
      }
      retweet {
        id
      }
      user {
        name
      }
      replies {
        id
      }
      repliesTo {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ tweets }: CellSuccessProps<TweetsQuery>) => {
  return (
    <ul>
      {tweets.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
