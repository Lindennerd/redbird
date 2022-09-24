import { useState } from 'react'
import LikeButton from '../LikeButton/LikeButton'
import ReplyButton from '../ReplyButton/ReplyButton'
import ReplyModal from '../ReplyModal/ReplyModal'
import RetweetButton from '../RetweetButton/RetweetButton'

export interface ITweet {
  id: string
  createdAt: string
  text: string
  likes: {
    user: {
      name: string
    }
  }[]
  user: {
    name: string
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
          <ReplyButton onClick={() => setToggleReplyModal(true)} />
          <RetweetButton />
          <LikeButton />
        </div>
      )}

      <ReplyModal
        isOpen={toggleReplyModal}
        toggle={() => setToggleReplyModal(!toggleReplyModal)}
        replyingTo={props.tweet}
      />
    </div>
  )
}

export default Tweet
