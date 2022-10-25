import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

interface TweetInput {
  text: string
  userId: string
}

interface TweetFormProps {
  onPost: (input: TweetInput) => void
  onLoading: boolean
}

const TweetForm = ({ onPost, onLoading }: TweetFormProps) => {
  const { currentUser } = useAuth()
  const [tweet, setTweet] = useState('')

  function onSendTweet() {
    onPost({
      text: tweet,
      userId: currentUser.id,
    });

    setTweet('');
  }

  return (
    <div className="rounded-md border p-2 shadow-md dark:border-gray-900 dark:text-white bg-white dark:bg-gray-800">
      <textarea
        className="w-full rounded-md p-2 outline-none border focus:shadow-xl dark:bg-gray-700 dark:border-gray-900"
        placeholder="What's going on?"
        name="tweet"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />
      <div></div>
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
