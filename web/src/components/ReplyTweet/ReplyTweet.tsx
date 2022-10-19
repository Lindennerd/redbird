import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import Tweet from '../Tweet/Tweet'
import TweetForm from '../TweetForm/TweetForm'
import { QUERY as TweetsQuery } from '../TweetsCell'
import { QUERY as TweetThreadQuery } from '../TweetCell'
import { Tweets } from 'types/graphql'



const REPLY = gql`
  mutation ReplyTweet($input: ReplyTweetInput!) {
    reply(input: $input) {
      id
      createdAt
      repliesTo {
        id
      }
      text
      user {
        name
      }
    }
  }
`

interface ReplyTweetProps {
  tweet: Tweets
}

const ReplyTweet = ({ tweet }: ReplyTweetProps) => {
  const [replyTweet, { loading }] = useMutation(REPLY, {
    refetchQueries: [
      { query: TweetsQuery },
      {
        query: TweetThreadQuery,
        variables: {
          id: tweet.id,
        },
      },
    ],
    onError: (error) => {
      console.error(error)
      toast.error(error.message)
    },
    onCompleted() {
      toast.success("Reply Sent")
    }
  })

  function onPost(reply) {
    replyTweet({
      variables: {
        input: { ...reply, repliesTo: tweet.id },
      },
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <Tweet tweet={tweet} displayActions={false} />
      <TweetForm onPost={onPost} onLoading={loading} />
    </div>
  )
}

export default ReplyTweet
