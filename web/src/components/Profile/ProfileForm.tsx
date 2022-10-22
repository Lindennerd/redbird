import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { Profile, UpdateProfileInput } from 'types/graphql'

interface ProfileFormProps {
  profile: Profile
  onSubmit: (profile: UpdateProfileInput) => void
  loading: boolean
}

export function ProfileForm({ profile, onSubmit, loading }: ProfileFormProps) {
  const {id, ...rest} = profile;
  const [profileForm, setProfileForm] = useState<UpdateProfileInput>(rest)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(profileForm);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-col items-center gap-1 dark:text-white">
        <img
          src={profile?.image}
          alt="user's image"
          className="w-20 rounded-full"
        />
        <button
          type='button'
          className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-slate-600
          bg-opacity-30 p-2 opacity-0 transition-all hover:opacity-100"
        >
          <FaEdit className="text-2xl text-gray-800" />
        </button>
        <input
          type="text"
          name="image"
          className="hidden"
          value={profileForm.image}
          onChange={(e) => {}}
        />
      </div>
      <div className="flex flex-col gap-1 dark:text-white">
        <label htmlFor="displayName">User Name</label>
        <input
          value={profileForm.displayName}
          onChange={(e) =>
            setProfileForm((form) => ({ ...form, displayName: e.target.value }))
          }
          type="text"
          className="rounded-md p-2 outline-none border dark:bg-gray-700 dark:border-gray-900"
          name="displayName"
        />
      </div>
      <div className="flex flex-col gap-1 dark:text-white">
        <label htmlFor="bio">Bio</label>
        <textarea
          value={profileForm.bio}
          onChange={(e) =>
            setProfileForm((form) => ({ ...form, bio: e.target.value }))
          }
          className="rounded-md p-2 outline-none border dark:bg-gray-700 dark:border-gray-900"
          name="bio"
        ></textarea>
      </div>
      <div className="flex flex-col gap-1 dark:text-white">
        <label htmlFor="location">Location</label>
        <input
          value={profileForm.location}
          onChange={(e) =>
            setProfileForm((form) => ({ ...form, location: e.target.value }))
          }
          type="text"
          className="rounded-md p-2 outline-none border dark:bg-gray-700 dark:border-gray-900"
          name="location"
        />
      </div>
      <div className="flex flex-col gap-1 dark:text-white">
        <label htmlFor="website">Web Site</label>
        <input
          value={profileForm.website}
          onChange={(e) =>
            setProfileForm((form) => ({ ...form, website: e.target.value }))
          }
          type="url"
          className="rounded-md p-2 outline-none border dark:bg-gray-700 dark:border-gray-900"
          name="website"
        />
      </div>
      <div className="flex flex-col gap-1 dark:text-white">
        <label htmlFor="birth">Date of Birth</label>
        <input
          value={profileForm.birth}
          onChange={(e) =>
            setProfileForm((form) => ({ ...form, birth: e.target.value }))
          }
          type="date"
          className="rounded-md p-2 outline-none border dark:bg-gray-700 dark:border-gray-900"
          name="birth"
          itemType="date"
        />
      </div>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Saving your changes...' : 'Save'}
      </button>
    </form>
  )
}
