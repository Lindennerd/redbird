import { render } from '@redwoodjs/testing/web'

import RetweetButton from './RetweetButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RetweetButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RetweetButton />)
    }).not.toThrow()
  })
})
