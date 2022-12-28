import { ICommonServiceResponse, IImageModel, IUser } from '../../models'
import { TFormLoginValues, TFormSignupValues } from '../../pages'
import { checkError, getCookie } from '../../utils'
import { mapUserInfo } from '../userService'
import { AuthServiceEndpoints } from './endpoints'

const apiUrl = import.meta.env.VITE_API_URL as string

export type TUserResponse = Omit<Partial<IUser>, 'avatar'> & {
  avatars: IImageModel[]
}

export interface IAuthSignupResponse {
  data: {
    message: string
  }
}

export async function serviceSignup(
  data: TFormSignupValues
): Promise<[IAuthSignupResponse | null, Error | null]> {
  let result: IAuthSignupResponse | null = null
  let error: Error | null = null
  try {
    const resp = await fetch(`${apiUrl}${AuthServiceEndpoints.SIGNUP}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await checkError<IAuthSignupResponse>(resp, {
      400: 'El usuario ya éxiste'
    })
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export interface IAuthLoginResponse {
  data: {
    user: TUserResponse
    token: string
  }
}

export interface IAuthLoginOutput {
  data: {
    user: Partial<IUser>
    token: string
  }
}

export async function serviceLogin(
  dto: TFormLoginValues
): Promise<[IAuthLoginOutput | null, Error | null]> {
  let result: IAuthLoginOutput | null = null
  let error: Error | null = null

  try {
    const response = await fetch(`${apiUrl}${AuthServiceEndpoints.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await checkError<IAuthLoginResponse>(response, {
      404: 'Usuario no encontrado',
      403: 'Contraseña o usuario incorrecto'
    })
    result = {
      data: {
        user: mapUserInfo(data.data.user),
        token: data.data.token
      }
    }
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceGoogleLogin(
  credential?: string
): Promise<[IAuthLoginOutput | null, Error | null]> {
  let result: IAuthLoginOutput | null = null
  let error: Error | null = null
  try {
    const response = await fetch(`${apiUrl}${AuthServiceEndpoints.GOOGLE}`, {
      method: 'POST',
      body: JSON.stringify({ credential }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await checkError<IAuthLoginResponse>(response, {
      404: 'Usuario no encontrado'
    })
    result = {
      data: {
        user: mapUserInfo(data.data.user),
        token: data.data.token
      }
    }
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}

export async function serviceResetPassword(): Promise<
  [ICommonServiceResponse | null, Error | null]
> {
  let result: ICommonServiceResponse | null = null
  let error: Error | null = null
  try {
    const token = getCookie('token')
    const response = await fetch(
      `${apiUrl}${AuthServiceEndpoints.RESET_PASSWORD}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    result = await checkError<ICommonServiceResponse>(response)
  } catch (err) {
    error = err as Error
  }
  return [result, error]
}
