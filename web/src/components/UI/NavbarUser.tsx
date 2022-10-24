import { Menu, Transition } from '@headlessui/react'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Fragment, useEffect, useState } from 'react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { CgLogOut, CgProfile } from 'react-icons/cg'
import {BiDotsVerticalRounded} from "react-icons/bi"

export function NavbarUser() {
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()

  if (isAuthenticated)
    return (
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="rounded-full transition-all hover:shadow-md h-auto">
              <img
                src={currentUser.profile.image}
                className="rounded-full block md:hidden w-16"
              />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute top-[-150px] mt-2 flex w-40 origin-top-right flex-col justify-items-end rounded-md bg-white
              shadow-lg ring-1
           ring-black ring-opacity-5 focus:outline-none  dark:bg-gray-700 dark:ring-gray-900"
            >
              <Menu.Item disabled={true}>
                <span className="flex w-full items-center justify-start gap-2 px-2 py-1 text-gray-400">
                  {`@${currentUser.name}`}
                </span>
              </Menu.Item>
              <Menu.Item as={Fragment}>
                <>
                  <ThemeSwitcher />
                </>
              </Menu.Item>
              <Menu.Item as={Fragment}>
                <button
                  onClick={(e) => logOut()}
                  className="flex w-full items-center justify-start gap-2 px-2 py-3 dark:hover:bg-gray-900 "
                >
                  <CgLogOut />
                  Logout
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    )
  else
    return <></>
}
