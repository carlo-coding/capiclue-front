import {
  ICommonServiceResponse,
  IMessage,
  IPaginatedResults,
  IUser
} from '../../models'
import { checkError, getCookie, parseJson } from '../../utils'
import { TUserResponse } from '../authService'
import { ChatServiceEndpoints } from './endpoints'
import { mapChatlist } from './mapChatlist'
import { mapMessages } from './mapMessages'

const apiUrl = import.meta.env.VITE_API_URL as string

export interface IGetMessagesPayload {
  friendId: number
  page: number
}

export type TMessageResponse = Omit<IMessage, 'sender' | 'receiver'> & {
  sender: TUserResponse
  receiver: TUserResponse
}

export type TMessagesResponse = IPaginatedResults<TMessageResponse>

export interface IMessageOutput {
  id: number
  type: string
  title?: string
  text: string
  position: 'left' | 'right'
  date: string
}

export type TMessagesOutput = IPaginatedResults<IMessageOutput>

export async function serviceGetMessages(
  dto: IGetMessagesPayload
): Promise<[TMessagesOutput | null, Error | null]> {
  let result: TMessagesOutput | null = null
  let error: Error | null = null

  try {
    const limit = 10
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${ChatServiceEndpoints.GET_MESSAGES}${dto.friendId}?page=${dto.page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await checkError<TMessagesResponse>(response)
    result = mapMessages(data)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceReadMessages(
  messageIds: number[]
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null

  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${ChatServiceEndpoints.READ_MESSAGES}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ messageIds })
      }
    )
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export type TChatlistResponse = IPaginatedResults<{
  friend: TUserResponse
  message: IMessage
  unread: number
}>

export interface IChatItemOutput {
  id?: number
  avatar?: string
  alt?: string
  title?: string
  date?: string
}

export type TChatlistOuput = IPaginatedResults<IChatItemOutput>

export async function serviceGetChatlist(
  page: number
): Promise<[TChatlistOuput | null, Error | null]> {
  let result: TChatlistOuput | null = null
  let error: Error | null = null

  try {
    const token = getCookie('token')
    const userId = parseJson<IUser>(getCookie('user')).id
    const limit = 10
    const response = await fetch(
      `${apiUrl}${ChatServiceEndpoints.GET_CHAT_LIST}?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await checkError<TChatlistResponse>(response)
    result = mapChatlist(data, userId)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
