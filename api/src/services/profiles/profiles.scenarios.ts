import type { Prisma, Profile } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProfileCreateArgs>({
  profile: {
    one: { data: { displayName: 'String' } },
    two: { data: { displayName: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Profile, 'profile'>
