import { IComment } from './commentModel'
import { IImageModel } from './imageModel'
import { TUserPartial } from './userModel'

export interface IPublication {
  id: number
  content: string
  score: number
  createdAt: string
  author: TUserPartial
  comments: IComment[]
  images?: IImageModel[]
}

export type TPublicationPartial = Partial<IPublication>
