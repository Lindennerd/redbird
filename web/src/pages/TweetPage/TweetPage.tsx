import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast';
import  TweetCell  from "src/components/TweetCell";

const TweetPage = ({id}: {id: string}) => {
  return (
    <>
      <MetaTags title="Tweet" description="Tweet page" />
      <div className="p-2">
      <TweetCell id={id} />
      </div>
    </>
  )
}

export default TweetPage
