import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        name: 'String9989568',
        hashedPassword: 'String',
        email: 'String3224532',
        salt: 'String',
        profile: { create: { displayName: 'String' } },
      },
    },
    two: {
      data: {
        name: 'String4244294',
        hashedPassword: 'String',
        email: 'String2031571',
        salt: 'String',
        profile: { create: { displayName: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
