import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaRetweet, FaPencilAlt } from 'react-icons/fa'
import { Tweets } from 'types/graphql'
import { Retweet } from './Retweet'
import { RetweetWithComment } from './RetweetWithComment'

const RetweetButton = ({ tweet }: { tweet: Tweets }) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className="rounded-full  p-2 transition-all
     hover:bg-slate-200 hover:shadow-md"
        >
          <FaRetweet className="hover:text-primary" />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
