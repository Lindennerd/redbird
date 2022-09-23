import type { Tweet } from '@prisma/client'

import { tweets, tweet, createTweet, updateTweet, deleteTweet } from './tweets'
import type { StandardScenario } from './tweets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tweets', () => {
  scenario('returns all tweets', async (scenario: StandardScenario) => {
    const result = await tweets()

    expect(result.length).toEqual(Object.keys(scenario.tweet).length)
  })

  scenario('returns a single tweet', async (scenario: StandardScenario) => {
    const result = await tweet({ id: scenario.tweet.one.id })

    expect(result).toEqual(scenario.tweet.one)
  })

  scenario('creates a tweet', async (scenario: StandardScenario) => {
    const result = await createTweet({
      input: { text: 'String', userId: scenario.tweet.two.userId },
    })

    expect(result.text).toEqual('String')
    expect(result.userId).toEqual(scenario.tweet.two.userId)
  })

  scenario('updates a tweet', async (scenario: StandardScenario) => {
    const original = (await tweet({ id: scenario.tweet.one.id })) as Tweet
    const result = await updateTweet({
      id: original.id,
      input: { text: 'String2' },
    })

    expect(result.text).toEqual('String2')
  })

  scenario('deletes a tweet', async (scenario: StandardScenario) => {
    const original = (await deleteTweet({ id: scenario.tweet.one.id })) as Tweet
    const result = await tweet({ id: original.id })

    expect(result).toEqual(null)
  })
})
