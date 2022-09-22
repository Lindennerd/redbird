import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

export function NavbarUser() {
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()

  if (isAuthenticated)
    return (
      <div>
        <button onClick={(e) => logOut()}>Logout</button>
      </div>
    )
  else return (
    <div className="flex items-center gap-2">
      <Link to={routes.login()}>Login</Link>
      <Link to={routes.signup()}>Register</Link>
    </div>
  )
}
