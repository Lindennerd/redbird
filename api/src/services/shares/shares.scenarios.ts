import type { Prisma, Share } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ShareCreateArgs>({
  share: {
    one: {
      data: {
        tweet: {
          create: {
            text: 'String',
            user: {
              create: {
                name: 'String2613723',
                hashedPassword: 'String',
                email: 'String7002994',
                salt: 'String',
                profile: { create: { displayName: 'String' } },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        tweet: {
          create: {
            text: 'String',
            user: {
              create: {
                name: 'String2740386',
                hashedPassword: 'String',
                email: 'String3825067',
                salt: 'String',
                profile: { create: { displayName: 'String' } },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Share, 'share'>
