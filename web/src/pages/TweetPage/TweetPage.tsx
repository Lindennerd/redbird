import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import  TweetCell  from "src/components/TweetCell";

const TweetPage = ({id}: {id: string}) => {
  return (
    <>
      <MetaTags title="Tweet" description="Tweet page" />
      <TweetCell id={id} />
    </>
  )
}

export default TweetPage
