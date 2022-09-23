import { useAuth } from "@redwoodjs/auth";
import TweetForm from "../TweetForm/TweetForm"
import TweetsCell from "../TweetsCell";

const TweetView = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated && <TweetForm />}
      <TweetsCell />
    </div>
  )
}

export default TweetView
