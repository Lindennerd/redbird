import type { Prisma, Tweet } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TweetCreateArgs>({
  tweet: {
    one: {
      data: {
        text: 'String',
        user: {
          create: {
            name: 'String6729602',
            hashedPassword: 'String',
            email: 'String5479731',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        text: 'String',
        user: {
          create: {
            name: 'String7113503',
            hashedPassword: 'String',
            email: 'String6227608',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Tweet, 'tweet'>
