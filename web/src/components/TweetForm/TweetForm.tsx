import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/dist/toast'


interface TweetInput {
  text: string
  userId: string
}

interface TweetFormProps {
  onPost: (input: TweetInput) => void
  onLoading: boolean
}

const tweetLimitSize = 160

const TweetForm = ({ onPost, onLoading }: TweetFormProps) => {
  const { currentUser } = useAuth()
  const [tweet, setTweet] = useState('')

  function onSendTweet() {
    if (tweet.length >= tweetLimitSize) {
      toast.error('Your tweet is too long!')
      return
    }
    if (tweet.length <= 0) {
      toast.error('Your tweet is too short')
      return
    }

    onPost({
      text: tweet,
      userId: currentUser.id,
    })
    setTweet('')
  }

  function handleChange(e) {
    setTweet((tweet) => e.target.value)
  }

  return (
    <div className="rounded-md border bg-white p-2 shadow-md dark:border-gray-900 dark:bg-gray-800 dark:text-white">
      <textarea
        className="w-full rounded-md border p-2 outline-none focus:shadow-xl dark:border-gray-900 dark:bg-gray-700"
        placeholder="What's going on?"
        name="tweet"
        value={tweet}
        onChange={handleChange}
      />
      <div className={tweet.length >= tweetLimitSize ? `text-red-600`: `dark:text-gray-400 text-gray-700`}>{`${
        tweetLimitSize - tweet.length
      } characters left`}</div>
      <div className="flex justify-between">
        <div>Tweet Stuff</div>
        <button
          disabled={onLoading}
          className="btn"
          onClick={(e) => onSendTweet()}
        >
          {onLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default TweetForm
