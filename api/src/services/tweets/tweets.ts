import type {
  QueryResolvers,
  MutationResolvers,
  TweetRelationResolvers,
  Tweet as TweetType,
  User,
  Like
} from 'types/graphql'

import { db } from 'src/lib/db'



const tweetsInclude = {
  user: true,
  likes: true,
  repliesTo: true,
  replies: true,
  retweets: true,
  retweet: true,
  _count: {
    select: {
      likes: true,
      replies: true,
      retweets: true,
    },
}
}


const mapTweets = (tweet) => {
  return ({
    ...tweet,
    replyTo: tweet.repliesTo,
    retweet: tweet.retweet,
    likesCount: tweet._count.likes,
    retweetsCount: tweet._count.retweets,
    repliesCount: tweet._count.replies,
    currentUserLiked:
      context.currentUser &&
      tweet.likes.some((like) => like.userId === context.currentUser.id),
  })
}

export const tweets: QueryResolvers['tweets'] = async () => {
  const tweets = await db.tweet.findMany({
    include: tweetsInclude,
    where: { repliesToId: null },
    orderBy: { createdAt: 'desc' },
  })

  return tweets.map(mapTweets)
}

export const tweet: QueryResolvers['tweet'] = ({ id }) => {
  return db.tweet.findUnique({
    where: { id },
    include: {
      replies: true,
      retweets: true,
    },
  })
}

export const createTweet: MutationResolvers['createTweet'] = async ({ input }) => {
  const tweet = await db.tweet.create({
    data: input,
    include: tweetsInclude
  });

  return mapTweets(tweet);
}

export const reply: MutationResolvers['reply'] = ({ input }) => {
  return db.tweet.create({
    data: {
      text: input.text,
      userId: input.userId,
      repliesToId: input.repliesTo,
    },
    include: {
      replies: true,
      retweets: true,
    },
  })
}

export const retweet: MutationResolvers['retweet'] = async ({ input }) => {
  const retweet = await db.tweet.create({
    include: tweetsInclude,
    data: {
      text: '',
      userId: context.currentUser.id,
      retweetId: input.retweetId,
    },
  })

  return mapTweets(retweet)
}

export const retweetWithComment: MutationResolvers['retweetWithComment'] = async ({
  input,
}) => {
  const retweet = await db.tweet.create({
    include: tweetsInclude,
    data: {
      text: input.text,
      userId: context.currentUser.id,
      retweetId: input.retweetId,
    },
  })

    return mapTweets(retweet)
}

export const updateTweet: MutationResolvers['updateTweet'] = ({
  id,
  input,
}) => {
  return db.tweet.update({
    data: input,
    where: { id },
  })
}

export const deleteTweet: MutationResolvers['deleteTweet'] = ({ id }) => {
  return db.tweet.delete({
    where: { id },
  })
}

export const Tweet: TweetRelationResolvers = {
  user: (_obj, { root }) => {
    return db.tweet.findUnique({ where: { id: root?.id } }).user()
  },
  likes: (_obj, { root }) => {
    return db.tweet.findUnique({ where: { id: root?.id } }).likes()
  },
  retweet: (_obj, { root }) => {
    return db.tweet.findUnique({ where: { id: root?.id } }).retweet()
  },
}
