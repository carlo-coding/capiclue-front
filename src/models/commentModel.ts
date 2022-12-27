import { TUserPartial } from './userModel'

export interface IComment {
  id: number
  publicationId: number
  comment: string
  createdAt: string
  commentator: TUserPartial
}
