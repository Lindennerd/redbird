import { useAuth } from "@redwoodjs/auth"
import { useMutation } from "@redwoodjs/web";
import { toast, Toaster } from "@redwoodjs/web/dist/toast";
import { useState } from "react";

const CREATE = gql`
  mutation CreateTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
      createdAt
      text
      user {
        name
      }
    }
  }
`

const TweetForm = () => {
  const { currentUser } = useAuth();
  const [createTweet, { loading, error }] = useMutation(CREATE);
  const [tweet, setTweet] = useState('');

  function onSendTweet() {
    createTweet({
      variables: {
        input: {
          text: tweet,
          userId: currentUser.id
        }
      }
    });

    setTweet('');
    toast.success('Tweet Sent');
  }

  return (
    <div className="border p-2 rounded-md shadow-md">
      <Toaster />
      <textarea
        className="w-full border rounded-md p-2 outline-none focus:shadow-xl"
        placeholder="What's going on?"
        name="tweet"
        value={tweet}
        onChange={e => setTweet(e.target.value)}
      />

      <div className="flex justify-between">
        <div>Tweet Stuff</div>
        <button
          disabled={loading}
          className="btn"
          onClick={e => onSendTweet()}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default TweetForm
