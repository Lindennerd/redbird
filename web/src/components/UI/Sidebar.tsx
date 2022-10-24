import { useAuth } from '@redwoodjs/auth';
import { Link, navigate, routes } from '@redwoodjs/router'
import {
  BiBell,
  BiCommentAdd,
  BiHome,
  BiSearch,
  BiUserCircle,
} from 'react-icons/bi'
import { NavbarUser } from './NavbarUser';
import { SidebarItem } from './SideBarItem'

export function Sidebar() {

  return (
    <div
      className="w-12 sticky top-0 h-screen
     py-2 dark:bg-gray-800 dark:bg-opacity-80 dark:text-white sm:w-32"
    >
      <div className='flex flex-col gap-4 overflow-hidden'>
        <button className="flex items-center justify-center gap-6 p-2 rounded-full">
          <img src="m-d-redbird.svg" alt="Logo" className="w-12 hidden dark:block" />
          <img src="m-redbird.svg" alt="Logo" className="w-12 dark:hidden" />
        </button>
        <SidebarItem onClick={() => navigate(routes.home())}>
          <BiHome className="text-2xl" /> <span>Home</span>
        </SidebarItem>
        <SidebarItem>
          <BiBell className="text-2xl" /> <span>News</span>
        </SidebarItem>
        <SidebarItem>
          <BiSearch className="text-2xl" /> <span>Search</span>
        </SidebarItem>
        <SidebarItem onClick={() => navigate(routes.profile())}>
          <BiUserCircle className="text-2xl" /> <span>Profile</span>
        </SidebarItem>
        <SidebarItem>
          <BiCommentAdd className="text-2xl" />
          <span>Tweet</span>
        </SidebarItem>
      </div>
    </div>
  )
}
