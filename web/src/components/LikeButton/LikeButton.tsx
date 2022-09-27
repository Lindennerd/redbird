import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { QUERY as TweetsQuery } from '../TweetsCell'
import { QUERY as TweetThreadQuery } from '../TweetCell'
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
    refetchQueries: [
      { query: TweetsQuery },
      {
        query: TweetThreadQuery,
        variables: {
          id: tweet.id,
        },
      },
    ],
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
