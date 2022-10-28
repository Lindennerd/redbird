import type { NotificationsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ReactLoading from 'react-loading'
import { Notification } from '../Notifications/Notification'

export const QUERY = gql`
  query NotificationsQuery {
    notifications {
      id
      event
      viewed
      tweet {
        id
      }
      user {
        id
        name
      }
    }
  }
`

export const beforeQuery = (props) => {
  return {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first'
  }
}
export const Loading = () => (
  <div className="flex items-center justify-center">
    <ReactLoading type="bubbles" color="#EF3109" height={'10%'} width={'10%'} />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  notifications,
}: CellSuccessProps<NotificationsQuery>) => {
  return (
    <div className='flex flex-col gap-2'>
      {notifications.map((notification) => {
        return <Notification notification={notification} key={notification.id} />
      })}
    </div>
  )
}
