import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import Tweet from '../Tweet/Tweet'
import TweetForm from '../TweetForm/TweetForm'
import { QUERY as TweetsQuery } from '../TweetsCell'
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
    onError: (error) => {
      console.error(error)
      toast.error(error.message)
    },
    update: (cache, { data }) => {
      const {reply} = data;

      const { tweets }: any = cache.readQuery({ query: TweetsQuery })
      cache.writeQuery({
        query: TweetsQuery,
        data: {
          tweets: tweets.map((t) => {
            if (t.id === reply.repliesTo.id) {
              return {
                ...t, _count: {
                  replies: t._count.replies + 1,
                  retweet: t._count.retweet,
                  likes: t._count.likes
                }
              }
            } else return t;
          }),
        },
      })
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
