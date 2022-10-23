import { Link, routes } from '@redwoodjs/router'
import UserCell from "src/components/UserCell";
import { MetaTags } from '@redwoodjs/web'

const UserPage = ({id}: {id: string}) => {
  return (
    <>
      <MetaTags title="User" description="User page" />
      <UserCell id={id} />
    </>
  )
}

export default UserPage
