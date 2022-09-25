import type {
  QueryResolvers,
  MutationResolvers,
  TweetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const tweets: QueryResolvers['tweets'] = async () => {
  const tweets = await db.tweet.findMany({
    select: {
      _count: {
        select: {
          likes: true,
          replies: true,
          retweet: true
        }
      },
      id: true,
      createdAt: true,
      text: true,
      user: true,
      userId: true,
      repliesTo: true
    },
    where: { repliesToId: null },
    orderBy: { createdAt: 'desc' },
  });

  return tweets;
}

export const tweet: QueryResolvers['tweet'] = ({ id }) => {
  return db.tweet.findUnique({
    where: { id },
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
    select: {
      _count: {
        select: {
          likes: true,
          replies: true,
          retweet: true,
        },
      },
      id: true,
      createdAt: true,
      text: true,
      user: true,
      userId: true,
      repliesTo: true,
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
