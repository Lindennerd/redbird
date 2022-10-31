import type {
  QueryResolvers,
  MutationResolvers,
  TweetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

const tweetsInclude = {
  user: true,
  likes: true,
  repliesTo: true,
  replies: {
    include: {
      retweets: true,
      retweet: true,
      user: true,
      likes: true,
      repliesTo: true,
      _count: {
        select: {
          likes: true,
          replies: true,
          retweets: true,
        },
      },
    },
  },
  retweets: true,
  retweet: true,
  _count: {
    select: {
      likes: true,
      replies: true,
      retweets: true,
    },
  },
}

const tweetWithUserLikedField = (tweet) => ({
  ...tweet,
  currentUserLiked:
    context.currentUser &&
    tweet.likes.some((like) => like.userId === context.currentUser.id),
  replies: tweet.replies.map((reply) => ({
    ...reply,
    currentUserLiked:
      context.currentUser &&
      tweet.likes.some((like) => like.userId === context.currentUser.id),
  })),
  retweets: tweet.retweets.map((retweet) => ({
    ...retweet,
    currentUserLiked:
      context.currentUser &&
      tweet.likes.some((like) => like.userId === context.currentUser.id),
  })),
})

const TWEETS_PER_PAGE = 10;

export const tweets: QueryResolvers['tweets'] = async ({page = 1}) => {
  const offset = (page -1) * TWEETS_PER_PAGE;

  const tweets = context.currentUser
    ? await db.tweet.findMany({
        include: tweetsInclude,
        take: TWEETS_PER_PAGE,
        skip: offset,
        where: {
          AND: [
            { repliesToId: null },
            {
              OR: [
                {
                  userId: context.currentUser.id
                },
                {
                  user: { followers: { some: { userId: context.currentUser.id } } },
                },
              ]
            }
          ],
        },
        orderBy: { createdAt: 'desc' },
      })
    :  await db.tweet.findMany({
        include: tweetsInclude,
        take: TWEETS_PER_PAGE,
        skip: offset,
        where: {
          repliesToId: null,
        },
        orderBy: { createdAt: 'desc' },
      })

  return tweets.map(tweetWithUserLikedField)
}

export const tweet: QueryResolvers['tweet'] = async ({ id }) => {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: tweetsInclude,
  })

  return tweetWithUserLikedField(tweet)
}

export const createTweet: MutationResolvers['createTweet'] = async ({
  input,
}) => {
  const tweet = await db.tweet.create({
    data: input,
    include: tweetsInclude,
  })

  return tweetWithUserLikedField(tweet)
}

export const reply: MutationResolvers['reply'] = async ({ input }) => {
  const tweet = await db.tweet.create({
    data: {
      text: input.text,
      userId: input.userId,
      repliesToId: input.repliesTo,
    },
    include: {
      replies: true,
      retweets: true,
    },
  });

  await db.notification.create({
    data: {
      event: 'REPLYED',
      tweetId: input.repliesTo,
      userId: input.userId
    }
  });

  return tweet;
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

  await db.notification.create({
    data: {
      event: 'RETWEETED',
      tweetId: input.retweetId,
      userId: context.currentUser.id
    }
  });

  return tweetWithUserLikedField(retweet)
}

export const retweetWithComment: MutationResolvers['retweetWithComment'] =
  async ({ input }) => {
    const retweet = await db.tweet.create({
      include: tweetsInclude,
      data: {
        text: input.text,
        userId: context.currentUser.id,
        retweetId: input.retweetId,
      },
    })

    return tweetWithUserLikedField(retweet)
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
