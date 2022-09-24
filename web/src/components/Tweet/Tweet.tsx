import LikeButton from "../LikeButton/LikeButton"
import ReplyButton from "../ReplyButton/ReplyButton"
import RetweetButton from "../RetweetButton/RetweetButton"

interface TweetProps {
  id: string,
  createdAt: string,
  text: string,
  likes: {
    user: {
      name: string
    }
  }[],
  user: {
    name: string
  }
}

const Tweet = ({ tweet }: { tweet: TweetProps }) => {
  function dateFormat(date: string) {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const asDate = new Date(date);
    return Intl.DateTimeFormat(locale).format(asDate)
  }

  return (
    <div className="w-full rounded-md border">
      <div className="flex justify-between p-2">
        <span className="text-sm text-gray-500">{tweet.user.name}</span>
        <span className="text-sm text-gray-500">
          {dateFormat(tweet.createdAt)}
        </span>
      </div>
      <div className="px-4 py-2">{tweet.text}</div>
      <div className="flex justify-between p-2 items-center">
        <ReplyButton />
        <RetweetButton />
        <LikeButton />
      </div>
    </div>
  )
}

export default Tweet
