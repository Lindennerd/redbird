// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof FollowButton> = (args) => {
//   return <FollowButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import FollowButton from './FollowButton'

export const generated = () => {
  return <FollowButton />
}

export default {
  title: 'Components/FollowButton',
  component: FollowButton,
} as ComponentMeta<typeof FollowButton>
