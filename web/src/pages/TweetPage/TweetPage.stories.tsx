import type { ComponentMeta } from '@storybook/react'

import TweetPage from './TweetPage'

export const generated = () => {
  return <TweetPage />
}

export default {
  title: 'Pages/TweetPage',
  component: TweetPage,
} as ComponentMeta<typeof TweetPage>
