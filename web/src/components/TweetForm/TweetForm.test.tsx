import { render } from '@redwoodjs/testing/web'

import TweetForm from './TweetForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TweetForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TweetForm />)
    }).not.toThrow()
  })
})
