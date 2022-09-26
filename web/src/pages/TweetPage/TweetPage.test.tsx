import { render } from '@redwoodjs/testing/web'

import TweetPage from './TweetPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TweetPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TweetPage />)
    }).not.toThrow()
  })
})
