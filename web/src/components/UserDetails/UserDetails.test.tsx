import { render } from '@redwoodjs/testing/web'

import UserDetails from './UserDetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserDetails />)
    }).not.toThrow()
  })
})
