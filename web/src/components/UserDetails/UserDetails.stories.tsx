// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof UserDetails> = (args) => {
//   return <UserDetails {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import UserDetails from './UserDetails'

export const generated = () => {
  return <UserDetails />
}

export default {
  title: 'Components/UserDetails',
  component: UserDetails,
} as ComponentMeta<typeof UserDetails>
