import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import TweetView from 'src/components/TweetView/TweetView'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className="p-2">
        <TweetView />
      </div>
    </>
  )
}

export default HomePage
