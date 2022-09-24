import { render } from '@redwoodjs/testing/web'

import NewTweet from './NewTweet'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewTweet', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTweet />)
    }).not.toThrow()
  })
})
