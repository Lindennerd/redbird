import type { Prisma, UserCredential } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCredentialCreateArgs>({
  userCredential: {
    one: {
      data: {
        id: 'String',
        counter: 922147,
        user: {
          create: {
            name: 'String4582026',
            hashedPassword: 'String',
            email: 'String2512923',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        id: 'String',
        counter: 7315900,
        user: {
          create: {
            name: 'String1511454',
            hashedPassword: 'String',
            email: 'String6494911',
            salt: 'String',
            profile: { create: { displayName: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserCredential, 'userCredential'>
