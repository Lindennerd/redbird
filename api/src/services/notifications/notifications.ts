import type {
  QueryResolvers,
  NotificationRelationResolvers,
  MutationResolvers,
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

export const viewNotification: MutationResolvers['viewNotification'] = async ({id}) => {
  await db.notification.update({
    where: {id: id},
    data: {
      viewed: true
    }
  });

  return true;
}

export const Notification: NotificationRelationResolvers = {
  user: (_obj, { root }) => {
    return db.notification.findUnique({ where: { id: root?.id } }).user()
  },
  tweet: (_obj, { root }) => {
    return db.notification.findUnique({ where: { id: root?.id } }).tweet()
  },
}
