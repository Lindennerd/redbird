import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import UserDetails from '../UserDetails/UserDetails'
import ReactLoading from 'react-loading'

export const QUERY = gql`
  query FindUserQuery($id: String!) {
    user: user(id: $id) {
      id
      name
      createdAt
      _count {
        followers
        following
      }
      profile {
        bio
        birth
        displayName
        image
        location
        website
      }
      tweets {
        createdAt
        currentUserLiked
        id
        text
        user {
          name
          profile {
            displayName
            image
          }
        }
        _count {
          replies
          retweets
          likes
        }
      }
    }
  }
`

export const beforeQuery = (props) => {
  return {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      id: props.id
    }
  }
}

export const Loading = () => (
  <div className="flex items-center justify-center">
    <ReactLoading type="bubbles" color="#EF3109" height={'10%'} width={'10%'} />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  return <UserDetails user={user}/>
}
