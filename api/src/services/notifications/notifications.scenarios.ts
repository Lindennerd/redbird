import type { Prisma, Notification } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.NotificationCreateArgs>({
  notification: {
    one: {
      data: {
        event: 'LIKED',
        user: {
          create: {
            name: 'String9926550',
            hashedPassword: 'String',
            email: 'String6255579',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
          },
        },
        tweet: {
          create: {
            text: 'String',
            user: {
              create: {
                name: 'String9389605',
                hashedPassword: 'String',
                email: 'String3274678',
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
        event: 'LIKED',
        user: {
          create: {
            name: 'String796979',
            hashedPassword: 'String',
            email: 'String225972',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
          },
        },
        tweet: {
          create: {
            text: 'String',
            user: {
              create: {
                name: 'String6054804',
                hashedPassword: 'String',
                email: 'String268393',
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

export type StandardScenario = ScenarioData<Notification, 'notification'>
