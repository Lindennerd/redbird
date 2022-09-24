import { useAuth } from '@redwoodjs/auth'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
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
    toast.success('Tweeted!')
  }

  return (
    <div className="rounded-md border p-2 shadow-md">
      <Toaster />
      <textarea
        className="w-full rounded-md border p-2 outline-none focus:shadow-xl"
        placeholder="What's going on?"
        name="tweet"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />

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
