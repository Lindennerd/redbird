import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaRetweet, FaPencilAlt } from 'react-icons/fa'
import { Tweet } from 'types/graphql'
import { Retweet } from './Retweet'
import { RetweetWithComment } from './RetweetWithComment'

const RetweetButton = ({ tweet }: { tweet: Tweet }) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md  hover:text-primary dark:hover:bg-gray-700"
        >
          <FaRetweet />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1
           ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:ring-gray-900 dark:divide-gray-900">
            <Menu.Item>
              <>
                <Retweet tweet={tweet} />
              </>
            </Menu.Item>
            <Menu.Item>
              <><RetweetWithComment tweet={tweet} /></>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default RetweetButton
