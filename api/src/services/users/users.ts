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
      (follower) => follower.id === context.currentUser.id
    ),
  }
}

export const follow: MutationResolvers['follow'] = async ({id}) => {
  const userFollows = await db.user.findFirst({
    where: {
      AND: [{ id: context.currentUser.id }, { following: { some: { id: { equals: id } }  } }],
    },
  })

  if (userFollows) {
    await db.user.update({
      where: { id: context.currentUser.id },
      data: {
        following: {
          disconnect: { id },
        },
      },
    });

    return {follow: false};
  } else {
    await db.user.update({
      where: { id: context.currentUser.id },
      data: {
        following: {
          connect: { id },
        },
      },
    });

    return {follow: true};
  }


}

export const User: UserRelationResolvers = {
  profile: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).profile()
  },
  follower: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).follower()
  },
  followers: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).followers()
  },
  follow: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).follow()
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
