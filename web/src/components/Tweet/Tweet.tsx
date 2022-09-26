import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
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
  const [toggleReplyModal, setToggleReplyModal] = useState(false)

  function dateFormat(datetime: string) {
    const parsedDate = new Date(datetime)
    const month = parsedDate.toLocaleString('default', { month: 'long' })
    return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
  }

  return (
    <div className="w-full rounded-md border">
      <div className="flex justify-between p-2 hover:cursor-pointer hover:bg-slate-100">
        <Link to={routes.tweet({ id: props.tweet.id })}>
          <span className="text-sm text-gray-500">{props.tweet.user.name}</span>
          <span className="text-sm text-gray-500">
            {dateFormat(props.tweet.createdAt)}
          </span>
          <div className="px-4 py-2">{props.tweet.text}</div>
        </Link>
      </div>
      {props.displayActions && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
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
