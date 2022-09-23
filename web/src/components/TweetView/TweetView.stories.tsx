// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof TweetView> = (args) => {
//   return <TweetView {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import TweetView from './TweetView'

export const generated = () => {
  return <TweetView />
}

export default {
  title: 'Components/TweetView',
  component: TweetView,
} as ComponentMeta<typeof TweetView>
