import { IImageModel } from './imageModel'

export interface IUser {
  id: number
  names: string
  surnames: string
  userName: string
  birthday: string
  createdAt: string
  avatar: Partial<IImageModel>
  isFriend?: boolean
}

export type TUserPartial = Partial<IUser>
