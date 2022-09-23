// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Tweet> = (args) => {
//   return <Tweet {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Tweet from './Tweet'

export const generated = () => {
  return <Tweet />
}

export default {
  title: 'Components/Tweet',
  component: Tweet,
} as ComponentMeta<typeof Tweet>
