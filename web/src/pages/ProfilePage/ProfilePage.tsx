import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast';
import { ProfileForm } from 'src/components/Profile/ProfileForm';
import { Profile } from 'types/graphql';

const PROFILE_MUTATTION = gql`
  mutation ProfileUpdate($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
    }
  }
`;

const ProfilePage = () => {
  const {currentUser} = useAuth();
  const [updateProfile, {loading, error}] = useMutation(PROFILE_MUTATTION, {
    onError(error) {
      console.error(error);
      toast.error('Something went wrong while updating your profile :/ ')
    }
  });

  async function onSubmit(profile: Profile, {redirects} : {redirects?: boolean}) {
    await updateProfile({
      variables: {
        input: profile
      }
    });

    if(redirects) navigate(routes.home());
  }

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      {currentUser && <ProfileForm
        profile={currentUser?.profile}
        onSubmit={onSubmit}
        loading={loading} />}
    </>
  )
}

export default ProfilePage
