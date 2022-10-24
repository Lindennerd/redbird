import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { VscMenu } from 'react-icons/vsc'
import { NavbarUser } from './NavbarUser'

export default function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <div
      className={`left-16 top-0 z-10 flex h-14 w-full tems-center sticky
      bg-white bg-opacity-80 px-4 dark:bg-gray-800 dark:bg-opacity-80 dark:text-white sm:left-32`}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <Link className="text-xl font-semibold" to={routes.home()}>
            Redbird
          </Link>
        </div>
        { isAuthenticated && (
          <div className='flex w-12'>
            <NavbarUser />
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex gap-2 ">
            <Link className="transition-all hover:border-b" to={routes.login()}>
              Login
            </Link>
            <Link
              className="transition-all hover:border-b"
              to={routes.signup()}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
