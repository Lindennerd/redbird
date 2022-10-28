
import { MetaTags } from '@redwoodjs/web'
import NotificationsCell from 'src/components/NotificationsCell';

const NotificationsPage = () => {
  return (
    <>
      <MetaTags title="Notifications" description="Notifications page" />
      <NotificationsCell />
    </>
  )
}

export default NotificationsPage
