import {
  IFriendModel,
  IPaginatedResults,
  IUser,
  TUserPartial
} from '../../models'
import { ICommonServiceResponse } from '../../models/commonServiceResponse'
import { checkError, getCookie, parseJson } from '../../utils'
import { TUserResponse } from '../authService'
import { mapUserInfo } from '../userService'
import { FriendServiceEndpoints } from './endpoints'
import { mapFriendList } from './mapFriendList'

const apiUrl = import.meta.env.VITE_API_URL as string

export type TGetFriendsResponse = IPaginatedResults<IFriendModel>

export type TGetFriendsOutput = IPaginatedResults<TUserPartial>

export async function serviceGetAllFriends(
  page: number
): Promise<[TGetFriendsOutput | null, Error | null]> {
  let result: TGetFriendsOutput | null = null
  let error: Error | null = null

  const limit = 3
  const token = getCookie('token')
  const userId = parseJson<IUser>(getCookie('user')).id

  let data: TGetFriendsResponse

  try {
    const response = await fetch(
      `${apiUrl}${FriendServiceEndpoints.GET_ALL_FRIENDS}?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    data = await checkError<TGetFriendsResponse>(response)
    result = {
      ...data,
      items: mapFriendList(data, userId as number)
    }
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceDeleteFriend(
  friendId: number
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${FriendServiceEndpoints.DELETE_FRIEND}${friendId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface IAcceptFriendResponse {
  data: {
    user: TUserResponse
  }
}

export async function serviceAcceptFriend(
  friendId?: number
): Promise<[Partial<IUser> | null, Error | null]> {
  let result: Partial<IUser> | null = null
  let error: Error | null = null

  if (friendId === undefined) {
    return [result, error]
  }
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${FriendServiceEndpoints.ACCEPT_FRIEND_REQUEST}${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await checkError<IAcceptFriendResponse>(response)
    result = mapUserInfo(data.data.user)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceRejectFriend(
  senderId?: number
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  if (senderId === undefined) {
    return [result, error]
  }
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${FriendServiceEndpoints.REJECT_FRIEND_REQUEST}${senderId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceSendFriendRequest(
  receiverId?: number
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  const token = getCookie('token')
  if (receiverId === undefined || token === '') {
    return [result, error]
  }
  try {
    const response = await fetch(
      `${apiUrl}${FriendServiceEndpoints.SEND_FRIEND_REQUEST}${receiverId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    result = await checkError<ICommonServiceResponse>(response, {
      400: 'Ya has mandado una solicitud a este usuario'
    })
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
