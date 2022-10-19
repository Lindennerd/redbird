import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { Tweets } from 'types/graphql'

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

const LikeButton = ({ tweet }: { tweet: Tweets }) => {
  const { currentUser } = useAuth()
  const [createLike, { loading, error }] = useMutation(MUTATION_LIKE, {
    update: (cache, { data: { createLike } }) => {
      cache.modify({
        optimistic: true,
        id: cache.identify(tweet),
        fields: {
          likes: (currLikesRef, { readField }) => {
            if (createLike.operation === 'DELETE') {
              return currLikesRef.filter(
                (like) => readField('id', like) !== createLike.like.id
              )
            } else {
              return [...currLikesRef, createLike.like]
            }
          },
        },
      })
    },
  })

  function onLikeClick() {
    createLike({
      variables: {
        input: {
          tweetId: tweet.id,
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
      {tweet.currentUserLiked ? (
        <FaHeart className="hover:text-primary" />
      ) : (
        <FaRegHeart className="hover:text-primary" />
      )}
    </button>
  )
}

export default LikeButton
