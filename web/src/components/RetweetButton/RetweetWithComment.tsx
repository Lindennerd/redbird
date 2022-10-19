import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { Tweets } from 'types/graphql'
import Tweet from '../Tweet/Tweet'
import TweetForm from '../TweetForm/TweetForm'
import { QUERY as TweetsQuery } from '../TweetsCell'
import Modal from '../UI/Modal'

export const RETWEET_WITHCOMMENT_MUTATION = gql`
  mutation RetweetWithComment($input: RetweetWithCommentInput!) {
    retweetWithComment(input: $input) {
      id
      createdAt
      text
      userId
      user {
        name
      }
      repliesTo {
        __typename
        id
      }
      likes {
        __typename
        id
      }
      replies {
        __typename
        id
      }
      retweets {
        __typename
        id
      }
      retweet {
        __typename
        id
        text
        user{
          name
        }
      }
    }
  }
`

export function RetweetWithComment({ tweet }: { tweet: Tweets }) {
  const { isAuthenticated } = useAuth()
  const [toggleModal, setToggleModal] = useState(false)

  const [retweet, { loading, error }] = useMutation(
    RETWEET_WITHCOMMENT_MUTATION,
    {
      onError(error) {
        console.error(error)
        toast.error('Something went wrong :( ')
      },
      onCompleted(data) {
        toast.success('Retweet sent!')
      },
      update: (cache, { data: { retweetWithComment } }) => {
        const { tweets }: { tweets: Tweets[] } = cache.readQuery({
          query: TweetsQuery,
        })
        cache.writeQuery({
          query: TweetsQuery,
          data: { tweets: [retweetWithComment, ...tweets] },
        })
      },
    }
  )

  function onRetweet(data) {
    if (!isAuthenticated) {
      toast.error('You must be logged in to do this')
    } else {
      retweet({
        variables: {
          input: {
            retweetId: tweet.id,
            text: data.text
          },
        },
      })
    }
  }

  return (
    <>
      <button
        onClick={(e) => setToggleModal(!toggleModal)}
        className="flex w-full items-center gap-2 p-2 hover:bg-slate-100"
      >
        <FaPencilAlt />
        <span>Retweet with a comment</span>
      </button>

      <Modal
        isOpen={toggleModal}
        title="Retweet"
        toggle={() => setToggleModal(!toggleModal)}
      >
        <div className="flex flex-col gap-2">
          <TweetForm onPost={onRetweet} onLoading={loading} />
          <Tweet tweet={tweet} displayActions={false} />
        </div>
      </Modal>
    </>
  )
}
