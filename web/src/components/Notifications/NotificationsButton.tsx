import { useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi'

const QUERY = gql`
  query PingNotificationsQuery {
    notifications {
      id
    }
  }
`;

export default function NotificationsButton() {
  const {data } = useQuery<Notification[]>(QUERY, {
    pollInterval: 3600
  })

  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    console.log(data.notifications)
    //setNotificationsCount(notifications.length)
  }, [data.notifications])

  return (
    <>
      <BiBell className="text-2xl" />
      <p>{notificationsCount}</p>
      <span>News</span>
    </>
  )
}
