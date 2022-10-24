import type {
  QueryResolvers,
  UserRelationResolvers,
  MutationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      profile: true,
      followers: true,
      tweets: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          _count: {
            select: {
              likes: true,
              replies: true,
              retweets: true,
            },
          },
        },
      },
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  })

  return {
    ...user,
    currentUserFollows: user.followers.some(
      (follower) => context.currentUser && follower.userId === context.currentUser.id
    ),
  }
}

export const follow: MutationResolvers['follow'] = async ({id}) => {
  const userFollows = await db.userFollows.findFirst({
    where: {
      AND: [
        { userId: context.currentUser.id },
        {targetId: id}
      ],
    },
  })

  if (!userFollows) {
    await db.userFollows.create({
      data: {
        userId: context.currentUser.id,
        targetId: id
      }
    })

    return {follow: true};
  } else {
    await db.userFollows.delete({
      where: { id: userFollows.id },
    });

    return {follow: false};
  }


}

export const User: UserRelationResolvers = {
  profile: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).profile()
  },
  followers: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).followers()
  },
  following: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).following()
  },
  tweets: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).tweets()
  },
  Like: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Like()
  },
  credentials: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).credentials()
  },
}
