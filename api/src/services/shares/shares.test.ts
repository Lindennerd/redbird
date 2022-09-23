import type { Share } from '@prisma/client'

import { shares, share, createShare, updateShare, deleteShare } from './shares'
import type { StandardScenario } from './shares.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shares', () => {
  scenario('returns all shares', async (scenario: StandardScenario) => {
    const result = await shares()

    expect(result.length).toEqual(Object.keys(scenario.share).length)
  })

  scenario('returns a single share', async (scenario: StandardScenario) => {
    const result = await share({ id: scenario.share.one.id })

    expect(result).toEqual(scenario.share.one)
  })

  scenario('creates a share', async (scenario: StandardScenario) => {
    const result = await createShare({
      input: { tweetId: scenario.share.two.tweetId },
    })

    expect(result.tweetId).toEqual(scenario.share.two.tweetId)
  })

  scenario('updates a share', async (scenario: StandardScenario) => {
    const original = (await share({ id: scenario.share.one.id })) as Share
    const result = await updateShare({
      id: original.id,
      input: { tweetId: scenario.share.two.tweetId },
    })

    expect(result.tweetId).toEqual(scenario.share.two.tweetId)
  })

  scenario('deletes a share', async (scenario: StandardScenario) => {
    const original = (await deleteShare({ id: scenario.share.one.id })) as Share
    const result = await share({ id: original.id })

    expect(result).toEqual(null)
  })
})
