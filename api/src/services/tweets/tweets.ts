import type {
  QueryResolvers,
  MutationResolvers,
  TweetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const tweets: QueryResolvers['tweets'] = async () => {
  const tweets = await db.tweet.findMany({
    include: {
      user: true,
      likes: true,
      repliesTo: true,
      retweet: true,
      _count: {
        select: {
          likes: true,
          replies: true,
          retweets: true,
        },
      },
    },
    where: { repliesToId: null },
    orderBy: { createdAt: 'desc' },
  })

  return tweets.map((tweet) => ({
    id: tweet.id,
    text: tweet.text,
    createdAt: tweet.createdAt,
    user: tweet.user,
    replyTo: tweet.repliesTo,
    retweet: tweet.retweet,
    likes: tweet._count.likes,
    retweets: tweet._count.retweets,
    replies: tweet._count.replies,
    currentUserLiked:
      context.currentUser &&
      tweet.likes.some((like) => like.userId === context.currentUser.id),
  }))
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

export const createTweet: MutationResolvers['createTweet'] = ({ input }) => {
  return db.tweet.create({
    data: input,
  })
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

export const retweet: MutationResolvers['retweet'] = ({ input }) => {
  return db.tweet.create({
    data: {
      text: '',
      userId: context.currentUser.id,
      retweetId: input.retweetId,
    },
  })
}

export const retweetWithComment: MutationResolvers['retweetWithComment'] = ({
  input,
}) => {
  return db.tweet.create({
    data: {
      text: input.text,
      userId: context.currentUser.id,
      retweetId: input.retweetId,
    },
  })
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
