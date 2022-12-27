import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { closeModal } from '../../components'
import {
  serviceAcceptFriend,
  serviceDeleteFriend,
  serviceGetAllFriends,
  serviceRejectFriend,
  serviceSendFriendRequest
} from '../../services'
import { addFriend, removeFriend, updateFriendList } from './friendSlice'

export const sendFriendRequest = (receiverId: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [, error] = await serviceSendFriendRequest(receiverId)
    if (error !== null) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
      return
    }
    dispatch(closeModal())
    enqueueSnackbar('Solicitud de amistad mandada con éxito', {
      variant: 'success'
    })
  }) as unknown as AnyAction
}

export const getAllFriends = (payload: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceGetAllFriends(payload)
    if (response === null || error !== null) {
      enqueueSnackbar(error?.message as string, {
        variant: 'error'
      })
      return
    }
    dispatch(updateFriendList(response))
  }) as unknown as AnyAction
}

export const deleteFriend = (payload: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [, error] = await serviceDeleteFriend(payload)
    if (error !== null) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
      return
    }
    dispatch(removeFriend(payload))
    dispatch(closeModal())
    enqueueSnackbar('Usuario removido de tu lista de amigos', {
      variant: 'success'
    })
  }) as unknown as AnyAction
}

export const acceptFriend = (payload?: number): AnyAction => {
  return (async (dispatch: Dispatch) => {
    const [response, error] = await serviceAcceptFriend(payload)
    if (response === null || error !== null) {
      enqueueSnackbar(error?.message as string, {
        variant: 'error'
      })
      return
    }
    dispatch(addFriend(response))
    enqueueSnackbar('Aceptaste una solicitud de amistad', {
      variant: 'success'
    })
  }) as unknown as AnyAction
}

export const rejectFriend = (payload?: number): AnyAction => {
  return (async (_dispatch: Dispatch) => {
    const [response, error] = await serviceRejectFriend(payload)
    if (response === null || error !== null) {
      enqueueSnackbar(error?.message as string, {
        variant: 'error'
      })
      return
    }
    enqueueSnackbar('Has rechazado la solictud de amistad', {
      variant: 'warning'
    })
  }) as unknown as AnyAction
}
