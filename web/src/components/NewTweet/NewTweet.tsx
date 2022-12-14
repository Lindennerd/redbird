import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { Tweet } from 'types/graphql'
import TweetForm from '../TweetForm/TweetForm'
import { QUERY as TweetsQuery } from '../TweetsCell'

const CREATE = gql`
  mutation CreateTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
      _count {
        likes
        replies
        retweets
      }
      id
      text
      user {
        name
        createdAt
      }
    }
  }
`

const NewTweet = () => {
  const [createTweet, { loading, error }] = useMutation(CREATE, {
    onError: (error) => toast.error(error.message),
    update: (cache, { data: { createTweet } }) => {
      const { tweets } : {tweets: Tweet[]} = cache.readQuery({ query: TweetsQuery })
      cache.writeQuery({
        query: TweetsQuery,
        data: { tweets: [createTweet, ...tweets] },
      })
    },
  })

  function onPost(tweet) {
    createTweet({
      variables: {
        input: tweet,
      },
    })
  }

  return (
    <>
      <TweetForm onPost={onPost} onLoading={loading} />
    </>
  )
}

export default NewTweet
