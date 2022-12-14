import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { FaBaby, FaBirthdayCake, FaLocationArrow, FaWeebly } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import { VscGlobe } from 'react-icons/vsc'
import { UserDetails as Details } from 'types/graphql'
import FollowButton from '../FollowButton/FollowButton'
import Tweet from '../Tweet/Tweet'

const UserDetails = ({ user }: { user: Details }) => {
  const {currentUser} = useAuth();

  return (
    <div>
      <div className="bg-secondary p-10"></div>
      <div className="flex items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-4 px-2">
          <img
            src={user.profile.image}
            className="mt-[-2em] w-24 rounded-full"
            alt="User Image"
          />
          <div className="flex flex-col">
            <span className="font-semibold dark:text-white">
              {user.profile.displayName}
            </span>
            <span className="text-gray-600">@{user.name}</span>
          </div>
        </div>
        {currentUser && currentUser.id === user.id && <Link role="button" className="btn" to={routes.profile()}>Edit your profile</Link> }
        {currentUser && currentUser.id !== user.id && <FollowButton user={user} currentUserFollows={user.currentUserFollows} />}
      </div>

      <div className="px-8 py-2 dark:text-white">
        {user.profile.bio}
      </div>
      <div className='px-8 dark:text-white space-y-2'>
        {user.profile.birth && <span className='flex items-center gap-2'> <FaBirthdayCake className='text-xl' /> {user.profile.birth}</span>}
        {user.createdAt && <span className='flex items-center gap-2'> <FaBaby className='text-xl' /> {new Date(user.createdAt).toLocaleDateString() } {new Date(user.createdAt).toLocaleTimeString() }</span>}
        {user.profile.location && <span className='flex items-center gap-2'> <GoLocation className='text-xl' /> {user.profile.location}</span>}
        {user.profile.website && <span className='flex items-center gap-2'> <VscGlobe className='text-xl' /> <a href={user.profile.website} target="_blank">{user.profile.website}</a></span>}
      </div>
      <div className="flex gap-4 px-8 mt-4 mb-2 dark:text-white">
        <span>Following {user._count.following}</span>
        <span>Followed By {user._count.followers}</span>
      </div>

      <hr />

      <div className="flex flex-col gap-2 p-2">
      {user.tweets.map((item) => {
        return <Tweet tweet={item} key={item.id} displayActions={true} />
      })}
    </div>
    </div>
  )
}

export default UserDetails
