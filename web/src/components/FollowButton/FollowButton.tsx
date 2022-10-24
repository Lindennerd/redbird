import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/dist/toast";
import { UserDetails } from "types/graphql";

const FOLLOW_MUTATION = gql`
  mutation ToggleFollowing($id: String) {
    follow(id: $id) {
      follow
    }
  }
`;

const FollowButton = ({user, currentUserFollows}: {user: UserDetails, currentUserFollows: Boolean}) => {

  const [toggleFollowing, {loading, error}] = useMutation(FOLLOW_MUTATION, {
    onError(error) {
      toast.error('Something went wrong');
      console.error(error);
    },
    update: (cache, {data: { follow } }) => {
      cache.modify({
        optimistic: true,
        id: cache.identify(user),
        fields: {
          currentUserFollows: (currentUserFollows) => {
            return follow.follow
          },
          _count: (_count) => {
            if(follow.follow) return _count.followers +1
            else return _count.followers -1
          }
        }
      })
    }
  });

  function follow() {
    toggleFollowing({
      variables: {
        id: user.id
      }
    });
  }

  if(currentUserFollows) return <button disabled={loading} className="btn" onClick={e => follow()}>
    Unfollow
  </button>

  else return <button disabled={loading} className="btn" onClick={e => follow()}>
    Follow
  </button>

}

export default FollowButton
