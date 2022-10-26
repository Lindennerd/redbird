import type {
  QueryResolvers,
  MutationResolvers,
  LikeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const likes: QueryResolvers['likes'] = () => {
  return db.like.findMany()
}

export const like: QueryResolvers['like'] = ({ id }) => {
  return db.like.findUnique({
    where: { id },
  })
}

export const createLike: MutationResolvers['createLike'] = async ({ input }) => {
  const userLiked = await db.like.findFirst({
    where: {
      AND: [
        { tweetId: input.tweetId },
        { userId: context.currentUser.id }
      ]
    }
  });

  if (userLiked) {
    const like = db.like.delete({
      where: {
        id: userLiked.id
      },
    })
    return {like, operation: 'DELETE' }
  } else {
    const like = db.like.create({
      data: {
        tweetId: input.tweetId,
        userId: context.currentUser.id
      },
    })

    console.log('CREATING NOTIFICATION')
    await db.notification.create({
        data: {
          event: 'LIKED',
          tweetId: input.tweetId,
          userId: context.currentUser.id
        }
    })

    return {like, operation: 'CREATE'}
  }

}

export const updateLike: MutationResolvers['updateLike'] = ({ id, input }) => {
  return db.like.update({
    data: input,
    where: { id },
  })
}

export const deleteLike: MutationResolvers['deleteLike'] = ({ id }) => {
  return db.like.delete({
    where: { id },
  })
}

export const Like: LikeRelationResolvers = {
  tweet: (_obj, { root }) => {
    return db.like.findUnique({ where: { id: root?.id } }).tweet()
  },
  user: (_obj, { root }) => {
    return db.like.findUnique({ where: { id: root?.id } }).user()
  },
}
