import type { TweetsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Tweet from '../Tweet/Tweet'
import ReactLoading from 'react-loading'
import { useEffect, useRef, useState } from 'react'

export const QUERY = gql`
  query TweetsQuery($cursor: String) {
    tweets(cursor: $cursor) {
      _count {
        likes
        replies
        retweets
      }
      id
      text
      createdAt
      currentUserLiked
      likes {
        __typename
      }
      retweet {
        id
        text
        createdAt
        user {
          id
          name
          profile {
            image
            displayName
          }
        }
      }
      user {
        id
        name
        createdAt
        profile {
          image
          displayName
        }
      }
    }
  }
`

export const beforeQuery = (props) => {
  return {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true
    // pollInterval: 2500
  }
}

export const Loading = () => (
  <div className="flex items-center justify-center">
    <ReactLoading type="bubbles" color="#EF3109" height={'10%'} width={'10%'} />
  </div>
)

export const Empty = () => <div>Nothing to see here</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ tweets: tweetsQuery, fetchMore, networkStatus }: CellSuccessProps<TweetsQuery>) => {
  const [tweets, setTweets] = useState(tweetsQuery);
  const [loadMore, setLoadMore] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    if(loadMore) {
      const loadMoreTweets = async () => {
        const {data: moreTweets} = await fetchMore<TweetsQuery>({
          variables: {cursor: tweets[tweets.length-1].id}
        })

        //TODO Handle this using cache instead of state
        setTweets(tweets => [...tweets, ...moreTweets.tweets]);
      }

      loadMoreTweets();
      setLoadMore(shouldLoadMore => false);
    }

  }, [loadMore])



  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 1
    };

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if(target.isIntersecting) setLoadMore(shouldLoadMore => true);
    }, options);

    if(loader.current) observer.observe(loader.current)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {tweets.map((item) => {
        return <Tweet tweet={item} key={item.id} displayActions={true} />
      })}

      {networkStatus === 3 && <Loading />}
      <div ref={loader}></div>
    </div>
  )
}
