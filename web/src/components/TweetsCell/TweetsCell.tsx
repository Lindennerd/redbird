import type { TweetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Tweet from '../Tweet/Tweet'
import ReactLoading from 'react-loading'
import { TweetsFragment } from 'src/graphql/TweetsFragment'


export const QUERY = gql`
  ${TweetsFragment}
  query TweetsQuery {
    tweets {
      ...TweetsFragment
    }
  }
`

export const beforeQuery = (props) => {
  return {
    fetchPolicy: 'network-only',
    // pollInterval: 2500
  }
}

export const Loading = () => (
  <div className="flex items-center justify-center">
    <ReactLoading type="bubbles" color="#EF3109" height={'10%'} width={'10%'} />
  </div>
)

export const Empty = () => <div>Nothing to see here</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ tweets }: CellSuccessProps<TweetsQuery>) => {
  return (
    <div className="flex flex-col gap-2">
      {tweets.map((item) => {
        return <Tweet tweet={item} key={item.id} displayActions={true} />
      })}
    </div>
  )
}
