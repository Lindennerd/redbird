// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ReplyButton> = (args) => {
//   return <ReplyButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ReplyButton from './ReplyButton'

export const generated = () => {
  return <ReplyButton />
}

export default {
  title: 'Components/ReplyButton',
  component: ReplyButton,
} as ComponentMeta<typeof ReplyButton>
