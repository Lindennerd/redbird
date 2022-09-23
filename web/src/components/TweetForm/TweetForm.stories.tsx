// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof TweetForm> = (args) => {
//   return <TweetForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import TweetForm from './TweetForm'

export const generated = () => {
  return <TweetForm />
}

export default {
  title: 'Components/TweetForm',
  component: TweetForm,
} as ComponentMeta<typeof TweetForm>
