import type { TweetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Tweet from '../Tweet/Tweet'


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
    <div className="flex flex-col gap-2">
      {tweets.map((item) => {
        return <Tweet key={item.id} tweet={item} />
      })}
    </div>
  )
}
