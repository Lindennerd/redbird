import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import TweetForm from '../TweetForm/TweetForm'
import { QUERY as TweetsQuery } from '../TweetsCell'

const CREATE = gql`
  mutation CreateTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
      createdAt
      text
      user {
        name
      }
    }
  }
`

const NewTweet = () => {
  const [createTweet, { loading, error }] = useMutation(CREATE, {
    onError: (error) => toast.error(error.message),
    update: (cache, { data: { createTweet } }) => {
      const { tweets }: any = cache.readQuery({ query: TweetsQuery })
      cache.writeQuery({
        query: TweetsQuery,
        data: { tweets: tweets.concat([createTweet]) },
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
      <Toaster />
      <TweetForm onPost={onPost} onLoading={loading} />
    </>
  )
}

export default NewTweet
