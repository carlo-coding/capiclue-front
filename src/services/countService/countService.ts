import { checkError, getCookie } from '../../utils'
import { GeneralServiceEndpoints } from './endpoints'

const apiUrl = import.meta.env.VITE_API_URL as string

export interface IGetCountResponse {
  data: {
    userPublications: number
    unreadNotifications: number
    unreadMessages: number
    totalFriends: number
  }
}

export async function serviceGetGeneralCount(): Promise<
  [IGetCountResponse | null, Error | null]
> {
  let result: IGetCountResponse | null = null
  let error: Error | null = null
  const token = getCookie('token')
  if (token === '') {
    return [result, error]
  }
  try {
    const response = await fetch(
      `${apiUrl}${GeneralServiceEndpoints.GET_COUNT}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    result = await checkError<IGetCountResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
