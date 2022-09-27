import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import Tweet from '../Tweet/Tweet'
import TweetForm from '../TweetForm/TweetForm'
import { QUERY as TweetsQuery } from '../TweetsCell'
import { QUERY as TweetThreadQuery } from '../TweetCell'
import { Tweet as TweetType } from 'types/graphql'



const REPLY = gql`
  mutation ReplyTweet($input: ReplyTweetInput!) {
    reply(input: $input) {
      id
      createdAt
      repliesTo {
        id
      }
      _count {
        replies
        retweet
        likes
      }
      text
      user {
        name
      }
    }
  }
`

interface ReplyTweetProps {
  tweet: TweetType
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
