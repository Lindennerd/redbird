import type { UserCredential } from '@prisma/client'

import { userCredentials } from './userCredentials'
import type { StandardScenario } from './userCredentials.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userCredentials', () => {
  scenario(
    'returns all userCredentials',
    async (scenario: StandardScenario) => {
      const result = await userCredentials()

      expect(result.length).toEqual(Object.keys(scenario.userCredential).length)
    }
  )
})
