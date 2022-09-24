import { render } from '@redwoodjs/testing/web'

import ReplyTweet from './ReplyTweet'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReplyTweet', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReplyTweet />)
    }).not.toThrow()
  })
})
