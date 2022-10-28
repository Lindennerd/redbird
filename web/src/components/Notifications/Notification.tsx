import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { FaAt, FaHeart, FaReply, FaRetweet } from 'react-icons/fa'
import { GoReply } from 'react-icons/go'
import { Notification as NotificationType, NotificationEvent } from 'types/graphql'

function iconFactory(event: NotificationEvent) {
  switch(event) {
    case 'LIKED': return <FaHeart className='text-red-700 text-2xl' />;
    case 'MENTIONED': return <FaAt className='text-2xl'/>;
    case 'REPLYED': return <GoReply className='text-2xl'/>
    case 'RETWEETED': return <FaRetweet className='text-2xl'/>
  }
}

const VIEW_NOTIFICATION_MUTATION = gql`
mutation ViewNotification($id: String!) {
  viewNotification(id: $id)
}
`;

export function Notification({
  notification,
}: {
  notification: NotificationType
}) {

  const [viewNotification, {loading}] = useMutation(VIEW_NOTIFICATION_MUTATION)

  function handleClickNotification() {
    navigate(routes.tweet({id: notification.tweet.id}))
  }

  return (
    <div
    onClick={() => handleClickNotification()}
    className="p-2 border border-black text-white rounded-md
     hover:bg-slate-700 flex gap-2 items-center cursor-pointer justify-center" >
        <div>
          {iconFactory(notification.event)}
        </div>
        <div>
          {notification.user.name} {notification.event.toLocaleLowerCase()} your tweet
        </div>
    </div>
  )
}
