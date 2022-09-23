import type {
  QueryResolvers,
  MutationResolvers,
  TweetRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const tweets: QueryResolvers['tweets'] = () => {
  return db.tweet.findMany()
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
