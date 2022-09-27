import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { QUERY as TweetsQuery } from '../TweetsCell'
import { Tweet as TweetType } from 'types/graphql'

const MUTATION_LIKE = gql`
  mutation LIKE($input: CreateLikeInput!) {
    createLike(input: $input) {
      like {
        id
        userId
        tweetId
      }
      operation
    }
  }
`

const LikeButton = ({ tweet }: { tweet: TweetType }) => {
  const { currentUser } = useAuth()
  const [createLike, { loading, error }] = useMutation(MUTATION_LIKE, {
    update: (cache, { data: { createLike } }) => {
      const { tweets }: { tweets: TweetType[] } = cache.readQuery({
        query: TweetsQuery,
      })
      cache.writeQuery({
        query: TweetsQuery,
        data: {
          tweets: tweets.map((tweet) => {
            if (createLike.operation === 'DELETE') {
              return {
                ...tweet,
                likes: {
                  ...tweet.likes.find((like) => like.id !== createLike.like.id),
                },
                _count: {
                  ...tweet._count,
                  likes: tweet._count.likes - 1,
                },
              }
            } else {
              return {
                ...tweet,
                likes: {
                  ...[...tweet.likes, createLike.like],
                },
                _count: {
                  ...tweet._count,
                  likes: tweet._count.likes + 1,
                },
              }
            }
          }),
        },
      })
    },
  })

  function onLikeClick() {
    createLike({
      variables: {
        input: {
          tweetId: tweet.id,
          userId: currentUser.id,
        },
      },
    })
  }

  return (
    <button
      onClick={(e) => onLikeClick()}
      className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md"
    >
      {tweet.likes?.some((like) => like.userId === currentUser.id) ? (
        <FaHeart className="hover:text-primary" />
      ) : (
        <FaRegHeart className="hover:text-primary" />
      )}
    </button>
  )
}

export default LikeButton
