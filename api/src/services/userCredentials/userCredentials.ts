import type {
  QueryResolvers,
  UserCredentialRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userCredentials: QueryResolvers['userCredentials'] = () => {
  return db.userCredential.findMany()
}

export const userCredential: QueryResolvers['userCredential'] = ({ id }) => {
  return db.userCredential.findUnique({
    where: { id },
  })
}

export const UserCredential: UserCredentialRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userCredential.findUnique({ where: { id: root?.id } }).user()
  },
}
