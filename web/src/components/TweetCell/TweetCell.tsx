import type { FindTweetQuery, FindTweetQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ReactLoading from 'react-loading'
import Tweet from '../Tweet/Tweet'

export const QUERY = gql`
  query FindTweetQuery($id: String!) {
    tweet(id: $id) {
      _count {
        likes
        replies
        retweets
      }
      id
      text
      createdAt
      currentUserLiked
      likes {
        __typename
      }
      retweet {
        id
        text
        createdAt
        user {
          id
          name
          profile {
            displayName
            image
          }
        }
      }
      user {
        id
        name
        profile {
          displayName
          image
        }
      }
      replies {
        _count {
          likes
          replies
          retweets
        }
        id
        text
        createdAt
        currentUserLiked
        replies {
          id
        }
        likes {
          __typename
        }
        retweet {
          text
          user {
            id
            name
            profile {
              displayName
              image
            }
          }
        }
        user {
          id
          name
          createdAt
          profile {
            displayName
            image
          }
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
      <div>
        <div className="flex">
          <div className="p-4 border-l-2 ml-2 border-l-gray-600"></div>
          <div className="flex flex-col w-full gap-2 mt-2">
          {tweet.replies.map((reply) => (
            <Tweet tweet={reply} key={reply.id} displayActions={true} />
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
