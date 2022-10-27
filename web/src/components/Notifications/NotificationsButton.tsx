import { useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { BiBell } from 'react-icons/bi'

const QUERY = gql`
  query PingNotificationsQuery {
    countNotifications
  }
`

export default function NotificationsButton() {
  const { data } = useQuery<{ countNotifications: number } | undefined>(QUERY, {
    pollInterval: 3600,
  })

  useEffect(() => {
    console.log(data?.countNotifications)
    //setNotificationsCount(notifications.length)
  }, [data])

  return (
    <>
        <BiBell className="text-2xl" />
      <div className='absolute mb-6 ml-2'>
        <div className="rounded-full px-2 bg-red-600 text-sm">
          {data?.countNotifications}
        </div>
      </div>
      <span>News</span>
    </>
  )
}
