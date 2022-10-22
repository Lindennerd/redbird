import type {
  QueryResolvers,
  MutationResolvers,
  ProfileRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const profiles: QueryResolvers['profiles'] = () => {
  return db.profile.findMany()
}

export const profile: QueryResolvers['profile'] = () => {
  return db.profile.findUnique({
    where: { id: context.currentUser.profile.id },
  })
}

export const createProfile: MutationResolvers['createProfile'] = ({
  input,
}) => {
  return db.profile.create({
    data: input,
  })
}

export const updateProfile: MutationResolvers['updateProfile'] = ({
  input,
}) => {
  return db.profile.update({
    data: input,
    where: { id: context.currentUser.profile.id },
  })
}

export const deleteProfile: MutationResolvers['deleteProfile'] = ({ id }) => {
  return db.profile.delete({
    where: { id },
  })
}

export const Profile: ProfileRelationResolvers = {
  User: (_obj, { root }) => {
    return db.profile.findUnique({ where: { id: root?.id } }).User()
  },
}
