// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof RetweetButton> = (args) => {
//   return <RetweetButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import RetweetButton from './RetweetButton'

export const generated = () => {
  return <RetweetButton />
}

export default {
  title: 'Components/RetweetButton',
  component: RetweetButton,
} as ComponentMeta<typeof RetweetButton>
