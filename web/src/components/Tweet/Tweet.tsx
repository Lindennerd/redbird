import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import LikeButton from '../LikeButton/LikeButton'
import ReplyButton from '../ReplyButton/ReplyButton'
import ReplyTweet from '../ReplyTweet/ReplyTweet'
import RetweetButton from '../RetweetButton/RetweetButton'
import Modal from '../UI/Modal'
import { Tweet as TweetType } from 'types/graphql'

interface TweetProps {
  displayActions: boolean
  tweet: TweetType
}

const Tweet = (props: TweetProps) => {
  const [toggleReplyModal, setToggleReplyModal] = useState(false)

  function dateFormat(datetime: string) {
    const parsedDate = new Date(datetime)
    const month = parsedDate.toLocaleString('default', { month: 'long' })
    return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
  }

  return (
    <div className="w-full rounded-md border hover:cursor-pointer hover:bg-slate-100">
      <Link to={routes.tweet({ id: props.tweet.id })}>
        <div className="flex justify-between p-2">
        <span className="text-sm text-gray-500">
              {props.tweet.user.name}
            </span>
          {props.tweet.retweet && (
            <div>
              <span className="text-sm text-gray-500">
                Retweets from {props.tweet.retweet.user.name}
              </span>
            </div>
          )}
          <span className="text-sm text-gray-500">
            {dateFormat(props.tweet.createdAt)}
          </span>
        </div>
        <div className="px-4 py-2">{props.tweet.text}</div>
        {props.tweet.retweet && (<div className="px-4 py-2">{ props.tweet.retweet.text}</div>)}
      </Link>
      {props.displayActions && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <ReplyButton onClick={() => setToggleReplyModal(true)} />
            <span>{props.tweet.replies?.length ?? 0}</span>
          </div>
          <div className="flex items-center">
            <RetweetButton tweet={props.tweet} />
            {props.tweet.retweets?.length ?? 0}
          </div>

          <div className="flex items-center">
            <LikeButton tweet={props.tweet} />
            {props.tweet.likes.length}
          </div>
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
