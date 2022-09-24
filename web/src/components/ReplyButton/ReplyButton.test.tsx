import { render } from '@redwoodjs/testing/web'

import ReplyButton from './ReplyButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReplyButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReplyButton />)
    }).not.toThrow()
  })
})
