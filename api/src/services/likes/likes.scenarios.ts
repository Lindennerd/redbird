import type { Prisma, Like } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LikeCreateArgs>({
  like: {
    one: {
      data: {
        tweet: {
          create: {
            text: 'String',
            user: {
              create: {
                name: 'String9909418',
                hashedPassword: 'String',
                email: 'String1877860',
                salt: 'String',
                profile: { create: { displayName: 'String' } },
              },
            },
          },
        },
        user: {
          create: {
            name: 'String8221290',
            hashedPassword: 'String',
            email: 'String9149150',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
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
                name: 'String7802612',
                hashedPassword: 'String',
                email: 'String969056',
                salt: 'String',
                profile: { create: { displayName: 'String' } },
              },
            },
          },
        },
        user: {
          create: {
            name: 'String8605892',
            hashedPassword: 'String',
            email: 'String7749900',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Like, 'like'>
