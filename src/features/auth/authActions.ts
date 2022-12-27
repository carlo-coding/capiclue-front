import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { PrivateRoutes, PublicRoutes } from '../../models'
import { TFormLoginValues, TFormSignupValues } from '../../pages'
import { serviceGoogleLogin, serviceLogin, serviceSignup } from '../../services'
import { redirectTo } from '../../utils'
import { setUserInfo } from '../user/userSlice'
import { setAuthState } from './authSlice'

export const authSignup = (payload: TFormSignupValues): AnyAction => {
  return (async (_dispatch: Dispatch) => {
    const [, error] = await serviceSignup(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    redirectTo(`/${PublicRoutes.LOGIN}`)
  }) as unknown as AnyAction
}

export const authLogin = (payload: TFormLoginValues): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceLogin(payload)
    if (response === null || error !== null) {
      enqueueSnackbar(error?.message as string, { variant: 'error' })
      return
    }
    dispatch(setAuthState(response.data.token))
    dispatch(setUserInfo(response.data.user))
    redirectTo(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EXPLORE}`)
  }) as unknown as AnyAction
}

export const googleLogin = (credential?: string): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceGoogleLogin(credential)
    if (response === null) {
      enqueueSnackbar(error?.message as string, { variant: 'error' })
      return
    }
    dispatch(setAuthState(response.data.token))
    dispatch(setUserInfo(response.data.user))
    redirectTo(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EXPLORE}`)
  }) as unknown as AnyAction
}
