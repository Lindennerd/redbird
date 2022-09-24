// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LikeButton> = (args) => {
//   return <LikeButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LikeButton from './LikeButton'

export const generated = () => {
  return <LikeButton />
}

export default {
  title: 'Components/LikeButton',
  component: LikeButton,
} as ComponentMeta<typeof LikeButton>
