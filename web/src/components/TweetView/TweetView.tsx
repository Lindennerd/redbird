import { useAuth } from "@redwoodjs/auth";
import NewTweet from "../NewTweet/NewTweet";
import TweetsCell from "../TweetsCell";

const TweetView = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      {isAuthenticated && <NewTweet />}
      <TweetsCell />
    </div>
  )
}

export default TweetView
