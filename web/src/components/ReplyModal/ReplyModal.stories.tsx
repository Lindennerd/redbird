// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ReplyModal> = (args) => {
//   return <ReplyModal {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ReplyModal from './ReplyModal'

export const generated = () => {
  return <ReplyModal />
}

export default {
  title: 'Components/ReplyModal',
  component: ReplyModal,
} as ComponentMeta<typeof ReplyModal>
