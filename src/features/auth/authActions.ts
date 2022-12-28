import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { PublicRoutes } from '../../models'
import { TFormLoginValues, TFormSignupValues } from '../../pages'
import {
  serviceGoogleLogin,
  serviceLogin,
  serviceResetPassword,
  serviceSignup
} from '../../services'
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
    redirectTo(`/${PublicRoutes.EXPLORE}`)
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
    redirectTo(`/${PublicRoutes.EXPLORE}`)
  }) as unknown as AnyAction
}

export const resetPassword = (): AnyAction => {
  return (async () => {
    const [, error] = await serviceResetPassword()
    if (error !== null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    enqueueSnackbar('Se te ha mandado un email para cambiar tu contraseña', {
      variant: 'success'
    })
  }) as unknown as AnyAction
}
