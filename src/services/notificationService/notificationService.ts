import { INotification, IPaginatedResults } from '../../models'
import { ICommonServiceResponse } from '../../models/commonServiceResponse'
import { checkError, getCookie } from '../../utils'
import { NotificationServiceEndpoints } from './endpoints'

const apiUrl = import.meta.env.VITE_API_URL as string

export type TGetNotificationsResponse = IPaginatedResults<INotification>

export async function serviceGetNotifications(
  page: number
): Promise<[TGetNotificationsResponse | null, Error | null]> {
  let result: TGetNotificationsResponse | null = null
  let error: Error | null = null
  try {
    const limit = 10
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${NotificationServiceEndpoints.GET_NOTIFICATIONS}?limit=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    result = await checkError<TGetNotificationsResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceDeleteNotification(
  notificationId: number
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${NotificationServiceEndpoints.DELETE_NOTIFICATION}${notificationId}`,
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

export async function serviceReadNotification(
  notificationIds: number[]
): Promise<[ICommonServiceResponse | null, Error | null]> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${NotificationServiceEndpoints.READ_NOTIFICATIONS}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notificationIds })
      }
    )
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
