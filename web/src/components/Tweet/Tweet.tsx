
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

  return <div className="w-full rounded-md border p-2">
    <div>
      {tweet.text}
    </div>
    <div>
      {`Tweeted by ${tweet.user.name} at ${dateFormat(tweet.createdAt)}`}
    </div>
    <div>
      Actions
    </div>
  </div>
}

export default Tweet
