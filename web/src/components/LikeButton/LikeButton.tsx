import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Tweet } from 'types/graphql'

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

const LikeButton = ({ tweet }: { tweet: Tweet }) => {
  const { isAuthenticated } = useAuth()
  const [createLike, { loading, error }] = useMutation(MUTATION_LIKE, {
    update: (cache, { data: { createLike } }) => {
      cache.modify({
        optimistic: true,
        id: cache.identify(tweet),
        fields: {
          _count: (_count, { readField }) => {
            console.log(_count)
            if (createLike.operation === 'DELETE') {
              return _count.likes -1
            } else {
              return _count.likes +1
            }
          },
          currentUserLiked: () => {
            return createLike.operation !== 'DELETE'
          }
        },
      })
    },
  })

  function onLikeClick() {

    if (!isAuthenticated) {
      toast.error('You must be logged in to do this')
    } else {
      createLike({
        variables: {
          input: {
            tweetId: tweet.id,
          },
        },
      })
    }
  }

  return (
    <button
      onClick={(e) => onLikeClick()}
      className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md  hover:text-primary dark:hover:bg-gray-700"
    >
      {tweet.currentUserLiked ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </button>
  )
}

export default LikeButton
