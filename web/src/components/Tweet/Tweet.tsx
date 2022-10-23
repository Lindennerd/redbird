import { useState } from 'react'
import { Link, navigate, routes } from '@redwoodjs/router'
import LikeButton from '../LikeButton/LikeButton'
import ReplyButton from '../ReplyButton/ReplyButton'
import ReplyTweet from '../ReplyTweet/ReplyTweet'
import RetweetButton from '../RetweetButton/RetweetButton'
import Modal from '../UI/Modal'
import { Tweet as TweetType } from 'types/graphql'
import { FaRetweet } from 'react-icons/fa'

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

  function navigateToUser(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    navigate(routes.user({id: props.tweet.user.id}));
  }

  return (
    <div
      className="w-full rounded-md border bg-white hover:cursor-pointer hover:bg-slate-100
     dark:border-gray-900 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900"
    >
      <Link to={routes.tweet({ id: props.tweet.id })}>
        {props.tweet.retweet && (
          <div className="flex items-center gap-2 p-2 text-gray-600">
            {' '}
            <FaRetweet /> {props.tweet.retweet.user.name}
          </div>
        )}
        <div className="flex items-start gap-4 p-2">
          <a onClick={e => navigateToUser(e)}>
            <img
              className="w-14 rounded-full"
              src={props.tweet.user.profile.image}
              alt=""
            />
          </a>

          <div className="flex w-full flex-col gap-2">
            <div>
              <a onClick={e => navigateToUser(e)} className="hover:border-b transition-all">
                <span className="font-semibold">
                  {props.tweet.user.profile.displayName}
                </span>
                <span className="text-gray-600">
                  @{props.tweet.user.name} - {dateFormat(props.tweet.createdAt)}
                </span>
              </a>
            </div>
            <div>{props.tweet.text}</div>
            {props.tweet.retweet && (
              <div>
                <Tweet tweet={props.tweet.retweet} displayActions={false} />
              </div>
            )}
          </div>
        </div>
      </Link>

      {props.displayActions && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-1">
            <ReplyButton onClick={() => setToggleReplyModal(true)} />
            <span>{props.tweet._count.replies}</span>
          </div>
          <div className="flex items-center gap-1">
            <RetweetButton tweet={props.tweet} />
            {props.tweet._count.retweets}
          </div>

          <div className="flex items-center gap-1">
            <LikeButton tweet={props.tweet} />
            {props.tweet._count.likes}
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
