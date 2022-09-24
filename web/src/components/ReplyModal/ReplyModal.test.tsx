import { render } from '@redwoodjs/testing/web'

import ReplyModal from './ReplyModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReplyModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReplyModal />)
    }).not.toThrow()
  })
})
