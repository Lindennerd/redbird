import { useState } from 'react'
import LikeButton from '../LikeButton/LikeButton'
import ReplyButton from '../ReplyButton/ReplyButton'
import ReplyTweet from '../ReplyTweet/ReplyTweet'
import RetweetButton from '../RetweetButton/RetweetButton'
import Modal from '../UI/Modal'

export interface ITweet {
  __typename?: 'Tweets'
  id: string
  createdAt: string
  text: string
  repliesTo?: {
    id: string
  }
  user?: {
    name: string
  }
  _count?: {
    replies?: number
    likes?: number
    retweet?: number
  }
}

interface TweetProps {
  displayActions: boolean
  tweet: ITweet
}

const Tweet = (props: TweetProps) => {
  const [toggleReplyModal, setToggleReplyModal] = useState(false);

  function dateFormat(date: string) {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale
    const asDate = new Date(date)
    return Intl.DateTimeFormat(locale).format(asDate)
  }

  return (
    <div className="w-full rounded-md border">
      <div className="flex justify-between p-2">
        <span className="text-sm text-gray-500">{props.tweet.user.name}</span>
        <span className="text-sm text-gray-500">
          {dateFormat(props.tweet.createdAt)}
        </span>
      </div>
      <div className="px-4 py-2">{props.tweet.text}</div>
      {props.displayActions && (
        <div className="flex items-center justify-between p-2">
          <div className='flex items-center'>
            <ReplyButton onClick={() => setToggleReplyModal(true)} />
            <span>{props.tweet._count.replies}</span>
          </div>
          <RetweetButton />
          <LikeButton />
        </div>
      )}

      <Modal
        isOpen={toggleReplyModal}
        title="You are replying to a tweet"
        toggle={() => setToggleReplyModal(!toggleReplyModal)}
      >
        <ReplyTweet tweet={props.tweet} />
      </Modal>
    </div>
  )
}

export default Tweet
