import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { closeModal } from '../../components'
import { TFormUpdateUserValues } from '../../components/Modal/contents/UpdateUserInfo'
import { serviceUploadAvatar } from '../../services'
import {
  serviceDeleteUser,
  serviceUpdateUser
} from '../../services/userService/userService'
import { logout } from '../auth/authSlice'
import { setUserAvatar, setUserInfo } from './userSlice'

export const userDelete = (): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [, error] = await serviceDeleteUser()
    if (error != null) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }
    dispatch(logout())
  }) as unknown as AnyAction
}

export const updateUser = (payload: TFormUpdateUserValues): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceUpdateUser(payload)
    if (error != null || response === null) {
      enqueueSnackbar(error?.message as string, { variant: 'error' })
      return
    }
    dispatch(setUserInfo(response))
    dispatch(closeModal())
    enqueueSnackbar('Información actualizada con éxito!', {
      variant: 'success'
    })
  }) as unknown as AnyAction
}

export const uploadAvatar = (payload: File): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceUploadAvatar(payload)
    if (response === null || error !== null) {
      enqueueSnackbar(error?.message as string, { variant: 'error' })
      return
    }
    dispatch(setUserAvatar(response.data.avatar))
  }) as unknown as AnyAction
}
