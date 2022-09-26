import type { TweetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import Tweet from '../Tweet/Tweet'
import ReactLoading from 'react-loading';

export const QUERY = gql`
  query TweetsQuery {
    tweets {
      id
      createdAt
      text
      repliesTo {
        id
      }
      user {
        name
      }
      _count {
        replies
        likes
        retweet
      }
    }
  }
`

export const beforeQuery = (props) => {
  return {
    fetchPolicy: 'network-only'
  }
}

export const Loading = () => (
  <ReactLoading type="bubbles" color="#EF3109" height={'10%'} width={'10%'} />
)

export const Empty = () => <div>Nothing to see here</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ tweets }: CellSuccessProps<TweetsQuery>) => {
  return (
    <div className="flex flex-col gap-2">
      {tweets.map((item) => {
        return (
          <div
            key={item.id}
            className="hover:cursor-pointer hover:bg-slate-100"
          >
            <Link to={routes.tweet({id: item.id})}>
              <Tweet tweet={item} displayActions={true} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
