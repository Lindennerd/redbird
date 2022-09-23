import type {
  QueryResolvers,
  MutationResolvers,
  ShareRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const shares: QueryResolvers['shares'] = () => {
  return db.share.findMany()
}

export const share: QueryResolvers['share'] = ({ id }) => {
  return db.share.findUnique({
    where: { id },
  })
}

export const createShare: MutationResolvers['createShare'] = ({ input }) => {
  return db.share.create({
    data: input,
  })
}

export const updateShare: MutationResolvers['updateShare'] = ({
  id,
  input,
}) => {
  return db.share.update({
    data: input,
    where: { id },
  })
}

export const deleteShare: MutationResolvers['deleteShare'] = ({ id }) => {
  return db.share.delete({
    where: { id },
  })
}

export const Share: ShareRelationResolvers = {
  tweet: (_obj, { root }) => {
    return db.share.findUnique({ where: { id: root?.id } }).tweet()
  },
}
