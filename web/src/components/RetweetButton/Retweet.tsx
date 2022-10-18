import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { FaRetweet } from 'react-icons/fa'
import { Tweet } from 'types/graphql'
import { QUERY as TweetsQuery } from '../TweetsCell'

export const RETWEET_MUTATION = gql`
  mutation Retweet($input: RetweetInput!) {
    retweet(input: $input) {
      id
      createdAt
      text
      userId
      user {
        name
      }
      repliesTo {
        __typename
      }
      likes {
        __typename
      }
      replies {
        __typename
      }
      retweets {
        __typename
      }
      retweet {
        __typename
      }
    }
  }
`

export function Retweet({ tweet }: { tweet: Tweet }) {
  const { isAuthenticated } = useAuth()

  const [retweet, { loading, error }] = useMutation(RETWEET_MUTATION, {
    onError(error) {
      console.error(error)
      toast.error('Something went wrong :( ')
    },
    onCompleted(data) {
      toast.success('Retweet sent!')
    },
    update: (cache, { data: { retweet } }) => {
      const { tweets }: { tweets: Tweet[] } = cache.readQuery({
        query: TweetsQuery,
      })
      cache.writeQuery({
        query: TweetsQuery,
        data: { tweets: [retweet, ...tweets] },
      })
    },
  })

  function onRetweet() {
    if (!isAuthenticated) {
      toast.error('You must be logged in to do this')
    } else {
      retweet({
        variables: {
          input: {
            retweetId: tweet.id,
          },
        },
      })
    }
  }

  return (
    <button
      disabled={loading}
      onClick={(e) => onRetweet()}
      className="flex w-full items-center gap-2 p-2 hover:bg-slate-100"
    >
      <FaRetweet />
      <span>{loading ? 'Sending the retweet...' : 'Retweet'}</span>
    </button>
  )
}
