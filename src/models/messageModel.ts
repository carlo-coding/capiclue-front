import { IUser } from './userModel'

export interface IMessage {
  createdAt: string
  id: number
  message: string
  read: boolean
  receiverId: number
  senderId: number
  sender: IUser
  receiver: IUser
}
