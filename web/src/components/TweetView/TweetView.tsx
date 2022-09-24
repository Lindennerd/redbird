import { useAuth } from "@redwoodjs/auth";
import TweetForm from "../TweetForm/TweetForm"
import TweetsCell from "../TweetsCell";

const TweetView = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      {isAuthenticated && <TweetForm />}
      <TweetsCell />
    </div>
  )
}

export default TweetView
