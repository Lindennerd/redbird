import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import {
  BiBell,
  BiCommentAdd,
  BiHome,
  BiSearch,
  BiUserCircle,
} from 'react-icons/bi'
import { SiAboutdotme } from 'react-icons/si'
import NotificationsButton from '../Notifications/NotificationsButton'
import { NavbarUser } from './NavbarUser'
import { SidebarItem } from './SideBarItem'

export function Sidebar() {
  return (
    <div
      className="sticky top-0 h-screen w-12
     py-2 dark:bg-gray-800 dark:bg-opacity-80 dark:text-white sm:w-32"
    >
      <div className="flex flex-col gap-4 overflow-hidden">
        <button className="flex items-center justify-center gap-6 rounded-full p-2">
          <img
            src="m-d-redbird.svg"
            alt="Logo"
            className="hidden w-12 dark:block"
          />
          <img src="m-redbird.svg" alt="Logo" className="w-12 dark:hidden" />
        </button>
        <SidebarItem onClick={() => navigate(routes.home())}>
          <BiHome className="text-2xl" /> <span>Home</span>
        </SidebarItem>
        <SidebarItem onClick={() => navigate(routes.notifications())}>
         <NotificationsButton />
        </SidebarItem>
        <SidebarItem>
          <BiSearch className="text-2xl" /> <span>Search</span>
        </SidebarItem>
        <SidebarItem onClick={() => navigate(routes.profile())}>
          <BiUserCircle className="text-2xl" /> <span>Profile</span>
        </SidebarItem>
        <SidebarItem onClick={() => navigate(routes.about())}>
          <SiAboutdotme className="text-2xl" />
          <span>About </span>
        </SidebarItem>
      </div>
    </div>
  )
}
