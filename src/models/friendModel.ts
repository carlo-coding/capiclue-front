import { TUserResponse } from '../services'

export interface IFriendModel {
  id: number
  status: string
  senderId: number
  receiverId: number
  createdAt: string
  sender: TUserResponse
  receiver: TUserResponse
}
