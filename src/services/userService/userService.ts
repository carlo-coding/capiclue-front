import { TFormUpdateUserValues } from '../../components/Modal/contents/UpdateUserInfo'
import { IUser } from '../../models'
import { checkError, getCookie } from '../../utils'
import { TUserResponse } from '../authService'
import { UserServiceEndpoints } from './endpoints'
import { mapUserInfo } from './mapUserInfo'

const apiUrl = import.meta.env.VITE_API_URL as string

export interface IDeleteUserResponse {
  data: {
    message: string
  }
}

export async function serviceDeleteUser(): Promise<
  [IDeleteUserResponse | null, Error | null]
> {
  let result: IDeleteUserResponse | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${UserServiceEndpoints.DELETE_PROFILE}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    result = await checkError<IDeleteUserResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface IUpdateUserResponse {
  data: {
    user: TUserResponse
  }
}

export async function serviceUpdateUser(
  dto: TFormUpdateUserValues
): Promise<[Partial<IUser> | null, Error | null]> {
  let result: Partial<IUser> | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${UserServiceEndpoints.UPDATE_PROFILE}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
      }
    )
    const data = await checkError<IUpdateUserResponse>(response, {
      400: 'El nombre de usuario ya existe'
    })
    result = mapUserInfo(data.data.user)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
