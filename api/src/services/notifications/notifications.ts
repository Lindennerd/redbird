import type {
  QueryResolvers,
  NotificationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const notifications: QueryResolvers['notifications'] = () => {
  return db.notification.findMany({
    where: {
      userId: context.currentUser.id
    }
  })
}

export const countNotifications: QueryResolvers['countNotifications'] = () => {
  return db.notification.count({
    where: { userId: context.currentUser.id}
  });
}

export const Notification: NotificationRelationResolvers = {
  user: (_obj, { root }) => {
    return db.notification.findUnique({ where: { id: root?.id } }).user()
  },
  tweet: (_obj, { root }) => {
    return db.notification.findUnique({ where: { id: root?.id } }).tweet()
  },
}
