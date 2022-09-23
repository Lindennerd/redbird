import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
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
