import { render } from '@redwoodjs/testing/web'

import TweetView from './TweetView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TweetView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TweetView />)
    }).not.toThrow()
  })
})
