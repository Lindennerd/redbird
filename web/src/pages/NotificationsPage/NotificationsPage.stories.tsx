import type { ComponentMeta } from '@storybook/react'

import NotificationsPage from './NotificationsPage'

export const generated = () => {
  return <NotificationsPage />
}

export default {
  title: 'Pages/NotificationsPage',
  component: NotificationsPage,
} as ComponentMeta<typeof NotificationsPage>
